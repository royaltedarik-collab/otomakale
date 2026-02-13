#!/usr/bin/env node
/**
 * SEO ve İndeksleme Otomasyonu
 * Google Indexing API, Sitemap ve Ping servisleri
 */

require('dotenv').config();
const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(process.env.DATABASE_PATH);

/**
 * Google Indexing API ile indexleme isteği gönder
 */
async function requestGoogleIndexing(url) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/indexing']
    });
    
    const indexing = google.indexing({ version: 'v3', auth });
    
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED'
      }
    });
    
    console.log('✅ Google Indexing API: İstek gönderildi');
    return response.data;
    
  } catch (error) {
    console.error('❌ Google Indexing hatası:', error.message);
    return null;
  }
}

/**
 * Google'a ping gönder
 */
async function pingGoogle(sitemapUrl) {
  try {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    await axios.get(pingUrl, { timeout: 10000 });
    console.log('✅ Google: Sitemap ping gönderildi');
    return true;
  } catch (error) {
    console.error('❌ Google ping hatası:', error.message);
    return false;
  }
}

/**
 * Bing'e ping gönder
 */
async function pingBing(sitemapUrl) {
  try {
    const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    await axios.get(pingUrl, { timeout: 10000 });
    console.log('✅ Bing: Sitemap ping gönderildi');
    return true;
  } catch (error) {
    console.error('❌ Bing ping hatası:', error.message);
    return false;
  }
}

/**
 * XML Sitemap oluştur
 */
function generateSitemap() {
  const articles = db.prepare('SELECT slug, created_at, updated_at FROM articles WHERE status = ?').all('published');
  
  const urls = articles.map(article => {
    const lastmod = article.updated_at || article.created_at;
    return `
  <url>
    <loc>${process.env.SITE_URL}/blog/${article.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.SITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${urls}
</urlset>`;
  
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log('✅ Sitemap oluşturuldu:', sitemapPath);
  return `${process.env.SITE_URL}/sitemap.xml`;
}

/**
 * RSS Feed oluştur
 */
function generateRSSFeed() {
  const articles = db.prepare(`
    SELECT * FROM articles 
    WHERE status = ? 
    ORDER BY created_at DESC 
    LIMIT 20
  `).all('published');
  
  const items = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${process.env.SITE_URL}/blog/${article.slug}</link>
      <description><![CDATA[${article.meta_description}]]></description>
      <pubDate>${new Date(article.created_at).toUTCString()}</pubDate>
      <guid>${process.env.SITE_URL}/blog/${article.slug}</guid>
      ${article.featured_image ? `<enclosure url="${process.env.SITE_URL}${article.featured_image}" type="image/jpeg"/>` : ''}
    </item>`).join('');
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${process.env.SITE_NAME}</title>
    <link>${process.env.SITE_URL}</link>
    <description>${process.env.SITE_DESCRIPTION}</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${process.env.SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
  
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rss);
  
  console.log('✅ RSS feed oluşturuldu:', rssPath);
  return `${process.env.SITE_URL}/rss.xml`;
}

/**
 * Makale için tam SEO işlemleri
 */
async function processArticleSEO(articleId) {
  try {
    console.log(`\n🔍 SEO işlemleri başlıyor (Makale ID: ${articleId})\n`);
    
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(articleId);
    
    if (!article || article.status !== 'published') {
      throw new Error('Makale bulunamadı veya yayınlanmamış');
    }
    
    const articleUrl = `${process.env.SITE_URL}/blog/${article.slug}`;
    
    // 1. Sitemap güncelle
    console.log('📄 Sitemap güncelleniyor...');
    const sitemapUrl = generateSitemap();
    
    // 2. RSS feed güncelle
    console.log('📡 RSS feed güncelleniyor...');
    generateRSSFeed();
    
    // 3. Google Indexing API
    if (process.env.AUTO_INDEX === 'true') {
      console.log('🔍 Google Indexing API çağrılıyor...');
      await requestGoogleIndexing(articleUrl);
    }
    
    // 4. Ping servisleri
    if (process.env.PING_GOOGLE === 'true') {
      console.log('📡 Google\'a ping gönderiliyor...');
      await pingGoogle(sitemapUrl);
    }
    
    if (process.env.PING_BING === 'true') {
      console.log('📡 Bing\'e ping gönderiliyor...');
      await pingBing(sitemapUrl);
    }
    
    // Veritabanını güncelle
    const stmt = db.prepare('UPDATE articles SET indexed_at = ? WHERE id = ?');
    stmt.run(new Date().toISOString(), articleId);
    
    console.log('\n✅ SEO işlemleri tamamlandı!');
    console.log(`🔗 Makale URL: ${articleUrl}\n`);
    
    return true;
    
  } catch (error) {
    console.error('❌ SEO işlem hatası:', error.message);
    return false;
  }
}

// Script olarak çalıştırılırsa
if (require.main === module) {
  const articleId = process.argv[2];
  
  if (!articleId) {
    // Sadece sitemap ve RSS güncelle
    console.log('📄 Sitemap ve RSS güncelleniyor...\n');
    generateSitemap();
    generateRSSFeed();
    console.log('\n✅ Tamamlandı!');
    process.exit(0);
  } else {
    processArticleSEO(parseInt(articleId))
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  }
}

module.exports = { processArticleSEO, generateSitemap, generateRSSFeed };

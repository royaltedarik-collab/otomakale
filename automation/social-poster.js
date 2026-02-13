#!/usr/bin/env node
/**
 * Sosyal Medya Otomasyonu
 * Makaleleri tüm platformlarda otomatik paylaşır
 */

require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');
const Database = require('better-sqlite3');

const db = new Database(process.env.DATABASE_PATH);

/**
 * Twitter'da paylaş
 */
async function postToTwitter(article) {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
    
    const url = `${process.env.SITE_URL}/blog/${article.slug}`;
    
    // Tweet metni oluştur
    const tweet = `${article.title}\n\n${article.meta_description.substring(0, 100)}...\n\n🔗 ${url}\n\n#AI #Verimlilik #Teknoloji`;
    
    const result = await client.v2.tweet(tweet);
    
    console.log('✅ Twitter: Paylaşıldı');
    return result.data.id;
    
  } catch (error) {
    console.error('❌ Twitter hatası:', error.message);
    return null;
  }
}

/**
 * Facebook'ta paylaş
 */
async function postToFacebook(article) {
  try {
    const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const url = `${process.env.SITE_URL}/blog/${article.slug}`;
    
    const message = `${article.title}\n\n${article.meta_description}\n\nDevamını okumak için: ${url}`;
    
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/me/feed`,
      {
        message: message,
        link: url
      },
      {
        params: { access_token: pageAccessToken }
      }
    );
    
    console.log('✅ Facebook: Paylaşıldı');
    return response.data.id;
    
  } catch (error) {
    console.error('❌ Facebook hatası:', error.message);
    return null;
  }
}

/**
 * LinkedIn'de paylaş
 */
async function postToLinkedIn(article) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const url = `${process.env.SITE_URL}/blog/${article.slug}`;
    
    const postData = {
      author: `urn:li:person:${process.env.LINKEDIN_PERSON_ID}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: `${article.title}\n\n${article.meta_description}`
          },
          shareMediaCategory: 'ARTICLE',
          media: [
            {
              status: 'READY',
              originalUrl: url,
              title: {
                text: article.title
              },
              description: {
                text: article.meta_description
              }
            }
          ]
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    
    const response = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      postData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    console.log('✅ LinkedIn: Paylaşıldı');
    return response.data.id;
    
  } catch (error) {
    console.error('❌ LinkedIn hatası:', error.message);
    return null;
  }
}

/**
 * Pinterest'te paylaş
 */
async function postToPinterest(article) {
  try {
    const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.log('⚠️  Pinterest: Token bulunamadı, atlanıyor');
      return null;
    }
    
    const url = `${process.env.SITE_URL}/blog/${article.slug}`;
    const imageUrl = `${process.env.SITE_URL}${article.featured_image}`;
    
    const response = await axios.post(
      'https://api.pinterest.com/v5/pins',
      {
        link: url,
        title: article.title,
        description: article.meta_description,
        media_source: {
          source_type: 'image_url',
          url: imageUrl
        },
        board_id: process.env.PINTEREST_BOARD_ID
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Pinterest: Paylaşıldı');
    return response.data.id;
    
  } catch (error) {
    console.error('❌ Pinterest hatası:', error.message);
    return null;
  }
}

/**
 * Tüm platformlarda paylaş
 */
async function shareOnAllPlatforms(articleId) {
  try {
    console.log(`\n📢 Sosyal medya paylaşımı başlıyor (Makale ID: ${articleId})\n`);
    
    // Makaleyi veritabanından al
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(articleId);
    
    if (!article) {
      throw new Error('Makale bulunamadı');
    }
    
    if (article.status !== 'published') {
      throw new Error('Makale henüz yayınlanmamış');
    }
    
    const results = {
      twitter: null,
      facebook: null,
      linkedin: null,
      pinterest: null
    };
    
    // Paralel paylaşım
    const promises = [
      postToTwitter(article).then(id => results.twitter = id),
      postToFacebook(article).then(id => results.facebook = id),
      postToLinkedIn(article).then(id => results.linkedin = id),
      postToPinterest(article).then(id => results.pinterest = id)
    ];
    
    await Promise.allSettled(promises);
    
    // Sonuçları veritabanına kaydet
    const stmt = db.prepare(`
      UPDATE articles 
      SET social_shares = ?, shared_at = ?
      WHERE id = ?
    `);
    
    stmt.run(
      JSON.stringify(results),
      new Date().toISOString(),
      articleId
    );
    
    console.log('\n✅ Sosyal medya paylaşımı tamamlandı!');
    console.log('📊 Sonuçlar:', results);
    
    return results;
    
  } catch (error) {
    console.error('❌ Paylaşım hatası:', error.message);
    throw error;
  }
}

// Script olarak çalıştırılırsa
if (require.main === module) {
  const articleId = process.argv[2];
  
  if (!articleId) {
    console.error('Kullanım: node social-poster.js <articleId>');
    process.exit(1);
  }
  
  shareOnAllPlatforms(parseInt(articleId))
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { shareOnAllPlatforms };

#!/usr/bin/env node
/**
 * Otonom İçerik Üretici
 * Groq API (Llama 3.1) kullanarak SEO uyumlu makaleler üretir
 * Ana ve tek AI motoru: Groq
 */

require('dotenv').config();
const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

// Konfigürasyon - Sadece Groq kullanıyoruz
console.log('🚀 Content Generator başlatılıyor...');
console.log('📁 Çalışma dizini:', process.cwd());
console.log('🔑 Environment variables:');
console.log('  - GROQ_API_KEY:', process.env.GROQ_API_KEY ? '✅ Tanımlı' : '❌ Tanımlı değil');
console.log('  - DATABASE_PATH:', process.env.DATABASE_PATH || '❌ Tanımlı değil');
console.log('  - NODE_ENV:', process.env.NODE_ENV || 'development');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// JSON database kullan (SQLite yerine)
const dbPath = process.env.DATABASE_PATH || './database/articles.json';
const dbDir = path.dirname(dbPath);

// Database dizinini oluştur
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Database dizini oluşturuldu:', dbDir);
}

// Database dosyasını oluştur veya yükle
let articles = [];
if (fs.existsSync(dbPath)) {
  articles = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  console.log('✅ Mevcut database yüklendi:', articles.length, 'makale');
} else {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
  console.log('✅ Yeni database oluşturuldu');
}

// Database helper fonksiyonları
const db = {
  insert: (article) => {
    article.id = articles.length + 1;
    article.created_at = new Date().toISOString();
    articles.push(article);
    fs.writeFileSync(dbPath, JSON.stringify(articles, null, 2));
    return article;
  },
  getAll: () => articles,
  getById: (id) => articles.find(a => a.id === id)
};

// Groq API kontrolü
if (!process.env.GROQ_API_KEY) {
  console.error('❌ HATA: GROQ_API_KEY environment variable tanımlı değil!');
  console.error('GitHub Settings → Secrets → Actions → GROQ_API_KEY ekleyin');
  console.error('Groq Console: https://console.groq.com/');
  process.exit(1);
}

console.log('✅ GROQ_API_KEY bulundu');

// Database path kontrolü
if (!process.env.DATABASE_PATH) {
  console.error('❌ HATA: DATABASE_PATH tanımlı değil!');
  process.exit(1);
}

console.log('✅ DATABASE_PATH:', process.env.DATABASE_PATH);

// Konular ve anahtar kelimeler
const topics = require('../config/topics.json');

/**
 * Rastgele konu ve anahtar kelime seç
 */
function selectTopic() {
  const category = topics.categories[Math.floor(Math.random() * topics.categories.length)];
  const keyword = category.keywords[Math.floor(Math.random() * category.keywords.length)];
  
  return {
    category: category.name,
    keyword: keyword,
    tone: category.tone
  };
}

/**
 * LSI anahtar kelimeleri üret
 */
async function generateLSIKeywords(mainKeyword) {
  const prompt = `"${mainKeyword}" ana anahtar kelimesi için 10 LSI (Latent Semantic Indexing) anahtar kelime üret. Sadece kelimeleri virgülle ayırarak listele, başka açıklama yapma.`;
  
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.1-70b-versatile',
    temperature: 0.7,
    max_tokens: 200
  });
  
  return completion.choices[0].message.content.trim().split(',').map(k => k.trim());
}

/**
 * YouTube video ara
 */
async function searchYouTubeVideo(keyword) {
  try {
    // YouTube Data API yerine ücretsiz alternatif: YouTube arama URL'i
    // Not: Gerçek üretimde YouTube Data API kullanılabilir
    const searchQuery = encodeURIComponent(`${keyword} tutorial 2026`);
    
    // Basit bir yaklaşım: Arama sonuçlarından ilk videoyu al
    // Gerçek implementasyonda YouTube Data API kullanılmalı
    const videoId = await getYouTubeVideoId(keyword);
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return null;
  } catch (error) {
    console.log('⚠️  YouTube video bulunamadı:', error.message);
    return null;
  }
}

/**
 * YouTube video ID'si al (basitleştirilmiş)
 */
async function getYouTubeVideoId(keyword) {
  try {
    const axios = require('axios');
    const cheerio = require('cheerio');
    
    const searchQuery = encodeURIComponent(`${keyword} tutorial`);
    const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    // Video ID'sini regex ile çıkar
    const match = response.data.match(/"videoId":"([^"]+)"/);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Otoriter kaynak bağlantıları üret
 */
async function generateAuthoritativeLinks(keyword) {
  const links = [];
  
  // Wikipedia bağlantısı
  const wikiQuery = keyword.replace(/\s+/g, '_');
  links.push({
    text: 'Wikipedia',
    url: `https://tr.wikipedia.org/wiki/${encodeURIComponent(wikiQuery)}`,
    domain: 'Wikipedia'
  });
  
  // Diğer otoriter kaynaklar için AI'dan öner
  const prompt = `"${keyword}" konusu için 2 tane güvenilir, otoriter İngilizce kaynak öner (TechCrunch, Wired, MIT Technology Review, Harvard Business Review gibi). Sadece şu formatta yaz:
1. [Site Adı] - [tam URL]
2. [Site Adı] - [tam URL]`;
  
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.5,
      max_tokens: 200
    });
    
    const response = completion.choices[0].message.content;
    const matches = response.match(/\[([^\]]+)\]\s*-\s*(https?:\/\/[^\s]+)/g);
    
    if (matches) {
      matches.forEach(match => {
        const [_, siteName, url] = match.match(/\[([^\]]+)\]\s*-\s*(https?:\/\/[^\s]+)/);
        links.push({
          text: siteName.trim(),
          url: url.trim(),
          domain: new URL(url).hostname
        });
      });
    }
  } catch (error) {
    console.log('⚠️  Otoriter bağlantılar üretilemedi:', error.message);
  }
  
  return links;
}

/**
 * Makale içeriği üret
 */
async function generateArticle(topic) {
  const lsiKeywords = await generateLSIKeywords(topic.keyword);
  
  const prompt = `Sen bir SEO uzmanı ve içerik yazarısın. "${topic.keyword}" konusunda kapsamlı bir blog makalesi yaz.

Gereksinimler:
- Ton: ${topic.tone}
- Kelime sayısı: 1500-2000 kelime
- Yapı: Giriş, Ana Bölümler (H2), Alt Başlıklar (H3), Sonuç
- LSI Anahtar Kelimeler: ${lsiKeywords.join(', ')}
- Makale içinde [EXTERNAL_LINK_1] ve [EXTERNAL_LINK_2] placeholder'larını uygun yerlere yerleştir
- Sonunda 5 SSS (Sıkça Sorulan Sorular) ekle
- SSS'den sonra "## İlgili Video" başlığı ekle ve [YOUTUBE_EMBED] placeholder'ı koy
- Türkçe yaz
- Doğal ve akıcı bir dil kullan
- Pratik örnekler ve ipuçları ver

Makaleyi Markdown formatında yaz. Başlık H1 olsun.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.1-70b-versatile',
    temperature: 0.8,
    max_tokens: 4000
  });
  
  let content = completion.choices[0].message.content;
  
  // YouTube video embed ekle
  console.log('🎥 YouTube video aranıyor...');
  const youtubeUrl = await searchYouTubeVideo(topic.keyword);
  
  if (youtubeUrl) {
    const embedCode = `\n<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
  <iframe src="${youtubeUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>\n`;
    
    content = content.replace('[YOUTUBE_EMBED]', embedCode);
    console.log('✅ YouTube video eklendi');
  } else {
    content = content.replace('[YOUTUBE_EMBED]', '*Bu konuyla ilgili video içeriği yakında eklenecektir.*');
    console.log('⚠️  YouTube video eklenemedi');
  }
  
  // Otoriter bağlantılar ekle
  console.log('🔗 Otoriter kaynaklar aranıyor...');
  const authLinks = await generateAuthoritativeLinks(topic.keyword);
  
  if (authLinks.length >= 2) {
    content = content.replace('[EXTERNAL_LINK_1]', `[${authLinks[0].text}](${authLinks[0].url})`);
    content = content.replace('[EXTERNAL_LINK_2]', `[${authLinks[1].text}](${authLinks[1].url})`);
    console.log(`✅ ${authLinks.length} otoriter bağlantı eklendi`);
  } else {
    // Placeholder'ları temizle
    content = content.replace(/\[EXTERNAL_LINK_\d+\]/g, '');
  }
  
  return content;
}

/**
 * Meta açıklama üret
 */
async function generateMetaDescription(content) {
  const prompt = `Aşağıdaki makale için 150-160 karakter arası SEO uyumlu meta açıklama yaz. Sadece açıklamayı yaz, başka bir şey ekleme:\n\n${content.substring(0, 500)}`;
  
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.1-70b-versatile',
    temperature: 0.7,
    max_tokens: 100
  });
  
  return completion.choices[0].message.content.trim();
}

/**
 * URL slug oluştur
 */
function createSlug(title) {
  const turkishMap = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
  };
  
  return title
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Makaleyi veritabanına kaydet
 */
function saveArticle(article) {
  const newArticle = {
    id: articles.length + 1,
    title: article.title,
    slug: article.slug,
    content: article.content,
    meta_description: article.metaDescription,
    category: article.category,
    keyword: article.keyword,
    youtube_video: article.youtubeVideo || null,
    external_links: article.externalLinks || [],
    status: process.env.AUTO_PUBLISH === 'true' ? 'published' : 'draft',
    created_at: new Date().toISOString()
  };
  
  articles.push(newArticle);
  fs.writeFileSync(dbPath, JSON.stringify(articles, null, 2));
  
  console.log('💾 Makale database\'e kaydedildi');
  
  return newArticle.id;
}

/**
 * Ana fonksiyon
 */
async function main() {
  try {
    console.log('🤖 İçerik üretimi başlıyor...');
    console.log('🔧 AI Motoru: Groq (Llama 3.1 70B)\n');
    
    // Konu seç
    const topic = selectTopic();
    console.log(`📌 Kategori: ${topic.category}`);
    console.log(`🔑 Anahtar Kelime: ${topic.keyword}\n`);
    
    // Otoriter bağlantılar üret
    console.log('🔗 Otoriter kaynaklar aranıyor...');
    const authLinks = await generateAuthoritativeLinks(topic.keyword);
    console.log(`✅ ${authLinks.length} kaynak bulundu\n`);
    
    // YouTube video ara
    console.log('🎥 YouTube video aranıyor...');
    const youtubeUrl = await searchYouTubeVideo(topic.keyword);
    if (youtubeUrl) {
      console.log('✅ YouTube video bulundu\n');
    } else {
      console.log('⚠️  YouTube video bulunamadı\n');
    }
    
    // Makale üret
    console.log('✍️  Makale yazılıyor...');
    let content = await generateArticle(topic);
    
    // YouTube embed ekle
    if (youtubeUrl) {
      const embedCode = `\n## İlgili Video\n\n<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
  <iframe src="${youtubeUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>\n`;
      
      // İçeriğin sonuna ekle (SSS'den sonra)
      content = content + embedCode;
    }
    
    // Otoriter bağlantıları içeriğe ekle
    if (authLinks.length >= 2) {
      // İçeriğin uygun yerlerine bağlantıları yerleştir
      const linkText1 = `Daha fazla bilgi için [${authLinks[0].text}](${authLinks[0].url}) sitesini ziyaret edebilirsiniz.`;
      const linkText2 = `Ayrıca [${authLinks[1].text}](${authLinks[1].url}) kaynağında detaylı bilgi bulabilirsiniz.`;
      
      // İçeriğin ortasına yakın bir yere ekle
      const paragraphs = content.split('\n\n');
      const midPoint = Math.floor(paragraphs.length / 2);
      
      paragraphs.splice(midPoint, 0, linkText1);
      paragraphs.splice(midPoint + 3, 0, linkText2);
      
      content = paragraphs.join('\n\n');
    }
    
    // Başlığı çıkar (ilk satır)
    const lines = content.split('\n');
    const title = lines[0].replace(/^#\s*/, '').trim();
    
    // Meta açıklama üret
    console.log('📝 Meta açıklama oluşturuluyor...');
    const metaDescription = await generateMetaDescription(content);
    
    // Slug oluştur
    const slug = createSlug(title);
    
    // Makale objesi
    const article = {
      title,
      slug,
      content,
      metaDescription,
      category: topic.category,
      keyword: topic.keyword,
      youtubeVideo: youtubeUrl,
      externalLinks: authLinks
    };
    
    // Veritabanına kaydet
    const articleId = saveArticle(article);
    
    console.log('\n✅ Makale başarıyla oluşturuldu!');
    console.log(`📄 ID: ${articleId}`);
    console.log(`📌 Başlık: ${title}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`📊 Kelime Sayısı: ${content.split(/\s+/).length}`);
    console.log(`📝 Meta: ${metaDescription}`);
    console.log(`🎥 YouTube: ${youtubeUrl ? 'Eklendi' : 'Yok'}`);
    console.log(`🔗 Dış Bağlantılar: ${authLinks.length} adet\n`);
    
    // GitHub Actions için article ID'yi dosyaya yaz
    if (process.env.GITHUB_ACTIONS) {
      require('fs').writeFileSync('/tmp/article_id.txt', articleId.toString());
    }
    
    // Görsel üretimi tetikle
    if (process.env.INCLUDE_IMAGES === 'true') {
      console.log('🎨 Görsel üretimi başlatılıyor...');
      require('./image-generator').generateImage(articleId, title, topic.keyword);
    }
    
    return articleId;
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

// Script olarak çalıştırılırsa
if (require.main === module) {
  main();
}

module.exports = { main, generateArticle };

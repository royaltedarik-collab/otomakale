#!/usr/bin/env node
/**
 * Otonom Görsel Üretici
 * Pollinations.ai kullanarak ücretsiz AI görselleri oluşturur
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Database = require('better-sqlite3');

const db = new Database(process.env.DATABASE_PATH);

/**
 * Pollinations.ai ile görsel üret
 */
async function generateWithPollinations(prompt) {
  // Pollinations.ai ücretsiz ve limitsiz
  const encodedPrompt = encodeURIComponent(prompt);
  const width = process.env.IMAGE_WIDTH || 1200;
  const height = process.env.IMAGE_HEIGHT || 630;
  
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true`;
  
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Pollinations.ai hatası:', error.message);
    return null;
  }
}

/**
 * Yedek: Hugging Face Stable Diffusion
 */
async function generateWithHuggingFace(prompt) {
  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
  
  if (!HF_API_KEY) {
    return null;
  }
  
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      { inputs: prompt },
      {
        headers: { 'Authorization': `Bearer ${HF_API_KEY}` },
        responseType: 'arraybuffer',
        timeout: 60000
      }
    );
    
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Hugging Face hatası:', error.message);
    return null;
  }
}

/**
 * Placeholder görsel oluştur (son çare)
 */
async function createPlaceholder(text) {
  const width = parseInt(process.env.IMAGE_WIDTH) || 1200;
  const height = parseInt(process.env.IMAGE_HEIGHT) || 630;
  
  // Gradient arka plan
  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${text.substring(0, 50)}
      </text>
    </svg>
  `;
  
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/**
 * Görseli optimize et
 */
async function optimizeImage(buffer) {
  return sharp(buffer)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 85, progressive: true })
    .toBuffer();
}

/**
 * Ana görsel üretim fonksiyonu
 */
async function generateImage(articleId, title, keyword) {
  try {
    console.log(`\n🎨 Görsel üretiliyor: "${title}"`);
    
    // İngilizce prompt oluştur (AI görseller için daha iyi)
    const prompt = `Professional blog header image about ${keyword}, modern, clean, technology theme, high quality, 4k`;
    
    console.log(`📝 Prompt: ${prompt}`);
    
    // Önce Pollinations.ai dene (ücretsiz ve hızlı)
    console.log('🔄 Pollinations.ai ile deneniyor...');
    let imageBuffer = await generateWithPollinations(prompt);
    
    // Başarısız olursa Hugging Face dene
    if (!imageBuffer) {
      console.log('🔄 Hugging Face ile deneniyor...');
      imageBuffer = await generateWithHuggingFace(prompt);
    }
    
    // Hala başarısız olursa placeholder oluştur
    if (!imageBuffer) {
      console.log('⚠️  AI servisleri yanıt vermedi, placeholder oluşturuluyor...');
      imageBuffer = await createPlaceholder(title);
    }
    
    // Görseli optimize et
    console.log('⚙️  Görsel optimize ediliyor...');
    const optimizedBuffer = await optimizeImage(imageBuffer);
    
    // Dosya adı oluştur
    const filename = `article-${articleId}-${Date.now()}.jpg`;
    const filepath = path.join(process.cwd(), 'public', 'images', filename);
    
    // Klasör yoksa oluştur
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Dosyayı kaydet
    fs.writeFileSync(filepath, optimizedBuffer);
    
    // Veritabanını güncelle
    const stmt = db.prepare('UPDATE articles SET featured_image = ? WHERE id = ?');
    stmt.run(`/images/${filename}`, articleId);
    
    console.log(`✅ Görsel kaydedildi: ${filename}`);
    console.log(`📏 Boyut: ${(optimizedBuffer.length / 1024).toFixed(2)} KB\n`);
    
    return `/images/${filename}`;
    
  } catch (error) {
    console.error('❌ Görsel üretim hatası:', error.message);
    return null;
  }
}

// Script olarak çalıştırılırsa
if (require.main === module) {
  const articleId = process.argv[2];
  const title = process.argv[3];
  const keyword = process.argv[4];
  
  if (!articleId || !title || !keyword) {
    console.error('Kullanım: node image-generator.js <articleId> <title> <keyword>');
    process.exit(1);
  }
  
  generateImage(parseInt(articleId), title, keyword);
}

module.exports = { generateImage };

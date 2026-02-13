#!/usr/bin/env node
/**
 * API Test Scripti
 * Tüm API anahtarlarını ve bağlantıları test eder
 */

require('dotenv').config();
const Groq = require('groq-sdk');
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');

console.log('🧪 API Testleri Başlıyor...\n');
console.log('ℹ️  Not: Sadece Groq API zorunludur (Ana AI Motoru)\n');

const results = {
  passed: [],
  failed: []
};

/**
 * Groq API Test
 */
async function testGroq() {
  try {
    console.log('🔄 Groq API test ediliyor...');
    
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY bulunamadı');
    }
    
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: 'Merhaba, test mesajı' }],
      model: 'llama-3.1-70b-versatile',
      max_tokens: 50
    });
    
    if (completion.choices[0].message.content) {
      console.log('✅ Groq API: Çalışıyor (Ana AI Motoru)\n');
      results.passed.push('Groq API');
      return true;
    }
  } catch (error) {
    console.log(`❌ Groq API: ${error.message}\n`);
    results.failed.push({ name: 'Groq API', error: error.message });
    return false;
  }
}

/**
 * Twitter API Test
 */
async function testTwitter() {
  try {
    console.log('🔄 Twitter API test ediliyor...');
    
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
      throw new Error('Twitter API anahtarları bulunamadı');
    }
    
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
    
    const me = await client.v2.me();
    
    if (me.data) {
      console.log(`✅ Twitter API: Çalışıyor (@${me.data.username})\n`);
      results.passed.push('Twitter API');
      return true;
    }
  } catch (error) {
    console.log(`❌ Twitter API: ${error.message}\n`);
    results.failed.push({ name: 'Twitter API', error: error.message });
    return false;
  }
}

/**
 * Pollinations.ai Test
 */
async function testPollinations() {
  try {
    console.log('🔄 Pollinations.ai test ediliyor...');
    
    const url = 'https://image.pollinations.ai/prompt/test?width=100&height=100&nologo=true';
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 15000
    });
    
    if (response.data && response.data.length > 0) {
      console.log('✅ Pollinations.ai: Çalışıyor\n');
      results.passed.push('Pollinations.ai');
      return true;
    }
  } catch (error) {
    console.log(`❌ Pollinations.ai: ${error.message}\n`);
    results.failed.push({ name: 'Pollinations.ai', error: error.message });
    return false;
  }
}

/**
 * Facebook API Test
 */
async function testFacebook() {
  try {
    console.log('🔄 Facebook API test ediliyor...');
    
    if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
      throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN bulunamadı');
    }
    
    const response = await axios.get('https://graph.facebook.com/v18.0/me', {
      params: { access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN }
    });
    
    if (response.data && response.data.id) {
      console.log(`✅ Facebook API: Çalışıyor (${response.data.name})\n`);
      results.passed.push('Facebook API');
      return true;
    }
  } catch (error) {
    console.log(`❌ Facebook API: ${error.message}\n`);
    results.failed.push({ name: 'Facebook API', error: error.message });
    return false;
  }
}

/**
 * Tüm testleri çalıştır
 */
async function runAllTests() {
  console.log('='.repeat(60) + '\n');
  
  // Kritik API - Sadece Groq (Ana Motoru)
  await testGroq();
  
  // Görsel API
  await testPollinations();
  
  // Sosyal medya API'ları (opsiyonel)
  await testTwitter();
  await testFacebook();
  
  // Sonuçları göster
  console.log('='.repeat(60));
  console.log('📊 TEST SONUÇLARI\n');
  
  console.log(`✅ Başarılı: ${results.passed.length}`);
  results.passed.forEach(name => console.log(`   - ${name}`));
  
  console.log(`\n❌ Başarısız: ${results.failed.length}`);
  results.failed.forEach(item => console.log(`   - ${item.name}: ${item.error}`));
  
  console.log('\n' + '='.repeat(60));
  
  if (results.failed.length === 0) {
    console.log('\n🎉 Tüm testler başarılı! Sistem kullanıma hazır.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Bazı API\'ler çalışmıyor. .env dosyanızı kontrol edin.\n');
    process.exit(1);
  }
}

// Testleri başlat
runAllTests().catch(error => {
  console.error('❌ Test hatası:', error);
  process.exit(1);
});

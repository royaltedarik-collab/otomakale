#!/usr/bin/env node
/**
 * Ana Otomasyon Zamanlayıcı
 * Tüm süreçleri koordine eder ve zamanlar
 */

require('dotenv').config();
const cron = require('node-cron');
const { main: generateContent } = require('./content-generator');
const { shareOnAllPlatforms } = require('./social-poster');
const { processArticleSEO } = require('./seo-indexer');

console.log('🤖 Otonom AI Blog Sistemi Başlatıldı\n');
console.log('⚙️  Konfigürasyon:');
console.log(`   - Günlük makale sayısı: ${process.env.POSTS_PER_DAY}`);
console.log(`   - Yayın saatleri: ${process.env.PUBLISH_HOURS}`);
console.log(`   - Otomatik yayın: ${process.env.AUTO_PUBLISH}`);
console.log(`   - Timezone: ${process.env.TIMEZONE}\n`);

/**
 * Tam otomasyon pipeline'ı
 */
async function runFullPipeline() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 YENİ MAKALE PIPELINE BAŞLIYOR');
    console.log('='.repeat(60) + '\n');
    
    const startTime = Date.now();
    
    // 1. İçerik üret
    console.log('📝 ADIM 1/3: İçerik Üretimi');
    const articleId = await generateContent();
    
    if (!articleId) {
      throw new Error('İçerik üretilemedi');
    }
    
    // Kısa bekleme (görsel üretimi için)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 2. SEO ve indexleme
    console.log('\n🔍 ADIM 2/3: SEO ve İndeksleme');
    await processArticleSEO(articleId);
    
    // 3. Sosyal medya paylaşımı
    console.log('\n📢 ADIM 3/3: Sosyal Medya Paylaşımı');
    await shareOnAllPlatforms(articleId);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ PIPELINE TAMAMLANDI');
    console.log(`⏱️  Süre: ${duration} saniye`);
    console.log('='.repeat(60) + '\n');
    
  } catch (error) {
    console.error('\n❌ Pipeline hatası:', error.message);
    console.error('Stack:', error.stack);
  }
}

/**
 * Cron job'ları ayarla
 */
function setupCronJobs() {
  const publishHours = process.env.PUBLISH_HOURS.split(',');
  const postsPerDay = parseInt(process.env.POSTS_PER_DAY);
  
  // Her yayın saati için cron job oluştur
  publishHours.forEach((hour, index) => {
    if (index < postsPerDay) {
      const [h, m] = hour.split(':');
      const cronExpression = `${m || '0'} ${h} * * *`;
      
      cron.schedule(cronExpression, () => {
        console.log(`\n⏰ Zamanlanmış görev tetiklendi: ${hour}`);
        runFullPipeline();
      }, {
        timezone: process.env.TIMEZONE || 'Europe/Istanbul'
      });
      
      console.log(`✅ Cron job ayarlandı: Her gün saat ${hour}`);
    }
  });
  
  // Sitemap ve RSS güncellemesi (her 6 saatte bir)
  cron.schedule('0 */6 * * *', () => {
    console.log('\n🔄 Sitemap ve RSS güncelleniyor...');
    const { generateSitemap, generateRSSFeed } = require('./seo-indexer');
    generateSitemap();
    generateRSSFeed();
  }, {
    timezone: process.env.TIMEZONE || 'Europe/Istanbul'
  });
  
  console.log('✅ Sitemap/RSS güncellemesi ayarlandı: Her 6 saatte bir\n');
}

/**
 * Sistem durumu raporu
 */
function printStatus() {
  const Database = require('better-sqlite3');
  const db = new Database(process.env.DATABASE_PATH);
  
  const stats = {
    total: db.prepare('SELECT COUNT(*) as count FROM articles').get().count,
    published: db.prepare('SELECT COUNT(*) as count FROM articles WHERE status = ?').get('published').count,
    draft: db.prepare('SELECT COUNT(*) as count FROM articles WHERE status = ?').get('draft').count,
    today: db.prepare(`
      SELECT COUNT(*) as count FROM articles 
      WHERE DATE(created_at) = DATE('now')
    `).get().count
  };
  
  console.log('📊 Sistem Durumu:');
  console.log(`   - Toplam makale: ${stats.total}`);
  console.log(`   - Yayınlanan: ${stats.published}`);
  console.log(`   - Taslak: ${stats.draft}`);
  console.log(`   - Bugün oluşturulan: ${stats.today}\n`);
  
  db.close();
}

/**
 * Graceful shutdown
 */
process.on('SIGINT', () => {
  console.log('\n\n👋 Sistem kapatılıyor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Sistem kapatılıyor...');
  process.exit(0);
});

// Ana program
async function main() {
  // Sistem durumunu göster
  printStatus();
  
  // Cron job'ları ayarla
  setupCronJobs();
  
  console.log('✅ Sistem hazır ve çalışıyor!');
  console.log('💡 İpucu: Ctrl+C ile durdurun\n');
  
  // İlk çalıştırmada hemen bir makale üret (opsiyonel)
  if (process.argv.includes('--immediate')) {
    console.log('🚀 İlk makale hemen üretiliyor...\n');
    await runFullPipeline();
  }
}

// Başlat
main().catch(console.error);

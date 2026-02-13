#!/usr/bin/env node
/**
 * Hızlı Başlangıç Scripti
 * Sistemi tek komutla kurar ve test eder
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Otonom AI Blog Sistemi - Hızlı Başlangıç\n');
console.log('='.repeat(60) + '\n');

/**
 * Komut çalıştır
 */
function runCommand(command, description) {
  try {
    console.log(`⏳ ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} tamamlandı\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} başarısız: ${error.message}\n`);
    return false;
  }
}

/**
 * Dosya kontrolü
 */
function checkFile(filepath, description) {
  if (fs.existsSync(filepath)) {
    console.log(`✅ ${description} mevcut`);
    return true;
  } else {
    console.log(`❌ ${description} bulunamadı: ${filepath}`);
    return false;
  }
}

/**
 * Ana kurulum
 */
async function main() {
  let allGood = true;

  // 1. .env dosyası kontrolü
  console.log('📋 ADIM 1: Ortam Değişkenleri Kontrolü\n');
  
  if (!checkFile('.env', '.env dosyası')) {
    console.log('⚠️  .env dosyası bulunamadı. .env.example dosyasını kopyalayın:\n');
    console.log('   Windows: copy .env.example .env');
    console.log('   Linux/Mac: cp .env.example .env\n');
    console.log('   Sonra API anahtarlarınızı .env dosyasına ekleyin.\n');
    allGood = false;
  } else {
    console.log('');
  }

  // 2. Bağımlılıkları yükle
  console.log('📦 ADIM 2: Bağımlılıkları Yükleme\n');
  
  if (!fs.existsSync('node_modules')) {
    if (!runCommand('npm install', 'Bağımlılıklar yükleniyor')) {
      allGood = false;
    }
  } else {
    console.log('✅ node_modules zaten mevcut\n');
  }

  // 3. Veritabanını kur
  console.log('🗄️  ADIM 3: Veritabanı Kurulumu\n');
  
  if (!runCommand('node scripts/setup-database.js', 'Veritabanı oluşturuluyor')) {
    allGood = false;
  }

  // 4. Klasörleri oluştur
  console.log('📁 ADIM 4: Klasör Yapısı\n');
  
  const folders = [
    'public/images',
    'logs',
    'database'
  ];

  folders.forEach(folder => {
    const folderPath = path.join(process.cwd(), folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ Klasör oluşturuldu: ${folder}`);
    } else {
      console.log(`✅ Klasör mevcut: ${folder}`);
    }
  });

  console.log('');

  // 5. API testleri (opsiyonel)
  if (fs.existsSync('.env')) {
    console.log('🧪 ADIM 5: API Testleri (Opsiyonel)\n');
    console.log('API testlerini çalıştırmak ister misiniz? (y/n)');
    console.log('Şimdilik atlıyoruz. Manuel test için: npm run test:apis\n');
  }

  // Sonuç
  console.log('='.repeat(60));
  
  if (allGood && fs.existsSync('.env')) {
    console.log('\n🎉 Kurulum Tamamlandı!\n');
    console.log('Sonraki Adımlar:\n');
    console.log('1. .env dosyasını düzenleyin ve API anahtarlarınızı ekleyin');
    console.log('2. API testlerini çalıştırın: npm run test:apis');
    console.log('3. İlk makaleyi oluşturun: npm run generate:article');
    console.log('4. Otomasyonu başlatın: npm run automation\n');
    console.log('Detaylı bilgi için: SETUP-GUIDE.md\n');
  } else {
    console.log('\n⚠️  Kurulum Tamamlanamadı\n');
    console.log('Lütfen yukarıdaki hataları düzeltin ve tekrar deneyin.\n');
    console.log('Yardım için: SETUP-GUIDE.md dosyasına bakın\n');
  }
  
  console.log('='.repeat(60) + '\n');
}

// Başlat
main().catch(console.error);

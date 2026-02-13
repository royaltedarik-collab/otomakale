#!/usr/bin/env node
/**
 * Database Kurulum Script'i
 * JSON dosya sistemi kullanır (SQLite yerine)
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || './database/articles.json';
const dbDir = path.dirname(dbPath);

console.log('🗄️  Database kurulumu başlıyor...');
console.log('📁 Database yolu:', dbPath);

// Database dizinini oluştur
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Database dizini oluşturuldu');
}

// Boş articles array ile JSON dosyası oluştur
const initialData = [];

if (fs.existsSync(dbPath)) {
  console.log('⚠️  Database zaten mevcut, atlanıyor');
  const existing = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  console.log(`📊 Mevcut makale sayısı: ${existing.length}`);
} else {
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  console.log('✅ Database dosyası oluşturuldu');
  console.log('📊 Hazır makale sayısı: 0');
}

console.log('✅ Database kurulumu tamamlandı!');

process.exit(0);

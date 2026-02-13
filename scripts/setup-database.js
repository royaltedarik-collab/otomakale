#!/usr/bin/env node
/**
 * Veritabanı Kurulum Scripti
 * SQLite veritabanını oluşturur ve tabloları hazırlar
 */

require('dotenv').config();
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || './database/blog.db';
const dbDir = path.dirname(dbPath);

// Klasör yoksa oluştur
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`✅ Klasör oluşturuldu: ${dbDir}`);
}

// Veritabanını aç
const db = new Database(dbPath);

console.log('🗄️  Veritabanı kuruluyor...\n');

// Articles tablosu
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    meta_description TEXT,
    category TEXT,
    keyword TEXT,
    featured_image TEXT,
    youtube_video TEXT,
    external_links TEXT,
    status TEXT DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    social_shares TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    published_at TEXT,
    indexed_at TEXT,
    shared_at TEXT
  )
`);
console.log('✅ Tablo oluşturuldu: articles');

// Index'ler
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
  CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
  CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
  CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
`);
console.log('✅ Index\'ler oluşturuldu');

// Analytics tablosu
db.exec(`
  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER,
    event_type TEXT,
    event_data TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id)
  )
`);
console.log('✅ Tablo oluşturuldu: analytics');

// Settings tablosu
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TEXT
  )
`);
console.log('✅ Tablo oluşturuldu: settings');

// Varsayılan ayarları ekle
const defaultSettings = [
  ['site_name', process.env.SITE_NAME || 'AI Araçları Hub'],
  ['site_url', process.env.SITE_URL || 'http://localhost:3000'],
  ['site_description', process.env.SITE_DESCRIPTION || 'En güncel AI araçları ve verimlilik ipuçları'],
  ['posts_per_day', process.env.POSTS_PER_DAY || '3'],
  ['auto_publish', process.env.AUTO_PUBLISH || 'true'],
  ['last_post_date', new Date().toISOString()]
];

const insertSetting = db.prepare(`
  INSERT OR REPLACE INTO settings (key, value, updated_at)
  VALUES (?, ?, ?)
`);

defaultSettings.forEach(([key, value]) => {
  insertSetting.run(key, value, new Date().toISOString());
});

console.log('✅ Varsayılan ayarlar eklendi');

// İstatistikleri göster
const stats = {
  articles: db.prepare('SELECT COUNT(*) as count FROM articles').get().count,
  settings: db.prepare('SELECT COUNT(*) as count FROM settings').get().count
};

console.log('\n📊 Veritabanı İstatistikleri:');
console.log(`   - Makaleler: ${stats.articles}`);
console.log(`   - Ayarlar: ${stats.settings}`);

db.close();

console.log('\n✅ Veritabanı kurulumu tamamlandı!');
console.log(`📁 Konum: ${path.resolve(dbPath)}\n`);

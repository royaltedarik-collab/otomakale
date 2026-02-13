# 📁 Proje Dosya Yapısı

## 📂 Dizin Ağacı

```
autonomous-ai-blog/
├── 📄 START-HERE.md                    ← BURADAN BAŞLA!
├── 📄 GITHUB-UPLOAD-GUIDE.md           GitHub'a yükleme rehberi (detaylı)
├── 📄 README.md                        Genel bakış
├── 📄 QUICK-START-FREE.md              Hızlı başlangıç (ücretsiz, 30 dk)
├── 📄 FREE-HOSTING-GUIDE.md            Detaylı ücretsiz hosting rehberi
├── 📄 DEPLOYMENT-GUIDE.md              Railway deployment (ücretli)
├── 📄 DEPLOYMENT-OPTIONS.md            Tüm seçeneklerin karşılaştırması
├── 📄 SETUP-GUIDE.md                   Yerel kurulum rehberi
├── 📄 CHECKLIST.md                     Kurulum kontrol listesi
├── 📄 FEATURES.md                      Özellikler listesi
├── 📄 WORKFLOW-DIAGRAM.md              İş akışı diyagramı
│
├── 📦 package.json                     Bağımlılıklar ve scriptler
├── 📄 .env.example                     Ortam değişkenleri şablonu
├── 📄 .gitignore                       Git ignore kuralları
│
├── 🚀 vercel.json                      Vercel konfigürasyonu
├── 🚀 railway.json                     Railway konfigürasyonu
├── 🚀 nixpacks.toml                    Nixpacks build ayarları
├── 🚀 Procfile                         Process tanımları
│
├── 📁 .github/
│   └── workflows/
│       └── cron.yml                    GitHub Actions workflow (ücretsiz cron)
│
├── 📁 automation/                      Otomasyon scriptleri
│   ├── content-generator.js            İçerik üretimi (AI)
│   ├── image-generator.js              Görsel üretimi (AI)
│   ├── social-poster.js                Sosyal medya paylaşımı
│   ├── seo-indexer.js                  SEO ve Google indexleme
│   └── scheduler.js                    Ana zamanlayıcı
│
├── 📁 config/                          Konfigürasyon dosyaları
│   ├── topics.json                     Konular ve anahtar kelimeler
│   └── schedule.json                   Zamanlama ayarları
│
├── 📁 scripts/                         Yardımcı scriptler
│   ├── setup-database.js               Veritabanı kurulumu
│   ├── test-apis.js                    API testleri
│   └── quick-start.js                  Hızlı başlangıç scripti
│
├── 📁 database/                        (Oluşturulacak)
│   └── blog.db                         SQLite veritabanı
│
└── 📁 public/                          (Oluşturulacak)
    └── images/                         Üretilen görseller
```

## 📚 Dokümantasyon Dosyaları

### 🎯 Başlangıç (Önce Bunları Oku)

| Dosya | Açıklama | Süre | Zorluk |
|-------|----------|------|--------|
| **START-HERE.md** | İlk okumanız gereken dosya | 5 dk | - |
| **QUICK-START-FREE.md** | 5 adımda ücretsiz deployment | 30 dk | Orta |
| **README.md** | Genel proje açıklaması | 5 dk | - |

### 🚀 Deployment Rehberleri

| Dosya | Platform | Maliyet | Süre | Zorluk |
|-------|----------|---------|------|--------|
| **FREE-HOSTING-GUIDE.md** | Vercel + GitHub Actions | $0/ay | 30 dk | Orta |
| **DEPLOYMENT-GUIDE.md** | Railway.app | $5/ay | 15 dk | Kolay |
| **DEPLOYMENT-OPTIONS.md** | Karşılaştırma | - | 10 dk | - |

### 🛠️ Kurulum ve Konfigürasyon

| Dosya | Açıklama | Süre |
|-------|----------|------|
| **SETUP-GUIDE.md** | Yerel geliştirme kurulumu | 45 dk |
| **CHECKLIST.md** | Kurulum kontrol listesi | 10 dk |
| **.env.example** | Ortam değişkenleri şablonu | 5 dk |

### 📖 Teknik Dokümantasyon

| Dosya | Açıklama |
|-------|----------|
| **FEATURES.md** | Tüm özellikler ve teknik detaylar |
| **WORKFLOW-DIAGRAM.md** | İş akışı ve otomasyon diyagramı |
| **FILE-STRUCTURE.md** | Bu dosya - Proje yapısı |

## 🔧 Konfigürasyon Dosyaları

### Deployment Konfigürasyonları

| Dosya | Platform | Açıklama |
|-------|----------|----------|
| **vercel.json** | Vercel | Vercel deployment ayarları |
| **railway.json** | Railway | Railway deployment ayarları |
| **nixpacks.toml** | Railway | Build konfigürasyonu |
| **Procfile** | Railway/Render | Process tanımları |

### Uygulama Konfigürasyonları

| Dosya | Açıklama |
|-------|----------|
| **config/topics.json** | Makale konuları, kategoriler, anahtar kelimeler |
| **config/schedule.json** | Yayın takvimi, zamanlama, otomasyon ayarları |
| **.env.example** | Ortam değişkenleri şablonu (API keys vb.) |

## 🤖 Otomasyon Scriptleri

### Ana Scriptler

| Dosya | Açıklama | Kullanım |
|-------|----------|----------|
| **content-generator.js** | AI ile makale üretimi | `npm run generate:article` |
| **image-generator.js** | AI ile görsel üretimi | `npm run generate:image` |
| **social-poster.js** | Sosyal medya paylaşımı | `node automation/social-poster.js <id>` |
| **seo-indexer.js** | SEO ve Google indexleme | `node automation/seo-indexer.js <id>` |
| **scheduler.js** | Ana zamanlayıcı (cron) | `npm run automation` |

### Yardımcı Scriptler

| Dosya | Açıklama | Kullanım |
|-------|----------|----------|
| **setup-database.js** | Veritabanı kurulumu | `npm run db:setup` |
| **test-apis.js** | API testleri | `npm run test:apis` |
| **quick-start.js** | Hızlı başlangıç | `npm run setup` |

## 🎯 Hangi Dosyayı Okumalıyım?

### Yeni Başlıyorum
1. **START-HERE.md** (5 dk)
2. **QUICK-START-FREE.md** (30 dk)
3. İşlem tamam! 🎉

### Seçenekleri Karşılaştırmak İstiyorum
1. **START-HERE.md** (5 dk)
2. **DEPLOYMENT-OPTIONS.md** (10 dk)
3. Seçtiğin rehberi takip et

### Yerel Geliştirme Yapacağım
1. **START-HERE.md** (5 dk)
2. **SETUP-GUIDE.md** (45 dk)
3. **CHECKLIST.md** (kontrol için)

### Teknik Detayları Öğrenmek İstiyorum
1. **FEATURES.md** - Özellikler
2. **WORKFLOW-DIAGRAM.md** - İş akışı
3. Kod dosyalarını incele

## 📦 NPM Scriptleri

### Geliştirme

```bash
npm run dev              # Next.js dev server
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
```

### Kurulum

```bash
npm run setup            # Hızlı kurulum (otomatik)
npm run db:setup         # Veritabanı kurulumu
npm run test:apis        # API testleri
```

### İçerik Üretimi

```bash
npm run generate:article # Tek makale üret
npm run generate:image   # Görsel üret
npm run automation       # Otomasyon başlat
npm run automation:start # PM2 ile arka planda başlat
```

### Monitoring

```bash
npm run logs             # Tüm loglar
npm run logs:errors      # Sadece hatalar
```

## 🗂️ Veritabanı Yapısı

### SQLite Tabloları

**articles**
- id, title, slug, content
- meta_description, category, keyword
- featured_image, youtube_video, external_links
- status, views, social_shares
- created_at, updated_at, published_at, indexed_at, shared_at

**analytics**
- id, article_id, event_type, event_data, created_at

**settings**
- key, value, updated_at

## 🌐 API Entegrasyonları

### AI Servisleri (Ücretsiz)
- **Groq API** - İçerik üretimi (Llama 3.1 70B)
- **Google Gemini** - Yedek içerik üretimi
- **Pollinations.ai** - Görsel üretimi

### Sosyal Medya (Ücretsiz)
- **Twitter API v2** - Tweet paylaşımı
- **Facebook Graph API** - Post paylaşımı
- **LinkedIn API** - Professional post
- **Pinterest API** - Pin (opsiyonel)

### SEO (Ücretsiz)
- **Google Indexing API** - Hızlı indexleme
- **Google/Bing Ping** - Sitemap bildirimi

## 📊 Dosya Boyutları

| Kategori | Dosya Sayısı | Toplam Boyut |
|----------|--------------|--------------|
| Dokümantasyon | 14 | ~150 KB |
| Kod (JS) | 8 | ~50 KB |
| Konfigürasyon | 7 | ~10 KB |
| **Toplam** | **29** | **~210 KB** |

## 🔄 Git Workflow

### Önemli Dosyalar

**Commit edilmeli:**
- Tüm `.md` dosyaları
- Tüm `.js` dosyaları
- Tüm `.json` dosyaları
- `.github/workflows/`
- `.env.example`

**Commit edilmemeli (.gitignore):**
- `.env` (API keys)
- `node_modules/`
- `database/*.db`
- `public/images/article-*`
- `logs/`

## 🆘 Sorun Giderme

### Dosya Bulunamıyor

```bash
# Tüm dosyaları listele
ls -la

# Eksik dosyaları kontrol et
cat FILE-STRUCTURE.md
```

### Hangi Rehberi Takip Edeceğimi Bilmiyorum

```bash
# Başlangıç dosyasını oku
cat START-HERE.md
```

### Deployment Hatası

```bash
# İlgili rehberin sorun giderme bölümüne bak
cat QUICK-START-FREE.md  # Vercel için
cat DEPLOYMENT-GUIDE.md  # Railway için
```

## 💡 İpuçları

1. **İlk okuma:** `START-HERE.md`
2. **Hızlı başlangıç:** `QUICK-START-FREE.md`
3. **Sorun mu var?** İlgili rehberin "Sorun Giderme" bölümü
4. **Özelleştirme:** `config/` klasöründeki dosyaları düzenle
5. **Yardım:** GitHub Issues

## 🎊 Başarı!

Tüm dosyalar hazır ve kullanıma hazır! 🚀

**Sonraki Adım:** `START-HERE.md` dosyasını oku ve başla!

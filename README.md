# 🤖 Otonom AI Blog Sistemi - AI Araçları & Verimlilik

Tamamen otonom çalışan, ücretsiz AI servisleriyle içerik üreten, SEO odaklı blog platformu.

## 🎯 Özellikler

- ✅ Otomatik makale üretimi (Groq API - Llama 3.1 70B)
- ✅ Otomatik görsel oluşturma (Pollinations.ai)
- ✅ YouTube video entegrasyonu (her makalede)
- ✅ Otoriter kaynak bağlantıları (Wikipedia, TechCrunch vb.)
- ✅ SEO optimizasyonu ve Google indexleme
- ✅ Sosyal medya otomasyonu (Twitter, Facebook, LinkedIn, Pinterest)
- ✅ RSS feed otomasyonu
- ✅ Tamamen ücretsiz AI servisleri
- ✅ Manuel müdahale gerektirmeyen sistem

## 🏗️ Teknoloji Stack

### Frontend & Backend
- **Next.js 14** (App Router) - React framework
- **Tailwind CSS** - Styling
- **SQLite** - Hafif veritabanı (ücretsiz)

### AI Servisleri (Ücretsiz)
- **Groq API** - Llama 3.1 70B (Ana AI motoru - hızlı içerik üretimi)
- **Pollinations.ai** - Görsel üretimi (limitsiz)

### Otomasyon
- **Node-cron** - Zamanlama
- **Custom scripts** - Sosyal medya ve SEO

### SEO & İndeksleme
- **Google Indexing API**
- **Sitemap generator**
- **Meta tags optimizer**

## 📊 Niche: AI Araçları & Verimlilik

2026'da en yüksek trafikli ve en karlı nişlerden biri. Araştırmalara göre:
- %45 büyüme oranı
- Yüksek CPC (reklam geliri)
- Sürekli güncel içerik ihtiyacı
- Geniş hedef kitle

## 🚀 Hızlı Başlangıç

### Tamamen Ücretsiz Deployment (Önerilen)

```bash
# 1. API anahtarlarını al (10 dakika)
# - Groq API: https://console.groq.com (Zorunlu - Ana AI motoru)

# 2. GitHub'a yükle
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-blog.git
git push -u origin main

# 3. Vercel'e deploy et
# https://vercel.com → Import GitHub repo

# 4. GitHub Actions ayarla
# Settings → Secrets → API anahtarlarını ekle

# 5. İlk makaleyi oluştur
# Actions → Run workflow
```

**Detaylı Rehber:** `QUICK-START-FREE.md`

### Alternatif: Railway (Ücretli)

```bash
# Railway CLI ile
npm i -g @railway/cli
railway login
railway init
railway up
```

**Detaylı Rehber:** `DEPLOYMENT-GUIDE.md`

## 📁 Proje Yapısı

```
autonomous-ai-blog/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog sayfaları
│   └── components/        # React bileşenleri
├── automation/            # Otomasyon scriptleri
│   ├── content-generator.js
│   ├── image-generator.js
│   ├── social-poster.js
│   └── seo-indexer.js
├── config/                # Konfigürasyon
├── database/              # SQLite veritabanı
└── public/                # Statik dosyalar
```

## 🔑 Gerekli API Anahtarları (Hepsi Ücretsiz)

1. **Groq API** - https://console.groq.com (Zorunlu - Ana AI motoru)
2. **Twitter API** - https://developer.twitter.com (Opsiyonel)
3. **Facebook API** - https://developers.facebook.com (Opsiyonel)
5. **Google Search Console** - Indexing API için

## 📖 Detaylı Kurulum

### 🆓 Tamamen Ücretsiz Hosting
- **Hızlı Başlangıç**: `QUICK-START-FREE.md` (5 adımda 30 dakika)
- **Detaylı Rehber**: `FREE-HOSTING-GUIDE.md` (Vercel + GitHub Actions)
- **Seçenekler**: `DEPLOYMENT-OPTIONS.md` (Karşılaştırma)

### 💵 Ücretli Hosting (Railway)
- **Railway Rehberi**: `DEPLOYMENT-GUIDE.md` ($5/ay)

### 🛠️ Yerel Geliştirme
- **Kurulum Rehberi**: `SETUP-GUIDE.md`
- **Kontrol Listesi**: `CHECKLIST.md`

### 📚 Diğer Dokümantasyon
- **Özellikler**: `FEATURES.md`
- **İş Akışı**: `WORKFLOW-DIAGRAM.md`

## 🎨 Özelleştirme

- `config/topics.json` - Makale konuları ve anahtar kelimeler
- `config/schedule.json` - Yayın takvimi
- `config/social-templates.json` - Sosyal medya şablonları

## 📈 Performans

- Core Web Vitals: Yeşil bölge
- Lighthouse Score: 95+
- Otomatik resim optimizasyonu
- Lazy loading
- Minimal JavaScript

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır!

## 📄 Lisans

MIT License

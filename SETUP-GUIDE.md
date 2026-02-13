# 📚 Detaylı Kurulum Rehberi

Bu rehber, otonom AI blog sistemini sıfırdan kurmak için gereken tüm adımları içerir.

## 🎯 Adım 1: Gereksinimler

### Yazılım Gereksinimleri
- Node.js 18+ (https://nodejs.org)
- Git (https://git-scm.com)
- Bir kod editörü (VS Code önerilir)

### Hesaplar (Hepsi Ücretsiz)
- [ ] Groq hesabı (https://console.groq.com)
- [ ] Google Cloud hesabı (Gemini API için)
- [ ] Twitter Developer hesabı
- [ ] Facebook Developer hesabı
- [ ] Google Search Console hesabı
- [ ] Vercel hesabı (hosting için - opsiyonel)

---

## 🔧 Adım 2: Proje Kurulumu

### 2.1 Projeyi İndir

```bash
# Proje klasörüne git
cd autonomous-ai-blog

# Bağımlılıkları yükle
npm install
```

### 2.2 Veritabanı Kurulumu

```bash
# SQLite veritabanını oluştur
npm run db:setup
```

---

## 🔑 Adım 3: API Anahtarlarını Al

### 3.1 Groq API (İçerik Üretimi)

1. https://console.groq.com adresine git
2. Ücretsiz hesap oluştur
3. API Keys bölümünden yeni anahtar oluştur
4. Anahtarı kopyala (örnek: `gsk_...`)

**Limitler:** Günlük 14,400 istek (dakikada 30) - Ücretsiz

### 3.2 Google Gemini API (Yedek İçerik Motoru)

1. https://makersuite.google.com adresine git
2. "Get API Key" butonuna tıkla
3. Yeni proje oluştur veya mevcut projeyi seç
4. API anahtarını kopyala

**Limitler:** Günlük 1,500 istek - Ücretsiz

### 3.3 Twitter API v2

1. https://developer.twitter.com/en/portal/dashboard adresine git
2. "Create Project" → "Create App"
3. App permissions: "Read and Write"
4. Keys and tokens bölümünden al:
   - API Key
   - API Secret
   - Access Token
   - Access Token Secret

### 3.4 Facebook Graph API

1. https://developers.facebook.com adresine git
2. "My Apps" → "Create App"
3. App type: "Business"
4. Settings → Basic → App ID ve App Secret'i kopyala
5. Facebook Login ekle
6. Page Access Token al

### 3.5 LinkedIn API

1. https://www.linkedin.com/developers adresine git
2. "Create App" butonuna tıkla
3. Products → "Share on LinkedIn" ekle
4. Auth → Client ID ve Client Secret'i al

### 3.6 Google Indexing API

1. https://console.cloud.google.com adresine git
2. Yeni proje oluştur
3. "APIs & Services" → "Enable APIs"
4. "Web Search Indexing API" ara ve etkinleştir
5. "Credentials" → "Create Credentials" → "Service Account"
6. JSON key dosyasını indir
7. Search Console'da service account email'ini owner olarak ekle

---

## ⚙️ Adım 4: Ortam Değişkenlerini Ayarla

`.env` dosyası oluştur:

```bash
cp .env.example .env
```

`.env` dosyasını düzenle:

```env
# AI Servisleri
GROQ_API_KEY=gsk_your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here

# Sosyal Medya - Twitter
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret

# Sosyal Medya - Facebook
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token

# Sosyal Medya - LinkedIn
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token

# Google Indexing API
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Site Ayarları
SITE_URL=https://yourdomain.com
SITE_NAME=AI Araçları Hub
SITE_DESCRIPTION=En güncel AI araçları ve verimlilik ipuçları

# Veritabanı
DATABASE_PATH=./database/blog.db

# Otomasyon Ayarları
AUTO_PUBLISH=true
POSTS_PER_DAY=3
PUBLISH_HOURS=09,14,19
```

---

## 🎨 Adım 5: İçerik Ayarlarını Yapılandır

### 5.1 Konu ve Anahtar Kelimeler

`config/topics.json` dosyasını düzenle:

```json
{
  "categories": [
    {
      "name": "AI Araçları",
      "keywords": [
        "chatgpt alternatifleri",
        "ücretsiz ai araçları",
        "ai yazma araçları",
        "ai görsel oluşturma",
        "ai kod yazma"
      ],
      "tone": "bilgilendirici ve samimi"
    },
    {
      "name": "Verimlilik",
      "keywords": [
        "zaman yönetimi",
        "üretkenlik uygulamaları",
        "not alma araçları",
        "proje yönetimi",
        "otomasyon araçları"
      ],
      "tone": "pratik ve motive edici"
    }
  ]
}
```

### 5.2 Yayın Takvimi

`config/schedule.json` dosyasını düzenle:

```json
{
  "postsPerDay": 3,
  "publishHours": ["09:00", "14:00", "19:00"],
  "timezone": "Europe/Istanbul",
  "autoPublish": true,
  "minWordCount": 1500,
  "maxWordCount": 2500
}
```

---

## 🚀 Adım 6: Sistemi Başlat

### 6.1 Geliştirme Modunda Test

```bash
# Web sitesini başlat
npm run dev

# Tarayıcıda aç: http://localhost:3000
```

### 6.2 İlk İçeriği Manuel Oluştur (Test)

```bash
# Tek bir makale oluştur
npm run generate:article

# Görsel oluştur
npm run generate:image
```

### 6.3 Otomasyon Sistemini Başlat

```bash
# Otomasyon scriptlerini başlat
npm run automation

# Veya arka planda çalıştır
npm run automation:start
```

---

## 📊 Adım 7: İzleme ve Kontrol

### 7.1 Dashboard

Tarayıcıda `http://localhost:3000/admin` adresine git:

- Yayınlanan makaleler
- Bekleyen makaleler
- Sosyal medya istatistikleri
- SEO performansı

### 7.2 Logları Kontrol Et

```bash
# Tüm logları göster
npm run logs

# Sadece hataları göster
npm run logs:errors
```

---

## 🌐 Adım 8: Canlıya Alma (Production)

### 8.1 Vercel'e Deploy

```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel

# Ortam değişkenlerini Vercel dashboard'dan ekle
```

### 8.2 Domain Bağla

1. Vercel dashboard'da projeyi aç
2. Settings → Domains
3. Kendi domain'ini ekle
4. DNS ayarlarını güncelle

### 8.3 Cron Job Ayarla

Vercel ücretsiz planda cron job yok. Alternatifler:

**Seçenek 1: Cron-job.org (Ücretsiz)**
1. https://cron-job.org adresine git
2. Ücretsiz hesap oluştur
3. Yeni cron job ekle:
   - URL: `https://yourdomain.com/api/cron/generate`
   - Schedule: Her 8 saatte bir

**Seçenek 2: GitHub Actions (Ücretsiz)**
`.github/workflows/cron.yml` dosyası zaten hazır.

---

## ✅ Adım 9: İlk 24 Saat

### Sistem Otomatik Olarak:

1. ✅ Her 8 saatte bir yeni makale üretir
2. ✅ Her makale için görsel oluşturur
3. ✅ SEO optimizasyonu yapar
4. ✅ Google'a indexleme isteği gönderir
5. ✅ Tüm sosyal medya platformlarında paylaşır
6. ✅ RSS feed'i günceller

### Sen Sadece:

- İstatistikleri kontrol et
- Gerekirse manuel düzeltme yap
- Yeni anahtar kelimeler ekle

---

## 🔧 Sorun Giderme

### Makale Üretilmiyor

```bash
# API anahtarlarını kontrol et
npm run test:apis

# Logları incele
npm run logs:errors
```

### Görsel Oluşturulmuyor

Pollinations.ai bazen yavaş olabilir. Alternatif:
- `config/image-settings.json` dosyasında `fallbackToPlaceholder: true` yap

### Sosyal Medya Paylaşımı Çalışmıyor

- API anahtarlarını kontrol et
- Rate limit'e takılmış olabilirsin (24 saat bekle)
- Token'ların expire olmuş olabilir (yenile)

---

## 📞 Destek

Sorun yaşarsan:
1. `docs/troubleshooting.md` dosyasına bak
2. GitHub Issues'da ara
3. Yeni issue aç

---

## 🎉 Tebrikler!

Sistemin artık tamamen otonom çalışıyor. Hiçbir manuel müdahale gerektirmeden:
- İçerik üretiyor
- Görsel oluşturuyor
- SEO yapıyor
- Sosyal medyada paylaşıyor

Sadece ara sıra kontrol et ve keyfini çıkar! 🚀

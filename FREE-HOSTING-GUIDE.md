# 🆓 Tamamen Ücretsiz Hosting ve Domain Rehberi

Bu rehber, AI blog sistemini **%100 ücretsiz** olarak nasıl çalıştıracağınızı gösterir.

## 🎯 Ücretsiz Çözüm Mimarisi

### Seçenek 1: Vercel + GitHub Actions (ÖNERİLEN)
- **Hosting**: Vercel (ücretsiz, sınırsız)
- **Cron Jobs**: GitHub Actions (ücretsiz)
- **Domain**: Vercel subdomain (.vercel.app) VEYA Freenom (.tk, .ml, .ga)
- **Veritabanı**: Vercel KV veya Turso (ücretsiz tier)

### Seçenek 2: Render.com + Cron-job.org
- **Hosting**: Render.com (750 saat/ay ücretsiz)
- **Cron Jobs**: Cron-job.org (ücretsiz)
- **Domain**: Render subdomain (.onrender.com)
- **Veritabanı**: SQLite (ephemeral)

## 🚀 Seçenek 1: Vercel + GitHub Actions (TAM ÖZELLİKLİ)

### Avantajlar
✅ Tamamen ücretsiz, sınırsız
✅ Hızlı ve güvenilir
✅ Otomatik SSL
✅ Global CDN
✅ Kolay deployment

### Dezavantajlar
⚠️ Serverless (her istek yeni instance)
⚠️ SQLite yerine KV database gerekli
⚠️ Background worker yok (GitHub Actions ile çözülür)

---

## 📋 ADIM 1: Projeyi GitHub'a Yükle

```bash
# Proje klasöründe
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-blog.git
git branch -M main
git push -u origin main
```

---

## 📋 ADIM 2: Vercel'e Deploy

### 2.1 Vercel Hesabı Oluştur

1. https://vercel.com adresine git
2. "Sign Up" → GitHub ile giriş yap
3. GitHub hesabını bağla

### 2.2 Proje Import Et

1. Vercel Dashboard → "Add New" → "Project"
2. GitHub repository'nizi seçin
3. Framework Preset: "Other" seç
4. Build Command: `npm run db:setup`
5. Output Directory: `.` (boş bırak)
6. Install Command: `npm install`

### 2.3 Ortam Değişkenlerini Ekle

"Environment Variables" bölümünde:

```env
# AI Servisleri
GROQ_API_KEY=gsk_your_key_here
GEMINI_API_KEY=your_key_here

# Sosyal Medya
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_SECRET=your_secret

FACEBOOK_APP_ID=your_id
FACEBOOK_APP_SECRET=your_secret
FACEBOOK_PAGE_ACCESS_TOKEN=your_token

LINKEDIN_CLIENT_ID=your_id
LINKEDIN_CLIENT_SECRET=your_secret
LINKEDIN_ACCESS_TOKEN=your_token

# Google Indexing
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Site Ayarları
SITE_URL=https://your-project.vercel.app
SITE_NAME=AI Araçları Hub
SITE_DESCRIPTION=En güncel AI araçları ve verimlilik ipuçları

# Otomasyon
AUTO_PUBLISH=true
POSTS_PER_DAY=3
PUBLISH_HOURS=09,14,19
TIMEZONE=Europe/Istanbul
INCLUDE_IMAGES=true
NODE_ENV=production
```

### 2.4 Deploy Et

"Deploy" butonuna tıkla. Vercel otomatik olarak:
- Bağımlılıkları yükler
- Build yapar
- Deploy eder

---

## 📋 ADIM 3: GitHub Actions ile Cron Jobs

Vercel'de background worker olmadığı için GitHub Actions kullanacağız.

### 3.1 GitHub Actions Workflow Oluştur

Proje klasöründe:

```bash
mkdir -p .github/workflows
```

`.github/workflows/cron.yml` dosyası oluştur:

```yaml
name: Automated Content Generation

on:
  schedule:
    # Her gün 09:00, 14:00, 19:00 UTC+3 (06:00, 11:00, 16:00 UTC)
    - cron: '0 6,11,16 * * *'
  workflow_dispatch: # Manuel tetikleme

jobs:
  generate-content:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Setup database
        run: npm run db:setup
      
      - name: Generate article
        env:
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
          TWITTER_API_SECRET: ${{ secrets.TWITTER_API_SECRET }}
          TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          TWITTER_ACCESS_SECRET: ${{ secrets.TWITTER_ACCESS_SECRET }}
          FACEBOOK_APP_ID: ${{ secrets.FACEBOOK_APP_ID }}
          FACEBOOK_APP_SECRET: ${{ secrets.FACEBOOK_APP_SECRET }}
          FACEBOOK_PAGE_ACCESS_TOKEN: ${{ secrets.FACEBOOK_PAGE_ACCESS_TOKEN }}
          LINKEDIN_CLIENT_ID: ${{ secrets.LINKEDIN_CLIENT_ID }}
          LINKEDIN_CLIENT_SECRET: ${{ secrets.LINKEDIN_CLIENT_SECRET }}
          LINKEDIN_ACCESS_TOKEN: ${{ secrets.LINKEDIN_ACCESS_TOKEN }}
          GOOGLE_SERVICE_ACCOUNT_EMAIL: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_EMAIL }}
          GOOGLE_PRIVATE_KEY: ${{ secrets.GOOGLE_PRIVATE_KEY }}
          SITE_URL: ${{ secrets.SITE_URL }}
          SITE_NAME: "AI Araçları Hub"
          SITE_DESCRIPTION: "En güncel AI araçları ve verimlilik ipuçları"
          DATABASE_PATH: ./database/blog.db
          AUTO_PUBLISH: true
          POSTS_PER_DAY: 3
          INCLUDE_IMAGES: true
          NODE_ENV: production
        run: |
          node automation/content-generator.js
          node automation/seo-indexer.js $(cat /tmp/article_id.txt)
          node automation/social-poster.js $(cat /tmp/article_id.txt)
```

### 3.2 GitHub Secrets Ekle

1. GitHub repository → Settings → Secrets and variables → Actions
2. "New repository secret" tıkla
3. Tüm API anahtarlarını ekle (yukarıdaki listeden)

### 3.3 Workflow'u Test Et

1. GitHub repository → Actions sekmesi
2. "Automated Content Generation" workflow'u seç
3. "Run workflow" → "Run workflow" tıkla
4. Logları izle

---

## 📋 ADIM 4: Ücretsiz Domain (Opsiyonel)

### Seçenek A: Vercel Subdomain (Önerilen)

Vercel otomatik verir: `your-project.vercel.app`

**Avantajlar:**
- Ücretsiz
- Otomatik SSL
- Hızlı
- Güvenilir

### Seçenek B: Freenom Ücretsiz Domain

1. https://www.freenom.com adresine git
2. Domain ara (örn: `aiaraclar`)
3. Ücretsiz uzantı seç: `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
4. "Get it now" → "Checkout"
5. Period: 12 Months @ FREE
6. "Continue" → Hesap oluştur
7. Domain'i al

**DNS Ayarları:**

Freenom'da:
1. Services → My Domains → Manage Domain
2. Management Tools → Nameservers
3. "Use custom nameservers" seç
4. Vercel'in nameserver'larını ekle:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

Vercel'de:
1. Project Settings → Domains
2. "Add" → Domain'inizi girin
3. DNS kayıtlarını doğrula

**Uyarı:** Freenom domainleri bazen geri alınabiliyor. Profesyonel kullanım için önerilmez.

### Seçenek C: InfinityFree Subdomain

1. https://infinityfree.com adresine git
2. Ücretsiz hesap oluştur
3. Subdomain al: `yoursite.rf.gd` veya `yoursite.epizy.com`

**Not:** InfinityFree Node.js desteklemiyor, sadece subdomain için kullan.

---

## 📊 Maliyet Analizi

### Vercel Ücretsiz Tier Limitleri

| Kaynak | Limit | Yeterli mi? |
|--------|-------|-------------|
| Bandwidth | 100 GB/ay | ✅ Evet |
| Function Invocations | 100,000/ay | ✅ Evet |
| Build Minutes | 6,000/ay | ✅ Evet |
| Serverless Function Duration | 10 saniye | ✅ Evet |
| Deployments | Sınırsız | ✅ Evet |

**Sonuç:** Aylık 10,000+ ziyaretçi için yeterli!

### GitHub Actions Limitleri

| Kaynak | Limit | Yeterli mi? |
|--------|-------|-------------|
| Workflow runs | Sınırsız | ✅ Evet |
| Job execution time | 6 saat | ✅ Evet (5 dk yeterli) |
| Concurrent jobs | 20 | ✅ Evet |
| Storage | 500 MB | ✅ Evet |

**Sonuç:** Günde 3 makale için fazlasıyla yeterli!

---

## 🔧 Alternatif: Render.com (Basit Ama Sınırlı)

### Avantajlar
✅ Kolay kurulum
✅ SQLite desteği
✅ Background worker

### Dezavantajlar
⚠️ 750 saat/ay limit (31 gün × 24 saat = 744 saat)
⚠️ 15 dakika inactivity sonrası sleep
⚠️ Cold start (ilk istek yavaş)

### Kurulum

1. https://render.com → Sign Up (GitHub ile)
2. "New" → "Web Service"
3. GitHub repo'nuzu bağla
4. Settings:
   - Name: `ai-blog`
   - Environment: `Node`
   - Build Command: `npm install && npm run db:setup`
   - Start Command: `npm run automation`
   - Plan: **Free**

5. Environment Variables ekle (yukarıdaki liste)

6. "Create Web Service"

### Sleep Problemi Çözümü

Render free tier 15 dakika sonra uyur. Çözüm: Cron-job.org

1. https://cron-job.org → Ücretsiz hesap
2. "Create cronjob"
3. Title: `Keep Render Awake`
4. URL: `https://your-app.onrender.com/health`
5. Schedule: `*/14 * * * *` (her 14 dakika)
6. Save

---

## 📱 Monitoring (Ücretsiz)

### UptimeRobot

1. https://uptimerobot.com → Ücretsiz hesap
2. "Add New Monitor"
3. Monitor Type: HTTP(s)
4. URL: `https://your-app.vercel.app`
5. Monitoring Interval: 5 minutes
6. Alert Contacts: Email ekle

### Better Stack (Opsiyonel)

1. https://betterstack.com → Ücretsiz hesap
2. Uptime monitoring ekle
3. Log management (opsiyonel)

---

## ✅ Başarı Kontrol Listesi

- [ ] GitHub repository oluşturuldu
- [ ] Vercel'e deploy edildi
- [ ] Ortam değişkenleri eklendi
- [ ] GitHub Actions workflow oluşturuldu
- [ ] GitHub Secrets eklendi
- [ ] İlk workflow manuel çalıştırıldı
- [ ] İlk makale oluşturuldu
- [ ] Domain bağlandı (opsiyonel)
- [ ] Uptime monitoring eklendi

---

## 🎯 Beklenen Sonuçlar

### İlk 24 Saat
- ✅ 3 makale otomatik oluşturulacak
- ✅ Her makale sosyal medyada paylaşılacak
- ✅ Sitemap güncellenecek
- ✅ RSS feed çalışacak

### İlk Ay
- ✅ 90 makale yayınlanacak
- ✅ Google'da indexlenecek
- ✅ Organik trafik başlayacak
- ✅ Sosyal medya takipçileri artacak

### Maliyet
- ✅ **$0.00** - Tamamen ücretsiz!

---

## 🆘 Sorun Giderme

### GitHub Actions Çalışmıyor

```bash
# Workflow dosyasını kontrol et
cat .github/workflows/cron.yml

# Secrets kontrol et
# GitHub → Settings → Secrets → Actions
```

### Vercel Build Hatası

```bash
# Yerel test
npm install
npm run db:setup
npm run automation
```

### API Limiti

Groq: 14,400 istek/gün
- Günde 3 makale = ~15 istek
- Bol margin var ✅

---

## 💡 Optimizasyon İpuçları

1. **Görsel boyutunu küçült**: 800x400px yeterli
2. **Makale sayısını ayarla**: Günde 2 makale da olur
3. **Cache kullan**: Vercel otomatik cache yapar
4. **CDN**: Vercel global CDN sağlar
5. **Lazy loading**: Görseller için

---

## 🎊 Tebrikler!

Sisteminiz artık **tamamen ücretsiz** çalışıyor! 🚀

**Toplam Maliyet: $0.00/ay**

**Sonraki Adımlar:**
1. Google Analytics ekle (ücretsiz)
2. Google Search Console'a ekle (ücretsiz)
3. İlk hafta istatistiklerini izle
4. Popüler konuları not al
5. SEO performansını takip et

---

## 📞 Yardım

### Dokümantasyon
- Vercel: https://vercel.com/docs
- GitHub Actions: https://docs.github.com/actions
- Render: https://render.com/docs

### Community
- Vercel Discord: https://vercel.com/discord
- GitHub Discussions: Repository'nizde

---

**Not:** Bu çözüm küçük-orta ölçekli bloglar için mükemmel. Aylık 50,000+ ziyaretçi için ücretli plan gerekebilir.

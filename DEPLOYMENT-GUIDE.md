# 🚀 Railway.app Deployment Rehberi

Bu rehber, otonom AI blog sistemini **Railway.app** üzerinde ücretsiz olarak nasıl deploy edeceğinizi gösterir.

## 🎯 Neden Railway.app?

- ✅ **$5 Ücretsiz Trial Credit** (30 gün veya $5 bitene kadar)
- ✅ **Cron Job Desteği** (Otomatik zamanlama)
- ✅ **Node.js Native Desteği**
- ✅ **SQLite Desteği** (Volume ile)
- ✅ **Background Worker** desteği
- ✅ **Otomatik Git Deployment**
- ✅ **Ücretsiz SSL**
- ✅ **Kolay kullanım**

## 📋 Gereksinimler

- [ ] GitHub hesabı
- [ ] Railway.app hesabı (GitHub ile giriş yapabilirsiniz)
- [ ] Tüm API anahtarları hazır

## 🚀 Adım Adım Deployment

### 1. GitHub Repository Oluştur

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

### 2. Railway.app Hesabı Oluştur

1. https://railway.app adresine git
2. "Start a New Project" tıkla
3. GitHub ile giriş yap
4. GitHub hesabını bağla

### 3. Proje Deploy Et

#### Yöntem 1: GitHub'dan Deploy (Önerilen)

1. Railway Dashboard'da "New Project" tıkla
2. "Deploy from GitHub repo" seç
3. Repository'nizi seçin
4. Railway otomatik olarak:
   - Node.js algılar
   - Bağımlılıkları yükler
   - Veritabanını kurar
   - Uygulamayı başlatır

#### Yöntem 2: Railway CLI ile Deploy

```bash
# Railway CLI yükle
npm i -g @railway/cli

# Giriş yap
railway login

# Proje oluştur
railway init

# Deploy et
railway up
```

### 4. Ortam Değişkenlerini Ayarla

Railway Dashboard'da:

1. Projenizi seçin
2. "Variables" sekmesine git
3. Tüm API anahtarlarını ekle:

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
SITE_URL=https://your-app.up.railway.app
SITE_NAME=AI Araçları Hub
SITE_DESCRIPTION=En güncel AI araçları ve verimlilik ipuçları

# Veritabanı
DATABASE_PATH=/app/database/blog.db

# Otomasyon
AUTO_PUBLISH=true
POSTS_PER_DAY=3
PUBLISH_HOURS=09,14,19
TIMEZONE=Europe/Istanbul
MIN_WORD_COUNT=1500
MAX_WORD_COUNT=2500
INCLUDE_FAQ=true
INCLUDE_IMAGES=true
IMAGE_API=pollinations
AUTO_INDEX=true
PING_GOOGLE=true
PING_BING=true
NODE_ENV=production
```

### 5. Volume Ekle (Veritabanı İçin)

Railway Dashboard'da:

1. Projenizi seçin
2. "New" → "Volume" tıkla
3. Mount Path: `/app/database`
4. Size: 1 GB (yeterli)
5. "Add Volume" tıkla

Bu, SQLite veritabanınızın kalıcı olmasını sağlar.

### 6. Domain Ayarla (Opsiyonel)

Railway size otomatik bir domain verir: `your-app.up.railway.app`

Kendi domain'inizi bağlamak için:

1. "Settings" → "Domains"
2. "Custom Domain" ekle
3. DNS ayarlarınızı güncelle

### 7. Deployment'ı Kontrol Et

Railway Dashboard'da:

1. "Deployments" sekmesine git
2. Build loglarını kontrol et
3. "View Logs" ile runtime loglarını izle

Başarılı deployment göstergesi:
```
✅ Sistem hazır ve çalışıyor!
💡 İpucu: Ctrl+C ile durdurun
```

## 📊 Maliyet Hesaplama

### Ücretsiz Trial ($5 credit)

Tahmini kullanım:
- **RAM**: 512 MB × 730 saat/ay = $3.65/ay
- **CPU**: 0.5 vCPU × 730 saat/ay = $7.30/ay
- **Toplam**: ~$11/ay

**Sonuç**: Trial credit 15-20 gün sürer.

### Optimizasyon İpuçları

1. **Makale sayısını azalt**: `POSTS_PER_DAY=2` (günde 2 makale)
2. **Görsel üretimini devre dışı bırak**: `INCLUDE_IMAGES=false`
3. **Sosyal medya paylaşımını azalt**: Sadece Twitter

Bu optimizasyonlarla trial credit 30 gün sürebilir.

### Trial Bittikten Sonra

Railway'in ücretsiz planı: **$1/ay credit**

Bu yeterli değil, ama seçenekler:
1. **Hobby Plan**: $5/ay (içinde $5 usage credit)
2. **Başka platform**: Render.com, Fly.io
3. **Kendi sunucunuz**: VPS ($5/ay)

## 🔧 Sorun Giderme

### Build Başarısız

```bash
# Logları kontrol et
railway logs

# Yerel test
npm install
npm run db:setup
npm run automation
```

### Veritabanı Hatası

Volume mount edildi mi kontrol et:
- Settings → Volumes → `/app/database`

### Cron Job Çalışmıyor

Railway'de cron job otomatik çalışır. Kontrol:
```bash
railway logs --follow
```

### API Limitleri

Groq API limiti: 14,400 istek/gün
- Günde 3 makale = ~12 istek
- Bol bol margin var ✅

## 📱 Monitoring

### Railway Dashboard

- CPU kullanımı
- RAM kullanımı
- Network trafiği
- Deployment geçmişi

### Loglar

```bash
# Railway CLI ile
railway logs

# Veya Dashboard'dan
Deployments → View Logs
```

## 🎯 İlk 24 Saat Checklist

- [ ] Deployment başarılı
- [ ] İlk makale oluşturuldu
- [ ] Görsel eklendi
- [ ] YouTube video var
- [ ] Sosyal medyada paylaşıldı
- [ ] Sitemap oluşturuldu
- [ ] RSS feed çalışıyor
- [ ] Loglar temiz

## 🔄 Güncelleme

Kod değişikliği yaptığınızda:

```bash
git add .
git commit -m "Update"
git push

# Railway otomatik deploy eder
```

## 💡 Pro İpuçları

1. **GitHub Actions**: Otomatik test ekle
2. **Environment Branches**: Staging ortamı oluştur
3. **Monitoring**: Better Stack veya Sentry ekle
4. **Backup**: Veritabanını düzenli yedekle
5. **Scaling**: Trafik artarsa Hobby plan'a geç

## 🆘 Yardım

### Railway Dokümantasyon
- https://docs.railway.app

### Railway Discord
- https://discord.gg/railway

### GitHub Issues
- Proje repository'nizde issue açın

## 🎊 Tebrikler!

Sisteminiz artık Railway'de çalışıyor ve tamamen otonom! 🚀

**Sonraki Adımlar:**
1. Domain bağla
2. Google Analytics ekle
3. İlk hafta istatistiklerini izle
4. Popüler konuları not al
5. SEO performansını takip et

---

**Not**: Railway trial credit bittiğinde sistem duracaktır. Devam etmek için Hobby plan ($5/ay) gerekir veya başka bir platforma geçebilirsiniz.

# 🔍 GitHub Actions Makale Üretimi Kontrol Rehberi

## ⏰ Cron Zamanlaması

GitHub Actions şu saatlerde çalışacak şekilde ayarlandı:
- **09:00 TR** (06:00 UTC)
- **14:00 TR** (11:00 UTC)
- **19:00 TR** (16:00 UTC)

## 📋 Kontrol Adımları

### 1. GitHub Actions Sayfasına Gidin
1. https://github.com/royaltedarik-collab/otomakale adresine gidin
2. Üst menüden "Actions" sekmesine tıklayın
3. Sol tarafta "Automated Content Generation" workflow'unu seçin

### 2. Son Çalışmayı Kontrol Edin
- En üstte son çalışma görünecek
- Yeşil ✅ işareti: Başarılı
- Kırmızı ❌ işareti: Hata var
- Sarı 🟡 işareti: Çalışıyor

### 3. Hata Varsa Logları İnceleyin
1. Başarısız olan workflow'a tıklayın
2. "generate-and-publish" job'una tıklayın
3. Her adımı açarak hata mesajlarını okuyun

## 🔑 Gerekli Secret'lar

GitHub Actions'ın çalışması için şu secret'ların tanımlı olması gerekiyor:

### Zorunlu:
- `GROQ_API_KEY` - Groq AI API anahtarı (makale üretimi için)

### Opsiyonel (Sosyal Medya):
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`
- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`
- `FACEBOOK_PAGE_ACCESS_TOKEN`
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `LINKEDIN_ACCESS_TOKEN`

### Opsiyonel (SEO):
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

### Site Bilgileri:
- `SITE_URL` - https://otomakale.vercel.app
- `SITE_NAME` - TeknoVeAI
- `SITE_DESCRIPTION` - AI, Teknoloji ve Verimlilik Blog

## 🔧 Secret'ları Nasıl Eklerim?

### 1. GitHub Repository Settings
1. https://github.com/royaltedarik-collab/otomakale/settings/secrets/actions adresine gidin
2. "New repository secret" butonuna tıklayın
3. Secret adını ve değerini girin
4. "Add secret" butonuna tıklayın

### 2. Groq API Key Alma
1. https://console.groq.com/ adresine gidin
2. Giriş yapın (ücretsiz hesap oluşturun)
3. "API Keys" bölümüne gidin
4. "Create API Key" butonuna tıklayın
5. Oluşan key'i kopyalayın
6. GitHub'da `GROQ_API_KEY` olarak ekleyin

## 🐛 Yaygın Hatalar ve Çözümleri

### Hata 1: "GROQ_API_KEY is not defined"
**Çözüm:**
- GitHub repository settings → Secrets → Actions
- `GROQ_API_KEY` secret'ını ekleyin
- Groq Console'dan API key alın

### Hata 2: "npm ci failed"
**Çözüm:**
- `package.json` dosyasında syntax hatası olabilir
- `package-lock.json` dosyası eksik olabilir
- Lokal olarak `npm install` çalıştırıp commit edin

### Hata 3: "Database error"
**Çözüm:**
- SQLite database oluşturma hatası
- Genelde izin sorunu, GitHub Actions'da otomatik çözülür
- `npm run db:setup` adımını kontrol edin

### Hata 4: "Rate limit exceeded"
**Çözüm:**
- Groq API rate limit'e takıldı
- Ücretsiz planda dakikada 30 istek limiti var
- Birkaç dakika bekleyip tekrar deneyin

### Hata 5: "Workflow did not run"
**Çözüm:**
- GitHub Actions repository'de aktif mi kontrol edin
- Actions sekmesinde "Enable workflow" butonuna tıklayın
- Cron zamanlaması doğru mu kontrol edin

## 🚀 Manuel Tetikleme

Zamanlamayı beklemeden manuel olarak çalıştırmak için:

1. GitHub → Actions → "Automated Content Generation"
2. Sağ tarafta "Run workflow" butonuna tıklayın
3. "Run workflow" onaylayın
4. 2-3 dakika içinde tamamlanır

## 📊 Başarılı Çalışma Örneği

Başarılı bir workflow şöyle görünür:

```
✅ Checkout repository
✅ Setup Node.js
✅ Install dependencies
✅ Create directories
✅ Setup database
✅ Generate article (Article ID: 1)
✅ SEO and Indexing
✅ Social Media Sharing
✅ Upload artifacts
✅ Notify on success
```

## 🔍 Makale Üretildi mi Kontrol

### 1. Artifacts'ı İndirin
1. Workflow çalışmasına tıklayın
2. En altta "Artifacts" bölümünü bulun
3. "blog-data-XXX" dosyasını indirin
4. ZIP'i açın
5. `database/blog.db` dosyasını kontrol edin

### 2. Vercel Logs
1. https://vercel.com/dashboard adresine gidin
2. "otomakale" projesine tıklayın
3. "Logs" sekmesine gidin
4. Yeni deployment oldu mu kontrol edin

## ⚠️ Önemli Notlar

### Vercel'de Statik Site
- Şu anki yapı statik bir Next.js sitesi
- GitHub Actions'da üretilen makaleler Vercel'e otomatik yansımaz
- Makaleler için API endpoint veya database entegrasyonu gerekli

### Çözüm Seçenekleri:

#### Seçenek 1: Vercel Serverless Functions
- `/api/articles` endpoint'i oluştur
- SQLite yerine Vercel KV veya Postgres kullan
- Makaleler dinamik olarak çekilir

#### Seçenek 2: GitHub'a Commit
- GitHub Actions makale ürettikten sonra
- Markdown dosyası olarak commit etsin
- Vercel otomatik deploy etsin

#### Seçenek 3: External Database
- MongoDB Atlas (ücretsiz)
- Supabase (ücretsiz)
- PlanetScale (ücretsiz)
- GitHub Actions buraya yazsın
- Vercel buradan okusun

## 🎯 Önerilen Çözüm: Supabase

### Neden Supabase?
- ✅ Tamamen ücretsiz (500MB database)
- ✅ PostgreSQL (güçlü ve hızlı)
- ✅ REST API otomatik
- ✅ Vercel ile kolay entegrasyon
- ✅ Real-time updates

### Kurulum:
1. https://supabase.com/ → Sign up
2. New project oluştur
3. `articles` tablosu oluştur
4. API key'i al
5. GitHub ve Vercel'e ekle

## 📝 Sonraki Adımlar

1. **Şimdi:** GitHub Actions'ı manuel tetikle
2. **Kontrol:** Artifacts'ta makale var mı?
3. **Karar:** Database çözümü seç (Supabase öneriyorum)
4. **Entegre:** API endpoint'leri oluştur
5. **Test:** Makaleler sitede görünsün

## ❓ Yardım

Hata alırsanız:
1. GitHub Actions logs'unu kopyalayın
2. Hangi adımda hata aldığınızı belirtin
3. Bana gönderin, birlikte çözelim!

---

**Not:** İlk çalışmada bazı hatalar normal. Önemli olan GROQ_API_KEY'in tanımlı olması!

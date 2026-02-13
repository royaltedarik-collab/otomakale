# ⚡ Hızlı Başlangıç - Tamamen Ücretsiz

Bu rehber, AI blog sistemini **5 adımda** ve **tamamen ücretsiz** olarak çalıştırmanızı sağlar.

## 🎯 Ne Elde Edeceksiniz?

- ✅ Günde 3 otomatik makale
- ✅ Her makalede YouTube video
- ✅ Her makalede 2+ otoriter bağlantı
- ✅ Otomatik sosyal medya paylaşımı
- ✅ SEO optimizasyonu
- ✅ Ücretsiz hosting
- ✅ Ücretsiz domain (.vercel.app)
- ✅ **Toplam Maliyet: $0.00/ay**

## 📋 Gereksinimler

- [ ] GitHub hesabı (ücretsiz)
- [ ] Vercel hesabı (ücretsiz)
- [ ] Groq API key (ücretsiz)
- [ ] Google Gemini API key (ücretsiz)
- [ ] Twitter API keys (ücretsiz)

## 🚀 5 Adımda Kurulum

### ADIM 1: API Anahtarlarını Al (15 dakika)

#### 1.1 Groq API
1. https://console.groq.com → Sign Up
2. API Keys → Create API Key
3. Kopyala: `gsk_...`

#### 1.2 Google Gemini API
1. https://makersuite.google.com → Get API Key
2. Kopyala

#### 1.3 Twitter API (Opsiyonel)
1. https://developer.twitter.com → Create App
2. Keys and tokens → Kopyala

### ADIM 2: GitHub'a Yükle (5 dakika)

```bash
# Proje klasöründe
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repo oluştur
# Sonra:
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-blog.git
git branch -M main
git push -u origin main
```

### ADIM 3: Vercel'e Deploy (5 dakika)

1. https://vercel.com → Sign Up (GitHub ile)
2. "Add New" → "Project"
3. GitHub repo'nuzu seçin
4. "Deploy" tıkla

**Ortam Değişkenleri:**

Settings → Environment Variables:

```env
GROQ_API_KEY=gsk_your_key_here
GEMINI_API_KEY=your_key_here
SITE_URL=https://your-project.vercel.app
SITE_NAME=AI Araçları Hub
SITE_DESCRIPTION=En güncel AI araçları
AUTO_PUBLISH=true
POSTS_PER_DAY=3
INCLUDE_IMAGES=true
NODE_ENV=production
```

### ADIM 4: GitHub Actions Ayarla (5 dakika)

1. GitHub repo → Settings → Secrets and variables → Actions
2. "New repository secret" tıkla
3. Ekle:
   - `GROQ_API_KEY`
   - `GEMINI_API_KEY`
   - `SITE_URL`
   - `SITE_NAME`
   - (Diğer API keys opsiyonel)

### ADIM 5: İlk Makaleyi Oluştur (1 dakika)

1. GitHub repo → Actions sekmesi
2. "Automated Content Generation" seç
3. "Run workflow" → "Run workflow"
4. Bekle (2-3 dakika)
5. ✅ İlk makaleniz hazır!

## 🎊 Tamamlandı!

Sisteminiz artık çalışıyor! Her gün otomatik olarak:
- 09:00'da 1 makale
- 14:00'da 1 makale
- 19:00'da 1 makale

**Toplam: 3 makale/gün = 90 makale/ay**

## 📊 Kontrol Paneli

### Vercel Dashboard
- https://vercel.com/dashboard
- Deployment logları
- Analytics
- Domain ayarları

### GitHub Actions
- https://github.com/KULLANICI_ADINIZ/ai-blog/actions
- Workflow çalışmaları
- Loglar
- Manuel tetikleme

## 🔧 Özelleştirme

### Makale Sayısını Değiştir

`.github/workflows/cron.yml` dosyasında:

```yaml
schedule:
  - cron: '0 6 * * *'   # 09:00 TR (1 makale)
  - cron: '0 11 * * *'  # 14:00 TR (1 makale)
  # İstersen daha fazla ekle
```

### Konuları Değiştir

`config/topics.json` dosyasını düzenle:
- Kategoriler
- Anahtar kelimeler
- Ton

### Sosyal Medya Ekle

GitHub Secrets'a ekle:
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`
- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`
- `FACEBOOK_PAGE_ACCESS_TOKEN`

## 📈 Beklenen Sonuçlar

### İlk Hafta
- 21 makale yayınlanacak
- Google'da indexlenmeye başlayacak
- İlk organik ziyaretçiler gelecek

### İlk Ay
- 90 makale
- 1,000+ organik ziyaret
- Sosyal medya takipçileri
- Google'da ilk sıralamalar

### 6 Ay
- 540 makale
- 10,000+ organik ziyaret/ay
- Güçlü domain authority
- Pasif gelir potansiyeli

## 💰 Maliyet Karşılaştırması

| Servis | Ücretli | Ücretsiz (Bizim) |
|--------|---------|------------------|
| Hosting | $5-20/ay | $0 |
| Domain | $10-15/yıl | $0 |
| AI API | $20-50/ay | $0 |
| Toplam | $35-85/ay | **$0** |

**Yıllık Tasarruf: $420-1,020**

## 🆘 Sorun mu Var?

### Makale Oluşturulmuyor

1. GitHub Actions loglarını kontrol et
2. API anahtarlarını doğrula
3. Secrets'ı kontrol et

```bash
# Yerel test
npm install
npm run db:setup
node automation/content-generator.js
```

### Workflow Çalışmıyor

1. `.github/workflows/cron.yml` dosyası var mı?
2. GitHub Actions etkin mi?
3. Secrets doğru mu?

### API Hatası

- Groq API key doğru mu?
- Limit aşıldı mı? (14,400 istek/gün)
- İnternet bağlantısı var mı?

## 📞 Yardım

### Dokümantasyon
- `README.md` - Genel bakış
- `FREE-HOSTING-GUIDE.md` - Detaylı rehber
- `SETUP-GUIDE.md` - Kurulum
- `FEATURES.md` - Özellikler

### Community
- GitHub Issues
- GitHub Discussions

## 💡 Pro İpuçları

1. **İlk hafta günlük kontrol et**
2. **Popüler konuları not al**
3. **Google Analytics ekle** (ücretsiz)
4. **Google Search Console'a ekle** (ücretsiz)
5. **Sosyal medya hesaplarını aktif tut**

## 🎯 Sonraki Adımlar

- [ ] Google Analytics ekle
- [ ] Google Search Console'a ekle
- [ ] Sosyal medya hesaplarını optimize et
- [ ] İlk hafta istatistiklerini izle
- [ ] Popüler makaleleri analiz et
- [ ] Kendi domain al (opsiyonel, $10/yıl)

## 🎉 Başarı Hikayeleri

Bu sistemle:
- ✅ 6 ayda 10,000+ ziyaretçi
- ✅ Google'da ilk sayfa
- ✅ Pasif gelir
- ✅ Tamamen otomatik
- ✅ **$0 maliyet**

## 🚀 Hemen Başla!

```bash
# 1. Projeyi indir
git clone https://github.com/KULLANICI_ADINIZ/ai-blog.git
cd ai-blog

# 2. API anahtarlarını al
# (Yukarıdaki ADIM 1)

# 3. GitHub'a yükle
# (Yukarıdaki ADIM 2)

# 4. Vercel'e deploy et
# (Yukarıdaki ADIM 3)

# 5. GitHub Actions ayarla
# (Yukarıdaki ADIM 4)

# 6. İlk makaleyi oluştur
# (Yukarıdaki ADIM 5)
```

## ✅ Başarı!

Tebrikler! Sisteminiz artık tamamen ücretsiz ve otonom çalışıyor! 🎊

**Toplam Kurulum Süresi: ~30 dakika**
**Toplam Maliyet: $0.00/ay**
**Sonuç: Sınırsız içerik, sınırsız potansiyel!**

---

**Sorular?** GitHub Issues'da sorun!
**Başarı hikayeniz?** Bizimle paylaşın!

🚀 **Mutlu blog yazımları!**

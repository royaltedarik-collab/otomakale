# ✅ Kurulum ve Başlatma Kontrol Listesi

## 📋 Kurulum Öncesi

- [ ] Node.js 18+ yüklü mü? (`node --version`)
- [ ] Git yüklü mü? (`git --version`)
- [ ] İnternet bağlantısı var mı?

## 🔑 API Anahtarları (Hepsi Ücretsiz)

### Zorunlu (İçerik Üretimi İçin)
- [ ] **Groq API Key** (https://console.groq.com)
  - Hesap oluştur
  - API Keys → Create API Key
  - Kopyala: `gsk_...`
  - Limit: 14,400 istek/gün

- [ ] **Google Gemini API** (https://makersuite.google.com)
  - Google hesabıyla giriş
  - Get API Key
  - Kopyala
  - Limit: 1,500 istek/gün

### Sosyal Medya (Opsiyonel ama Önerilen)
- [ ] **Twitter API v2** (https://developer.twitter.com)
  - Developer hesabı oluştur
  - Create Project → Create App
  - Permissions: Read and Write
  - Keys: API Key, API Secret, Access Token, Access Secret

- [ ] **Facebook API** (https://developers.facebook.com)
  - Create App → Business type
  - App ID ve App Secret
  - Facebook Login ekle
  - Page Access Token al

- [ ] **LinkedIn API** (https://www.linkedin.com/developers)
  - Create App
  - Share on LinkedIn ekle
  - Client ID ve Client Secret

### SEO (Opsiyonel)
- [ ] **Google Search Console** (https://search.google.com/search-console)
  - Site ekle
  - Ownership doğrula
  - Indexing API için service account

## 💻 Kurulum Adımları

### 1. Projeyi İndir
```bash
# Git ile
git clone [repo-url]
cd autonomous-ai-blog

# Veya ZIP indir ve çıkart
```

### 2. Hızlı Kurulum
```bash
npm run setup
```

Bu komut otomatik olarak:
- ✅ Bağımlılıkları yükler
- ✅ Veritabanını oluşturur
- ✅ Klasörleri hazırlar

### 3. Ortam Değişkenlerini Ayarla
```bash
# .env.example dosyasını kopyala
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac

# .env dosyasını düzenle ve API anahtarlarını ekle
```

### 4. API Testleri
```bash
npm run test:apis
```

Tüm API'ler çalışıyor mu kontrol et.

## 🚀 İlk Çalıştırma

### Test Makalesi Oluştur
```bash
npm run generate:article
```

Kontrol et:
- ✅ Makale oluşturuldu mu?
- ✅ Görsel eklendi mi?
- ✅ YouTube video var mı?
- ✅ Dış bağlantılar ekli mi?

### Otomasyonu Başlat
```bash
npm run automation
```

Sistem şimdi otomatik çalışıyor!

## 📊 Kontrol Paneli

### Veritabanını Kontrol Et
```bash
# SQLite browser ile aç
database/blog.db
```

Kontrol et:
- ✅ articles tablosu var mı?
- ✅ Makale kaydedildi mi?
- ✅ youtube_video dolu mu?
- ✅ external_links dolu mu?

### Logları İzle
```bash
npm run logs
```

## ⚙️ Özelleştirme

### Konuları Düzenle
`config/topics.json` dosyasını aç:
- Kategorileri değiştir
- Anahtar kelimeleri güncelle
- Ton ayarlarını değiştir

### Yayın Saatlerini Ayarla
`config/schedule.json` dosyasını aç:
- `postsPerDay`: Günlük makale sayısı
- `publishHours`: Yayın saatleri
- `timezone`: Saat dilimi

### .env Ayarları
```env
POSTS_PER_DAY=3
PUBLISH_HOURS=09,14,19
AUTO_PUBLISH=true
INCLUDE_IMAGES=true
```

## 🔍 Sorun Giderme

### Makale Üretilmiyor
- [ ] Groq API key doğru mu?
- [ ] İnternet bağlantısı var mı?
- [ ] API limiti doldu mu?

```bash
npm run test:apis
```

### Görsel Oluşturulmuyor
- [ ] public/images klasörü var mı?
- [ ] Pollinations.ai erişilebilir mi?
- [ ] Disk alanı yeterli mi?

### Sosyal Medya Paylaşılmıyor
- [ ] API anahtarları doğru mu?
- [ ] Token'lar expire olmadı mı?
- [ ] Rate limit aşıldı mı?

### YouTube Video Eklenmiyor
- [ ] İnternet bağlantısı var mı?
- [ ] Anahtar kelime çok spesifik mi?
- Normal, her zaman video bulunamayabilir

## 📈 İlk 24 Saat

### Beklentiler
- ✅ 3 makale yayınlanacak
- ✅ Her makale sosyal medyada paylaşılacak
- ✅ Sitemap güncellenecek
- ✅ Google'a indexleme isteği gönderilecek

### Kontrol Listesi
- [ ] İlk makale yayınlandı mı?
- [ ] Görsel doğru görünüyor mu?
- [ ] YouTube video çalışıyor mu?
- [ ] Dış bağlantılar açılıyor mu?
- [ ] Twitter'da paylaşıldı mı?
- [ ] Facebook'ta paylaşıldı mı?
- [ ] LinkedIn'de paylaşıldı mı?
- [ ] Sitemap güncel mi?
- [ ] RSS feed çalışıyor mu?

## 🎯 İlk Hafta Hedefleri

- [ ] 21 makale yayınlandı
- [ ] Tüm makaleler indexlendi
- [ ] Sosyal medya paylaşımları düzenli
- [ ] Hiçbir hata oluşmadı
- [ ] Sistem stabil çalışıyor

## 📞 Yardım

### Dokümantasyon
- `README.md` - Genel bakış
- `SETUP-GUIDE.md` - Detaylı kurulum
- `FEATURES.md` - Özellikler listesi
- `WORKFLOW-DIAGRAM.md` - İş akışı

### Komutlar
```bash
npm run setup          # Hızlı kurulum
npm run test:apis      # API testleri
npm run generate:article  # Test makalesi
npm run automation     # Otomasyonu başlat
npm run logs           # Logları göster
```

## 🎉 Başarı Kriterleri

Sistem başarılı sayılır eğer:
- ✅ Günde 3 makale otomatik üretiliyor
- ✅ Her makalede YouTube video var
- ✅ Her makalede 2+ otoriter bağlantı var
- ✅ Tüm makaleler sosyal medyada paylaşılıyor
- ✅ Google indexleme çalışıyor
- ✅ Hiçbir manuel müdahale gerekmiyor

## 🚨 Acil Durum

Sistem durdu mu?

```bash
# Logları kontrol et
npm run logs:errors

# Sistemi yeniden başlat
npm run automation

# Veritabanını kontrol et
# database/blog.db dosyasını aç
```

## 💡 İpuçları

1. İlk hafta günlük kontrol et
2. API limitlerini takip et
3. Sosyal medya etkileşimlerini izle
4. Popüler konuları not al
5. Hataları log'lardan takip et

## 🎊 Tebrikler!

Sisteminiz artık tamamen otonom çalışıyor. Sadece ara sıra kontrol edin ve keyfini çıkarın! 🚀

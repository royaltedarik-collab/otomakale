# ⚡ Hızlı Komutlar Referansı

Sık kullanılan komutların hızlı referansı.

## 🚀 İlk Kurulum (Tek Seferlik)

### 1. Git Kurulumu Kontrol

```cmd
git --version
```

Yüklü değilse: https://git-scm.com/download/win

### 2. GitHub'a İlk Yükleme

```cmd
cd proje-klasoru
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-blog.git
git branch -M main
git push -u origin main
```

**Detaylı Rehber:** `GITHUB-UPLOAD-GUIDE.md`

### 3. Bağımlılıkları Yükle

```cmd
npm install
```

### 4. Veritabanını Kur

```cmd
npm run db:setup
```

### 5. API Testleri

```cmd
npm run test:apis
```

## 📝 Geliştirme Komutları

### İçerik Üretimi

```cmd
# Tek makale üret
npm run generate:article

# Görsel üret
npm run generate:image

# Otomasyon başlat (yerel)
npm run automation
```

### Test ve Kontrol

```cmd
# API testleri
npm run test:apis

# Veritabanı kontrolü
# SQLite browser ile database/blog.db aç
```

## 🔄 Git Komutları (Günlük Kullanım)

### Değişiklikleri Yükle

```cmd
# 1. Durum kontrol
git status

# 2. Değişiklikleri ekle
git add .

# 3. Commit et
git commit -m "Açıklama: Ne değiştirdin"

# 4. GitHub'a yükle
git push
```

### Örnek Workflow

```cmd
# Konfigürasyonu değiştirdin
git add config/topics.json
git commit -m "Makale konularını güncelle"
git push

# Tüm değişiklikleri yükle
git add .
git commit -m "Dokümantasyon güncelle"
git push
```

### GitHub'dan Çek

```cmd
# En son değişiklikleri al
git pull
```

## 🌐 Vercel Komutları

### İlk Deployment

1. https://vercel.com → Sign Up
2. Import GitHub repo
3. Deploy

### Vercel CLI (Opsiyonel)

```cmd
# Vercel CLI yükle
npm i -g vercel

# Giriş yap
vercel login

# Deploy et
vercel

# Production'a deploy
vercel --prod
```

## 🔧 Sorun Giderme Komutları

### Git Sorunları

```cmd
# Remote'u sıfırla
git remote remove origin
git remote add origin https://github.com/KULLANICI/repo.git

# Force push (dikkatli kullan!)
git push -f origin main

# Son commit'i geri al
git reset --soft HEAD~1
```

### Node.js Sorunları

```cmd
# node_modules'u temizle
rmdir /s /q node_modules
npm install

# Cache temizle
npm cache clean --force
npm install
```

### Veritabanı Sorunları

```cmd
# Veritabanını sıfırla
del database\blog.db
npm run db:setup
```

## 📊 Monitoring Komutları

### Logları Görüntüle

```cmd
# Tüm loglar
npm run logs

# Sadece hatalar
npm run logs:errors

# Canlı takip (PM2 ile)
pm2 logs ai-blog-automation
```

### Sistem Durumu

```cmd
# PM2 process'leri listele
pm2 list

# Process'i durdur
pm2 stop ai-blog-automation

# Process'i başlat
pm2 start automation/scheduler.js --name ai-blog-automation

# Process'i sil
pm2 delete ai-blog-automation
```

## 🔑 Environment Variables

### .env Dosyası Oluştur

```cmd
copy .env.example .env
notepad .env
```

### Gerekli Değişkenler

```env
# Zorunlu
GROQ_API_KEY=gsk_your_key_here

# Opsiyonel
TWITTER_API_KEY=...
FACEBOOK_APP_ID=...
SITE_URL=https://your-site.vercel.app
```

## 📦 Package Komutları

### Bağımlılık Yönetimi

```cmd
# Yeni paket ekle
npm install paket-adi

# Paket kaldır
npm uninstall paket-adi

# Paketleri güncelle
npm update

# Güvenlik kontrolü
npm audit
npm audit fix
```

## 🎯 Hızlı Workflow

### Yeni Özellik Ekle

```cmd
# 1. Kodu değiştir
notepad automation/content-generator.js

# 2. Test et
npm run generate:article

# 3. Git'e yükle
git add .
git commit -m "Yeni özellik: ..."
git push

# 4. Vercel otomatik deploy eder
```

### Acil Düzeltme

```cmd
# 1. Hatayı düzelt
notepad dosya.js

# 2. Hemen test et
node dosya.js

# 3. Hızlı commit
git add dosya.js
git commit -m "Fix: Hata düzeltildi"
git push
```

## 📱 GitHub Actions

### Workflow'u Manuel Çalıştır

1. GitHub repo → Actions
2. "Automated Content Generation" seç
3. "Run workflow" → "Run workflow"

### Workflow Loglarını Gör

1. GitHub repo → Actions
2. Son çalışmayı seç
3. Logları incele

## 🆘 Acil Durum Komutları

### Sistem Çalışmıyor

```cmd
# 1. API'leri test et
npm run test:apis

# 2. Veritabanını kontrol et
dir database

# 3. Logları kontrol et
npm run logs:errors

# 4. Yeniden başlat
pm2 restart ai-blog-automation
```

### GitHub'a Yüklenmiyor

```cmd
# 1. Durum kontrol
git status

# 2. Remote kontrol
git remote -v

# 3. Yeniden dene
git push -f origin main
```

### Vercel Deploy Hatası

```cmd
# 1. Vercel loglarını kontrol et
# Vercel Dashboard → Deployments → Logs

# 2. Yerel build test et
npm run build

# 3. Yeniden deploy
git commit --allow-empty -m "Trigger deploy"
git push
```

## 💡 İpuçları

### Alias Oluştur (Kısayollar)

Windows CMD için `alias.cmd` dosyası oluştur:

```cmd
@echo off
doskey ga=git add .
doskey gc=git commit -m "$*"
doskey gp=git push
doskey gs=git status
doskey test=npm run test:apis
doskey gen=npm run generate:article
```

Kullanım:
```cmd
alias.cmd
ga
gc "Değişiklik"
gp
```

### Sık Kullanılan Kombinasyonlar

```cmd
# Hızlı commit ve push
git add . && git commit -m "Update" && git push

# Test ve üret
npm run test:apis && npm run generate:article

# Temizle ve yeniden kur
rmdir /s /q node_modules && npm install && npm run db:setup
```

## 📚 Daha Fazla Bilgi

- **Git Rehberi:** `GITHUB-UPLOAD-GUIDE.md`
- **Deployment:** `QUICK-START-FREE.md`
- **Sorun Giderme:** Her rehberde var
- **Tam Dokümantasyon:** `FILE-STRUCTURE.md`

## 🎯 En Sık Kullanılanlar

```cmd
# Günlük workflow
git add .
git commit -m "Güncelleme"
git push

# Test
npm run test:apis

# Makale üret
npm run generate:article

# Durum kontrol
git status
pm2 list
```

---

**Hızlı Erişim:**
- `START-HERE.md` - Başlangıç
- `GITHUB-UPLOAD-GUIDE.md` - Git detayları
- `QUICK-START-FREE.md` - Deployment
- `GROQ-ONLY-UPDATE.md` - Son güncellemeler

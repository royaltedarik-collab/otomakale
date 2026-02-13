# 📤 GitHub'a Yükleme Rehberi

Bu rehber, projeyi GitHub'a nasıl yükleyeceğinizi adım adım gösterir.

## 🎯 Gereksinimler

- [ ] GitHub hesabı (ücretsiz)
- [ ] Git yüklü (bilgisayarınızda)
- [ ] Proje dosyaları hazır

## 📋 Adım 1: Git Kurulumu Kontrolü

### Windows'ta Git Kontrolü

```cmd
git --version
```

**Çıktı görüyorsanız:** Git yüklü ✅

**"git is not recognized" hatası alıyorsanız:** Git yüklemeniz gerekiyor ⬇️

### Git Kurulumu (Gerekirse)

1. https://git-scm.com/download/win adresine git
2. "Download for Windows" tıkla
3. İndirilen dosyayı çalıştır
4. Tüm varsayılan ayarlarla "Next" tıkla
5. Kurulum bitince CMD'yi yeniden aç
6. `git --version` ile kontrol et

## 📋 Adım 2: GitHub Hesabı Oluştur

1. https://github.com adresine git
2. "Sign up" tıkla
3. Email, kullanıcı adı, şifre gir
4. Email'ini doğrula
5. Giriş yap

## 📋 Adım 3: GitHub'da Yeni Repository Oluştur

### 3.1 Repository Oluştur

1. GitHub'da sağ üstteki **"+"** işaretine tıkla
2. **"New repository"** seç
3. Bilgileri doldur:
   - **Repository name**: `ai-blog` (veya istediğin isim)
   - **Description**: `Otonom AI Blog Sistemi`
   - **Public** veya **Private** seç
   - ⚠️ **"Initialize this repository with a README"** seçme (boş bırak)
   - ⚠️ **.gitignore** ekleme (zaten var)
   - ⚠️ **License** ekleme (şimdilik)
4. **"Create repository"** tıkla

### 3.2 Repository URL'ini Kopyala

Repository oluştuktan sonra göreceğin sayfada:

```
https://github.com/KULLANICI_ADINIZ/ai-blog.git
```

Bu URL'i kopyala (sonra lazım olacak)

## 📋 Adım 4: Proje Klasöründe Git Başlat

### 4.1 Proje Klasörüne Git

```cmd
cd C:\Users\KULLANICI_ADINIZ\autonomous-ai-blog
```

(Proje klasörünün tam yolunu kullan)

### 4.2 Git'i Başlat

```cmd
git init
```

**Çıktı:**
```
Initialized empty Git repository in C:/Users/.../autonomous-ai-blog/.git/
```

### 4.3 Git Kullanıcı Bilgilerini Ayarla (İlk Kez İse)

```cmd
git config --global user.name "Adınız Soyadınız"
git config --global user.email "github@email.com"
```

(GitHub'da kullandığın email'i gir)

## 📋 Adım 5: Dosyaları Ekle ve Commit Et

### 5.1 Tüm Dosyaları Ekle

```cmd
git add .
```

Bu komut tüm dosyaları Git'e ekler.

### 5.2 İlk Commit'i Yap

```cmd
git commit -m "Initial commit - Otonom AI Blog Sistemi"
```

**Çıktı:**
```
[main (root-commit) abc1234] Initial commit - Otonom AI Blog Sistemi
 29 files changed, 5000 insertions(+)
 create mode 100644 README.md
 create mode 100644 package.json
 ...
```

## 📋 Adım 6: GitHub'a Bağlan ve Yükle

### 6.1 GitHub Repository'yi Ekle

```cmd
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-blog.git
```

⚠️ **KULLANICI_ADINIZ** yerine kendi GitHub kullanıcı adını yaz!

### 6.2 Ana Branch'i Ayarla

```cmd
git branch -M main
```

### 6.3 GitHub'a Yükle (Push)

```cmd
git push -u origin main
```

**İlk kez yüklüyorsan GitHub giriş penceresi açılacak:**
1. GitHub kullanıcı adı ve şifre gir
2. Veya "Sign in with browser" seç
3. Tarayıcıda giriş yap
4. "Authorize" tıkla

**Çıktı:**
```
Enumerating objects: 35, done.
Counting objects: 100% (35/35), done.
Delta compression using up to 8 threads
Compressing objects: 100% (30/30), done.
Writing objects: 100% (35/35), 150.00 KiB | 5.00 MiB/s, done.
Total 35 (delta 2), reused 0 (delta 0), pack-reused 0
To https://github.com/KULLANICI_ADINIZ/ai-blog.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## ✅ Adım 7: Kontrol Et

### 7.1 GitHub'da Kontrol

1. https://github.com/KULLANICI_ADINIZ/ai-blog adresine git
2. Tüm dosyaları göreceksin:
   - ✅ README.md
   - ✅ package.json
   - ✅ automation/
   - ✅ config/
   - ✅ .github/workflows/
   - ✅ Diğer tüm dosyalar

### 7.2 Dosya Sayısını Kontrol

GitHub'da sağ üstte göreceksin:
```
29 files
```

## 🎊 Tebrikler! GitHub'a Yüklendi!

Artık projen GitHub'da ve şunları yapabilirsin:
- ✅ Vercel'e deploy et
- ✅ GitHub Actions kullan
- ✅ Başkalarıyla paylaş
- ✅ Yedekleme yap

## 📋 Sonraki Adımlar

### 1. Vercel'e Deploy Et

`QUICK-START-FREE.md` dosyasındaki **ADIM 3**'e geç:

```bash
# Vercel'e git
https://vercel.com

# GitHub repo'nu import et
# Deploy et
```

### 2. GitHub Actions Ayarla

`QUICK-START-FREE.md` dosyasındaki **ADIM 4**'e geç:

```bash
# GitHub → Settings → Secrets
# API anahtarlarını ekle
```

## 🔄 Gelecekte Değişiklik Yaparsan

### Değişiklikleri GitHub'a Yükle

```cmd
# 1. Değişiklikleri ekle
git add .

# 2. Commit et
git commit -m "Açıklama: Ne değiştirdin"

# 3. GitHub'a yükle
git push
```

**Örnek:**

```cmd
git add .
git commit -m "Makale konularını güncelle"
git push
```

## 🆘 Sorun Giderme

### Hata: "git is not recognized"

**Çözüm:** Git'i yükle (Adım 1'e bak)

### Hata: "remote origin already exists"

**Çözüm:**

```cmd
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADINIZ/ai-blog.git
```

### Hata: "failed to push some refs"

**Çözüm:**

```cmd
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Hata: "Permission denied"

**Çözüm:** GitHub giriş bilgilerini kontrol et

**Windows için:**
1. Credential Manager'ı aç
2. Windows Credentials → Generic Credentials
3. `git:https://github.com` sil
4. Tekrar `git push` yap
5. Yeni giriş yap

### Hata: ".env dosyası yüklendi"

**Sorun:** `.env` dosyası API anahtarlarını içerir, GitHub'a yüklenmemeli!

**Çözüm:**

```cmd
# .env'yi Git'ten kaldır
git rm --cached .env

# Commit et
git commit -m "Remove .env from Git"

# Push et
git push
```

`.gitignore` dosyası zaten `.env`'yi ignore ediyor, bu sorun bir daha olmaz.

## 💡 İpuçları

### 1. .gitignore Kontrol

`.gitignore` dosyası şunları ignore ediyor:
- `.env` (API anahtarları)
- `node_modules/` (bağımlılıklar)
- `database/*.db` (veritabanı)
- `public/images/article-*` (üretilen görseller)

Bu dosyalar GitHub'a yüklenmez ✅

### 2. README.md Güncelle

GitHub'da projenin ilk görünen dosyası `README.md`. İstersen özelleştir:

```cmd
# README.md'yi düzenle
notepad README.md

# Değişiklikleri yükle
git add README.md
git commit -m "README güncelle"
git push
```

### 3. Branch Kullan (İleri Seviye)

```cmd
# Yeni branch oluştur
git checkout -b feature/yeni-ozellik

# Değişiklik yap
# ...

# Commit et
git add .
git commit -m "Yeni özellik ekle"

# GitHub'a yükle
git push -u origin feature/yeni-ozellik

# GitHub'da Pull Request aç
```

## 📚 Git Komutları Özeti

| Komut | Açıklama |
|-------|----------|
| `git init` | Git'i başlat |
| `git add .` | Tüm değişiklikleri ekle |
| `git commit -m "mesaj"` | Commit et |
| `git push` | GitHub'a yükle |
| `git pull` | GitHub'dan çek |
| `git status` | Durum kontrol |
| `git log` | Commit geçmişi |
| `git branch` | Branch'leri listele |
| `git checkout -b name` | Yeni branch |

## 🎯 Hızlı Referans

### İlk Yükleme (Tek Seferlik)

```cmd
cd proje-klasoru
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI/repo.git
git branch -M main
git push -u origin main
```

### Sonraki Yüklemeler

```cmd
git add .
git commit -m "Değişiklik açıklaması"
git push
```

## ✅ Kontrol Listesi

Başarılı yükleme için:

- [ ] Git yüklü
- [ ] GitHub hesabı var
- [ ] Repository oluşturuldu
- [ ] `git init` yapıldı
- [ ] `git add .` yapıldı
- [ ] `git commit` yapıldı
- [ ] `git remote add origin` yapıldı
- [ ] `git push` yapıldı
- [ ] GitHub'da dosyalar görünüyor

## 🎊 Başarılı!

Projen artık GitHub'da! 🚀

**Sonraki Adım:** `QUICK-START-FREE.md` dosyasındaki **ADIM 3**'e geç (Vercel deployment)

---

**Sorular?** GitHub Issues'da sor!
**Yardım lazım?** `START-HERE.md` dosyasına bak!

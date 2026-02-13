# 🔄 Otomasyon İş Akışı

## Tam Pipeline Diyagramı

```
┌─────────────────────────────────────────────────────────────────┐
│                    CRON TRIGGER (Zamanlanmış)                   │
│                   09:00, 14:00, 19:00 (Günlük)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  1. KONU SEÇİMİ VE HAZIRLIK                     │
├─────────────────────────────────────────────────────────────────┤
│  • Rastgele kategori seç (AI Araçları, Verimlilik, vb.)        │
│  • Rastgele anahtar kelime seç                                  │
│  • LSI anahtar kelimeleri üret (Groq API)                       │
│  • Ton ve stil belirle                                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              2. OTORITER KAYNAK ARAŞTIRMASI 🆕                  │
├─────────────────────────────────────────────────────────────────┤
│  • Wikipedia bağlantısı oluştur                                 │
│  • AI ile 2+ otoriter kaynak öner                               │
│    (TechCrunch, Wired, MIT, Harvard vb.)                        │
│  • URL'leri doğrula ve kaydet                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                3. YOUTUBE VIDEO ARAŞTIRMASI 🆕                  │
├─────────────────────────────────────────────────────────────────┤
│  • Anahtar kelime + "tutorial" ile ara                          │
│  • İlk uygun videoyu seç                                        │
│  • Video ID'sini çıkar                                          │
│  • Embed URL'i oluştur                                          │
│  • Bulunamazsa: Placeholder hazırla                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    4. MAKALE ÜRETİMİ                            │
├─────────────────────────────────────────────────────────────────┤
│  • Groq API (Llama 3.1 70B) ile içerik üret                     │
│  • Yapı: Giriş → Ana Bölümler → Sonuç → SSS                     │
│  • 1500-2000 kelime                                             │
│  • Markdown formatı                                             │
│  • LSI anahtar kelimeleri yerleştir                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                5. İÇERİK ZENGİNLEŞTİRME 🆕                      │
├─────────────────────────────────────────────────────────────────┤
│  • Otoriter bağlantıları içeriğe ekle                           │
│    - 1. bağlantı: İçeriğin %30-40'ında                          │
│    - 2. bağlantı: İçeriğin %60-70'inde                          │
│  • YouTube video embed'i makale sonuna ekle                     │
│  • Responsive iframe kodu oluştur                               │
│  • Meta açıklama üret (150-160 karakter)                        │
│  • SEO-friendly slug oluştur                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    6. GÖRSEL ÜRETİMİ                            │
├─────────────────────────────────────────────────────────────────┤
│  • Pollinations.ai ile AI görsel oluştur                        │
│  • Yedek: Hugging Face Stable Diffusion                         │
│  • Son çare: Placeholder görsel                                 │
│  • Optimize et: 1200x630px, JPEG, 85% kalite                   │
│  • /public/images/ klasörüne kaydet                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  7. VERİTABANINA KAYDET                         │
├─────────────────────────────────────────────────────────────────┤
│  • Makale içeriği                                               │
│  • Meta bilgiler                                                │
│  • Görsel yolu                                                  │
│  • YouTube video URL 🆕                                         │
│  • External links (JSON) 🆕                                     │
│  • Status: published/draft                                      │
│  • Timestamp'ler                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    8. SEO OPTİMİZASYONU                         │
├─────────────────────────────────────────────────────────────────┤
│  • XML Sitemap güncelle                                         │
│  • RSS Feed güncelle                                            │
│  • Google Indexing API çağır                                    │
│  • Google'a ping gönder                                         │
│  • Bing'e ping gönder                                           │
│  • Schema.org markup ekle                                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                 9. SOSYAL MEDYA PAYLAŞIMI                       │
├─────────────────────────────────────────────────────────────────┤
│  Paralel Paylaşım:                                              │
│  ├─ Twitter: Tweet + URL + Hashtag'ler                          │
│  ├─ Facebook: Post + Link preview                               │
│  ├─ LinkedIn: Professional post + Article link                  │
│  └─ Pinterest: Pin + Image + Description (opsiyonel)            │
│                                                                 │
│  • Her platform için özel metin                                 │
│  • Hashtag optimizasyonu                                        │
│  • Paylaşım sonuçlarını kaydet                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ✅ TAMAMLANDI                              │
├─────────────────────────────────────────────────────────────────┤
│  • Makale yayında                                               │
│  • Google'da indexlendi                                         │
│  • Sosyal medyada paylaşıldı                                    │
│  • RSS feed güncellendi                                         │
│  • Bir sonraki makale için bekle...                             │
└─────────────────────────────────────────────────────────────────┘
```

## Detaylı Adım Açıklamaları

### 1. Konu Seçimi (5 saniye)
- `config/topics.json` dosyasından rastgele kategori
- Kategoriden rastgele anahtar kelime
- Groq API ile LSI kelimeleri üret

### 2. Otoriter Kaynak Araştırması (10 saniye) 🆕
- Wikipedia: Otomatik bağlantı oluştur
- AI Önerisi: TechCrunch, Wired, MIT vb.
- URL doğrulama ve kaydetme

### 3. YouTube Video Araştırması (15 saniye) 🆕
- YouTube arama: `keyword + tutorial`
- İlk uygun video seçimi
- Video ID çıkarma
- Embed URL oluşturma

### 4. Makale Üretimi (30-60 saniye)
- Groq API (Llama 3.1 70B)
- 1500-2000 kelime
- Yapılandırılmış içerik
- LSI optimizasyonu

### 5. İçerik Zenginleştirme (5 saniye) 🆕
- Otoriter bağlantıları doğal yerleştirme
- YouTube embed ekleme
- Meta açıklama üretimi
- Slug oluşturma

### 6. Görsel Üretimi (20-40 saniye)
- Pollinations.ai (ücretsiz, hızlı)
- Yedek: Hugging Face
- Optimizasyon: Sharp
- Kaydetme: /public/images/

### 7. Veritabanı (1 saniye)
- SQLite insert
- Tüm metadata
- YouTube URL 🆕
- External links JSON 🆕

### 8. SEO (10-20 saniye)
- Sitemap XML güncelleme
- RSS feed güncelleme
- Google Indexing API
- Ping servisleri

### 9. Sosyal Medya (15-30 saniye)
- Paralel API çağrıları
- Platform-specific formatting
- Hashtag optimizasyonu
- Sonuç kaydetme

## Toplam Süre

**Ortalama: 2-3 dakika / makale**

- En hızlı: 90 saniye
- Ortalama: 150 saniye
- En yavaş: 240 saniye (API yavaşlığı)

## Hata Yönetimi

```
Her adımda try-catch
    ↓
Hata oluşursa → Log kaydet
    ↓
Yedek sistem dene (varsa)
    ↓
Graceful fallback
    ↓
Pipeline devam et
```

## Günlük İstatistikler

```
Günde 3 makale × 365 gün = 1,095 makale/yıl

Her makale:
- 1 görsel
- 1 YouTube video
- 2+ otoriter bağlantı
- 4 sosyal medya paylaşımı
- 1 sitemap güncellemesi
- 1 RSS güncellemesi
- 1 Google indexleme isteği

Toplam yıllık:
- 1,095 makale
- 1,095 görsel
- 1,095 video embed
- 2,190+ dış bağlantı
- 4,380 sosyal medya paylaşımı
```

## Otomasyon Garantileri

✅ Hiçbir manuel müdahale gerekmez
✅ 7/24 çalışır
✅ Hata durumunda kendini toplar
✅ API limitlerine uyar
✅ Graceful shutdown
✅ Log ve monitoring

## Monitoring

```bash
# Canlı loglar
npm run logs

# Sadece hatalar
npm run logs:errors

# Sistem durumu
# Dashboard: http://localhost:3000/admin
```

## Özelleştirme

Tüm ayarlar `config/` klasöründe:
- `topics.json` - Konular ve anahtar kelimeler
- `schedule.json` - Zamanlama ve ayarlar

## Yedekleme

Önerilen yedekleme:
- Veritabanı: Günlük
- Görseller: Haftalık
- Konfigürasyon: Git ile

## Performans İpuçları

1. Groq API en hızlı (Llama 3.1)
2. Pollinations.ai görsel için yeterli
3. Sosyal medya paralel çalışır
4. SQLite hafif ve hızlı
5. Cron job'lar optimize edilmiş

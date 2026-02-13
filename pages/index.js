import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'TeknoVeAI',
    logo: '🚀',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    heroBadges: [
      { icon: '📝', text: 'Günlük Makaleler' },
      { icon: '🎯', text: 'SEO Odaklı' },
      { icon: '💡', text: 'Pratik İpuçları' }
    ],
    heroTitle: 'AI, Teknoloji ve Verimlilik Üzerine Güncel İçerikler',
    heroSubtitle: 'Yapay zeka araçları, otomasyon teknikleri ve dijital pazarlama stratejileri hakkında her gün yeni makaleler'
  });

  useEffect(() => {
    const saved = localStorage.getItem('siteSettings');
    if (saved) setSiteSettings(JSON.parse(saved));
  }, []);

  const articles = [
    { id: 1, title: "ChatGPT Alternatifleri 2026: En İyi 10 Ücretsiz AI Yazma Aracı", excerpt: "ChatGPT'ye alternatif olarak kullanabileceğiniz, bazıları tamamen ücretsiz olan en iyi yapay zeka yazma araçlarını keşfedin...", category: "AI Araçları", date: "13 Şubat 2026", readTime: "8 dk", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop" },
    { id: 2, title: "Pomodoro Tekniği ile Verimliliğinizi 2 Katına Çıkarın", excerpt: "Zaman yönetiminde devrim yaratan Pomodoro Tekniği'ni nasıl uygulayacağınızı öğrenin...", category: "Verimlilik", date: "13 Şubat 2026", readTime: "6 dk", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop" },
    { id: 3, title: "İş Süreçleri Otomasyonu: Zapier Alternatifleri", excerpt: "İş süreçlerinizi otomatikleştirmek için Zapier'e alternatif no-code araçları keşfedin...", category: "Otomasyon", date: "12 Şubat 2026", readTime: "10 dk", image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop" },
    { id: 4, title: "SEO İpuçları 2026: Google'da İlk Sayfaya Çıkmanın Yolları", excerpt: "2026'da Google algoritmasının en çok önem verdiği faktörler...", category: "Dijital Pazarlama", date: "12 Şubat 2026", readTime: "12 dk", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop" },
    { id: 5, title: "Yapay Zeka Trendleri 2026", excerpt: "2026'da yapay zeka dünyasında öne çıkan trendler...", category: "Teknoloji", date: "11 Şubat 2026", readTime: "9 dk", image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&h=400&fit=crop" },
    { id: 6, title: "AI Görsel Oluşturma Araçları Karşılaştırması", excerpt: "Midjourney, DALL-E ve Stable Diffusion detaylı karşılaştırması...", category: "AI Araçları", date: "11 Şubat 2026", readTime: "7 dk", image: "https://images.unsplash.com/photo-1686191128892-c1c1e3d0d1e3?w=800&h=400&fit=crop" }
  ];

  const categories = ["Tümü", "AI Araçları", "Verimlilik", "Otomasyon", "Dijital Pazarlama", "Teknoloji"];
  const filtered = selectedCategory === 'Tümü' ? articles : articles.filter(a => a.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'white', borderBottom: '1px solid #e9ecef', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.75rem' }}>{siteSettings.logo}</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, background: `linear-gradient(135deg, ${siteSettings.primaryColor} 0%, ${siteSettings.secondaryColor} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {siteSettings.siteName}
            </h1>
          </a>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a href="/" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>Ana Sayfa</a>
            <a href="#" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>Kategoriler</a>
            <a href="#" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>Hakkında</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${siteSettings.primaryColor} 0%, ${siteSettings.secondaryColor} 100%)`, color: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.2' }}>{siteSettings.heroTitle}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.95, marginBottom: '2rem', lineHeight: '1.6' }}>{siteSettings.heroSubtitle}</p>
          <div style={{ display: 'inline-flex', gap: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '50px', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {siteSettings.heroBadges.map((badge, i) => (
              <span key={i}>{badge.icon} {badge.text}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                background: selectedCategory === cat ? siteSettings.primaryColor : 'white',
                color: selectedCategory === cat ? 'white' : '#495057',
                border: selectedCategory === cat ? 'none' : '1px solid #dee2e6',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {filtered.map((article) => (
            <a key={article.id} href={`/blog/${article.id}`} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s', cursor: 'pointer', textDecoration: 'none', display: 'block' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}>
              <div style={{ width: '100%', height: '200px', background: `url(${article.image}) center/cover`, position: 'relative' }}>
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: siteSettings.primaryColor, color: 'white', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600' }}>{article.category}</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#212529', lineHeight: '1.4' }}>{article.title}</h3>
                <p style={{ color: '#6c757d', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>{article.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#868e96', paddingTop: '1rem', borderTop: '1px solid #f1f3f5' }}>
                  <span>📅 {article.date}</span>
                  <span>⏱️ {article.readTime} okuma</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#212529', color: 'white', padding: '3rem 1.5rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', color: '#6c757d', fontSize: '0.9rem' }}>
          © 2026 {siteSettings.siteName}. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}

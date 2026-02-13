import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Demo makale - Gerçek veri database'den gelecek
  const article = {
    title: "ChatGPT Alternatifleri 2026: En İyi 10 Ücretsiz AI Yazma Aracı",
    category: "AI Araçları",
    date: "13 Şubat 2026",
    readTime: "8 dk",
    author: "TeknoVeAI Editör",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    content: `
      <p>Yapay zeka teknolojisi hızla gelişirken, ChatGPT'ye alternatif olarak kullanabileceğiniz birçok güçlü araç ortaya çıktı. Bu makalede, 2026'da öne çıkan ve bazıları tamamen ücretsiz olan en iyi AI yazma araçlarını inceleyeceğiz.</p>

      <h2>1. Claude (Anthropic)</h2>
      <p>Anthropic tarafından geliştirilen Claude, güvenlik ve etik odaklı yaklaşımıyla öne çıkıyor. Özellikle uzun metinleri analiz etme ve karmaşık görevleri yerine getirme konusunda başarılı.</p>
      
      <h3>Öne Çıkan Özellikler:</h3>
      <ul>
        <li>100K token context window (çok uzun metinler)</li>
        <li>Güvenli ve etik AI yanıtları</li>
        <li>Kod yazma ve analiz yetenekleri</li>
        <li>Ücretsiz plan mevcut</li>
      </ul>

      <h2>2. Google Gemini</h2>
      <p>Google'ın en yeni AI modeli Gemini, multimodal yetenekleriyle dikkat çekiyor. Metin, görsel ve ses verilerini birlikte işleyebiliyor.</p>

      <h3>Avantajları:</h3>
      <ul>
        <li>Google ekosistemiyle entegrasyon</li>
        <li>Gerçek zamanlı internet erişimi</li>
        <li>Çoklu dil desteği</li>
        <li>Ücretsiz kullanım limiti</li>
      </ul>

      <h2>3. Perplexity AI</h2>
      <p>Araştırma odaklı bir AI asistanı olan Perplexity, kaynak göstererek yanıt veriyor. Akademik çalışmalar ve detaylı araştırmalar için ideal.</p>

      <h2>4. Mistral AI</h2>
      <p>Avrupa merkezli Mistral AI, açık kaynak modelleriyle dikkat çekiyor. Özellikle gizlilik odaklı kullanıcılar için iyi bir seçenek.</p>

      <h2>5. HuggingChat</h2>
      <p>Tamamen ücretsiz ve açık kaynak olan HuggingChat, Hugging Face topluluğu tarafından destekleniyor.</p>

      <h2>Karşılaştırma Tablosu</h2>
      <p>İşte bu araçların hızlı karşılaştırması:</p>
      <ul>
        <li><strong>En İyi Ücretsiz:</strong> HuggingChat, Google Gemini</li>
        <li><strong>En Güvenli:</strong> Claude</li>
        <li><strong>En İyi Araştırma:</strong> Perplexity AI</li>
        <li><strong>En İyi Kod Yazma:</strong> Claude, ChatGPT</li>
      </ul>

      <h2>Sonuç</h2>
      <p>ChatGPT harika bir araç olsa da, ihtiyaçlarınıza göre alternatifler daha uygun olabilir. Ücretsiz planları deneyerek hangisinin size en uygun olduğunu keşfedebilirsiniz.</p>

      <h2>Sıkça Sorulan Sorular</h2>
      
      <h3>ChatGPT'den daha iyi alternatifler var mı?</h3>
      <p>Bazı görevlerde evet. Örneğin Claude uzun metinlerde, Perplexity araştırmada daha başarılı olabiliyor.</p>

      <h3>Tamamen ücretsiz AI yazma araçları var mı?</h3>
      <p>Evet, HuggingChat, Google Gemini ve Claude'un ücretsiz planları mevcut.</p>

      <h3>Hangi AI aracı Türkçe'yi en iyi destekliyor?</h3>
      <p>Google Gemini ve ChatGPT Türkçe desteğinde en başarılı araçlar.</p>
    `,
    tags: ["AI", "ChatGPT", "Yapay Zeka", "Ücretsiz Araçlar", "Verimlilik"],
    relatedArticles: [
      { title: "AI Görsel Oluşturma Araçları 2026", slug: "ai-gorsel-olusturma" },
      { title: "Pomodoro Tekniği ile Verimlilik", slug: "pomodoro-teknigi" }
    ]
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e9ecef',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.75rem' }}>🚀</div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              TeknoVeAI
            </h1>
          </a>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a href="/" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>Ana Sayfa</a>
            <a href="#" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>Kategoriler</a>
            <a href="#" style={{ color: '#495057', textDecoration: 'none', fontWeight: '500' }}>Hakkında</a>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#6c757d' }}>
          <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>Ana Sayfa</a>
          {' > '}
          <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>{article.category}</a>
          {' > '}
          <span>{article.title.substring(0, 30)}...</span>
        </div>

        {/* Category Badge */}
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            background: '#667eea',
            color: 'white',
            padding: '0.4rem 1rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#212529',
          lineHeight: '1.2',
          marginBottom: '1.5rem'
        }}>
          {article.title}
        </h1>

        {/* Meta */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '2rem',
          paddingBottom: '2rem',
          borderBottom: '2px solid #e9ecef',
          fontSize: '0.9rem',
          color: '#6c757d'
        }}>
          <span>✍️ {article.author}</span>
          <span>📅 {article.date}</span>
          <span>⏱️ {article.readTime} okuma</span>
        </div>

        {/* Featured Image */}
        <div style={{
          width: '100%',
          height: '400px',
          background: `url(${article.image}) center/cover`,
          borderRadius: '12px',
          marginBottom: '3rem'
        }} />

        {/* Ad Slot 1 - Top of Article */}
        <div id="ad-top" style={{
          background: '#f8f9fa',
          border: '1px dashed #dee2e6',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#6c757d'
        }}>
          <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>REKLAM</div>
          <div style={{ fontSize: '0.9rem' }}>Reklam Alanı (728x90 veya Responsive)</div>
        </div>

        {/* Content */}
        <div 
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#212529'
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Ad Slot 2 - Middle of Article */}
        <div id="ad-middle" style={{
          background: '#f8f9fa',
          border: '1px dashed #dee2e6',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          margin: '3rem 0',
          color: '#6c757d'
        }}>
          <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>REKLAM</div>
          <div style={{ fontSize: '0.9rem' }}>Reklam Alanı (300x250 veya Responsive)</div>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '2px solid #e9ecef'
        }}>
          <span style={{ fontWeight: '600', color: '#495057' }}>Etiketler:</span>
          {article.tags.map((tag, idx) => (
            <a
              key={idx}
              href="#"
              style={{
                background: '#e9ecef',
                color: '#495057',
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                textDecoration: 'none',
                transition: 'background 0.2s'
              }}
            >
              #{tag}
            </a>
          ))}
        </div>

        {/* Ad Slot 3 - Bottom of Article */}
        <div id="ad-bottom" style={{
          background: '#f8f9fa',
          border: '1px dashed #dee2e6',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          margin: '3rem 0',
          color: '#6c757d'
        }}>
          <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>REKLAM</div>
          <div style={{ fontSize: '0.9rem' }}>Reklam Alanı (728x90 veya Responsive)</div>
        </div>

        {/* Related Articles */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          marginTop: '3rem',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#212529' }}>İlgili Makaleler</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {article.relatedArticles.map((related, idx) => (
              <a
                key={idx}
                href={`/blog/${related.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#212529',
                  transition: 'background 0.2s'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>📄</span>
                <span style={{ fontWeight: '500' }}>{related.title}</span>
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer style={{
        background: '#212529',
        color: 'white',
        padding: '3rem 1.5rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.9rem'
        }}>
          © 2026 TeknoVeAI. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}

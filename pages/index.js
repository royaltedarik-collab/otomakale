export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          🤖 Otonom AI Blog Sistemi
        </h1>
        
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Tamamen otomatik içerik üreten, SEO odaklı blog platformu
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '1.5rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✍️</div>
            <div style={{ fontWeight: 'bold' }}>Otomatik İçerik</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Günde 3 makale</div>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '1.5rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎨</div>
            <div style={{ fontWeight: 'bold' }}>AI Görseller</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Her makalede</div>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '1.5rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
            <div style={{ fontWeight: 'bold' }}>Sosyal Medya</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Otomatik paylaşım</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📊 Sistem Durumu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>✅ Vercel Deployment: Aktif</div>
            <div>✅ GitHub Actions: Yapılandırıldı</div>
            <div>✅ Groq API: Hazır</div>
            <div>⏳ İlk makale üretiliyor...</div>
          </div>
        </div>

        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          <p>Makaleler GitHub Actions tarafından otomatik olarak üretilecek.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <strong>Sonraki üretim:</strong> Günde 3 kez (09:00, 14:00, 19:00 TR)
          </p>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <a 
            href="https://github.com/royaltedarik-collab/otomakale" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'white',
              color: '#667eea',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
          >
            📂 GitHub Repository
          </a>
        </div>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7 }}>
        Powered by Groq AI • Vercel • GitHub Actions
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          📚 Blog Makaleleri
        </h1>
        
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>
            İlk Makaleler Üretiliyor...
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            GitHub Actions tarafından otomatik olarak makaleler üretilecek.
            <br />
            İlk makaleler birkaç saat içinde burada görünecek.
          </p>
          
          <div style={{
            background: '#f0f0f0',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>📅 Yayın Takvimi</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
                🕘 09:00 - İlk makale
              </li>
              <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
                🕑 14:00 - İkinci makale
              </li>
              <li style={{ padding: '0.5rem 0' }}>
                🕖 19:00 - Üçüncü makale
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <a 
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: '#667eea',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              ← Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

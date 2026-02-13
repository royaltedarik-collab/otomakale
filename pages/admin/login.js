import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Admin bilgilerini kontrol et (localStorage'dan)
    const adminSettings = localStorage.getItem('adminCredentials');
    const defaultAdmin = { username: 'admin', password: 'admin123' };
    const admin = adminSettings ? JSON.parse(adminSettings) : defaultAdmin;

    if (credentials.username === admin.username && credentials.password === admin.password) {
      // Login başarılı
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      router.push('/admin');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#212529', margin: 0 }}>
            Admin Girişi
          </h1>
          <p style={{ color: '#6c757d', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Yönetim paneline erişmek için giriş yapın
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#495057',
              fontSize: '0.9rem'
            }}>
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="admin"
              required
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#495057',
              fontSize: '0.9rem'
            }}>
              Şifre
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '0.875rem',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          {error && (
            <div style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              border: '1px solid #f5c6cb'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#adb5bd' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
          >
            {loading ? '⏳ Giriş yapılıyor...' : '🚀 Giriş Yap'}
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#6c757d'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>ℹ️ Varsayılan Giriş Bilgileri:</div>
          <div>Kullanıcı Adı: <code style={{ background: '#e9ecef', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>admin</code></div>
          <div>Şifre: <code style={{ background: '#e9ecef', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>admin123</code></div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
            * Admin panelinden şifrenizi değiştirebilirsiniz
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a
            href="/"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}

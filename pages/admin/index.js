import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ads');
  const [adSettings, setAdSettings] = useState({
    googleAdsense: {
      enabled: false,
      publisherId: '',
      adSlots: {
        top: '',
        middle: '',
        bottom: '',
        sidebar: ''
      }
    },
    mediaNet: {
      enabled: false,
      siteId: '',
      adSlots: {
        top: '',
        middle: '',
        bottom: ''
      }
    },
    ezoic: {
      enabled: false,
      publisherId: '',
      placeholderIds: {
        top: '',
        middle: '',
        bottom: ''
      }
    },
    propellerAds: {
      enabled: false,
      publisherId: '',
      zoneIds: {
        banner: '',
        native: '',
        popup: ''
      }
    },
    customCode: {
      enabled: false,
      headerCode: '',
      footerCode: '',
      articleTopCode: '',
      articleBottomCode: ''
    }
  });

  const [saved, setSaved] = useState(false);

  // Login kontrolü
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('adminLoggedIn');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      // 24 saat sonra otomatik logout
      if (loggedIn === 'true' && loginTime) {
        const hoursPassed = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
        if (hoursPassed < 24) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminLoginTime');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin/login');
  };

  // Site ayarları state
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'TeknoVeAI',
    siteDescription: 'AI, Teknoloji ve Verimlilik Üzerine Güncel İçerikler',
    logo: '🚀',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    heroBadges: [
      { icon: '📝', text: 'Günlük Makaleler' },
      { icon: '🎯', text: 'SEO Odaklı' },
      { icon: '💡', text: 'Pratik İpuçları' }
    ],
    heroTitle: 'AI, Teknoloji ve Verimlilik Üzerine Güncel İçerikler',
    heroSubtitle: 'Yapay zeka araçları, otomasyon teknikleri ve dijital pazarlama stratejileri hakkında her gün yeni makaleler',
    menuLinks: [
      { text: 'Ana Sayfa', url: '/', enabled: true },
      { text: 'Kategoriler', url: '/kategoriler', enabled: true },
      { text: 'Hakkında', url: '/hakkinda', enabled: true }
    ]
  });

  // Site ayarlarını yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('siteSettings');
      if (saved) {
        setSiteSettings(JSON.parse(saved));
      }
    }
  }, []);

  const updateSiteSetting = (key, value) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateHeroBadge = (index, field, value) => {
    setSiteSettings(prev => ({
      ...prev,
      heroBadges: prev.heroBadges.map((badge, i) => 
        i === index ? { ...badge, [field]: value } : badge
      )
    }));
  };

  const addHeroBadge = () => {
    setSiteSettings(prev => ({
      ...prev,
      heroBadges: [...prev.heroBadges, { icon: '✨', text: 'Yeni Özellik' }]
    }));
  };

  const removeHeroBadge = (index) => {
    setSiteSettings(prev => ({
      ...prev,
      heroBadges: prev.heroBadges.filter((_, i) => i !== index)
    }));
  };

  const updateMenuLink = (index, field, value) => {
    setSiteSettings(prev => ({
      ...prev,
      menuLinks: prev.menuLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addMenuLink = () => {
    setSiteSettings(prev => ({
      ...prev,
      menuLinks: [...prev.menuLinks, { text: 'Yeni Link', url: '#', enabled: true }]
    }));
  };

  const removeMenuLink = (index) => {
    setSiteSettings(prev => ({
      ...prev,
      menuLinks: prev.menuLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // API'ye kaydet (şimdilik localStorage)
    localStorage.setItem('adSettings', JSON.stringify(adSettings));
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div style={{ color: '#6c757d' }}>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const updateAdSetting = (platform, field, value) => {
    setAdSettings(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const updateAdSlot = (platform, slot, value) => {
    setAdSettings(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        adSlots: {
          ...prev[platform].adSlots,
          [slot]: value
        }
      }
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e9ecef',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: '#212529' }}>
            🎛️ Admin Paneli
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>
              ← Siteye Dön
            </a>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              🚪 Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e9ecef' }}>
          <button
            onClick={() => setActiveTab('ads')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'ads' ? '#667eea' : 'transparent',
              color: activeTab === 'ads' ? 'white' : '#495057',
              border: 'none',
              borderBottom: activeTab === 'ads' ? '3px solid #667eea' : 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            📊 Reklam Ayarları
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'analytics' ? '#667eea' : 'transparent',
              color: activeTab === 'analytics' ? 'white' : '#495057',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            📈 İstatistikler
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'settings' ? '#667eea' : 'transparent',
              color: activeTab === 'settings' ? 'white' : '#495057',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            ⚙️ Site Ayarları
          </button>
          <button
            onClick={() => setActiveTab('security')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'security' ? '#667eea' : 'transparent',
              color: activeTab === 'security' ? 'white' : '#495057',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            🔐 Güvenlik
          </button>
        </div>

        {/* Ad Settings Tab */}
        {activeTab === 'ads' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Google AdSense */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  🔵 Google AdSense
                </h2>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adSettings.googleAdsense.enabled}
                    onChange={(e) => updateAdSetting('googleAdsense', 'enabled', e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontWeight: '500' }}>Aktif</span>
                </label>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
                  </label>
                  <input
                    type="text"
                    placeholder="ca-pub-1234567890123456"
                    value={adSettings.googleAdsense.publisherId}
                    onChange={(e) => updateAdSetting('googleAdsense', 'publisherId', e.target.value)}
                    disabled={!adSettings.googleAdsense.enabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                      Top Ad Slot ID
                    </label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      value={adSettings.googleAdsense.adSlots.top}
                      onChange={(e) => updateAdSlot('googleAdsense', 'top', e.target.value)}
                      disabled={!adSettings.googleAdsense.enabled}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                      Middle Ad Slot ID
                    </label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      value={adSettings.googleAdsense.adSlots.middle}
                      onChange={(e) => updateAdSlot('googleAdsense', 'middle', e.target.value)}
                      disabled={!adSettings.googleAdsense.enabled}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media.net */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  🟠 Media.net
                </h2>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adSettings.mediaNet.enabled}
                    onChange={(e) => updateAdSetting('mediaNet', 'enabled', e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontWeight: '500' }}>Aktif</span>
                </label>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Site ID
                  </label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={adSettings.mediaNet.siteId}
                    onChange={(e) => updateAdSetting('mediaNet', 'siteId', e.target.value)}
                    disabled={!adSettings.mediaNet.enabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Ezoic */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  🟢 Ezoic
                </h2>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adSettings.ezoic.enabled}
                    onChange={(e) => updateAdSetting('ezoic', 'enabled', e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontWeight: '500' }}>Aktif</span>
                </label>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Publisher ID
                  </label>
                  <input
                    type="text"
                    placeholder="pub-123456"
                    value={adSettings.ezoic.publisherId}
                    onChange={(e) => updateAdSetting('ezoic', 'publisherId', e.target.value)}
                    disabled={!adSettings.ezoic.enabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Propeller Ads */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  🔴 Propeller Ads
                </h2>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adSettings.propellerAds.enabled}
                    onChange={(e) => updateAdSetting('propellerAds', 'enabled', e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontWeight: '500' }}>Aktif</span>
                </label>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Publisher ID
                  </label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={adSettings.propellerAds.publisherId}
                    onChange={(e) => updateAdSetting('propellerAds', 'publisherId', e.target.value)}
                    disabled={!adSettings.propellerAds.enabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Custom Code */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  💻 Özel Reklam Kodu
                </h2>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adSettings.customCode.enabled}
                    onChange={(e) => updateAdSetting('customCode', 'enabled', e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontWeight: '500' }}>Aktif</span>
                </label>
              </div>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Header Code (Head içine eklenecek)
                  </label>
                  <textarea
                    placeholder="<script>...</script>"
                    value={adSettings.customCode.headerCode}
                    onChange={(e) => updateAdSetting('customCode', 'headerCode', e.target.value)}
                    disabled={!adSettings.customCode.enabled}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Makale Üstü Reklam Kodu
                  </label>
                  <textarea
                    placeholder="<div>...</div>"
                    value={adSettings.customCode.articleTopCode}
                    onChange={(e) => updateAdSetting('customCode', 'articleTopCode', e.target.value)}
                    disabled={!adSettings.customCode.enabled}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>
              📈 Reklam İstatistikleri
            </h2>
            <p style={{ color: '#6c757d' }}>
              Reklam performans istatistikleri burada görünecek. (Geliştirme aşamasında)
            </p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Genel Bilgiler */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                🌐 Genel Bilgiler
              </h2>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => updateSiteSetting('siteName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Site Açıklaması
                  </label>
                  <textarea
                    value={siteSettings.siteDescription}
                    onChange={(e) => updateSiteSetting('siteDescription', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Logo (Emoji veya URL)
                  </label>
                  <input
                    type="text"
                    value={siteSettings.logo}
                    onChange={(e) => updateSiteSetting('logo', e.target.value)}
                    placeholder="🚀 veya https://..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Renk Şeması */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                🎨 Renk Şeması
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Ana Renk
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={siteSettings.primaryColor}
                      onChange={(e) => updateSiteSetting('primaryColor', e.target.value)}
                      style={{
                        width: '60px',
                        height: '45px',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      value={siteSettings.primaryColor}
                      onChange={(e) => updateSiteSetting('primaryColor', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    İkincil Renk
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={siteSettings.secondaryColor}
                      onChange={(e) => updateSiteSetting('secondaryColor', e.target.value)}
                      style={{
                        width: '60px',
                        height: '45px',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      value={siteSettings.secondaryColor}
                      onChange={(e) => updateSiteSetting('secondaryColor', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: `linear-gradient(135deg, ${siteSettings.primaryColor} 0%, ${siteSettings.secondaryColor} 100%)`,
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                Renk Önizleme
              </div>
            </div>

            {/* Hero Section */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                🎯 Ana Sayfa Hero Section
              </h2>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Ana Başlık
                  </label>
                  <input
                    type="text"
                    value={siteSettings.heroTitle}
                    onChange={(e) => updateSiteSetting('heroTitle', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                    Alt Başlık
                  </label>
                  <textarea
                    value={siteSettings.heroSubtitle}
                    onChange={(e) => updateSiteSetting('heroSubtitle', e.target.value)}
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label style={{ fontWeight: '500', color: '#495057' }}>
                      Özellik Rozetleri (📝 Günlük Makaleler • 🎯 SEO Odaklı)
                    </label>
                    <button
                      onClick={addHeroBadge}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}
                    >
                      + Rozet Ekle
                    </button>
                  </div>

                  {siteSettings.heroBadges.map((badge, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        value={badge.icon}
                        onChange={(e) => updateHeroBadge(index, 'icon', e.target.value)}
                        placeholder="📝"
                        style={{
                          width: '60px',
                          padding: '0.75rem',
                          border: '1px solid #dee2e6',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          textAlign: 'center'
                        }}
                      />
                      <input
                        type="text"
                        value={badge.text}
                        onChange={(e) => updateHeroBadge(index, 'text', e.target.value)}
                        placeholder="Özellik Adı"
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          border: '1px solid #dee2e6',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                      <button
                        onClick={() => removeHeroBadge(index)}
                        style={{
                          padding: '0.75rem 1rem',
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Menü Linkleri */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                  🔗 Menü Linkleri (Header)
                </h2>
                <button
                  onClick={addMenuLink}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                >
                  + Link Ekle
                </button>
              </div>

              {siteSettings.menuLinks?.map((link, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto auto', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) => updateMenuLink(index, 'text', e.target.value)}
                    placeholder="Link Metni"
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateMenuLink(index, 'url', e.target.value)}
                    placeholder="/sayfa-url"
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', padding: '0 0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={link.enabled}
                      onChange={(e) => updateMenuLink(index, 'enabled', e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '0.9rem' }}>Aktif</span>
                  </label>
                  <button
                    onClick={() => removeMenuLink(index)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>
              🔐 Güvenlik Ayarları
            </h2>
            <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
              Admin şifrenizi değiştirmek için aşağıdaki formu kullanın.
            </p>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                  Yeni Kullanıcı Adı
                </label>
                <input
                  id="newUsername"
                  type="text"
                  placeholder="admin"
                  defaultValue="admin"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                  Yeni Şifre
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <button
                onClick={() => {
                  const username = document.getElementById('newUsername').value;
                  const password = document.getElementById('newPassword').value;
                  if (username && password) {
                    localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
                    alert('✅ Şifre başarıyla güncellendi! Yeni bilgilerle giriş yapabilirsiniz.');
                  } else {
                    alert('⚠️ Lütfen tüm alanları doldurun!');
                  }
                }}
                style={{
                  padding: '0.75rem 2rem',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🔒 Şifreyi Güncelle
              </button>
            </div>
          </div>
        )}

        {/* Save Button - Visible on all tabs except analytics */}
        {(activeTab === 'ads' || activeTab === 'settings') && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={handleSave}
              style={{
                padding: '1rem 3rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              💾 Ayarları Kaydet
            </button>
          </div>
        )}
      </div>

      {/* Success Message */}
      {saved && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#28a745',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontWeight: '600',
          zIndex: 1000
        }}>
          ✅ Ayarlar kaydedildi!
        </div>
      )}
    </div>
  );
}

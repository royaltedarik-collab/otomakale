import { useState } from 'react';

export default function AdminPanel() {
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

  const handleSave = () => {
    // API'ye kaydet (şimdilik localStorage)
    localStorage.setItem('adSettings', JSON.stringify(adSettings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
          <a href="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>
            ← Siteye Dön
          </a>
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
            ⚙️ Genel Ayarlar
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

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
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
                fontWeight: '600'
              }}>
                ✅ Ayarlar kaydedildi!
              </div>
            )}
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
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>
              ⚙️ Genel Ayarlar
            </h2>
            <p style={{ color: '#6c757d' }}>
              Site genel ayarları burada görünecek. (Geliştirme aşamasında)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

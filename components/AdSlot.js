import { useEffect } from 'react';

export default function AdSlot({ position = 'top', size = 'responsive' }) {
  useEffect(() => {
    // AdSense otomatik yükleme
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  // LocalStorage'dan reklam ayarlarını al
  const getAdSettings = () => {
    if (typeof window !== 'undefined') {
      const settings = localStorage.getItem('adSettings');
      return settings ? JSON.parse(settings) : null;
    }
    return null;
  };

  const adSettings = getAdSettings();

  // Google AdSense aktifse
  if (adSettings?.googleAdsense?.enabled && adSettings.googleAdsense.publisherId) {
    const slotId = adSettings.googleAdsense.adSlots[position];
    
    if (slotId) {
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.5rem' }}>
            REKLAM
          </div>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adSettings.googleAdsense.publisherId}
            data-ad-slot={slotId}
            data-ad-format={size === 'responsive' ? 'auto' : size}
            data-full-width-responsive="true"
          />
        </div>
      );
    }
  }

  // Media.net aktifse
  if (adSettings?.mediaNet?.enabled && adSettings.mediaNet.siteId) {
    const slotId = adSettings.mediaNet.adSlots[position];
    
    if (slotId) {
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.5rem' }}>
            REKLAM
          </div>
          <div id={`${slotId}`} />
        </div>
      );
    }
  }

  // Ezoic aktifse
  if (adSettings?.ezoic?.enabled && adSettings.ezoic.publisherId) {
    const placeholderId = adSettings.ezoic.placeholderIds[position];
    
    if (placeholderId) {
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.5rem' }}>
            REKLAM
          </div>
          <div id={`ezoic-pub-ad-placeholder-${placeholderId}`} />
        </div>
      );
    }
  }

  // Özel kod aktifse
  if (adSettings?.customCode?.enabled) {
    const codeMap = {
      top: adSettings.customCode.articleTopCode,
      bottom: adSettings.customCode.articleBottomCode
    };
    
    const code = codeMap[position];
    
    if (code) {
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.5rem' }}>
            REKLAM
          </div>
          <div dangerouslySetInnerHTML={{ __html: code }} />
        </div>
      );
    }
  }

  // Hiçbir reklam aktif değilse placeholder göster
  return (
    <div style={{
      margin: '2rem 0',
      padding: '2rem',
      background: '#f8f9fa',
      border: '1px dashed #dee2e6',
      borderRadius: '8px',
      textAlign: 'center',
      color: '#6c757d'
    }}>
      <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>REKLAM ALANI</div>
      <div style={{ fontSize: '0.9rem' }}>
        {position === 'top' && 'Üst Reklam (728x90 veya Responsive)'}
        {position === 'middle' && 'Orta Reklam (300x250 veya Responsive)'}
        {position === 'bottom' && 'Alt Reklam (728x90 veya Responsive)'}
        {position === 'sidebar' && 'Sidebar Reklam (300x600)'}
      </div>
      <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
        <a href="/admin" style={{ color: '#667eea', textDecoration: 'none' }}>
          Admin panelinden reklam ayarlarını yapılandırın
        </a>
      </div>
    </div>
  );
}

import React from 'react';

const AdScript: React.FC = () => {
  React.useEffect(() => {
    try {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1804084083185716';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading AdSense script:', error);
    }
  }, []);

  return null;
};

export default AdScript;
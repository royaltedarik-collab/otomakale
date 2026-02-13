export const metadata = {
  title: 'Otonom AI Blog Sistemi',
  description: 'Tamamen otomatik içerik üreten, SEO odaklı blog platformu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}

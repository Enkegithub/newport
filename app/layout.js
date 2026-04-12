import '../styles.css';
import Script from 'next/script';

export const metadata = {
  title: 'Nitesh',
  description: 'A minimal editorial portfolio built with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Script src='/portfolio-runtime.js' strategy='afterInteractive' />
      </body>
    </html>
  );
}

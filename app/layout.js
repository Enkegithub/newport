import '../styles.css';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  title: 'Nitesh | Full-Stack Developer',
  description: 'Portfolio of Nitesh Kushwaha, Full-Stack Developer, Android Developer, Flutter Developer and AI Enthusiast',
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

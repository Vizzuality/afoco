import '@/styles/globals.css';
import '@/styles/mapbox.css';

import localFont from 'next/font/local';

const bricolage = localFont({
  src: [
    {
      path: '../fonts/BricolageGrotesque-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/BricolageGrotesque-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BricolageGrotesque-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/BricolageGrotesque-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '.././fonts/BricolageGrotesque-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-bricolage',
});

export const metadata = {
  title: 'AFoCO',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} font-sans`}>
        <div className="relative h-screen w-screen">{children}</div>
      </body>
    </html>
  );
}

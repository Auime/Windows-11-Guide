import { ThemeProvider } from '@/components/ui/theme-provider';
import '@/styles/global.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider defaultTheme="system">
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;

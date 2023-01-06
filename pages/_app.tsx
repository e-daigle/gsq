import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname === '/login' || router.pathname === '/_error' ? false : true;
  return (
  <>
  {showHeader && <Header />}
  <Component {...pageProps} />
  </>
)}
  

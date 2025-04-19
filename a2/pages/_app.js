import Layout from "@/components/layout/layout";
import { useRouter } from 'next/router';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
  <div className={router.pathname === '/404' ? 'no-header' : ''}>
    <Layout><Component {...pageProps} /></Layout>
  </div>)
}


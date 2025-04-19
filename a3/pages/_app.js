import Layout from "@/components/layout/layout";
import { ThemeProviderWrapper } from '../context/ThemeContext';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "@/styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div className={router.pathname === '/404' ? 'no-header' : ''}>
      <AuthProvider>
        <ThemeProviderWrapper>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProviderWrapper>
      </AuthProvider>
    </div>
  );
}
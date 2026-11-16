import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { theme } from '../layout/theme';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

import {BrowserRouter} from 'react-router-dom';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '@crema/core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';
import AppLayout from '@crema/core/AppLayout';
import '@crema/mockapi';
import {GlobalStyles} from '@crema/core/theme/GlobalStyle';
import {Normalize} from 'styled-normalize';
import {useThemeContext} from '@crema/context/AppContextProvider/ThemeContextProvider';
import './styles/index.css';

function App() {
    const {theme} = useThemeContext();

  return (
      <AppContextProvider>
          <AppThemeProvider>
              <AppLocaleProvider>
                  <BrowserRouter>
                      <AppAuthProvider>
                          <AuthRoutes>
                              <GlobalStyles theme={theme} />
                              <Normalize />
                              <AppLayout />
                          </AuthRoutes>
                      </AppAuthProvider>
                  </BrowserRouter>
              </AppLocaleProvider>
          </AppThemeProvider>
      </AppContextProvider>
  )
}

export default App

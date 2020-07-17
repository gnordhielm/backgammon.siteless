import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HelmetMeta from 'components/HelmetMeta'

import AppRoutes from 'components/AppRoutes/AppRoutes'
import AppSafeBackProvider from 'components/AppSafeBackProvider'
import AuthProvider from 'contexts/Auth/Provider'
import { META_INFO } from 'config/fallbacks'
import Theme from 'containers/Theme'

const App = () => (
  <>
    <HelmetProvider>
      <BrowserRouter>
        <HelmetMeta {...META_INFO} />
        <AppSafeBackProvider>
          <AuthProvider>
            <Theme />
            <AppRoutes />
          </AuthProvider>
        </AppSafeBackProvider>
      </BrowserRouter>
    </HelmetProvider>
  </>
)

export default App

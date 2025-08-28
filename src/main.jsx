// Removed StrictMode in production to avoid double-invocation side effects
// that can surface as React Error #310 when third-party hooks are used.
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { HelmetProvider } from 'react-helmet-async'

import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import App from './App.jsx'
import { modernTheme } from './theme/modernTheme.js'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider theme={modernTheme}>
          <Notifications />
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
)

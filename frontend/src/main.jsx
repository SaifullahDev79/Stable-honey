import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { PrivyProvider } from '@privy-io/react-auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <title>StableHoney</title>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          ethereum: { createOnLogin: 'users-without-wallets' }
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
)

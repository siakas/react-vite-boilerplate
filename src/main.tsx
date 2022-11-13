// import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import App from '@/App'

import { store } from '@/app/store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  // Redux を使うには Provider コンポーネントで囲む必要がある
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)

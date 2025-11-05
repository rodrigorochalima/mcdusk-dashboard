import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/original.css'
import './styles/mobile.css'
import './styles/insights.css'
import './styles/navigation.css'
import './styles/charts.css'
import './styles/indicators.css'
import './styles/asset-details.css'
import './styles/modal.css'
import './styles/modal-complete.css'
import './styles/analysis.css'
import './styles/learn.css'
import Router from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)

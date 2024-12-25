
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './component/StoreContext/ThemeProvider.jsx';
import StoreContextProvider from './component/StoreContext/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <BrowserRouter>
  <StoreContextProvider>
    <App />
    </StoreContextProvider>
    </BrowserRouter>
    </ThemeProvider>
)

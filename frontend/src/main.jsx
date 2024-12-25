// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import  StoreContextProvider  from './components/StoreContext/StoreContext';
import { ThemeProvider } from './components/StoreContext/ThemeProvider.jsx';



createRoot(document.getElementById('root')).render(
  <ThemeProvider>
 <BrowserRouter>
   <StoreContextProvider>
   
    <App />
    
    </StoreContextProvider>
    </BrowserRouter>
    </ThemeProvider>
)

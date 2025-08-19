import Layout from './components/Layout/Layout.jsx';
import FAQ from './pages/Faq/FaqPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header.jsx'
import { AlquileresProvider } from './pages/Calculadora/context/AlquileresContext';
import { SnackbarProvider } from 'notistack';
// import GlobalErrorHandler from './pages/Calculadora/components/GlobalErrorHandler.jsx';

function App() {


  return (

  <AlquileresProvider>
  <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    {/* <GlobalErrorHandler /> */}
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/preguntas-frecuentes" element={<FAQ />} /> */}
      </Routes>
    </Router>
  </SnackbarProvider>
</AlquileresProvider>
     
      
    
    
 
   
  )
}

export default App

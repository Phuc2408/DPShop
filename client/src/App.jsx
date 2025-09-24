import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './page/Homepage'
import Loginpage from './page/Loginpage';
import Registerpage from './page/Registerpage';
import Forgotpw from './page/Forgotpw';
import ProductPage from './page/Productpage';
import Accesoriespage from './page/Accessories';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/register' element={<Registerpage />} />
          <Route path='/forgotpw' element={<Forgotpw />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:categorySlug" element={<ProductPage />} />
          <Route path="/products/:categorySlug/:subSlug" element={<ProductPage />} />
          <Route path='/accessories' element={<Accesoriespage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

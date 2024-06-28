
import './App.css';

import NotFound from './components/NotFound';
import SideMenu from './components/SideMenu';

import Product from './components/Products'; 
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
  } from "react-router-dom"

import Customer from './components/Customer';
import InvoicePage from './components/InvoicePage';
import ShowInvoices from './components/ShowInvoices';
import Seller from './components/Seller';



function App() {

  return (
    <div className= {"flex "} >
    <Router> 
          {<SideMenu/>}
          
          <Routes>
              
              <Route path = "/*" element = {<NotFound/>}/>
              <Route path = '/product' element = {<><Product/></>}/>
              
              <Route path = '/customer' element = {<Customer/>}/>
              <Route path = '/invoice' element = {<InvoicePage/>}/>
              <Route path = '/showinvoices' element = {<ShowInvoices/>}/>
              <Route path = '/seller' element = {<Seller/>}/>
          </Routes>
        
      </Router>
      </div>
  );
}

export default App;

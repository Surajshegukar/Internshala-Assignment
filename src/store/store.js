import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/product/productReducer';
import customerReducer from '../features/customer/customerReducer';
import invoiceReducer from '../features/invoice/invoiceReducer';


import sellerReducer from '../features/seller/sellerReducer';




const rootReducers = combineReducers({
    product: productReducer,
    customer: customerReducer,
    invoice: invoiceReducer,
    
    seller: sellerReducer
});


export const store = configureStore({
  reducer: rootReducers
});


export default store;
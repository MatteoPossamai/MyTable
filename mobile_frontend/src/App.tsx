// Global imports
import React, {lazy, Suspense} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local imports
// Components
import Base from './components/base';
import MiddlePage from './components/middlePage';
import Loader from './components/loader';
import InitialForm from './components/initialForm';

const HomePage = lazy(() => import('./components/homepage'));
const FourOhFour = lazy(() => import('./components/404'));
const PaymentPage = lazy(() => import('./components/paymentPage'));
const ConfirmPage = lazy(() => import('./components/confirmPage'));


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="initial/:id" element={<MiddlePage />} />
          <Route path="mytable/:id" element={<InitialForm />} />
          <Route path="mytable/menu/:id" element={<Base />} />
          <Route path="mytable/menu/payment/:id" element={<PaymentPage />} />
          <Route path="mytable/menu/payment/confirm/:id" element={<ConfirmPage />} />
          <Route path='*' element={<FourOhFour />} /> 
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;

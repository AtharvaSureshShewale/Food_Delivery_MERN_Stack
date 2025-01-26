import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.jsx';
// import '../node_modules'
function App() {
  return (
    <>
    <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/createuser' element={<Signup/>}/>
      <Route path='/myorderData' element={<MyOrder/>}/>
    </Routes>
    </BrowserRouter>
    </CartProvider>
    </>
  );
}

export default App;

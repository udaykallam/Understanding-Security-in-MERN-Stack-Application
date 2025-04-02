import './App.css';
import { Route,Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import SignIn from './pages/Signin';
import ResponsiveAppBar1 from './pages/Navbar'
import Error from './pages/Error';
import Contact from './pages/Contact';
import Logout from './pages/Logout';
import Places from './pages/Places';
import AdminLayout from './components/layouts/Admin-Layout';
import AdminUsers from './pages/Admin-Users';
import AdminContacts from './pages/Admin-Contacts';
import AdminUpdate from './pages/AdminUpdate';
import TermsAndConditions from './pages/TermsAndConditions';
import Loading from './pages/Loading';
import AdminPlaces from './pages/Admin-Places';
import OtpMail from './components/OtpMail';
import VerifyOtp from './components/VerifyOtp';
import ChangePassword from './components/ChangePassword';
import AdminCity from './pages/Admin-City';


function App() {
  return (
    <div className="App">
      <ResponsiveAppBar1/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path="/places" element={<Places/>} />
        <Route path="/terms&conditions" element={<TermsAndConditions/>} />
        <Route path="/loading" element={<Loading/>} />
        <Route path='*' element={<Error/>} />
        <Route path='/otpmail' Component={OtpMail}/>
        <Route path='/verifyotp' Component={VerifyOtp}/>
        <Route path='/change-password' Component={ChangePassword}/>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path ="contacts" element={<AdminContacts/>}/>
          <Route path="users/:id/edit" element={<AdminUpdate/>}/>
          <Route path="places/add" element={<AdminPlaces/>} />
          <Route path="city" element={<AdminCity/>} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;

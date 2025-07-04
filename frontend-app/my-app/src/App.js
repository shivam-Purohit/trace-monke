import logo from './logo.svg';
import './App.css';
import ResponsiveNavBar from './components/navbar'
import HomePage from './components/homepage'
import Footer from './components/footer'
import SignInPage from './components/signin';
// import { useState } from 'react';
function App() {
  // const [showSignIn, setShowSignIn] = useState(false);

  // const handleLoginClick = () => {
  //   setShowSignIn(true);
  // };

  // const handleSignInSuccess = () => {
  //   // For real apps, you'd set login state here
  //   setShowSignIn(false);
  // };

  return (
    <div className="App">
       <ResponsiveNavBar  />
        <HomePage/>
        <SignInPage/>
         <Footer/>
    </div>
  );
}

export default App;

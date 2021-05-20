import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {login, logout,selectUser } from './features/userSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (

  <div className="App">
      {
        user ? (
        <>
          <Sidebar/>
           <Chat/>
        </>):(<Login/>)
      }
   
     
    </div>
    
  );
}

export default App;

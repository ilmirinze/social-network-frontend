import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import SignUp from './components/Registration/SignUp';


const App = (props) => {
  return (
    <BrowserRouter>
      {(!props.isAuth) ?
        <div className='app-wrapper'>
          <div className={'app-wrapper-content'}>
            <Navbar />
            <HeaderContainer />
            <Routes>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/login' element={<Login />} />
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path='/users' element={<UsersContainer />} />
            </Routes>
          </div>
        </div>
        :
        <div>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      }


      {/* {(!props.isAuth) ? null : <div><Navbar /> <HeaderContainer /></div>}
      <div className='app-wrapper'>
        <div className={'app-wrapper-content'}>
          <Routes>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path="/registration" element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path="/profile" element={<ProfileContainer />}>
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path='/users' element={<UsersContainer />} />


          </Routes>
        </div>
      </div>
    
  );
} */}
    </BrowserRouter>
  )
}


export default App;

import React from 'react';
import './App.css';
import NavbarContainer from './components/navbar/navbar.container';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DialogsContainer from './components/tabs-content/dialogs/dialogs.container';
import UsersContainer from './components/tabs-content/users/users.container';
import ProfileContainer from './components/tabs-content/profile/profile.container';
import Login from './components/authentication/sign-in/sign-in.component';
import SignUpContainer from "./components/authentication/sign-up/sign-up.container";


const App = (props) => {
  return (
    <BrowserRouter>


      <div className='app-wrapper'>
        <NavbarContainer />
        <div className={'app-wrapper-content'}>
          <Routes>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path="/signUp" element={<SignUpContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path="/profile" element={<ProfileContainer />}>
              <Route path=":userId" element={<ProfileContainer />} />
            </Route>
            <Route path='/users' element={<UsersContainer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}


export default App;

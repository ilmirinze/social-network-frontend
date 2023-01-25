import React from 'react';
import './App.css';
import Nafbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';


const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nafbar />
        <div className={'app-wrapper-content'}>
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
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DialogsContainer from './components/tabs-content/dialogs/dialogs.container';
import UsersContainer from './components/tabs-content/users/users.container';
import ProfileContainer from './components/tabs-content/profile/profile.container';
import HeaderContainer from './components/header/header.ontainer';
import Login from './components/authentication/sign-in/sign-in.component';
import SignUpContainer from "./components/authentication/sign-up/sign-up.container";


const App = (props) => {
  return (
    <BrowserRouter>
      {(props.isAuth) ?
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
            <Route path="/signUp" element={<SignUpContainer />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      }


      {/* {(!props.isAuth) ? null : <div><navbar /> <HeaderContainer /></div>}
      <div className='app-wrapper'>
        <div className={'app-wrapper-content'}>
          <Routes>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path="/sign-up" element={<sign-up />} />
            <Route path='/login' element={<sign-in />} />
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

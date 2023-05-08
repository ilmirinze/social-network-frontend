import React from 'react';
import './App.css';
import NavbarContainer from './components/navbar/navbar.container';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersContainer from './components/tabs-content/users/users.container';
import ProfileContainer from './components/tabs-content/profile/profile.container';
import Login from './components/authentication/sign-in/sign-in.component';
import SignUpContainer from "./components/authentication/sign-up/sign-up.container";
import ChatPage from './components/tabs-content/chat/chat';
import Todolist from './components/tabs-content/todolist/todolist';
import Table from './components/tabs-content/table/table';

const SOCKET_URL = 'http://localhost:8080/ws-chat/';


let onConnected = () => {
  console.log("Connected!!")
}


const App = (props) => {
  return (
    <BrowserRouter>


      <div className='app-wrapper'>
        <NavbarContainer />
        <div className={'app-wrapper-content'}>
          <Routes>

            <Route path="/signUp" element={<SignUpContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/todolist" element={<Todolist />} />
            <Route path="/table" element={<Table />} />
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

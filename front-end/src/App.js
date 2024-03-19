import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharityPage from "./CharityPage/CharityPage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import RegisterCharityPage from "./RegisterPage/RegisterCharityPage";
import RegisterUserPage from "./RegisterPage/RegisterUserPage";
import HomePage from "./HomePage/HomePage";
import UserHomePage from "./HomePage/UserHomePage";
/* import CharityHomePage from "./HomePage/CharityHomePage"; */
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import CreateBlogPage from "./CreateBlogPage/CreateBlogPage";
import BookmarkPage from "./BookmarkPage/BookmarkPage";
import NotFound from "./NotFound";
import NavigationBar from './common/NavigationBar';
import { ReactSession } from 'react-client-session';
import Search from './common/Search';

function App() {
  ReactSession.setStoreType("localStorage");
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <Routes>  {/* render the first route that matches the current URL */}
          <Route exact path="/" element={<HomePage />} /> {/* React v6 route syntax */}
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/charities" element={<CharityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerUser" element={<RegisterUserPage />} />
          <Route path="/registerCharity" element={<RegisterCharityPage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/createBlog" element={<CreateBlogPage />} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/bookmarks" element={<BookmarkPage/>}/>
          <Route path="/" element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

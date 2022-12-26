import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";
import ArtistPage from "../pages/ArtistPage";
import AlbumPage from "../pages/AlbumPage";
import SearchPage from "../pages/SearchPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="artist/:id" element={<ArtistPage />} />
        <Route path="album/:id" element={<AlbumPage />} />
        <Route path="search" element={<SearchPage />} />
        {/* <Route path="user/:userId" element={<UserProfilePage />} /> */}
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

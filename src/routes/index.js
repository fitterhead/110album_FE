import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../components/item/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";
import ArtistPage from "../pages/ArtistPage";
import AlbumPage from "../pages/AlbumPage";
import SearchPage from "../pages/SearchPage";
import PlaylistItem from "../components/item/PlaylistItem";
import AuthRequired from "./AuthRequired";
import PlaylistContent from "../pages/PlaylistContent";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="account" element={<AccountPage />} />

        <Route
          path="album/findAlbumById/:id"
          element={
            <AuthRequired>
              <AlbumPage />
            </AuthRequired>
          }
        />

        {/* <Route path="account/savedAlbum" element={<PlaylistItem />} /> */}
        <Route path="artist/findArtistById/:id" element={<ArtistPage />} />
        <Route path="search" element={<SearchPage />} />
        {/* <Route path="/PlaylistContent" element={<PlaylistContent />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

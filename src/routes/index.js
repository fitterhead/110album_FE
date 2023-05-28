import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../components/item/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import ArtistPage from "../pages/ArtistPage";
import AlbumPage from "../pages/AlbumPage";
import SearchPage from "../pages/SearchPage";
import PlaylistItem from "../components/item/PlaylistItem";
import AuthRequired from "./AuthRequired";
import PlaylistContent from "../components/item/PlaylistContent";
import RegisterModal from "../components/item/RegisterModal";
import PaymentPage from "../pages/PaymentPage";
import { useLocation } from "react-router-dom";
import DashboardPage from "../features/dashboard/DashboardPage";
import UserDashboard from "../features/dashboard/UserDashboard";
import AdminRequired from "./AdminRequired";
import SongPage from "../features/song/SongPage";
import PlaylistPage from "../features/playlist/PlaylistPage";
function Router() {
  // const location = useLocation();
  return (
    <Routes
    // location={location} key={location.pathname}
    >
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="account" element={<AccountPage />}>
          <Route path=":id" element={<PlaylistContent />} />
        </Route>
        <Route
          path="album/result/:id"
          element={
            <AuthRequired>
              <AlbumPage />
            </AuthRequired>
          }
        />
        <Route
          path="playlist"
          element={
            <AuthRequired>
              <PlaylistPage />
            </AuthRequired>
          }
        />

        {/* <Route path="account/savedAlbum" element={<PlaylistItem />} /> */}
        <Route path="artist/:id" element={<ArtistPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="dashboard"
          element={
            <AdminRequired>
              <DashboardPage />
            </AdminRequired>
          }
        />
        <Route
          path="management"
          element={
            <AdminRequired>
              <SongPage />
            </AdminRequired>
          }
        />
        <Route
          path="dashboard/:id"
          element={
            <AdminRequired>
              <UserDashboard />
            </AdminRequired>
          }
        />

        {/* <Route path="/PlaylistContent" element={<PlaylistContent />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;

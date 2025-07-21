import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";
import LoggedOutLayout from "@/layouts/LoggedOutLayout.jsx";
import AuthPage from "@/pages/auth/AuthPage.jsx";
import HomePage from "@/pages/home/HomePage.jsx";
import ExplorePage from "@/pages/explore/ExplorePage.jsx";
import MessagesPage from "@/pages/messages/MessagesPage.jsx";
import ProfilePage from "@/pages/profile/ProfilePage.jsx";
import SettingsPage from "@/pages/settings/SettingsPage.jsx";
import Search from "@/pages/search/Search.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useAuth } from "./contexts/AuthContext.js";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        {user ? (
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<AuthPage />} />
            <Route path="/" element={<LoggedOutLayout />}>
              <Route path="explore" element={<ExplorePage />} />
            </Route>
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";
import LoggedOutLayout from "@/layouts/LoggedOutLayout.jsx";
import AuthPage from "@/pages/AuthPage.jsx";
import HomePage from "@/pages/home/HomePage.jsx";
import ExplorePage from "@/pages/ExplorePage.jsx";
import MessagesPage from "@/pages/MessagesPage.jsx";
import ProfilePage from "@/pages/profile/ProfilePage.jsx";
import SettingsPage from "@/pages/SettingsPage.jsx";
import Search from "@/components/Search.jsx";
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

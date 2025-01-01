import { Container } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/toaster";
import AuthPage from "./pages/auth/AuthPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NoUserRoute from "./routes/NoUserRoute";
import { AUTH, HOME, PROFILE, UPDATE_PROFILE } from "./constants/routes";
import UpdateProfilePage from "./pages/profile/UpdateProfilePage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <Container maxW="xl">
      <Header />
      <Routes>
        <Route path={HOME} element={<NoUserRoute />}>
          <Route path={AUTH} element={<AuthPage />} />
        </Route>
        <Route path={HOME} element={<ProtectedRoute />}>
          <Route
            index
            element={
              <h1>
                <Link to={PROFILE}>Profile</Link>
              </h1>
            }
          />
          <Route path={PROFILE} element={<ProfilePage />} />
          <Route path={UPDATE_PROFILE} element={<UpdateProfilePage />} />
        </Route>

        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:id" element={<PostPage />} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;

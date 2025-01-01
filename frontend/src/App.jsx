import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/toaster";
import AuthPage from "./pages/auth/AuthPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NoUserRoute from "./routes/NoUserRoute";

function App() {
  return (
    <Container maxW="xl">
      <Header />
      <Routes>
        <Route path="/" element={<NoUserRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<h1>Home</h1>} />
        </Route>

        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:id" element={<PostPage />} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;

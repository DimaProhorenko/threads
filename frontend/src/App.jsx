import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/toaster";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <Container maxW="xl">
      <Header />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:id" element={<PostPage />} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;

import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Container maxW="xl">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:id" element={<PostPage />} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;

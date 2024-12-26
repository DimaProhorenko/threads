import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/layout/Header";

function App() {
  return (
    <Container maxW="xl">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:id" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;

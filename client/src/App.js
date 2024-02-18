import Nav from "./components/Navigation";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

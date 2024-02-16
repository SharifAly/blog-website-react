import { createContext, useState } from "react";
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
export const Context = createContext();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Context.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default App;

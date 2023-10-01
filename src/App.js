import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import MovieList from "./components/movieList/MovieList";
import Movie from "./pages/movieDetail/Movie";
import { useState } from "react";
function App() {
  const [searchData, setSearchData] = useState([]);
  return (
    <div className="App">
      <Router>
        <Header setSearchData={setSearchData} />
        <Routes>
          <Route index element={<Home searchData={searchData} />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route index
            path="movies/:type"
            element={<MovieList searchData={searchData} />}
          ></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

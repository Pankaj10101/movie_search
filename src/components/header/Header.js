import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ setSearchData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const debouncedSearch = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=cb7bd15597eff498435012dae0ca6815&query=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSearchData(data.results);
        setError(null); // Resetting error state on successful fetch
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data. Please try again later.");
      }
    }, 1000);

    return () => clearTimeout(debouncedSearch);
  }, [searchTerm, setSearchData]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="logo">Movies</h2>
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
      </div>
      <div className="headerRight">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
        <i className="fa fa-search" aria-hidden="true"></i>
      </div>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
};

export default Header;

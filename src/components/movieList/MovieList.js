import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"

const MovieList = ({searchData}) => {
    const [movieList, setMovieList] = useState([]);
    const {type} = useParams();

    useEffect(() => {
        if (searchData && searchData.length > 0) { 
            setMovieList(searchData);
        } else {
            getData();
        }
    }, [searchData, type]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setMovieList(data.results);
                } else {
                    setMovieList([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMovieList([]);
            });
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.length > 0
                    ? movieList.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                    : <div>No results found.</div>
                }
            </div>
        </div>
    )
}

export default MovieList;

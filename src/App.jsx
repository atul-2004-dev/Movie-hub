import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
const API_URL = "https://www.omdbapi.com?apikey=3bc6baad";



function App() {

  const[movies,setMovies]=useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search)
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie();
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovie(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for Movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img src={SearchIcon} alt="pic-of-search" onClick={() => searchMovie(searchTerm)} />
      </div>

      {
        movies?.length>0?(
        
          <div className="container"> 

      
{movies.map((movie) => (
  <MovieCard key={movie.imdbID} movie={movie} /> 
))}

        
    
          </div>
        ):(
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
     
    </div>
  );
}

export default App;

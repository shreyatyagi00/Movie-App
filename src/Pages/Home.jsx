import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { useLocation } from "react-router-dom";



const Home = ({ favorites, addToFavorites, removeFromFavorites }) => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();



  const defaultKeywords = ["batman", "avengers", "iron man", "harry potter"];

  const fetchMovies = async (term) => {
    setLoading(true);
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${term}`
    );
    const data = await res.json();
    setMovies(data.Search || []);
    setLoading(false);
  };
  const loadDefaultMovies = async () => {
  setLoading(true);

  const keywords = ["batman", "avengers", "iron man"];
  const movieMap = new Map();  

  for (let keyword of keywords) {
    for (let page = 1; page <= 2; page++) {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${keyword}&page=${page}`
      );
      const data = await res.json();

      if (data.Search) {
        data.Search.forEach((movie) => {
          movieMap.set(movie.imdbID, movie); 
        });
      }

      if (movieMap.size >= 20) break;
    }

    if (movieMap.size >= 20) break;
  }

  setMovies(Array.from(movieMap.values()).slice(0, 20));
  setLoading(false);
};

;


  useEffect(() => {
  if (searchTerm === "") {
    loadDefaultMovies();
  } else {
    fetchMovies(searchTerm);
  }
}, [searchTerm]);
useEffect(() => {
  if (location.state?.reset) {
    setQuery("");
    setSearchTerm("");
  }
}, [location.state]);

 

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
       
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search movies..."
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      if (query.trim() === "") {
        setSearchTerm("");       
      } else {
        setSearchTerm(query);   
      }
    }
  }}
  style={{
    padding: "10px",
    width: "260px",
    borderRadius: "8px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    outline: "none",
    marginRight: "10px",
  }}
/>

        <button
          onClick={() => setSearchTerm(query)}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "white",
            background: "linear-gradient(135deg, #141e30, #243b55)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "25px",
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            favorites={favorites}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>

      {loading && <p style={{ color: "white" }}>Loading...</p>}
    </div>
  );
};

export default Home;

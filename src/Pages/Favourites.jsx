import MovieCard from "../Components/MovieCard";
import { useNavigate } from "react-router-dom";

const Favourites = ({ favorites, removeFromFavorites }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
      }}
    >
       
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#ff4b2b",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ← Back to Movies
      </button>

      <h1>❤️ Favourites</h1>

      {favorites.length === 0 ? (
        <p>No favourite movies yet 😢</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;


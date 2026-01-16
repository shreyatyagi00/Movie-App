import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({
  movie,
  favorites = [],
  addToFavorites,
  removeFromFavorites,
}) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  if (!movie) return null;

  const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "200px",
        padding: "10px",
        borderRadius: "14px",
        background: "white",
        textAlign: "center",
        cursor: "pointer",
        transform: hover ? "scale(1.06)" : "scale(1)",
        transition: "0.3s",
        boxShadow: hover
          ? "0 12px 25px rgba(0,0,0,0.3)"
          : "0 5px 12px rgba(0,0,0,0.2)",
      }}
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
        style={{
          width: "100%",
          height: "280px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      
       

      {isFavorite ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromFavorites(movie.imdbID);
          }}
          style={{
            marginTop: "8px",
            background: "#333",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ❌ Remove Favorite
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToFavorites(movie);
          }}
          style={{
            marginTop: "8px",
            background: "linear-gradient(135deg, #141e30, #243b55)",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ❤️ Add to Favorites
        </button>
      )}
    </div>
  );
};

export default MovieCard;


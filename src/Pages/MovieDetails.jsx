import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`
      );
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p style={{ color: "white", padding: "40px" }}>Loading...</p>;
  }

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
      }}
    >
       
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "25px",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "#ff4b2b",
          color: "white",
          fontWeight: "bold",
        }}
      >
        ← Back to Movies
      </button>

      
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
         
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={{
            width: "300px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        />

         
        <div style={{ maxWidth: "600px" }}>
          <h1>{movie.Title}</h1>

          <p><b>Year:</b> {movie.Year}</p>
          <p><b>Genre:</b> {movie.Genre}</p>
          <p><b>Director:</b> {movie.Director}</p>
          <p><b>Actors:</b> {movie.Actors}</p>
          <p><b>IMDB Rating:</b> ⭐ {movie.imdbRating}</p>

          <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
            {movie.Plot}
          </p>

          
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
              movie.Title + " official trailer"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 20px",
              borderRadius: "10px",
              background: "#ff0000",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ▶ Watch Trailer on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

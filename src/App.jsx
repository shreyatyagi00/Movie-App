import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";


import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Favourites from "./Pages/Favourites";
import Navbar from "./Components/Navbar";

const App = () => {
  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

  const addToFavorites = (movie) => {
    if (!favorites.find((m) => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((m) => m.imdbID !== id));
  };
  useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);


  return (
    <>
      
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route
          path="/favourites"
          element={
            <Favourites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;

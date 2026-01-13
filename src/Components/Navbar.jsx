import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const goHomeAndReset = () => {
    navigate("/", {
      state: { reset: true },  
    });
  };

  return (
    <div
      style={{
        height: "70px",
        background: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        fontSize: "18px",
      }}
    >
      <span
        onClick={goHomeAndReset}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        Home
      </span>

      <NavLink
        to="/favourites"
        style={{ color: "white", textDecoration: "none" }}
      >
        Favourites ❤️
      </NavLink>
    </div>
  );
};

export default Navbar;

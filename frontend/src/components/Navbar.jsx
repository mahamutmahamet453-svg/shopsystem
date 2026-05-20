import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar">

      <h3>Dukaan Management</h3>

      <button
        className="btn"
        onClick={logout}
      >
        Ka Bax
      </button>

    </div>
  );
};

export default Navbar;
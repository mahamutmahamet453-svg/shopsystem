import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2>🏪 Dukaan POS</h2>

      <ul>

        <li>
          <Link to="/">
            📊 Xogta Dukaan
          </Link>
        </li>

        <li>
          <Link to="/products">
            📦 Badeecooyin
          </Link>
        </li>

        <li>
          <Link to="/pos">
            🛒 Iibka
          </Link>
        </li>

        <li>
          <Link to="/sales">
            📈 Warbixin
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;
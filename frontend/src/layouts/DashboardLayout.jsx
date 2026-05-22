import {
  Link,
  useLocation,
} from "react-router-dom";

const DashboardLayout = ({
  children,
}) => {

  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menus = [
    { name: "📊 Maamulka", path: "/" },
    { name: "📦 Alaabo", path: "/products" },
    { name: "🛒 Kasheer", path: "/pos" },
    { name: "🧾 Iibka", path: "/sales" },
    { name: "⚙️ Settings", path: "/settings" },
  ];

  const settings = JSON.parse(
    localStorage.getItem("shopSettings")
  ) || {
    shopName: "📦 Somali Shop Manager",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "260px",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>

        <div>

          <h1 style={{ fontSize: "22px", marginBottom: "30px" }}>
            {settings.shopName}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            {menus.map((m) => (
              <Link
                key={m.path}
                to={m.path}
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "12px",
                  borderRadius: "10px",
                  background:
                    location.pathname === m.path ? "#2563eb" : "transparent",
                }}
              >
                {m.name}
              </Link>
            ))}

          </div>
        </div>

        <button
          onClick={logoutHandler}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
          }}
        >
          🚪 Logout
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>

        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}>
          <h2>👋 Welcome</h2>
          <p>Maamul dukaankaaga</p>
        </div>

        {children}

      </div>

    </div>
  );
};

export default DashboardLayout;
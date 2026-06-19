import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = [
    { name: "Tracker", path: "/tracker" },
    { name: "Analytics", path: "/analytics" },
    { name: "Analyzer", path: "/analyzer" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#D6C2A1]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#8B6F47]">
            INTERN PILOT
          </h1>

          <p className="text-sm text-gray-600">
            Track Applications. Analyze Skill Gaps.
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === link.path
                  ? "bg-[#8B6F47] text-white"
                  : "bg-[#F8F5F0]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
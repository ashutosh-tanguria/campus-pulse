import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/notices?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="navbar glass-card">
      <form
        className={`navbar-search ${focused ? "focused" : ""}`}
        onSubmit={handleSubmit}
      >
        <Search size={17} />
        <input
          type="text"
          placeholder="Search notices, events, people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <kbd>⌘K</kbd>
      </form>

      <div className="navbar-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <img
          className="navbar-avatar"
          src="https://i.pravatar.cc/40?img=12"
          alt="profile"
        />
      </div>
    </header>
  );
}

export default Navbar;
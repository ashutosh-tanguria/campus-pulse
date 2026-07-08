import { NavLink } from "react-router-dom";
import { Home, Bell, Calendar, Bookmark, User } from "lucide-react";
import "./BottomNav.css";

function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/notices", label: "Notices", icon: Bell },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { to: "/settings", label: "Profile", icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            isActive ? "bottom-nav-item active" : "bottom-nav-item"
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  Calendar,
  LayoutGrid,
  Bookmark,
  Settings as SettingsIcon,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/notices", label: "Notices", icon: Bell },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <LayoutGrid size={20} />
        </div>
        <div>
          <h2>Campus Pulse</h2>
          <span>Stay Updated, Stay Ahead</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-profile glass-card">
        <img src="https://i.pravatar.cc/40?img=12" alt="John" />
        <div>
          <strong>John</strong>
          <span>B.Tech '29</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
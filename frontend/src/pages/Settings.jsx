import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your preferences.</p>
      </div>

      <div className="glass-card" style={{ padding: 24, maxWidth: 500, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <img
            src="https://i.pravatar.cc/60?img=12"
            alt="profile"
            style={{ width: 56, height: 56, borderRadius: "50%" }}
          />
          <div>
            <h3 style={{ fontSize: 16 }}>John</h3>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>B.Tech '29</span>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 20, maxWidth: 500 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            <div>
              <strong style={{ fontSize: 14, display: "block" }}>Theme</strong>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Currently using {theme} mode
              </span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              width: 48,
              height: 26,
              borderRadius: 999,
              background: theme === "dark" ? "var(--gradient-primary)" : "var(--glass-border)",
              position: "relative",
              transition: "background 0.3s ease",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: theme === "dark" ? 25 : 3,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.3s ease",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
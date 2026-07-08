import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notices";
import Events from "./pages/Events";
import NoticeDetail from "./pages/NoticeDetail";
import EventDetail from "./pages/EventDetail";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
import { useState, useMemo } from "react";
import { Bell, Calendar, Flag, Clock } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "../components/StatsCard";
import CategoryPills from "../components/CategoryPills";
import FeaturedEvent from "../components/FeaturedEvent";
import NoticeCard from "../components/NoticeCard";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useFetch } from "../hooks/useFetch";
import { fetchNotices, fetchEvents } from "../api/api";
import { Link } from "react-router-dom";

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("campus-pulse-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const toggle = (id) => {
    setBookmarks((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id];
      localStorage.setItem("campus-pulse-bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  return { bookmarks, toggle };
}

function Dashboard() {
  const [category, setCategory] = useState("All");
  const { bookmarks, toggle } = useBookmarks();

  const {
    data: notices,
    loading: noticesLoading,
    error: noticesError,
  } = useFetch(() => fetchNotices({ category: category === "All" ? "" : category }), [category]);

  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
  } = useFetch(() => fetchEvents({ category: category === "All" ? "" : category }), [category]);

  const featured = useMemo(() => {
    if (!events) return null;
    return events.find((e) => e.featured) || events[0];
  }, [events]);

  const upcoming = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => e.id !== featured?.id).slice(0, 6);
  }, [events, featured]);

  return (
    <div>
      <div className="page-header">
        <h1>
          Good Evening, <span className="text-gradient">John</span> 👋
        </h1>
        <p>Here's what's happening on campus today.</p>
      </div>

      <div className="stats-grid">
        <StatsCard icon={Bell} value={notices?.length ?? "—"} label="Notices" sublabel="+8 new" color="indigo" />
        <StatsCard icon={Calendar} value={events?.length ?? "—"} label="Events" sublabel="+3 today" color="orange" />
        <StatsCard icon={Flag} value="5" label="Clubs" sublabel="Active" color="green" />
        <StatsCard icon={Clock} value="2" label="Deadlines" sublabel="This Week" color="blue" />
      </div>

      <CategoryPills active={category} onChange={setCategory} />

      <div className="dashboard-grid">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {eventsLoading && <Loader variant="spinner" />}
          {eventsError && <ErrorState message={eventsError} />}
          {featured && !eventsLoading && !eventsError && <FeaturedEvent event={featured} />}
        </motion.div>

        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16 }}>Latest Notices</h3>
            <Link to="/notices" style={{ fontSize: 13, color: "var(--accent-indigo)" }}>
              View All
            </Link>
          </div>

          {noticesLoading && <Loader count={4} />}
          {noticesError && <ErrorState message={noticesError} />}

          {!noticesLoading && !noticesError && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {notices?.slice(0, 4).map((n) => (
                <NoticeCard
                  key={n.id}
                  notice={n}
                  bookmarked={bookmarks.includes(n.id)}
                  onToggleBookmark={toggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontSize: 18 }}>Upcoming Events</h3>
        <Link to="/events" style={{ fontSize: 13, color: "var(--accent-indigo)" }}>
          View All
        </Link>
      </div>

      {eventsLoading && <Loader count={3} />}
      {eventsError && <ErrorState message={eventsError} />}

      {!eventsLoading && !eventsError && (
        <div className="events-scroll">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
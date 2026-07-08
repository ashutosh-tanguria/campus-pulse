import { useState, useMemo } from "react";
import NoticeCard from "../components/NoticeCard";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useFetch } from "../hooks/useFetch";
import { fetchNotices, fetchEvents } from "../api/api";

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

function Bookmarks() {
  const { bookmarks, toggle } = useBookmarks();

  const { data: notices, loading: nLoading, error: nError } = useFetch(() => fetchNotices(), []);
  const { data: events, loading: eLoading, error: eError } = useFetch(() => fetchEvents(), []);

  const bookmarkedNotices = useMemo(
    () => notices?.filter((n) => bookmarks.includes(n.id)) || [],
    [notices, bookmarks]
  );

  const bookmarkedEvents = useMemo(
    () => events?.filter((e) => bookmarks.includes(e.id)) || [],
    [events, bookmarks]
  );

  const loading = nLoading || eLoading;
  const error = nError || eError;

  return (
    <div>
      <div className="page-header">
        <h1>Bookmarks</h1>
        <p>Notices and events you've saved for later.</p>
      </div>

      {loading && <Loader count={4} />}
      {error && <ErrorState message={error} />}

      {!loading && !error && bookmarkedNotices.length === 0 && bookmarkedEvents.length === 0 && (
        <div className="state-message">
          <h3>No bookmarks yet</h3>
          <p>Tap the bookmark icon on any notice or event to save it here.</p>
        </div>
      )}

      {!loading && !error && bookmarkedNotices.length > 0 && (
        <>
          <h3 style={{ fontSize: 16, marginBottom: 14 }}>Notices</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {bookmarkedNotices.map((n) => (
              <NoticeCard key={n.id} notice={n} bookmarked={true} onToggleBookmark={toggle} />
            ))}
          </div>
        </>
      )}

      {!loading && !error && bookmarkedEvents.length > 0 && (
        <>
          <h3 style={{ fontSize: 16, marginBottom: 14 }}>Events</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {bookmarkedEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Bookmarks;
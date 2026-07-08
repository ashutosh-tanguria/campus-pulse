import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import CategoryPills from "../components/CategoryPills";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useFetch } from "../hooks/useFetch";
import { fetchEvents } from "../api/api";

const PAGE_SIZE = 6;

function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch(
    () => fetchEvents({ search, category: category === "All" ? "" : category }),
    [search, category]
  );

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const paginated = useMemo(() => {
    if (!data) return [];
    return data.slice(0, page * PAGE_SIZE);
  }, [data, page]);

  const hasMore = data && paginated.length < data.length;

  return (
    <div>
      <div className="page-header">
        <h1>Events</h1>
        <p>Everything happening on campus, all in one place.</p>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search events by title, venue or category..." />
      <CategoryPills active={category} onChange={setCategory} />

      {loading && <Loader count={6} />}
      {error && <ErrorState message={error} />}

      {!loading && !error && data?.length === 0 && (
        <div className="state-message">
          <h3>No events found</h3>
          <p>Try a different keyword or category.</p>
        </div>
      )}

      {!loading && !error && data?.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            <AnimatePresence>
              {paginated.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <EventCard event={e} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
              <button
                onClick={() => setPage((p) => p + 1)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Events;
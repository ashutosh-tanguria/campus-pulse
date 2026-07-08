import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import CategoryPills from "../components/CategoryPills";
import NoticeCard from "../components/NoticeCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useFetch } from "../hooks/useFetch";
import { fetchNotices } from "../api/api";

const PAGE_SIZE = 6;

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

function Notices() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const { bookmarks, toggle } = useBookmarks();

  const { data, loading, error } = useFetch(
    () => fetchNotices({ search, category: category === "All" ? "" : category }),
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
        <h1>Notices</h1>
        <p>All campus announcements in one place.</p>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search notices by title or category..." />
      <CategoryPills active={category} onChange={setCategory} />

      {loading && <Loader count={6} />}
      {error && <ErrorState message={error} />}

      {!loading && !error && data?.length === 0 && (
        <div className="state-message">
          <h3>No notices found</h3>
          <p>Try a different keyword or category.</p>
        </div>
      )}

      {!loading && !error && data?.length > 0 && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <AnimatePresence>
              {paginated.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <NoticeCard
                    notice={n}
                    bookmarked={bookmarks.includes(n.id)}
                    onToggleBookmark={toggle}
                  />
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

export default Notices;
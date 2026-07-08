import "./CategoryPills.css";

const CATEGORIES = [
  "All",
  "Academics",
  "Clubs",
  "Workshops",
  "Sports",
  "Hostels",
  "Placements",
  "General",
];

function CategoryPills({ active, onChange }) {
  return (
    <div className="category-pills">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`pill ${active === cat ? "pill-active" : ""}`}
          onClick={() => onChange(cat)}
        >
          {cat}
          <span className="pill-underline" />
        </button>
      ))}
    </div>
  );
}

export default CategoryPills;
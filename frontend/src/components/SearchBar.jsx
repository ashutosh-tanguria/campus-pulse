import { Search, X } from "lucide-react";
import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar glass-card">
      <Search size={18} />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
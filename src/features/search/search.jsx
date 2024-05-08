import { useState } from 'react';
import { Link } from "react-router-dom";
import './search.css';


export function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form className="search" id="search" onSubmit={handleSubmit}>
      <input
        className="search_input"
        type="text"
        id="search_input"
        name="search"
        placeholder="ПОИСК"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        required
        minLength="1"
        maxLength="99"
        size="10"
      />
      <Link to={`/search/${searchValue}`}>
        <button type="submit" className="search_button">
          <span className="symbols">search</span>
        </button>
      </Link>
    </form>
  );
}
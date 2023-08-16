import '../styles/SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-box row gy-3">
      <div className="search-bar col-md-10">
        <input className="search-input form-control" placeholder="Search by name, title, location, company, industry experience, media, full-time etc." />
      </div>
      <div className="search-btn col-md-2">
        <button className="btn">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";

const Navbar = ({ setSearchFilter }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const a = e.target.value;
    if (!a) {
      setSearchValue("");
      setSearchFilter("");
    } else {
      setSearchValue(a);
      setSearchFilter(searchValue);
      console.log(a);
    }
  };

  return (
    <>
      <nav className="navbar text-light bg-dark">
        <div className="container">
          <div className="">
            <h3>Money Tracker</h3>
          </div>
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by Category"
              value={searchValue}
              onChange={handleSearch}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="blue"
              className="bi bi-search mt-2"
              viewBox="0 0 16 15"
              style={{marginLeft:"-40px"}}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

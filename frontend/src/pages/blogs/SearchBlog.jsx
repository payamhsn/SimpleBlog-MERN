import React from "react";

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === "enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder="Hotels with Rooftop Pool Near..."
        className="py-2 px-4 mr-5 w-96 bg-[#f7f8f9] focus:outline-none rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-[#1E73BE] px-4 py-2 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;

import { useState } from "react";
import SearchResult from "./SearchResult";

const searchValueMax = 20;

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const updateSearchValue = (value) => {
    if (value.length <= searchValueMax) {
      setSearchValue(value.trim());
    }
  };

  return (
    <div className="w-full">
      <div className="px-8 py-4">
        <input
          className="w-full max-w-128 px-4 py-2 rounded-sm bg-gray-100 focus:outline-none"
          type="text"
          placeholder="search"
          value={searchValue}
          onChange={(e) => updateSearchValue(e.target.value)}
        />
      </div>
      <SearchResult searchValue={searchValue} />
    </div>
  );
}

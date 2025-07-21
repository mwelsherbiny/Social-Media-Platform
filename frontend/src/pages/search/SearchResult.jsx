import { useEffect, useState } from "react";
import userService from "../../services/userService";
import ProfileIcon from "../profile/ProfileIcon";
import { Link } from "react-router";
import { UseNotification } from "../../contexts/NotificationContext";
import safeFetch from "@/util/safeFetch";

export default function SearchResult({ searchValue }) {
  const { setTimedNotification } = UseNotification();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await userService.searchByUsername(searchValue);
      setSearchResults(results);
    }

    if (searchValue.length === 0) setSearchResults([]);
    else
      safeFetch(fetchData, (error) =>
        setTimedNotification({
          text: error?.response?.data?.error || "Failed to load search results",
          type: "error",
        })
      );
  }, [searchValue, setTimedNotification]);

  const resultsEls = searchResults.map((result) => {
    return (
      <Link key={result.id} to={`/profile/${result.username}`}>
        <div className="flex flex-row items-center w-full hover:bg-gray-100 px-8 py-2 gap-4">
          <ProfileIcon imgSrc={result.profile_picture_url} />
          <div className="flex flex-col justify-center">
            <p className="font-semibold">{result.username}</p>
            <p className="text-gray-500">{result.name}</p>
          </div>
        </div>
      </Link>
    );
  });

  return resultsEls;
}

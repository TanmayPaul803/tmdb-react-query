import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { useQuery } from "react-query";

const Header = () => {
  const [searchText, seSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation = useNavigate();
  const API_KEY = "ad014426caee6fb47d0e1527d3b351ad";
  //  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`

  const fetchSearchResults = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchText}`
    );
    return res.json();
  };
  const searchResults = useQuery("get-credites", fetchSearchResults, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  console.log(searchResults);
  return (
    <div className="bg-black px-20  text-white flex items-center justify-between">
      <div
        className="cursor-pointer text-2xl py-3 font-bold"
        onClick={() => navigation("/")}
      >
        myMovies
      </div>
      <div className="flex items-center">
        <input
          className="py-2 px-3 bg-gray-800 rounded-lg text-gray-200 mr-2"
          placeholder="Search"
          onChange={(e) => seSearchText(e.target.value)}
        />
        <button
          className="py-3 px-3 bg-gray-800 rounded-lg text-gray-200"
          onClick={() => {
            searchResults.refetch();
            setIsSearchOpen(true);
          }}
        >
          <BiSearchAlt />
        </button>
        {searchResults?.data?.results && isSearchOpen && (
          <div className="absolute top-20">
            <ul>
              {searchResults?.data?.results.slice(0, 10).map((e) => (
                <NavLink
                  to={`/${e?.media_type}/details/${e?.id}`}
                  key={e.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                  }}
                >
                  <li className="py-2 text-black px-4 my-2 bg-gray-200 w-full rounded-lg">
                    {e?.original_title || e?.original_name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const User = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState("1");
  const [postPerPage, setPostPerPage] = useState("10");

  const addData = {
    albumId: 1,
    id: 55,
    title: "swati vaidya",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  };

  const getUsers = async () => {
    const responce = await fetch(
      "https://jsonplaceholder.typicode.com/albums/1/photos"
    );
    setUser(await responce.json());
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filterandsorted = user
    .filter((curItem) => {
      return curItem.title.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "a-z") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "z-a") {
        return b.title.localeCompare(a.title);
      } else {
        return 0;
      }
    });
  console.log(filterandsorted.length);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const paginationdata = filterandsorted.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="bg-green-300">
      <h1 className="mx-auto text-center p-2 text-[40px] text-white ">
        List of Custmer
      </h1>
      <div className="text-center flex  justify-evenly p-5 text-[30px] text-white">
        <input
          className="w-[400px] h-[60px] rounded-2xl border border-white mx-auto bg-slate-300 text-center"
          type="text"
          placeholder="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="ml-4 p-2 rounded-2xl text-black"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="a-z">A to z</option>
          <option value="z-a">Z to A</option>
        </select>
      </div>
      <div className=" w-[1200px]  mx-auto grid grid-cols-3  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {paginationdata.map((curElem) => {
          return (
            <div className="w-[320px] h-[200px] bg-white rounded-md shadow-lg  hover:shadow-2xl hover:shadow-orange-200 hover:cursor-pointer">
              <div className="flex p-6 flex-col justify-evenly">
                <img
                  src={curElem.thumbnailUrl}
                  alt="img"
                  className="w-[250px] rounded-md  shadow-sm h-[100px]  "
                />
                <div className="flex flex-col">
                  <h1>Title</h1>
                  <p className="text-sm">{curElem.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mx-auto my-4">
        <Pagination
          totalPage={filterandsorted.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default User;

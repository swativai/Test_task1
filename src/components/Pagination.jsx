import React from "react";

const Pagination = ({ totalPage, postPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPage / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            <span className="w-4 h-2 bg-black text-white m-2 p-[4px] rounded-md border border-white">
              {page}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

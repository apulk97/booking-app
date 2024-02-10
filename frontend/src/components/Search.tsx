import React from "react";

function Search() {
  return (
    <form className="p-3 -mt-8 bg-orange-400 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 rounded shadow-md gap-4">
      <div className="flex flex-1 bg-white p-2">
        <input className="w-full focus:outline-none text-md" placeholder="Where are you going ?" />
      </div>
      <div className="flex flex-1 justify-between bg-white p-2">
        <div className="flex w-1/2">
            <label className="text-lg">Adult: </label>
          <input className="w-2/3 text-md focus: outline-none" type="number" />
        </div>
        <div className="flex w-1/2">
            <label className="text-lg">Child: </label>
          <input className="w-2/3 text-md focus: outline-none" type="number" />
        </div>
      </div>
      <div className="flex flex-1 bg-white p-2">
        <input />
      </div>
      <div className="flex flex-1 bg-white p-2">
        <input />
      </div>
      <div className="flex flex-1 gap-3">
        <button className="w-2/3 bg-blue-600 text-white text-xl font-bold p-2">Search</button>
        <button className="w-1/3 bg-red-600 text-white text-xl font-bold p-2">Clear</button>
      </div>
    </form>
  );
}

export default Search;

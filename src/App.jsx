import React, { useEffect, useState } from "react";


const App = () => {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setMemes(data.data.memes);
          setFiltered(data.data.memes);
        }
      })
      .catch((err) => console.error("Error fetching memes:", err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const results = memes.filter((meme) =>
      meme.name.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Meme Search</h1>

      <div className="w-full max-w-md flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search meme (e.g. Drake, Doge, Distracted Boyfriend)"
          className="w-full px-3 py-2 text-gray-700 rounded-full focus:outline-none"
        />
        <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition">
          🔍
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.length > 0 ? (
          filtered.map((meme) => (
            <div
              key={meme.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 cursor-pointer overflow-hidden"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-center">
                <h2 className="text-sm font-semibold text-gray-700">
                  {meme.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg col-span-full">
            No memes found 😢
          </p>
        )}
      </div>
    </div>
  );
}


export default App;

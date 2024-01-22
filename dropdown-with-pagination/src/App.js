import "./App.css";
import { useState, useEffect } from "react";

const API_URL = "https://catfact.ninja/breeds";

export default function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=${limit}`);
      const responseData = await response.json();

      if (Array.isArray(responseData.data)) {
        setData((prevData) => [...prevData, ...responseData.data]);
        setLimit((prevLimit) => Math.ceil(prevLimit * 1.5)); // Update limit by multiplying with 1.5
        setHasMore(responseData.data.length > 0);
      } else {
        console.error("Invalid API response:", responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const dropdown = document.getElementById("dropdown");
    if (
      dropdown &&
      dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight
    ) {
      if (loading || !hasMore) return;
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>React Dropdown with Pagination</h1>
      <div
        id="dropdown"
        style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc" }}
        onScroll={handleScroll}
      >
        {data?.map((item, index) => (
          <div
            key={index}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
            {item.breed}
          </div>
        ))}
        {loading && <p>Loading...</p>}
        {!loading && !hasMore && <p>No more data</p>}
      </div>
    </div>
  );
}

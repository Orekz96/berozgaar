// src/components/Jobs/JobSearch.js
import { useState } from "react";
import axios from "axios";

const token = "******";

const JobSearch = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    keyword: "",
    location: "",
    jobType: "full-time", // full-time, part-time, etc.
  });
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://job-board-api-production.up.railway.app/api/v1/#/search",
        {
          params: searchCriteria,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="keyword"
          value={searchCriteria.keyword}
          onChange={handleInputChange}
          placeholder="Keyword"
        />
        <input
          type="text"
          name="location"
          value={searchCriteria.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <select
          name="jobType"
          value={searchCriteria.jobType}
          onChange={handleInputChange}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div>
        {results.map((job) => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;

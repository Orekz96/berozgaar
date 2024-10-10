// src/components/Jobs/JobList.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { fetchJobListings } from "../../services/jobBoardApi";
import axios from "axios";

const token = "******";

const JobList = () => {
  const [jobs, setJobs] = useState({});

  useEffect(() => {
    axios
      .get("https://job-board-api-production.up.railway.app/api/v1/#/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setJobs(response.data);
      })

      .catch((error) => console.error("Error fetching jobs: ", error));
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <Link to={`/job-listing/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;

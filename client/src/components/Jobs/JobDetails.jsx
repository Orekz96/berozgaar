// src/components/Jobs/JobDetails.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { fetchJobById } from "../../services/jobBoardApi";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const response = await fetchJobById();
      setJob(response.data);
    };
    fetchJobDetails();
  }, [id]);

  return (
    <div>
      {job && (
        <>
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          {/* Add a button to apply for this job */}
        </>
      )}
    </div>
  );
};

export default JobDetails;

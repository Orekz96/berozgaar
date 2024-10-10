// src/components/Jobs/JobApplicationForm.js
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobApplicationForm = () => {
  const { id } = useParams(); // Job ID from URL
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setApplicationData({ ...applicationData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coverLetter", applicationData.coverLetter);
    formData.append("resume", applicationData.resume);

    try {
      await axios.post(
        `https://job-board-api-production.up.railway.app/api/v1/#/jobs/${id}/apply`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Application submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="coverLetter"
        placeholder="Cover Letter"
        value={applicationData.coverLetter}
        onChange={handleInputChange}
      />
      <input type="file" name="resume" onChange={handleFileChange} />
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default JobApplicationForm;

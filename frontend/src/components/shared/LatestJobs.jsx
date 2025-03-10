import React from "react";
import LatestJobCard from "../subComponents/LatestJobCard";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LatestJobs = () => {
  const { jobs } = useSelector((store) => store.jobs);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {jobs <= 0 ? (
          <span>No jobs available</span>
        ) : (
          jobs
            .slice(0, 3)
            .map((item) => <LatestJobCard key={item._id} job={item} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;

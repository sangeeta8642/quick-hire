import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./subComponents/Job";
import useGetJobs from "@/hooks/useGetJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

// const Jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Browse = () => {
  useGetJobs();
  const { jobs } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results({jobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => <Job key={job?._id} job={job} />)
          ) : (
            <span>No jobs found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;

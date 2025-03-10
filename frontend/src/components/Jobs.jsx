import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./subComponents/FilterCard";
import Job from "./subComponents/Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
// const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  const { jobs, searchedQuery } = useSelector((store) => store.jobs);
  const [filterJobs, setFilterJobs] = useState(jobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = jobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.salary.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(jobs);
    }
  }, [jobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className=" mx-auto mt-5">
        <div className="flex  ">
          <div className="w-[23%]">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 p-10">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  { filterType: "Location", array: ["delhi", "mumbai", "pune"] },
  {
    filterType: "Industry",
    array: [
      "frontend development",
      "backend development",
      "full stack web development",
    ],
  },
  { filterType: "salary", array: ["0-40k", "42k-1L", "1L-5L"] },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const { jobs } = useSelector((store) => store.jobs);
  const Locations = [...new Set(jobs.map((job) => job.location))];
  const Indutries = [...new Set(jobs.map((job) => job.title))];

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
   dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  const getSalaryRangeInLPA = (salary) => {
    // Convert salary from INR to LPA (1 Lakh = 100000)
    const salaryInLPA = parseInt(salary, 10) / 100000;

    // Define LPA ranges
    if (salaryInLPA <= 2) return "0 - 2 LPA";
    if (salaryInLPA <= 4) return "2.01 - 4 LPA";
    if (salaryInLPA <= 6) return "4.01 - 6 LPA";
    return "6.01 - 8 LPA";
  };

  const SalaryRanges = [
    ...new Set(jobs.map((job) => getSalaryRangeInLPA(job.salary))),
  ];

  return (
    <div className="p-5 pl-20 w-full bg-white rounded-md capitalize">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Filter Jobs</h1>
        {selectedValue !== "" && (
          <p
            onClick={() => setSelectedValue("")}
            className="text-sm font-medium text-slate-600
            cursor-pointer hover:underline hover:text-blue-700"
          >
            Clear Filter
          </p>
        )}
      </div>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {/* {filterData.map((data, index) => ( */}
        <div>
          <h1 className="text-lg font-bold ">Location :</h1>
          {Locations.length > 0 ? (
            Locations.map((job) => {
              // const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={job} id={job} />
                  <Label htmlFor={job}>{job}</Label>
                </div>
              );
            })
          ) : (
            <span>No jobs found</span>
          )}
        </div>
        <div>
          <h1 className="text-lg font-bold ">Industies :</h1>
          {Indutries.length > 0 ? (
            Indutries.map((job) => {
              // const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={job} id={job} />
                  <Label htmlFor={job}>{job}</Label>
                </div>
              );
            })
          ) : (
            <span>No jobs found</span>
          )}
        </div>
        <div>
          <h1 className="text-lg font-bold ">Location :</h1>
          {SalaryRanges.length > 0 ? (
            SalaryRanges.map((job) => {
              // const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={job} id={job} />
                  <Label htmlFor={job}>{job}</Label>
                </div>
              );
            })
          ) : (
            <span>No jobs found</span>
          )}
        </div>
        {/* ))} */}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

import React, { useState } from "react";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetJobs from "@/hooks/useGetJobs";

const HeroSection = () => {
  // useGetJobs()
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const searchQuery = () => {
    dispatch(setSearchedQuery(query));
    nav("/explore")
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#fa3002] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold capitalize">
          search, apply & <br /> get your{" "}
          <span className="text-[#6a38c2]">dream job</span>
        </h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          suscipit quis voluptas. Dolor, quia.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
            placeholder="Search the job you want"
          />
          <Button
            onClick={searchQuery}
            className="rounded-r-full bg-[#6a38c2] "
          >
            <SearchIcon className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

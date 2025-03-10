import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CompaniesTable from "./components/companiesTable";
import { useNavigate } from "react-router-dom";
import useGetCompanies from "@/hooks/useGetCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import JobsTable from "./components/jobsTable";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const Jobs = () => {
  
  useGetAdminJobs()
  const nav = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => nav("/admin/jobs/add")}>New Job</Button>
        </div>
        <JobsTable />
      </div>
    </div>
  );
};

export default Jobs;

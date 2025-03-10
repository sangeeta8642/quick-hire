import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";
import { setAJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDetails = () => {
  const param = useParams();
  const jobId = param.id;
  const { job } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);
  const initiallyApplied =
    job?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(initiallyApplied);
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleApplyJob = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.message) {
        fetchAJobs()
        dispatch(setAJob(res.data.job));
        toast.success("Job applied successfully");
      }
    } catch (error) {
      toast.error("Please login to apply job");
      nav("/login")
    }
  };

  useEffect(() => {
    fetchAJobs();
  }, [dispatch, jobId, user?._id]);

  const fetchAJobs = async () => {
    try {
      const job = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (job.data.success) {
        setIsApplied(job.data.job.applications.some((application) => application.applicant === user?._id )
        );
        dispatch(setAJob(job.data.job));
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-bold text-xl capitalize">{job?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {job?.position} Positions
            </Badge>
            <Badge
              className={"text-[#f83002] font-bold capitalize "}
              variant="ghost"
            >
              {job?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {job?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : handleApplyJob}
          disabled={isApplied}
          className={`rounded-lg capitalize ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#a54ce0]"
          }`}
        >
          {isApplied ? "Already applied" : "apply now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4"></h1>
      <div className="capitalize my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">{job?.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {job?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.experienceLevel}yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          total applications:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          posted at:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDetails;

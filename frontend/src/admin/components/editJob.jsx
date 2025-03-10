import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetJob from "@/hooks/useGetJob";
// import useGetJobById from "@/hooks/useGetJobById"; // A hook to fetch job by ID (similar to company)
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDetails = async () => {
  // const params = useParams();
  const params =useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    fetchAJobs();
  }, [dispatch, params.id]);

  const fetchAJobs = async () => {
    try {
      const job = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
        withCredentials: true,
      });
      if (job.data.success) {
        dispatch(setAJob(job.data.job));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { job } = useSelector((store) => store.jobs);
  
  const [input, setInput] = useState({
    title: job.title || "",
    description: job.description || "",
    requirements: job.requirements?.join(", ") || "", // Join requirements array into a comma-separated string
    salary: job.salary || "",
    location: job.location || "",
    jobType: job.jobType || "",
    experienceLevel: job.experienceLevel || "",
    position: job.position || "",
  });

  // useEffect(() => {
  //   setInput({
  //     title: job.title || "",
  //     description: job.description || "",
  //     requirements: job.requirements?.join(", ") || "",
  //     salary: job.salary || "",
  //     location: job.location || "",
  //     jobType: job.jobType || "",
  //     experienceLevel: job.experienceLevel || "",
  //     position: job.position || "",
  //   });
  // }, [job]);

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJob = {
      ...input,
      requirements: input.requirements.split(",").map((req) => req.trim()), // Convert string back to array
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        updatedJob,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              onClick={() => nav("/admin/jobs")}
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Job Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Requirements (comma separated)</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {loading ? (
            <Button
              type="submit"
              className="w-full my-4 bg-gray-900 text-white"
            >
              <Loader2 className="mr-2 size-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-gray-900 text-white"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobDetails;

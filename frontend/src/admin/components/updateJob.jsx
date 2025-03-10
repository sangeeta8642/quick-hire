import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/shared/Navbar";

const UpdateJob = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { job } = useSelector((store) => store.jobs);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    company: "",
  });

  useEffect(() => {
    fetchJob();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (job) {
      setInput({
        title: job.title || "",
        description: job.description || "",
        requirements: job.requirements?.join(", ") || "",
        salary: job.salary || "",
        location: job.location || "",
        jobType: job.jobType || "",
        experienceLevel: job.experienceLevel || "",
        position: job.position || "",
        company: job.company || "",
      });
    }
  }, [job]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setAJob(response.data.job));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJob = {
      ...input,
      requirements: input.requirements.split(",").map((req) => req.trim()),
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
        nav('/admin/jobs')
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <Button
          variant="outline"
          onClick={() => nav("/admin/jobs")}
          className="flex items-center gap-2 text-gray-500 font-semibold"
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 p-8">
            <h1 className="font-bold text-xl">Update Job</h1>
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
          <Button
            type="submit"
            className="w-full my-4 bg-gray-900 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;

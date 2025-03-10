import { setAdminJobs, setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const jobs = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (jobs.data.success) {
          dispatch(setAdminJobs(jobs.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAdminJobs;

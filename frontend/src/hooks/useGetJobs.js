import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.jobs)

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const jobs = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
          withCredentials: true,
        });
        if (jobs.data.success) {
          dispatch(setAllJobs(jobs.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
};

export default useGetJobs;

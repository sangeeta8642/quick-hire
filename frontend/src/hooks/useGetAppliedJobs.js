import { setAdminJobs, setAllJobs, setAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const applications = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                if (applications.data.success) {
                    dispatch(setAppliedJobs(applications.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;

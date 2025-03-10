import { setAJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetJob = (jobid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAJobs = async () => {
      try {
        const job = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`, {
          withCredentials: true,
        });
        if (job.data.success) {
          dispatch(setAJob(job.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAJobs();
  }, [dispatch,jobid]);
}

export default useGetJob
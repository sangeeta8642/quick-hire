import Navbar from "@/components/shared/Navbar";
import React, { useEffect } from "react";
import ApplicantsTable from "./components/applicantsTable";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";

const Applications = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.applications);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: TrendingUp }
        );
         dispatch(setApplicants(res.data.job));
        } catch (error) {
        console.log(error);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applications;

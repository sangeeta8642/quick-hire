import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const companies = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (companies.data.success) {
          dispatch(setCompanies(companies.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetCompanies;

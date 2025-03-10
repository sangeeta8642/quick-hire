import { setCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchACompany = async () => {
      try {
        const company = await axios.get(`${COMPANY_API_END_POINT}/get/${companyid}`, {
          withCredentials: true,
        });
        if (company.data.success) {
          dispatch(setCompany(company.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchACompany();
  }, [dispatch,companyid]);
}

export default useGetCompanyById
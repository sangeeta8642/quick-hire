import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCompany = () => {
  const nav = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerComapny = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: "application/json",
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setCompany(res.data.company));
        toast.success(res.data.success);
        const companyId = res?.data?.company?._id;
        nav(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl capitalize">Your company name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change it
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Google etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => nav("/admin/companies")}>
            Cancel
          </Button>
          <Button onClick={registerComapny}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;

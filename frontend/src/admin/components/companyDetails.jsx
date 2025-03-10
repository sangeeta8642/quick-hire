import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanyDetails = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const { company } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: company.name || "",
    description: company.description || "",
    website: company.website || "",
    location: company.location || "",
    file: company.logo || null,
  });
  // const nav = 

useEffect(()=>{
  setInput({
    name: company.name || "",
    description: company.description || "",
    website: company.website || "",
    location: company.location || "",
    file: company.logo || null,
  })
},[company])


  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        nav('/admin/companies')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              onClick={() => nav("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
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
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
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
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
          {/* <Button type="submit" className="w-full mt-8">
            Update
          </Button> */}
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

export default CompanyDetails;

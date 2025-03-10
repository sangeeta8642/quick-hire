import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);

  const changeEventHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(USER_API_END_POINT + "/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        nav("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 "
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <p className="text-sm font-medium text-red-600">Fields marked with * are required</p>
          <div className="my-2">
            <Label>Full name <span className="text-red-600">*</span></Label>
            <Input
              type="text"
              placeholder="John"
              value={input.fullname}
              onChange={changeEventHandle}
              name="fullname"
            />
          </div>
          <div className="my-2">
            <Label>Email <span className="text-red-600">*</span></Label>
            <Input
              type="email"
              placeholder="John@gmail.com"
              value={input.email}
              onChange={changeEventHandle}
              name="email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number <span className="text-red-600">*</span></Label>
            <Input
              type="text"
              placeholder="+91"
              value={input.phoneNumber}
              onChange={changeEventHandle}
              name="phoneNumber"
            />
          </div>
          <div className="my-2">
            <Label>Password <span className="text-red-600">*</span></Label>
            <Input
              type="password"
              placeholder="John@123"
              value={input.password}
              onChange={changeEventHandle}
              name="password"
            />
          </div>
          <div className="flex flex-col  justify-between">
          <Label>Role <span className="text-red-600">*</span></Label>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  id="r1"
                  type="radio"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandle}
                  name="role"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="r2"
                  type="radio"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandle}
                  name="role"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile<span className="text-red-600">*</span></Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                name={input.file}
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button type="submit" className="w-full my-4">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

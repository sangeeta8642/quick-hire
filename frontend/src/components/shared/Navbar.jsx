import { LogOutIcon, User, User2 } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  // const user = true;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios.get(USER_API_END_POINT + "/logout", {
        withCredentials: true,
      });
      dispatch(setUser(null));
      nav("/");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Quick<span className="text-[#f83002]">Hire</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                {" "}
                {/* <li>
                <Link to="/">Home</Link>
              </li> */}
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/explore">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-5">
              <Link to="/login">
                {" "}
                <Button variant="outline" className="">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6a3bc2] hover:bg-[#512a9b] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                {user?.profile?.profilePhoto ? (
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "data:image/jpeg;base64,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"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                ) : (
                  <User2 className="size-8 rounded-full cursor-pointer border-2 border-black" />
                )}
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2 items-center">
                    {user?.profile?.profilePhoto ? (
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto ||
                            "data:image/jpeg;base64,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"
                          }
                          alt="@shadcn"
                        />
                      </Avatar>
                    ) : (
                      <User2 className="size-8 rounded-full cursor-pointer border-2 border-black" />
                    )}
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User />
                        <Button variant="link">
                          <Link to="/user/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOutIcon />
                      <Button variant="link" onClick={handleLogOut}>
                        LogOut
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

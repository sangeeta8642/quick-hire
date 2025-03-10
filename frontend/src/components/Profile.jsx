import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTables from "./subComponents/AppliedJobsTables";
import UpdateProfileDialog from "./subComponents/UpdateUserProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["html", "css", "javascript"];
// const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border-x-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-24">
              <AvatarImage
                className="outline-none border-none"
                src={user?.profile?.profilePhoto || "data:image/jpeg;base64,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" } 
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-md font-bold">Skills</h1>
          <div className="flex items-center gap-1 capitalize">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills?.map((skill) => <Badge>{skill}</Badge>)
            ) : (
              <span>Not provided</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              className="text-blue-500 w-full hover:underline cursor-pointer"
              href={user?.profile?.resume}
              target="blank"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Not uploaded</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-xl my-5">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobsTables />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

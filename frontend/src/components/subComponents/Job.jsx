import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  // const jobId = "abcdefghiklmn";
  const nav = useNavigate();

  const timeDiff = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currentTime = new Date();
    let diff = currentTime - createdAt;
    diff = Math.floor(diff / (1000 * 24 * 60 * 60));
    if (diff === 0) {
      return "Today";
    }

    if (diff >= 7) {
      diff = Math.floor(diff / 7);
      // diff=1
      if (diff >= 1) {
        return `${diff} week ago`;
      }
      return `${diff} weeks ago`;
    }
    // else {
    return `${diff} days ago`;
    // }
  };

  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100"
      
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{timeDiff(job?.createdAt)}</p>
        <Button className="rounded-full" variant="outline" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button
          className="outline-none border-none p-6"
          variant="outline"
          size="icon"
        >
          <Avatar className="outline-none border-none">
            <AvatarImage
              className="outline-none border-none"
              src={
                job?.company.logo
                  ? job?.company.logo
                  : "https://i.pinimg.com/564x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
              }
            />
          </Avatar>
        </Button>
        <div className="">
          <h1 className="font-medium text-lg capitalize">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500 capitalize">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 capitalize">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => nav(`/job/details/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;

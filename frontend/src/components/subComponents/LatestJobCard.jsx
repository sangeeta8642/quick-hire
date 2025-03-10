import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({job}) => {  

  const nav = useNavigate()

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100 cursor-pointer capitalize" onClick={() => nav(`/job/details/${job._id}`)}>
      <div className="">
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div className="">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">
          {job?.description}
        </p>
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
    </div>
  );
};

export default LatestJobCard;

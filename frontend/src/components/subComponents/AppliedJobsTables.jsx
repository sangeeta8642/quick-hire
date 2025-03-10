import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTables = () => {
  const { appliedJobs } = useSelector((store) => store.jobs);
  
  return (
    <Table className="capitalize">
      <TableCaption>Your appliacations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>job role</TableHead>
          <TableHead>company</TableHead>
          <TableHead className="text-right">status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appliedJobs?.length <= 0 ? (
          <span>You haven't applied any job yet.</span>
        ) : (
          appliedJobs.map((job) => (
            <TableRow key={job?._id}>
              <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{job?.job?.title}</TableCell>
              <TableCell>{job?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`text-right ${
                    job?.status === "rejected"
                      ? "bg-red-600"
                      : job.status === "pending"
                      ? "bg-gray-600"
                      : "bg-green-600"
                  }`}
                >
                  {job.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AppliedJobsTables;

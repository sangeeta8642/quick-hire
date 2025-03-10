import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-select";
import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobsTable = () => {
  // const { companies, searchCompanyByText } = useSelector(
  //   (store) => store.company
  // );
  const { adminJobs, searchJobByText } = useSelector((store) => store.jobs);
  const [filterJobs, setFilterJobs] = useState(adminJobs);
  const nav = useNavigate();

  useEffect(() => {
    const filteredJObs =
      adminJobs.length >= 0 &&
      adminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJObs);
  }, [adminJobs, searchJobByText]);

  const deleteJob = (jobId) => {
    console.log(jobId);
  };

  return (
    <div>
      <Table className="capitalize">
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {filterJobs.length <= 0 ? (
          <span>No jobs found</span>
        ) : (
          <>
            {filterJobs.map((job) => (
              <TableBody key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell className="capitalize">{job?.title}</TableCell>
                <TableCell className="capitalize">{job?.name}</TableCell>
                <TableCell className="text-left">
                  {job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => nav(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="size-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          nav(`/admin/jobs/${job?._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Eye className="size-4" />
                        <span>Applicants</span>
                      </div>
                      <div
                        onClick={
                          () => deleteJob(job?._id)
                          // nav(`/admin/jobs/${job?._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Trash className="size-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableBody>
            ))}
          </>
        )}
      </Table>
    </div>
  );
};

export default JobsTable;

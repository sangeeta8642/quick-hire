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
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const shortLinstingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applications);

  const udateStatus = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      // const res = await axios.post(
      //   `${APPLICATION_API_END_POINT}/status/${id}/update`,
      //   { status }
      // );
      // const res = await axios.post(
      //   `${APPLICATION_API_END_POINT}/status/${id}/update`,
      //   { status },
      //   { withCredentials: true }
      // );
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper headers
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {applicants?.applications?.length>0 ? (
        <Table>
          <TableCaption>List of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.map((application) => (
              <tr key={application._id}>
                <TableCell>{application.applicant.fullname}</TableCell>
                <TableCell>{application.applicant.email}</TableCell>
                <TableCell>{application.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {application.applicant.profile.resumeOriginalName ? (
                    <a
                      className="text-blue-700 font-semibold hover:underline"
                      href={application.applicant.profile.resume}
                      target="_blank"
                    >
                      {application.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {application.applicant.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      {shortLinstingStatus.map((status) => (
                        <div
                          className="cursor-pointer"
                          onClick={() => udateStatus(status, application._id)}
                          key={status}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      ) : (
        <span>No applications found</span>
      )}
    </div>
  );
};

export default ApplicantsTable;

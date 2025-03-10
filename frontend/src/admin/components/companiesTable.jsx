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
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const nav = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registerd companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        {filterCompany.length <= 0 ? (
          <span>No companies found</span>
        ) : (
          <>
            {filterCompany.map((company) => (
              <TableBody key={company._id}>
                <TableCell>
                  <Avatar>
                    {/* <AvatarImage src="https://imgs.search.brave.com/3h9jnlulhswXUtOIklUB9bDBQ6989k_8E4giJkEgbKI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzMwLzE2LzA3/LzM2MF9GXzgzMDE2/MDc4MF9wODdiZkQ1/TFNUMlJuRFNMSXN3/c25XM095VjJFZnNE/Wi5qcGc" /> */}
                    <AvatarImage
                      src={
                        company?.logo ||
                        "https://i.pinimg.com/564x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="capitalize">{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => nav(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="size-4" />
                        <span>Edit</span>
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

export default CompaniesTable;

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import useGetJobs from "@/hooks/useGetJobs";

const caterogies = [
  "frontend development",
  "backend development",
  // "full stack web development",
  "graphic designing",
  "frontend development",
  "backend development",
  // "full stack web development",
  "graphic designing",
  "frontend development",
  "backend development",
  // "full stack web development",
  "graphic designing",
];

const CategorySection = () => {
  // useGetJobs()
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobs } = useSelector((store) => store.jobs);


  const searchQuery = (query) => {
    dispatch(setSearchedQuery(query));
    nav("/explore");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-14">
        <CarouselContent>
          {jobs.length>0?jobs.map((cat,i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => searchQuery(cat.title)}
                variant="outline"
                className="rounded-full capitalize"
              >
                {cat.title}
              </Button>
            </CarouselItem>
          )):(
            <span>No jobs found</span>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategorySection;

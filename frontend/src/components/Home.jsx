import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./shared/HeroSection";
import CategorySection from "./shared/CategorySection";
import LatestJobs from "./shared/LatestJobs";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import useGetJobs from "@/hooks/useGetJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetJobs();
  const { user } = useSelector((store) => store.auth);
  const nav = useNavigate();
  useEffect(() => {
    if (user && user.role === "recruiter") {
      nav("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;

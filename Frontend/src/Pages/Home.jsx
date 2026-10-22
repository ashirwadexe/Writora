import { useContext, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import Hero from "../Components/Home/Hero";
import BlogSection from "../Components/Home/BlogSection";
import ExploreCategories from "../Components/Home/ExploreCategories";
import Footer from "../Components/Layout/Footer";
import WriterCTA from "../Components/Home/WritoraCTA";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // Search input box ki current value
  const [searchQuery, setSearchQuery] = useState("");
  // Sirf submit ki gayi search ko apply karenge
  const [appliedSearch, setAppliedSearch] = useState("");
  // Pagination kis page par hai
  const [currentPage, setCurrentPage] = useState(1);
  // state to handle the active topic in search box
  const [activeTopic, setActiveTopic] = useState("");

  // Search submit hone par
  const handleSearch = (query) => {
    setAppliedSearch(query.trim());
    setCurrentPage(1);
  };

  return (
    <div>
      <Navbar />

      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        onSearch={handleSearch}
      />

      <BlogSection
        search={appliedSearch}
        page={currentPage}
        onPageChange={setCurrentPage}
      />

      <WriterCTA isAuthenticated={isAuthenticated} />

      <Footer />
    </div>
  );
};

export default Home;

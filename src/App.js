import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import Benefit from "./components/Benefit";
import Preparation from "./components/Preparation";
import Whychooseus from "./components/Whychooseus";
import Trainer from "./components/Trainer";
import Testimonial from "./components/Testimonial";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Training from "./components/Training"; // Training page
import MockExam from "./components/MockExam"; // Mock exam page
import About from "./components/About"; // About us page
import Blogs from "./components/Blogs"; // Blogs page


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar will be visible on all pages */}
        <Navbar />

        {/* Routes for all pages */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Banner />
                <Benefit />
                <Preparation />
                <Whychooseus />
                <Trainer />
                <Testimonial />
                <FAQ />
                <Contact />
              </>
            }
          />

          {/* Individual Pages */}
          <Route path="/training" element={<Training />} />
          <Route path="/mock-exam" element={<MockExam />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />

          {/* Catch-All Redirect */}
          <Route path="*" element={<Hero />} /> {/* Invalid route goes to home */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Hackathon from "./pages/Hackathon";
import AllOngoingHackathon from "./pages/AllOngoingHackathon";
import AllClosedHackathon from "./pages/AllClosedHackathon";
import AllUpcomingHackathon from "./pages/AllUpcomingHackathon";
import Error404 from "./pages/Error404";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/About";
import Projects from "./pages/Projects";
import SignUpForm from "./pages/SignUpForm";
import { ToastContainer } from "react-toastify";
import Button from "./components/Button";
import HackathonDetails from "./pages/HackathonDetails";
import Guides from "./components/Guides";
import Mentors from "./pages/Mentors";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hackathon" element={<Hackathon />} />
        <Route path="/hackathon/:id" element={<HackathonDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<SignUpForm />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/ongoing-hackathons" element={<AllOngoingHackathon />} />
        <Route path="/closed-hackathons" element={<AllClosedHackathon />} />
        <Route path="/upcoming-hackathons" element={<AllUpcomingHackathon />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Button />
      <Footer />
    </>
  );
};
export default App;

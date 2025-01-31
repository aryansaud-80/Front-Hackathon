import axios from 'axios';
import { use } from 'react';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [hackathon, setHackathon] = useState([]);
  const [closedHackathons, setClosedHackathons] = useState([]);
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [openHackathons, setOpenHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalLikes, setTotalLikes] = useState({
    like1: 0,
    like2: 0,
    like3: 0,
    like4: 0,
    like5: 0,
  });
  const [totalDislikes, setTotalDislikes] = useState({
    dislike1: 0,
    dislike2: 0,
    dislike3: 0,
    dislike4: 0,
    dislike5: 0,
  });

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likes'));
    const dislikes = JSON.parse(localStorage.getItem('dislikes'));

    if (likes && dislikes) {
      setTotalLikes(likes);
      setTotalDislikes(dislikes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(totalLikes));
    localStorage.setItem('dislikes', JSON.stringify(totalDislikes));
  }, [totalLikes, totalDislikes]);

  useEffect(() => {
    const currentDate = new Date();

    const filterHackathon = hackathon.filter((data) => {
      return data.status === 'closed';
    });

    setClosedHackathons(filterHackathon);
  }, [hackathon]);

  useEffect(() => {
    const currentDate = new Date(); // Get the current date and time

    const filterUpcomingHackathons = hackathon.filter((data) => {
      // Ensure the startDate is after the current date
      return data.status === 'upcoming';
    });

    setUpcomingHackathons(filterUpcomingHackathons);

    // Log filtered upcoming hackathons for debugging
    // console.log(filterUpcomingHackathons);
  }, [hackathon]);

  useEffect(() => {
    const currentDate = new Date(); // Get current date and time

    const filterHackathon = hackathon.filter((data) => data.status === 'open');

    setOpenHackathons(filterHackathon);

    // To confirm filtering happens correctly
    // console.log(filterHackathon); // Log filtered hackathons directly
  }, [hackathon]);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        setLoading(true);
        axios.withCredentials = true;
        const { data } = await axios.get(`${BACKEND_URL}/api/user/hackathon`);

        if (data.success) {
          setHackathon(data.hackathons);
          setLoading(false);
          // toast.success('Hackathon fetched successfully');
        } else {
          toast.error('Failed to fetch hackathon');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching hackathon', error);
        toast.error('Failed to fetch hackathon');
        setLoading(false);
      }
    };

    fetchHackathon();
  }, []);

  const value = {
    BACKEND_URL,
    hackathon,
    setHackathon,
    closedHackathons,
    openHackathons,
    upcomingHackathons,
    loading,
    setLoading,
    totalLikes,
    totalDislikes,
    setTotalLikes,
    setTotalDislikes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };

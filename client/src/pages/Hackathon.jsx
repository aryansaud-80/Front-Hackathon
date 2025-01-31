import FinishedHackathon from '../components/FinishedHackathon';
import OngoingHackathon from '../components/OngoingHackathon';
import UpcomingHackathon from '../components/UpcomingHackathon';

const Hackathon = () => {
  return (
    <div className='flex flex-col gap-6 bg-gray-900 '>
      <OngoingHackathon />
      <UpcomingHackathon />
      <FinishedHackathon />
    </div>
  );
};
export default Hackathon;

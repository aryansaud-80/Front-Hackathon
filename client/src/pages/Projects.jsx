import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { projectImages } from '../assets/assets';
import Like from '../components/Like';
import DisLike from '../components/DisLike';
import Loader from '../components/Loader';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const {
    BACKEND_URL,
    loading,
    setLoading,
    totalLikes,
    totalDislikes,
    setTotalDislikes,
    setTotalLikes,
  } = useContext(AppContext);
  const [isLike, setIsLikes] = useState('');
  const [isDislike, setIsDislikes] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/api/user/hackathon/projects`
        );

        if (data.success) {
          setProjects(data.projects);
          setLoading(false);
        } else {
          toast.error('Failed to fetch projects');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching projects', error);
        toast.error('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLike = async (id, value) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/hackathon/vote/${id}`,
        { value }
      );

      if (data && value === 'like') {
        toast.success('Project liked');
        setIsLikes('like');
      } else if (data && value === 'dislike') {
        toast.success('Project disliked');
        setIsDislikes('dislike');
      } else {
        toast.error(`Failed to ${value} project`);
      }
    } catch (error) {
      toast.error(`Failed to ${value} project`);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='mx-auto p-6 bg-gray-700'>
          <h2 className='text-3xl font-bold text-center mb-6'>
            Hackathon Projects
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white'>
            {projects.map((project, idx) => (
              <div
                key={project._id}
                className='p-6 border border-gray-800 rounded-lg bg-gray-800'
              >
                <img
                  src={projectImages[`project${(idx % 4) + 1}`]}
                  alt={project.name}
                  className='w-full h-40 object-cover rounded-md mb-4 shadow-md'
                />
                <h3 className='text-xl font-semibold mb-2'>{project.name}</h3>
                <p className='mb-3'>
                  <strong>Description:</strong> {project.description || 'N/A'}
                </p>
                <p className=' mb-3'>
                  <strong>Technologies:</strong>{' '}
                  {project.technologies?.length > 0
                    ? project.technologies.map((tech, idx) => {
                        return <span key={idx}>{tech}</span>;
                      })
                    : 'NA'}
                </p>

                <div className='flex justify-between items-center'>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:underline'
                    >
                      Visit Project
                    </a>
                  )}

                  <div className='flex gap-6'>
                    {/* Like Button */}
                    <button
                      className={`flex items-center gap-2 text-white cursor-pointer`}
                      onClick={() => {
                        handleLike(project._id, 'like');
                        setTotalLikes((prev) => ({
                          ...prev,
                          [project._id]: (prev[project._id] || 0) + 1,
                        }));
                      }}
                    >
                      <p>{totalLikes[project._id] || 0}</p>
                      <Like
                        className={`${isLike === 'like' ? 'text-red-400' : ''}`}
                      />
                    </button>

                    {/* Dislike Button */}
                    <button
                      className={`flex items-center gap-2 text-white cursor-pointer ${
                        isDislike === 'dislike' ? 'text-red-500' : ''
                      }`}
                      onClick={() => {
                        handleLike(project._id, 'dislike');
                        setTotalDislikes((prev) => ({
                          ...prev,
                          [project._id]: (prev[project._id] || 0) + 1,
                        }));
                      }}
                    >
                      <p>{totalDislikes[project._id] || 0}</p>
                      <DisLike />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;

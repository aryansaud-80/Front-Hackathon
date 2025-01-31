import { useState } from 'react';
import { motion } from 'framer-motion';
import SelfLearning from './SelfLearning';

const roadmaps = {
  Beginner: [
    {
      title: 'Introduction to Hackathons & Rules',
      description:
        'Learn what hackathons are, their formats (online, offline, hybrid), and standard rules. Understand judging criteria, team structures, and timelines.',
    },
    {
      title: 'Understanding Problem Statements & Ideation',
      description:
        'Techniques for brainstorming innovative solutions based on a problem statement. How to validate ideas using market research and feasibility analysis.',
    },
    {
      title: 'GitHub & Version Control Basics',
      description:
        'Learn how to initialize repositories, commit changes, create branches, and collaborate using GitHub. Essential Git commands and workflows for teamwork.',
    },
    {
      title: 'Building MVPs & Basic Prototyping',
      description:
        'Understand Minimum Viable Products (MVPs) and their importance in hackathons. Use tools like Figma, Balsamiq, or Adobe XD to create quick UI/UX prototypes.',
    },
    {
      title: 'Introduction to Frontend & Backend Development',
      description:
        'Learn HTML, CSS, JavaScript for frontend, and basic backend with Node.js/Python. Understand how to connect frontend and backend with basic API calls.',
    },
    {
      title: 'Sample Project: Task Management App',
      description:
        'A simple task management application where users can add, edit, and delete tasks with a user-friendly UI.',
      techStack: 'React, Firebase, Tailwind CSS, GitHub for collaboration',
    },
  ],
  Intermediate: [
    {
      title: 'Team Collaboration & Project Management',
      description:
        'Use Agile methodologies and tools like Trello, Notion, or Jira for better collaboration. Effective communication strategies within a hackathon team.',
    },
    {
      title: 'API Integration & Authentication',
      description:
        'Learn to use external APIs (Google Maps, OpenAI, Twilio) to enhance projects. Implement authentication (OAuth, JWT, Firebase Auth) for secure login systems.',
    },
    {
      title: 'Advanced UI/UX Principles & Wireframing',
      description:
        'Improve user experience with good design principles, accessibility, and responsiveness. Wireframing advanced layouts using Figma or Adobe XD.',
    },
    {
      title: 'Database Management & Optimization',
      description:
        'Learn relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Firebase) databases. Optimize queries and indexing for better performance.',
    },
    {
      title: 'Hosting & Deployment Strategies',
      description:
        'Deploy web apps using Vercel, Netlify, or Firebase for frontend. Use Heroku, DigitalOcean, or AWS for backend hosting.',
    },
    {
      title: 'Sample Project: AI-Powered Chatbot',
      description:
        'A chatbot that helps users find relevant study materials or answer common questions using AI and NLP.',
      techStack: 'React, Node.js, MongoDB, OpenAI API, Tailwind CSS',
    },
  ],
  Advanced: [
    {
      title: 'Performance Optimization & Scalability',
      description:
        'Use caching (Redis, CDN) and database indexing for faster responses. Optimize frontend performance with lazy loading and code splitting.',
    },
    {
      title: 'AI/ML in Hackathons & Predictive Modeling',
      description:
        'Implement AI models (TensorFlow, OpenAI, Hugging Face) to enhance projects. Use machine learning for predictions, automation, and natural language processing.',
    },
    {
      title: 'Cybersecurity & Data Protection',
      description:
        'Implement best security practices: HTTPS, data encryption, and secure authentication. Protect APIs from attacks (rate limiting, bot protection, OWASP Top 10).',
    },
    {
      title: 'Monetization & Business Models',
      description:
        'Learn how to present your project as a viable startup idea. Implement monetization strategies like subscriptions, ads, or SaaS pricing models.',
    },
    {
      title: 'Contributing to Open Source & Networking',
      description:
        'Learn how to contribute to open-source projects via GitHub. Network with industry leaders and potential investors via LinkedIn, hackathon communities, and conferences.',
    },
    {
      title: 'Sample Project: AI-Powered Health Diagnosis',
      description:
        'An AI-driven platform that predicts diseases based on user symptoms and medical history.',
      techStack: 'React, Python (Flask/Django), TensorFlow, MongoDB, AWS',
    },
  ],
};

export default function Guides() {
  const [selected, setSelected] = useState('Beginner');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6'>
      <div className='flex gap-20 items-center mb-6'>
        <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent '>
          Hackathon Mastery Roadmap
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row'
      >
        <div className='w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-700'>
          <h2 className='text-xl font-bold text-purple-400 mb-4'>
            Roadmap Levels
          </h2>
          <ul className='space-y-3'>
            {Object.keys(roadmaps).map((level) => (
              <li
                key={level}
                onClick={() => setSelected(level)}
                className={`cursor-pointer p-3 rounded-md text-center md:text-left transition-all duration-300 ${
                  selected === level
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {level}
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full md:w-2/3 p-6'>
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className='text-2xl font-semibold text-purple-400 mb-4'>
              {selected} Level
            </h2>
            <ul className='list-disc pl-5 space-y-4 text-gray-300'>
              {roadmaps[selected].map((point, index) => (
                <li key={index}>
                  <strong>{point.title}:</strong> {point.description}
                  {point.techStack && (
                    <p className='text-sm text-gray-400 mt-1'>
                      <strong>Tech Stack:</strong> {point.techStack}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <SelfLearning />
    </div>
  );
}

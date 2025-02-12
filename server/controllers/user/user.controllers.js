import { create } from 'domain';
import Hackathon from '../../models/hackathon.models.js';
import Project from '../../models/project.models.js';

export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find({})
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 });

    console.log(hackathons);
    return res.json({
      success: true,
      hackathons,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const getHackathonsId = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id).populate(
      'organizer',
      'name email'
    );

    if (!hackathon) {
      return res.status(404).json({
        message: 'Hackathon not found.',
        success: false,
      });
    }

    return res.json({
      success: true,
      hackathon,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const applyHackathon = async (req, res) => {
  try {
    const { id } = req.params; // Hackathon ID
    const { userId } = req.body; // User applying for the hackathon

    // Find the hackathon by ID
    const findHackathon = await Hackathon.findById(id);

    // Check if hackathon exists
    if (!findHackathon) {
      return res.status(404).json({
        message: 'Hackathon not found',
        success: false,
      });
    }

    // Check if the user is already an applicant
    if (findHackathon.participants.includes(userId)) {
      return res.status(400).json({
        message: 'User has already applied for this hackathon',
        success: false,
      });
    }

    // Add the user to the applicants array
    await findHackathon.participants.push(userId);

    // Save the updated hackathon
    await findHackathon.save();

    return res.json({
      success: true,
      message: 'Successfully applied to the hackathon',
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message,
    });
  }
};

//Project

export const uploadProject = async (req, res) => {
  try {
    const { name, liveUrl, description, userId } = req.body;

    const project = new Project({
      name,
      liveUrl,
      description,
      user: userId,
    });

    await project.save();

    return res.json({
      success: true,
      message: 'Project uploaded successfully',
      project,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      error: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    console.log(projects);
    return res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error,
    });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await Project.find({ user: userId });

    return res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error,
    });
  }
};

export const deleteAllProjects = async (req, res) => {
  try {
    // Delete all documents from the collection
    await Project.deleteMany({});

    return res.json({
      success: true,
      message: 'All projects have been deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting all projects:', error);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const voteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { like, dislike } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (like) {
      project.likes += 1;
      await project.save();
      return res.status(200).json({
        message: 'Like registered successfully',
        likes: project.likes,
      });
    }

    project.dislikes += 1;
    await project.save();
    return res.status(200).json({
      message: 'Dislike registered successfully',
      data: [project.dislikes],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLike = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({
      message: 'Project likes fetched successfully',
      likes: project.likes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDislike = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({
      message: 'Project dislikes fetched successfully',
      dislikes: project.dislikes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

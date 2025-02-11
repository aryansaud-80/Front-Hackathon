// routes/admin.auth.routes.js
import express, { Router } from 'express';
const route = express.Router();

import authenticateToken from '../../middlewares/authenticateToken.js';
import {
  applyHackathon,
  deleteAllProjects,
  getAllProjects,
  getDislike,
  getHackathons,
  getHackathonsId,
  getLike,
  getUserProjects,
  uploadProject,
  voteProject,
} from '../../controllers/user/user.controllers.js';
import { registerHackathon } from '../../controllers/user/registrationHackathon.js';

route.post('/projects', uploadProject); // Specific project route
route.get('/projects', getAllProjects); // Specific project route
route.delete('/projects', deleteAllProjects); // Specific project route

route.get('/projects/:userId', getUserProjects); // Specific project route
route.post('/vote/:id', voteProject); // Voting route
route.get('/projects/like/:id', getLike);
route.get('/projects/dislike/:id', getDislike);

// Hackathon-related routes
route.get('/', getHackathons);
route.get('/:id', getHackathonsId);
route.post('/register', registerHackathon);

export default route;

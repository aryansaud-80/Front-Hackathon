// routes/admin.auth.routes.js
import express from 'express';
const route = express.Router();

import authenticateToken from '../../middlewares/authenticateToken.js';
import {
  createHackathon,
  deleteHackathon,
} from '../../controllers/admin/admin.hackathon.js';
import { getHackathons } from '../../controllers/user/user.controllers.js';

route.post('/',  createHackathon);
route.delete('/:id', authenticateToken, deleteHackathon);
route.get('/', authenticateToken, getHackathons);

export default route;

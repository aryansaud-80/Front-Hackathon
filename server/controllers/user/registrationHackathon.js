import Hackathon from '../../models/hackathon.models.js';
import hackathonReg from '../../models/hackathonReg.model.js';
import User from '../../models/user.models.js';

export const registerHackathon = async (req, res) => {
  try {
    const {
      hackathonName,
      phoneNumber,
      teamEmail,
      teamName,
      member1,
      member2,
      member3,
      member4,
      type,
    } = req.body;

    const members = [member1, member2, member3, member4];
    if (members.length > 4) {
      return res.json({
        success: false,
        message: 'Members should not exceed 4',
      });
    }

    const data = await hackathonReg.create({
      hackathon: hackathonName,
      teamname: teamName,
      phonenumber: phoneNumber,
      members,
      email: teamEmail,
      type,
    });
    return res.json({
      success: true,
      message: 'Successfully registered for the hackathon',
      data,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
      message: 'An error occurred while registering for the hackathon',
    });
  }
};

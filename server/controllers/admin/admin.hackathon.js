import Hackathon from '../../models/hackathon.models.js'; // Ensure proper path import
import moment from 'moment'; // Install via: npm install moment

export const createHackathon = async (req, res) => {
  try {
    const { name, description, startDate, endDate, prizes } = req.body;

    // Validate required fields
    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          'All fields (name, description, startDate, endDate ) are required.',
      });
    }

    // Parse dates from MM-DD-YY format
    const parsedStartDate = moment(startDate, 'YY-MM-DD').isValid()
      ? moment(startDate, 'YY-MM-DD').toDate()
      : null;
    const parsedEndDate = moment(endDate, 'YY-MM-DD').isValid()
      ? moment(endDate, 'YY-MM-DD').toDate()
      : null;

    if (!parsedStartDate || !parsedEndDate) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format for startDate or endDate.',
      });
    }

    // Ensure valid date range
    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: 'endDate must be after startDate.',
      });
    }

    const hackathon = new Hackathon({
      name,
      description,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      prizes,
      location: 'Shankhamul',
    });

    // Set hackathon status
    const currentTime = Date.now();
    if (currentTime > parsedEndDate) {
      hackathon.status = 'closed';
    } else if (currentTime >= parsedStartDate && currentTime <= parsedEndDate) {
      hackathon.status = 'open';
    } else {
      hackathon.status = 'upcoming';
    }

    await hackathon.save();
    return res.json({
      success: true,
      message: 'Hackathon created successfully.',
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

export const deleteHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Hackathon.findByIdAndDelete(id);

      return res.json({
        success: true,
        message: 'Hackathon deleted successfully.',
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'Hackathon not found',
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Server error.',
      success: false,
      error: error.message,
    });
  }
};

export const getAllHackathon = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().populate(
      'organizer',
      'name email'
    );

    if (!hackathons) {
      return res.json({
        success: false,
        message: 'No hackathons found',
      });
    }

    return res.json({
      success: true,
      hackathons,
    });
  } catch (err) {
    return res.json({
      error: err.message,
      message: 'Internal server error',
      success: false,
    });
  }
};

export const updateHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, prizes } = req.body;

    const parsedStartDate = moment(startDate, 'MM-DD-YY').toDate();
    const parsedEndDate = moment(endDate, 'MM-DD-YY').toDate();

    // Ensure valid date range
    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: 'endDate must be after startDate.',
      });
    }

    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found.',
      });
    }

    hackathon.name = name;
    hackathon.description = description;
    hackathon.startDate = parsedStartDate;
    hackathon.endDate = parsedEndDate;
    hackathon.prizes = prizes;

    // Set hackathon status
    const currentTime = Date.now();
    if (currentTime > parsedEndDate) {
      hackathon.status = 'closed';
    } else if (currentTime >= parsedStartDate && currentTime <= parsedEndDate) {
      hackathon.status = 'open';
    } else {
      hackathon.status = 'upcoming';
    }

    await hackathon.save();
    return res.json({
      success: true,
      message: 'Hackathon updated successfully.',
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

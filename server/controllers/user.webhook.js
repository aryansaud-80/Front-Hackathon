import { Webhook } from 'svix';
import User from '../models/user.models.js';

export const webhookController = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_SECRET_KEY);

    await wh.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { data, type: eventType } = req.body;

    switch (eventType) {
      case 'user.created': {
        const registeredUser = await User.create({
          id: data.id,
          email: data.email_addresses[0].email_address,
          name: (data.first_name || '') + ' ' + (data.last_name || ''),
        });
        res.status(201).json({
          success: true,
          message: 'User Created succesfully',
        });
      }
      case 'user.updated': {
        const updatedUser = await User.findByIdAndUpdate(data.id, {
          name: (data.first_name || '') + ' ' + (data.last_name || ''),
          email: data.email_addresses[0].email_address,
          updatedAt: new Date(data.updated_at),
        });

        res.status(200).json({
          success: true,
          message: 'User Updated succesfully',
        });
        break;
      }
      case 'user.deleted': {
        const deletedUser = await User.findByIdAndDelete(data.id);
        res.status(200).json({
          success: true,
          message: 'User deleted succesfully',
        });
        break;
      }

      case 'default':
        break;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

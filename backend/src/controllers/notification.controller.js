import notificationModel from "../models/notification.model.js";

// Create Notification
export const createNotification = async (req, res) => {
  try {
    const notification = await notificationModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Notification created",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({
        user: req.user._id,
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Notification Read
export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationModel.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

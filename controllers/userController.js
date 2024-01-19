const User = require("../models/UserModel");

const generateCustomerCode = async () => {
  try {
    // Fetch the latest customer code from the database
    const latestCustomer = await User.findOne(
      {},
      { customerCode: 1 },
      { sort: { _id: -1 } }
    );

    let latestCustomerCode = latestCustomer
      ? latestCustomer.customerCode
      : "999"; // Default value if no customer exists

    // Increment the customer code
    latestCustomerCode = parseInt(latestCustomerCode.substring(1)) + 1;

    // Create the new customer code
    const newCustomerCode = `E${latestCustomerCode}`;

    return newCustomerCode;
  } catch (error) {
    throw error;
  }
};

const userController = {
  createUser: async (req, res) => {
    try {
      const {
        userEmail,
        customerName,
        band,
        contact,
        address,
        city,
        state,
        country,
        superwiser_emp_code,
        emergency_contact,
      } = req.body;
      const customerCode = await generateCustomerCode();

      const newUser = new User({
        customerName,
        userEmail,
        customerCode,
        band,
        contact,
        address,
        city,
        state,
        country,
        superwiser_emp_code,
        emergency_contact,
        status: 1,
        role_id: 2,
      });

      await newUser.save();

      res.json({
        message: "Customer created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const { search } = req.query;
      let query = {};

      if (search) {
        query = {
          $or: [
            { customerName: { $regex: search, $options: "i" } },
            { customerCode: { $regex: search, $options: "i" } },
            // Add other fields you want to search
          ],
        };
      }

      const users = await User.find(query);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ message: "Customer updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSingleUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  activateDeactivateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isActive: status === 1 },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: `User ${
          status === 1 ? "activated" : "deactivated"
        } successfully`,
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;

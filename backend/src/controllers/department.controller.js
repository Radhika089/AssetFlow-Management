import departmentModel from "../models/department.model.js";

export async function createDepartment(req, res) {
  const { name, code, head, parentDepartment } = req.body;

  if (!name || !code) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingDepartment = await departmentModel.findOne({
      $or: [{ name }, { code }],
    });

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: "Department already exists",
        department,
      });
    }

    const department = await departmentModel.create({
      name,
      head,
      parentDepartment,
      code,
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAllDepartments(req, res) {
  try {
    const departments = await departmentModel
      .find({ status: "ACTIVE" })
      .populate("head", "name email");

    return res.status(200).json({
      success: true,
      departments,
      message: "Departments fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getDepartmentById(req, res) {
  try {
    const department = await departmentModel
      .findById(req.params.id)
      .populate("head", "name email");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found!",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateDepartment(req, res) {
  try {
    const department = await departmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department updated successfully!",
      department,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function deleteDepartment(req, res) {
  try {
    const department = await departmentModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "INACTIVE",
      },
      {
        new: true,
      },
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department deactivated successfully!",
      department,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

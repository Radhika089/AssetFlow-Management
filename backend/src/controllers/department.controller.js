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
      return res.status(422).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = await departmentModel.create({
      name,
      head,
      parentDepartment,
      code,
    });

    res.status(201).json({
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

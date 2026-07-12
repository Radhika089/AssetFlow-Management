import assetCategoryModel from "../models/assetCategory.model.js";

export async function createCategory(req, res) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  try {
    const existingCategory = await assetCategoryModel.findOne({
      name,
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await assetCategoryModel.create({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully!",
      category,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await assetCategoryModel.find({
      status: "ACTIVE",
    });

    return res.status(200).json({
      success: true,
      categories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await assetCategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await assetCategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      category,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    const category = await assetCategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "INACTIVE",
      },
      {
        new: true,
      },
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deactivated successfully!",
      category,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

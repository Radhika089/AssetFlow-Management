import assetModel from "../models/asset.model.js";

export async function createAsset(req, res) {
  const {
    name,
    serialNumber,
    category,
    condition,
    location,
    acquisitionDate,
    acquisitionCost,
    isBookable,
    image,
  } = req.body;

  if (!name || !category || !location) {
    return res.status(400).json({
      success: false,
      message: "Name, category and location are required",
    });
  }

  try {
    const existingAsset = await assetModel.findOne({
      serialNumber,
    });

    if (existingAsset) {
      return res.status(409).json({
        success: false,
        message: "Asset with this serial number already exists",
      });
    }

    const count = await assetModel.countDocuments();

    const assetTag = `AF-${String(count + 1).padStart(4, "0")}`;

    const asset = await assetModel.create({
      name,
      assetTag,
      serialNumber,
      category,
      condition,
      location,
      acquisitionDate,
      acquisitionCost,
      isBookable,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Asset created successfully!",
      asset,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAllAssets(req, res) {
  try {
    const assets = await assetModel.find().populate("category", "name");

    return res.status(200).json({
      success: true,
      assets,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAssetById(req, res) {
  try {
    const asset = await assetModel
      .findById(req.params.id)
      .populate("category", "name");

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    return res.status(200).json({
      success: true,
      asset,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateAsset(req, res) {
  try {
    const asset = await assetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      asset,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function deleteAsset(req, res) {
  try {
    const asset = await assetModel.findByIdAndUpdate(
      req.params.id,

      {
        status: "DISPOSED",
      },

      {
        new: true,
      },
    );

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Asset disposed successfully",
      asset,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

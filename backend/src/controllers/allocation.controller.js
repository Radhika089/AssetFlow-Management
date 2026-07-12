import allocationModel from "../models/allocation.model.js";
import assetModel from "../models/asset.model.js";

export async function allocateAsset(req, res) {
  const { asset, assignedTo, department, expectedReturnDate } = req.body;

  if (!asset || !assignedTo) {
    return res.status(400).json({
      success: false,
      message: "Asset and employee are required",
    });
  }

  try {
    const assetData = await assetModel.findById(asset);

    if (!assetData) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    if (assetData.status !== "AVAILABLE") {
      return res.status(400).json({
        success: false,
        message: "Asset is already allocated or unavailable",
      });
    }

    const allocation = await allocationModel.create({
      asset,
      assignedTo,
      department,
      assignedBy: req.user._id,
      expectedReturnDate,
    });

    assetData.status = "ALLOCATED";

    await assetData.save();

    return res.status(201).json({
      success: true,
      message: "Asset allocated successfully!",
      allocation,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAllocations(req, res) {
  try {
    const allocations = await allocationModel
      .find()
      .populate("asset", "name assetTag")
      .populate("assignedTo", "name email")
      .populate("department", "name");

    return res.status(200).json({
      success: true,
      allocations,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function returnAsset(req, res) {
  try {
    const allocation = await allocationModel.findById(req.params.id);

    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: "Allocation not found",
      });
    }

    allocation.status = "RETURNED";

    allocation.returnNote = req.body.returnNote || "";

    await allocation.save();

    await assetModel.findByIdAndUpdate(allocation.asset, {
      status: "AVAILABLE",
    });

    return res.status(200).json({
      success: true,
      message: "Asset returned successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

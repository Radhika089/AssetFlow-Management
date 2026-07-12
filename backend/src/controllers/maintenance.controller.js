import maintenanceModel from "../models/maintenance.model.js";
import assetModel from "../models/asset.model.js";

export async function createMaintenanceRequest(req, res) {
  const { asset, issue, priority } = req.body;

  if (!asset || !issue) {
    return res.status(400).json({
      success: false,
      message: "Asset and issue are required",
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

    const maintenance = await maintenanceModel.create({
      asset,
      requestedBy: req.user._id,
      issue,
      priority,
    });

    return res.status(201).json({
      success: true,
      message: "Maintenance request created!",
      maintenance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// Approve maintenance
export async function approveMaintenance(req, res) {
  try {
    const maintenance = await maintenanceModel.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found",
      });
    }

    maintenance.status = "APPROVED";
    maintenance.approvedBy = req.user._id;

    await maintenance.save();

    await assetModel.findByIdAndUpdate(maintenance.asset, {
      status: "UNDER_MAINTENANCE",
    });

    res.status(200).json({
      success: true,
      message: "Maintenance approved",
      maintenance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// Reject maintenance
export async function rejectMaintenance(req, res) {
  try {
    const maintenance = await maintenanceModel.findByIdAndUpdate(
      req.params.id,
      {
        status: "REJECTED",
        approvedBy: req.user._id,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Maintenance rejected",
      maintenance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// Resolve maintenance
export async function resolveMaintenance(req, res) {
  try {
    const maintenance = await maintenanceModel.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance not found",
      });
    }

    maintenance.status = "RESOLVED";
    maintenance.resolvedDate = new Date();

    await maintenance.save();

    await assetModel.findByIdAndUpdate(maintenance.asset, {
      status: "AVAILABLE",
    });

    res.status(200).json({
      success: true,
      message: "Maintenance resolved",
      maintenance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

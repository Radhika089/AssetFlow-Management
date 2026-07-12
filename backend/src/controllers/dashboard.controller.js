import assetModel from "../models/asset.model.js";
import maintenanceModel from "../models/maintenance.model.js";
import allocationModel from "../models/allocation.model.js";

export async function getDashboard(req, res) {
  try {
    const totalAssets = await assetModel.countDocuments();

    const availableAssets = await assetModel.countDocuments({
      status: "AVAILABLE",
    });

    const allocatedAssets = await assetModel.countDocuments({
      status: "ALLOCATED",
    });

    const maintenanceAssets = await assetModel.countDocuments({
      status: "UNDER_MAINTENANCE",
    });

    const pendingMaintenance = await maintenanceModel.countDocuments({
      status: "PENDING",
    });

    const activeAllocations = await allocationModel.countDocuments({
      status: "ACTIVE",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalAssets,
        availableAssets,
        allocatedAssets,
        maintenanceAssets,
        pendingMaintenance,
        activeAllocations,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

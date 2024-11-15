import GTop from "gi://GTop";

import { divide, type GenericResourceData } from "@/lib/utils";
import { Variable as VariableType } from "astal";

export const computeStorage = (): GenericResourceData => {
  try {
    const currentFsUsage = new GTop.glibtop_fsusage();

    GTop.glibtop_get_fsusage(currentFsUsage, "/");

    const total = currentFsUsage.blocks * currentFsUsage.block_size;
    const available = currentFsUsage.bavail * currentFsUsage.block_size;
    const used = total - available;

    return {
      total,
      used,
      free: available,
      percentage: divide([total, used], false),
    };
  } catch (error) {
    console.error("Error calculating RAM usage:", error);
    return { total: 0, used: 0, percentage: 0, free: 0 };
  }
};

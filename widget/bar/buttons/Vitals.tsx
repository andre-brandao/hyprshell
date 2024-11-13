import { computeCPU } from "@/customModules/cpu";
import { computeStorage } from "@/customModules/storage";
import { Variable } from "astal";
import {
  formatSizeInTiB,
  formatSizeInGiB,
  autoFormatSize,
  formatSizeInKiB,
  formatSizeInMiB,
  getPostfix,
} from "@/lib/utils";

export function CPU() {
  const insterval = 1500;

  const cpuVar = Variable<number>(0).poll(insterval, computeCPU);

  return <label label={cpuVar().as((v) => `${v.toFixed(1)}%`)}></label>;
}

export function Storage() {
  const interval = 5000;

  const round = true;
  const lblType = "used/total";

  const storageVar = Variable(computeStorage()).poll(interval, computeStorage);

  return (
    <label
      label={storageVar().as((v) => {
        const { used, total, percentage, free } = v;
        const formatFunctions = {
          TiB: formatSizeInTiB,
          GiB: formatSizeInGiB,
          MiB: formatSizeInMiB,
          KiB: formatSizeInKiB,
          B: (size: number): number => size,
        };

        // Get the data in proper GiB, MiB, KiB, TiB, or bytes
        const totalSizeFormatted = autoFormatSize(total, round);
        // get the postfix: one of [TiB, GiB, MiB, KiB, B]
        const postfix = getPostfix(total);

        // Determine which format function to use
        const formatUsed = formatFunctions[postfix] || formatFunctions["B"];
        const usedSizeFormatted = formatUsed(used, round);

        if (lblType === "used/total") {
          return `${usedSizeFormatted}/${totalSizeFormatted} ${postfix}`;
        }
        if (lblType === "used") {
          return `${autoFormatSize(used, round)} ${getPostfix(used)}`;
        }
        if (lblType === "free") {
          return `${autoFormatSize(free, round)} ${getPostfix(free)}`;
        }
        return `${percentage}%`;
      })}
    ></label>
  );
}

export default function Vitals() {
  return (
    <>
      <CPU />
      <Storage />
    </>
  );
}

import { computeCPU } from "@/customModules/cpu";
import { computeStorage } from "@/customModules/storage";
import { computeRamUsage } from "@/customModules/ram";
import { Variable } from "astal";
import { formatDataResourse } from "@/lib/utils";
import { options } from "@/options";

const { cpu, storage, ram } = options.bar.vitals;

export function CPU() {
  const { interval, icon } = cpu;

  const cpuVar = Variable<number>(0).poll(interval().get(), computeCPU);

  return (
    <label
      name={"CPU"}
      className={"CPU"}
      label={cpuVar().as((v) => `${icon().get()}${v.toFixed(0)}%`)}
    ></label>
  );
}

export function RAM() {
  const { interval, round, icon, lblType } = ram;
  const ramVar = Variable(computeRamUsage()).poll(
    interval().get(),
    computeRamUsage
  );

  return (
    <label
      name={"RAM"}
      className={"RAM"}
      label={ramVar().as(formatDataResourse.label(ram))}
      tooltipText={ramVar().as(formatDataResourse.tooltip(ram))}
    ></label>
  );
}

export function Storage() {
  const { interval, round, lblType, icon } = storage;

  const storageVar = Variable(computeStorage()).poll(
    interval().get(),
    computeStorage
  );

  return (
    <label
      name={"STORAGE"}
      className={"STORAGE"}
      label={storageVar().as(formatDataResourse.label(storage))}
      tooltipText={storageVar().as(formatDataResourse.tooltip(storage))}
    ></label>
  );
}

export default function Vitals() {
  return (
    <box className={"Vitals"}>
      <CPU />
      <RAM />
      <Storage />
    </box>
  );
}

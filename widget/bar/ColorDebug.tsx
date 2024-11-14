import { computeCPU } from "@/customModules/cpu";
import { computeStorage } from "@/customModules/storage";
import { computeRamUsage } from "@/customModules/ram";
import { Variable } from "astal";
import { formatDataResourse } from "@/lib/utils";
import { options } from "@/options";

const { cpu, storage, ram } = options.bar.vitals;

export function Color({ name = "" }) {
  return (
    <label
      name={"color-" + name}
      //   className={"color-" + name}
      label={"0"}
      tooltipText={name}
      css={`
        color: ${name};
        background-color: ${name};
      `}
    ></label>
  );
}

export default function COLROS() {
  let colors = [
    `@theme_fg_color`,
    `@theme_bg_color`,
    `@theme_text_color`,
    `@theme_base_color`,
    `@theme_selected_bg_color`,
    `@theme_selected_fg_color`,
    `@theme_borders_color`,
    "@warning_color",
    "@error_color",
    "@success_color",
  ];
  return (
    <box className={"vitals"}>
      {colors.map((color) => (
        <Color name={color} />
      ))}
    </box>
  );
}

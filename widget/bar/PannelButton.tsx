import { computeCPU } from "@/customModules/cpu";
import { computeStorage } from "@/customModules/storage";
import { computeRamUsage } from "@/customModules/ram";
import { Binding, Variable } from "astal";
import { formatDataResourse } from "@/lib/utils";
import { options } from "@/options";
import { App, Widget } from "astal/gtk3";

const { cpu, storage, ram } = options.bar.vitals;

type PanelButtonProps = Omit<Widget.ButtonProps, "window"> & {
  window: string | Binding<string>;
  flat?: boolean;
};

function PanelButton({
  window = "",
  flat = false,
  child,
  ...rest
}: PanelButtonProps) {
  if (window instanceof Binding) {
    window = window.get();
  }

  return (
    <button
      className={options.bar
        .flat_buttons()
        .as((v) => (v ? "panel-buton flat" : "panel-buton"))
        .as((v) => v + " " + window)}
      {...rest}
    >
      <box>{child}</box>
    </button>
  );
}

export default PanelButton;

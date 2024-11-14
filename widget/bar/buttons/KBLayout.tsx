import {
  layoutMap,
  type HyprctlDeviceLayout,
  type HyprctlKeyboard,
  type HyprctlMouse,
  type KbLabelType,
  type LayoutKeys,
  type LayoutValues,
  getKeyboardLayout,
} from "@/customModules/kbLayout";
import { bind, execAsync, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";

export default function KBInput() {
  const hypr = Hyprland.get_default();
  // TODO: Fix not showing up on startup
  return (
    <box className={"KBLayout"}>
      <label
        setup={(self) => {
          hypr.connect("keyboard-layout", (hypr_self, kb, layout) => {
            print("keyboard-layout", kb, layout);
            self.label = `${layoutMap[layout as LayoutKeys] ?? ".."}`;

            self.tooltipText = `kb: ${kb} \nlayout: ${layout}`;
          });
        }}
      ></label>
    </box>
  );
}

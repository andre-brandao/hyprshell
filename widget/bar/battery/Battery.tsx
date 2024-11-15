import Battery from "gi://AstalBattery";

import { Variable, GLib, bind } from "astal";
import Icon from "@/widget/Icon";
function BatteryLevel() {
  const bat = Battery.get_default();

  return (
    <box className="Battery" visible={bind(bat, "isPresent")}>
      <Icon name={bind(bat, "batteryIconName")} />
      <label
        label={bind(bat, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
      />
    </box>
  );
}

export default BatteryLevel;

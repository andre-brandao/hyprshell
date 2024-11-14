import { Notify } from "@/lib/utils";
import { Variable, GLib, bind } from "astal";
import Network from "gi://AstalNetwork";

export function Wifi() {
  const { wifi } = Network.get_default();

  return (
    <box className={"Wifi"}>
      <button onClicked={() => print("TODO: implement wifi menu")}>
        <icon
          tooltipText={bind(wifi, "ssid").as(String)}
          icon={bind(wifi, "iconName")}
        />
      </button>
    </box>
  );
}

export default Wifi;

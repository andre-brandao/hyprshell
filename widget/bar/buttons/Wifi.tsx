import { Notify } from "@/lib/utils";
import { Variable, GLib, bind } from "astal";
import Network from "gi://AstalNetwork";

import PanelButton from "../PannelButton";

export function Wifi() {
  const { wifi } = Network.get_default();

  return (
    <PanelButton
      window={"Wifi"}
      onClicked={() => print("TODO: implement wifi menu")}
    >
      <icon
        tooltipText={bind(wifi, "ssid").as(String)}
        icon={bind(wifi, "iconName")}
      />
    </PanelButton>
  );
}

export default Wifi;

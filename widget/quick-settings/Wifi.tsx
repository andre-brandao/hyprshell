import { Notify } from "@/lib/utils";
import { Variable, GLib, bind } from "astal";
import Network from "gi://AstalNetwork";

import PanelButton from "../PannelButton";
import Icon from "@/widget/Icon";

export function Wifi() {
  const { wifi } = Network.get_default();

  return (
    <PanelButton
      window={"Wifi"}
      onClicked={() => print("TODO: implement wifi menu")}
    >
      <Icon
        tooltipText={bind(wifi, "ssid").as(String)}
        name={bind(wifi, "iconName")}
      />
    </PanelButton>
  );
}

export default Wifi;

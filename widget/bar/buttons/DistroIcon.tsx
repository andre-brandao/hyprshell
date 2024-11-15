import Icon from "@/widget/Icon";
import PanelButton from "../PannelButton";
import { App } from "astal/gtk3";
import { show as showLauncher } from "@/widget/app-launcher/Launcher";

function DistroIcon() {
  const distro = "elementary";
  return (
    <PanelButton window={"launcher"} onClicked={showLauncher}>
      <icon icon={"nix-snowflake-symbolic"} />
    </PanelButton>
  );
}

export default DistroIcon;

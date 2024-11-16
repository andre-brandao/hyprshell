import Icon from "@/widget/Icon";

import PanelButton from "@/widget/bar/PannelButton";
import { App } from "astal/gtk3";
import { show as showLauncher } from "@/widget/app-launcher/Launcher";

function DistroIcon() {
  return (
    <PanelButton
      window={"launcher"}
      onClicked={showLauncher}
    >
      <Icon name={"nix-snowflake-symbolic"} />
    </PanelButton>
  );
}

export default DistroIcon;

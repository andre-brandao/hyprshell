import Icon from "@/components/ui/Icon"

import PanelButton from "@/components/ui/PannelButton"
import { App } from "astal/gtk3"
import { show as showLauncher } from "@/components/launcher/Launcher"

function DistroIcon() {
	return (
		<PanelButton
			onClicked={showLauncher}
			className={"LauncherButton"}
		>
			<Icon name={"nix-snowflake-symbolic"} />
		</PanelButton>
	)
}

export default DistroIcon

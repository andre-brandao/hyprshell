import { exec, subprocess } from "astal/process"
import { bind, Variable } from "astal"
import { dependencies, Notify } from "@/lib/utils"
import { options } from "@/options"

import PanelButton from "@/components/ui/PannelButton"
import Icon from "@/components/ui/Icon"
import PannelBox from "@/components/ui/PannelBox"

type IdleState = "active" | "inactive" | "unknown"

const proc = subprocess(["matcha", "-d", "-b", "yambar"])

function IdleInhibitor() {
	if (!dependencies("matcha")) return <></>

	const idleVar = Variable<IdleState>("unknown")

	function toggle() {
		// print("Toggling Idle Inhibitor");
		const resp = exec(["matcha", "-t", "-b", "waybar"])
		if (options.bar.idle_inhibitor.notify().get()) {
			Notify({
				appName: "Idle Inhibitor",
				summary: resp,
				iconName: "dialog-information",
			})
			if (resp.endsWith("Disabled")) {
				idleVar.set("inactive")
			}
			if (resp.endsWith("Enabled")) {
				idleVar.set("active")
			}
		}
	}

	return (
		<PannelBox className="IdleInhibitor">
			<PanelButton
				onDestroy={() => {
					idleVar.drop()
				}}
				onClicked={toggle}
				tooltipText={"Idle Inhibitor\nClick to toggle"}
				className={idleVar()}
			>
				<box className={idleVar()}>
					<Icon
						name={idleVar((s) =>
							s === "active" ? "mug-hot-symbolic" : "mug-symbolic",
						)}
					/>
				</box>
			</PanelButton>
		</PannelBox>
	)
}

export default IdleInhibitor

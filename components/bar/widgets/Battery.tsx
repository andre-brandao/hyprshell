import Battery from "gi://AstalBattery"
import PowerProfiles from "gi://AstalPowerProfiles"

import { Variable, GLib, bind } from "astal"
import { Astal } from "astal/gtk3"
import Icon from "@/components/ui/Icon"
import PannelBox from "@/components/ui/PannelBox"
import PopupWindow from "@/components/ui/popup/PopUp"
import PanelButton from "@/components/ui/PannelButton"
function BatteryLevel() {
	const bat = Battery.get_default()
	const powerprofiles = PowerProfiles.get_default()
	powerprofiles.get_icon_name()
	const profiles = powerprofiles.get_profiles()

	// TODO: style power profiles popup
	const popup = (
		<PopupWindow
			name="PowerProfiles"
			anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
		>
			<box vertical>
				{bind(powerprofiles, "activeProfile").as((activeProfile) =>
					profiles.map((p) => {
						if (p.profile === activeProfile) {
							return <label label={p.profile} />
						}

						return (
							<button
								onClicked={() => {
									powerprofiles.set_active_profile(p.profile)
								}}
							>
								{p.profile}
							</button>
						)
					}),
				)}
			</box>
		</PopupWindow>
	)

	return (
		<PannelBox
			className="Battery"
			visible={bind(bat, "isPresent")}
		>
			<PanelButton
				onClicked={() => {
					if (popup.visible) {
						popup.hide()
					} else {
						popup.show()
					}
				}}
			>
				<box>
					<Icon name={bind(powerprofiles, "iconName")} />
					<Icon name={bind(bat, "batteryIconName")} />
					<label
						label={bind(bat, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
					/>
				</box>
			</PanelButton>
		</PannelBox>
	)
}

export default BatteryLevel

import { Notify } from "@/lib/utils"
import { Variable, GLib, bind } from "astal"
import Network from "gi://AstalNetwork"

import PanelButton from "@/components/ui/PannelButton"
import Icon from "@/components/ui/Icon"
import Wp from "gi://AstalWp"

import SettingsMenu from "./window"
import PannelBox from "../ui/PannelBox"

export function QuickSettings() {
	const { wifi } = Network.get_default()

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const audio = Wp.get_default()?.audio!

	const { defaultSpeaker: speaker, defaultMicrophone: mic } = audio

	const popup = SettingsMenu()
	return (
		<PannelBox>
			<PanelButton
				className="QuickSettings"
				onClicked={() => (popup.visible ? popup.hide() : popup.show())}
			>
				<box>
					<Icon
						tooltipText={bind(wifi, "ssid").as(String)}
						name={bind(wifi, "iconName")}
					/>

					<Icon name={bind(speaker, "volumeIcon")} />

					<Icon name={bind(mic, "volumeIcon")} />
				</box>
			</PanelButton>
		</PannelBox>
	)
}

export default QuickSettings

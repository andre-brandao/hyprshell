import { Notify } from "@/lib/utils"
import { Variable, GLib, bind } from "astal"
import Network from "gi://AstalNetwork"

import PanelButton from "@/widget/PannelButton"
import Icon from "@/widget/Icon"
import Wp from "gi://AstalWp"

import SettingsMenu from "./SettingsMenu"
import PannelBox from "../PannelBox"

export function QuickSettings() {
	const { wifi } = Network.get_default()

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const audio = Wp.get_default()?.audio!

	const { defaultSpeaker: speaker, defaultMicrophone: mic } = audio

	const popup = SettingsMenu()
	return (
		<PannelBox>
			<PanelButton
				window={"QuickSettings"}
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

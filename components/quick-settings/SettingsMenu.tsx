import { AudioSlider, MicSlider } from "./widgets/Slider"

import MprisPlayers from "../../components/ui/media-player/MediaPlayer"

import PopupWindow from "../../components/ui/popup/PopUp"
import { App, Astal } from "astal/gtk3"
import Avatar from "./widgets/Avatar"
import { applyCss } from "@/lib/style/style"

function SettingsMenu() {
	return (
		<PopupWindow
			name={"settings"}
			anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
		>
			<box
				vertical
				className="SettingsMenu"
			>
				<box
					css={`
            padding: 10px;
          `}
				>
					<Avatar />

					<box
						vertical
						hexpand
						halign={ALIGN.END}
					>
						<button
							onClicked={() => {
								applyCss()
							}}
						>
							Apply CSS
						</button>

						<button
							onClicked={() => {
								App.get_window("Settings")?.show()
								App.get_window("win-settings")?.hide()
							}}
						>
							Settings
						</button>

						<button onClicked={() => print("Not Implemented")}>Power</button>
					</box>
				</box>
				<box
					vertical
					className="sliders"
				>
					<AudioSlider />
					<MicSlider />
				</box>
				<MprisPlayers />
			</box>
		</PopupWindow>
	)
}

export default SettingsMenu

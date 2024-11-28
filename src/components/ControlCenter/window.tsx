import { AudioSlider, MicSlider } from "./widgets/Slider"

import MprisPlayers from "../ui/media-player/MediaPlayer"

import PopupWindow from "../ui/popup/PopUp"
import { App, Astal } from "astal/gtk3"
import Avatar from "./widgets/Avatar"
import { applyCss } from "@/lib/style"
import PannelButton from "../ui/PannelButton"
import Icon from "../ui/Icon"
import icons from "@/lib/icons"

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
						hexpand
						halign={ALIGN.END}
						className="quick-actions"
					>
						<box vertical>
							<button
								onClicked={() => {
									App.get_window("Settings")?.show()
									App.get_window("win-settings")?.hide()
								}}
							>
								<Icon name={icons.ui.settings} />
							</button>

							<button onClicked={() => print("Not Implemented")}>
								<Icon name={icons.powermenu.shutdown} />
							</button>
						</box>
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

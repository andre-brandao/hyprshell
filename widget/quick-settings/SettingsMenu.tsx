import { AudioSlider, MicSlider } from "./widgets/Slider";

import MprisPlayers from "../media-player/MediaPlayer";

import PopupWindow from "../PopUp";
import { App, Astal } from "astal/gtk3";
import Avatar from "./widgets/Avatar";

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
        <box>
          <Avatar />

          <button onClicked={() => App.get_window("Settings")?.show()}>
            Settings
          </button>
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
  );
}

export default SettingsMenu;

import Battery from "gi://AstalBattery"

import { Variable, GLib, bind } from "astal"
import Icon from "@/components/ui/Icon"
import PannelBox from "@/components/ui/PannelBox"
function BatteryLevel() {
	const bat = Battery.get_default()

	return (
		<PannelBox
			className="Battery"
			visible={bind(bat, "isPresent")}
		>
			<Icon name={bind(bat, "batteryIconName")} />
			<label
				label={bind(bat, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
			/>
		</PannelBox>
	)
}

export default BatteryLevel
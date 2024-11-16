import { computeCPU } from "@/lib/modules/cpu"
import { computeStorage } from "@/lib/modules/storage"
import { computeRamUsage } from "@/lib/modules/ram"
import { Binding, Variable } from "astal"
import { formatDataResourse } from "@/lib/utils"
import { options } from "@/options"
import { App, type Widget } from "astal/gtk3"

const { cpu, storage, ram } = options.bar.vitals

type PanelButtonProps = Omit<Widget.ButtonProps, "window"> & {
	window: string | Binding<string>
	flat?: boolean
}

function PanelButton({
	window = "",
	flat = false,
	child,
	...rest
}: PanelButtonProps) {
	if (window instanceof Binding) {
		window = window.get()
	}

	return (
		<button
			className={options.bar
				.flat_buttons()
				.as((v) => (v ? "panel-buton flat" : "panel-buton"))
				.as((v) => `${v} ${window}`)}
			{...rest}
		>
			<box>{child}</box>
		</button>
	)
}

export default PanelButton

import { computeCPU } from "@/lib/modules/cpu"
import { computeStorage } from "@/lib/modules/storage"
import { computeRamUsage } from "@/lib/modules/ram"
import { Binding, Variable } from "astal"
import { formatDataResourse } from "@/lib/utils"
import { options } from "@/options"
import { App, type Widget } from "astal/gtk3"

const { cpu, storage, ram } = options.bar.vitals

type PanelButtonProps = Widget.ButtonProps & {
	flat?: boolean
}

function PanelButton({
	flat = false,
	className,
	child,
	...rest
}: PanelButtonProps) {
	// if (window instanceof Binding) {
	// 	window = window.get()
	// }

	return (
		<button
			className={
				options.bar
					.flat_buttons()
					.as((v) => (v ? "PanelButton flat" : "PanelButton"))
					.as((v) => `${v} ${className}`)
				// .as((v) => `${v} ${window}`)
			}
			{...rest}
		>
			<box>{child}</box>
		</button>
	)
}

export default PanelButton

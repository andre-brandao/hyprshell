import { computeCPU } from "@/components/Bar/widgets/vitals/helpers/cpu"
import { computeStorage } from "@/components/Bar/widgets/vitals/helpers/storage"
import { computeRamUsage } from "@/components/Bar/widgets/vitals/helpers/ram"
import { Binding, Variable } from "astal"
import { formatDataResourse } from "@/lib/utils"
import { options } from "@/options"
import { App, type Widget } from "astal/gtk3"

const { flat_buttons } = options.bar

type PanelButtonProps = Widget.ButtonProps & {
	flat?: boolean
}

function PanelButton({
	flat = false,
	className,
	child,
	...rest
}: PanelButtonProps) {
	return (
		<button
			className={flat_buttons()
				.as((v) => (v ? "PanelButton flat" : "PanelButton"))
				.as(
					(v) =>
						`${v} ${className instanceof Variable ? className.get() : className}`,
				)}
			{...rest}
		>
			<box>{child}</box>
		</button>
	)
}

export default PanelButton

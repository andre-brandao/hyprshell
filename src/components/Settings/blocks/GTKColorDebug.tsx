import { computeCPU } from "@/components/Bar/widgets/vitals/helpers/cpu"
import { computeStorage } from "@/components/Bar/widgets/vitals/helpers/storage"
import { computeRamUsage } from "@/components/Bar/widgets/vitals/helpers/ram"
import { Variable } from "astal"
import { formatDataResourse } from "@/lib/utils"
import { options } from "@/options"

const { cpu, storage, ram } = options.bar.vitals

export function Color({ name = "" }) {
	return (
		<label
			name={`color-${name}`}
			//   className={"color-" + name}
			label={"0"}
			tooltipText={name}
			css={`
        color: ${name};
        background-color: ${name};
      `}
		/>
	)
}

export default function COLROS() {
	const colors = [
		"@theme_fg_color",
		// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
		`@theme_bg_color`,
		"@theme_text_color",
		"@theme_base_color",
		"@theme_selected_bg_color",
		"@theme_selected_fg_color",
		"@theme_borders_color",
		"@warning_color",
		"@error_color",
		"@success_color",
	]
	return (
		<box className={"vitals"}>
			{colors.map((color) => (
				<Color name={color} />
			))}
		</box>
	)
}

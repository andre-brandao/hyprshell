import { computeCPU } from "@/lib/modules/cpu"
import { computeStorage } from "@/lib/modules/storage"
import { computeRamUsage } from "@/lib/modules/ram"
import { Variable } from "astal"
import { formatDataResourse } from "@/lib/utils"
import { options } from "@/options"
import Icon from "@/components/ui/Icon"
import PannelBox from "@/components/ui/PannelBox"

const { cpu, storage, ram } = options.bar.vitals

export function CPU() {
	const { interval } = cpu

	const cpuVar = Variable<number>(0).poll(interval().get(), computeCPU)

	return (
		<box
			name={"CPU"}
			className={"CPU"}
		>
			<label label={cpuVar().as((v) => `${v.toFixed(0).padStart(2, " ")}%`)} />
			<Icon name="cpu-symbolic" />
		</box>
	)
}

export function RAM() {
	const { interval } = ram
	const ramVar = Variable(computeRamUsage()).poll(
		interval().get(),
		computeRamUsage,
	)

	return (
		<box
			name={"RAM"}
			className={"RAM"}
			tooltipText={ramVar(formatDataResourse.tooltip(ram))}
		>
			<label label={ramVar(formatDataResourse.label(ram))} />
			<Icon name="ram-symbolic" />
		</box>
	)
}

export function Storage() {
	const { interval } = storage

	const storageVar = Variable(computeStorage()).poll(
		interval().get(),
		computeStorage,
	)

	return (
		<box
			name={"STORAGE"}
			className={"STORAGE"}
			tooltipText={storageVar(formatDataResourse.tooltip(storage))}
		>
			<label label={storageVar(formatDataResourse.label(storage))} />
			<Icon name="drive-harddisk-symbolic" />
		</box>
	)
}

export default function Vitals() {
	return (
		<PannelBox className={"Vitals"}>
			<CPU />
			<RAM />
			<Storage />
		</PannelBox>
	)
}

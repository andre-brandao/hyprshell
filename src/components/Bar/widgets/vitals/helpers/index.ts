import { type Variable, GLib, bind } from "astal"

export type GenericFunction<T, P extends unknown[] = unknown[]> = (
	...args: P
) => T

export type GenericResourceMetrics = {
	total: number
	used: number
	percentage: number
}

export type GenericResourceData = GenericResourceMetrics & {
	free: number
}

export type Postfix = "TiB" | "GiB" | "MiB" | "KiB" | "B"

export const formatSizeInKiB = (
	sizeInBytes: number,
	round: boolean,
): number => {
	const sizeInGiB = sizeInBytes / 1024 ** 1
	return round ? Math.round(sizeInGiB) : Number.parseFloat(sizeInGiB.toFixed(2))
}
export const formatSizeInMiB = (
	sizeInBytes: number,
	round: boolean,
): number => {
	const sizeInGiB = sizeInBytes / 1024 ** 2
	return round ? Math.round(sizeInGiB) : Number.parseFloat(sizeInGiB.toFixed(2))
}
export const formatSizeInGiB = (
	sizeInBytes: number,
	round: boolean,
): number => {
	const sizeInGiB = sizeInBytes / 1024 ** 3
	return round ? Math.round(sizeInGiB) : Number.parseFloat(sizeInGiB.toFixed(2))
}
export const formatSizeInTiB = (
	sizeInBytes: number,
	round: boolean,
): number => {
	const sizeInGiB = sizeInBytes / 1024 ** 4
	return round ? Math.round(sizeInGiB) : Number.parseFloat(sizeInGiB.toFixed(2))
}

export const autoFormatSize = (sizeInBytes: number, round: boolean): number => {
	// auto convert to GiB, MiB, KiB, TiB, or bytes
	if (sizeInBytes >= 1024 ** 4) return formatSizeInTiB(sizeInBytes, round)
	if (sizeInBytes >= 1024 ** 3) return formatSizeInGiB(sizeInBytes, round)
	if (sizeInBytes >= 1024 ** 2) return formatSizeInMiB(sizeInBytes, round)
	if (sizeInBytes >= 1024 ** 1) return formatSizeInKiB(sizeInBytes, round)

	return sizeInBytes
}

export const getPostfix = (sizeInBytes: number): Postfix => {
	if (sizeInBytes >= 1024 ** 4) return "TiB"
	if (sizeInBytes >= 1024 ** 3) return "GiB"
	if (sizeInBytes >= 1024 ** 2) return "MiB"
	if (sizeInBytes >= 1024 ** 1) return "KiB"

	return "B"
}

function formatDataResourseLabel(
	data: GenericResourceData,
	options: {
		icon: Variable<string>
		lblType: Variable<"used/total" | "used" | "free" | "percent">
		round: Variable<boolean>
	},
) {
	const { used, total, percentage, free } = data
	const { icon, lblType, round } = options

	const formatFunctions = {
		TiB: formatSizeInTiB,
		GiB: formatSizeInGiB,
		MiB: formatSizeInMiB,
		KiB: formatSizeInKiB,
		B: (size: number): number => size,
	}

	// Get the data in proper GiB, MiB, KiB, TiB, or bytes
	const totalSizeFormatted = autoFormatSize(total, round().get())
	// get the postfix: one of [TiB, GiB, MiB, KiB, B]
	const postfix = getPostfix(total)

	// Determine which format function to use
	const formatUsed = formatFunctions[postfix] || formatFunctions.B
	const usedSizeFormatted = formatUsed(used, round().get())

	if (lblType().get() === "used/total") {
		return `${usedSizeFormatted}/${totalSizeFormatted}${postfix}`
	}
	if (lblType().get() === "used") {
		return `${autoFormatSize(used, round().get())} ${getPostfix(used)}`
	}
	if (lblType().get() === "free") {
		return `${autoFormatSize(free, round().get())} ${getPostfix(free)}`
	}
	return `${icon().get()}${percentage}%`
}

export const formatDataResourse = {
	label:
		(options: {
			lblType: Variable<"used/total" | "used" | "free" | "percent">
			round: Variable<boolean>
		}) =>
		(data: GenericResourceData) => {
			const { used, total, percentage, free } = data
			const { lblType, round } = options

			const formatFunctions = {
				TiB: formatSizeInTiB,
				GiB: formatSizeInGiB,
				MiB: formatSizeInMiB,
				KiB: formatSizeInKiB,
				B: (size: number): number => size,
			}

			// Get the data in proper GiB, MiB, KiB, TiB, or bytes
			const totalSizeFormatted = autoFormatSize(total, round().get())
			// get the postfix: one of [TiB, GiB, MiB, KiB, B]
			const postfix = getPostfix(total)

			// Determine which format function to use
			const formatUsed = formatFunctions[postfix] || formatFunctions.B
			const usedSizeFormatted = formatUsed(used, round().get())

			if (lblType().get() === "used/total") {
				return `${usedSizeFormatted}/${totalSizeFormatted}${postfix}`
			}
			if (lblType().get() === "used") {
				return `${autoFormatSize(used, round().get())}${getPostfix(used)}`
			}
			if (lblType().get() === "free") {
				return `${autoFormatSize(free, round().get())}${getPostfix(free)}`
			}
			return `${percentage.toFixed(0)}%`
		},

	tooltip:
		(options: {
			lblType: Variable<"used/total" | "used" | "free" | "percent">
			round: Variable<boolean>
		}) =>
		(data: GenericResourceData) => {
			const { used, total, percentage, free } = data
			const { lblType, round } = options

			const formatFunctions = {
				TiB: formatSizeInTiB,
				GiB: formatSizeInGiB,
				MiB: formatSizeInMiB,
				KiB: formatSizeInKiB,
				B: (size: number): number => size,
			}

			// Get the data in proper GiB, MiB, KiB, TiB, or bytes

			const totalSizeFormatted = autoFormatSize(total, round().get())
			// get the postfix: one of [TiB, GiB, MiB, KiB, B]
			const postfix = getPostfix(total)

			// Determine which format function to use
			const formatUsed = formatFunctions[postfix] || formatFunctions.B
			const usedSizeFormatted = formatUsed(used, round().get())

			return `${usedSizeFormatted}/${totalSizeFormatted} ${postfix} \n(${percentage}% used, ${autoFormatSize(
				free,
				round().get(),
			)} ${getPostfix(free)} free)`
		},
}

import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import {
  readFile,
  readFileAsync,
  writeFile,
  writeFileAsync,
  monitorFile,
  Gio,
} from "astal/file";
import { interval, timeout, idle } from "astal/time";
import { subprocess, exec, execAsync } from "astal/process";

export function ensureDirectory(path: string) {
  if (GLib.file_test(path, GLib.FileTest.EXISTS)) {
    print(`creating directory: ${path}`);
    GLib.mkdir_with_parents(path, 0o777);
  }
}

/**
 * @returns true if all of the `bins` are found
 */
export function dependencies(...bins: string[]) {
  const missing = bins.filter((bin) => {
    execAsync(`which ${bin}`)
      .then((out) => true)
      .catch((err) => false);
  });

  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(", ")}`));
    // notify(`missing dependencies: ${missing.join(", ")}`);
  }

  return missing.length === 0;
}

/**
 * @returns execAsync(cmd)
 */
export function sh(cmd: string | string[]) {
  return execAsync(cmd).catch((err) => {
    printerr(typeof cmd === "string" ? cmd : cmd.join(" "), err);
    return "";
  });
}

/**
 * @returns execAsync(["bash", "-c", cmd])
 */
export async function bash(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd =
    typeof strings === "string"
      ? strings
      : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");

  return execAsync(["bash", "-c", cmd]).catch((err) => {
    console.error(cmd, err);
    return "";
  });
}
export function forMonitors(widget: (monitor: number) => Gtk.Window) {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).flatMap(widget);
}

/**
 * @returns [start...length]
 */
export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

export const divide = ([total, used]: number[], round: boolean): number => {
  const percentageTotal = (used / total) * 100;
  if (round) {
    return total > 0 ? Math.round(percentageTotal) : 0;
  }
  return total > 0 ? parseFloat(percentageTotal.toFixed(2)) : 0;
};

export const formatSizeInKiB = (
  sizeInBytes: number,
  round: boolean
): number => {
  const sizeInGiB = sizeInBytes / 1024 ** 1;
  return round ? Math.round(sizeInGiB) : parseFloat(sizeInGiB.toFixed(2));
};
export const formatSizeInMiB = (
  sizeInBytes: number,
  round: boolean
): number => {
  const sizeInGiB = sizeInBytes / 1024 ** 2;
  return round ? Math.round(sizeInGiB) : parseFloat(sizeInGiB.toFixed(2));
};
export const formatSizeInGiB = (
  sizeInBytes: number,
  round: boolean
): number => {
  const sizeInGiB = sizeInBytes / 1024 ** 3;
  return round ? Math.round(sizeInGiB) : parseFloat(sizeInGiB.toFixed(2));
};
export const formatSizeInTiB = (
  sizeInBytes: number,
  round: boolean
): number => {
  const sizeInGiB = sizeInBytes / 1024 ** 4;
  return round ? Math.round(sizeInGiB) : parseFloat(sizeInGiB.toFixed(2));
};

export const autoFormatSize = (sizeInBytes: number, round: boolean): number => {
  // auto convert to GiB, MiB, KiB, TiB, or bytes
  if (sizeInBytes >= 1024 ** 4) return formatSizeInTiB(sizeInBytes, round);
  if (sizeInBytes >= 1024 ** 3) return formatSizeInGiB(sizeInBytes, round);
  if (sizeInBytes >= 1024 ** 2) return formatSizeInMiB(sizeInBytes, round);
  if (sizeInBytes >= 1024 ** 1) return formatSizeInKiB(sizeInBytes, round);

  return sizeInBytes;
};

export type GenericFunction<T, P extends unknown[] = unknown[]> = (
  ...args: P
) => T;

export type GenericResourceMetrics = {
  total: number;
  used: number;
  percentage: number;
};

export type GenericResourceData = GenericResourceMetrics & {
  free: number;
};

export type Postfix = "TiB" | "GiB" | "MiB" | "KiB" | "B";

export const getPostfix = (sizeInBytes: number): Postfix => {
  if (sizeInBytes >= 1024 ** 4) return "TiB";
  if (sizeInBytes >= 1024 ** 3) return "GiB";
  if (sizeInBytes >= 1024 ** 2) return "MiB";
  if (sizeInBytes >= 1024 ** 1) return "KiB";

  return "B";
};

function formatDataResourseLabel(
  data: GenericResourceData,
  options: {
    icon: Variable<string>;
    lblType: Variable<"used/total" | "used" | "free" | "percent">;
    round: Variable<boolean>;
  }
) {
  const { used, total, percentage, free } = data;
  const { icon, lblType, round } = options;

  const formatFunctions = {
    TiB: formatSizeInTiB,
    GiB: formatSizeInGiB,
    MiB: formatSizeInMiB,
    KiB: formatSizeInKiB,
    B: (size: number): number => size,
  };

  // Get the data in proper GiB, MiB, KiB, TiB, or bytes
  const totalSizeFormatted = autoFormatSize(total, round().get());
  // get the postfix: one of [TiB, GiB, MiB, KiB, B]
  const postfix = getPostfix(total);

  // Determine which format function to use
  const formatUsed = formatFunctions[postfix] || formatFunctions["B"];
  const usedSizeFormatted = formatUsed(used, round().get());

  if (lblType().get() === "used/total") {
    return `${icon().get()}${usedSizeFormatted}/${totalSizeFormatted}${postfix}`;
  }
  if (lblType().get() === "used") {
    return `${icon().get()}${autoFormatSize(used, round().get())} ${getPostfix(
      used
    )}`;
  }
  if (lblType().get() === "free") {
    return `${icon().get()}${autoFormatSize(free, round().get())} ${getPostfix(
      free
    )}`;
  }
  return `${icon().get()}${percentage}%`;
}

export const formatDataResourse = {
  label:
    (options: {
      icon: Variable<string>;
      lblType: Variable<"used/total" | "used" | "free" | "percent">;
      round: Variable<boolean>;
    }) =>
    (data: GenericResourceData) => {
      const { used, total, percentage, free } = data;
      const { icon, lblType, round } = options;

      const formatFunctions = {
        TiB: formatSizeInTiB,
        GiB: formatSizeInGiB,
        MiB: formatSizeInMiB,
        KiB: formatSizeInKiB,
        B: (size: number): number => size,
      };

      // Get the data in proper GiB, MiB, KiB, TiB, or bytes
      const totalSizeFormatted = autoFormatSize(total, round().get());
      // get the postfix: one of [TiB, GiB, MiB, KiB, B]
      const postfix = getPostfix(total);

      // Determine which format function to use
      const formatUsed = formatFunctions[postfix] || formatFunctions["B"];
      const usedSizeFormatted = formatUsed(used, round().get());

      if (lblType().get() === "used/total") {
        return `${icon().get()}${usedSizeFormatted}/${totalSizeFormatted}${postfix}`;
      }
      if (lblType().get() === "used") {
        return `${icon().get()}${autoFormatSize(
          used,
          round().get()
        )} ${getPostfix(used)}`;
      }
      if (lblType().get() === "free") {
        return `${icon().get()}${autoFormatSize(
          free,
          round().get()
        )} ${getPostfix(free)}`;
      }
      return `${icon().get()}${percentage}%`;
    },

  tooltip:
    (options: {
      icon: Variable<string>;
      lblType: Variable<"used/total" | "used" | "free" | "percent">;
      round: Variable<boolean>;
    }) =>
    (data: GenericResourceData) => {
      const { used, total, percentage, free } = data;
      const { icon, lblType, round } = options;

      const formatFunctions = {
        TiB: formatSizeInTiB,
        GiB: formatSizeInGiB,
        MiB: formatSizeInMiB,
        KiB: formatSizeInKiB,
        B: (size: number): number => size,
      };

      // Get the data in proper GiB, MiB, KiB, TiB, or bytes

      const totalSizeFormatted = autoFormatSize(total, round().get());
      // get the postfix: one of [TiB, GiB, MiB, KiB, B]
      const postfix = getPostfix(total);

      // Determine which format function to use
      const formatUsed = formatFunctions[postfix] || formatFunctions["B"];
      const usedSizeFormatted = formatUsed(used, round().get());

      return `${usedSizeFormatted}/${totalSizeFormatted} ${postfix} (${percentage}% used, ${autoFormatSize(
        free,
        round().get()
      )} ${getPostfix(free)} free)`;
    },
};

export const Notify = (notifPayload: {
  appName?: string;
  body?: string;
  iconName?: string;
  id?: number;
  summary?: string;
  urgency?: "low" | "normal" | "critical";
  category?: string;
  timeout?: number;
  transient?: boolean;
}): void => {
  let command = "notify-send";
  command += ` "${notifPayload.summary} "`;
  if (notifPayload.body) command += ` "${notifPayload.body}" `;
  if (notifPayload.appName) command += ` -a "${notifPayload.appName}"`;
  if (notifPayload.iconName) command += ` -i "${notifPayload.iconName}"`;
  if (notifPayload.urgency) command += ` -u "${notifPayload.urgency}"`;
  if (notifPayload.timeout !== undefined)
    command += ` -t ${notifPayload.timeout}`;
  if (notifPayload.category) command += ` -c "${notifPayload.category}"`;
  if (notifPayload.transient) command += ` -e`;
  if (notifPayload.id !== undefined) command += ` -r ${notifPayload.id}`;

  execAsync(command);
};

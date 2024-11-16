import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { options } from "@/options";
import PanelButton from "@/widget/PannelButton";
import { range } from "@/lib/utils";

const { show, label, focused_label, mode, show_empty } = options.bar.workspaces;

function Workspaces() {
  const hypr = Hyprland.get_default();

  const wssBind = bind(hypr, "workspaces").as((wss) =>
    wss.filter((ws) => ws.id > 0).sort((a, b) => a.id - b.id),
  );

  return (
    <box className="Workspaces">
      {wssBind.as((wss) => {
        return range(!show_empty().get() ? wss.length : show().get(), 1).map(
          (i) => <WsButton index={i} />,
        );
      })}
    </box>
  );
}

// function MiniWorkspaces({ index }: { index: number }) {
//   const hypr = Hyprland.get_default();

//   const ws = hypr.get_workspace(index);
//   return (
//     <label
//       valign={ALIGN.CENTER}
//       label={`${index}`}
//       setup={(self) => {
//         self.toggleClassName(
//           "acitve",
//           bind(hypr, "focusedWorkspace")
//             .as((fw) => fw.id === index)
//             .get()
//         );
//         self.toggleClassName("occupied", ws !== null);
//       }}
//     ></label>
//   );
// }

function WsButton({ index, className }: { index: number; className?: string }) {
  const hypr = Hyprland.get_default();

  const ws = hypr.get_workspace(index);
  const wss = hypr.get_workspaces();
  // wss.

  // print("ws", ws);

  const format = bind(hypr, "focusedWorkspace").as((fw) => {
    if (fw.id === index) {
      return {
        class: "focused",
        label: focused_label.get() === "id" ? index : focused_label.get(),
      };
    }

    if (ws) {
      return {
        class: "occupied",
        label: label.get() === "id" ? index : label.get(),
      };
    }

    return {
      class: "",
      label: label.get() === "id" ? index : label.get(),
    };
  });
  return (
    <button
      className={format.as((f) => f.class)}
      onClicked={() => hypr.dispatch("workspace", index.toString())}
    >
      {format.as((f) => f.label)}
    </button>
  );
}

export default Workspaces;

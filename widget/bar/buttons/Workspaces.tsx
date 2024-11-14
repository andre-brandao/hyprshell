import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { options } from "@/options";

const { show, label, focused_label } = options.bar.workspaces;

function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box className="Workspaces">
      {bind(hypr, "workspaces").as((wss) => {
        const show_quant = show().get();
        if (show_quant === "ative") {
          return wss
            .filter((ws) => ws.id > 0)
            .sort((a, b) => a.id - b.id)
            .map((ws) => <WsButton ws={ws} index={ws.id} />);
        }

        return Array.from(
          { length: show_quant },
          // (_, i) => i + 1
          (_, i) => (
            <WsButton ws={wss.find((w) => w.id === i + 1)} index={i + 1} />
          )
        );
      })}
    </box>
  );
}

function WsButton({
  ws,
  index,
}: {
  ws: Hyprland.Workspace | undefined;
  index: number;
}) {
  const hypr = Hyprland.get_default();

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

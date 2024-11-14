import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { options } from "@/options";

const { show, label, focused_label, mode } = options.bar.workspaces;

function Workspaces() {
  const hypr = Hyprland.get_default();

  const wssBind = bind(hypr, "workspaces").as((wss) =>
    wss.filter((ws) => ws.id > 0).sort((a, b) => a.id - b.id)
  );

  return (
    <box className="Workspaces">
      {wssBind.as((wss) => {
        switch (mode.get()) {
          case "active":
            return wss.map((ws) => <WsButton index={ws.id} />);

          case "number":
          default:
            return Array.from(
              { length: +show().get() },
              // (_, i) => i + 1
              (_, i) => <WsButton index={i + 1} />
            );
        }
      })}
    </box>
  );
}

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

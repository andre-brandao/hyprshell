import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { mergeBindings } from "../../../../../.local/share/ags/gtk3/astalify";

export function FocusedClient() {
  const hypr = Hyprland.get_default();
  const focused = bind(hypr, "focusedClient");

  return (
    <box className="FocusedClient" visible={focused.as(Boolean)}>
      {focused.as(
        (client) =>
          client && (
            <label
              label={bind(client, "title").as((v) =>
                v.length < 20 ? v : v.slice(0, 20) + "..."
              )}
              // tooltipText={mergeBindings([
              //   bind(client, "address"),
              //   bind(client, "title"),
              // ]).as(([address, title]) => `${address}\n${title}`)}
            />
          )
      )}
    </box>
  );
}

export default FocusedClient;

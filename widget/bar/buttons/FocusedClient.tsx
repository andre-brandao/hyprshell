import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk, App } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";

const formatTooltip = (client: Hyprland.Client) =>
  Variable.derive(
    [
      bind(client, "address"),
      bind(client, "title"),
      bind(client, "class"),
      bind(client, "initialClass"),
      bind(client, "initialTitle"),
    ],
    (address, title, wm_class) => {
      return `Address: ${address}
Title: ${title}
Class: ${wm_class}
Initial Class: ${client.initialClass}
Initial Title: ${client.initialTitle}`;
    },
  );
export function FocusedClient() {
  const hypr = Hyprland.get_default();
  const focused = bind(hypr, "focusedClient");

  return (
    <box
      className="FocusedClient"
      visible={focused.as(Boolean)}
      // onClicked={() => App.get_window("Settings")?.show()}
    >
      {focused.as(
        (client) =>
          client && (
            <label
              label={bind(client, "title").as((v) =>
                v.length < 20 ? v : v.slice(0, 20) + "...",
              )}
              tooltipText={formatTooltip(client)()}
            />
          ),
      )}
    </box>
  );
}

export default FocusedClient;

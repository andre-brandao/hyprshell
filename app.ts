import { App, Widget } from "astal/gtk3";
import "./globals";

import { Gdk, Gtk } from "astal/gtk3";
// @ts-expect-error
import style from "./style.scss";
import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notification/NotificationPopups";
import Launcher from "./widget/app-launcher/Launcher";
import MediaPlayer from "./widget/media-player/MediaPlayer";
import Layout from "./widget/settings/Layout";
import Dialog from "./widget/Dialog";
import { computeCPU } from "./customModules/cpu";

function handleMonitors() {
  const widgetMap = new Map<Gdk.Monitor, Gtk.Widget[]>();

  const createWidgets = (gdkmonitor: Gdk.Monitor) => [
    Bar(gdkmonitor),
    NotificationPopups(gdkmonitor),
  ];

  for (const gdkmonitor of App.get_monitors()) {
    widgetMap.set(gdkmonitor, createWidgets(gdkmonitor));
  }

  App.connect("monitor-added", (_, gdkmonitor) => {
    widgetMap.set(gdkmonitor, createWidgets(gdkmonitor));
  });

  App.connect("monitor-removed", (_, gdkmonitor) => {
    widgetMap.get(gdkmonitor)?.forEach((w) => w.destroy());
    widgetMap.delete(gdkmonitor);
  });
}

App.start({
  css: style,
  gtkTheme: "adw-gtk3-dark",
  // instanceName: 'js',
  requestHandler(request, res) {
    print(request);

    res("ok");
  },
  main() {
    handleMonitors();
    Launcher();
    // Dialog({
    //   title: "Olamundo",
    //   action: "test",

    //   yes: () => print("yes"),
    //   no: () => print("no"),
    // });
    // LauncherWindow.hide();
    // new Widget.Window({}, Layout());
  },
});

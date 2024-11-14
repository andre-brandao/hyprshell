import { App, Widget } from "astal/gtk3";
import "./globals";

import { Gdk, Gtk } from "astal/gtk3";
import "./options";
import { css } from "./style/style";

import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notification/NotificationPopups";
import Launcher from "./widget/app-launcher/Launcher";

import { TestRWindow } from "./widget/RegularWindow";

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
  css: css,
  // gtkTheme: "adw-gtk3-dark",
  // instanceName: 'js',
  requestHandler(request, res) {
    print(request);

    res("ok");
  },
  main() {
    handleMonitors();
    Launcher();
    // TestRWindow();
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

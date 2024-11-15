import { App, Widget, Gdk, Gtk } from "astal/gtk3";

import "./globals";
import "./options";
import { css } from "./style/style";

import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notification/NotificationPopups";
import Launcher from "./widget/app-launcher/Launcher";
import { forEachMonitor } from "./lib/utils";

App.start({
  css: css,
  icons: "/home/andre/.config/ags/assets/icons",
  // gtkTheme: "adw-gtk3-dark",
  // instanceName: 'js',
  requestHandler(request, res) {
    print(request);

    res("ok");
  },
  main() {
    forEachMonitor((m: Gdk.Monitor) => [Bar(m), NotificationPopups(m)]);
    Launcher();
  },
});

import { App, Widget, Gdk, Gtk } from "astal/gtk3";

import "./globals";
import "./options";
import { css } from "./style/style";

import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notification/NotificationPopups";
import Launcher from "./widget/app-launcher/Launcher";
import { forEachMonitor } from "./lib/utils";
import { RegularWindow } from "./widget/RegularWindow";
import SettingsWindow from "./widget/settings/Settings";
import OSD from "./widget/osd/OSD";

App.start({
  css: css,
  icons: "/home/andre/.config/ags/assets/icons",
  // gtkTheme: "adw-gtk3-dark",
  // instanceName: 'js',
  requestHandler(request, res) {
    try {
      print(request);
      // const foo = Layout();
      // print(foo);
      // if (request.startsWith("popup")) popup_osd(request.replace("popup ", ""));
      res("ok");
    } catch (error) {
      printerr(error);
      res("error");
    }
  },
  main() {
    forEachMonitor((m: Gdk.Monitor) => [Bar(m), NotificationPopups(m)]);
    Launcher();
    SettingsWindow();
    OSD();
  },
});

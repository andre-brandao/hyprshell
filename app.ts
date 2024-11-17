import { App, Widget, type Gdk, Gtk } from "astal/gtk3";

import "./globals";
import "./options";
import { css } from "./lib/style/style";

import Bar from "@/components/bar/Bar";
import NotificationPopups from "./components/notification/NotificationPopups";
import Launcher from "./components/launcher/Launcher";
import { forEachMonitor } from "./lib/utils";
import { RegularWindow } from "./components/ui/RegularWindow";
import SettingsWindow from "@/components/options-window/Settings";
import OSD from "@/components/osd/OSD";

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

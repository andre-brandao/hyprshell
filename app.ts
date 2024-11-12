import { App } from "astal/gtk3";
// @ts-expect-error
import style from "./style.scss";
import Bar from "./widget/bar/Bar";
import NotificationPopups from "./widget/notification/NotificationPopups";
import { Gdk, Gtk } from "astal/gtk3";

App.start({
  css: style,

  // instanceName: 'js',
  requestHandler(request, res) {
    print(request);
    res("ok");
  },
  main() {
    const bars = new Map<Gdk.Monitor, Gtk.Widget>();
    const notificationPop = new Map<Gdk.Monitor, Gtk.Widget>();

    // initialize
    for (const gdkmonitor of App.get_monitors()) {
      bars.set(gdkmonitor, Bar(gdkmonitor));
      notificationPop.set(gdkmonitor, NotificationPopups(gdkmonitor));
    }

    App.connect("monitor-added", (_, gdkmonitor) => {
      bars.set(gdkmonitor, Bar(gdkmonitor));

      notificationPop.set(gdkmonitor, NotificationPopups(gdkmonitor));
    });

    App.connect("monitor-removed", (_, gdkmonitor) => {
      bars.get(gdkmonitor)?.destroy();
      bars.delete(gdkmonitor);

      notificationPop.get(gdkmonitor)?.destroy();
      notificationPop.delete(gdkmonitor);
    });
  },
});

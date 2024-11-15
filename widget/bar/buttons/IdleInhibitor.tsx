import { exec, subprocess } from "astal/process";
import { bind, Variable } from "astal";
import { dependencies, Notify } from "@/lib/utils";
import { options } from "@/options";

import PanelButton from "../PannelButton";

type IdleState = "active" | "inactive" | "unknown";
function IdleInhibitor() {
  if (!dependencies("matcha")) return <></>;
  const proc = subprocess(["matcha", "-d", "-b", "yambar"]);

  const idleVar = Variable<IdleState>("unknown");

  function toggle() {
    // print("Toggling Idle Inhibitor");
    const resp = exec(["matcha", "-t", "-b", "waybar"]);
    if (options.bar.idle_inhibitor.notify().get()) {
      Notify({
        appName: "Idle Inhibitor",
        summary: resp,
        iconName: "dialog-information",
      });
      if (resp.endsWith("Disabled")) {
        idleVar.set("inactive");
      }
      if (resp.endsWith("Enabled")) {
        idleVar.set("active");
      }
    }
  }

  return (
    <PanelButton
      window=""
      onDestroy={() => {
        idleVar.drop();
      }}
      onClicked={toggle}
      tooltipText={"Idle Inhibitor\nClick to toggle"}
      setup={(but) => {
        but.toggleClassName("IdleInhibitor");
        bind(idleVar).subscribe((s) => {
          if (s === "inactive") {
            but.toggleClassName("active", false);
          }
          if (s === "active") {
            but.toggleClassName("active", true);
          }
        });
      }}
    >
      <box>
        <icon
          icon={idleVar().as((s) =>
            s === "active" ? "mug-hot-symbolic" : "mug-symbolic"
          )}
        />
      </box>
    </PanelButton>
  );
}

export default IdleInhibitor;

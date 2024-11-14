import { exec, subprocess } from "astal/process";
import { Variable } from "astal";
import { dependencies, Notify } from "@/lib/utils";
import { options } from "@/options";

type IdleState = "active" | "inactive" | "unknown";
function IdleInhibitor() {
  if (!dependencies("matcha")) return <></>;

  const idleVar = Variable<IdleState>("unknown");
  const proc = subprocess(
    ["matcha", "-d", "-b", "yambar"]
    // handleLine
    // handleLine
  );

  function toggle() {
    // print("Toggling Idle Inhibitor");
    const resp = exec(["matcha", "-t", "-b", "waybar"]);
    if (options.bar.idle_inhibitor.notify().get()) {
      Notify({
        appName: "Matcha",
        summary: "Idle Inhibitor",
        body: resp,
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
    <button
      className={idleVar().as((s) => (s === "active" ? "idle-active" : ""))}
      onDestroy={() => {
        idleVar.drop();
      }}
      onClicked={toggle}
      tooltipText={"Idle Inhibitor\nClick to toggle"}
      label={idleVar().as((s) => {
        switch (s) {
          case "active":
            return "󰅶";
          case "inactive":
            return "󰾫";

          default:
            return "󰅶";
            return "";
        }
      })}
    ></button>
  );
}

export default IdleInhibitor;

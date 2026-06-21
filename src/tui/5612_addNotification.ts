// @ts-nocheck
import {Ui as ji,Ld as np} from "../../vendor/m2459.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,onGrowthBookRefresh as iK,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b,M as L} from "../../runtime.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function xi4() {
  let {
    addNotification: addNotification,
    removeNotification: removeNotification
  } = ji();
  Ii4.useEffect(() => {
    let prevNoticeText = "",
      checkAndUpdate = () => {
        let currentText = ut("tengu_startup_notice", "");
        if (currentText === prevNoticeText) return;
        if (prevNoticeText = currentText, !currentText) {
          removeNotification(bi4);
          return;
        }
        addNotification({
          key: bi4,
          text: currentText,
          color: "warning",
          priority: "high",
          timeoutMs: 30000,
          fold: (_prev, next) => next
        });
      };
    return checkAndUpdate(), iK(checkAndUpdate);
  }, [addNotification, removeNotification]);
}
var Ii4,
  bi4 = "startup-notice";
var ui4 = b(() => {
  np();
  Yn();
  Ii4 = L(Te(), 1);
});

export {xi4 as wnc,Ii4 as vnc,bi4 as Cnc,ui4 as Rnc};

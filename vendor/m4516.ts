// @ts-nocheck
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
function hJ(){let e=getInitialSettings()?.autoUpdatesChannel;if(e&&e!=="latest")return e;return"latest"}
var rDe=b(()=>{zn();yr()});
export {hJ,rDe};

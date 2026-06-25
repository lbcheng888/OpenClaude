// @ts-nocheck
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
function eJ(){let e=getInitialSettings()?.autoUpdatesChannel;if(e&&e!=="latest")return e;return"latest"}
var ZDe=b(()=>{jn();br()});
export {eJ,ZDe};

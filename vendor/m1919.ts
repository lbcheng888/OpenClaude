// @ts-nocheck
import {Ari,Rri} from "./m1918.ts";
import {b} from "../runtime.ts";
async function N1r(e){return Ari(`tell application "Finder" to set app_path to application file id "${e}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`)}
var vri=b(()=>{Rri()});
export {N1r,vri};

// @ts-nocheck
import {kXs,HXs} from "./m1913.ts";
import {b} from "../runtime.ts";
async function aPr(e){return kXs(`tell application "Finder" to set app_path to application file id "${e}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`)}
var IXs=b(()=>{HXs()});
export {aPr,IXs};

// @ts-nocheck
import {b} from "../runtime.ts";
async function B1r(e=TYu){let{stdout:t}=await e("reg",["QUERY"," HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice","/v","ProgId"]),n=/ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(t);if(!n)throw new F1r(`Cannot find Windows browser in stdout: ${JSON.stringify(t)}`);let{id:r}=n.groups,o=SYu[r];if(!o)throw new F1r(`Unknown browser ID: ${r}`);return o}
var wri,kri,TYu,SYu,F1r;
var Hri=b(()=>{wri=require("util"),kri=require("child_process"),TYu=wri.promisify(kri.execFile),SYu={AppXq0fevzme2pys62n3e0fbqa7peapykr8v:{name:"Edge",id:"com.microsoft.edge.old"},MSEdgeDHTML:{name:"Edge",id:"com.microsoft.edge"},MSEdgeHTM:{name:"Edge",id:"com.microsoft.edge"},"IE.HTTP":{name:"Internet Explorer",id:"com.microsoft.ie"},FirefoxURL:{name:"Firefox",id:"org.mozilla.firefox"},ChromeHTML:{name:"Chrome",id:"com.google.chrome"},BraveHTML:{name:"Brave",id:"com.brave.Browser"},BraveBHTML:{name:"Brave Beta",id:"com.brave.Browser.beta"},BraveSSHTM:{name:"Brave Nightly",id:"com.brave.Browser.nightly"}};F1r=class F1r extends Error{}});
export {B1r,wri,kri,TYu,SYu,F1r,Hri};

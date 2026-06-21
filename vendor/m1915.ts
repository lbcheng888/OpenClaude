// @ts-nocheck
import {b} from "../runtime.ts";
async function cPr(e=e6u){let{stdout:t}=await e("reg",["QUERY"," HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice","/v","ProgId"]),n=/ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(t);if(!n)throw new lPr(`Cannot find Windows browser in stdout: ${JSON.stringify(t)}`);let{id:r}=n.groups,o=t6u[r];if(!o)throw new lPr(`Unknown browser ID: ${r}`);return o}
var DXs,PXs,e6u,t6u,lPr;
var OXs=b(()=>{DXs=require("util"),PXs=require("child_process"),e6u=DXs.promisify(PXs.execFile),t6u={AppXq0fevzme2pys62n3e0fbqa7peapykr8v:{name:"Edge",id:"com.microsoft.edge.old"},MSEdgeDHTML:{name:"Edge",id:"com.microsoft.edge"},MSEdgeHTM:{name:"Edge",id:"com.microsoft.edge"},"IE.HTTP":{name:"Internet Explorer",id:"com.microsoft.ie"},FirefoxURL:{name:"Firefox",id:"org.mozilla.firefox"},ChromeHTML:{name:"Chrome",id:"com.google.chrome"},BraveHTML:{name:"Brave",id:"com.brave.Browser"},BraveBHTML:{name:"Brave Beta",id:"com.brave.Browser.beta"},BraveSSHTM:{name:"Brave Nightly",id:"com.brave.Browser.nightly"}};lPr=class lPr extends Error{}});
export {cPr,DXs,PXs,e6u,t6u,lPr,OXs};

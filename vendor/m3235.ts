// @ts-nocheck
import {b} from "../runtime.ts";
function rYd(e,t){if(Zjd.some((n)=>e.startsWith(n)))return!0;if(t){let n=t.endsWith("/")?`${t}Applications/`:`${t}/Applications/`;if(e.startsWith(n))return!0}return!1}
function oYd(e){return eYd.some((t)=>t.test(e))}
function cua(e,t){let n=new Set;return e.map((r)=>r.trim()).filter((r)=>{if(!r)return!1;if(r.length>40)return!1;if(t&&!nYd.test(r))return!1;if(n.has(r))return!1;return n.add(r),!0}).sort((r,o)=>r.localeCompare(o))}
function sYd(e){let t=cua(e,!0);if(t.length<=50)return t;return[...t.slice(0,50),`\u2026 and ${t.length-50} more`]}
function iYd(e){return cua(e,!1)}
function uua(e,t){let{alwaysKept:n,rest:r}=e.reduce((i,a)=>{if(tYd.has(a.bundleId))i.alwaysKept.push(a.displayName);else if(rYd(a.path,t)&&!oYd(a.displayName))i.rest.push(a.displayName);return i},{alwaysKept:[],rest:[]}),o=iYd(n),s=new Set(o);return[...o,...sYd(r).filter((i)=>!s.has(i))]}
var Zjd,eYd,tYd,nYd;
var dua=b(()=>{Zjd=["/Applications/","/System/Applications/"],eYd=[/Helper(?:$|\s\()/,/Agent(?:$|\s\()/,/Service(?:$|\s\()/,/Uninstaller(?:$|\s\()/,/Updater(?:$|\s\()/,/^\./],tYd=new Set(["com.apple.Safari","com.google.Chrome","com.microsoft.edgemac","org.mozilla.firefox","company.thebrowser.Browser","com.tinyspeck.slackmacgap","us.zoom.xos","com.microsoft.teams2","com.microsoft.teams","com.apple.MobileSMS","com.apple.mail","com.microsoft.Word","com.microsoft.Excel","com.microsoft.Powerpoint","com.microsoft.Outlook","com.apple.iWork.Pages","com.apple.iWork.Numbers","com.apple.iWork.Keynote","com.google.GoogleDocs","notion.id","com.apple.Notes","md.obsidian","com.linear","com.figma.Desktop","com.microsoft.VSCode","com.apple.Terminal","com.googlecode.iterm2","com.github.GitHubDesktop","com.apple.finder","com.apple.iCal","com.apple.systempreferences"]),nYd=/^[\p{L}\p{M}\p{N}_ .&'()+-]+$/u});
export {rYd,oYd,cua,sYd,iYd,uua,Zjd,eYd,tYd,nYd,dua};

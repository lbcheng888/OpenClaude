// @ts-nocheck
import {b} from "../runtime.ts";
function _qd(e,t){if(fqd.some((n)=>e.startsWith(n)))return!0;if(t){let n=t.endsWith("/")?`${t}Applications/`:`${t}/Applications/`;if(e.startsWith(n))return!0}return!1}
function yqd(e){return Aqd.some((t)=>t.test(e))}
function ora(e,t){let n=new Set;return e.map((r)=>r.trim()).filter((r)=>{if(!r)return!1;if(r.length>40)return!1;if(t&&!gqd.test(r))return!1;if(n.has(r))return!1;return n.add(r),!0}).sort((r,o)=>r.localeCompare(o))}
function Tqd(e){let t=ora(e,!0);if(t.length<=50)return t;return[...t.slice(0,50),`\u2026 and ${t.length-50} more`]}
function Sqd(e){return ora(e,!1)}
function sra(e,t){let{alwaysKept:n,rest:r}=e.reduce((i,a)=>{if(hqd.has(a.bundleId))i.alwaysKept.push(a.displayName);else if(_qd(a.path,t)&&!yqd(a.displayName))i.rest.push(a.displayName);return i},{alwaysKept:[],rest:[]}),o=Sqd(n),s=new Set(o);return[...o,...Tqd(r).filter((i)=>!s.has(i))]}
var fqd,Aqd,hqd,gqd;
var ira=b(()=>{fqd=["/Applications/","/System/Applications/"],Aqd=[/Helper(?:$|\s\()/,/Agent(?:$|\s\()/,/Service(?:$|\s\()/,/Uninstaller(?:$|\s\()/,/Updater(?:$|\s\()/,/^\./],hqd=new Set(["com.apple.Safari","com.google.Chrome","com.microsoft.edgemac","org.mozilla.firefox","company.thebrowser.Browser","com.tinyspeck.slackmacgap","us.zoom.xos","com.microsoft.teams2","com.microsoft.teams","com.apple.MobileSMS","com.apple.mail","com.microsoft.Word","com.microsoft.Excel","com.microsoft.Powerpoint","com.microsoft.Outlook","com.apple.iWork.Pages","com.apple.iWork.Numbers","com.apple.iWork.Keynote","com.google.GoogleDocs","notion.id","com.apple.Notes","md.obsidian","com.linear","com.figma.Desktop","com.microsoft.VSCode","com.apple.Terminal","com.googlecode.iterm2","com.github.GitHubDesktop","com.apple.finder","com.apple.iCal","com.apple.systempreferences"]),gqd=/^[\p{L}\p{M}\p{N}_ .&'()+-]+$/u});
export {_qd,yqd,ora,Tqd,Sqd,sra,fqd,Aqd,hqd,gqd,ira};

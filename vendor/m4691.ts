// @ts-nocheck
import {et,Ai} from "./m2208.ts";
import {gWn,hjt,_Wn,ybo} from "./m4690.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bfl(e){let t=Mfl.c(9),{onComplete:n,path:r,push:o,dryRun:s,force:i,unknownFlag:a}=e,l,c;if(t[0]!==s||t[1]!==i||t[2]!==n||t[3]!==r||t[4]!==o||t[5]!==a)l=()=>{d();async function d(){if(a!==void 0){n(a==="--help"||a==="-h"?Lfl:`${et.cross} Unexpected argument "${a}".

${Lfl}`);return}let p=await gWn(r??".",{force:i}),m=p.warnings.map(bJp);if(!p.ok){m.push(`${et.cross} ${p.error}`),n(m.join(`
`));return}let{plan:f}=p;if(m.push(`Plugin:  ${f.pluginName}`,`Version: ${f.version} (from ${f.versionFrom})`),f.marketplace)m.push(`Marketplace entry: plugins[${f.marketplace.entryIndex}] in ${f.marketplace.path}`+(f.marketplace.entryVersion?` (version: ${f.marketplace.entryVersion})`:""));m.push(`Tag:     ${f.tag}`,"");let A=`git -C ${f.gitRoot} push ${i?"--force ":""}origin refs/tags/${f.tag}`;if(s){m.push(`${et.tick} Dry run \u2014 would create tag ${f.tag} at HEAD in ${f.gitRoot}`,`  git -C ${f.gitRoot} tag ${i?"-f ":""}-a ${f.tag} -m "${hjt(f,void 0)}"`,`  ${A}`),n(m.join(`
`));return}let h=await _Wn(f,{push:o,force:i,message:void 0,remote:"origin"});if(!h.ok){m.push(`${et.cross} ${h.error}`),n(m.join(`
`));return}m.push(`${et.tick} Created tag ${f.tag}`),m.push(h.pushed?`${et.tick} Pushed to origin`:`  Push with: ${A}`),m.push("","For -m/--message and --remote, use: claude plugin tag --help"),n(m.join(`
`))}},c=[n,r,o,s,i,a],t[0]=s,t[1]=i,t[2]=n,t[3]=r,t[4]=o,t[5]=a,t[6]=l,t[7]=c;else l=t[6],c=t[7];Nfl.useEffect(l,c);let u;if(t[8]===Symbol.for("react.memo_cache_sentinel"))u=gjt.createElement(Box,{flexDirection:"column"},gjt.createElement(Text,null,"Preparing tag\u2026")),t[8]=u;else u=t[8];return u}
function bJp(e){return`${et.warning} ${e}`}
var Mfl,gjt,Nfl,Lfl=`Usage: /plugin tag [path] [--push] [--dry-run] [-f|--force]

Create a {name}--v{version} git tag for the plugin at <path> (default: .).
Validates plugin.json and any enclosing marketplace entry agree on the version.

For -m/--message and --remote, use the CLI: claude plugin tag --help`;
var Ffl=b(()=>{Ai();ze();ybo();Mfl=M(rt(),1),gjt=M(Te(),1),Nfl=M(Te(),1)});
export {Bfl,bJp,Mfl,gjt,Nfl,Lfl,Ffl};

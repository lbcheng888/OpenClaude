// @ts-nocheck
import {Xe,Zs} from "./m2216.ts";
import {nzn,OWt,rzn,Nwo} from "./m4722.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function OEl(e){let t=DEl.c(9),{onComplete:n,path:r,push:o,dryRun:s,force:i,unknownFlag:a}=e,l,c;if(t[0]!==s||t[1]!==i||t[2]!==n||t[3]!==r||t[4]!==o||t[5]!==a)l=()=>{d();async function d(){if(a!==void 0){n(a==="--help"||a==="-h"?xEl:`${Xe.cross} Unexpected argument "${a}".

${xEl}`);return}let p=await nzn(r??".",{force:i}),m=p.warnings.map(Osm);if(!p.ok){m.push(`${Xe.cross} ${p.error}`),n(m.join(`
`));return}let{plan:f}=p;if(m.push(`Plugin:  ${f.pluginName}`,`Version: ${f.version} (from ${f.versionFrom})`),f.marketplace)m.push(`Marketplace entry: plugins[${f.marketplace.entryIndex}] in ${f.marketplace.path}`+(f.marketplace.entryVersion?` (version: ${f.marketplace.entryVersion})`:""));m.push(`Tag:     ${f.tag}`,"");let h=`git -C ${f.gitRoot} push ${i?"--force ":""}origin refs/tags/${f.tag}`;if(s){m.push(`${Xe.tick} Dry run \u2014 would create tag ${f.tag} at HEAD in ${f.gitRoot}`,`  git -C ${f.gitRoot} tag ${i?"-f ":""}-a ${f.tag} -m "${OWt(f,void 0)}"`,`  ${h}`),n(m.join(`
`));return}let g=await rzn(f,{push:o,force:i,message:void 0,remote:"origin"});if(!g.ok){m.push(`${Xe.cross} ${g.error}`),n(m.join(`
`));return}m.push(`${Xe.tick} Created tag ${f.tag}`),m.push(g.pushed?`${Xe.tick} Pushed to origin`:`  Push with: ${h}`),m.push("","For -m/--message and --remote, use: claude plugin tag --help"),n(m.join(`
`))}},c=[n,r,o,s,i,a],t[0]=s,t[1]=i,t[2]=n,t[3]=r,t[4]=o,t[5]=a,t[6]=l,t[7]=c;else l=t[6],c=t[7];PEl.useEffect(l,c);let u;if(t[8]===Symbol.for("react.memo_cache_sentinel"))u=Fwo.jsx(Box,{flexDirection:"column",children:Fwo.jsx(Text,{children:"Preparing tag\u2026"})}),t[8]=u;else u=t[8];return u}
function Osm(e){return`${Xe.warning} ${e}`}
var DEl,PEl,Fwo,xEl=`Usage: /plugin tag [path] [--push] [--dry-run] [-f|--force]

Create a {name}--v{version} git tag for the plugin at <path> (default: .).
Validates plugin.json and any enclosing marketplace entry agree on the version.

For -m/--message and --remote, use the CLI: claude plugin tag --help`;
var LEl=b(()=>{Zs();je();Nwo();DEl=x(tt(),1),PEl=x(et(),1),Fwo=x(oe(),1)});
export {OEl,Osm,DEl,PEl,Fwo,xEl,LEl};

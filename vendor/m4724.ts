// @ts-nocheck
import {DWt,tzn} from "./m4721.ts";
import {Xe,Zs} from "./m2216.ts";
import {Sn,lr} from "./m233.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function FEl(e){let t=MEl.c(5),{onComplete:n,path:r}=e,o,s;if(t[0]!==n||t[1]!==r)o=()=>{(async function(){if(!r){n(`Usage: /plugin validate <path>

Validate a plugin or marketplace manifest file or directory.

Examples:
  /plugin validate .claude-plugin/plugin.json
  /plugin validate /path/to/plugin-directory
  /plugin validate .

When given a directory, automatically validates .claude-plugin/marketplace.json
or .claude-plugin/plugin.json (prefers marketplace if both exist).

Or from the command line:
  claude plugin validate <path>`);return}try{let c=await DWt(r),u="";if(u=u+`Validating ${c.fileType} manifest: ${c.filePath}

`,c.errors.length>0)u=u+`${Xe.cross} Found ${c.errors.length} ${Sn(c.errors.length,"error")}:

`,c.errors.forEach((d)=>{u=u+`  ${Xe.pointer} ${d.path}: ${d.message}
`}),u=u+`
`;if(c.warnings.length>0)u=u+`${Xe.warning} Found ${c.warnings.length} ${Sn(c.warnings.length,"warning")}:

`,c.warnings.forEach((d)=>{u=u+`  ${Xe.pointer} ${d.path}: ${d.message}
`}),u=u+`
`;if(c.success){if(c.warnings.length>0)u=u+`${Xe.tick} Validation passed with warnings
`;else u=u+`${Xe.tick} Validation passed
`;process.exitCode=0}else u=u+`${Xe.cross} Validation failed
`,process.exitCode=1;n(u)}catch(c){let u=c;process.exitCode=2,logForDebugging(`Plugin validation failed unexpectedly for ${r}: ${Ce(u)}`,{level:"error"}),n(`${Xe.cross} Unexpected error during validation: ${Ce(u)}`)}})()},s=[n,r],t[0]=n,t[1]=r,t[2]=o,t[3]=s;else o=t[2],s=t[3];NEl.useEffect(o,s);let i;if(t[4]===Symbol.for("react.memo_cache_sentinel"))i=Bwo.jsx(Box,{flexDirection:"column",children:Bwo.jsx(Text,{children:"Running validation..."})}),t[4]=i;else i=t[4];return i}
var MEl,NEl,Bwo;
var BEl=b(()=>{Zs();je();qe();Ct();tzn();lr();MEl=x(tt(),1),NEl=x(et(),1),Bwo=x(oe(),1)});
export {FEl,MEl,NEl,Bwo,BEl};

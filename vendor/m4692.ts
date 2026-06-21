// @ts-nocheck
import {fjt,hWn} from "./m4689.ts";
import {et,Ai} from "./m2208.ts";
import {Cn,dr} from "./m231.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function qfl(e){let t=Ufl.c(5),{onComplete:n,path:r}=e,o,s;if(t[0]!==n||t[1]!==r)o=()=>{(async function(){if(!r){n(`Usage: /plugin validate <path>

Validate a plugin or marketplace manifest file or directory.

Examples:
  /plugin validate .claude-plugin/plugin.json
  /plugin validate /path/to/plugin-directory
  /plugin validate .

When given a directory, automatically validates .claude-plugin/marketplace.json
or .claude-plugin/plugin.json (prefers marketplace if both exist).

Or from the command line:
  claude plugin validate <path>`);return}try{let c=await fjt(r),u="";if(u=u+`Validating ${c.fileType} manifest: ${c.filePath}

`,c.errors.length>0)u=u+`${et.cross} Found ${c.errors.length} ${Cn(c.errors.length,"error")}:

`,c.errors.forEach((d)=>{u=u+`  ${et.pointer} ${d.path}: ${d.message}
`}),u=u+`
`;if(c.warnings.length>0)u=u+`${et.warning} Found ${c.warnings.length} ${Cn(c.warnings.length,"warning")}:

`,c.warnings.forEach((d)=>{u=u+`  ${et.pointer} ${d.path}: ${d.message}
`}),u=u+`
`;if(c.success){if(c.warnings.length>0)u=u+`${et.tick} Validation passed with warnings
`;else u=u+`${et.tick} Validation passed
`;process.exitCode=0}else u=u+`${et.cross} Validation failed
`,process.exitCode=1;n(u)}catch(c){let u=c;process.exitCode=2,logForDebugging(`Plugin validation failed unexpectedly for ${r}: ${Se(u)}`,{level:"error"}),n(`${et.cross} Unexpected error during validation: ${Se(u)}`)}})()},s=[n,r],t[0]=n,t[1]=r,t[2]=o,t[3]=s;else o=t[2],s=t[3];$fl.useEffect(o,s);let i;if(t[4]===Symbol.for("react.memo_cache_sentinel"))i=_jt.createElement(Box,{flexDirection:"column"},_jt.createElement(Text,null,"Running validation...")),t[4]=i;else i=t[4];return i}
var Ufl,_jt,$fl;
var jfl=b(()=>{Ai();ze();qe();bt();hWn();dr();Ufl=M(rt(),1),_jt=M(Te(),1),$fl=M(Te(),1)});
export {qfl,Ufl,_jt,$fl,jfl};

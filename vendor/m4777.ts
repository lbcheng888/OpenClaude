// @ts-nocheck
import {Q} from "../runtime.ts";
var OAl=Q((PAl)=>{PAl.render=function(e,t,n){let r=e.modules.size,o=e.modules.data,s="\x1B[40m  \x1B[0m",i="\x1B[47m  \x1B[0m",a="",l=Array(r+3).join("\x1B[47m  \x1B[0m"),c=Array(2).join("\x1B[47m  \x1B[0m");a+=l+`
`;for(let u=0;u<r;++u){a+="\x1B[47m  \x1B[0m";for(let d=0;d<r;d++)a+=o[u*r+d]?"\x1B[40m  \x1B[0m":"\x1B[47m  \x1B[0m";a+=c+`
`}if(a+=l+`
`,typeof n==="function")n(null,a);return a}});
export {OAl};

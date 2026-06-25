// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {j0n} from "./m3084.ts";
import {yNt} from "./m3086.ts";
import {_ee} from "./m3078.ts";
import {I9e} from "./m3081.ts";
var _na=Q((pZg,gna)=>{var fna=oT(),_Jr=require("path"),D8d=j0n().copySync,hna=yNt().removeSync,P8d=_ee().mkdirpSync,mna=I9e();function O8d(e,t,n){n=n||{};let r=n.overwrite||n.clobber||!1,{srcStat:o,isChangingCase:s=!1}=mna.checkPathsSync(e,t,"move",n);if(mna.checkParentPathsSync(e,o,t,"move"),!L8d(t))P8d(_Jr.dirname(t));return M8d(e,t,r,s)}function L8d(e){let t=_Jr.dirname(e);return _Jr.parse(t).root===t}function M8d(e,t,n,r){if(r)return gJr(e,t,n);if(n)return hna(t),gJr(e,t,n);if(fna.existsSync(t))throw Error("dest already exists.");return gJr(e,t,n)}function gJr(e,t,n){try{fna.renameSync(e,t)}catch(r){if(r.code!=="EXDEV")throw r;return N8d(e,t,n)}}function N8d(e,t,n){return D8d(e,t,{overwrite:n,errorOnExist:!0}),hna(e)}gna.exports=O8d});
export {_na};

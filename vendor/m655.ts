// @ts-nocheck
import {Q} from "../runtime.ts";
var Eos=Q((txf,$yr)=>{var bos=(e={})=>{let t=e.env||process.env;if((e.platform||"darwin")!=="win32")return"PATH";return Object.keys(t).reverse().find((r)=>r.toUpperCase()==="PATH")||"Path"};$yr.exports=bos;$yr.exports.default=bos});
export {Eos};

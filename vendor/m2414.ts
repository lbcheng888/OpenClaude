// @ts-nocheck
import {b} from "../runtime.ts";
import {r2e} from "./m2359.ts";
function Lqr(e,t=1,n={}){let{indent:r=" ",includeEmptyLines:o=!1}=n;if(typeof e!=="string")throw TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);if(typeof t!=="number")throw TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);if(t<0)throw RangeError(`Expected \`count\` to be at least 0, got \`${t}\``);if(typeof r!=="string")throw TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r}\``);if(t===0)return e;let s=o?/^/gm:/^(?!\s*$)/gm;return e.replace(s,r.repeat(t))}
var G_d=(e)=>e.getComputedWidth()-e.getComputedPadding(0)-e.getComputedPadding(2)-e.getComputedBorder(0)-e.getComputedBorder(2),a0i;
var l0i=b(()=>{r2e();a0i=G_d});
export {Lqr,G_d,a0i,l0i};

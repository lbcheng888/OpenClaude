// @ts-nocheck
import {b} from "../runtime.ts";
import {sUe} from "./m2349.ts";
function o$r(e,t=1,n={}){let{indent:r=" ",includeEmptyLines:o=!1}=n;if(typeof e!=="string")throw TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);if(typeof t!=="number")throw TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);if(t<0)throw RangeError(`Expected \`count\` to be at least 0, got \`${t}\``);if(typeof r!=="string")throw TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r}\``);if(t===0)return e;let s=o?/^/gm:/^(?!\s*$)/gm;return e.replace(s,r.repeat(t))}
var yad=(e)=>e.getComputedWidth()-e.getComputedPadding(0)-e.getComputedPadding(2)-e.getComputedBorder(0)-e.getComputedBorder(2),zCi;
var YCi=b(()=>{sUe();zCi=yad});
export {o$r,yad,zCi,YCi};

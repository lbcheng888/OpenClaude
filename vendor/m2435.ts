// @ts-nocheck
import {useIsScreenReaderEnabled,dwe} from "./m2434.ts";
import {b} from "../runtime.ts";
function Decorative(e){let{children:t,fallback:n}=e;return useIsScreenReaderEnabled()?n??null:t}
var nwi=b(()=>{dwe()});
export {Decorative,nwi};

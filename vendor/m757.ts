// @ts-nocheck
import {X} from "../runtime.ts";
var pos=X((dos)=>{function zZc(e){let t={};if(e=e.replace(/^\?/,""),e)for(let n of e.split("&")){let[r,o=null]=n.split("=");if(r=decodeURIComponent(r),o)o=decodeURIComponent(o);if(!(r in t))t[r]=o;else if(Array.isArray(t[r]))t[r].push(o);else t[r]=[t[r],o]}return t}dos.parseQueryString=zZc});
export {pos};

// @ts-nocheck
import {Q} from "../runtime.ts";
var ius=Q((sus)=>{function uuu(e){let t={};if(e=e.replace(/^\?/,""),e)for(let n of e.split("&")){let[r,o=null]=n.split("=");if(r=decodeURIComponent(r),o)o=decodeURIComponent(o);if(!(r in t))t[r]=o;else if(Array.isArray(t[r]))t[r].push(o);else t[r]=[t[r],o]}return t}sus.parseQueryString=uuu});
export {ius};

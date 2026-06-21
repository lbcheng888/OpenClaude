// @ts-nocheck
import {b} from "../runtime.ts";
import {ZE,er} from "./m460.ts";
var qUc,mKo=(e)=>{let t={},n,r,o;return e&&e.split(`
`).forEach(function(i){if(o=i.indexOf(":"),n=i.substring(0,o).trim().toLowerCase(),r=i.substring(o+1).trim(),!n||t[n]&&qUc[n])return;if(n==="set-cookie")if(t[n])t[n].push(r);else t[n]=[r];else t[n]=t[n]?t[n]+", "+r:r}),t};
var fKo=b(()=>{ZE();qUc=er.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"])});
export {qUc,mKo,fKo};

// @ts-nocheck
import {SOr} from "./m1677.ts";
import {b} from "../runtime.ts";
import {XAe} from "./m1679.ts";
async function Q6u(e,t,n){async function r(){if(Date.now()<n)try{return await e()}catch(s){return null}else{let s=await e();if(s===null)throw Error("Failed to refresh access token.");return s}}let o=await r();while(o===null)await SOr(t),o=await r();return o}
function TJs(e,t){let n=null,r=null,o,s=Object.assign(Object.assign({},X6u),t),i={get isRefreshing(){return n!==null},get shouldRefresh(){var l;if(i.isRefreshing)return!1;if((r===null||r===void 0?void 0:r.refreshAfterTimestamp)&&r.refreshAfterTimestamp<Date.now())return!0;return((l=r===null||r===void 0?void 0:r.expiresOnTimestamp)!==null&&l!==void 0?l:0)-s.refreshWindowInMs<Date.now()},get mustRefresh(){return r===null||r.expiresOnTimestamp-s.forcedRefreshWindowInMs<Date.now()}};function a(l,c){var u;if(!i.isRefreshing)n=Q6u(()=>e.getToken(l,c),s.retryIntervalInMs,(u=r===null||r===void 0?void 0:r.expiresOnTimestamp)!==null&&u!==void 0?u:Date.now()).then((p)=>(n=null,r=p,o=c.tenantId,r)).catch((p)=>{throw n=null,r=null,o=void 0,p});return n}return async(l,c)=>{let u=Boolean(c.claims),d=o!==c.tenantId;if(u)r=null;if(d||u||i.mustRefresh)return a(l,c);if(i.shouldRefresh)a(l,c);return r}}
var X6u;
var SJs=b(()=>{XAe();X6u={forcedRefreshWindowInMs:1000,retryIntervalInMs:3000,refreshWindowInMs:120000}});
export {Q6u,TJs,X6u,SJs};

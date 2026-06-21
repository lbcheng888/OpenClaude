// @ts-nocheck
import {b} from "../runtime.ts";
async function jGu(e){return(await lMr).getRandomValues(new Uint8Array(e))}
async function WGu(e){let n="",r=await jGu(e);for(let o=0;o<e;o++){let s=r[o]%66;n+="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"[s]}return n}
async function GGu(e){return await WGu(e)}
async function VGu(e){let t=await(await lMr).subtle.digest("SHA-256",new TextEncoder().encode(e));return btoa(String.fromCharCode(...new Uint8Array(t))).replace(/\//g,"_").replace(/\+/g,"-").replace(/=/g,"")}
async function cMr(e){if(!e)e=43;if(e<43||e>128)throw`Expected a length between 43 and 128. Received ${e}.`;let t=await GGu(e),n=await VGu(t);return{code_verifier:t,code_challenge:n}}
var lMr;
var Tni=b(()=>{lMr=globalThis.crypto?.webcrypto??globalThis.crypto??import("crypto").then((e)=>e.webcrypto)});
export {jGu,WGu,GGu,VGu,cMr,lMr,Tni};

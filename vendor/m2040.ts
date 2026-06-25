// @ts-nocheck
import {b} from "../runtime.ts";
async function ltd(e){return(await MBr).getRandomValues(new Uint8Array(e))}
async function ctd(e){let n="",r=await ltd(e);for(let o=0;o<e;o++){let s=r[o]%66;n+="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"[s]}return n}
async function utd(e){return await ctd(e)}
async function dtd(e){let t=await(await MBr).subtle.digest("SHA-256",new TextEncoder().encode(e));return btoa(String.fromCharCode(...new Uint8Array(t))).replace(/\//g,"_").replace(/\+/g,"-").replace(/=/g,"")}
async function NBr(e){if(!e)e=43;if(e<43||e>128)throw`Expected a length between 43 and 128. Received ${e}.`;let t=await utd(e),n=await dtd(t);return{code_verifier:t,code_challenge:n}}
var MBr;
var hli=b(()=>{MBr=globalThis.crypto?.webcrypto??globalThis.crypto??import("crypto").then((e)=>e.webcrypto)});
export {ltd,ctd,utd,dtd,NBr,MBr,hli};

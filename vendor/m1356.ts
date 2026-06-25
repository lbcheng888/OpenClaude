// @ts-nocheck
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var S9s,createCredentialChain=(...e)=>{let t=-1,r=Object.assign(async(o)=>{let s=await propertyProviderChain(...e)(o);if(!s.expiration&&t!==-1)s.expiration=new Date(Date.now()+t);return s},{expireAfter(o){if(o<300000)throw Error("@aws-sdk/credential-providers - createCredentialChain(...).expireAfter(ms) may not be called with a duration lower than five minutes.");return t=o,r}});return r},propertyProviderChain=(...e)=>async(t)=>{if(e.length===0)throw new S9s.ProviderError("No providers in chain",{tryNextLink:!1});let n;for(let r of e)try{return await r(t)}catch(o){if(n=o,o?.tryNextLink)continue;throw o}throw n};
var E9s=b(()=>{S9s=x(Vg(),1)});
export {S9s,createCredentialChain,propertyProviderChain,E9s};

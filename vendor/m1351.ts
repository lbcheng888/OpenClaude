// @ts-nocheck
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var vNs,createCredentialChain=(...e)=>{let t=-1,r=Object.assign(async(o)=>{let s=await propertyProviderChain(...e)(o);if(!s.expiration&&t!==-1)s.expiration=new Date(Date.now()+t);return s},{expireAfter(o){if(o<300000)throw Error("@aws-sdk/credential-providers - createCredentialChain(...).expireAfter(ms) may not be called with a duration lower than five minutes.");return t=o,r}});return r},propertyProviderChain=(...e)=>async(t)=>{if(e.length===0)throw new vNs.ProviderError("No providers in chain",{tryNextLink:!1});let n;for(let r of e)try{return await r(t)}catch(o){if(n=o,o?.tryNextLink)continue;throw o}throw n};
var RNs=b(()=>{vNs=M(createDefaultGlobalConfig(),1)});
export {vNs,createCredentialChain,propertyProviderChain,RNs};

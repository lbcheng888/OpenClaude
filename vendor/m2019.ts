// @ts-nocheck
import {isFullscreenWithTTY,M,b} from "../runtime.ts";
import {UAn} from "./m2013.ts";
var dti={};
isFullscreenWithTTY(dti,{vertexAuthFetch:()=>vertexAuthFetch,buildVertexGoogleAuth:()=>buildVertexGoogleAuth});
async function buildVertexGoogleAuth(e,t){if(e.kind==="skip")return{getClient:()=>({getRequestHeaders:async()=>new Headers})};let{GoogleAuth:n}=await Promise.resolve().then(() => M(UAn(),1));return new n({scopes:TWu,...e.kind==="keyFile"&&{keyFilename:e.path},...t&&{projectId:t},clientOptions:{transporterOptions:{fetchImplementation:vertexAuthFetch}}})}
async function vertexAuthFetch(e,t){let n=t?.agent?.options;if(!n?.cert&&!n?.key)return fetch(e,t);let r={cert:n.cert,key:n.key,...n.ca&&{ca:n.ca}};return fetch(e,{...t,tls:r})}
var TWu;
var GAn=b(()=>{TWu=["https://www.googleapis.com/auth/cloud-platform"]});
export {dti,buildVertexGoogleAuth,vertexAuthFetch,TWu,GAn};

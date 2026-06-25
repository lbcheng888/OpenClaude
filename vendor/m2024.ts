// @ts-nocheck
import {ft,x,b} from "../runtime.ts";
import {Eyn} from "./m2018.ts";
var iai={};
ft(iai,{vertexAuthFetch:()=>vertexAuthFetch,buildVertexGoogleAuth:()=>buildVertexGoogleAuth});
async function buildVertexGoogleAuth(e,t){if(e.kind==="skip")return{getClient:()=>({getRequestHeaders:async()=>new Headers})};let{GoogleAuth:n}=await Promise.resolve().then(() => x(Eyn(),1));return new n({scopes:BZu,...e.kind==="keyFile"&&{keyFilename:e.path},...t&&{projectId:t},clientOptions:{transporterOptions:{fetchImplementation:vertexAuthFetch}}})}
async function vertexAuthFetch(e,t){let n=t?.agent?.options;if(!n?.cert&&!n?.key)return fetch(e,t);let r={cert:n.cert,key:n.key,...n.ca&&{ca:n.ca}};return fetch(e,{...t,tls:r})}
var BZu;
var wyn=b(()=>{BZu=["https://www.googleapis.com/auth/cloud-platform"]});
export {iai,buildVertexGoogleAuth,vertexAuthFetch,BZu,wyn};

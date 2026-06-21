// @ts-nocheck
import {b} from "../runtime.ts";
var khu="***SensitiveInformation***";
var VSr=(e,t)=>{for(let n of Object.keys(e)){let r=e[n],o=async function(i,a,l){let c=new r(i);if(typeof a==="function")this.send(c,a);else if(typeof l==="function"){if(typeof a!=="object")throw Error(`Expected http options but got ${typeof a}`);this.send(c,a||{},l)}else return this.send(c,a)},s=(n[0].toLowerCase()+n.slice(1)).replace(/Command$/,"");t.prototype[s]=o}};
var EEe,KSr=(e,t={})=>{Object.entries(t).filter(([,r])=>r!==void 0).forEach(([r,o])=>{if(e[r]==null||e[r]==="")e[r]=o});let n=e.message||e.Message||"UnknownError";return e.message=n,delete e.Message,e};
var zSr=b(()=>{EEe=class EEe extends Error{$fault;$response;$retryable;$metadata;constructor(e){super(e.message);Object.setPrototypeOf(this,Object.getPrototypeOf(this).constructor.prototype),this.name=e.name,this.$fault=e.$fault,this.$metadata=e.$metadata}static isInstance(e){if(!e)return!1;let t=e;return EEe.prototype.isPrototypeOf(t)||Boolean(t.$fault)&&Boolean(t.$metadata)&&(t.$fault==="client"||t.$fault==="server")}static[Symbol.hasInstance](e){if(!e)return!1;let t=e;if(this===EEe)return EEe.isInstance(e);if(EEe.isInstance(e)){if(t.name&&this.name)return this.prototype.isPrototypeOf(e)||t.name===this.name;return this.prototype.isPrototypeOf(e)}return!1}}});
export {khu,VSr,EEe,KSr,zSr};

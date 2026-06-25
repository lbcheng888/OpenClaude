// @ts-nocheck
import {Q} from "../runtime.ts";
var pro=Q((Sx_,MSa)=>{MSa.exports=rop;function rop(e,t){var n=Array(arguments.length-1),r=0,o=2,s=!0;while(o<arguments.length)n[r++]=arguments[o++];return new Promise(function(a,l){n[r]=function(u){if(s)if(s=!1,u)l(u);else{var d=Array(arguments.length-1),p=0;while(p<d.length)d[p++]=arguments[p];a.apply(null,d)}};try{e.apply(t||null,n)}catch(c){if(s)s=!1,l(c)}})}});
export {pro};

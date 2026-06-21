// @ts-nocheck
import {X} from "../runtime.ts";
var nur=X((vaf,r8o)=>{r8o.exports=function e(t,n){if(t===n)return!0;if(t&&n&&typeof t=="object"&&typeof n=="object"){if(t.constructor!==n.constructor)return!1;var r,o,s;if(Array.isArray(t)){if(r=t.length,r!=n.length)return!1;for(o=r;o--!==0;)if(!e(t[o],n[o]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if(s=Object.keys(t),r=s.length,r!==Object.keys(n).length)return!1;for(o=r;o--!==0;)if(!Object.prototype.hasOwnProperty.call(n,s[o]))return!1;for(o=r;o--!==0;){var i=s[o];if(!e(t[i],n[i]))return!1}return!0}return t!==t&&n!==n}});
export {nur};

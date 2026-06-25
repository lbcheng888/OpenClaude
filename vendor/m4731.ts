// @ts-nocheck
import {Q} from "../runtime.ts";
var XEl=Q((YnS,JEl)=>{function YEl(){this.buffer=[],this.length=0}YEl.prototype={get:function(e){let t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);if(this.buffer.length<=t)this.buffer.push(0);if(e)this.buffer[t]|=128>>>this.length%8;this.length++}};JEl.exports=YEl});
export {XEl};

// @ts-nocheck
import {Q} from "../runtime.ts";
import {DPe} from "./m4742.ts";
var SCl=Q((urS,TCl)=>{var kim=DPe(),Zwo=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Bht(e){this.mode=kim.ALPHANUMERIC,this.data=e}Bht.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};Bht.prototype.getLength=function(){return this.data.length};Bht.prototype.getBitsLength=function(){return Bht.getBitsLength(this.data.length)};Bht.prototype.write=function(t){let n;for(n=0;n+2<=this.data.length;n+=2){let r=Zwo.indexOf(this.data[n])*45;r+=Zwo.indexOf(this.data[n+1]),t.put(r,11)}if(this.data.length%2)t.put(Zwo.indexOf(this.data[n]),6)};TCl.exports=Bht});
export {SCl};

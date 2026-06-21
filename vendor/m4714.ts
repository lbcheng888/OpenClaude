// @ts-nocheck
import {X} from "../runtime.ts";
import {ODe} from "./m4710.ts";
var CAl=X((a5y,EAl)=>{var AXp=ODe(),Obo=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Rmt(e){this.mode=AXp.ALPHANUMERIC,this.data=e}Rmt.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};Rmt.prototype.getLength=function(){return this.data.length};Rmt.prototype.getBitsLength=function(){return Rmt.getBitsLength(this.data.length)};Rmt.prototype.write=function(t){let n;for(n=0;n+2<=this.data.length;n+=2){let r=Obo.indexOf(this.data[n])*45;r+=Obo.indexOf(this.data[n+1]),t.put(r,11)}if(this.data.length%2)t.put(Obo.indexOf(this.data[n]),6)};EAl.exports=Rmt});
export {CAl};

// @ts-nocheck
import {X} from "../runtime.ts";
import {DDe} from "./m4697.ts";
var TAl=X((yAl)=>{var Pbo=DDe(),_Al=Pbo.getBCHDigit(1335);yAl.getEncodedBits=function(t,n){let r=t.bit<<3|n,o=r<<10;while(Pbo.getBCHDigit(o)-_Al>=0)o^=1335<<Pbo.getBCHDigit(o)-_Al;return(r<<10|o)^21522}});
export {TAl};

// @ts-nocheck
import {Q} from "../runtime.ts";
import {M4t} from "./m4156.ts";
import {rfo} from "./m4116.ts";
import {UGa} from "./m4157.ts";
import {agentMcpClients} from "./m4115.ts";
import {qGa} from "./m4158.ts";
import {GGa} from "./m4159.ts";
import {fho} from "./m4160.ts";
var hho=Q((KAy,KGa)=>{var H1p=M4t(),I1p=rfo(),x1p=UGa(),F4t=agentMcpClients();KGa.exports=Z4n;function Z4n(e){this.document=e||new H1p(null).createHTMLDocument(""),this.document._scripting_enabled=!0,this.document.defaultView=this,this.location=new x1p(this,this.document._address||"about:blank")}Z4n.prototype=Object.create(I1p.prototype,{console:{value:console},history:{value:{back:F4t.nyi,forward:F4t.nyi,go:F4t.nyi}},navigator:{value:qGa()},window:{get:function(){return this}},self:{get:function(){return this}},frames:{get:function(){return this}},parent:{get:function(){return this}},top:{get:function(){return this}},length:{value:0},frameElement:{value:null},opener:{value:null},onload:{get:function(){return this._getEventHandler("load")},set:function(e){this._setEventHandler("load",e)}},getComputedStyle:{value:function(t){return t.style}}});F4t.expose(GGa(),Z4n);F4t.expose(fho(),Z4n)});
export {hho};

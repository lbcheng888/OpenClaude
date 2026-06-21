// @ts-nocheck
import {MSt,dZt,pZt} from "./m430.ts";
import {b,M} from "../runtime.ts";
class lMe{constructor(e=Edr.default.stdin,t=Edr.default.stdout){this._stdin=e,this._stdout=t,this._readBuffer=new MSt,this._started=!1,this._ondata=(n)=>{this._readBuffer.append(n),this.processReadBuffer()},this._onerror=(n)=>{this.onerror?.(n)}}async start(){if(this._started)throw Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");this._started=!0,this._stdin.on("data",this._ondata),this._stdin.on("error",this._onerror)}processReadBuffer(){while(!0)try{let e=this._readBuffer.readMessage();if(e===null)break;this.onmessage?.(e)}catch(e){this.onerror?.(e)}}async close(){if(this._stdin.off("data",this._ondata),this._stdin.off("error",this._onerror),this._stdin.listenerCount("data")===0)this._stdin.pause();this._readBuffer.clear(),this.onclose?.()}send(e){return new Promise((t)=>{let n=dZt(e);if(this._stdout.write(n))t();else this._stdout.once("drain",t)})}}
var Edr;
var mZt=b(()=>{pZt();Edr=M(require("process"))});
export {lMe,Edr,mZt};

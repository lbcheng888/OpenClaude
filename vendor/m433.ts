// @ts-nocheck
import {lAt,Gtn,Vtn} from "./m432.ts";
import {b,x} from "../runtime.ts";
class t1e{constructor(e=Jhr.default.stdin,t=Jhr.default.stdout){this._stdin=e,this._stdout=t,this._readBuffer=new lAt,this._started=!1,this._ondata=(n)=>{this._readBuffer.append(n),this.processReadBuffer()},this._onerror=(n)=>{this.onerror?.(n)}}async start(){if(this._started)throw Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");this._started=!0,this._stdin.on("data",this._ondata),this._stdin.on("error",this._onerror)}processReadBuffer(){while(!0)try{let e=this._readBuffer.readMessage();if(e===null)break;this.onmessage?.(e)}catch(e){this.onerror?.(e)}}async close(){if(this._stdin.off("data",this._ondata),this._stdin.off("error",this._onerror),this._stdin.listenerCount("data")===0)this._stdin.pause();this._readBuffer.clear(),this.onclose?.()}send(e){return new Promise((t)=>{let n=Gtn(e);if(this._stdout.write(n))t();else this._stdout.once("drain",t)})}}
var Jhr;
var Ktn=b(()=>{Vtn();Jhr=x(require("process"))});
export {t1e,Jhr,Ktn};

// @ts-nocheck
import {Q} from "../runtime.ts";
import {wMn} from "./m3466.ts";
import {pba} from "./m3467.ts";
import {HMn} from "./m3468.ts";
import {bba} from "./m3469.ts";
import {ple} from "./m3465.ts";
import {wro} from "./m3471.ts";
import {kro} from "./m3472.ts";
var Hro=Q((wba)=>{var yq=wba;yq.build="minimal";yq.Writer=wMn();yq.BufferWriter=pba();yq.Reader=HMn();yq.BufferReader=bba();yq.util=ple();yq.rpc=wro();yq.roots=kro();yq.configure=vba;function vba(){yq.util._configure(),yq.Writer._configure(yq.BufferWriter),yq.Reader._configure(yq.BufferReader)}vba()});
export {Hro};

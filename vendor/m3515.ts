// @ts-nocheck
import {X} from "../runtime.ts";
var TZr=X((sBt)=>{Object.defineProperty(sBt,"__esModule",{value:!0});sBt.CIPHER_SUITES=void 0;sBt.getDefaultRootsData=hJd;var AJd=require("fs");sBt.CIPHER_SUITES=process.env.GRPC_SSL_CIPHER_SUITES;var KAa=process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH,yZr=null;function hJd(){if(KAa){if(yZr===null)yZr=AJd.readFileSync(KAa);return yZr}return null}});
export {TZr};

// @ts-nocheck
import {Q} from "../runtime.ts";
var b0=Q((hYe)=>{var Ibr={warningEmitted:!1},Zcu=(e)=>{if(e&&!Ibr.warningEmitted&&parseInt(e.substring(1,e.indexOf(".")))<18)Ibr.warningEmitted=!0,process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)};function euu(e,t,n){if(!e.$source)e.$source={};return e.$source[t]=n,e}function tuu(e,t,n){if(!e.__aws_sdk_context)e.__aws_sdk_context={features:{}};else if(!e.__aws_sdk_context.features)e.__aws_sdk_context.features={};e.__aws_sdk_context.features[t]=n}function nuu(e,t,n){if(!e.$source)e.$source={};return e.$source[t]=n,e}hYe.emitWarningIfUnsupportedVersion=Zcu;hYe.setCredentialFeature=euu;hYe.setFeature=tuu;hYe.setTokenFeature=nuu;hYe.state=Ibr});
export {b0};

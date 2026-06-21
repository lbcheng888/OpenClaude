// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
var Epr={};
isFullscreenWithTTY(Epr,{origin:()=>origin,navigator:()=>navigator,hasStandardBrowserWebWorkerEnv:()=>hasStandardBrowserWebWorkerEnv,hasStandardBrowserEnv:()=>hasStandardBrowserEnv,hasBrowserEnv:()=>hasBrowserEnv});
var hasBrowserEnv,navigator,hasStandardBrowserEnv,hasStandardBrowserWebWorkerEnv,origin;
var dKo=b(()=>{hasBrowserEnv=typeof window<"u"&&typeof document<"u",navigator=typeof navigator==="object"&&navigator||void 0,hasStandardBrowserEnv=hasBrowserEnv&&(!navigator||["ReactNative","NativeScript","NS"].indexOf(navigator.product)<0),hasStandardBrowserWebWorkerEnv=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts==="function")(),origin=hasBrowserEnv&&window.location.href||"http://localhost"});
export {Epr,hasBrowserEnv,navigator,hasStandardBrowserEnv,hasStandardBrowserWebWorkerEnv,origin,dKo};

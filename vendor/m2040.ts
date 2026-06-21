// @ts-nocheck
import {b} from "../runtime.ts";
function SMr(e){return e.replace(/[&<>"']/g,(t)=>dVu[t]??t)}
function Pse(e){let{ok:t,heading:n,message:r,detail:o}=e,s=t?'<span class="status">Connected</span>':'<span class="status err">Error</span>',i=o?`<div class="detail">${SMr(o)}</div>`:"",a=t?"<script>setTimeout(function(){try{window.close()}catch(e){}},1500)</script>":"";return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Claude Code</title><style>${pVu}</style></head><body><main>${s}<h1>${SMr(n)}</h1><p class="sub">${SMr(r)}</p>${i}</main>${a}</body></html>`}
var dVu,pVu=`*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
body{min-height:100vh;background:#FAF9F5;color:#141413;font:15px/1.5 ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;display:flex;align-items:center;justify-content:center;padding:48px 24px}
main{width:100%;max-width:560px}
.status{display:inline-flex;align-items:center;gap:8px;padding:4px 10px 4px 8px;border-radius:999px;background:rgba(85,138,66,.10);color:#345C28;font-size:12.5px;font-weight:500;letter-spacing:-.005em;margin-bottom:20px}
.status::before{content:"";width:6px;height:6px;border-radius:50%;background:#558A42;box-shadow:0 0 0 3px rgba(85,138,66,.18)}
.status.err{background:rgba(166,50,68,.08);color:#671D28}
.status.err::before{background:#A63244;box-shadow:0 0 0 3px rgba(166,50,68,.15)}
h1{font-family:ui-serif,Charter,"Iowan Old Style",Georgia,serif;font-weight:400;font-size:32px;line-height:1.15;letter-spacing:-.02em;margin:0 0 10px;text-wrap:balance}
.sub{margin:0;color:#4D4C48;font-size:15px;line-height:1.55;max-width:52ch}
.detail{margin-top:20px;background:#FFF;border:.5px solid rgba(31,30,29,.15);border-left:3px solid #A63244;border-radius:10px;padding:14px 16px;font-size:14px;line-height:1.5;color:#3D3D3A;word-break:break-word}
@media (max-width:520px){h1{font-size:26px}body{padding:32px 18px}}`;
var bMr=b(()=>{dVu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}});
export {SMr,Pse,dVu,pVu,bMr};

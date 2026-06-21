// @ts-nocheck
import {b} from "../runtime.ts";
function d9n({feedback:e,contentBlocks:t,isSubagent:n}){return!e&&!t?.length&&!n}
var R9t,Kuo,p9n,m9n,kqa,Hqa,Iqa;
var f9n=b(()=>{R9t=["python","python3","python2","node","deno","tsx","ruby","perl","php","lua","npx","bunx","npm run","yarn run","pnpm run","bun run","bash","sh","ssh"],Kuo=[...R9t,"zsh","fish","eval","exec","env","xargs","sudo"],p9n=["curl","wget","kubectl","aws","gcloud","gsutil"],m9n=[],kqa=new Set([...p9n,...m9n]),Hqa={kubectl:new Set(["exec","apply","create","delete","run","cp","port-forward","proxy","patch","edit","replace","attach","debug","scale","rollout","drain","cordon","taint"]),...!1},Iqa=[...Kuo,...[]]});
export {d9n,R9t,Kuo,p9n,m9n,kqa,Hqa,Iqa,f9n};

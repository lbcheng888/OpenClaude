// @ts-nocheck
import {zZe,Owi,G$r,ibn} from "../src/artifact/2463_Global.ts";
import {KZe,rbn} from "../src/artifact/2461_context.ts";
import {_0t,j$r,W$r,sbn} from "./m2461.ts";
import {ap,BE} from "./m5006.ts";
import {D5,FZ} from "../src/telemetry/2465_bindings.ts";
import {b} from "../runtime.ts";
import {Xt,Le} from "../src/config/0228_encoding.ts";
function X1m(){return FLo(["Context","Description"],zZe.map((e)=>[`\`${e}\``,Owi[e]]))}
function Q1m(){let e={};for(let t of KZe)for(let[n,r]of Object.entries(t.bindings))if(r){if(!e[r])e[r]={keys:[],context:t.context};e[r].keys.push(n)}return FLo(["Action","Default Key(s)","Context"],G$r.map((t)=>{let n=e[t],r=n?n.keys.map((s)=>`\`${s}\``).join(", "):"(none)",o=n?n.context:Z1m(t);return[`\`${t}\``,r,o]}))}
function Z1m(e){let t=e.split(":")[0];return{app:"Global",history:"Global or Chat",chat:"Chat",autocomplete:"Autocomplete",confirm:"Confirmation",tabs:"Tabs",transcript:"Transcript",historySearch:"HistorySearch",task:"Task",theme:"ThemePicker",help:"Help",attachments:"Attachments",footer:"Footer",messageSelector:"MessageSelector",diff:"DiffDialog",modelPicker:"ModelPicker",select:"Select",permission:"Confirmation"}[t??""]??"Unknown"}
function eNm(){let e=[];e.push("### Non-rebindable (errors)");for(let t of _0t)e.push(`- \`${t.key}\` \u2014 ${t.reason}`);e.push(""),e.push("### Terminal reserved (errors/warnings)");for(let t of j$r)e.push(`- \`${t.key}\` \u2014 ${t.reason} (${t.severity==="error"?"will not work":"may conflict"})`);e.push(""),e.push("### macOS reserved (errors)");for(let t of W$r)e.push(`- \`${t.key}\` \u2014 ${t.reason}`);return e.join(`
`)}
function NKl(){ap({name:"keybindings-help",description:'Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".',allowedTools:["Read"],userInvocable:!1,isEnabled:D5,async getPromptForCommand(e){let t=X1m(),n=Q1m(),r=eNm(),o=[sNm,iNm,aNm,lNm,cNm,uNm,dNm,pNm,`## Reserved Shortcuts

${r}`,`## Available Contexts

${t}`,`## Available Actions

${n}`];if(e)o.push(`## User Request

${e}`);return[{type:"text",text:o.join(`

`)}]}})}
function FLo(e,t){let n=e.map(()=>"---");return[`| ${e.join(" | ")} |`,`| ${n.join(" | ")} |`,...t.map((r)=>`| ${r.join(" | ")} |`)].join(`
`)}
var tNm,nNm,rNm,oNm,sNm,iNm,aNm,lNm,cNm,uNm,dNm,pNm;
var BKl=b(()=>{rbn();FZ();sbn();ibn();Xt();BE();tNm={$schema:"https://www.schemastore.org/claude-code-keybindings.json",$docs:"https://code.claude.com/docs/en/keybindings",bindings:[{context:"Chat",bindings:{"ctrl+e":"chat:externalEditor"}}]},nNm={context:"Chat",bindings:{"ctrl+s":null}},rNm={context:"Chat",bindings:{"ctrl+g":null,"ctrl+e":"chat:externalEditor"}},oNm={context:"Global",bindings:{"ctrl+k ctrl+t":"app:toggleTodos"}},sNm=["# Keybindings Skill","","Create or modify `~/.claude/keybindings.json` to customize keyboard shortcuts.","","## CRITICAL: Read Before Write","","**Always read `~/.claude/keybindings.json` first** (it may not exist yet). Merge changes with existing bindings \u2014 never replace the entire file.","","- Use **Edit** tool for modifications to existing files","- Use **Write** tool only if the file does not exist yet"].join(`
`),iNm=["## File Format","","```json",Le(tNm,null,2),"```","","Always include the `$schema` and `$docs` fields."].join(`
`),aNm=["## Keystroke Syntax","","**Modifiers** (combine with `+`):","- `ctrl` (alias: `control`)","- `alt` (aliases: `opt`, `option`) \u2014 note: `alt` and `meta` are identical in terminals","- `shift`","- `meta` (aliases: `cmd`, `command`)","","**Special keys**: `escape`/`esc`, `enter`/`return`, `tab`, `space`, `backspace`, `delete`, `up`, `down`, `left`, `right`","","**Chords**: Space-separated keystrokes, e.g. `ctrl+k ctrl+s` (1-second timeout between keystrokes)","","**Examples**: `ctrl+shift+p`, `alt+enter`, `ctrl+k ctrl+n`"].join(`
`),lNm=["## Unbinding Default Shortcuts","","Set a key to `null` to remove its default binding:","","```json",Le(nNm,null,2),"```"].join(`
`),cNm=["## How User Bindings Interact with Defaults","","- User bindings are **additive** \u2014 they are appended after the default bindings","- To **move** a binding to a different key: unbind the old key (`null`) AND add the new binding","- A context only needs to appear in the user's file if they want to change something in that context"].join(`
`),uNm=["## Common Patterns","","### Rebind a key","To change the external editor shortcut from `ctrl+g` to `ctrl+e`:","```json",Le(rNm,null,2),"```","","### Add a chord binding","```json",Le(oNm,null,2),"```"].join(`
`),dNm=["## Behavioral Rules","","1. Only include contexts the user wants to change (minimal overrides)","2. Validate that actions and contexts are from the known lists below","3. Warn the user proactively if they choose a key that conflicts with reserved shortcuts or common tools like tmux (`ctrl+b`) and screen (`ctrl+a`)","4. When adding a new binding for an existing action, the new binding is additive (existing default still works unless explicitly unbound)","5. To fully replace a default binding, unbind the old key AND add the new one"].join(`
`),pNm=["## Validation with /doctor","",'The `/doctor` command includes a "Keybinding Configuration Issues" section that validates `~/.claude/keybindings.json`.',"","### Common Issues and Fixes","",FLo(["Issue","Cause","Fix"],[['`keybindings.json must have a "bindings" array`',"Missing wrapper object",'Wrap bindings in `{ "bindings": [...] }`'],['`"bindings" must be an array`',"`bindings` is not an array",'Set `"bindings"` to an array: `[{ context: ..., bindings: ... }]`'],['`Unknown context "X"`',"Typo or invalid context name","Use exact context names from the Available Contexts table"],['`Duplicate key "X" in Y bindings`',"Same key defined twice in one context","Remove the duplicate; JSON uses only the last value"],['`"X" may not work: ...`',"Key conflicts with terminal/OS reserved shortcut","Choose a different key (see Reserved Shortcuts section)"],['`Could not parse keystroke "X"`',"Invalid key syntax","Check syntax: use `+` between modifiers, valid key names"],['`Invalid action for "X"`',"Action value is not a string or null",'Actions must be strings like `"app:help"` or `null` to unbind']]),"","### Example /doctor Output","","```","Keybinding Configuration Issues","Location: ~/.claude/keybindings.json",'  \u2514 [Error] Unknown context "chat"',"    \u2192 Valid contexts: Global, Chat, Autocomplete, ...",'  \u2514 [Warning] "ctrl+c" may not work: Terminal interrupt (SIGINT)',"```","","**Errors** prevent bindings from working and must be fixed. **Warnings** indicate potential conflicts but the binding may still work."].join(`
`)});
export {X1m,Q1m,Z1m,eNm,NKl,FLo,tNm,nNm,rNm,oNm,sNm,iNm,aNm,lNm,cNm,uNm,dNm,pNm,BKl};

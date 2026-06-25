// @ts-nocheck
import {Jtt,tDi,C6r,zAn} from "../src/artifact/2473_Global.ts";
import {Ytt,GAn} from "../src/artifact/2471_context.ts";
import {zPt,b6r,E6r,KAn} from "./m2471.ts";
import {Td,Cb} from "./m5036.ts";
import {K8,MZ} from "../src/telemetry/2475_bindings.ts";
import {b} from "../runtime.ts";
import {tn,TeamDeleteToolName} from "../src/config/0230_encoding.ts";
function mqm(){return lUo(["Context","Description"],Jtt.map((e)=>[`\`${e}\``,tDi[e]]))}
function fqm(){let e={};for(let t of Ytt)for(let[n,r]of Object.entries(t.bindings))if(r){if(!e[r])e[r]={keys:[],context:t.context};e[r].keys.push(n)}return lUo(["Action","Default Key(s)","Context"],C6r.map((t)=>{let n=e[t],r=n?n.keys.map((s)=>`\`${s}\``).join(", "):"(none)",o=n?n.context:hqm(t);return[`\`${t}\``,r,o]}))}
function hqm(e){let t=e.split(":")[0];return{app:"Global",history:"Global or Chat",chat:"Chat",autocomplete:"Autocomplete",confirm:"Confirmation",tabs:"Tabs",transcript:"Transcript",historySearch:"HistorySearch",task:"Task",theme:"ThemePicker",help:"Help",attachments:"Attachments",footer:"Footer",messageSelector:"MessageSelector",diff:"DiffDialog",modelPicker:"ModelPicker",select:"Select",permission:"Confirmation"}[t??""]??"Unknown"}
function gqm(){let e=[];e.push("### Non-rebindable (errors)");for(let t of zPt)e.push(`- \`${t.key}\` \u2014 ${t.reason}`);e.push(""),e.push("### Terminal reserved (errors/warnings)");for(let t of b6r)e.push(`- \`${t.key}\` \u2014 ${t.reason} (${t.severity==="error"?"will not work":"may conflict"})`);e.push(""),e.push("### macOS reserved (errors)");for(let t of E6r)e.push(`- \`${t.key}\` \u2014 ${t.reason}`);return e.join(`
`)}
function bnc(){Td({name:"keybindings-help",description:'Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples: "rebind ctrl+s", "add a chord shortcut", "change the submit key", "customize keybindings".',allowedTools:["Read"],userInvocable:!1,isEnabled:K8,async getPromptForCommand(e){let t=mqm(),n=fqm(),r=gqm(),o=[bqm,Eqm,Cqm,Aqm,Rqm,vqm,wqm,kqm,`## Reserved Shortcuts

${r}`,`## Available Contexts

${t}`,`## Available Actions

${n}`];if(e)o.push(`## User Request

${e}`);return[{type:"text",text:o.join(`

`)}]}})}
function lUo(e,t){let n=e.map(()=>"---");return[`| ${e.join(" | ")} |`,`| ${n.join(" | ")} |`,...t.map((r)=>`| ${r.join(" | ")} |`)].join(`
`)}
var _qm,yqm,Tqm,Sqm,bqm,Eqm,Cqm,Aqm,Rqm,vqm,wqm,kqm;
var Enc=b(()=>{GAn();MZ();KAn();zAn();tn();Cb();_qm={$schema:"https://www.schemastore.org/claude-code-keybindings.json",$docs:"https://code.claude.com/docs/en/keybindings",bindings:[{context:"Chat",bindings:{"ctrl+e":"chat:externalEditor"}}]},yqm={context:"Chat",bindings:{"ctrl+s":null}},Tqm={context:"Chat",bindings:{"ctrl+g":null,"ctrl+e":"chat:externalEditor"}},Sqm={context:"Global",bindings:{"ctrl+k ctrl+t":"app:toggleTodos"}},bqm=["# Keybindings Skill","","Create or modify `~/.claude/keybindings.json` to customize keyboard shortcuts.","","## CRITICAL: Read Before Write","","**Always read `~/.claude/keybindings.json` first** (it may not exist yet). Merge changes with existing bindings \u2014 never replace the entire file.","","- Use **Edit** tool for modifications to existing files","- Use **Write** tool only if the file does not exist yet"].join(`
`),Eqm=["## File Format","","```json",TeamDeleteToolName(_qm,null,2),"```","","Always include the `$schema` and `$docs` fields."].join(`
`),Cqm=["## Keystroke Syntax","","**Modifiers** (combine with `+`):","- `ctrl` (alias: `control`)","- `alt` (aliases: `opt`, `option`) \u2014 note: `alt` and `meta` are identical in terminals","- `shift`","- `meta` (aliases: `cmd`, `command`)","","**Special keys**: `escape`/`esc`, `enter`/`return`, `tab`, `space`, `backspace`, `delete`, `up`, `down`, `left`, `right`","","**Chords**: Space-separated keystrokes, e.g. `ctrl+k ctrl+s` (1-second timeout between keystrokes)","","**Examples**: `ctrl+shift+p`, `alt+enter`, `ctrl+k ctrl+n`"].join(`
`),Aqm=["## Unbinding Default Shortcuts","","Set a key to `null` to remove its default binding:","","```json",TeamDeleteToolName(yqm,null,2),"```"].join(`
`),Rqm=["## How User Bindings Interact with Defaults","","- User bindings are **additive** \u2014 they are appended after the default bindings","- To **move** a binding to a different key: unbind the old key (`null`) AND add the new binding","- A context only needs to appear in the user's file if they want to change something in that context"].join(`
`),vqm=["## Common Patterns","","### Rebind a key","To change the external editor shortcut from `ctrl+g` to `ctrl+e`:","```json",TeamDeleteToolName(Tqm,null,2),"```","","### Add a chord binding","```json",TeamDeleteToolName(Sqm,null,2),"```"].join(`
`),wqm=["## Behavioral Rules","","1. Only include contexts the user wants to change (minimal overrides)","2. Validate that actions and contexts are from the known lists below","3. Warn the user proactively if they choose a key that conflicts with reserved shortcuts or common tools like tmux (`ctrl+b`) and screen (`ctrl+a`)","4. When adding a new binding for an existing action, the new binding is additive (existing default still works unless explicitly unbound)","5. To fully replace a default binding, unbind the old key AND add the new one"].join(`
`),kqm=["## Validation with /doctor","",'The `/doctor` command includes a "Keybinding Configuration Issues" section that validates `~/.claude/keybindings.json`.',"","### Common Issues and Fixes","",lUo(["Issue","Cause","Fix"],[['`keybindings.json must have a "bindings" array`',"Missing wrapper object",'Wrap bindings in `{ "bindings": [...] }`'],['`"bindings" must be an array`',"`bindings` is not an array",'Set `"bindings"` to an array: `[{ context: ..., bindings: ... }]`'],['`Unknown context "X"`',"Typo or invalid context name","Use exact context names from the Available Contexts table"],['`Duplicate key "X" in Y bindings`',"Same key defined twice in one context","Remove the duplicate; JSON uses only the last value"],['`"X" may not work: ...`',"Key conflicts with terminal/OS reserved shortcut","Choose a different key (see Reserved Shortcuts section)"],['`Could not parse keystroke "X"`',"Invalid key syntax","Check syntax: use `+` between modifiers, valid key names"],['`Invalid action for "X"`',"Action value is not a string or null",'Actions must be strings like `"app:help"` or `null` to unbind']]),"","### Example /doctor Output","","```","Keybinding Configuration Issues","Location: ~/.claude/keybindings.json",'  \u2514 [Error] Unknown context "chat"',"    \u2192 Valid contexts: Global, Chat, Autocomplete, ...",'  \u2514 [Warning] "ctrl+c" may not work: Terminal interrupt (SIGINT)',"```","","**Errors** prevent bindings from working and must be fixed. **Warnings** indicate potential conflicts but the binding may still work."].join(`
`)});
export {mqm,fqm,hqm,gqm,bnc,lUo,_qm,yqm,Tqm,Sqm,bqm,Eqm,Cqm,Aqm,Rqm,vqm,wqm,kqm,Enc};

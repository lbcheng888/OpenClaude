// @ts-nocheck
import {Bpe,ik} from "../agent/0726_level.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {dn,bt} from "../../vendor/m195.ts";
import {Rh,ok} from "../../vendor/m633.ts";
import {b} from "../../runtime.ts";
function g$l(e){let t=Bpe().shape.name.safeParse(e);if(!t.success)return t.error.issues[0]?.message??null;if(e.includes("/")||e.includes("\\")||e.includes("..")||e===".")return'Plugin name cannot contain path separators (/ or \\), ".." sequences, or be "."';return null}
function _$l(e){let{name:t,description:n,author:r}=e,o=e.with??[],s=[],i={$schema:Nvm,name:t,version:"0.1.0",description:n??"TODO: describe what this plugin provides"};if(r)i.author=r;if(i.skills=["./"],s.push({relPath:TM.join(".claude-plugin","plugin.json"),contents:Le(i,null,2)+`
`}),s.push({relPath:"SKILL.md",contents:h$l(t)}),o.includes("skills"))s.push({relPath:TM.join("skills","example","SKILL.md"),contents:h$l("example")});if(o.includes("agents"))s.push({relPath:TM.join("agents","example.md"),contents:Bvm()});if(o.includes("hooks"))s.push({relPath:TM.join("hooks","hooks.json"),contents:Fvm()},{relPath:TM.join("hooks-handlers","on-session-start.ts"),contents:Uvm(),mode:493});if(o.includes("mcp")&&!o.includes("channel"))s.push({relPath:".mcp.json",contents:$vm()});if(o.includes("lsp"))s.push({relPath:".lsp.json",contents:qvm()});if(o.includes("output-style"))s.push({relPath:TM.join("output-styles",`${t}.md`),contents:jvm(t)});if(o.includes("channel"))i.channels=[{server:t,displayName:t}],s.push({relPath:".mcp.json",contents:Wvm(t)},{relPath:"server.ts",contents:Vvm(t)},{relPath:"package.json",contents:Gvm(t)});return s[0].contents=Le(i,null,2)+`
`,s}
async function y$l(e,t,n){let r=TM.resolve(e);if(!n.force)try{await yWt.mkdir(TM.join(r,".claude-plugin"))}catch(s){if(dn(s)==="EEXIST")return{ok:!1,error:`${TM.join(r,".claude-plugin")} already exists. Use --force to overwrite.`};if(dn(s)!=="ENOENT")throw s}let o=[];for(let s of t){let i=TM.resolve(r,s.relPath),a=TM.relative(r,i);if(a.startsWith(".."+TM.sep)||a==="..")return{ok:!1,error:`Refusing to write outside ${r}: ${s.relPath}`};if(await yWt.mkdir(TM.dirname(i),{recursive:!0}),n.force)await Rh(i,s.contents,s.mode);else try{await yWt.writeFile(i,s.contents,{flag:"wx",mode:s.mode})}catch(l){if(dn(l)!=="EEXIST")throw l;o.push(s.relPath)}}return{ok:!0,skipped:o}}
function h$l(e){return`---
name: ${e}
description: TODO \u2014 describe WHEN Claude should use this. Include trigger phrases users
  might say ("do X", "set up Y", "review Z"). Be specific; this string is what Claude
  matches the user's request against.
---

# ${e}

TODO: what this skill does, and the steps Claude should take.
`}
function Bvm(){return`---
name: example
description: TODO \u2014 when should Claude delegate to this subagent?
tools:
  - Read
  - Grep
---

TODO: system prompt for the subagent.
`}
function Fvm(){return Le({hooks:{SessionStart:[{hooks:[{type:"command",command:"bun ${CLAUDE_PLUGIN_ROOT}/hooks-handlers/on-session-start.ts"}]}]}},null,2)+`
`}
function Uvm(){return`#!/usr/bin/env bun
// SessionStart hook handler. Reads the event from stdin, writes a JSON result
// to stdout. Swap "bun" for "node" or "python3" in hooks/hooks.json if your
// users' environment lacks bun.
const input = await new Response(Bun.stdin.stream()).text()
const event = JSON.parse(input)
process.stdout.write(JSON.stringify({}))
`}
function $vm(){return Le({mcpServers:{"example-remote":{type:"http",url:"https://example.com/mcp"},"example-local":{command:"npx",args:["<your-mcp-server-package>"]}}},null,2)+`
`}
function qvm(){return Le({example:{command:"example-language-server",args:["--stdio"],extensionToLanguage:{".example":"example"}}},null,2)+`
`}
function jvm(e){return`---
name: ${e}
description: TODO \u2014 one line shown in the Output style picker in /config
force-for-plugin: true
keep-coding-instructions: true
---

TODO: the style prompt. This is appended to Claude's system prompt while the
style is active. With force-for-plugin: true, the style applies automatically
when this plugin is enabled.
`}
function Wvm(e){return Le({mcpServers:{[e]:{command:"bun",args:["run","--cwd","${CLAUDE_PLUGIN_ROOT}","--shell=bun","--silent","start"]}}},null,2)+`
`}
function Gvm(e){return Le({name:`claude-channel-${e}`,version:"0.1.0",type:"module",scripts:{start:"bun install --no-summary && bun server.ts"},dependencies:{"@modelcontextprotocol/sdk":"^1.0.0"}},null,2)+`
`}
function Vvm(e){return`#!/usr/bin/env bun
/**
 * ${e} channel server \u2014 stdio MCP server implementing the channel contract.
 * See https://docs.claude.com/en/docs/claude-code/channels-reference.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const mcp = new Server(
  { name: '${e}', version: '0.1.0' },
  {
    capabilities: {
      tools: {},
      // Required: presence of this key registers the channel notification
      // listener on Claude's side.
      experimental: { 'claude/channel': {} },
    },
    instructions:
      "Events from ${e} arrive as <channel source=\\"${e}\\" ...>. Anything " +
      "you want the sender to see must go through the reply tool \u2014 your " +
      "transcript output never reaches the channel.",
  },
)

mcp.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'reply',
      description: 'Send a message back to the ${e} channel.',
      inputSchema: {
        type: 'object',
        properties: { text: { type: 'string' } },
        required: ['text'],
      },
    },
  ],
}))

mcp.setRequestHandler(CallToolRequestSchema, async req => {
  const args = (req.params.arguments ?? {}) as Record<string, unknown>
  if (req.params.name === 'reply') {
    // TODO: deliver args.text to the external service.
    return { content: [{ type: 'text', text: 'sent' }] }
  }
  return { content: [{ type: 'text', text: 'unknown tool' }], isError: true }
})

// TODO: when the external service has an inbound event, push it to Claude:
//
//   await mcp.notification({
//     method: 'notifications/claude/channel',
//     params: {
//       content: 'the event body',
//       meta: { chat_id: '...', sender: '...' },
//     },
//   })
//
// Each meta key becomes an attribute on the <channel> tag. Keys must be
// identifiers (letters/digits/underscores) \u2014 others are silently dropped.

await mcp.connect(new StdioServerTransport())
`}
var yWt,TM,Nvm="https://anthropic.com/claude-code/plugin.schema.json",TWt;
var TDo=b(()=>{ok();bt();Xt();ik();yWt=require("fs/promises"),TM=require("path"),TWt=["skills","agents","hooks","mcp","lsp","output-style","channel"]});
export {g$l,_$l,y$l,h$l,Bvm,Fvm,Uvm,$vm,qvm,jvm,Wvm,Gvm,Vvm,yWt,TM,Nvm,TWt,TDo};

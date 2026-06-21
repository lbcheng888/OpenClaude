// @ts-nocheck
import {kc as y1,eYn as gd6} from "../../vendor/m5215.ts";
import {Ose as y7H,Lse as v7H,kXe as cH_} from "./2043_pathname.ts";
import {Fs as p9,Lx as _h,hPe as oLH,qU as Vu} from "../../vendor/m5131.ts";
import {Urt as g__,xQi as Sl7,H7r as sg8,l9 as xx,CL as AV} from "../mcp/3149_scope.ts";
import {logEventAsync as XJ,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH,Qe as O_} from "../../vendor/m5.ts";
import {fMt as nk_,AMt as ik_,Bae as p7H} from "./3151_error.ts";
import {addMcpConfig as D$H,px as YZ} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {tpe as U6H,Qor as ol_,tv as SX} from "../../vendor/m232.ts";
import {Le as bH,Xt as H6} from "./0228_encoding.ts";
import {yFo as hyq,sn as A6} from "./0047_namespace.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {b as L} from "../../runtime.ts";
/**
 * MCP add command registration.
 *
 * Restored from the Claude Code 2.1.177 bundle. Local comments and
 * TypeScript-only helper aliases document inferred intent; link-time symbols,
 * literals, operators, property names, and control flow are preserved.
 */
type RestoredUnknown = any;
type RestoredRecord = Record<string, RestoredUnknown>;
// FIXME: unverified name for preserved short bundle-local identifiers.

function LN4(H: RestoredUnknown): RestoredUnknown {
  H.command("add <name> <commandOrUrl> [args...]").description(`Add an MCP server to Claude Code.

Examples:
  # Add HTTP server:
  claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

  # Add HTTP server with headers:
  claude mcp add --transport http corridor https://app.corridor.dev/api/mcp --header "Authorization: Bearer ..."

  # Add stdio server with environment variables:
  claude mcp add my-server -e API_KEY=xxx -- npx my-mcp-server

  # Add stdio server with subprocess flags:
  claude mcp add my-server -- my-command --some-flag arg1`).option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").option("-t, --transport <transport>", "Transport type (stdio, sse, http). Defaults to stdio if not specified.").option("-e, --env <env...>", "Set environment variables (e.g. -e KEY=value)").option("-H, --header <header...>", 'Set WebSocket headers (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")').option("--client-id <clientId>", "OAuth client ID for HTTP/SSE servers").option("--client-secret", "Prompt for OAuth client secret (or set MCP_CLIENT_SECRET env var)").option("--callback-port <port>", "Fixed port for OAuth callback (for servers requiring pre-registered redirect URIs)").helpOption("-h, --help", "Display help for command").addOption(new y1("--xaa", "Enable XAA (SEP-990) for this server. Requires 'claude mcp xaa setup' first. Also requires --client-id and --client-secret (for the MCP server's AS).").hideHelp(!y7H())).action(async (_, q, K, O) => {
    let T = q,
      z = K;
    if (!_) p9(`Error: Server name is required.
Usage: claude mcp add <name> <command> [args...]`);else if (!T) p9(`Error: Command is required when server name is provided.
Usage: claude mcp add <name> <command> [args...]`);
    try {
      let $ = g__(O.scope),
        Y = Sl7(O.transport);
      if (O.xaa && !y7H()) p9("Error: --xaa requires CLAUDE_CODE_ENABLE_XAA=1 in your environment");
      let A = Boolean(O.xaa);
      if (A) {
        let j = [];
        if (!O.clientId) j.push("--client-id");
        if (!O.clientSecret) j.push("--client-secret");
        if (!v7H()) j.push("'claude mcp xaa setup' (settings.xaaIdp not configured)");
        if (j.length) p9(`Error: --xaa requires: ${j.join(", ")}`);
      }
      let w = O.transport !== void 0,
        f = T.startsWith("http://") || T.startsWith("https://") || T.startsWith("localhost") || T.endsWith("/sse") || T.endsWith("/mcp");
      if (await XJ("tengu_mcp_add", {
        type: tH(Y),
        scope: tH($),
        source: O_("command"),
        transport: tH(Y),
        transportExplicit: w,
        looksLikeUrl: f
      }), Y === "sse") {
        if (!T) return _h("Error: URL is required for SSE transport.");
        let j = O.header ? sg8(O.header) : void 0,
          J = O.callbackPort ? parseInt(O.callbackPort, 10) : void 0,
          D = O.clientId || J || A ? {
            ...(O.clientId && {
              clientId: O.clientId
            }),
            ...(J && {
              callbackPort: J
            }),
            ...(A && {
              xaa: !0
            })
          } : void 0,
          M = O.clientSecret && O.clientId ? await nk_() : void 0,
          X = {
            type: "sse",
            url: T,
            headers: j,
            oauth: D
          };
        if (await D$H(_, X, $), M) {
          let P = await ik_(_, X, M);
          if (!P.success) process.stderr.write(`Server added, but the client secret could not be stored${P.warning ? ` (${P.warning})` : ""}. Re-run with --client-secret once secure storage is available.
`);
        }
        if (process.stdout.write(`Added SSE MCP server ${_} with URL: ${U6H(T)} to ${$} config
`), j) process.stdout.write(`Headers: ${bH(ol_(j), null, 2)}
`);
      } else if (Y === "http") {
        if (!T) return _h("Error: URL is required for HTTP transport.");
        let j = O.header ? sg8(O.header) : void 0,
          J = O.callbackPort ? parseInt(O.callbackPort, 10) : void 0,
          D = O.clientId || J || A ? {
            ...(O.clientId && {
              clientId: O.clientId
            }),
            ...(J && {
              callbackPort: J
            }),
            ...(A && {
              xaa: !0
            })
          } : void 0,
          M = O.clientSecret && O.clientId ? await nk_() : void 0,
          X = {
            type: "http",
            url: T,
            headers: j,
            oauth: D
          };
        if (await D$H(_, X, $), M) {
          let P = await ik_(_, X, M);
          if (!P.success) process.stderr.write(`Server added, but the client secret could not be stored${P.warning ? ` (${P.warning})` : ""}. Re-run with --client-secret once secure storage is available.
`);
        }
        if (process.stdout.write(`Added HTTP MCP server ${_} with URL: ${U6H(T)} to ${$} config
`), j) process.stdout.write(`Headers: ${bH(ol_(j), null, 2)}
`);
      } else {
        if (O.clientId || O.clientSecret || O.callbackPort || O.xaa) process.stderr.write(`Warning: --client-id, --client-secret, --callback-port, and --xaa are only supported for HTTP/SSE transports and will be ignored for stdio.
`);
        let j = f ? U6H(T) : T;
        if (!w && f) process.stderr.write(`
Warning: The command "${j}" looks like a URL, but is being interpreted as a stdio server as --transport was not specified.
`), process.stderr.write(`If this is an HTTP server, use: claude mcp add --transport http ${_} ${j}
`), process.stderr.write(`If this is an SSE server, use: claude mcp add --transport sse ${_} ${j}
`);
        let J = hyq(O.env);
        await D$H(_, {
          type: "stdio",
          command: T,
          args: z,
          env: J
        }, $), process.stdout.write(`Added stdio MCP server ${_} with command: ${j} ${z.join(" ")} to ${$} config
`);
      }
      return oLH(`File modified: ${xx($)}`);
    } catch ($) {
      return _h(GH($));
    }
  });
}
var hN4 = L(() => {
  gd6();
  Vu();
  y_();
  p7H();
  YZ();
  AV();
  cH_();
  A6();
  L_();
  SX();
  H6();
});
export {LN4 as t2l,hN4 as n2l};

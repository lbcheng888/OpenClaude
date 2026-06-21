// @ts-nocheck
import {bo,mt,configProtoStore} from "../../vendor/m2458.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {loadAllPluginsCacheOnly,gg} from "../agent/4445_resolvePluginRoot.ts";
import {fYn,gDo} from "../telemetry/5236_scope.ts";
import {IIn,Kae} from "../../vendor/m3247.ts";
import {Cmt,mWn} from "../../vendor/m4683.ts";
import {lD,EJ} from "../../vendor/m4592.ts";
import {Q6e,uqt} from "../tools/4432_encoding.ts";
import {Rqt,Ajn} from "../../vendor/m4445.ts";
import {loadPluginHooks,z2e} from "../../vendor/m2766.ts";
import {Hee,qxe} from "../config/3142_i.ts";
import {o9e,AIn,p1t} from "../../vendor/m3224.ts";
import {V2l,K2l} from "../../vendor/m5234.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Wn} from "../api/0459_getOauthConfig.ts";
import {_o,bt} from "../../vendor/m195.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {kn,SA} from "../config/0689_timestamp.ts";
import {b,M} from "../../runtime.ts";
import {Te} from "../../vendor/m2253.ts";
function AYn({
  enabled: e = !0
} = {}) {
  let t = bo(),
    n = mt(s => s.plugins.needsRefresh),
    {
      addNotification: r
    } = Ui(),
    o = _Wt.useCallback(async () => {
      try {
        let {
            enabled: s,
            disabled: i,
            errors: a,
            warnings: l
          } = await loadAllPluginsCacheOnly(),
          c = [...a];
        if ((await fYn()).length > 0) IIn();
        let d = Object.keys(Cmt()).length;
        lD("plugins", d), t(v => {
          if (v.setupIssues.flaggedPluginCount === d) return v;
          return {
            ...v,
            setupIssues: {
              ...v.setupIssues,
              flaggedPluginCount: d
            }
          };
        });
        let p = [],
          m = [];
        try {
          p = await Q6e();
        } catch (v) {
          let R = v instanceof Error ? v.message : String(v);
          c.push({
            type: "generic-error",
            source: "plugin-commands",
            error: `Failed to load plugin commands: ${R}`
          });
        }
        try {
          m = await Rqt();
        } catch (v) {
          let R = v instanceof Error ? v.message : String(v);
          c.push({
            type: "generic-error",
            source: "plugin-agents",
            error: `Failed to load plugin agents: ${R}`
          });
        }
        try {
          await loadPluginHooks();
        } catch (v) {
          let R = v instanceof Error ? v.message : String(v);
          c.push({
            type: "generic-error",
            source: "plugin-hooks",
            error: `Failed to load plugin hooks: ${R}`
          });
        }
        let A = (await Promise.all(s.map(async v => {
            if (v.mcpServers) return Object.keys(v.mcpServers).length;
            let R = await Hee(v, c);
            if (R) v.mcpServers = R;
            return R ? Object.keys(R).length : 0;
          }))).reduce((v, R) => v + R, 0),
          g = (await Promise.all(s.map(async v => {
            if (v.lspServers) return Object.keys(v.lspServers).length;
            let R = await o9e(v, c);
            if (R) v.lspServers = R;
            return R ? Object.keys(R).length : 0;
          }))).reduce((v, R) => v + R, 0),
          _ = AIn(s),
          y = [...l, ..._],
          T = (await V2l(s)).length;
        t(v => {
          let R = v.plugins.errors.filter(N => N.source === "lsp-manager" || N.source.startsWith("plugin:")),
            k = new Set(c.map(N => N.type === "generic-error" ? `generic-error:${N.source}:${N.error}` : `${N.type}:${N.source}`)),
            H = [...R.filter(N => {
              let O = N.type === "generic-error" ? `generic-error:${N.source}:${N.error}` : `${N.type}:${N.source}`;
              return !k.has(O);
            }), ...c],
            I = v.plugins.warnings.filter(N => N.source.startsWith("plugin:")),
            P = new Set(y.map(N => `${N.type}:${N.source}`)),
            D = [...I.filter(N => !P.has(`${N.type}:${N.source}`)), ...y];
          return {
            ...v,
            plugins: {
              ...v.plugins,
              enabled: s,
              disabled: i,
              commands: p,
              errors: H,
              warnings: D
            }
          };
        }), logForDebugging(`Loaded plugins - Enabled: ${s.length}, Disabled: ${i.length}, Commands: ${p.length}, Agents: ${m.length}, Errors: ${c.length}`);
        let S = s.reduce((v, R) => {
          if (!R.hooksConfig) return v;
          return v + Object.values(R.hooksConfig).reduce((k, x) => k + (x?.reduce((H, I) => H + I.hooks.length, 0) ?? 0), 0);
        }, 0);
        return {
          enabled_count: s.length,
          disabled_count: i.length,
          inline_count: Wn(s, v => v.source.endsWith("@inline")),
          marketplace_count: Wn(s, v => !v.source.endsWith("@inline")),
          error_count: c.length,
          skill_count: p.length,
          agent_count: m.length,
          hook_count: S,
          mcp_count: A,
          lsp_count: g,
          theme_count: T,
          ant_enabled_names: void 0
        };
      } catch (s) {
        let i = _o(s);
        return De(i), logForDebugging(`Error loading plugins: ${s}`), t(a => {
          let l = a.plugins.errors.filter(u => u.source === "lsp-manager" || u.source.startsWith("plugin:")),
            c = {
              type: "generic-error",
              source: "plugin-system",
              error: i.message
            };
          return {
            ...a,
            plugins: {
              ...a.plugins,
              enabled: [],
              disabled: [],
              commands: [],
              errors: [...l, c]
            }
          };
        }), {
          enabled_count: 0,
          disabled_count: 0,
          inline_count: 0,
          marketplace_count: 0,
          error_count: 1,
          skill_count: 0,
          agent_count: 0,
          hook_count: 0,
          mcp_count: 0,
          lsp_count: 0,
          theme_count: 0,
          load_failed: !0,
          ant_enabled_names: void 0
        };
      }
    }, [t]);
  _Wt.useEffect(() => {
    if (!e) return;
    o().then(s => {
      let {
          ant_enabled_names: i,
          ...a
        } = s,
        l = {
          ...a,
          has_custom_plugin_cache_dir: !!process.env.CLAUDE_CODE_PLUGIN_CACHE_DIR
        };
      logEvent("tengu_plugins_loaded", {
        ...l,
        ...(i !== void 0 && {
          enabled_names: i
        })
      }), kn("info", "tengu_plugins_loaded", l);
    });
  }, [o, e]), _Wt.useEffect(() => {
    if (!e || !n) return;
    r({
      key: "plugin-reload-pending",
      text: "Plugins changed. Run /reload-plugins to activate.",
      color: "suggestion",
      priority: "low"
    });
  }, [e, n, r]);
}
var _Wt;
var _Do = b(() => {
  Ld();
  Ct();
  Kae();
  configProtoStore();
  qe();
  SA();
  bt();
  Rn();
  Ajn();
  uqt();
  z2e();
  K2l();
  p1t();
  qxe();
  gDo();
  mWn();
  gg();
  EJ();
  _Wt = M(Te(), 1);
});
export {AYn,_Wt,_Do};

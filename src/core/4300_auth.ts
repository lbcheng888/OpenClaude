// @ts-nocheck
import {Vs as ei,lT as dT} from "../../vendor/m2195.ts";
import {getOAuthHeaders as jS,NR as Rw} from "../api/2195_updateSessionTitle.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function zDp(e) {
  return `/${KDp}/${e}`;
}
async function c_e(e, t, n, r) {
  let o = await ei.post(zDp(e), n, {
    auth: "none",
    headers: {
      ...jS(t),
      "X-Anthropic-Client": "claude-cli-design-sync"
    },
    timeout: 60000,
    validateStatus: () => true,
    signal: r
  });
  if (!o.ok) throw new f1_(e, 0, {
    error: o.reason
  });
  if (o.status === 401 || o.status === 403) throw new FpK(e, o.status, o.data);
  if (o.status < 200 || o.status >= 300) throw new f1_(e, o.status, o.data);
  return o.data;
}
async function zWa(e, t = {}, n) {
  let r = await c_e("ListOrgProjects", e, {
    ...(t.type && {
      type: t.type
    }),
    ...(t.cursor && {
      cursor: t.cursor
    })
  }, n);
  return {
    items: r.items ?? [],
    cursor: r.cursor ?? ""
  };
}
async function YWa(e, t, n, r = {}, o) {
  return (await c_e("WriteFiles", e, {
    projectId: t,
    files: n,
    deduplicate: r.deduplicate ?? false,
    ...(r.deletePaths?.length && {
      deletePaths: r.deletePaths
    })
  }, o)).files ?? [];
}
async function buildRpcPath(method, t, n) {
  return c_e("GetProject", method, {
    projectId: t
  }, n);
}
async function callDesignRpc(method, token, body) {
  let r = [],
    o = 0;
  for (let s = 0; s < 50; s++) {
    let i = await c_e("ListFiles", method, {
        projectId: token,
        depth: -1,
        ...(o > 0 && {
          offset: o
        })
      }, body),
      a = i.entries ?? [];
    for (let l of a) r.push(l.path);
    if (!i.truncated || a.length === 0) return r;
    o += a.length;
  }
  throw new f1_("ListFiles", 0, {
    error: `pagination exceeded 50 pages (${r.length} paths)`
  });
}
async function SpK(token, t, signal, r = 262144, o) {
  let s = await c_e("GetFile", token, {
      projectId: t,
      path: signal,
      raw: true
    }, o),
    i = s.content ?? "",
    a = s.isBase64 ?? false,
    l,
    c = false;
  if (a) {
    if (l = i, l.length > r) l = l.slice(0, r), c = true;
  } else {
    let u = Buffer.from(i, "base64");
    if (u.byteLength > r) u = u.subarray(0, r), c = true;
    l = u.toString("utf8");
  }
  return {
    content: l,
    contentType: s.contentType ?? "",
    isBase64: a,
    truncated: c
  };
}
async function CpK(token, projectId, files, r) {
  if (files.length === 0) return 0;
  return (await c_e("DeleteFiles", token, {
    projectId: projectId,
    paths: files
  }, r)).deleted ?? 0;
}
async function bpK(token, projectId, signal) {
  let r = await c_e("CreateProject", token, {
    name: projectId,
    type: $do
  }, signal);
  if (!r.projectId) throw new f1_("CreateProject", 200, r);
  return {
    projectId: r.projectId,
    name: projectId
  };
}
async function IpK(token, projectId, signal, r) {
  await c_e("RecordAsset", token, {
    projectId: projectId,
    name: signal.name,
    path: signal.path,
    ...(signal.subtitle && {
      subtitle: signal.subtitle
    }),
    ...(signal.viewport && {
      viewport: signal.viewport
    }),
    ...(signal.group && {
      section: signal.group
    })
  }, r);
}
async function xpK(token, projectId, path, r) {
  await c_e("DeleteAsset", token, {
    projectId: projectId,
    path: path
  }, r);
}
function upK(token, projectId) {
  if (!projectId) return token;
  return token.split(projectId).join("[redacted-oauth-token]");
}
function mpK(token) {
  if (token == null) return "";
  if (typeof token === "string") return token.slice(0, 200);
  try {
    return JSON.stringify(token).slice(0, 200);
  } catch {
    return String(token).slice(0, 200);
  }
}
var KDp = "anthropic.omelette.api.v1alpha.OmeletteService",
  $do = "PROJECT_TYPE_DESIGN_SYSTEM",
  f1_,
  FpK;
var gpK = b(() => {
  dT();
  Rw();
  f1_ = class f1_ extends Error {
    method;
    status;
    body;
    constructor(method, status, body) {
      super(`Design API ${method} failed: HTTP ${status} ${mpK(body)}`);
      this.method = method;
      this.status = status;
      this.body = body;
      this.name = "DesignRpcError";
    }
  };
  FpK = class FpK extends f1_ {
    constructor(method, status, body) {
      super(method, status, body);
      this.name = "DesignAuthError";
    }
  };
});
export {zDp as z$p,c_e as zye,zWa as LXa,YWa as MXa,buildRpcPath as NXa,callDesignRpc as FXa,SpK as BXa,CpK as UXa,bpK as $Xa,IpK as qXa,xpK as WXa,upK as GXa,mpK as j$p,KDp as K$p,$do as W_o,f1_ as dmt,FpK as VXa,gpK as KXa};

// @ts-nocheck
import {b} from "../../runtime.ts";
/** Filter out hook_progress events from a list of tool events. */
function Eve(events: any[]): any[] {
  return events.filter(item => item.data?.type !== "hook_progress");
}
/** Check if a tool matches a given name (by name or alias). */
function Lc(tool: any, name: string): boolean {
  return tool.name === name || (tool.aliases?.includes(name) ?? !1);
}
/** Set the global tool registry getter. */
function QAi(getter: any): void {
  XAi = getter;
}
/** Call the global tool registry getter. */
function myn(): any {
  return XAi?.();
}
/** Build a name→tool map from a list of tools (including alias entries). */
function eQu(tools: any[]): Map<string, any> {
  let nameMap = new Map();
  for (let tool of tools) {
    if (!nameMap.has(tool.name)) nameMap.set(tool.name, tool);
    if (tool.aliases) {
      for (let alias of tool.aliases) if (!nameMap.has(alias)) nameMap.set(alias, tool);
    }
  }
  return nameMap;
}
/** Look up a tool by name from a list, using alias remapping and a WeakMap cache. */
function Cl(toolList: any, toolName: any, aliasMap: any): any {
  let remapped = aliasMap && Object.hasOwn(aliasMap, toolName) ? aliasMap[toolName] : void 0;
  if (remapped !== void 0 && remapped !== toolName) return Cl(toolList, remapped);
  let cached = YAi.get(toolList);
  if (cached) return cached.get(toolName);
  if (JAi.has(toolList)) {
    let built = eQu(toolList);
    return YAi.set(toolList, built), built.get(toolName);
  }
  return JAi.add(toolList), toolList.find((entry: any) => Lc(entry, toolName));
}
/** Wrap a tool definition with default mixin properties, overriding userFacingName. */
function pi(toolDef: any): any {
  return Object.defineProperties({
    ...tQu,
    userFacingName: () => toolDef.name
  }, Object.getOwnPropertyDescriptors(toolDef));
}
/** Default permissions/settings context factory. */
var O1 = () => ({
    mode: "default",
    additionalWorkingDirectories: new Map(),
    alwaysAllowRules: {},
    alwaysDenyRules: {},
    alwaysAskRules: {},
    isBypassPermissionsModeAvailable: !1,
    mcpPermissionModeOverrides: {}
  }),
  XAi: any,
  YAi: any,
  JAi: any,
  tQu: any;
/** Module initializer: sets up cache structures and the default tool mixin. */
var Ri = b(() => {
  YAi = new WeakMap(), JAi = new WeakSet();
  tQu = {
    isEnabled: () => !0,
    isConcurrencySafe: (e: any) => !1,
    isReadOnly: (e: any) => !1,
    isDestructive: (e: any) => !1,
    checkPermissions: (e: any, t: any) => Promise.resolve({
      behavior: "allow",
      updatedInput: e
    }),
    toAutoClassifierInput: (e: any) => "",
    userFacingName: (e: any) => ""
  };
});
export {Eve,Lc,QAi,myn,eQu,Cl,pi,O1,XAi,YAi,JAi,tQu,Ri};

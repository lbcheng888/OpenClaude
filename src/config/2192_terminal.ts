// @ts-nocheck
import {Ne as Ge} from "../../vendor/m583.ts";
import {b} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {Ii as oa} from "../../vendor/m690.ts";
import {lE as tE} from "../../vendor/m1461.ts";
// @ts-nocheck
// 终端环境探测：Docker/Bubblewrap/沙箱/JetBrains 检测，并导出增强版 env 对象

declare const Ge: any;
declare const b: any;
declare const na: any;
declare const bn: any;
declare const Or: any;
declare const oa: any;
declare const tE: any;

/** 是否运行在 Bubblewrap 沙箱内（此实现始终返回 false） */
function getIsBubblewrapSandbox(): boolean {
  return !1;
}

/** 是否运行在无互联网访问的容器内（读缓存值） */
function getIsContainedNoInternetCached(): boolean {
  return isContainedNoInternet ?? !1;
}

/** 是否以 root 身份运行在非刻意沙箱环境中 */
function isRootOutsideDeliberateSandbox(): boolean {
  return typeof process.getuid === "function" && process.getuid() === 0 && process.env.IS_SANDBOX !== "1" && !Ge.CLAUDE_CODE_BUBBLEWRAP;
}

/** 是否通过 ANT DSP 环境门控（读缓存值） */
function passesAntDspEnvGateCached(): boolean {
  return passesAntDspGate ?? !1;
}

/** 是否为 musl libc 环境（此实现始终返回 false） */
function isMuslEnvironment(): boolean {
  return !1;
}

/** 是否为 Android 环境（此实现始终返回 false） */
function isAndroidEnvironment(): boolean {
  return !1;
}

/** 异步获取 JetBrains 平台标识（仅 macOS 以外平台探测） */
async function detectJetBrainsPlatform(): Promise<string | null> {
  if (jetbrainsPlatformCache !== void 0) return jetbrainsPlatformCache;
  return jetbrainsPlatformCache = null, null;
}

/** 异步获取终端标识，含 JetBrains JediTerm 特殊处理 */
async function getTerminalWithJetBrainsDetectionAsync(): Promise<string | undefined> {
  if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") {
    if (Ge.platform !== "darwin") return (await detectJetBrainsPlatform()) || "pycharm";
  }
  return Ge.terminal;
}

/** 同步获取终端标识，JetBrains 分支使用缓存或默认值 */
function getTerminalSync(): string | undefined {
  if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") {
    if (Ge.platform !== "darwin") {
      if (jetbrainsPlatformCache !== void 0) return jetbrainsPlatformCache || "pycharm";
      return "pycharm";
    }
  }
  return Ge.terminal;
}

/** 提前异步初始化 JetBrains 平台检测缓存 */
async function initJetBrainsDetection(): Promise<void> {
  if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") await detectJetBrainsPlatform();
}
var getIsDocker: any,
  isContainedNoInternet: boolean | undefined,
  getIsContainedNoInternet: any,
  passesAntDspGate: boolean | undefined,
  passesAntDspEnvGate: any,
  _unused: null = null,
  jetbrainsPlatformCache: string | null | undefined,
  /** 增强版 env 对象，在 Ge 基础上叠加运行时探测能力 */
  enhancedEnv: any;
var initModule = b(() => {
  na();
  Or();
  oa();
  tE();
  getIsDocker = bn(async () => !1);
  getIsContainedNoInternet = bn(async () => {
    let [isDocker, hasInternet] = await Promise.all([getIsDocker(), Ge.hasInternetAccess()]);
    return isContainedNoInternet = (isDocker || getIsBubblewrapSandbox() || process.env.IS_SANDBOX === "1") && !hasInternet, isContainedNoInternet;
  });
  passesAntDspEnvGate = bn(async () => {
    let [isContained, internalAccess] = await Promise.all([getIsContainedNoInternet(), Ge.probeInternalNetworkAccess()]);
    return passesAntDspGate = isContained && internalAccess === null && !isRootOutsideDeliberateSandbox(), passesAntDspGate;
  });
  enhancedEnv = {
    ...Ge,
    terminal: getTerminalSync(),
    getIsDocker: getIsDocker,
    getIsBubblewrapSandbox: getIsBubblewrapSandbox,
    getIsContainedNoInternet: getIsContainedNoInternet,
    getIsContainedNoInternetCached: getIsContainedNoInternetCached,
    passesAntDspEnvGate: passesAntDspEnvGate,
    passesAntDspEnvGateCached: passesAntDspEnvGateCached,
    isRootOutsideDeliberateSandbox: isRootOutsideDeliberateSandbox,
    isMuslEnvironment: isMuslEnvironment,
    isAndroidEnvironment: isAndroidEnvironment,
    getTerminalWithJetBrainsDetectionAsync: getTerminalWithJetBrainsDetectionAsync,
    initJetBrainsDetection: initJetBrainsDetection
  };
});
export {getIsBubblewrapSandbox as BTi,getIsContainedNoInternetCached as vid,isRootOutsideDeliberateSandbox as $Ti,passesAntDspEnvGateCached as kid,isMuslEnvironment as Iid,isAndroidEnvironment as xid,detectJetBrainsPlatform as qTi,getTerminalWithJetBrainsDetectionAsync as Did,getTerminalSync as Pid,initJetBrainsDetection as D2r,getIsDocker as FTi,isContainedNoInternet as I2r,getIsContainedNoInternet as UTi,passesAntDspGate as x2r,passesAntDspEnvGate as wid,_unused as Hid,jetbrainsPlatformCache as uUe,enhancedEnv as WM,initModule as E8};

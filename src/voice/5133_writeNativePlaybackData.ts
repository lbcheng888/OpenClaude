// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {l3o as qkq} from "../../vendor/m3.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {execFileNoThrow as B6,Ii as l7} from "../../vendor/m690.ts";
import {rA as Q2,dn as A6} from "../config/0137_namespace.ts";
import {nt as q_} from "../../vendor/m127.ts";
import {Yt as t_,Es as y9} from "../../vendor/m641.ts";
// Voice subsystem — native audio capture & high-level recording API.
//
// This module exposes two layers:
//
//   1. A thin wrapper (`nativeAudioCaptureExports`) around the optional native
//      `audio-capture.node` N-API addon, which performs microphone capture and
//      audio playback through the OS (CoreAudio / ALSA / WASAPI). All entry
//      points degrade gracefully to no-ops / `false` when the addon is missing.
//
//   2. A higher-level recording API (`voiceRecordingExports`) used by the
//      hold-to-talk voice dictation feature. It prefers the native addon and
//      falls back to spawning the SoX `rec` CLI when the addon is unavailable.

/**
 * Shape of the native `audio-capture.node` addon. Methods are present only when
 * the platform-specific binary is loaded; some (e.g. `microphoneAuthorizationStatus`)
 * may be absent on platforms that don't gate microphone access.
 */
interface NativeAudioModule {
  startRecording(onData: (chunk: Buffer) => void, onSilence: () => void): boolean;
  stopRecording(): void;
  isRecording(): boolean;
  startPlayback(onData: (chunk: Buffer) => void, onDone: () => void): boolean;
  writePlaybackData(data: Buffer): void;
  stopPlayback(): void;
  isPlaying(): boolean;
  microphoneAuthorizationStatus?(): number;
}

/** The lazily-loaded `nativeAudioCaptureExports` namespace object. */
type NativeAudioCaptureExports = typeof nativeAudioCaptureExports;
var nativeAudioCaptureExports = {};
j_(nativeAudioCaptureExports, {
  writeNativePlaybackData: () => writeNativePlaybackData,
  stopNativeRecording: () => stopNativeRecording,
  stopNativePlayback: () => stopNativePlayback,
  startNativeRecording: () => startNativeRecording,
  startNativePlayback: () => startNativePlayback,
  microphoneAuthorizationStatus: () => microphoneAuthorizationStatus,
  isNativeRecordingActive: () => isNativeRecordingActive,
  isNativePlaying: () => isNativePlaying,
  isNativeAudioAvailable: () => isNativeAudioAvailable
});

/**
 * Resolve (and cache) the native `audio-capture.node` addon.
 *
 * Only `darwin` / `linux` / `win32` are supported. The addon is first looked up
 * via the bundled require shim (`qkq`), then by probing the vendored binary at
 * `vendor/audio-capture/<arch>-<platform>/audio-capture.node`. Returns `null`
 * when no binary can be loaded; the result (including `null`) is cached so the
 * lookup only runs once.
 */
function loadNativeAudioModule(): NativeAudioModule | null {
  if (nativeAudioModuleLoadAttempted) return cachedNativeAudioModule;
  nativeAudioModuleLoadAttempted = !0;
  let platform = "darwin";
  if (platform !== "darwin" && platform !== "linux" && platform !== "win32") return null;
  try {
    return cachedNativeAudioModule = qkq(), cachedNativeAudioModule;
  } catch {}
  let archPlatform = `arm64-${platform}`,
    candidatePaths = [`./vendor/audio-capture/${archPlatform}/audio-capture.node`, `../audio-capture/${archPlatform}/audio-capture.node`];
  for (let candidatePath of candidatePaths) try {
    return cachedNativeAudioModule = require(candidatePath), cachedNativeAudioModule;
  } catch {}
  return null;
}

/** Whether the native audio addon could be loaded on this platform. */
function isNativeAudioAvailable(): boolean {
  return loadNativeAudioModule() !== null;
}

/**
 * Start native microphone recording.
 * @param onData    called with each captured raw audio chunk
 * @param onSilence called when the addon detects end-of-speech silence
 * @returns `true` if recording started, `false` if the addon is unavailable
 */
function startNativeRecording(onData: (chunk: Buffer) => void, onSilence: () => void): boolean {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return !1;
  return nativeModule.startRecording(onData, onSilence);
}

/** Stop native microphone recording (no-op if the addon is unavailable). */
function stopNativeRecording(): void {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return;
  nativeModule.stopRecording();
}

/** Whether the native addon currently has an active recording session. */
function isNativeRecordingActive(): boolean {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return !1;
  return nativeModule.isRecording();
}

/**
 * Start native audio playback.
 * @param onData called when the addon needs more audio data
 * @param onDone called when playback completes
 * @returns `true` if playback started, `false` if the addon is unavailable
 */
function startNativePlayback(onData: (chunk: Buffer) => void, onDone: () => void): boolean {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return !1;
  return nativeModule.startPlayback(onData, onDone);
}

/** Feed a chunk of audio data to the active native playback stream. */
function writeNativePlaybackData(data: Buffer): void {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return;
  nativeModule.writePlaybackData(data);
}

/** Stop native audio playback (no-op if the addon is unavailable). */
function stopNativePlayback(): void {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return;
  nativeModule.stopPlayback();
}

/** Whether the native addon is currently playing audio. */
function isNativePlaying(): boolean {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule) return !1;
  return nativeModule.isPlaying();
}

/**
 * Microphone authorization status as reported by the OS (e.g. macOS TCC).
 * Returns `0` when the addon is unavailable or doesn't expose the query.
 */
function microphoneAuthorizationStatus(): number {
  let nativeModule = loadNativeAudioModule();
  if (!nativeModule || !nativeModule.microphoneAuthorizationStatus) return 0;
  return nativeModule.microphoneAuthorizationStatus();
}
var cachedNativeAudioModule: NativeAudioModule | null = null,
  nativeAudioModuleLoadAttempted = !1;
var voiceRecordingExports = {};
j_(voiceRecordingExports, {
  stopRecording: () => stopRecording,
  startRecording: () => startRecording,
  requestMicrophonePermission: () => requestMicrophonePermission,
  checkVoiceDependencies: () => checkVoiceDependencies,
  checkRecordingAvailability: () => checkRecordingAvailability,
  _resetArecordProbeForTesting: () => _resetArecordProbeForTesting,
  _resetAlsaCardsForTesting: () => _resetAlsaCardsForTesting
});

/**
 * Lazily import and cache the native audio-capture N-API namespace.
 *
 * Resolves the in-bundle `nativeAudioCaptureExports` namespace, primes it by
 * calling `isNativeAudioAvailable()`, stashes it in `loadedNapiNamespace`, and
 * logs the load time. The promise is memoized so the import only runs once.
 */
function loadAudioCaptureNapi(): Promise<NativeAudioCaptureExports> {
  return audioCaptureNapiPromise ??= (async () => {
    let startedAt = Date.now(),
      napiNamespace = await Promise.resolve().then(() => nativeAudioCaptureExports);
    return napiNamespace.isNativeAudioAvailable(), loadedNapiNamespace = napiNamespace, N(`[voice] audio-capture-napi loaded in ${Date.now() - startedAt}ms`), napiNamespace;
  })(), audioCaptureNapiPromise;
}

/** Whether `<command> --version` exits successfully (i.e. the command exists). */
async function isCommandAvailable(command: string): Promise<boolean> {
  return (await B6(command, ["--version"], {
    timeout: 3000,
    useCwd: !1
  })).code === 0;
}

/** Test hook: reset the cached `arecord` availability probe. */
function _resetArecordProbeForTesting(): void {
  arecordProbeCache = null;
}

/** Test hook: reset the cached ALSA cards probe. */
function _resetAlsaCardsForTesting(): void {
  alsaCardsCache = null;
}

/** Describes a shell command that installs a missing voice dependency. */
interface InstallCommand {
  cmd: string;
  args: string[];
  displayCommand: string;
}

/**
 * Suggest how to install SoX. Currently only offers a Homebrew recipe and only
 * when `brew` is present; otherwise returns `null`.
 */
async function getSoxInstallCommand(): Promise<InstallCommand | null> {
  if (await isCommandAvailable("brew")) return {
    cmd: "brew",
    args: ["install", "sox"],
    displayCommand: "brew install sox"
  };
  return null;
}

/** Result of probing whether voice recording dependencies are satisfied. */
interface VoiceDependencyStatus {
  available: boolean;
  missing: string[];
  installCommand: string | null;
}

/**
 * Report whether voice recording can run. The native addon satisfies all
 * dependencies; otherwise the SoX `rec` CLI is required, and a suggested
 * install command is returned when something is missing.
 */
async function checkVoiceDependencies(): Promise<VoiceDependencyStatus> {
  if ((await loadAudioCaptureNapi()).isNativeAudioAvailable()) return {
    available: !0,
    missing: [],
    installCommand: null
  };
  let missing: string[] = [];
  if (!(await isCommandAvailable("rec"))) missing.push("sox (rec command)");
  let installCommand = missing.length > 0 ? await getSoxInstallCommand() : null;
  return {
    available: missing.length === 0,
    missing,
    installCommand: installCommand?.displayCommand ?? null
  };
}

/**
 * Trigger the OS microphone-permission prompt by briefly starting and stopping
 * a recording. Returns `true` if permission was granted (or no addon gates it).
 */
async function requestMicrophonePermission(): Promise<boolean> {
  if (!(await loadAudioCaptureNapi()).isNativeAudioAvailable()) return !0;
  if (await startRecording(_chunk => {}, () => {}, {
    silenceDetection: !1
  })) return stopRecording(), !0;
  return !1;
}

/** Whether recording is possible right now, with a user-facing reason if not. */
interface RecordingAvailability {
  available: boolean;
  reason: string | null;
}

/**
 * Determine whether audio recording is available in the current environment,
 * accounting for remote/headless setups and WSL audio quirks. Returns a
 * user-facing `reason` string when recording is unavailable.
 */
async function checkRecordingAvailability(): Promise<RecordingAvailability> {
  if (Q2() || q_(process.env.CLAUDE_CODE_REMOTE)) return {
    available: !1,
    reason: `Voice mode requires microphone access, but no audio device is available in this environment.

To use voice mode, run Claude Code locally instead.`
  };
  if ((await loadAudioCaptureNapi()).isNativeAudioAvailable()) return {
    available: !0,
    reason: null
  };
  let wslReason = `Voice mode could not find a working audio recorder in WSL.

` + `WSL2 with WSLg provides audio via PulseAudio — install SoX with its PulseAudio backend (sudo apt install sox libsox-fmt-pulse) so Claude Code can record through it.

` + "If WSLg is not available (for example WSL1), run Claude Code in native Windows instead.";
  if (!(await isCommandAvailable("rec"))) {
    if (t_() === "wsl") return {
      available: !1,
      reason: wslReason
    };
    let installCommand = await getSoxInstallCommand();
    return {
      available: !1,
      reason: installCommand ? `Voice mode requires SoX for audio recording. Install it with: ${installCommand.displayCommand}` : `Voice mode requires SoX for audio recording. Install SoX manually:
  macOS: brew install sox
  Ubuntu/Debian: sudo apt-get install sox
  Fedora: sudo dnf install sox`
    };
  }
  return {
    available: !0,
    reason: null
  };
}

/** Options accepted by {@link startRecording}. */
interface RecordingOptions {
  /** Auto-stop on detected silence (default `true`). */
  silenceDetection?: boolean;
}

/**
 * Start microphone recording, preferring the native addon and falling back to
 * the SoX `rec` CLI. Captured raw PCM chunks are delivered to `onData`; `onStop`
 * fires when recording ends (silence detected or process closed).
 *
 * @param onData  receives each raw audio chunk
 * @param onStop  called when recording stops
 * @param options recording options (e.g. silence detection)
 * @returns `true` once recording has started
 */
async function startRecording(onData: (chunk: Buffer) => void, onStop: () => void, options?: RecordingOptions): Promise<boolean> {
  N("[voice] startRecording called, platform=darwin");
  let napiNamespace = await loadAudioCaptureNapi(),
    nativeAvailable = napiNamespace.isNativeAudioAvailable() && !0,
    silenceDetection = options?.silenceDetection !== !1;
  if (nativeAvailable) {
    if (nativeRecordingActive || napiNamespace.isNativeRecordingActive()) napiNamespace.stopNativeRecording(), nativeRecordingActive = !1;
    if (napiNamespace.startNativeRecording(chunk => {
      onData(chunk);
    }, () => {
      if (silenceDetection) nativeRecordingActive = !1, onStop();
    })) return nativeRecordingActive = !0, !0;
  }
  return startSoxRecording(onData, onStop, options);
}

/**
 * Fallback recorder: spawn the SoX `rec` CLI to capture 16 kHz / 16-bit signed
 * mono raw PCM on stdout. When silence detection is enabled, `rec`'s `silence`
 * effect is configured to stop after ~2s below a 3% threshold.
 */
function startSoxRecording(onData: (chunk: Buffer) => void, onStop: () => void, options?: RecordingOptions): boolean {
  let silenceDetection = options?.silenceDetection !== !1,
    recArgs = ["-q", "--buffer", "1024", "-t", "raw", "-r", String(RECORDING_SAMPLE_RATE), "-e", "signed", "-b", "16", "-c", String(RECORDING_CHANNELS), "-"];
  if (silenceDetection) recArgs.push("silence", "1", "0.1", SILENCE_THRESHOLD, "1", SILENCE_DURATION_SECONDS, SILENCE_THRESHOLD);
  let recProcess = childProcess.spawn("rec", recArgs, {
    stdio: ["pipe", "pipe", "pipe"]
  });
  return soxRecordingProcess = recProcess, recProcess.stdout?.on("data", chunk => {
    onData(chunk);
  }), recProcess.stderr?.on("data", () => {}), recProcess.on("close", () => {
    soxRecordingProcess = null, onStop();
  }), recProcess.on("error", error => {
    N(`[voice] SoX rec spawn failed: ${error instanceof Error ? error.message : String(error)}`, {
      level: "error"
    }), soxRecordingProcess = null, onStop();
  }), !0;
}

/** Stop the active recording, whether native or the SoX fallback process. */
function stopRecording(): void {
  if (nativeRecordingActive && loadedNapiNamespace) {
    loadedNapiNamespace.stopNativeRecording(), nativeRecordingActive = !1;
    return;
  }
  if (soxRecordingProcess) soxRecordingProcess.kill("SIGTERM"), soxRecordingProcess = null;
}
var childProcess: typeof import("child_process"),
  loadedNapiNamespace: NativeAudioCaptureExports | null = null,
  audioCaptureNapiPromise: Promise<NativeAudioCaptureExports> | null = null,
  RECORDING_SAMPLE_RATE = 16000,
  RECORDING_CHANNELS = 1,
  SILENCE_DURATION_SECONDS = "2.0",
  SILENCE_THRESHOLD = "3%",
  // FIXME: unverified name — cache slots only touched by the test reset hooks above.
  arecordProbeCache: unknown = null,
  alsaCardsCache: unknown = null,
  soxRecordingProcess: import("child_process").ChildProcess | null = null,
  nativeRecordingActive = !1;
var initVoiceModule = L(() => {
  FH();
  A6();
  l7();
  y9();
  childProcess = require("child_process");
});
export {nativeAudioCaptureExports as UUl,loadNativeAudioModule as lSe,isNativeAudioAvailable,startNativeRecording,stopNativeRecording,isNativeRecordingActive,startNativePlayback,writeNativePlaybackData,stopNativePlayback,isNativePlaying,microphoneAuthorizationStatus,cachedNativeAudioModule as RVt,nativeAudioModuleLoadAttempted as BUl,voiceRecordingExports as vVt,loadAudioCaptureNapi as HJn,isCommandAvailable as qDo,_resetArecordProbeForTesting,_resetAlsaCardsForTesting,getSoxInstallCommand as GUl,checkVoiceDependencies,requestMicrophonePermission,checkRecordingAvailability,startRecording,startSoxRecording as UCm,stopRecording,childProcess as WUl,loadedNapiNamespace as $Do,audioCaptureNapiPromise as $Ul,RECORDING_SAMPLE_RATE as ICm,RECORDING_CHANNELS as xCm,SILENCE_DURATION_SECONDS as DCm,SILENCE_THRESHOLD as qUl,arecordProbeCache as PCm,alsaCardsCache as LCm,soxRecordingProcess as r_t,nativeRecordingActive as n_t,initVoiceModule as wVt};

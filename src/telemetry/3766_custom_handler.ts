// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {mn as M6,xe as IH,He as vH} from "./0600_feature_name.ts";
import {kt as y_,logEvent as c} from "../../vendor/m132.ts";
import {Sc as u1,getOauthConfig as F9} from "../api/0465_getOauthConfig.ts";
import {vn as S6,Ie as EH} from "../session/0621_length.ts";
import {aI as Ih,shouldUseClaudeAIAuth as yI} from "../config/1293_storeOAuthAccountInfo.ts";
// Cross-module references — kept as-is to preserve linkage
declare function M6(): void;
declare function y_(): void;
declare function u1(): void;
declare function S6(): void;
declare function Ih(): void;
declare function L(init: () => void): void;
declare function j_(target: object, exports: Record<string, () => unknown>): void;
declare function V6<T>(fn: () => T): () => T;

/** Log telemetry event (tengu_* events). Cross-module — do not rename. */
declare function c(event: string, payload: Record<string, unknown>): void;
/** Log feature success (tengu_feature_ok). Cross-module — do not rename. */
declare function vH(featureName: string): void;
/** Log feature failure (tengu_feature_bad). Cross-module — do not rename. */
declare function IH(featureName: string, errorCode: string, extra?: Record<string, unknown>): void;
/** Report error to telemetry backend. Cross-module — do not rename. */
declare function EH(error: unknown): void;
/** Check whether a scopes array represents a Claude AI (claude.ai) login. Cross-module — do not rename. */
declare function yI(scopes: string[] | undefined): boolean;
/** Return the OAuth configuration object (URLs, client ID, etc.). Cross-module — do not rename. */
declare function F9(): {
  CLAUDEAI_SUCCESS_URL: string;
  CONSOLE_SUCCESS_URL: string;
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Module-level variables (kept as declared by the bundler pattern)
// ---------------------------------------------------------------------------

var NDK: typeof http;

/**
 * Local HTTP server that handles the OAuth authorization-code redirect.
 *
 * Flow:
 *  1. Call `start()` → binds to localhost, returns the assigned port.
 *  2. Call `waitForAuthorization(state, readyCallback)` → returns a promise
 *     that resolves with the authorization code once the browser callback arrives.
 *  3. After exchanging the code for tokens, call `handleSuccessRedirect()` or
 *     `handleErrorRedirect()` to send the final HTTP response to the browser.
 *  4. Call `close()` (or use `using` / `Symbol.dispose`) when done.
 */
var Ne8: {
  new (callbackPath?: string): OAuthCallbackServerInstance;
};
interface OAuthCallbackServerInstance {
  localServer: http.Server;
  port: number;
  promiseResolver: ((code: string) => void) | null;
  promiseRejecter: ((err: Error) => void) | null;
  expectedState: string | null;
  pendingResponse: http.ServerResponse | null;
  callbackPath: string;
  start(preferredPort?: number): Promise<number>;
  getPort(): number;
  hasPendingResponse(): boolean;
  waitForAuthorization(state: string, readyCallback: () => void): Promise<string>;
  handleSuccessRedirect(scopes: string[], customHandler?: (res: http.ServerResponse, scopes: string[]) => void): void;
  handleErrorRedirect(): void;
  startLocalListener(readyCallback: () => void): void;
  handleRedirect(req: http.IncomingMessage, res: http.ServerResponse): void;
  validateAndRespond(code: string | undefined, state: string | undefined, res: http.ServerResponse): void;
  handleError(err: Error): void;
  resolve(code: string): void;
  reject(err: Error): void;
  close(): void;
  [Symbol.dispose](): void;
}

// ---------------------------------------------------------------------------
// Module initializer (VDK — bundler lazy-init pattern; name preserved)
// ---------------------------------------------------------------------------

var VDK = L(() => {
  M6();
  y_();
  u1();
  S6();
  Ih();
  NDK = require("http");
  Ne8 = class Ne8 {
    localServer: http.Server;
    port = 0;
    promiseResolver: ((code: string) => void) | null = null;
    promiseRejecter: ((err: Error) => void) | null = null;
    expectedState: string | null = null;
    pendingResponse: http.ServerResponse | null = null;
    callbackPath: string;
    constructor(callbackPath = "/callback") {
      this.localServer = NDK.createServer(), this.callbackPath = callbackPath;
    }
    async start(preferredPort?: number): Promise<number> {
      return new Promise((resolve, reject) => {
        this.localServer.once("error", (err: Error & {
          message: string;
        }) => {
          IH("oauth_callback_listener", "oauth_callback_server_start_failed"), reject(Error(`Failed to start OAuth callback server: ${err.message}`));
        }), this.localServer.listen(preferredPort ?? 0, "127.0.0.1", () => {
          let addr = this.localServer.address() as {
            port: number;
          };
          this.port = addr.port, resolve(this.port);
        });
      });
    }
    getPort(): number {
      return this.port;
    }
    hasPendingResponse(): boolean {
      return this.pendingResponse !== null;
    }
    async waitForAuthorization(state: string, readyCallback: () => void): Promise<string> {
      return new Promise((resolve, reject) => {
        this.promiseResolver = resolve, this.promiseRejecter = reject, this.expectedState = state, this.startLocalListener(readyCallback);
      });
    }

    /**
     * Send the post-authorization success redirect to the browser.
     *
     * If `customHandler` is provided it receives the pending response and the
     * granted scopes so the caller can craft its own redirect.  Otherwise the
     * method picks the appropriate Anthropic success URL based on whether the
     * scopes belong to a Claude AI (claude.ai) login.
     */
    handleSuccessRedirect(scopes: string[], customHandler?: (res: http.ServerResponse, scopes: string[]) => void): void {
      if (!this.pendingResponse) return;
      if (customHandler) {
        customHandler(this.pendingResponse, scopes), this.pendingResponse = null, c("tengu_oauth_automatic_redirect", {
          custom_handler: !0
        });
        return;
      }
      let redirectUrl = yI(scopes) ? F9().CLAUDEAI_SUCCESS_URL : F9().CONSOLE_SUCCESS_URL;
      this.pendingResponse.writeHead(302, {
        Location: redirectUrl
      }), this.pendingResponse.end(), this.pendingResponse = null, c("tengu_oauth_automatic_redirect", {});
    }

    /** Send the post-authorization error redirect to the browser. */
    handleErrorRedirect(): void {
      if (!this.pendingResponse) return;
      let redirectUrl = F9().CLAUDEAI_SUCCESS_URL;
      this.pendingResponse.writeHead(302, {
        Location: redirectUrl
      }), this.pendingResponse.end(), this.pendingResponse = null, c("tengu_oauth_automatic_redirect_error", {});
    }
    startLocalListener(readyCallback: () => void): void {
      this.localServer.on("request", this.handleRedirect.bind(this)), this.localServer.on("error", this.handleError.bind(this)), readyCallback();
    }
    handleRedirect(req: http.IncomingMessage, res: http.ServerResponse): void {
      let parsedUrl = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      if (parsedUrl.pathname !== this.callbackPath) {
        res.writeHead(404), res.end();
        return;
      }
      let code = parsedUrl.searchParams.get("code") ?? void 0,
        state = parsedUrl.searchParams.get("state") ?? void 0;
      this.validateAndRespond(code, state, res);
    }
    validateAndRespond(code: string | undefined, state: string | undefined, res: http.ServerResponse): void {
      if (!code) {
        IH("oauth_callback_listener", "oauth_callback_no_code"), res.writeHead(400), res.end("Authorization code not found"), this.reject(Error("No authorization code received"));
        return;
      }
      if (state !== this.expectedState) {
        IH("oauth_callback_listener", "oauth_callback_state_mismatch"), res.writeHead(400), res.end("Invalid state parameter"), this.reject(Error("Invalid state parameter"));
        return;
      }
      this.pendingResponse = res, vH("oauth_callback_listener"), this.resolve(code);
    }
    handleError(err: Error): void {
      IH("oauth_callback_listener", "oauth_callback_server_error"), EH(err), this.close(), this.reject(err);
    }
    resolve(code: string): void {
      if (this.promiseResolver) this.promiseResolver(code), this.promiseResolver = null, this.promiseRejecter = null;
    }
    reject(err: Error): void {
      if (this.promiseRejecter) this.promiseRejecter(err), this.promiseResolver = null, this.promiseRejecter = null;
    }
    close(): void {
      if (this.pendingResponse) this.handleErrorRedirect();
      if (this.localServer) this.localServer.removeAllListeners(), this.localServer.close();
    }
    [Symbol.dispose](): void {
      this.close();
    }
  };
});
export {NDK as PDa,Ne8 as Dao,VDK as ODa};

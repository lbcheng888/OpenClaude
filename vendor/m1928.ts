// @ts-nocheck
import {nQs,rQs} from "./m1927.ts";
import {p0,kw,XD} from "./m1634.ts";
import {isKeybindingCustomizationEnabled,S1} from "./m1712.ts";
import {Av} from "./m1633.ts";
import {qJe,Kfn,bse} from "./m1923.ts";
import {d0,Hh,GS,hm} from "./m1631.ts";
import {CredentialUnavailableError,JD} from "./m1632.ts";
import {b} from "../runtime.ts";
function iQs(e){if(sQs)return`${e}.exe`;else return e}
async function oQs(e,t){let n=[];for(let r of e){let[o,...s]=r,i=await nQs.execFile(o,s,{encoding:"utf8",timeout:t});n.push(i)}return n}
class AzurePowerShellCredential{constructor(e){if(e===null||e===void 0?void 0:e.tenantId)p0(ofe,e===null||e===void 0?void 0:e.tenantId),this.tenantId=e===null||e===void 0?void 0:e.tenantId;this.additionallyAllowedTenantIds=kw(e===null||e===void 0?void 0:e.additionallyAllowedTenants),this.timeout=e===null||e===void 0?void 0:e.processTimeoutInMs}async getAzurePowerShellAccessToken(e,t,n){for(let r of[...SPr]){try{await oQs([[r,"/?"]],n)}catch(i){SPr.shift();continue}let s=(await oQs([[r,"-NoProfile","-NonInteractive","-Command",`
          $tenantId = "${t!==null&&t!==void 0?t:""}"
          $m = Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru
          $useSecureString = $m.Version -ge [version]'2.17.0'

          $params = @{
            ResourceUrl = "${e}"
          }

          if ($tenantId.Length -gt 0) {
            $params["TenantId"] = $tenantId
          }

          if ($useSecureString) {
            $params["AsSecureString"] = $true
          }

          $token = Get-AzAccessToken @params

          $result = New-Object -TypeName PSObject
          $result | Add-Member -MemberType NoteProperty -Name ExpiresOn -Value $token.ExpiresOn
          if ($useSecureString) {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value (ConvertFrom-SecureString -AsPlainText $token.Token)
          } else {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value $token.Token
          }

          Write-Output (ConvertTo-Json $result)
          `]]))[0];return A6u(s)}throw Error("Unable to execute PowerShell. Ensure that it is installed in your system")}async getToken(e,t={}){return isKeybindingCustomizationEnabled.withSpan(`${this.constructor.name}.getToken`,t,async()=>{let n=Av(this.tenantId,t,this.additionallyAllowedTenantIds),r=typeof e==="string"?e:e[0];if(n)p0(ofe,n);try{qJe(r,ofe),ofe.getToken.info(`Using the scope ${r}`);let o=Kfn(r),s=await this.getAzurePowerShellAccessToken(o,n,this.timeout);return ofe.getToken.info(d0(e)),{token:s.Token,expiresOnTimestamp:new Date(s.ExpiresOn).getTime(),tokenType:"Bearer"}}catch(o){if(f6u(o)){let i=new CredentialUnavailableError(TPr.installed);throw ofe.getToken.info(Hh(r,i)),i}else if(m6u(o)){let i=new CredentialUnavailableError(TPr.login);throw ofe.getToken.info(Hh(r,i)),i}let s=new CredentialUnavailableError(`${o}. ${TPr.troubleshoot}`);throw ofe.getToken.info(Hh(r,s)),s}})}}
async function A6u(e){let t=/{[^{}]*}/g,n=e.match(t),r=e;if(n)try{for(let o of n)try{let s=JSON.parse(o);if(s===null||s===void 0?void 0:s.Token){if(r=r.replace(o,""),r)ofe.getToken.warning(r);return s}}catch(s){continue}}catch(o){throw Error(`Unable to parse the output of PowerShell. Received output: ${e}`)}throw Error(`No access token found in the output. Received output: ${e}`)}
var ofe,sQs=!1,aQs,TPr,m6u=(e)=>e.message.match(`(.*)${aQs.login}(.*)`),f6u=(e)=>e.message.match(aQs.installed),SPr;
var bPr=b(()=>{XD();GS();bse();JD();rQs();S1();ofe=hm("AzurePowerShellCredential");aQs={login:"Run Connect-AzAccount to login",installed:"The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"},TPr={login:"Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",installed:`The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,troubleshoot:"To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot."},SPr=[iQs("pwsh")];if(sQs)SPr.push(iQs("powershell"))});
export {iQs,oQs,AzurePowerShellCredential,A6u,ofe,sQs,aQs,TPr,m6u,f6u,SPr,bPr};

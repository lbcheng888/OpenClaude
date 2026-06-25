// @ts-nocheck
import {Xri,Qri} from "./m1932.ts";
import {I0,PR,uD} from "./m1639.ts";
import {jg,LM} from "./m1717.ts";
import {EA} from "./m1638.ts";
import {UQe,H_n,bse} from "./m1928.ts";
import {H0,Oh,VS,Lp} from "./m1636.ts";
import {CredentialUnavailableError,cD} from "./m1637.ts";
import {b} from "../runtime.ts";
function toi(e){if(eoi)return`${e}.exe`;else return e}
async function Zri(e,t){let n=[];for(let r of e){let[o,...s]=r,i=await Xri.execFile(o,s,{encoding:"utf8",timeout:t});n.push(i)}return n}
class AzurePowerShellCredential{constructor(e){if(e===null||e===void 0?void 0:e.tenantId)I0(mfe,e===null||e===void 0?void 0:e.tenantId),this.tenantId=e===null||e===void 0?void 0:e.tenantId;this.additionallyAllowedTenantIds=PR(e===null||e===void 0?void 0:e.additionallyAllowedTenants),this.timeout=e===null||e===void 0?void 0:e.processTimeoutInMs}async getAzurePowerShellAccessToken(e,t,n){for(let r of[...X1r]){try{await Zri([[r,"/?"]],n)}catch(i){X1r.shift();continue}let s=(await Zri([[r,"-NoProfile","-NonInteractive","-Command",`
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
          `]]))[0];return OYu(s)}throw Error("Unable to execute PowerShell. Ensure that it is installed in your system")}async getToken(e,t={}){return jg.withSpan(`${this.constructor.name}.getToken`,t,async()=>{let n=EA(this.tenantId,t,this.additionallyAllowedTenantIds),r=typeof e==="string"?e:e[0];if(n)I0(mfe,n);try{UQe(r,mfe),mfe.getToken.info(`Using the scope ${r}`);let o=H_n(r),s=await this.getAzurePowerShellAccessToken(o,n,this.timeout);return mfe.getToken.info(H0(e)),{token:s.Token,expiresOnTimestamp:new Date(s.ExpiresOn).getTime(),tokenType:"Bearer"}}catch(o){if(PYu(o)){let i=new CredentialUnavailableError(J1r.installed);throw mfe.getToken.info(Oh(r,i)),i}else if(DYu(o)){let i=new CredentialUnavailableError(J1r.login);throw mfe.getToken.info(Oh(r,i)),i}let s=new CredentialUnavailableError(`${o}. ${J1r.troubleshoot}`);throw mfe.getToken.info(Oh(r,s)),s}})}}
async function OYu(e){let t=/{[^{}]*}/g,n=e.match(t),r=e;if(n)try{for(let o of n)try{let s=JSON.parse(o);if(s===null||s===void 0?void 0:s.Token){if(r=r.replace(o,""),r)mfe.getToken.warning(r);return s}}catch(s){continue}}catch(o){throw Error(`Unable to parse the output of PowerShell. Received output: ${e}`)}throw Error(`No access token found in the output. Received output: ${e}`)}
var mfe,eoi=!1,noi,J1r,DYu=(e)=>e.message.match(`(.*)${noi.login}(.*)`),PYu=(e)=>e.message.match(noi.installed),X1r;
var Q1r=b(()=>{uD();VS();bse();cD();Qri();LM();mfe=Lp("AzurePowerShellCredential");noi={login:"Run Connect-AzAccount to login",installed:"The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"},J1r={login:"Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",installed:`The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,troubleshoot:"To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot."},X1r=[toi("pwsh")];if(eoi)X1r.push(toi("powershell"))});
export {toi,Zri,AzurePowerShellCredential,OYu,mfe,eoi,noi,J1r,DYu,PYu,X1r,Q1r};

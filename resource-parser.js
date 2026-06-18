/** 
 Quantumult X's resource parser, modified from KOP-XIAO/QuantumultX
 version: 0.1.0
*/


//beginning 解析器正常使用，調試註釋此部分


//
let version = typeof $environment != "undefined" ? Number($environment.version.split("build")[1]): 0 // 版本号

const UA_Retry= "Shadowrocket/3218 CFNetwork/3860.600.12 Darwin/25.5.0 iPhone18,1"
const currentUA = $resource.user_agent;
const inRetry = currentUA && currentUA.length > 0;

var  UARetry = 0;


let [link0, content0] = [$resource.link, $resource.content]

let Perror = 0 //错误类型


const ADDRes = `quantumult-x:///add-resource?remote-resource=url-encoded-json`
var RLink0 = {
  "filter_remote": [],
  "rewrite_remote": [],
  "server_remote": [],
}
const Field = {
  "filter" : "filter_remote",
  "rewrite": "rewrite_remote",
  "server" : "server_remote"
}  

const subtag = typeof $resource.tag != "undefined" ? $resource.tag : "";
////// 非 raw 链接的沙雕情形
content0 = content0.indexOf("DOCTYPE html") != -1 && link0.indexOf("github.com") != -1 ? ToRaw(content0) : content0 ;
// loon插件链接
content0 = link0.indexOf("nsloon.com/openloon/import?plugin=") != -1 ? ToLink(link0) : content0 ;
//ends 正常使用部分，調試註釋此部分


//常用量
const Base64 = new Base64Code();
var link1 = link0.split("#")[0]
const nan_link = { "open-url": link1 } // nan error link
const bug_link = nan_link // local error notification link
const update_link = {"open-url" : "https://apps.apple.com/us/app/quantumult-x/id1443988620"}
const plink0 = {"open-url" : link0} // 跳转订阅链接

if(version == 0) { $notify("注意: 请更新 Quantumult X 至最新商店版本\n"," 当前版本可能无法正常使用部分功能","\n 点击跳转商店链接更新",update_link) }

// User-controlled URL/customization parameters are disabled.
var Pudp0 = 0;
var Ptfo0 = 0;
var Ppolicy = "Shawn";
var Pcert0 = 0;
var PTls13 = 0;
var Pntf0 = 2;
var emojino = ["0️⃣", "1⃣️", "2⃣️", "3⃣️", "4⃣️", "5⃣️", "6⃣️", "7⃣️", "8⃣️", "9⃣️", "🔟"]
let [errornode, total] = "";
var typeU = "";
var typeQ = $resource.type? $resource.type:"unsupported"   //返回 field 类型参数
var typec="" //check result type
var Pmix = version>=844? 1 : 0 // allow rewrite and filter mix from version 844
var Pjsonjq = version>=845? 0 : 1 // allow jsonjq from version 845
var PNS=0 // 不支持的节点统计
var NSList=["当前订阅内，不支持以下节点 ↘️ \n"] // 不支持节点列表

var RLink = `{
  "server_remote": [
    sremoteposition
  ],
  "filter_remote": [
    fremoteposition
  ],
  "rewrite_remote": [
    rremoteposition
  ]
}`

function VCheck(cnt) {
  cnts=cnt.split("\n").filter(Boolean).map(item=>item.trim()).filter(item => /^http/.test(item)).map(item=>"\""+item+"\"")
  cnts=cnts.join(",\n")
  return  cnts
  }

//
//流量信息
var Finfo={}

//STATUS=↑:0.62GB,↓:15.1GB,TOT:200GBExpires:2026-08-02
//status=↑:0.83gb,↓:17.73gb,tot:200gbexpires:2026-08-02
//2026-05-06 for shadowrocket sub with flow-info-fake server
function Rocket_flow(RInfo) {
  var Rinfo=RInfo.replace(/ /g, "").toLowerCase()
  var BJson={}
  try {
    var Pdate = Rinfo.split("expires:")[1].split(",")[0].replace(/[^\x00-\x7F]/g, '').trim()// date-time
    var Ptotal = Number(Rinfo.split("tot:")[1].split("gb")[0]) // flow
    var Pupload = Number(Rinfo.split("↑:")[1].split("gb")[0]) // upload
    var Pdown = Number(Rinfo.split("↓:")[1].split("gb")[0]) // download
    var Bdate = Math.floor(Date.parse(Pdate)/1000)? Math.floor(Date.parse(Pdate)/1000): Math.floor(Date.parse("2046-10-10")/1000) 
    var Btotal=Ptotal? Ptotal*1024*1024*1024 : 0
    var Bused=Pupload? (Pupload+Pdown)*1024*1024*1024 : 0
    var Bremain=Btotal !=0 ? Btotal-Bused : 1
    BJson={bytes_used: Bused, bytes_remaining: Bremain, expire_date: Bdate}
    Finfo = BJson
  } catch (error) {
    console.log(error)
  }
}

//花漾字 pattern
var pat=[]
pat[0] = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","k","r","s","t","u","v","w","x","y","z"]
pat[1] = ["🅰","🅱","🅲","🅳","🅴","🅵","🅶","🅷","🅸","🅹","🅺","🅻","🅼","🅽","🅾","🅿","🅺","🆁","🆂","🆃","🆄","🆅","🆆","🆇","🆈","🆉"]
pat[2] = ["🄰","🄱","🄲","🄳","🄴","🄵","🄶","🄷","🄸","🄹","🄺","🄻","🄼","🄽","🄾","🄿","🄺","🅁","🅂","🅃","🅄","🅅","🅆","🅇","🅈","🅉"]
pat[3] = ["𝐀","𝐁","𝐂","𝐃","𝐄","𝐅","𝐆","𝐇","𝐈","𝐉","𝐊","𝐋","𝐌","𝐍","𝐎","𝐏","𝐊","𝐑","𝐒","𝐓","𝐔","𝐕","𝐖","𝐗","𝐘","𝐙"]
pat[4] = ["𝗮","𝗯","𝗰","𝗱","𝗲","𝗳","𝗴","𝗵","i","𝗷","𝗸","𝗹","𝗺","𝗻","𝗼","𝗽","𝗸","𝗿","𝘀","𝐭","𝘂","𝘃","𝘄","𝘅","𝘆","𝘇"]
pat[5] = ["𝔸","𝔹","ℂ","𝔻","𝔼","𝔽","𝔾","ℍ","𝕀","𝕁","𝕂","𝕃","𝕄","ℕ","𝕆","ℙ","𝕂","ℝ","𝕊","𝕋","𝕌","𝕍","𝕎","𝕏","𝕐","ℤ"]
pat[6] = ["𝕒","𝕓","𝕔","𝕕","𝕖","𝕗","𝕘","𝕙","𝕚","𝕛","𝕜","𝕝","𝕞","𝕟","𝕠","𝕡","𝕜","𝕣","𝕤","𝕥","𝕦","𝕧","𝕨","𝕩","𝕪","𝕫"]
pat[7] = ["ᵃ","ᵇ","ᶜ","ᵈ","ᵉ","ᶠ","ᵍ","ʰ","ⁱ","ʲ","ᵏ","ˡ","ᵐ","ⁿ","ᵒ","ᵖ","ᵒ⃒","ʳ","ˢ","ᵗ","ᵘ","ᵛ","ʷ","ˣ","ʸ","ᙆ"]
pat[8] = ["ᴬ","ᴮ","ᒼ","ᴰ","ᴱ","ᶠ","ᴳ","ᴴ","ᴵ","ᴶ","ᴷ","ᴸ","ᴹ","ᴺ","ᴼ","ᴾ","ᴼ̴","ᴿ","ˢ","ᵀ","ᵁ","ᵛ","ᵂ","ˣ","ʸ","ᙆ"]

// 花式数字
var patn=[]
patn[0] = ["0","1","2","3","4","5","6","7","8","9"]
patn[1] = [ '⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨' ]
patn[2] = [ '⓪', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾' ]
patn[3] = [ '⓪', '⓵', '⓶', '⓷', '⓸', '⓹', '⓺', '⓼', '⓻', '⓽' ]
patn[4] = [ '𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡' ]
patn[5] = [ '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹' ]
patn[6] = [ '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉' ]
patn[7] = ["𝟎","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟳","𝟖","𝟗"]
patn[8] = ["𝟶","𝟷","𝟸","𝟹","𝟺","𝟻","𝟼","𝟽","𝟾","𝟿"]


// 将数字替换成 emoji 数字，处理10的特殊版本（需要"10"），2026-04-22
function numToEmoji10(n) {
    if (n == 10) {
      return emojino[10]+" -> ";
    } else {
      return String(n).split('').map(d => emojino[d] || d).join('')+" -> ";
    }
};


//避免json undefined错误的 函数
const getValue = (fn, defaultVaule) => {
  try {
    return fn();
  } catch {
    return defaultVaule;
  }
};

var type0=""
//flag=1,2,3分别为 server、rewrite、rule 类型
var flag = 1

// retry with new UA, default use shadowrocket
if (UARetry && !inRetry && version>920) {
  $notify("注意: 将尝试使用其他 UA, 重新获取订阅内容","注意: 如仍旧无有效内容，请自行与节点提供商联系","注意: 本次尝试使用 User-Agent 为 如下\n\n"+UA_Retry)
  $done({retry: {user_agent: "Shadowrocket/3218 CFNetwork/3860.600.12 Darwin/25.5.0 iPhone18,1"}})
} else {
  Parser()
  $done({ content: total, info: Finfo })
}

function Parser() {
  type0 = Type_Check(content0); //  类型判断
  if (type0 != "web" && type0 != "wrong-field" && type0 != "JS-0" && type0 != "wrong-link"){
    try {
      total = ResourceParse();
      
    } catch (err) {
      if(Perror == 0) {
      $notify("错误: 解析出现错误", "注意: 请自行检查订阅链接或内容", err, bug_link);
    }
    }
  } else if (type0 == "wrong-field"){
    if (version >= 670 && typec!="") { //尝试跳转到正确类型
      RLink0[Field[typec]].push($resource.link+", opt-parser=true, tag=下次添加资源可长按") //  跳转URI-Scheme
      var flink = ADDRes.replace(/url-encoded-json/,encodeURIComponent(JSON.stringify(RLink0)))
      const bug_linkx = { "open-url": flink } // add-resource link
    $notify( "注意: 请点击通知跳转尝试添加到正确类型中","错误: 检测类型["+typec+"]"+"与填入类型"+"["+typeQ+"]冲突", "如果跳转添加仍旧失败，请自行检查订阅链接\n"+$resource.link, bug_linkx)
    } else {//旧版本
    $notify("错误: 检测类型「"+typec+" 」"+"与目标类型"+" 「"+typeQ+" 」冲突", "注意: 请自行检查链接内容", $resource.link, bug_link)
    }
    total=""
  } else {
    total=""
  }
    $done({ content: total });
}




/**
# 以下为具体的 function

*/

function ParseUnknown(cnt){
  try {
    cnt = JSON.parse(cnt)
    if(cnt) {
      $notify("注意: 链接返回内容并非有效订阅"+ "[" + subtag + "]","提示: 请自行检查原始链接，返回内容 如下",JSON.stringify(cnt), bug_link)
    }
    
  } catch {
    if (!/error|block|invalid|support/.test(cnt.toLowerCase())) {
    $notify(" 未能识别订阅 " + "[" + subtag + "] 的内容",  "注意: 将尝试直接导入Quantumult X \n 请自行检查原始链接或返回内容", "订阅返回内容: 如下 \n"+cnt, bug_link);
  } else {
    $notify("[" + subtag + "] 返回内容无效",  "请自行检查订阅内容", "订阅返回内容: \n"+cnt, plink0);
  }
}
}


function ResourceParse() {
  //预处理，分流/重写等处理完成
  if (type0 == "Subs-B64Encode") { // subs2QX 负责所有节点的转换
    total = Subs2QX(Base64.decode(content0), Pudp0, Ptfo0, Pcert0, PTls13);
  } else if (type0 == "Subs") {
    total = Subs2QX(content0, Pudp0, Ptfo0, Pcert0, PTls13);
  } else if (type0 == "QuanX" || type0 == "Clash" || type0 == "Surge") {
    total = Subs2QX(isQuanX(content0).join("\n"), Pudp0, Ptfo0, Pcert0, PTls13);
  } else if (type0 == "sgmodule") { // surge module 模块/含 url-regex 的 rule-set
    //2023-03-06 考虑模块重写与quanx类型重写的混搭
    flag = 2 
    total = Rewrite_Filter(isQuanXRewrite(content0.split("\n"))); // 筛选过滤
    total = total.filter( (ele,pos)=>total.indexOf(ele) == pos); //重写重复检查
    total = total.join("\n")
  } else if (type0 == "rewrite") { // rewrite 类型
    flag = 2;
    total = Rewrite_Filter(isQuanXRewrite(content0.split("\n")));
    // rewrite重复检测
    total = total.filter( (ele,pos)=>total.indexOf(ele) == pos);
    total = total.join("\n")
  } else if (type0 == "Rule") {  // rule 类型, 已处理完毕
    flag = 3;
    total = Rule_Handle(content0.split("\n").map(item=>item.trim()).filter(Boolean)).filter(Boolean);
      // filter 重复检测
    total = total.length<100? total.filter( (ele,pos)=>total.indexOf(ele) == pos) : total
    total = total.join("\n")
  } else if (content0.trim() == "") {
    $notify("注意: 当前引用" + "[" + subtag + "]" + " 返回內容为空", "1 请确认 APP 已经更新至最新版本 1.5.6", "2 如确认链接有效，请打开资源解析器的「User-Agent 替换」选项重新获取链接内容 ", nan_link);
    flag = 0;
  } else if (type0 == "sub-http") {
    let url = VCheck(String(Base64.decode(content0.split("sub://")[1].split("#")[0])+", opt-parser=true, tag="+(new Date()).getTime()))
     RLink = RLink.replace("sremoteposition",url).replace("fremoteposition","").replace("rremoteposition","")
    let ADDres0 = ADDRes.replace("url-encoded-json",encodeURIComponent(RLink))
    openlink = {"open-url": ADDres0}
    $notify("注意: 该链接为节点订阅, 请点击此通知跳转添加", url, ADDres0,openlink)
    flag = -1
    total = ""
  } else if (type0 == "unknown") {
    ParseUnknown(content0)
    flag = -1;
  } else if (type0 == "profile") {
    $notify("注意: 该链接为完整配置文件, 请点击此通知跳转", "已忽略配置内远程资源自定义字段", ADDRes, {"open-url": ADDRes})
    flag = -1;
    total = ""
  }

  //开始处理
  if (flag == 1) { //server 类型统一处理
    total = isQuanX(total.filter(Boolean).join("\n"))
    if (total.length > 0){
      total = TagCheck_QX(total).join("\n") //节点名检查
      total = Base64.encode(total) //强制节点类型 base64 加密后再导入 Quantumult X
      if (PNS !=0) {
        if (version >913) {
          $notify("注意: 存在 QuantumultX 不支持类型 -> ["+subtag+"]", "注意: 已忽略相关节点，共计 -> "+PNS+" 条", "注意: 此版本暂不支持 Hysteria2/Tuic 等类型, 以及 http-upgrade/xhttp/grpc/mkcp/h2” 等类型 vless\n\n"+NSList.join("\n"))
        } else {
          $notify("注意: 存在 QuantumultX 不支持类型 -> ["+subtag+"]", "注意: 已忽略相关节点，共计 -> "+PNS+" 条", "注意: 此版本暂不支持 Hysteria2/Tuic/Anytls 等类型, 以及 http-upgrade/xhttp/grpc/mkcp/h2” 等类型 vless\n\n"+NSList.join("\n"))
        }
      }
      $done({ content: total });
    } else { // total length = 0
      if(Perror == 0) {
      if (PNS !=0) { // 全部为不支持类型节点
        if (version >913) {
          $notify("注意: QuantumultX 不支持该订阅内的任何节点-> ["+subtag+"]", "注意: 已忽略共计 -> "+PNS+" 条不支持节点，剩余 0 条", "注意: 此版本暂不支持 Hysteria2/Tuic 等类型, 以及 http-upgrade/xhttp/grpc/mkcp/h2” 等类型 vless\n\n"+NSList.join("\n"))
        } else {
          $notify("注意: QuantumultX 不支持该订阅内的任何节点-> ["+subtag+"]", "注意: 已忽略共计 -> "+PNS+" 条不支持节点，剩余 0 条", "注意: 此版本暂不支持 Hysteria2/Tuic/Anytls 等类型, 以及 http-upgrade/xhttp/grpc/mkcp/h2” 等类型 vless\n\n"+NSList.join("\n"))
        }
        
      } else { // 其它原因
        $notify("该订阅 -> "+ "[" + subtag + "] 解析后无有效节点", "注意: 解析后 Quantumult-X 支持节点数为 0 条", "请自行检查相关参数、确认节点类型", bug_link)
      } 
    }
      total = errornode
      $done({ content: errornode })
    }
  } else if (flag == 0){ //空/错误类型
    total = errornode
    $done({ content: errornode })
  } else if (flag == -1){ //未知类型
    total = content0
    $done({ content: content0 })
  } 
  return total
  
}

//判断订阅类型
function Type_Check(subs) {
    var type = "unknown"
    var RuleK = ["host,", "-suffix,", "domain,", "-keyword,", "ip-cidr,", "ip-cidr6,",  "geoip,", "user-agent,", "ip6-cidr,", "ip-asn"];
    var QuanXK = ["shadowsocks=", "trojan=", "vmess=", "http=", "socks5=", "vless=","anytls="];
    var SurgeK = ["=ss,", "=vmess,", "=trojan,", "=http,", "=custom,", "=https,", "=shadowsocks", "=shadowsocksr", "=sock5", "=sock5-tls","=anytls"];
    var ClashK = ["proxies:","\"proxies\":"]
    var SubK = ["dm1lc3M", "c3NyOi8v", "CnNzOi8", "dHJvamFu", "c3M6Ly", "c3NkOi8v", "c2hhZG93", "aHR0cDovLw", "aHR0cHM6L", "CnRyb2phbjo", "aHR0cD0", "aHR0cCA","U1RBVFVT","dmxlc3M6"];
    var RewriteK = [" url 302", " url 307", " url reject", " url script", " url req", " url res", " url echo", " url-and-header 302", " url-and-header 307", " url-and-header reject", " url-and-header script", " url-and-header req", " url-and-header res", " url-and-header echo", " url jsonjq"] // quantumult X 类型 rewrite
    var SubK2 = ["ss://", "vmess://", "ssr://", "trojan://", "ssd://", "\nhttps://", "\nhttp://","socks://","ssocks://","vless://","anytls://"];
    var ModuleK = ["[Script]", "[Rule]", "[URL Rewrite]", "[Map Local]", "\nhttp-r", "script-path"]
    var QXProfile = ["[filter_local]","[filter_remote]","[server_local]","[server_remote]"]
    var html = "DOCTYPE html"
    var subi = subs.replace(/ /g, "")
    const RuleCheck = (item) => subi.toLowerCase().indexOf(item) != -1;
    const NodeCheck = (item) => subi.toLowerCase().indexOf(item.toLowerCase()) != -1;
    const NodeCheck1 = (item) => subi.toLowerCase().indexOf(item.toLowerCase()) != -1; //b64加密的订阅类型
    const NodeCheck2 = (item) => subi.toLowerCase().indexOf(item.toLowerCase()) != -1; //URI 类型
    const RewriteCheck = (item) => subs.indexOf(item) != -1 ; // quanx 重写判定
    const ProfileCheck = (item) => subs.indexOf(item) != -1; //是否为quanx配置文件
    var subsn = subs.split("\n")
    if ( (subs.indexOf(html) != -1 || subs.indexOf("doctype html") != -1) && link0.indexOf("github.com" == -1)) {
      $notify("注意: 该链接返回为无效网页内容"+ " -> " + "[" + subtag + "]", "提示: 点通知跳转以确认链接是否失效\n"+link0, "返回内容如下：\n"+subs, nan_link);
      type = "web";
    } else if (typeU == "nodes" && typeQ=="server") { //指定为节点类型
      type = (typeQ == "unsupported" || typeQ =="server")? "Subs":"wrong-field"
    } else if (ClashK.some(NodeCheck) || typeU == "clash"){ // Clash 类型节点转换
      type = (typeQ == "unsupported" || typeQ =="server")? "Clash":"wrong-field";
      typec = "server"
      content0 = Clash2QX(subs)
    } else if (ModuleK.some(RewriteCheck) && subs.indexOf("[Proxy]") == -1 && typeQ !="filter") { // Surge 类型 module /rule-set(含url-regex) 类型
      typec="rewrite"
      type = (typeQ == "unsupported" || typeQ =="rewrite")? "sgmodule" : "wrong-field"
    } else if ((/(^hostname|\nhostname)\s*\=/.test(subi) || RewriteK.some(RewriteCheck)) && subi.indexOf("securehostname") == -1 && !(RuleK.some(RuleCheck) && typeQ == "filter") && !(typeQ!= "rewrite" && QXProfile.some(ProfileCheck))) {
      // 2022-07-20 remove constrain && !/\[(Proxy|filter_local)\]/.test(subs)
      typec = "rewrite"
      type = (typeQ == "unsupported" || typeQ =="rewrite")? "rewrite":"wrong-field" //Quantumult X 类型 rewrite/ Surge Script/
    } else if ((RuleK.some(RuleCheck) && subs.indexOf(html) == -1 ) && !(typeQ == "server" && (QuanXK.some(NodeCheck) || SurgeK.some(NodeCheck))) ) {
      // rule/filter类型
      // 2022-07-20 remove constrain && !/\[(Proxy|server_local)\]/.test(subs) adter html
      typec = "filter"
      type = (typeQ == "unsupported" || typeQ =="filter")? "Rule":"wrong-field";
    } else if (typeQ == "filter" && subs.indexOf("payload:")==-1) { // 纯 list类型？
      typec = "filter-list"
      type = (typeQ == "unsupported" || typeQ =="filter")? "Rule":"wrong-field";
      content0 = content0.split("\n").map(rule_list_handle).join("\n")
    } else if (subi.indexOf("sub://") == 0 || subi.indexOf("subs://") == 0) { // sub:// 类型
      typec = "sub-http"
      type = "sub-http"
    } else if (typeQ == "filter" && subs.indexOf("payload:")!=-1) { // clash-provider 类型？
      typec = "Clash-Provider"
      type = (typeQ == "unsupported" || typeQ =="filter")? "Rule":"wrong-field";
    } else if (subsn.length >= 1 && SubK2.some(NodeCheck2) && !/\[(Proxy|filter_local)\]/.test(subs)) { //未b64加密的多行URI 组合订阅
      typec = "server-uri"
      type= (typeQ == "unsupported" || typeQ =="server" || typeQ =="uri") ? "Subs":"wrong-field"
    } else if (subi.indexOf("tag=") != -1 && QuanXK.some(NodeCheck) && !/\[(Proxy|filter_local)\]/.test(subs)) {
      typec = "server-quanx"
      type = (typeQ == "unsupported" || typeQ =="server" || typeQ =="uri")? "Subs":"wrong-field" // QuanX list
    } else if (subs.indexOf("[Proxy]") != -1) {
      typec= "server-surge"
      type = (typeQ == "unsupported" || typeQ =="server" || typeQ =="uri")? "Surge":"wrong-field"; // Surge Profiles
      content0 = Surge2QX(content0).join("\n");
    } else if (SurgeK.some(NodeCheck)  && !/\[(Proxy|filter_local)\]/.test(subs)) {
      typec="server-surge"
      type = (typeQ == "unsupported" || typeQ =="server" || typeQ =="uri")? "Subs":"wrong-field" // Surge proxy list
    } else if (subs.indexOf("[server_local]") != -1 && QuanXK.some(NodeCheck)) {
      typec="server-quanx"
      type = (typeQ == "unsupported" || typeQ =="server"|| typeQ =="uri")? "Subs":"wrong-field"
    } else if (content0.indexOf("server") !=-1 && content0.indexOf("server_port") !=-1) { //SIP008
      typec= "server-sip008"
      type = (typeQ == "unsupported" || typeQ =="server")? "Subs":"wrong-field"
      content0 = SIP2QuanX(content0)
    } else if (SubK.some(NodeCheck1)) {  //b64加密的订阅类型
      typec="server-b64"
      type = (typeQ == "unsupported" || typeQ =="server")? "Subs-B64Encode":"wrong-field"
      if (content0.split("\n").length >= 2) { //  local snippet and first line remarks
        let tmp = content0.split("\n")[1]
        if (SubK.some((item) => tmp.toLowerCase().indexOf(item.toLowerCase()) != -1))
        content0 = tmp
      }
    } else if (QXProfile.every(ProfileCheck)) {
      typec = "profile"
      type = "profile"  //默认配置类型
    }else if (/\.js/.test(link0)) { // xjb添加js脚本的行为
      Perror = 1 ; // handled locally
      $notify("注意: 你导入的链接内容为 JS 脚本","脚本内未有重写规则，无法解析使用", "请自行检查该脚本链接\n"+link0)
      type = "JS-0"
    } else if (typeQ =="server" && subs.length>100) { // 一些未知的b64 encode server case
      typec="server-b64-unknown"
      type = (typeQ == "unsupported" || typeQ =="server")? "Subs-B64Encode":"wrong-field"
    } else if(subs == "wrong-link") {
      type="wrong-link"
    }
  // 用于通知判断类型，debug
    return type
}

// 检查节点名字(重复以及空名)等QuanX 不允许的情形，以及多个空格等“不规范”方式
function TagCheck_QX(content) {
  typefix = {"shadowsocks":["𝐬𝐬","𝐒𝐒","🅢🅢","🆂🆂","ⓢⓢ","🅂🅂","SS"],"shadowsocksr":["𝐬𝐬𝐫","𝐒𝐒𝐑","🅢🅢🅡","🆂🆂🆁","ⓢⓢⓡ","🅂🅂🅁","SSR"],
    "vmess":["𝐯𝐦𝐞𝐬𝐬","𝐕𝐌𝐄𝐒𝐒","🅥🅜🅔🅢🅢","🆅🅼🅴🆂🆂","ⓥⓜⓔⓢⓢ","🅅🄼🄴🅂🅂","VMESS"],"trojan":["𝐭𝐫𝐨𝐣𝐚𝐧","𝐓𝐑𝐎𝐉𝐀𝐍","🅣🅡🅞🅙🅐🅝","🆃🆁🅾🅹🅰🅽","ⓣⓡⓞⓙⓐⓝ","🅃🅁🄾🄹🄰🄽","TROJAN"],
    "http":["𝐡𝐭𝐭𝐩","𝐇𝐓𝐓𝐏","🅗🅣🅣🅟","🅷🆃🆃🅿","ⓗⓣⓣⓟ","🄷🅃🅃🄿","HTTP"],"socks5":["𝐬𝐨𝗰𝗸𝐬","𝐒𝐎𝐂𝐊𝐒","🅢🅞🅒🅚🅢","🆂🅾🅲🅺🆂","ⓢⓄⒸⓀⓢ","🅂🄾🄲🄺🅂","SOCKS"],
    "vless":["𝐯𝐥𝐞𝐬𝐬","𝐕𝐋𝐄𝐒𝐒","🅥🅛🅔🅢🅢","🆅🅻🅴🆂🆂","ⓥⓛⓔⓢⓢ","🅅🄻🄴🅂🅂","VLESS"],"anytls":["𝐚𝐧𝐲𝐭𝐥𝐬","𝐀𝐍𝐘𝐓𝐋𝐒","🅐🅝🅨🅣🅛🅢","🅰🅽🆈🆃🅻🆂","ⓐⓝⓨⓣⓛⓢ","🄰🄽🅈🅃🄻🅂","𝖠𝖭𝖸𝖳𝖫𝖲"]
  } // type
  console.log(content)
    var Olist = content.map(item =>item.trim())//.replace(/\s{2,}/g," "))
    var [Nlist, nmlist] = [ [], [] ]
    var [nulllist,duplist] = [ [], [] ]; //记录空名字节点&重名节点
    var no=0 ;
    for (var i = 0; i < Olist.length; i++) {
        var item = Olist[i] ? Olist[i] : ""
        typefix["shadowsocks"]=item.indexOf("ssr-protocol")!=-1? typefix["shadowsocksr"] : typefix["shadowsocks"]
        if (item.replace(/ /gm, "").indexOf("tag=") != -1) {
            var nl = item.slice(item.indexOf("tag"))
            var nm = nl.slice(nl.indexOf("=") + 1)
            if (nm == "") { //空名
                tp = typefix[item.split("=")[0].trim()][3]
                nm = tp + " | " + item.split("=")[1].split(",")[0].split(":")[0]
                item = item.split("tag")[0] + "tag=" + nm.replace("shadowsocks", "ss")
                nulllist.push(nm.replace("shadowsocks", "ss"))
            }
            var ni = 0
            while (nmlist.indexOf(nm) != -1) { //重名情形
                nm = ni==0? nm+ NoReplace(ni+1):nm.split(" ").slice(0,nm.split(" ").length-2).join(" ") + NoReplace(ni+1)
                item = item.split("tag")[0] + "tag=" + nm
                ni = ni + 1
            }
            if (ni != 0) { duplist.push(nm) }
            nmlist.push(nm)
            ni = 0
            if (item) {
            Nlist.push(item)
          }
        }// if "tag="
    } // for
    if (nulllist.length >= 1) {
        no = nulllist.length <= 10 ? emojino[nulllist.length] : nulllist.length;
        $notify("注意: 引用" + "[" + subtag + "]" + " 内有" + no + "个空节点名 ", "完成: 已将节点“类型+IP”设为节点名", " - " + nulllist.join("\n - "), nan_link)
    }
    if (duplist.length >= 1) {
        no = duplist.length <= 10 ? emojino[duplist.length] : duplist.length;
      if (Pntf0 != 0){
        $notify("注意: 引用" + "[" + subtag + "]" + " 内有" + no + "个名字重复的节点 ", "完成: 已添加数字区分:", " - " + duplist.join("\n - "), nan_link)
      }
    }
    return Nlist
}

//节点名重名时添加数字序号替换
function NoReplace(cnt) {
  if(cnt){
    for (var i=0;i<10;i++) {
      cnt = cnt.toString().replace(new RegExp(patn[0][i], "gmi"),patn[5][i])
    }
    return " " + cnt + " "
  }
}


// 用于单条 URI 的 tag 参数, 直接指定节点名
function URI_TAG(cnt0,tag0) {
  cnt0 = cnt0.split("tag=")[0] + "tag=" + tag0
  return cnt0
}

// 用于某些奇葩用户不使用 raw 链接的问题
function rawtest(cnt) {
  return cnt.replace(/(.*js-file-line\"\>)(.*?)(\<\/td\>)/g,"$2").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").trim()
}

function ToRaw(cnt) {
  cnt = cnt.split("\n").map(rawtest).filter(Boolean).join("\n")
  var rawlink = link0.replace("github.com","raw.githubusercontent.com").replace("/blob","")
  if (cnt) {
    $notify( "注意: 将尝试解析该资源" + "[" + subtag + "]" , " 请正确使用GitHub的 raw 链接" , "错误: 你的链接："+link0+"\n完成: 正确链接："+rawlink, {"open-url":rawlink})
  } else if(content0.indexOf("gridcell")!=-1) {
    $notify( "注意: 解析该资源" + " [" + subtag + "] 失败" , " 你的链接似乎是目录，而不是文件" , "错误: 你的链接："+link0, {"open-url":link0})
  }
  return cnt
}

function ToLink(link) {
  cnt = link.split("nsloon.com/openloon/import?plugin=")[1]
  if (cnt) {
    
    typ=$resource.type
    RLink0[Field[typ]].push(cnt+", opt-parser=true, tag=可长按") //  跳转URI-Scheme
    flink = ADDRes.replace(/url-encoded-json/,encodeURIComponent(JSON.stringify(RLink0)))
    $notify( "注意: 请点击通知跳转尝试添加正确链接" , " 请正确使用原始链接" , "错误: 你的链接："+link0+"\n完成: 正确链接："+cnt, {"open-url":flink})
  } 
  return "wrong-link"
}

function Mock2QXReject(row, filename) {
    if (/dict/i.test(filename)) {
        return row.replace(/ /g, "").split("data=")[0].split("data-type=")[0] + " url " + "reject-dict"
    } else if (/array/i.test(filename)) {
        return row.replace(/ /g, "").split("data=")[0].split("data-type=")[0] + " url " + "reject-array"
    } else if (/(txt|html)/i.test(filename) || filename==null) {
        return row.replace(/ /g, "").split("data=")[0].split("data-type=")[0] + " url " + "reject-200"
    } else if (/(png|jpg|gif)/i.test(filename)) {
        return row.replace(/ /g, "").split("data=")[0].split("data-type=")[0] + " url " + "reject-img"
    } else {
        return row.replace(/ /g, "").split("data=")[0].split("data-type=")[0] + " url " + "reject"
    }
}

//url-regex 转换成 Quantumult X 重写
function URX2QX(subs) {
    var nrw = []
    var rw = ""
    subs = subs.split("\n")
    var NoteK = ["//", "#", ";"];  //排除注释项
    for (var i = 0; i < subs.length; i++) {
        const notecheck = (item) => subs[i].indexOf(item) == 0
        if (!NoteK.some(notecheck)) {
        if (subs[i].slice(0, 9) == "URL-REGEX") {  // regex 类型
          if (subs[i].indexOf("REJECT") != -1 || subs[i].split(",").length == 2 ) { // 仅处理 reject 类型，或者无指定策略类型
            if (subs[i].replace(/ /g, "").split(",REJECT")[0].split("GEX,")[1].slice(0,1) != "*") { // 部分 * 开头的不支持 url-regex形式
            rw = subs[i].replace(/ /g, "").split(",REJECT")[0].split("GEX,")[1] + " url " + "reject-200"
            nrw.push(rw)
          }
          }
        } else if (subs[i].indexOf("data=") != -1 && subs.indexOf("[Map Local]") != -1){ // Map Local 类型
            // 取subs[i]的文件名
            let fn = subs[i].match(/data=.+\/(.+)"/) ? subs[i].match(/data=.+\/(.+)"/)[1] : null
            if ((!/header=".*content-type/i.test(subs[i]) && /blank/i.test(fn)) || fn==null) {
                rw = Mock2QXReject(subs[i], fn)
            } else {
                rw = subs[i].replace(/ /g, "").split("data=")[0].split("data-type=")[0].replace(/\"/g,"") + " url echo-response text/html echo-response " + subs[i].split("data=")[1].split(" ")[0].replace(/\"/g,"").replace(/ /g, "")//"reject-dict"
                if (subs[i].indexOf("header=")!=-1) {
                    if (subs[i].indexOf("Content-Type:") !=-1) {
                        let tpe = subs[i].split("header=")[1].split("Content-Type:")[1].split(",")[0].replace(/\"/g,"")
                        rw = rw.replace(/text\/html/g,tpe)
                    }
                }
            }
            nrw.push(rw)
        } 
    }
    }
    return nrw
}

//script&rewrite 转换成 Quantumult X
function SCP2QX(subs) {
  var nrw = []
  var rw = ""
  var RewriteK = [" url 302", " url 307", " url reject", " url script", " url req", " url res", " url echo", " url-and-header 302", " url-and-header 307", " url-and-header reject", " url-and-header script", " url-and-header req", " url-and-header res", " url-and-header echo", " url jsonjq"] // quantumult X 类型 rewrite
  subs = subs.split("\n").map(x => x.trim().replace(/\s+/g," "))
  for (var i = 0; i < subs.length; i++) {
    try {
      subs[i] = subs[i].replace("^http","http") // 去掉 ^ , 以方便去重
      if (subs[i].slice(0, 8) == "hostname") {
        hn = subs[i].replace(/\%.*\%/g, "").replace(/\:\d*/g,"")
        nrw.push(hn)
      }
      var SC = ["type=", ".js", "pattern=", "script-path="]
      var NoteK = ["//", "#", ";"]; //排除注释项
      const sccheck = (item) => subs[i].indexOf(item) != -1
      const notecheck = (item) => subs[i].indexOf(item) == 0
      const RewriteCheck = (item) => subs[i].indexOf(item) != -1 ; // quanx 重写判定
      if (!NoteK.some(notecheck) && !RewriteK.some(RewriteCheck)){
        if (SC.every(sccheck)) { // surge js 新格式
          //部分正则中含有,的问题
          ptn = subs[i].replace(/\s/gi,"").split("pattern=")[1].split(/\,[a-zA-Z]/)[0] 
          js = subs[i].replace(/\s/gi,"").split("script-path=")[1].split(",")[0]
          type = subs[i].replace(/\s/gi,"").split("type=")[1].split(",")[0].trim()
          subsi = subs[i].replace(/ /g,"").replace(/\=true/g,"=1")
          if (type == "http-response" && subsi.indexOf("requires-body=1") != -1) {
            type = "script-response-body "
          } else if (type == "http-response" && subsi.indexOf("requires-body=1") == -1) {
            type = "script-response-header "
          } else if (type == "http-request" && subsi.indexOf("requires-body=1") != -1) {
            type = "script-request-body "
          } else if (type == "http-request" && subsi.indexOf("requires-body=1") == -1) {
            type = "script-request-header "
          } else {type = "" }
          if (type != "") {
            rw = ptn + " url " + type + js
            nrw.push(rw)
          }
        } else if (/\d\s30(7|2)$/.test(subs[i])) { //rewrite 302&307 复写(Surge)
          rw = subs[i].split(" ")[0] + " url " + subs[i].split(" ")[2] + " " + subs[i].split(" ")[1].trim()
          nrw.push(rw)
        } else if (/\d\s\-\s30(2|7)\s/.test(subs[i])) { //rewrite 302&307 复写(Shadowrocket)
          //xx - 302 $1$2$3
          rw = subs[i].replace(" - "," url ")
          nrw.push(rw)
        } else if(subs[i].split(" ")[2] == "header") { // rewrite header 类型
          rw = subs[i].split(" ")[0] + " url 302 " + subs[i].split(" ")[1]
          nrw.push(rw)
        } else if(subs[i].split(" ")[1] == "header-replace") { // rewrite header-replace 类型
          console.log(subs[i])
          var pget = subs[i].split("header-replace")[1].split(":")[0].trim()
          rw = subs[i].split(" ")[0] + " url request-header " +"(.+\\r\\n)"+pget+":.+(\\r\\n) request-header " + "$1" + subs[i].split("header-replace")[1].trim() + "$2"
          nrw.push(rw)
        } else if(subs[i].indexOf(" _ reject") != -1) { // rewrite reject 类型(surge)
          rw = subs[i].split(" ")[0] + " url reject-200"
          nrw.push(rw)
        } else if(subs[i].indexOf(" - reject") != -1 || subs[i].indexOf(" - REJECT") != -1) { //shadowrocket reject/REJECT
          rw = subs[i].replace(" - ", " url ").toLowerCase()
          nrw.push(rw)
        } else if(subs[i].split(" ").length == 2 && (/\s(reject)$/.test(subs[i]) || /\s(reject\-)/.test(subs[i]))){ // loon 类型？ http://xxx/yyy reject
          rw = subs[i].replace(" reject", " url reject")
          nrw.push(rw)
        } else if (subs[i].indexOf("script-path") != -1) { //surge js 旧写法
          type = subs[i].replace(/\s+/g," ").split(" ")[0]
          js = subs[i].split("script-path")[1].split("=")[1].split(",")[0]
          ptn = subs[i].replace(/\s+/g," ").split(" ")[1]
          subsi = subs[i].replace(/ /g,"").replace(/\=true/g,"=1")
          if (type == "http-response" && subsi.indexOf("requires-body=1") != -1) {
            type = "script-response-body "
          } else if (type == "http-response" && subsi.indexOf("requires-body=1") == -1) {
            type = "script-response-header "
          } else if (type == "http-request" && subsi.indexOf("requires-body=1") != -1) {
            type = "script-request-body "
          } else if (type == "http-request" && subsi.indexOf("requires-body=1") == -1) {
            type = "script-request-header "
          } else {type = "" }
          if (type != "") {
            rw = ptn + " url " + type + js
            nrw.push(rw)
          } 
        }
      } else if(RewriteK.some(RewriteCheck)) {
        nrw.push(subs[i])
      }
    } catch (err) {
      $notify("错误:解析此条时出现错误，已忽略",subs[i],err)
    }
  }
  return nrw
}

// 如果 URL-Regex 跟 rewrite/script 都需要
function SGMD2QX(subs) {
    var nrw0 = URX2QX(subs)
    var nrw1 = SCP2QX(subs)
    var nrwt = [...nrw0, ...nrw1]
    return nrwt
}

//Rewrite过滤，使用+连接多个关键词(逻辑"或"):in 为保留，out 为排除
function Rewrite_Filter(subs) {
    var Nlist = [];
    var noteK = ["//", "#", ";"];
    var hnc = 0;
    var hostname = ""
    for (var i = 0; i < subs.length; i++) {
        subi = subs[i].trim();
        var subii = subi.replace(/ /g, "")
        if (subi != "" && (subi.indexOf(" url ")!=-1 || subi.indexOf("host")!=-1 || subi.indexOf(" url-and-header ")!=-1 || /^hostname\=/.test(subii))) {
            const notecheck = (item) => subi.indexOf(item) == 0
            if (noteK.some(notecheck)) { // 注释项跳过 
                continue;
            } else if (hnc == 0 && subii.indexOf("hostname=") == 0) { //hostname 部分
                hostname = subi;//hostname 部分
            } else if (subii.indexOf("hostname=") != 0) { //rewrite 部分
                Nlist.push(subi);
            }
        }
    }

    if (Nlist.length == 0 ) { 
      $notify("重写引用 -> " + "[" + subtag + "]", "解析后 rewrite 规则数为 0 条" , "注意: 请检查原始链接内容", nan_link) 
    }
    
    if (hostname != "") { Nlist.push(hostname) }
    return Nlist
}
//分流规则转换及过滤(in&out)，可用于 surge 及 quanx 的 rule-list
function Rule_Handle(subs) {
    cnt = subs //.split("\n");
    ply = Ppolicy; //策略组
    var nlist = []
    var RuleK = ["//", "#", ";","[","^"]; //排除项目
    for (var i = 0; i < cnt.length; i++) {
        cc = cnt[i].replace(/^\s*\-\s/g,"").replace(/\"|\'/g,"").trim()
        if (!RuleK.some((item) => cc.toLowerCase().indexOf(item) == 0) && cc) {
            nlist.push(Rule_Policy(cc))
        }
    }
  nlist = nlist.filter(Boolean)

  nlist=nlist.map(item=>item.replace(/:\d*\s*,/g,",").replace(/(\'|\")/g,"").replace(/(\-suffix|\-SUFFIX)\s*\,\s*\./g,"$1, ")) //去除端口号以及分号部分, 以及部分suffix规则以. 开头的问题
  return nlist
}

function Rule_Policy(content) { //增加、替换 policy
    var cnt = content.replace(/^\s*\-\s/g,"").replace(/REJECT-TINYGIF/gi,"reject").replace(/REJECT-DROP/gi,"reject").trim().split("//")[0].trim().split(",");
    var RuleK = ["//", "#", ";","[","/", "hostname","no-ipv6","no-system","<","{","}","]","^"];
    var RuleK1 = ["host", "domain", "ip-cidr", "geoip", "user-agent", "ip6-cidr", "ip-asn"];
    const RuleCheck = (item) => cnt[0].trim().toLowerCase().indexOf(item) == 0; //无视注释行
    const RuleCheck1 = (item) => cnt[0].trim().toLowerCase().indexOf(item) == 0 ; //无视 quanx 不支持的规则类别&排除 hostname
    if (RuleK1.some(RuleCheck1) && !RuleK.some(RuleCheck) ) {
        if (cnt.length == 3 && cnt.indexOf("no-resolve") == -1) {
            ply0 = Ppolicy != "Shawn" ? Ppolicy : cnt[2]
            nn = cnt[0] + ", " + cnt[1] + ", " + ply0
        } else if (cnt.length == 4 && cnt.indexOf("no-resolve") != -1) { // 带no-resolve的quanx类型rule
          nn = cnt.join(",").replace(",no-resolve","")
        } else if (cnt.length == 2) { //Surge rule-set
            ply0 = Ppolicy != "Shawn" ? Ppolicy : "Shawn"
            nn = cnt[1].trim() !=""? cnt[0] + ", " + cnt[1] + ", " + ply0 : ""
        } else if (cnt.length == 3 && cnt[2].indexOf("no-resolve") != -1) {
            ply0 = Ppolicy != "Shawn" ? Ppolicy : "Shawn"
            nn = cnt[0] + ", " + cnt[1] + ", " + ply0 //+ ", " + cnt[2]
        } else if (cnt.length == 4 && cnt[3].indexOf("no-resolve") != -1) {
            ply0 = Ppolicy != "Shawn" ? Ppolicy : cnt[2]
            nn = cnt[0] + ", " + cnt[1] + ", " + ply0 //+ ", " + cnt[3]
        } else if (cnt.length > 4 && cnt[3].indexOf("extend")!=-1) { // 2026-04-28 
            ply0 = Ppolicy != "Shawn" ? Ppolicy : cnt[2]
            nn = cnt[0] + ", " + cnt[1] + ", " + ply0
        } else if (!RuleK.some(RuleCheck) && content) {
            return ""
        } else { return "" }
        if (cnt[0].indexOf("URL-REGEX") != -1 || cnt[0].indexOf("PROCESS") != -1) {
            nn = ""
        } else { 
          nn = nn.replace("IP-CIDR6", "ip6-cidr").replace(/^(domain|Domain|DOMAIN)/,"host") 
        }
        return nn
    } else if (cnt.length == 1 && !RuleK.some(RuleCheck) && cnt[0]!="" && cnt[0].indexOf("payload:")==-1 && cnt[0].indexOf("=")==-1 && cnt[0].trim()!="https:") { // 纯域名/ip 列表
      return rule_list_handle(cnt[0])
    } else { 
      return "" }//if RuleK1 check 
}

// 处理纯列表, 包含 clash-provider
function rule_list_handle(cnt) {
  var RuleK = ["//", "#", ";", "[", "!", "/"]
  const RuleCheck = (item) => cnt.trim().indexOf(item) == 0; //无视注释行
  const nocheck = (item) => /^\d+$/.test(item) //检查数字项
  cnt = cnt.split("#")[0].trim() // 去除注释部分
  if (cnt.trim().indexOf(" ") == -1 && cnt.trim() != "" && !RuleK.some(RuleCheck)) {
    if (cnt.indexOf("::") != -1 && cnt.indexOf("/") != -1) { // ip-v6?
      cnt = "ip6-cidr, " + cnt
      cnt = Ppolicy == "Shawn" ? cnt + ", Shawn" : cnt + ", " + Ppolicy
    } else if (cnt.split("/").length == 2) {//ip-cidr
      cnt = "ip-cidr, " + cnt
      cnt = Ppolicy == "Shawn" ? cnt + ", Shawn" : cnt + ", " + Ppolicy
    } else if (cnt.split(".").length == 4 && cnt.split(".").every(nocheck)) {  // ip 类规则
      cnt = "ip-cidr, " + cnt + "/32"
      cnt = Ppolicy == "Shawn" ? cnt + ", Shawn" : cnt + ", " + Ppolicy
    } else if (cnt.indexOf("payload:") == -1) { //host - suffix, not clash rule list

      if (!/^('|")/.test(cnt)) { // not clash-provider
        if (!/\*|\+/.test(cnt[0])) {
          cnt = cnt[0] == "." ? cnt.replace(".", "") : cnt
          cnt = "host-suffix, " + cnt
        } else {
          cnt = "host-wildcard, " + cnt
        }
      } else { // clash provider
        cnt = cnt.replace(/'|"/g, "").trim()

        if (/^\.|\*\./.test(cnt) || cnt.indexOf("*") != -1) {
          //1.以.或*.开头 -> 匹配子域名，wildcard,*.domain
          //2.直接替换开头，正则未匹配 -> 不以*.开头的字符串但包含*的情况(wildcard,a.*.domain...)
          cnt = "host-wildcard, " + cnt.replace(/^\.|\*\./, "*.")
        } else {
          cnt = "host-suffix, " + cnt.replace(/^(\+\.)/, "")//如果以+.开头 = 匹配当前域名及其子域名，采用 suffix,domain。
        }
      }
      cnt = Ppolicy == "Shawn" ? cnt + ", Shawn" : cnt + ", " + Ppolicy
    }
  }
  return cnt
}
// read parameters 2026-05-17
function param(res,org,mbody) {
  if(mbody.indexOf(org)!=-1) {
    tmp=mbody.split(org)[1].split("&")[0].split("#")[0].replace(/\s/,"")
    tmp = tmp!=""? res+"="+tmp : ""
    return tmp
  }
  else return ""
}

// get reality parameters
function Reality_Handle(cnt) {
//add reality-base64-pubkey, reality-hex-shortid, vless-flow=xtls-rprx-vision
  a1=param("reality-base64-pubkey","pbk=",cnt)
  a2=param("reality-hex-shortid","sid=",cnt)
  a3=(cnt.indexOf("flow=xtls-rprx-vision")!=-1 || cnt.indexOf("xtls=2")!=-1)? "vless-flow=xtls-rprx-vision": ""
  rnt=[a1,a2,a3].filter(Boolean).join(", ")
  return rnt
}


//混合订阅类型，用于未整体进行 base64 encode 以及已经 decode 后的类型
function Subs2QX(subs, Pudp, Ptfo, Pcert0, PTls13) {
    var list0 = subs.split("\n");
    var QuanXK = ["shadowsocks=", "trojan=", "vmess=", "http=","socks5=", "vless=", "anytls="];
    var SurgeK = ["=ss,", "=vmess,", "=trojan,", "=http,", "=https,", "=custom,", "=socks5", "=socks5-tls","=anytls"];
    var LoonK = ["=Shadowsocks", "=ShadowsocksR", "=VLESS","=AnyTLS"]
    var QXlist = [];
    var failedList = [];
    for (var i = 0; i < list0.length; i++) {
        var node = ""
        if (list0[i].trim().length > 3 && !/\;|\/|\#/.test(list0[i][0]) && list0[i].indexOf(" url ")==-1) {
            var type = list0[i].split("://")[0].trim()
            var listi = list0[i].replace(/ /g, "")
            var tag0 = list0[i].indexOf("tag=")!=-1 ? list0[i].split(/\&*(emoji|udp|tfo|cert|rename|replace)\=/)[0].split("tag=")[1] : ""
            list0[i] = (type=="ssr") ? list0[i].split(/#|,|，/)[0] : list0[i] // 2023-04-18 remove type == "vmess" ||
            const NodeCheck = (item) => listi.toLowerCase().indexOf(item) != -1;
            const NodeCheck1 = (item) => listi.toLowerCase().indexOf(item) == 0;
            const NodeCheck2 = (item) => listi.indexOf(item) != -1;
            try {
                if (type == "vmess" && (list0[i].indexOf("remark=") == -1 && list0[i].indexOf("remarks=") == -1) && !/(obfs|alterId|type|\@)\=/.test(list0[i])) {
                    var bnode = Base64.decode(list0[i].split("vmess://")[1])
                    if (bnode.indexOf("over-tls=") == -1) { //v2rayN
                        node = V2QX(list0[i], Pudp, Ptfo, Pcert0, PTls13)
                    } else { //quantumult 类型
                        node = VQ2QX(list0[i], Pudp, Ptfo, Pcert0, PTls13)
                    }
                  node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "vmess" && ( list0[i].indexOf("remark=") != -1 || list0[i].indexOf("remarks=") != -1 || /(obfs|alterId|type|\@)\=/.test(list0[i]))) { //shadowrocket 类型
                    node = VR2QX(list0[i], Pudp, Ptfo, Pcert0, PTls13)
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "socks" && list0[i].indexOf("remarks=") != -1) { //shadowrocket socks5 类型
                    node = S5R2QX(list0[i])
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "ssocks" && list0[i].indexOf("remarks=") != -1) { //shadowrocket socks5-tls 类型
                    node = S5R2QX(list0[i],tlsp="over-tls")
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "socks" && list0[i].indexOf("remarks=") == -1) { // socks URI 2026-05-25
                    node = Socks2QX(list0[i])
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "ssr") {
                    node = SSR2QX(list0[i], Pudp, Ptfo)
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "ss") {
                    node = SS2QX(list0[i], Pudp, Ptfo)
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if (type == "ssd") {
                    node = SSD2QX(list0[i], Pudp, Ptfo)
                } else if (type == "trojan") {
                    node = TJ2QX(list0[i], Pudp, Ptfo, Pcert0, PTls13)
                    node = tag0 != "" ? URI_TAG(node, tag0) : node
                } else if ((type == "https" || type == "http") && list0[i].indexOf(",") == -1) {
                    if (listi.indexOf("@") != -1) {
                        node = HPS2QX(list0[i], Ptfo, Pcert0, PTls13)
                        node = tag0 != "" ? URI_TAG(node, tag0) : node
                    } else { // b64 类型 http/https
                        var listh = Base64.decode(listi.split(type+"://")[1].split("#")[0].split("?")[0])
                        listh = list0[i].replace(listi.split(type+"://")[1].split("#")[0].split("?")[0],listh) //type+"://" + listh + "#" + listi.split(type+"://")[1].split("#")[1]
                        node = HPS2QX(listh, Ptfo, Pcert0, PTls13)
                        node = tag0 != "" ? URI_TAG(node, tag0) : node
                    }
                } else if (type == "vless" && version<821) {
                  Perror = 1 ; // handled locally
                  $notify("注意: 你的 Quantumult X 版本暂未支持 Vless 节点","请更新app到最新版本",list0[i])
                } else if (type == "vless" ) { // version 150 support vless 
                  node=VL2QX(list0[i], Pudp, Ptfo, Pcert0, PTls13)
                } else if (type == "anytls") { // 2026-04-15 tls 类型支持
                  if (version <914) {
                    Perror = 1 ; // handled locally
                    $notify("注意: 你的 Quantumult X 版本暂未支持 anytls 节点","请更新app到最新版本",list0[i])
                  } else {
                    node=Anytls2QX(list0[i],Pcert0)
                  }
                } else if (QuanXK.some(NodeCheck1)) { // QuanX type 
                    node = QX_TLS(isQuanX(list0[i])[0], Pcert0, PTls13)
                } else if (LoonK.some(NodeCheck2)) { // Loon type
                    node = Loon2QX(list0[i])
                } else if (SurgeK.some(NodeCheck) ) { // Surge type, 第2为端口号
                    node = QX_TLS(Surge2QX(list0[i])[0], Pcert0, PTls13)
                } else if (type=="hysteria2" || (type=="anytls" && version<914) || type=="tuic") { //
                  PNS=PNS+1 
                  NSList.push(numToEmoji10(PNS)+list0[i])
                } else if (/^STATUS\=/.test(listi)) { // flow info fake server
                  Rocket_flow(listi)
                }
            } catch (e) {
                failedList.push(`<<<\nContent: ${list0[i]}\nError: ${e}`)
            }
            node = TLS_Check(node)
            if (node instanceof Array) {
                for (var j in node) {
                  node[j] = Pudp != 0 ? XUDP(node[j],Pudp) : node[j]
                  node[j] = Ptfo != 0 ? XTFO(node[j],Ptfo) : node[j]
                    QXlist.push(node[j])
                }
            } else if (node != ""  && node) {
              node = Pudp != 0 ? XUDP(node,Pudp) : node
              node = Ptfo != 0 ? XTFO(node,Ptfo) : node
                QXlist.push(node)
            }
        }
    }
    if (failedList.length > 0 && Pntf0 != 0) {
        $notify(`注意: 有 ${failedList.length} 条数据解析失败, 已忽略`, "出错内容如下", failedList.join("\n"));
    }
    return QXlist;
}

//新版本tls 的检验（存在sha256 参数时）
function TLS_Check(cnt) {
  cnt =cnt.indexOf("tls-cert-sha256")!=-1 || cnt.indexOf("tls-pubkey-sha256")!=-1 ? cnt.replace(/tls-verification\s*\=\s*false.*?\,/,"tls-verification=true,"): cnt // 去掉 tls-verification=false 如果存在 sha256
  return cnt
}

// qx 类型 tls/udp 验证问题t
function QX_TLS(cnt,Pcert0,PTls13) {
  cnt =cnt.replace(/tag\s*\=/gm,"tag=") //
  var cert0 = Pcert0 == 1? "tls-verification=true, " : "tls-verification=false, "
  var tls13 = PTls13 == 1? "tls13=true, " : ""
  if(cnt.indexOf("tls-verification") != -1){ // 已有tls参数时, 如用户不指定，则不做处理
    cnt = (Pcert0 == -1 || Pcert0 == 1) ? cnt.replace(RegExp("tls\-verification.*?\,", "gmi"), cert0): cnt
  } else if(cnt.indexOf("obfs=over-tls")!=-1 || /over\-tls\s*\=\s*true/.test(cnt) || cnt.indexOf("obfs=wss")!=-1){ //未包含tls参数时
    cnt = cnt.replace(new RegExp("tag\s*\=", "gmi"), cert0+"tag=")
  }
  if (tls13 !="") {
  if(cnt.indexOf("tls13") != -1){
    cnt = cnt.replace(RegExp("tls13.*?\,", "gmi"), tls13)
  } else if(cnt.indexOf("obfs=over-tls")!=-1 || /over\-tls\s*\=\s*true/.test(cnt) || cnt.indexOf("obfs=wss")!=-1){
    cnt = cnt.replace(new RegExp("tag\s*\=", "gmi"), tls13+"tag=")
  }
  }
  if (!/^(shadowsocks|trojan|vmess|vless|anytls)/.test(cnt.trim())) { //关闭非 ss/ssr/trojan/vmess/vless 类型的 udp
    udp =  "udp-relay=false, "
    if(cnt.indexOf("udp-relay") != -1){
      var cnt = cnt.replace(RegExp("udp\-relay.*?\,", "gmi"), udp)
    }else{
      var cnt = cnt.replace(new RegExp("tag\s*\=", "gmi"), udp+"tag=")
    }
  }
  return cnt
}

//将sip008格式的订阅转换成quanx格式
function SIP2QuanX (cnt) {
  cnt = JSON.parse(cnt)
  ll =cnt.length
  nodes =[]
  for (i=0; i<ll; i++) {
    node = "shadowsocks= "
    cnti = cnt[i]
    ip = cnti.server + ":" + cnti.server_port
    mtd = "method=" + cnti.method
    pwd = "password=" + cnti.password
    obfs = cnti.plugin_opts? cnti.plugin_opts.replace(";", ", "):""
    tag = "tag="+cnti.remarks
    node = node +[ip,pwd, mtd, obfs, tag].filter(Boolean).join(", ")
    nodes.push(node)
  }
  return nodes.join("\n")
}

//http=example.com:443, username=name, password=pwd, over-tls=true, tls-host=example.com, tls-verification=true, tls13=true, fast-open=false, udp-relay=false, tag=http-tls-02
//HTTPS 类型 URI 转换成 QUANX 格式
function HPS2QX(subs, Ptfo, Pcert0, PTls13) {
    var type = subs.indexOf("https://")!=-1? "https" : "http" 
    var server = subs.replace("https://", "").replace("http://", "").trim()//Base64.decode(subs.replace("https://", "")).trim().split("\u0000")[0];
    var nss = []
    if (server != "") {
      if (server.indexOf("@")!=-1) {
        var ipport = "http=" + server.split("@")[1].split("#")[0].split("/")[0].split("?")[0];
        var uname = "username=" + server.split(":")[0];
        var pwd = "password=" + server.split("@")[0].split(":")[1];
      } else {
        var ipport = server.split("#")[0].indexOf(":")==-1? "http=" + Base64.decode(server.split("#")[0].split("?")[0]) : "http=" + server.split("#")[0].split("?")[0]; // https://b64(ipport)
      }
        var tag = "tag=" + decodeURIComponent(server.split("#")[1]);
        var tls = type == "https"? "over-tls=true": "";
        var thost = subs.indexOf("peer=")!= -1? "tls-host=" + subs.split("peer=")[1].split("#")[0].split("&")[0] : "" // 存在peers参数时 https://b64(ipport)?peer=xxx#server-remarks
        var cert = Pcert0 != 0 ? "tls-verification=true" : "tls-verification=false";
        var tfo = Ptfo == 1 ? "fast-open=true" : "fast-open=false";
        var tls13 = PTls13 == 1 ? "tls13=true" : "tls13=false";
        if (tls=="") {
          cert=""
          tls13=""
        }
        nss.push(ipport, uname, pwd, tls, thost, cert, tfo, tls13, tag)
    }
    var QX = nss.filter(Boolean).join(",");
    return QX
}

//quantumult 格式的 vmess URI 转换
function VQ2QX(subs, Pudp, Ptfo, Pcert0, PTls13) {
  var server = String(Base64.decode(subs.replace("vmess://", "").trim()).split("\u0000")[0])
  var node = ""
  var ip = "vmess=" + server.split(",")[1].trim() + ":" + server.split(",")[2].trim() + ", " + "method=aes-128-gcm, " + "password=" + server.split(",")[4].split("\"")[1] + ", "
  var tag = "tag=" + server.split("=")[0]
  var tfo = subs.indexOf("tfo=1") != -1 ? "fast-open=true, " : "fast-open=false, "
  var udp = Pudp == 1 ? "udp-relay=false, " : "udp-relay=false, "; // 不支持 vmess 类型 udp
  node = ip + tfo + udp
  var obfs = ""
  if (server.indexOf("obfs=") == -1) { // 非 ws/http 类型
    obfs = server.indexOf("over-tls=true") != -1 ? "obfs=over-tls, " : "" //over-tls
    var host = server.indexOf("tls-host") != -1 ? "obfs-host=" + server.split("tls-host=")[1].split(",")[0] + ", " : ""
    obfs = obfs + host
  } else if (server.indexOf("obfs=ws") != -1) {
    obfs = server.indexOf("over-tls=true") != -1 ? "obfs=wss, " : "obfs=ws, " //ws,wss 类型
    var uri = server.indexOf("obfs-path=") != -1 ? "obfs-uri=" + server.split("obfs-path=")[1].split("\"")[1] + ", " : "obfs-uri=/, "
    obfs = obfs + uri
    var host = server.indexOf("obfs-header=") != -1 ? "obfs-host=" + server.split("obfs-header=\"Host:")[1].split("[")[0].trim() + ", " : ""
    obfs = obfs + host
  } else if (server.indexOf("obfs=http") != -1) {
    obfs = "obfs=http, "
    var uri = server.indexOf("obfs-path=") != -1 ? "obfs-uri=" + server.split("obfs-path=")[1].split("\"")[1] + ", " : "obfs-uri=/, "
    obfs = obfs + uri
    var host = server.indexOf("obfs-header=") != -1 ? "obfs-host=" + server.split("obfs-header=\"Host:")[1].split("[")[0].trim() + ", " : ""
    obfs = obfs + host
  }
  if (obfs.indexOf("obfs=over-tls") != -1 || obfs.indexOf("obfs=wss") != -1) {
    var cert = Pcert0 != 0 || subs.indexOf("allowInsecure=1") != -1 ? "tls-verification=false, " : "tls-verification=true, "
    var tls13 = PTls13 == 1 ? "tls13=true, " : ""
    obfs = obfs + cert + tls13
  }
  node = node + obfs + tag
  return node
}


//Shadowrocket 格式的 vmess URI 转换
function VR2QX(subs, Pudp, Ptfo, Pcert0, PTls13) {
  var server = String(Base64.decode(subs.replace("vmess://", "").split("?remark")[0].split("&remark")[0].split("?")[0]).trim()).split("\u0000")[0]
  if (server.indexOf("@")==-1 && subs.indexOf("@")!=-1) { server = subs.replace("vmess://", "").split("?")[0]}
  var node = ""
  var ip = "vmess=" + server.split("@")[1] + ", " + "method=aes-128-gcm, " 
  var pwd =  server.split("@")[0].split(":")[1]? "password=" + server.split("@")[0].split(":")[1] + ", " : "password=" + server.split("@")[0]+ ", "
  if (subs.indexOf("#")==-1) {
    tag = /remarks*=/.test(subs)? "tag=" + decodeURIComponent(subs.split(/remarks*=/)[1].split("&")[0]) : "tag="+server.split("@")[1] //部分无节点名的情况
  } else {
    tag = "tag=" + subs.split("#")[1]
  }
  var tfo = subs.indexOf("tfo=1") != -1 ? "fast-open=true, " : "fast-open=false, "
  var udp = Pudp == 1 ? "udp-relay=false, " : "udp-relay=false, ";
  var pdrop = 0
  node = ip + pwd+ tfo + udp
  var obfs = subs.indexOf("obfs=")!=-1 ? subs.split("obfs=")[1].split("&")[0].trim() : "none"
  if (obfs == "none") { //
    obfs = subs.indexOf("tls=1") != -1 ? "obfs=over-tls, " : "" //over-tls
  } else if (obfs == "websocket" || obfs == "http") {
    obfs = obfs == "http" ? "obfs=http, " : "obfs=ws, " // http 类型
    obfs = subs.indexOf("tls=1") != -1 ? "obfs=wss, " : obfs //ws,wss 类型
    var ouri = subs.indexOf("&path=") != -1 ? decodeURIComponent(subs.split("&path=")[1].split("&")[0]) : "/" //ws,wss 类型
    obfs = obfs + "obfs-uri=" + ouri + ", "
    var host = subs.indexOf("&obfsParam=") != -1 ? decodeURIComponent(subs.split("&obfsParam=")[1].split("&")[0].split("\n")[0]).split("\n")[0].trim() : ""
    if (host.indexOf("\"Host\"")!=-1 && host.indexOf("{")!=-1) {
      host = JSON.parse(host)["Host"]
    }
    host = host!="{}" && host ? "obfs-host=" + host + ", " : ""
    obfs = obfs + host
  } else if (obfs=="grpc" || obfs =="h2") {
    Perror = 1 // handled locally
    if (Pntf0!=0) {
    $notify( "注意: Quantumult X 暂不支持该类型节点", "已忽略以下 grpc|h2 vmess 节点",subs)
  }
    pdrop = 1
  }
  if (obfs.indexOf("obfs=over-tls") != -1 || obfs.indexOf("obfs=wss") != -1) {
    var cert = Pcert0 != 0 || subs.indexOf("allowInsecure=1") != -1 ? "tls-verification=false, " : "tls-verification=true, "
    var tls13 = PTls13 == 1 ? "tls13=true, " : ""
    obfs = obfs + cert + tls13
  }
  caead="aead=false, "
  if (subs.indexOf("alterId=") != -1) {
    caead = Number(subs.split("alterId=")[1].split("&")[0]) != 0 ? "aead=false, " : ""
  }
  node = pdrop==0? node + obfs +caead+ tag : ""
  return node
}

//Shadowrocket 格式的 socks URI 转换
function S5R2QX(cnt,tlsp="false") {
  var listh = Base64.decode(cnt.split("socks://")[1].split("#")[0].split("?")[0])
  server=cnt.indexOf("#")!=-1? listh+"#"+cnt.split("?")[1] : listh+"?"+cnt.split("?")[1]
  var nss = []
  if (server != "") {
      var ipport = "socks5=" + server.split("@")[1].split("#")[0].split("/")[0];
      var uname = "username=" + server.split(":")[0];
      var pwd = "password=" + server.split("@")[0].split(":")[1];
      var tag = "tag=" + decodeURIComponent(server.split("remarks=")[1].split("&")[0]);
      var tls = tlsp=="false"? "":"over-tls=true"
      var cert = Pcert0 != 0 ? "tls-verification=true" : "tls-verification=false";
      cert = tls == ""? "":cert
      var tfo = Ptfo0 == 1 ? "fast-open=true" : "fast-open=false";
      nss.push(ipport, uname, pwd, tls, cert, tfo, tag)
  }
  var QX = nss.filter(Boolean).join(",");
  return QX
}
 
// socks URI  转换 2026-05-25, 无remarks命名部分
function Socks2QX(cnt,tlsp="false") {
  var listh = Base64.decode(cnt.split("socks://")[1].split("#")[0].split("?")[0])
  server=cnt.indexOf("#")!=-1? listh+"#"+cnt.split("?")[1] : listh+"?"+cnt.split("?")[1]
  var nss = []
  if (server != "") {
      var ipport = "socks5=" + server.split("@")[1].split("#")[0].split("/")[0];
      var uname = "username=" + server.split(":")[0];
      var pwd = "password=" + server.split("@")[0].split(":")[1];
      name = server.indexOf("#") != -1? server.split("#")[1] : ipport.split("=")[1].split(":")[0]
      var tag = "tag=" + decodeURIComponent(name.split("&")[0]);
      var tls = tlsp=="false"? "":"over-tls=true"
      var cert = Pcert0 != 0 ? "tls-verification=true" : "tls-verification=false";
      cert = tls == ""? "":cert
      var tfo = Ptfo0 == 1 ? "fast-open=true" : "fast-open=false";
      nss.push(ipport, uname, pwd, tls, cert, tfo, tag)
  }
  var QX = nss.filter(Boolean).join(",");
  return QX
}

//V2RayN uri 转换成 QUANX 格式
function V2QX(subs, Pudp, Ptfo, Pcert0, PTls13) {
  var cert = Pcert0
  var tls13 = PTls13
  var server = String(Base64.decode(subs.replace("vmess://", "")).trim()).split("\u0000")[0];
  var nss = [];
  if (server != "") {
    ss = JSON.parse(server);
    ip = "vmess=" + ss.add + ":" + ss.port;
    pwd = "password=" + ss.id;
    mtd = "method=aes-128-gcm"
    try {
      tag = "tag=" + decodeURIComponent(ss.ps);
    } catch {
      tag = "tag=" + ss.ps;
    }
    udp = Pudp == 1 ? "udp-relay=false" : "udp-relay=false";
    tfo = Ptfo == 1 ? "fast-open=true" : "fast-open=false";
    obfs = Fobfs(ss, cert, tls13);
    caead = ss.aid && ss.aid != "0" ? "aead=false" : "aead=true"; //aead 选项
    if (obfs == "" || obfs == undefined) {
      nss.push(ip, mtd, pwd, tfo, udp, caead, tag)
    } else if(obfs != "NOT-SUPPORTTED"){
      nss.push(ip, mtd, pwd, obfs, tfo, udp, caead, tag);
    } else if(obfs == "NOT-SUPPORTTED"){
      PNS=PNS+1
      NSList.push(numToEmoji10(PNS)+subs)
    }
    QX = nss.join(", ");
  }
  return QX
}

// Vmess obfs 参数
function Fobfs(jsonl, Pcert0, PTls13) {
  var obfsi = [];
  var cert = Pcert0;
  tcert = cert == 0 ? "tls-verification=false" : "tls-verification=true";
  tls13 = PTls13 == 1 ? "tls13=true" : "tls13=false"
  if (jsonl.net == "ws" && jsonl.tls == "tls") {
    obfs0 = "obfs=wss, " + tcert + ", " + tls13 + ", ";
    uri0 = jsonl.path && jsonl.path != "" ? "obfs-uri=" + jsonl.path : "obfs-uri=/";
    uri0 = uri0.indexOf("uri=/")!=-1 ? uri0:uri0.replace("uri=","uri=/")
    host0 = jsonl.host && jsonl.host != "" ? "obfs-host=" + jsonl.host + ", " : "";
    obfsi.push(obfs0 + host0 + uri0)
    return obfsi.join(", ")
  } else if (jsonl.net == "ws") {
    obfs0 = "obfs=ws";
    uri0 = jsonl.path && jsonl.path != "" ? "obfs-uri=" + jsonl.path : "obfs-uri=/";
    uri0 = uri0.indexOf("uri=/")!=-1 ? uri0:uri0.replace("uri=","uri=/")
    host0 = jsonl.host && jsonl.host != "" ? "obfs-host=" + jsonl.host + ", " : "";
    obfsi.push(obfs0, host0 + uri0);
    return obfsi.join(", ")
  } else if (jsonl.tls == "tls" && (jsonl.net == "tcp" || jsonl.net == "none")) { // 过滤掉 h2/http 等类型 
    obfs0 = "obfs=over-tls, " + tcert + ", " + tls13;
    uri0 = jsonl.path && jsonl.path != "" ? "obfs-uri=" + jsonl.path : "";
    uri0 = uri0.indexOf("uri=/")!=-1 ? uri0:uri0.replace("uri=","uri=/")
    host0 = jsonl.host && jsonl.host != "" ? ", obfs-host=" + jsonl.host : "";
    obfsi.push(obfs0 + host0)
    return obfsi.join(", ")
  } else if ((jsonl.net == "tcp" || jsonl.net == "none") && jsonl.type == "http"){
    obfs0 = "obfs=http";
    uri0 = jsonl.path && jsonl.path != "" ? "obfs-uri=" + jsonl.path : "obfs-uri=/";
    uri0 = uri0.indexOf("uri=/")!=-1 ? uri0:uri0.replace("uri=","uri=/")
    host0 = jsonl.host && jsonl.host != "" ? "obfs-host=" + jsonl.host + ", " : "";
    obfsi.push(obfs0, host0 + uri0);
    return obfsi.join(", ")
  } else if (jsonl.net !="tcp" && jsonl.net !="none" &&  jsonl.net != undefined){ // 过滤掉 h2/http 等类型
    Perror = 1
    $notify("注意: Quantumult X 不支持该类型节点", "vmess + " + jsonl.net, JSON.stringify(jsonl))
    return "NOT-SUPPORTTED"
  } else if ((jsonl.net == "tcp" || jsonl.net == "none") && jsonl.type != undefined && jsonl.type != "none" && jsonl.type != "" && jsonl.type != "vmess") {
    return "NOT-SUPPORTTED"
  } else {return ""}
}

//a.c.com:0031:origin:aes-256-gcm:plain:pwdpwd/?obfsparam=&remarks=xxxx
//SSR 类型 URI 转换 quanx 格式
function SSR2QX(subs, Pudp, Ptfo) {
    var nssr = []
    var cnt = Base64.decode(subs.split("ssr://")[1].replace(/-/g, "+").replace(/_/g, "/")).split("\u0000")[0]
    var obfshost = '';
    var oparam = '';
    if (cnt.split(":").length <= 8) { //排除难搞的 ipv6 节点
        type = "shadowsocks=";
        ip = cnt.split(":")[0] + ":" + cnt.split(":")[1];
        pwd = "password=" + Base64.decode(cnt.split("/?")[0].split(":")[5].replace(/-/g, "+").replace(/_/g, "/")).split("\u0000")[0];
        mtd = "method=" + cnt.split(":")[3];
        obfs =cnt.split(":")[4]!= "plain"? "obfs=" + cnt.split(":")[4] : ""; //plain?
        ssrp = cnt.split(":")[2] != "origin"? "ssr-protocol=" + cnt.split(":")[2] : ""; //origin?
        if (cnt.indexOf("obfsparam=") != -1 && obfs != "") {
            obfshost = cnt.split("obfsparam=")[1].split("&")[0] != "" ? "obfs-host=" + Base64.decode(cnt.split("obfsparam=")[1].split("&")[0].replace(/-/g, "+").replace(/_/g, "/")).split(",")[0].split("\u0000")[0] : ""
        }
        if (cnt.indexOf("protoparam=") != -1) {
            oparam = cnt.split("protoparam=")[1].split("&")[0] != "" ? "ssr-protocol-param=" + Base64.decode(cnt.split("protoparam=")[1].split("&")[0].replace(/-/g, "+").replace(/_/g, "/")).split(",")[0].split("\u0000")[0]  : ""
        }
        tag = "tag=" + (Base64.decode(cnt.split("remarks=")[1].split("&")[0].replace(/-/g, "+").replace(/_/g, "/"))).split("\u0000")[0]
        pudp = Pudp == 1 ? "udp-relay=true" : "udp-relay=false";
        ptfo = Ptfo == 1 ? "fast-open=true" : "fast-open=false";
        nssr.push(type + ip, pwd, mtd, obfs , obfshost, oparam, ssrp, pudp, ptfo, tag)
        QX = nssr.filter(Boolean).join(", ")
    } else { QX = "" }
    return QX;
}

// AnyTLS uri 转换成 quanx 格式
//anytls://pwd@name:443?peer=xxx.com&udp=1#US-A-ANYTLS-0.5%E5%80%8D%E7%8E%8
// tls with reality
//anytls://ip:port?security=reality&pbk=yourkey&sid=yourshortip&fp=chrome&sni=sample.com#Server-Anytls_Reality

function Anytls2QX(subs,Pcert0) {
  try {
    var Nanytls=[];
    var cnt=subs.split("anytls://")[1]
    type="anytls=";
    ip = cnt.split("@")[1].split("encry")[0].split("?")[0];
    pwd = cnt.split("@")[0]? "password=" + cnt.split("@")[0]:"";
    ptls="over-tls=true"
    pcert = cnt.indexOf("allowInsecure=0") != -1 ? "tls-verification=true" : "tls-verification=false";
    if (Pcert0 == 0) { 
      pcert = "tls-verification=false" 
    } else if (Pcert0 == 1) {
      pcert = "tls-verification=true"
    }
    thost = cnt.indexOf("sni=") != -1? "tls-host="+cnt.split("sni=")[1].split(/&|#/)[0]:""
    thost = cnt.indexOf("peer=") != -1? "tls-host="+cnt.split("peer=")[1].split(/&|#/)[0]:thost
    pudp = Pudp0 == -1 ? "udp-relay=false" : "udp-relay=true" // 默认开启
    tag = cnt.indexOf("#") != -1 ? "tag=" + decodeURIComponent(cnt.split("#").slice(-1)[0]) : "tag= [anytls]" + ip
    // reality
    prlt= version>=914? Reality_Handle(cnt) : ""
    Nanytls.push(type + ip, pwd, ptls, pcert, pudp, thost, prlt, tag)
    QX= Nanytls.filter(Boolean).join(", ")
    return QX
  } catch (error) {
    console.log(error)
  }
}

// Vless uri 转换成 QUANX 格式
// vless://pwd@a.b.c.gq:443?encryption=none&security=tls&type=ws&host=a.b.c.d&path=dsjdaaaaj#VLESS_WSS
// Vless Shadowrocket URI
// vless://YXV0bzpkampkakAxLjEuMS4xOjY2NjY?remarks=vless&obfsParam=123.com&path=/jsjdj&obfs=websocket&tls=1&peer=abc.com&tfo=1
//;vless=example.com:443, method=none, password=23ad6b10-8d1a-40f7-8ad0-e3e35cd32291, obfs=wss, obfs-uri=/ws, fast-open=false, udp-relay=false, tag=vless-ws-tls-01
//vless://YXV0bzpkampkakAxLjEuMS4xOjY2NjY?remarks=vless&obfsParam=hshdh&path=/jsjdj&obfs=http&tls=1&peer=abc.com&tfo=1
//vls = VLESS,1.1.1.1,443,"b0dd64e4-0fbd-4038-9139-d1f32a68a0dc",transport=ws,path=patha,host=host.com,udp=true,over-tls=true,tls-name=sni.co
function VL2QX(subs, Pudp, Ptfo, Pcert0, PTls13) {
  var nvless = []
  var cnt = subs.split("vless://")[1]
  type = "vless=";
  mtd= "method=none"
  obfs=""
  thost=""
  if((cnt.indexOf("remarks=")==-1 && cnt.indexOf("remark=")==-1) && cnt.indexOf("@")!=-1) { // normal URI
  typeU = "URI"
  ip = cnt.split("@")[1].split("encry")[0].split("?")[0];
  pwd = cnt.split("@")[0]? "password=" + cnt.split("@")[0]:"";
  pcert = cnt.indexOf("allowInsecure=0") != -1 ? "tls-verification=true" : "tls-verification=false";
  thost = cnt.indexOf("sni=") != -1? "tls-host="+cnt.split("sni=")[1].split(/&|#/)[0]:""
  thost = cnt.indexOf("peer=") != -1? "tls-host="+cnt.split("peer=")[1].split(/&|#/)[0]:thost
  tag = cnt.indexOf("#") != -1 ? "tag=" + decodeURIComponent(cnt.split("#").slice(-1)[0]) : "tag= [vless]" + ip
  } else { // shadowrocket style
    typeU = "SR-URI"
    b64part = Base64.decode(cnt.split("?")[0])
    ip = b64part.split("@")[1]
    pwd = "password=" + b64part.split("@")[0].split(":")[1]
    tag = cnt.indexOf("remarks=") != -1 ? "tag=" + decodeURIComponent(cnt.split("remarks=")[1].split("&")[0]) : "tag= [vless]" + ip
    tag = cnt.indexOf("remark=") != -1 ? "tag=" + decodeURIComponent(cnt.split("remark=")[1].split("&")[0]) : tag
  }
 
  puri = ""
 
  pudp = (Pudp == 1 || cnt.indexOf("udp=1")!=-1) ? "udp-relay=true" : "udp-relay=false";
  ptfo = (Ptfo == 1 || cnt.indexOf("tfo=1")!=-1)? "fast-open=true" : "fast-open=false";
  if (typeU == "SR-URI") {//小火箭内的websocket写法
    if((cnt.indexOf("obfs=none")!=-1 || cnt.indexOf("obfs=")==-1) && cnt.indexOf("tls=1")==-1) {
      // tcp
      obfs = ""
    } else if((cnt.indexOf("obfs=none")!=-1 || cnt.indexOf("obfs=")==-1) && cnt.indexOf("tls=1")!=-1) {
      obfs = "obfs=over-tls"
    } else if(cnt.indexOf("obfs=http")!=-1) {
      obfs = "obfs=http"
    } else if(cnt.indexOf("obfs=websocket")!=-1) {
      obfs = cnt.indexOf("tls=1") != -1? "obfs=wss" : "obfs=ws"
    } else { //不支持类型
      type="NS"
    }
  thost=cnt.indexOf("obfsParam=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("obfsParam=")[1].split("&")[0].split("#")[0]).replace(/\"|(Host\":)|\{|\}/g,"")
  thost=cnt.indexOf("sni=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("sni=")[1].split("&")[0].split("#")[0]).replace(/\"|(Host\":)|\{|\}/g,"")
  thost=cnt.indexOf("peer=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("peer=")[1].split("&")[0].split("#")[0]).replace(/\"|(Host\":)|\{|\}/g,"")

  puri = cnt.indexOf("path=") == -1? puri : "obfs-uri=" + decodeURIComponent(cnt.split("path=")[1].split("&")[0].split("#")[0])
  } else if (cnt.indexOf("&type=ws")!=-1 || cnt.indexOf("?type=ws")!=-1 || cnt.indexOf("type=http")!=-1 || cnt.indexOf("security=tls")!=-1 || cnt.indexOf("security=reality")!=-1) {//v2rayN uri
    if(cnt.indexOf("type=http") != -1) {
      obfs="obfs=http"
    } else if (cnt.indexOf("type=ws") != -1) {
      obfs = cnt.indexOf("security=tls") != -1 || cnt.indexOf("security=reality")!=-1? "obfs=wss" : "obfs=ws" 
    } else if(cnt.indexOf("type=")==-1 || cnt.indexOf("type=tcp")!=-1) {
      obfs = "obfs=over-tls"
    } else if(cnt.indexOf("type=")!=-1 && cnt.indexOf("type=tcp")==-1) {//暂不支持类型
    type="NS"
  }
    thost1=cnt.indexOf("&host=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("&host=")[1].split("&")[0].split("#")[0])
    thost2=cnt.indexOf("sni=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("sni=")[1].split("&")[0].split("#")[0]).replace(/\"|(Host\":)|\{|\}/g,"")
    thost = thost1.length >= thost2.length ? thost1 : thost2;
    puri = cnt.indexOf("&path=") == -1? puri : "obfs-uri=" + decodeURIComponent(cnt.split("&path=")[1].split("&")[0].split("#")[0])
  } 
if(obfs=="obfs=wss" && obfs=="obfs=over-tls"){
  ptls13 = PTls13 == 1 ? "tls13=true" : "tls13=false"
  if (Pcert0 == 0) { 
    pcert = "tls-verification=false" 
  } else if (Pcert0 == 1) {
    pcert = "tls-verification=true"
  }
} else {
  pcert=""
  ptls13=""
}
// Reality para 2025-12-30
  prlt= version>=891? Reality_Handle(cnt) : ""
  nvless.push(type + ip, pwd, mtd, obfs, pcert, thost, puri, pudp, ptfo, prlt, tag)
  QX = type!="NS"? nvless.filter(Boolean).join(", ")  : ""
  if (type=="NS") {
    PNS=PNS+1
    NSList.push(numToEmoji10(PNS)+subs)
  }
  return QX
}

//Trojan 类型 URI 转换成 QX, 包含小火箭类型
function TJ2QX(subs, Pudp, Ptfo, Pcert0, PTls13) {
    var ntrojan = []
    var cnt = subs.split("trojan://")[1]
    type = "trojan=";
    if (cnt.indexOf(":443") != -1) {
        ip = cnt.split("@")[1].split(":443")[0] + ":443";
    } else {
        ip = cnt.split("@")[1].split("?")[0].split("\n")[0].split("#")[0].trim(); //非 443 端口的奇葩机场？
    }
    pwd = cnt.split("@")[0]? "password=" + decodeURIComponent(cnt.split("@")[0]):"";
    obfs = "over-tls=true";
    pcert = cnt.indexOf("allowInsecure=0") != -1 ? "tls-verification=true" : "tls-verification=false";
    thost = cnt.indexOf("sni=") != -1? "tls-host="+cnt.split("sni=")[1].split(/&|#/)[0]:""
    thost = cnt.indexOf("peer=") != -1? "tls-host="+cnt.split("peer=")[1].split(/&|#/)[0]:thost
    ptls13 = PTls13 == 1 ? "tls13=true" : "tls13=false"
    puri = ""
    if (Pcert0 == 0) { 
      pcert = "tls-verification=false" 
    } else if (Pcert0 == 1) {
      pcert = "tls-verification=true"
    }
    pudp = (Pudp == 1 || cnt.indexOf("udp=1")!=-1) ? "udp-relay=true" : "udp-relay=false";
    ptfo = (Ptfo == 1 || cnt.indexOf("tfo=1")!=-1)? "fast-open=true" : "fast-open=false";
    tag = cnt.indexOf("#") != -1 ? "tag=" + decodeURIComponent(cnt.split("#").slice(-1)[0]) : "tag= [trojan]" + ip
    if (cnt.indexOf("&plugin=obfs-local")!=-1) {//小火箭内的websocket写法
    obfs = cnt.indexOf("obfs=websocket") != -1? "obfs=wss" : obfs 
    thost=cnt.indexOf("obfs-host=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("obfs-host=")[1].split(";")[0].split("#")[0])
    puri = cnt.indexOf("obfs-uri=") == -1? puri : "obfs-uri=" + decodeURIComponent(cnt.split("obfs-uri=")[1].split(";")[0].split("#")[0])
    } else if (cnt.indexOf("&type=ws")!=-1 || cnt.indexOf("?type=ws")!=-1) {//v2rayN uri
      obfs = cnt.indexOf("security=tls") != -1? "obfs=wss" : obfs 
      thost=cnt.indexOf("&host=") == -1? thost : "obfs-host=" + decodeURIComponent(cnt.split("&host=")[1].split("&")[0].split("#")[0])
      puri = cnt.indexOf("&path=") == -1? puri : "obfs-uri=" + decodeURIComponent(cnt.split("&path=")[1].split("&")[0].split("#")[0])
    }
    // Reality para 2025-12-31
    prlt= version>=891? Reality_Handle(cnt) : ""
    ntrojan.push(type + ip, pwd, obfs, pcert, thost, puri, pudp, ptfo,prlt,tag)
    QX = ntrojan.filter(Boolean).join(", ");
    return QX;
}

function joinx(total,item) {
  return total+":"+item
}

//SS 类型 URI 转换 quanx 格式
function SS2QX(subs, Pudp, Ptfo) {
  var nssr = []
  var cnt = subs.split("ss://")[1]
  QX=""
  if (cnt.split(":").length <= 10) { //排除难搞的 ipv6 节点
    type = "shadowsocks=";
    let cntt = cnt.split("#")[0]// 
    if (cntt.indexOf("@") != -1 && cntt.indexOf(":") != -1) { 
      ip = cnt.split("@")[1].split("#")[0].split("/")[0].split("?")[0];
      if(cntt.indexOf("%")==-1 || cntt.split("@")[0].indexOf(":")==-1){ // 2026-05-18 :(%3D)|(\=)
        pwdmtd = Base64.decode(cnt.split("@")[0].replace(/-/g, "+").replace(/_/g, "/").replace(/(%3D)|(\=)/g,"")).split("\u0000")[0].split(":")
      } else {
        pwdmtd = decodeURIComponent(cnt.split("@")[0]).split(":")
      }
    } else if (cntt.indexOf("?")==-1) { // 后部 b64 encode 类型
      var cnt0 = Base64.decode(cnt.split("#")[0].replace(/-/g, "+").replace(/_/g, "/").split("\u0000")[0]);
      ip = cnt0.split("@")[1].split("#")[0].split("/")[0];
      pwdmtd = cnt0.split("@")[0].split(":")
    } else if (cntt.indexOf("?") !=-1) { // 火箭类型？
      var cnt0 = Base64.decode(cnt.split("#")[0].split("?")[0].replace(/-/g, "+").replace(/_/g, "/").split("\u0000")[0]);
      var cnt1 = Base64.decode(cnt.split("#")[0].split("?")[1].split("=")[1].replace(/-/g, "+").replace(/_/g, "/").split("\u0000")[0]);
      ip = cnt0.split("@")[1].split("#")[0].split("/")[0];
      pwdmtd = cnt0.split("@")[0].split(":")
    } 
    mtd = "method=" + pwdmtd[0];
    pwdmtd.splice(0,1) 
    pwd = "password=" + pwdmtd.reduce(joinx);
    if (cntt.indexOf("v2ray-plugin")==-1 && cntt.indexOf("plugin=v2ray")==-1) { //Shadowrocket style v2-plugin
      obfs = cnt.split("obfs%3D")[1] != null ? ", obfs=" + cnt.split("obfs%3D")[1].split("%3B")[0].split("#")[0] : "";
      obfshost = cnt.split("obfs-host%3D")[1] != null ? ", obfs-host=" + decodeURIComponent(cnt.split("obfs-host%3D")[1].split("&")[0].split("#")[0]) : "";
    } else if (cnt1 != undefined){
      cnt1 = JSON.parse(cnt1)
      obfs= cnt1.tls? ", obfs=wss" : ", obfs=ws"
      obfshost = cnt1.host? ", obfs-host="+cnt1.host+", tls-verification=false" : ""
    } else if (cntt.indexOf("v2ray-plugin")!=-1){
      cnt1 = decodeURIComponent(cntt.split("v2ray-plugin")[1])
      obfs= cnt1.indexOf("tls")!=-1? ", obfs=wss" : ", obfs=ws"
      obfshost = cnt1.indexOf("host=")!=-1? ", obfs-host="+cnt1.split("host=")[1].split(";")[0].split("#")[0].trim() : ""
      obfshost = obfshost != "obfs-host="? obfshost : ""
    } else if (cntt.indexOf("plugin=v2ray")!=-1) {
      cnt1 = decodeURIComponent(cntt.split("plugin=v2ray")[1])
      obfs= cnt1.indexOf("tls")!=-1? ", obfs=wss" : ", obfs=ws"
      obfshost = cnt1.indexOf("host=")!=-1? ", obfs-host="+cnt1.split("host=")[1].split(";")[0].split("#")[0].trim() : ""
      obfshost = obfshost != "obfs-host="? obfshost : ""

    }
    tag = decodeURIComponent(cnt.split("#")[1])!="undefined"? "tag=" + decodeURIComponent(cnt.split("#")[1]) : "tag=" + ip
    pudp = Pudp == 1 ? "udp-relay=true" : "udp-relay=false";
    ptfo = Ptfo == 1 ? "fast-open=true" : "fast-open=false";
    nssr.push(type + ip, pwd, mtd + obfs + obfshost, pudp, ptfo, tag)
    QX = nssr.join(", ")
  }
  return QX;
}


//SSD 类型 URI 转换 quanx 格式
function SSD2QX(subs, Pudp, Ptfo) {
    var j = 0
    var QX = []
    var cnt = JSON.parse(Base64.decode(subs.split("ssd://")[1]))
    var type = "shadowsocks=";
    var pwd = "password=" + cnt.password;
    var mtd = "method=" + cnt.encryption;
    var obfs = ""
    var obfshost = ""
    var port = cnt.port ? ":" + cnt.port : ""
    if (cnt.plugin_options) {
        obfs = cnt.plugin_options.split(";")[0] != null ? ", " + cnt.plugin_options.split(";")[0] : "";
        obfshost = cnt.plugin_options.split(";")[1] != null ? ", " + cnt.plugin_options.split(";")[1] : "";
    }
    pudp = Pudp == 1 ? "udp-relay=true" : "udp-relay=false";
    ptfo = Ptfo == 1 ? "fast-open=true" : "fast-open=false";
    for (var i in cnt.servers) {
        ip = cnt.servers[i].server;
        if (cnt.servers[i].plugin_options) {
            obfs = cnt.servers[i].plugin_options.split(";")[0] != null ? ", " + cnt.servers[i].plugin_options.split(";")[0] : "";
            obfshost = cnt.servers[i].plugin_options.split(";")[1] != null ? ", " + cnt.servers[i].plugin_options.split(";")[1] : "";
        }
        if (cnt.servers[i].encryption) {  //独立的加密方式
            mtd = "method=" + cnt.servers[i].encryption
        }
        if (cnt.servers[i].password) {  //独立的密码
            pwd = "password=" + cnt.servers[i].password
        }
        if (ip.indexOf(".") > 0) { //排除难搞的 ipv6 节点
            port = cnt.servers[i].port ? ":" + cnt.servers[i].port : port;
            tag = "tag=" + cnt.servers[i].remarks;
            QX[j] = type + ip + port + ", " + pwd + ", " + mtd + obfs + obfshost + ", " + pudp + ", " + ptfo + ", " + tag;
            var j = j + 1;
        }
    }
    return QX;
}

// 纠正部分不规范的写法(没有把 tag 写在最后)
function QXFix(cntf) {
var cnti = cntf.replace(/\s*tag\s*\=/g,"tag=").replace("chacha20-poly","chacha20-ietf-poly")
try {
  var hd = cnti.split(",tag=")[0]
  var tag = "tag="+cnti.split(",tag=")[1].split(",")[0].trim()
  var tail = cnti.split(tag+",")
  cnti = tail.length<=1?  cnti : String(hd + ","+tail[1].split("\r")[0] +"," + tag)
  cntis = cnti.split(",").filter(Boolean).map(item => item.trim()) //防止节点名中有,符号而导致的错误情况
  tagfix = ""
  cntii = ""
  for (i in cntis) {
    if (cntis[i].indexOf("=") == -1 && cntis[i].trim() !="") {  // tag 中多出的项目
      tagfix += ","+cntis[i]
    } else {
      cntis[i].indexOf("tag=") != 0? cntii += cntis[i]+", ": cntii=cntii
    }
  }
  cntii = cntii+tag+tagfix
  return cntii
} catch (err) {
  if(Perror == 0) {
  $notify("错误: 解析出现错误,已忽略该条目", "注意: 请自行检查订阅链接或内容", cntf+"\n"+ err, bug_link);
}
}
  return ""
}

// 用于过滤非节点部分（比如整份配置中其它内容）,同时纠正部分不规范的写法(没有把 tag 写在最后)
function isQuanX(content) {
    var cnts = content.split("\n");
    var nlist = []
    for (var i = 0; i < cnts.length; i++) {
        var cnti = cnts[i];
        if (cnti.indexOf("=") != -1 && cnti.indexOf("tag") != -1) {
            var cnt = cnti.split("=")[0].trim()
            if (cnt == "http" || cnt == "shadowsocks" || cnt == "trojan" || cnt == "vmess" || cnt == "socks5" || cnt == "vless" ||  cnt == "anytls") {
                nlist.push(QXFix(cnti))
            }
        }
    }
   return nlist
}

//surge script/quanx-rewrite - > quanx
function isQuanXRewrite(content) {
  cnt = content.filter(Boolean)
  cnt0=[]
  var RuleK = ["host,", "-suffix,", "DOMAIN","domain,", "-keyword,", "ip-cidr,", "ip-cidr6,",  "geoip,", "user-agent,", "ip6-cidr,","force-http", "ip-asn"];
  for (var i = 0; i< cnt.length; i++){
    if(cnt[i]){
      var cnti = cnt[i].trim()
      const RuleCheck = (item) => cnti.toLowerCase().indexOf(item) != -1;
      if (cnti.indexOf("pattern")!=-1 && cnti.indexOf("type")!=-1 || cnti.indexOf("http-r")!=-1) {
        cnti=SGMD2QX(cnti)[0]? SGMD2QX(cnti)[0]:""
      }else if ((cnti.indexOf(" 302")!=-1 || cnti.indexOf(" 307")!=-1 || (/\s(_|-)\s(reject|REJECT)/.test(cnti)) || (/\sreject$/.test(cnti)) || (/\sreject-/.test(cnti))) && cnti.indexOf(" url ")==-1 && cnti.indexOf(" url-and-header ")==-1 ){
        cnti=SGMD2QX(cnti)[0]? SGMD2QX(cnti)[0]:""
      }else if(cnti.indexOf(" data=")!=-1){
        cnti = SGMD2QX("[Map Local]\n"+cnti)[0]? SGMD2QX("[Map Local]\n"+cnti)[0]:""
      }else if(cnti.indexOf("URL-REGEX")!=-1 || cnti.indexOf(" header")!=-1 || cnti.replace(/ /g,"").indexOf("hostname=")!=-1){
        cnti=SGMD2QX(cnti)[0]? SGMD2QX(cnti)[0]:""
      }else if (cnti.indexOf(" url ")!=-1 && cnti.indexOf(" simple-response ")==-1 && cnti.indexOf(" url = ")==-1){ // 2023-03-09 去掉 quan类型的 simple- response
        cnti = cnti.replace("^http","http") // 去掉 ^ 以去重
        cnti= cnti.split(" ")[1] == "url" ? cnti : ""
      } else if (cnti.indexOf(" url-and-header ")!=-1 ){ // url-and-header : ^https:xxx.com header-content url-and-header type-rule content
        cnti= cnti //cnti.split(" ")[2] == "url-and-header" ? cnti : ""
      } else if (RuleK.some(RuleCheck) && Pmix==1) {
        cnti= Rule_Policy(cnti)
      } else if (Pjsonjq==0 && cnti.indexOf(" url jsonjq-")!=-1) { // lower version jsonjq pass
        cnti=""
      } else {
        cnti=""
      }
      if (cnti!="" && cnti.trim()[0]!="[" && cnti.indexOf("RULE-SET")==-1 && !/cronexp\=|type\=cron/.test(cnti.replace(/ /g,""))) { //&& !RuleK.some(RuleCheck)
        if (!(/\;$/.test(cnti))) { // 某些特殊情形 let url = xxx;
        cnt0.push(cnti) //  排除其它项目后写入
      }
      }
    }
  }
  return cnt0
}

//Surge2QX 转换主函数
function Surge2QX(conf) {
  var QXlist = conf.split("\n").map(isSurge).filter(Boolean)
  var Nlist = []
  var node=""
  for (var i = 0; i < QXlist.length; i++) {
    var cnt = QXlist[i];
    if (cnt.split("=")[1].split(",")[0].indexOf("trojan") != -1) {
      node = Strojan2QX(cnt)//surge 3的trojan
    } else if (cnt.split("=")[1].split(",")[0].indexOf("http") != -1) {
      node = Shttp2QX(cnt) //surge 3的http
    } else if (cnt.split("=")[1].split(",")[0].indexOf("vmess") != -1) {
      node = SVmess2QX(cnt) //surge 3的Vmess
    } else if (cnt.split("=")[1].split(",")[0].indexOf("ss") != -1) {
      node = SSS2QX(cnt) //surge 3的SS
    } else if (cnt.split("=")[1].split(",")[0].indexOf("socks5") != -1) {
      node = SS52QX(cnt) //surge 3的Socks5
    } else if (cnt.split("=")[1].split(",")[0].indexOf("custom") != -1) {
      node = SCT2QX(cnt) //surge2写法
    } else if (cnt.split("=")[1].split(",")[0].indexOf("anytls") != -1 && version>913) {
      node = SATS2QX(cnt) // surge anytls from version 913 afterward
    }
    node = Pudp0 != 0 ? XUDP(node,Pudp0) : node
    node = Ptfo0 != 0 ? XTFO(node,Ptfo0) : node
    if (cnt.indexOf("test-url") !=-1) {
      var checkurl = ", server_check_url" + cnt.split("test-url")[1].split(",")[0]
      node = node.replace(/\,(\s)*tag/, checkurl + ", tag")
    }
    Nlist.push(node)
  }
  return (Nlist)
}


// surge2 中的 SS 类型写法(custom)
// 俄罗斯 GIA = custom, ip, 152, aes-128-gcm, password123, https://xxx/download/SSEncrypt.module, obfs=tls, obfs-host=xxx.windows.com, udp-relay=true
function SCT2QX(content) {
    var cnt = content;
    var tag = "tag=" + cnt.split("=")[0].trim();
    var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
    var pmtd = "method=" + cnt.split(",")[3].trim();
    var pwd = "password=" + cnt.split(",")[4].trim();
    if (cnt.indexOf("obfs") != -1) {
        pobfs = "obfs=" + cnt.replace(/obfs-host/, "").split("obfs")[1].split(",")[0].split("=")[1]
    } else { pobfs = "" }
    var phost = cnt.indexOf("obfs-host") != -1 ? "obfs-host" + cnt.split("obfs-host")[1].split(",")[0].trim() : "";
    if (phost != "") {
        pobfs = pobfs + ", " + phost
    }
    var ptfo = paraCheck(cnt, "tfo") == "true" ? "fast-open=true" : "fast-open=false";
    var pudp = paraCheck(cnt, "udp-relay") == "true" ? "udp-relay=true" : "udp-relay=false";
    var nserver = pobfs != "" ? "shadowsocks= " + [ipport, pmtd, pwd, pobfs, ptfo, pudp, tag].join(", ") : "shadowsocks= " + [ipport, pmtd, pwd, ptfo, pudp, tag].join(", ");
    return nserver
}


// surge3 中的 SS 类型
function SSS2QX(content) {
    var cnt = content;
    var cnts=cnt.replace(" ","").replace("\"","")
    var tag = "tag=" + cnt.split("=")[0].trim();
    var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
    var pmtd = "method=" + cnt.split("encrypt-method")[1].split(",")[0].split("=")[1];
    var pwd = "password=" + cnts.split("password=")[1].split(",")[0].replace("\"","")//.split("\"")[0];
    if (cnt.indexOf("obfs") != -1) {
        pobfs = "obfs=" + cnt.replace(/obfs-host/, "").split("obfs")[1].split(",")[0].split("=")[1]
    } else { pobfs = "" }
    var phost = cnt.indexOf("obfs-host") != -1 ? "obfs-host" + cnt.split("obfs-host")[1].split(",")[0].trim() : "";
    if (phost != "") {
        pobfs = pobfs + ", " + phost
    }
    var ptfo = paraCheck(cnt, "tfo") == "true" ? "fast-open=true" : "fast-open=false";
    var pudp = paraCheck(cnt, "udp-relay") == "true" ? "udp-relay=true" : "udp-relay=false";
    var nserver = pobfs != "" ? "shadowsocks= " + [ipport, pmtd, pwd, pobfs, ptfo, pudp, tag].join(", ") : "shadowsocks= " + [ipport, pmtd, pwd, ptfo, pudp, tag].join(", ");
    return nserver
}


// surge 中的 Vmess 类型
function SVmess2QX(content) {
    var cnt = content;
    var tag = "tag=" + cnt.split("=")[0].trim();
    var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
    var puname = cnt.indexOf("username") != -1 ? "password=" + cnt.split("username")[1].split(",")[0].split("=")[1].trim() : "";
    var pmtd = "method=aes-128-gcm";
    var ptls13 = paraCheck(cnt, "tls13") == "true" ? "tls13=true" : "tls13=false";
    var pverify = cnt.replace(/ /g,"").indexOf("skip-cert-verify=false") != -1 ? "tls-verification=true" : "tls-verification=false";
    if (paraCheck(cnt.replace(/tls13/, ""), "tls") == "true" && paraCheck(cnt.replace(/ws-header/, ""), "ws") == "true") {
        pobfs = "obfs=wss" + ", " + ptls13 + ", " + pverify
    } else if (paraCheck(cnt.replace(/ws-header/, ""), "ws") == "true") {
        pobfs = "obfs=ws"
    } else if (paraCheck(cnt.replace(/tls13/, ""), "tls") != "false") {
        pobfs = "obfs=over-tls" + ", " + ptls13 + ", " + pverify
    } else if (paraCheck(cnt.replace(/ws-header/, ""), "ws") == "false") {
        pobfs = ""
    }
    var puri = paraCheck(cnt, "ws-path") != "false" ? "obfs-uri=" + cnt.split("ws-path")[1].split(",")[0].split("=")[1].trim() : "obfs-uri=/"
    var phost = cnt.indexOf("ws-headers") != -1 ? "obfs-host=" + cnt.split("ws-headers")[1].split(",")[0].split("=")[1].split(":")[1].trim() : "";
    if (pobfs.indexOf("ws" || "wss") != -1) {
        if (phost != "") {
            pobfs = pobfs + ", " + puri + ", " + phost
        } else { pobfs = pobfs + ", " + puri }
    }
    var ptfo = paraCheck(cnt, "tfo") == "true" ? "fast-open=true" : "fast-open=false";
    var nserver = pobfs != "" ? "vmess= " + [ipport, puname, pmtd, pobfs, ptfo, tag].join(", ") : "vmess= " + [ipport, puname, pmtd, ptfo, tag].join(", ");
    return nserver
}

// 用于过滤非节点部分（比如整份配置中其它内容）
function isSurge(content) {
  if (content.indexOf("=") != -1) {
    cnt = content.split("=")[1].split(",")[0].trim()
    if (cnt == "http" || cnt == "ss" || cnt == "trojan" || cnt == "vmess" || cnt == "custom" || cnt == "https" || cnt == "socks5"|| cnt == "socks5-tls"|| cnt == "anytls") {
        return content
    }
  }
}
// 用于参数检查
function paraCheck(content, para) {
  content=content.replace(/ /g,"")
  if (content.indexOf(para+"=") == -1) {
    return "false"
  } else {
    return content.split(para+"=")[1].split(",")[0].trim()
  }
}
//surge中 trojan 类型转换
function Strojan2QX(content) {
  var cnt = content;
  var tag = "tag=" + cnt.split("=")[0].trim();
  var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
  var pwd = "password=" + cnt.split("password")[1].split(",")[0].split("=")[1].trim();
  var ptls = "over-tls=true";
  var ptfo = paraCheck(cnt, "tfo") == "true" ? "fast-open=true" : "fast-open=false";
  var pverify = cnt.replace(/ /g,"").indexOf("skip-cert-verify=false") != -1 ? "tls-verification=true" : "tls-verification=false";
  var phost = cnt.indexOf("sni")!=-1? "tls-host="+cnt.split("sni")[1].split(",")[0].split("=")[1]:""
  var ptls13 = paraCheck(cnt, "tls13") == "true" ? "tls13=true" : "tls13=false";
  var nserver = "trojan= " + [ipport, pwd, ptls, ptfo, ptls13, phost,pverify, tag].filter(Boolean).join(", ");
  return nserver
}

// surge中 anytls类型转换
function SATS2QX(content) {
  try {
    var cnt = content;
    var tag = "tag=" + cnt.split("=")[0].trim();
    var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
    var pwd = "password=" + cnt.split("password")[1].split(",")[0].split("=")[1].trim();
    var ptls = "over-tls=true";
    var pverify = cnt.replace(/ /g,"").indexOf("skip-cert-verify=false") != -1 ? "tls-verification=true" : "tls-verification=false";
    var phost = cnt.indexOf("sni")!=-1? "tls-host="+cnt.split("sni")[1].split(",")[0].split("=")[1]:""
    pudp = Pudp0 == -1 ? "udp-relay=false" : "udp-relay=true" // 默认开启
    var nserver = "anytls= " + [ipport, pwd, ptls, pverify, phost,pudp, tag].filter(Boolean).join(", ");
    return nserver
  } catch (error) {
    console.log("surge-anytls:"+error)
  }
}


// surge 中的 http 类型
function Shttp2QX(content) {
  var cnt = content;
  var tag = "tag=" + cnt.split("=")[0].trim();
  var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
  var puname = cnt.indexOf("username") != -1 ? "username=" + cnt.split("username")[1].split(",")[0].split("=")[1].trim() : "";
  var pwd = cnt.indexOf("password") != -1 ? "password=" + cnt.split("password")[1].split(",")[0].split("=")[1].trim() : "";
  var ptls = cnt.split("=")[1].split(",")[0].trim() == "https" ? "over-tls=true" : "over-tls=false";
  var ptfo = paraCheck(cnt, "tfo") == "true" ? "fast-open=true" : "fast-open=false";
  if (ptls == "over-tls=true") {
    var pverify = cnt.replace(/ /g,"").indexOf("skip-cert-verify=false") != -1 ? "tls-verification=true" : "tls-verification=false";
    var ptls13 = paraCheck(cnt, "tls13") == "true" ? "tls13=true" : "tls13=false";
    ptls = ptls + ", " + pverify + ", " + ptls13
  }
  var nserver = puname != "" ? "http= " + [ipport, puname, pwd, ptls, ptfo, tag].join(", ") : "http= " + [ipport, ptls, ptfo, tag].join(", ");
  return nserver
}

// surge 中的 socks5 类型
function SS52QX(content) {
  var cnt = content;
  var tag = "tag=" + cnt.split("=")[0].trim();
  var ipport = cnt.split(",")[1].trim() + ":" + cnt.split(",")[2].trim();
  var puname = cnt.indexOf("username") != -1 ? "username=" + cnt.split("username")[1].split(",")[0].split("=")[1].trim() : "";
  var pwd = cnt.indexOf("password") != -1 ? "password=" + cnt.split("password")[1].split(",")[0].split("=")[1].trim() : "";
  var ptls = cnt.split("=")[1].split(",")[0].trim() == "socks5-tls" ? "over-tls=true" : "over-tls=false";
  var ptfo = paraCheck(cnt, "tfo") == "true" ? "fast-open=true" : "fast-open=false";
  if (ptls == "over-tls=true") {
    var pverify = cnt.replace(/ /g,"").indexOf("skip-cert-verify=false") != -1 ? "tls-verification=true" : "tls-verification=false";
    var ptls13 = paraCheck(cnt, "tls13") == "true" ? "tls13=true" : "tls13=false";
    ptls = ptls + ", " + pverify + ", " + ptls13
  }
  var nserver = puname != "" ? "socks5= " + [ipport, puname, pwd, ptls, ptfo, tag].join(", ") : "socks5= " + [ipport, ptls, ptfo, tag].join(", ");
  return nserver
}

function Loon2QX(cnt) {
  var type = cnt.split("=")[1].split(",")[0].trim()
  var node = ""
  if (type == "Shadowsocks") { //ss 类型
      node = LoonSS2QX(cnt)
  } else if (type == "ShadowsocksR") { //ssr 类型
      node = LoonSSR2QX(cnt)
  } else if (type == "VLESS") { // vless 类型
    node = LoonVL2QX(cnt)
  } else if (type == "AnyTLS" && version > 913) { // anytls 类型
    node = LoonTLS2QX(cnt)
  }
  return node
}
//Loon 的 ss 部分
function LoonSS2QX(cnt) {
  var node = "shadowsocks="
  var ip = [cnt.split(",")[1].trim(), cnt.split(",")[2].trim()].join(":")
  var mtd = "method=" + cnt.split(",")[3].trim()
  var pwd = "password=" + cnt.split(",")[4].trim().split("\"")[1]
  var obfs = cnt.split(",").length == 7 ? ", " + ["obfs=" + cnt.split(",")[5].trim(), "obfs-host=" + cnt.split(",")[6].trim()].join(",") : ""
  var tag = ", tag=" + cnt.split("=")[0].trim()
  node = node + [ip, mtd, pwd].join(", ") + obfs + tag
  return node
}

//Loon 的 ssr 部分
//# SSR 格式：名称=协议类型,地址,端口,加密方式,密码,协议类型,{协议参数},混淆类型,{混淆参数}
//3 = ShadowsocksR, 1.2.3.4, 443, aes-256-cfb,"password",auth_aes128_md5,{},tls1.2_ticket_auth,{}
function LoonSSR2QX(cnt) {
  var node = "shadowsocks="
  var ip = [cnt.split(",")[1].trim(), cnt.split(",")[2].trim()].join(":")
  var mtd = "method=" + cnt.split(",")[3].trim()
  var pwd = "password=" + cnt.split(",")[4].trim().split("\"")[1]
  var ssrp = "ssr-protocol=" + cnt.split(",")[5].trim()
  var ssrpara = "ssr-protocol-param=" + cnt.split(",")[6].replace(/\{|\}/g, "").trim()
  var obfs = "obfs=" + cnt.split(",")[7].trim()
  var obfshost = "obfs-host=" + cnt.split(",")[8].replace(/\{|\}/g, "").trim()
  var tag = ", tag=" + cnt.split("=")[0].trim()
  node = node + [ip, mtd, pwd, ssrp, ssrpara, obfs, obfshost].join(", ") + tag
  return node
}

// read parameters
function param1(res,org,mbody) {
  mbodys=mbody.replace(/\s/g,"")
  if(mbodys.indexOf(org)!=-1) {
    tmp=mbodys.split(org)[1].split("=")[1].split(",")[0].replace(/\"/g,"")
    return res+"="+tmp
  }
  else return ""
}

//Loon 的 VLESS 部分
//vls = VLESS,1.1.1.1,443,"b0dd64e4-0fbd-4038-9139-d1f32a68a0dc",transport=ws,path=patha,host=host.com,udp=true,over-tls=true,tls-name=sni.co
//2025-12-31 add reality part support
//vls-name = VLESS,ip,port,"pwd",transport=tcp,flow=xtls-rprx-vision,public-key="pbk",short-id=sid,udp=true,block-quic=true,over-tls=true,sni=sni.com
function LoonVL2QX(cnt) {
  var tag = ", tag=" + cnt.split("=")[0].trim()
  cnt=cnt.replace(" ","") //去掉空格 简化 
  var node = "vless="
  var ip = [cnt.split(",")[1].trim(), cnt.split(",")[2].trim()].join(":")
  var mtd = "method=none"
  var pwd = "password=" + cnt.split(",")[3].trim().split("\"")[1]
  if (cnt.indexOf("transport=tcp")!=-1) {
    obfs= cnt.indexOf("over-tls=true")=="-1"? "":"obfs=over-tls"
  } else if (cnt.indexOf("transport=http")!=-1) {
    obfs="obfs=http"
  } else if (cnt.indexOf("transport=ws")!=-1) {
    obfs= cnt.indexOf("over-tls=true")=="-1"? "obfs=ws":"obfs=wss"
  }
  vpath = cnt.indexOf("path=")==-1? "":"obfs-uri="+cnt.split("path=")[1].split(",")[0]
  if (cnt.indexOf("host=")!=-1) {
    obfshost="obfs-host="+cnt.split("host=")[1].split(",")[0]
  }  else if (cnt.indexOf("tls-name=")!=-1) {
    obfshost="obfs-host="+cnt.split("tls-name=")[1].split(",")[0]
  } else if (cnt.indexOf("sni=")!=-1) {
    obfshost="obfs-host="+cnt.split("sni=")[1].split(",")[0]
  }
  vflow=param1("vless-flow","flow",cnt)
  vpbk=param1("reality-base64-pubkey","public-key",cnt)
  vsid=param1("reality-hex-shortid","short-id",cnt)
  node = node + [ip, mtd, pwd, obfs, obfshost, vpath,vflow,vpbk,vsid].filter(Boolean).join(", ") + tag
  return node
}

// loon anytls
//loon-tls = AnyTLS,1.1.1.1,443,"jdjdhd",sni=abc.com,skip-cert-verify=true,udp=true,block-quic=false
function LoonTLS2QX(content) {
  try {
    var cnt = content;
    $notify("Loon","",cnt)
    var tag = "tag=" + cnt.split("=")[0].trim();
    var ipport = [cnt.split(",")[1].trim(), cnt.split(",")[2].trim()].join(":");
    var pwd = "password=" +  + cnt.split(",")[3].trim().split("\"")[1];
    var ptls = "over-tls=true";
    var phost = cnt.indexOf("sni")!=-1? "tls-host="+cnt.split("sni")[1].split(",")[0].split("=")[1]:""
    pudp = Pudp0 == -1 ? "udp-relay=false" : "udp-relay=true" // 默认开启
    var pverify = cnt.replace(/ /g,"").indexOf("skip-cert-verify=false") != -1 ? "tls-verification=true" : "tls-verification=false";
    var nserver = "anytls= " + [ipport, pwd, ptls, pverify, phost,pudp, tag].filter(Boolean).join(", ");
    $notify("Loon","",nserver)
    return nserver
  } catch (error) {
    console.log("loon-anytls:"+error)
  }

}

////////////////////

function YAMLFix(cnt){
  cnt = cnt.replace(/\[/g,"yaml@bug𝟙").replace(/\\r/g,"").replace(/\*/g,"yaml@bug𝟚")
  //2022-08-08 增加 .replace(/\*/g,"star@bug2") 以解决名字以 * 开始时引起的部分问题
  if (cnt.indexOf("{") != -1 && /\{\s*\"*(name|type|server)/.test(cnt)){ // - { } 类型 yaml
    cnt =  cleanYamlSpaces(cnt) // 2026-02-06 部分空格解析错误
    cnt = cnt.replace(/(^|\n)- /g, "$1  - ").replace(/    - /g,"  - ").replace(/:(?!\s)/g,": ").replace(/\,\"/g,", \"").replace(/: {\s{0,1}/g, ": {,   ").replace(/, (Host|host|path|mux)/g,",   $1")
    //2022-04-11 remove tls|skip from replace(/, (Host|host|path|mux)/g,",   $1")
    console.log("1st:\n"+cnt)
    cnt = cnt.replace(/{\s*name: (.*?), (.*?):/g,"{name: \"$1\", $2:").replace(/\"/gi,"").replace(/, short-id\"{0,1}/gi,",   short-id") //cnt.replace(/{\s*name: /g,"{name: \"").replace(/, (.*?):/,"\", $1:")
    cnt = cnt.replace(/{\s*|\s*}/g,"").replace(/,/g,"\n   ")
  }
  cnt = cnt.replace(/\n\s*\-\s*\n.*name/g,"\n  - name").replace(/\$|\`/g,"").split("proxy-providers:")[0].split("proxy-groups:")[0].replace(/\"(name|type|server|port|cipher|password|uuid|alterId|udp)(\"*)/g,"$1")
  $notify("part-fix0:","","part-fix0:\nproxies:\n"+cnt.split("proxies:")[1])
  // 缩进修正
  // old 2023-03-23  如下修正部分类型 
  //new  2026-01-08 
  cnt = /\n\-\s[a-zA-Z]/.test(cnt)? cnt.replace(/\n(.*(\:|\-))/g,"\n  $1"):cnt.replace(/\n\s{2}([a-zA-Z]+.*\:)/g,"\n    $1").replace(/\n(\-.*)/g,"\n  $1")
  $notify("part-fix1:","","part-fix1:\nproxies:\n"+cnt.split("proxies:")[1])
  cnt = cnt.replace(/name\:(.*?)\:(.*?)\n/gmi,"name:$1冒号$2\n").replace(/\s{6}Host\:/g,"      Host:")//.replace(/\{\s*(Host\:.*)\}/gmi,"$1") //罕见bug情况 修复
  items=cnt.split("\n").map(yamlcheck)
  cnt=items.join("\n")
  //2022-05-11 增加如下
  //2022-06-07 修改为如下，解决部分无 proxies 字段的
  //2022-09-01 remove host in s{6}(H|h)ost
  //2022-11-29 修改
  cnt = cnt.indexOf("proxies:") != -1 && /\n\s{4}server/.test(cnt)  ? cnt.replace(/\n\s{4}(headers|path)/g,"\n      $1").replace(/\n\s{6}Host/g,"\n        Host").replace(/\t/g,""):cnt
  cnt = cnt.indexOf("proxies:") == -1? "proxies:\n" + cnt :"proxies:"+cnt.split("proxies:")[1]
  cnt = cnt.replace(/>/g,"⟩") // 2026-02-02 部分奇葩问题
  console.log("after-fix\n"+cnt)
  $notify("After-Fix","this is", "After-fix:\n"+cnt)

  return cnt
}

// 2026-02-06 {} yaml 空格问题修复
function cleanYamlSpaces(yamlText) {
  return yamlText.split('\n').map(line => {
    if (line.includes('{') && line.includes('}')) {
      return '  ' + line.trim().replace(/ {2,}/g, ' ');
    }
    return line;
  }).join('\n');
}

function yamlcheck(cnt){
  if (cnt.indexOf("name") !=-1){ //名字以某些数字结尾时，解析有 bug
    for (var i=0;i<10;i++) {
      cnt = cnt.replace(new RegExp(patn[0][i], "gmi"),patn[4][i])
    }
    
  }
  if (/(:)/.test(cnt) && !/alpn\s*\:/.test(cnt)) {
    return cnt
  }
}

function reorderYamlByNesting(yamlString, decodeUnicode = true) {
  // 如果需要，先解码 Unicode
  if (decodeUnicode) {
    yamlString = decodeUnicodeEscapes(yamlString);
  }
  
  const lines = yamlString.split('\n');
  const result = [];
  let i = 0;
  // 收集字段块（包括所有子级）
  function collectFieldBlock(startIdx, parentIndent) {
    const block = [lines[startIdx]];
    let idx = startIdx + 1;
    while (idx < lines.length) {
      const line = lines[idx];
      const indent = line.search(/\S/);
      const trimmed = line.trim();
      if (!trimmed) {
        idx++;
        continue;
      }
      if (indent <= parentIndent) {
        break;
      }
      block.push(line);
      idx++;
    }
    return { block, nextIdx: idx };
  }
  // 判断是否有子级
  function hasChildren(block, parentIndent) {
    return block.slice(1).some(line => {
      const trimmed = line.trim();
      return trimmed && line.search(/\S/) > parentIndent;
    });
  }
  // 处理单个列表项
  function processListItem(startIdx, listIndent) {
    const simpleFields = [];
    const nestedFields = [];
    const fieldIndent = listIndent + 2;
    let idx = startIdx;
    while (idx < lines.length) {
      const line = lines[idx];
      const indent = line.search(/\S/);
      const trimmed = line.trim();
      if (!trimmed) {
        idx++;
        continue;
      }
      if (indent <= listIndent) {
        break;
      }
      if (indent === fieldIndent && trimmed.includes(':')) {
        const { block, nextIdx } = collectFieldBlock(idx, fieldIndent);
        
        if (hasChildren(block, fieldIndent)) {
          nestedFields.push(...block);
        } else {
          simpleFields.push(block[0]);
        }
        
        idx = nextIdx;
      } else {
        idx++;
      }
    }
    return { simpleFields, nestedFields, endIdx: idx };
  }
  // 主循环
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      const listIndent = line.search(/\S/);
      result.push(line);
      
      const { simpleFields, nestedFields, endIdx } = processListItem(i + 1, listIndent);
      result.push(...simpleFields, ...nestedFields);
      
      i = endIdx;
    } else {
      result.push(line);
      i++;
    }
  }
  return result.join('\n');
}
function decodeUnicodeEscapes(str) {
  return str
  .replace(/\\U([0-9A-Fa-f]{8})/g, (match, hex) => {
    return String.fromCodePoint(parseInt(hex, 16));
  })
  .replace(/\\u\{([0-9A-Fa-f]+)\}/g, (match, hex) => {
    return String.fromCodePoint(parseInt(hex, 16));
  })
  .replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
    return String.fromCodePoint(parseInt(hex, 16));
  })
  .replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

// 完整的json
function JCheck(cnt) {
  if (/^{/.test(cnt) &&/}$/.test(cnt)) {
    return 1
  } else {
    return 0
  }
}


// Clash parser
function Clash2QX(cnt) {
  const yaml = new YAML()
  // 如果本身为json则无需解析
  aa = JCheck(cnt)==0 ? JSON.stringify(yaml.parse(reorderYamlByNesting(YAMLFix(cnt)))).replace(/yaml@bug𝟙/g,"[").replace(/冒号/gmi,":").replace(/yaml@bug𝟚/g,"*") : cnt
  for (var i=0;i<10;i++) {
    aa = aa.replace(new RegExp(patn[4][i], "gmi"),patn[0][i])
  }
  var bb = JSON.parse(aa).proxies
  var nl = bb.length
  var nodelist=[]
  var node=""
  for (i=0; i<nl; i++){
    try{
      node=bb[i]
      typecc = node.type
      if (typecc == "ss") {
        node = CSS2QX(node)
      } else if (typecc == "ssr"){
        node = CSSR2QX(node)
      } else if (typecc == "vmess"){
        node = CV2QX(node)
      } else if (typecc == "trojan"){
        node = CT2QX(node)
      } else if (typecc == "http"){
        node = CH2QX(node)
      } else if (typecc == "socks5"){
        node = CS52QX(node)
      } else if (typecc == "vless"){
        node = CVL2QX(node)
      } else if (typecc=="anytls" && version >913) { //anytls
        node = CTLS2QX(node)
      } else { PNS = PNS+1; NSList.push(numToEmoji10(PNS)+bb[i]); typecc="NS"; continue }
      node = Pudp0 != 0 ? XUDP(node,Pudp0) : node
      node = Ptfo0 != 0 ? XTFO(node,Ptfo0) : node
      if (typecc!="NS") {
        node=node.replace(/^([^,]*)\s+/g, (match, p1) => p1.replace(/\s+/g, ''));
        nodelist.push(node)
      }
    } catch (e) {
      $notify(`注意:该节点解析错误, 暂时已忽略处理`,`请自行检查该节点内容`,JSON.stringify(node),bug_link )
      $notify(`注意:错误内容如下`,`请自行检查错误内容`,JSON.stringify(node)+"\n\n"+e)
    }
  }
  return nodelist.join("\n")
}

//Clash ss type server
function CSS2QX(cnt) {
  tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi,"")
  ipt = cnt.server+":"+cnt.port
  pwd = "password=" + cnt.password
  mtd = "method="+ cnt.cipher
  udp = cnt.udp ? "udp-relay=true" : "udp-relay=false"
  uot = cnt["udp-over-tcp"] ?  "udp-over-tcp=true" : "udp-over-tcp=false"
  tfo = cnt.tfo ? "fast-open=true" : "fast-open=false"
  obfs = cnt["plugin-opts"] ? "obfs=" + cnt["plugin-opts"].mode : ""
  ohost = cnt["plugin-opts"] ? "obfs-host=" + cnt["plugin-opts"].host : ""
  ouri = ""
  cert = ""
  if (obfs.indexOf("websocket") != -1) {
      obfs = cnt["plugin-opts"].tls? "obfs=wss" : "obfs=ws"
      ohost = cnt["plugin-opts"].host? "obfs-host=" + cnt["plugin-opts"].host:""
      ouri = cnt["plugin-opts"].path? "obfs-uri=" + cnt["plugin-opts"].path: ""
    if (obfs == "obfs=wss") { // tls verification
      cert = Pcert0 == 1? "" : "tls-verification =false"}
  }
  node = "shadowsocks="+[ipt, pwd, mtd, udp, uot, tfo, obfs, ohost, ouri, cert, tag].filter(Boolean).join(", ")
  return node
}

//Clash ssr type server
function CSSR2QX(cnt) {
  tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi,"")
  ipt = cnt.server+":"+cnt.port
  pwd = "password=" + cnt.password
  mtd = "method="+ cnt.cipher
  udp = cnt.udp ? "udp-relay=true" : "udp-relay=false"
  tfo = cnt.tfo ? "fast-open=true" : "fast-open=false"
  prot = "ssr-protocol=" + cnt.protocol
  ohost=""
  ppara=""
  if(cnt["protocolparam"]) {
    cnt["protocol-param"] = cnt["protocolparam"]
  }
  if (typeof(cnt["protocol-param"]) == "string") {
    ppara = "ssr-protocol-param=" + cnt["protocol-param"]
  } else if (typeof(cnt["protocol-param"]) == "object") {
    console.log(typeof(cnt["protocol-param"]))
    ppara = "ssr-protocol-param=" + JSON.stringify(cnt["protocol-param"]).replace(/{|}|\s|"/g,"")
  }
  obfs = "obfs=" + cnt.obfs
  if ( cnt["obfs-param"]) {
     ohost = "obfs-host=" + cnt["obfs-param"]
  } else if (cnt["obfsparam"]) {
     ohost = "obfs-host=" + cnt["obfsparam"]
  }
 
  node = "shadowsocks="+[ipt, pwd, mtd, udp, tfo, prot, ppara, obfs, ohost, tag].filter(Boolean).join(", ")
  return node
}


//Clash vmess type server
function CV2QX(cnt) {
  tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi," ")
  ipt = cnt.server+":"+cnt.port
  pwd = "password=" + cnt.uuid
  mtd = "method="+ "aes-128-gcm" //cnt.cipher
  udp = cnt.udp ? "udp-relay=false" : "udp-relay=false" //暂不支持
  tfo = cnt.tfo ? "fast-open=true" : "fast-open=false"
  obfs = ""
  if (cnt.network == "ws" && cnt.tls) {
    obfs = "obfs=wss"
  } else if (cnt.network == "ws"){
    obfs = "obfs=ws"
  } else if (cnt.network == "http"){
    obfs = "obfs=http"
  } else if (cnt.tls){
    obfs = "obfs=over-tls"
  }
  console.log(obfs)
  const phost = getValue(()=>cnt["ws-opts"]["headers"]["Host"]) 
  ohost = cnt["ws-headers"]? "obfs-host=" + cnt["ws-headers"]["Host"] : ""
  ohost = phost ? "obfs-host="+phost : ohost
  ohost = cnt["servername"]? "obfs-host=" + cnt["servername"] : ohost
  console.log(ohost)
  ouri = cnt["ws-path"]? "obfs-uri="+cnt["ws-path"] : ""
  ouri = cnt["ws-opts"]? "obfs-uri="+cnt["ws-opts"]["path"] : ouri
  cert = cnt["skip-cert-verify"] && cnt.tls ? "tls-verification=false" : ""
  caead = cnt["alterId"] && cnt["alterId"]!=0? "aead=false" : "" // aead 选项
  console.log(caead)
  if (Pcert0 == 1 && cnt.tls) {
    cert = "tls-verification=true"
  } else if (Pcert0 != 1 && cnt.tls) {
    cert = "tls-verification=false"
  }
  node = "vmess="+[ipt, pwd, mtd, udp, tfo, obfs, ohost, ouri, cert, caead, tag].filter(Boolean).join(", ")
  return node
}


//Clash Trojan
function CT2QX(cnt) {
  tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi," ")
  ipt = cnt.server+":"+cnt.port
  pwd = "password=" + cnt.password
  otls = "over-tls=true"
  opath=""
  ohost=""
  cert = cnt["skip-cert-verify"] ? "tls-verification=false" : "tls-verification=true"
  cert = Pcert0 == 1 ? "tls-verification=true" : "tls-verification=false"
  tls13 = PTls13 == 1 ? "tls13=true" : "tls13=false"
  udp = cnt.udp ? "udp-relay=false" : "udp-relay=false"
  tfo = cnt.tfo ? "fast-open=true" : "fast-open=false"
  if (cnt.network=="ws") { //wss类型
    otls = "obfs=wss"
    if (cnt["ws-opts"]){
    opath = cnt["ws-opts"]["path"]? "obfs-uri="+cnt["ws-opts"]["path"] : ""
    ohost = cnt["ws-opts"]["headers"]? "obfs-host="+cnt["ws-opts"]["headers"]["Host"] : ""
    }
  }
  node = "trojan="+[ipt, pwd, otls, opath, ohost, cert, tls13, udp, tfo, tag].filter(Boolean).join(", ")
  return node
}

// Clash Anytls 2026-04-15

function CTLS2QX(cnt) {
  tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi," ")
  ipt = cnt.server+":"+cnt.port
  pwd = "password=" + cnt.password
  otls = "over-tls=true"
  opath=""
  ohost= "tls-host="+cnt.sni
  cert = cnt["skip-cert-verify"] ? "tls-verification=false" : "tls-verification=true"
  cert = Pcert0 == 1 ? "tls-verification=true" : "tls-verification=false"
  pudp = Pudp0 == -1 ? "udp-relay=false" : "udp-relay=true" // 默认开启
  node = "anytls="+[ipt, pwd, otls, ohost, pudp, cert, tag].filter(Boolean).join(", ")
  return node
}

// Clash http
function CH2QX(cnt){
    tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi," ")
    ipt = cnt.server+":"+cnt.port
    uname = cnt.username ? "username=" + cnt.username : ""
    pwd = cnt.password && typeof(cnt.password) == "string" ? "password=" + cnt.password : ""
    tls = cnt.tls ? "over-tls=true" : ""
    cert = cnt["skip-cert-verify"] && cnt.tls ? "tls-verification=false" : ""
    if (Pcert0 == 1 && cnt.tls) {
      cert = "tls-verification=true"
    } else if (Pcert0 != 1 && cnt.tls) {
      cert = "tls-verification=false"
    }
    node = "http="+[ipt, uname, pwd, tls, cert, tag].filter(Boolean).join(", ")
    return node
}

// Clash socks5
function CS52QX(cnt){
    tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi," ")
    ipt = cnt.server+":"+cnt.port
    uname = cnt.username ? "username=" + cnt.username : ""
    pwd = cnt.password && typeof(cnt.password) == "string" ? "password=" + cnt.password : ""
    tls = cnt.tls ? "over-tls=true" : ""
    cert = cnt["skip-cert-verify"] && cnt.tls ? "tls-verification=false" : ""
    if (Pcert0 == 1 && cnt.tls) {
      cert = "tls-verification=true"
    } else if (Pcert0 != 1 && cnt.tls) {
      cert = "tls-verification=false"
    }
    node = "socks5="+[ipt, uname, pwd, tls, cert, tag].filter(Boolean).join(", ")
    return node
}

// clash vless type ,2026-01-07
function CVL2QX(cnt){
  tag = "tag="+cnt.name.replace(/\\U.+?\s{1}/gi," ").replace(/(\"|\')/gi,"")
  ipt = cnt.server+":"+cnt.port
  pwd = "password=" + cnt.uuid
  mtd = "method=none" //cnt.cipher
  udp = cnt.udp ? "udp-relay=true" : "udp-relay=false"
  tfo = cnt.tfo ? "fast-open=true" : "fast-open=false"
  obfs = ""
  if (cnt.network == "ws" && cnt.tls) {
    obfs = "obfs=wss"
  } else if (cnt.network == "ws"){
    obfs = "obfs=ws"
  } else if (cnt.tls){
    obfs = "obfs=over-tls"
  }
  vfl=cnt.flow? "vless-flow=xtls-rprx-vision":""
  const ppbk=getValue(()=>cnt["reality-opts"]["public-key"]) 
  const psid=getValue(()=>cnt["reality-opts"]["short-id"])
  pbk=ppbk? "reality-base64-pubkey="+ppbk : ""
  sid=typeof(psid)=='string'? "reality-hex-shortid="+psid : ""
  const phost = getValue(()=>cnt["ws-opts"]["headers"]["Host"]) 
  ohost = cnt["ws-headers"]? "obfs-host=" + cnt["ws-headers"]["Host"] : ""
  ohost = phost ? "obfs-host="+phost : ohost
  ohost = cnt["servername"]? "obfs-host=" + cnt["servername"] : ohost
  ohost=ohost.toLowerCase()

  const ppath = getValue(()=>cnt["ws-opts"]["path"]) 
  puri = ppath ? "obfs-uri="+ppath : ""

  cert = cnt["skip-cert-verify"] && cnt.tls ? "tls-verification=false" : ""
  if (Pcert0 == 1 && cnt.tls) {
    cert = "tls-verification=true"
  } else if (Pcert0 != 1 && cnt.tls) {
    cert = "tls-verification=false"
  }
  const pspt = getValue(()=>cnt["ws-opts"]["v2ray-http-upgrade"])
  if (pspt==true) {
    PNS = PNS +1
    NSList.push(numToEmoji10(PNS)+cnt)
    node=""
  } else {
    node = "vless="+[ipt, pwd, mtd, udp, tfo, obfs, ohost, puri, vfl, pbk, sid, cert, tag].filter(Boolean).join(", ")
  }
  return node
}

// UDP/TFO 参数 (强制 surge/quanx 类型转换)
function XUDP(cnt,pudp) {
  var udp = pudp != -1 && /^(shadowsocks|trojan|vmess|vless|anytls)/.test(cnt.trim()) ? "udp-relay=true, " : "udp-relay=false, "
  if(cnt.indexOf("udp-relay") != -1){
    var cnt0 = cnt.replace(RegExp("udp\-relay.*?\,", "gmi"), udp)
  }else{
    var cnt0 = cnt.replace(new RegExp("tag.*?\=", "gmi"), udp+"tag=")
  }
  return cnt0
}

function XTFO(cnt,ptfo) {
    var tfo = ptfo == 1? "fast-open=true, " : "fast-open=false, "
    if(cnt.indexOf("fast-open") != -1){
        var cnt0 = cnt.replace(RegExp("fast\-open.*?\,", "gmi"), tfo)
    }else{
        var cnt0 = cnt.replace(RegExp("tag.*?\=", "gmi"), tfo+"tag=")
    }
    return cnt0
}
//比较完美的一款 base64 encode/decode 工具
/*
 *  base64.js: https://github.com/dankogai/js-base64#readme
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
//base64 完毕
function Base64Code() {
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function (bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function (c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                    + fromCharCode(0x80 | (cc & 0x3f)))
                    : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                        + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + fromCharCode(0x80 | (cc & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                + fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function (u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function (ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16
                | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
                | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
            chars = [
                b64chars.charAt(ord >>> 18),
                b64chars.charAt((ord >>> 12) & 63),
                padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
            ];
        return chars.join('');
    };
    var btoa = function (b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    this.encode = function (u) {
        var isUint8Array = Object.prototype.toString.call(u) === '[object Uint8Array]';
        return isUint8Array ? u.toString('base64')
            : btoa(utob(String(u)));
    }
    // decoder stuff
    var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
    var cb_btou = function (cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3)),
                    offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    | (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6)
                    | (0x3f & cccc.charCodeAt(1))
                );
        }
    };
    var btou = function (b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function (cccc) {
        var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
                | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
                | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0)
                | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [
                fromCharCode(n >>> 16),
                fromCharCode((n >>> 8) & 0xff),
                fromCharCode(n & 0xff)
            ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var _atob = function (a) {
        return a.replace(/\S{1,4}/g, cb_decode);
    };
    var _decode = function (u) {
        return btou(_atob(u))
    }
    this.decode = function (a) {
        return _decode(
            String(a).replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        ).replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    };
}


/*
YAML parser for Javascript
Author: Diogo Costa

This program is released under the MIT License as follows:

Copyright (c) 2011 Diogo Costa (costa.h4evr@gmail.com)

*/

function YAML() {
        var errors = [],
                reference_blocks = [],
                processing_time = 0,
                regex =
                {
                        "regLevel" : new RegExp("^([\\s\\-]+)"),
                        "invalidLine" : new RegExp("^\\-\\-\\-|^\\.\\.\\.|^\\s*#.*|^\\s*$"),
                        "dashesString" : new RegExp("^\\s*\\\"([^\\\"]*)\\\"\\s*$"),
                        "quotesString" : new RegExp("^\\s*\\\'([^\\\']*)\\\'\\s*$"),
                        "float" : new RegExp("^[+-]?[0-9]+\\.[0-9]+(e[+-]?[0-9]+(\\.[0-9]+)?)?$"),
                        "integer" : new RegExp("^[+-]?[0-9]+$"),
                        "array" : new RegExp("\\[\\s*(.*)\\s*\\]"),
                        "map" : new RegExp("\\{\\s*(.*)\\s*\\}"),
                        "key_value" : new RegExp("([a-z0-9_-][ a-z0-9_-]*):( .+)", "i"),
                        "single_key_value" : new RegExp("^([a-z0-9_-][ a-z0-9_-]*):( .+?)$", "i"),
                        "key" : new RegExp("([a-z0-9_-][ a-z0-9_-]+):( .+)?", "i"),
                        "item" : new RegExp("^-\\s+"),
                        "trim" : new RegExp("^\\s+|\\s+$"),
                        "comment" : new RegExp("([^\\\'\\\"#]+([\\\'\\\"][^\\\'\\\"]*[\\\'\\\"])*)*(#.*)?")
                };
 
         /**
            * @class A block of lines of a given level.
            * @param {int} lvl The block's level.
            * @private
            */
        function Block(lvl) {
                return {
                        /* The block's parent */
                        parent: null,
                        /* Number of children */
                        length: 0,
                        /* Block's level */
                        level: lvl,
                        /* Lines of code to process */
                        lines: [],
                        /* Blocks with greater level */
                        children : [],
                        /* Add a block to the children collection */
                        addChild : function(obj) {
                                this.children.push(obj);
                                obj.parent = this;
                                ++this.length;
                        }
                };
        }

        // function to create an XMLHttpClient in a cross-browser manner


        function parser(str) {
                var regLevel = regex["regLevel"];
                var invalidLine = regex["invalidLine"];
                var lines = str.split("\n");
                var m;
                var level = 0, curLevel = 0;
                
                var blocks = [];
                
                var result = new Block(-1);
                var currentBlock = new Block(0);
                result.addChild(currentBlock);
                var levels = [];
                var line = "";
                
                blocks.push(currentBlock);
                levels.push(level);
                
                for(var i = 0, len = lines.length; i < len; ++i) {
                        line = lines[i];
                        
                        if(line.match(invalidLine)) {
                                continue;
                        }
                
                        if(m = regLevel.exec(line)) {
                                level = m[1].length;
                        } else
                                level = 0;
                        
                        if(level > curLevel) {
                                var oldBlock = currentBlock;
                                currentBlock = new Block(level);
                                oldBlock.addChild(currentBlock);
                                blocks.push(currentBlock);
                                levels.push(level);
                        } else if(level < curLevel) {                
                                var added = false;

                                var k = levels.length - 1;
                                for(; k >= 0; --k) {
                                        if(levels[k] == level) {
                                                currentBlock = new Block(level);
                                                blocks.push(currentBlock);
                                                levels.push(level);
                                                if(blocks[k].parent!= null)
                                                        blocks[k].parent.addChild(currentBlock);
                                                added = true;
                                                break;
                                        }
                                }
                                
                                if(!added) {
                                        errors.push("Error: Invalid indentation at line " + i + ": " + line);
                                        return;
                                }
                        }
                        
                        currentBlock.lines.push(line.replace(regex["trim"], ""));
                        curLevel = level;
                }
                
                return result;
        }
        
        function processValue(val) {
                val = val.replace(regex["trim"], "");
                var m = null;

                if(val == 'true') {
                        return true;
                } else if(val == 'false') {
                        return false;
                } else if(val == '.NaN') {
                        return Number.NaN;
                } else if(val == 'null') {
                        return null;
                } else if(val == '.inf') {
                        return Number.POSITIVE_INFINITY;
                } else if(val == '-.inf') {
                        return Number.NEGATIVE_INFINITY;
                } else if(m = val.match(regex["dashesString"])) {
                        return m[1];
                } else if(m = val.match(regex["quotesString"])) {
                        return m[1];
                } else if(m = val.match(regex["float"])) {
                        return parseFloat(m[0]);
                } else if(m = val.match(regex["integer"])) {
                        return parseInt(m[0]);
                } else if( !isNaN(m = Date.parse(val))) {
                        return new Date(m);
                } else if(m = val.match(regex["single_key_value"])) {
                        var res = {};
                        res[m[1]] = processValue(m[2]);
                        return res;
                } else if(m = val.match(regex["array"])){
                        var count = 0, c = ' ';
                        var res = [];
                        var content = "";
                        var str = false;
                        for(var j = 0, lenJ = m[1].length; j < lenJ; ++j) {
                                c = m[1][j];
                                if(c == '\'' || c == '"') {
                                        if(str === false) {
                                                str = c;
                                                content += c;
                                                continue;
                                        } else if((c == '\'' && str == '\'') || (c == '"' && str == '"')) {
                                                str = false;
                                                content += c;
                                                continue;
                                        }
                                } else if(str === false && (c == '[' || c == '{')) {
                                        ++count;
                                } else if(str === false && (c == ']' || c == '}')) {
                                        --count;
                                } else if(str === false && count == 0 && c == ',') {
                                        res.push(processValue(content));
                                        content = "";
                                        continue;
                                }
                                
                                content += c;
                        }
                        
                        if(content.length > 0)
                                res.push(processValue(content));
                        return res;
                } else if(m = val.match(regex["map"])){
                        var count = 0, c = ' ';
                        var res = [];
                        var content = "";
                        var str = false;
                        for(var j = 0, lenJ = m[1].length; j < lenJ; ++j) {
                                c = m[1][j];
                                if(c == '\'' || c == '"') {
                                        if(str === false) {
                                                str = c;
                                                content += c;
                                                continue;
                                        } else if((c == '\'' && str == '\'') || (c == '"' && str == '"')) {
                                                str = false;
                                                content += c;
                                                continue;
                                        }
                                } else if(str === false && (c == '[' || c == '{')) {
                                        ++count;
                                } else if(str === false && (c == ']' || c == '}')) {
                                        --count;
                                } else if(str === false && count == 0 && c == ',') {
                                        res.push(content);
                                        content = "";
                                        continue;
                                }
                                
                                content += c;
                        }
                        
                        if(content.length > 0)
                                res.push(content);
                                
                        var newRes = {};
                        for(var j = 0, lenJ = res.length; j < lenJ; ++j) {
                                if(m = res[j].match(regex["key_value"])) {
                                        newRes[m[1]] = processValue(m[2]);
                                }
                        }
                        
                        return newRes;
                } else 
                        return val;
        }
        
        function processFoldedBlock(block) {
                var lines = block.lines;
                var children = block.children;
                var str = lines.join(" ");
                var chunks = [str];
                for(var i = 0, len = children.length; i < len; ++i) {
                        chunks.push(processFoldedBlock(children[i]));
                }
                return chunks.join("\n");
        }
        
        function processLiteralBlock(block) {
                var lines = block.lines;
                var children = block.children;
                var str = lines.join("\n");
                for(var i = 0, len = children.length; i < len; ++i) {
                        str += processLiteralBlock(children[i]);
                }
                return str;
        }
        
        function processBlock(blocks) {
                var m = null;
                var res = {};
                var lines = null;
                var children = null;
                var currentObj = null;
                
                var level = -1;
                
                var processedBlocks = [];
                
                var isMap = true;
                
                for(var j = 0, lenJ = blocks.length; j < lenJ; ++j) {
                        
                        if(level != -1 && level != blocks[j].level)
                                continue;
                
                        processedBlocks.push(j);
                
                        level = blocks[j].level;
                        lines = blocks[j].lines;
                        children = blocks[j].children;
                        currentObj = null;
                
                        for(var i = 0, len = lines.length; i < len; ++i) {
                                var line = lines[i];

                                if(m = line.match(regex["key"])) {
                                        var key = m[1];
                                        
                                        if(key[0] == '-') {
                                                key = key.replace(regex["item"], "");
                                                if (isMap) { 
                                                        isMap = false;
                                                        if (typeof(res.length) === "undefined") {
                                                                res = [];
                                                        } 
                                                }
                                                if(currentObj != null) res.push(currentObj);
                                                currentObj = {};
                                                isMap = true;
                                        }
                                        
                                        if(typeof m[2] != "undefined") {
                                                var value = m[2].replace(regex["trim"], "");
                                                if(value[0] == '&') {
                                                        var nb = processBlock(children);
                                                        if(currentObj != null) currentObj[key] = nb;
                                                        else res[key] = nb;
                                                        reference_blocks[value.substr(1)] = nb;
                                                } else if(value[0] == '|') {
                                                        if(currentObj != null) currentObj[key] = processLiteralBlock(children.shift());
                                                        else res[key] = processLiteralBlock(children.shift());
                                                } else if(value[0] == '*') {
                                                        var v = value.substr(1);
                                                        var no = {};
                                                        
                                                        if(typeof reference_blocks[v] == "undefined") {
                                                                errors.push("Reference '" + v + "' not found!");
                                                        } else {
                                                                for(var k in reference_blocks[v]) {
                                                                        no[k] = reference_blocks[v][k];
                                                                }
                                                                
                                                                if(currentObj != null) currentObj[key] = no;
                                                                else res[key] = no;
                                                        }
                                                } else if(value[0] == '>') {
                                                        if(currentObj != null) currentObj[key] = processFoldedBlock(children.shift());
                                                        else res[key] = processFoldedBlock(children.shift());
                                                } else {
                                                        if(currentObj != null) currentObj[key] = processValue(value);
                                                        else res[key] = processValue(value);
                                                }
                                        } else {
                                                if(currentObj != null) currentObj[key] = processBlock(children);
                                                else res[key] = processBlock(children);                        
                                        }
                                } else if(line.match(/^-\s*$/)) {
                                        if (isMap) { 
                                                isMap = false;
                                                if (typeof(res.length) === "undefined") {
                                                        res = [];
                                                } 
                                        }
                                        if(currentObj != null) res.push(currentObj);
                                        currentObj = {};
                                        isMap = true;
                                        continue;
                                } else if(m = line.match(/^-\s*(.*)/)) {
                                        if(currentObj != null) 
                                                currentObj.push(processValue(m[1]));
                                        else {
                                                if (isMap) { 
                                                        isMap = false;
                                                        if (typeof(res.length) === "undefined") {
                                                                res = [];
                                                        } 
                                                }
                                                res.push(processValue(m[1]));
                                        }
                                        continue;
                                }
                        }
                        
                        if(currentObj != null) {
                                if (isMap) { 
                                        isMap = false;
                                        if (typeof(res.length) === "undefined") {
                                                res = [];
                                        } 
                                }
                                res.push(currentObj);
                        }
                }
                
                for(var j = processedBlocks.length - 1; j >= 0; --j) {
                        blocks.splice.call(blocks, processedBlocks[j], 1);
                }

                return res;
        }
                
        function semanticAnalysis(blocks) {
                var res = processBlock(blocks.children);
                return res;
        }
        
        function preProcess(src) {
                var m;
                var lines = src.split("\n");
                
                var r = regex["comment"];
                
                for(var i in lines) {
                        if(m = lines[i].match(r)) {
                                if(typeof m[3] !== "undefined") {
                                        lines[i] = m[0].substr(0, m[0].length - m[3].length);
                                }
                        }
                }
                
                return lines.join("\n");
        }
        
        this.parse = function eval0(str) {
                errors = [];
                reference_blocks = [];
                processing_time = (new Date()).getTime();
                var pre = preProcess(str)
                var doc = parser(pre);
                var res = semanticAnalysis(doc);
                processing_time = (new Date()).getTime() - processing_time;
                
                return res;
        }

};

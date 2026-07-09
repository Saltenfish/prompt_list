/* ============================================================
   🐟 魚魚客服引擎（fish-chat.js）
   純前端假客服，無任何連線。CSS 與 HTML 由本檔自動注入，
   index.html 只需在 </body> 前依序載入：
     <script src="js/fish-words.js"></script>
     <script src="js/fish-chat.js"></script>
   詞庫一律放在 fish-words.js，平常不需要改本檔。
   ─────────────────────────────────────────────
   互動機制：
   ・打字中「…」動畫、12% 已讀不回、訊息佇列依序回覆
   ・回頭客記憶（localStorage 記來訪次數，影響開場白）
   ・復讀機偵測（連傳同句 → 回敬；第三次 → 吐槽）
   ・純 emoji 偵測（只回 emoji）、？？？與哈哈哈專屬吐槽
   ・猜拳（互動按鈕）、擲骰 1–100
   ・反差安慰、占卜籤、爛笑話、碎念低機率亂入
   ・回覆後 3% 追加假系統公告（安慰與彩蛋後不追加）
   ・洗頻防護（8 秒 5 句）、滿 20 句真心話
   ・彩蛋 ×2：關鍵字／每句 2% 掉落／頭像連點 5 下
============================================================ */
(function(){
"use strict";
const W=window.FISH_WORDS;
if(!W){console.error("[魚魚客服] 找不到詞庫，請先載入 fish-words.js");return}

/* ---------- CSS 注入 ---------- */
const CSS=[
"#fishfab{position:fixed;left:20px;bottom:24px;z-index:44;width:52px;height:52px;border-radius:50%;border:none;background:var(--c2,#95b8d1);color:#fff;font-size:24px;cursor:pointer;box-shadow:0 6px 18px rgba(149,184,209,.5);display:flex;align-items:center;justify-content:center;transition:transform .15s}",
"#fishfab:hover{transform:scale(1.06) rotate(-8deg)}",
"#fishchat{position:fixed;left:16px;bottom:88px;z-index:46;width:min(340px,calc(100vw - 32px));height:min(480px,calc(100vh - 120px));background:var(--surface,#fff);border:1px solid var(--line,#E1E8E4);border-radius:16px;box-shadow:0 14px 44px rgba(62,74,94,.22);display:flex;flex-direction:column;overflow:hidden;opacity:0;pointer-events:none;transform:translateY(12px) scale(.98);transition:opacity .2s,transform .2s}",
"#fishchat.show{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}",
".fc-head{background:linear-gradient(135deg,var(--c1,#809bce),var(--c2,#95b8d1));color:#fff;padding:11px 14px;display:flex;align-items:center;gap:10px;flex:0 0 auto}",
".fc-ava{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;user-select:none;flex:0 0 auto}",
".fc-ht{flex:1;min-width:0}",
".fc-ht b{display:block;font-size:13.5px;letter-spacing:.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}",
".fc-ht span{font-size:10.5px;opacity:.85;display:flex;align-items:center;gap:4px}",
".fc-ht .fc-on{width:7px;height:7px;border-radius:50%;background:#9FE6B8;flex:0 0 auto}",
".fc-head button{background:none;border:none;color:rgba(255,255,255,.9);font-size:15px;cursor:pointer;padding:2px 6px}",
".fc-msgs{flex:1;overflow-y:auto;padding:12px;background:var(--bg,#F7F9F8);display:flex;flex-direction:column;gap:8px}",
".fc-row{display:flex}",
".fc-row.me{justify-content:flex-end}",
".fc-bub{max-width:82%;padding:8px 12px;border-radius:14px;font-size:12.8px;line-height:1.6;word-break:break-word;white-space:pre-wrap}",
".fc-row.bot .fc-bub{background:var(--surface,#fff);border:1px solid var(--line,#E1E8E4);border-bottom-left-radius:5px;color:var(--ink,#3E4A5E)}",
".fc-row.me .fc-bub{background:var(--c1,#809bce);color:#fff;border-bottom-right-radius:5px}",
".fc-bub a{color:var(--c1-deep,#5F7DB5);text-decoration:underline;text-underline-offset:2px;word-break:break-all}",
".fc-status{font-size:10px;color:var(--muted,#8A94A6);text-align:right;padding:0 4px}",
".fc-opts{display:flex;flex-direction:column;gap:6px;padding:0 4px}",
".fc-opts.row{flex-direction:row;flex-wrap:wrap}",
".fc-opt{border:1px solid var(--c2,#95b8d1);background:var(--surface,#fff);color:var(--c1-deep,#5F7DB5);border-radius:10px;padding:8px 12px;font-size:12.5px;cursor:pointer;text-align:left;transition:background .12s}",
".fc-opt:hover{background:var(--c4,#d6eadf)}",
".fc-typing{display:inline-flex;gap:4px;padding:11px 14px;align-items:center}",
".fc-typing i{width:6px;height:6px;border-radius:50%;background:var(--c2,#95b8d1);animation:fcdot 1.1s infinite ease-in-out}",
".fc-typing i:nth-child(2){animation-delay:.15s}",
".fc-typing i:nth-child(3){animation-delay:.3s}",
"@keyframes fcdot{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}",
".fc-input{display:flex;gap:8px;padding:10px;border-top:1px solid var(--line,#E1E8E4);background:var(--surface,#fff);flex:0 0 auto}",
".fc-input input{flex:1;border:1px solid var(--line,#E1E8E4);border-radius:999px;padding:8px 14px;font-size:12.8px;font-family:inherit;color:var(--ink,#3E4A5E);outline:none;background:var(--bg,#F7F9F8)}",
".fc-input input:focus{border-color:var(--c1,#809bce)}",
".fc-input button{border:none;background:var(--c1,#809bce);color:#fff;border-radius:50%;width:36px;height:36px;font-size:14px;cursor:pointer;flex:0 0 auto}",
".fc-input button:hover{background:var(--c1-deep,#5F7DB5)}",
"@media(max-width:760px){#fishfab{left:14px;bottom:20px;width:48px;height:48px}#fishchat{left:12px;bottom:76px}}"
].join("\n");
const styleEl=document.createElement("style");
styleEl.textContent=CSS;document.head.appendChild(styleEl);

/* ---------- HTML 注入 ---------- */
const root=document.createElement("div");
root.innerHTML=
'<button id="fishfab" title="您的專屬魚魚客服">🐟</button>'+
'<div id="fishchat">'+
' <div class="fc-head">'+
'  <div class="fc-ava" id="fcava">🐟</div>'+
'  <div class="fc-ht"><b id="fcname"></b><span><i class="fc-on"></i>'+W.MISC.SUBTITLE+'</span></div>'+
'  <button id="fcclose" title="收合">✕</button>'+
' </div>'+
' <div class="fc-msgs" id="fcmsgs"></div>'+
' <div class="fc-input">'+
'  <input id="fcin" type="text" maxlength="200" placeholder="輸入訊息…" autocomplete="off">'+
'  <button id="fcsend" title="送出">➤</button>'+
' </div>'+
'</div>';
while(root.firstChild)document.body.appendChild(root.firstChild);
document.getElementById("fcname").textContent=W.MISC.NAME_FULL;

/* ---------- 工具 ---------- */
const M=document.getElementById("fcmsgs");
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function rand(a){return a[Math.floor(Math.random()*a.length)]}
const recent=[];
function pick(pool){
  for(let i=0;i<12;i++){const s=rand(pool);if(!recent.includes(s)){recent.push(s);if(recent.length>12)recent.shift();return s}}
  return rand(pool);
}
function linkify(t,url){return t.replace(/\{LINK\}/g,'<a href="'+url+'" target="_blank" rel="noopener">'+url.replace(/^https?:\/\//,"").split("/")[0]+"</a>")}
function eggMsg(){return linkify(rand(W.EGGS),W.EGG_URL)}
function egg2Msg(){return linkify(rand(W.EGGS_DELULU),W.EGG2_URL)}
function scrollDown(){M.scrollTop=M.scrollHeight}
function addUser(t){
  const r=document.createElement("div");r.className="fc-row me";
  const b=document.createElement("div");b.className="fc-bub";b.textContent=t;
  r.appendChild(b);M.appendChild(r);scrollDown();
}
function addBot(html){
  const r=document.createElement("div");r.className="fc-row bot";
  const b=document.createElement("div");b.className="fc-bub";b.innerHTML=html;
  r.appendChild(b);M.appendChild(r);scrollDown();
}
function addStatus(t){
  const s=document.createElement("div");s.className="fc-status";s.textContent=t;
  M.appendChild(s);scrollDown();return s;
}
function typing(ms){
  return new Promise(res=>{
    const r=document.createElement("div");r.className="fc-row bot";
    r.innerHTML='<div class="fc-bub fc-typing"><i></i><i></i><i></i></div>';
    M.appendChild(r);scrollDown();
    setTimeout(()=>{r.remove();res()},ms);
  });
}
async function botSay(lines){
  const arr=Array.isArray(lines)?lines:[lines];
  for(const t of arr){
    await typing(500+Math.min(1400,t.length*28)+Math.random()*400);
    addBot(t);
  }
}
/* 泛用按鈕列；回傳使用者點到的 value */
function askButtons(items,rowMode){
  return new Promise(res=>{
    const wrap=document.createElement("div");
    wrap.className="fc-opts"+(rowMode?" row":"");
    items.forEach(it=>{
      const b=document.createElement("button");b.className="fc-opt";b.textContent=it.label;
      b.addEventListener("click",()=>{wrap.remove();res(it.value)});
      wrap.appendChild(b);
    });
    M.appendChild(wrap);scrollDown();
  });
}

/* ---------- 狀態 ---------- */
let openFlag=false,opened=false,processing=false;
let msgCount=0,milestone=false,avaClicks=0;
let eggShown=false,egg2Shown=false;
let prevMsg="",repeatCount=0;
const stamps=[],queue=[];

/* ---------- 偵測 ---------- */
function isEmojiOnly(t){
  const s=t.replace(/[\s\u200d\ufe0f]/g,"");
  if(!s)return false;
  let hasPic=false;
  for(const ch of s){
    if(/\p{Extended_Pictographic}/u.test(ch)){hasPic=true;continue}
    if(/\p{Emoji_Component}/u.test(ch))continue;
    return false;
  }
  return hasPic;
}
const reQmarks=/^[?？!！\s]{2,}$/;
const reLaugh=/(哈哈|笑死|xd|www|好好笑)/i;
const reComfort=/(好累|心累|難過|想哭|哭了|傷心|壓力好大|沮喪|低潮|好煩|崩潰|撐不住|emo)/i;

/* ---------- 小遊戲 ---------- */
async function playRPS(){
  await botSay(W.RPS.INTRO);
  while(true){
    const my=await askButtons([
      {label:"✊ 石頭",value:0},{label:"✌️ 剪刀",value:1},{label:"🖐 布",value:2},
      {label:"🏳️ 不玩了",value:-1}
    ],true);
    if(my===-1){await botSay(W.RPS.QUIT);return}
    const fish=Math.floor(Math.random()*3);
    const hand=["✊","✌️","🖐"][fish];
    /* 0石頭 1剪刀 2布：(my-fish+3)%3 → 0平 1魚勝(?) 驗證：my石0 fish剪1 →(0-1+3)%3=2 玩家勝 */
    const d=(my-fish+3)%3;
    let line;
    if(d===0)line=rand(W.RPS.TIE);
    else if(d===2)line=rand(W.RPS.LOSE);
    else line=rand(W.RPS.WIN);
    await botSay(["魚魚出："+hand,line]);
    if(d===0||/再來|再一局|三戰兩勝|不算/.test(line))continue;
    const again=await askButtons([{label:"🔁 再來一局",value:1},{label:"🏳️ 不玩了",value:0}],true);
    if(!again){await botSay(W.RPS.QUIT);return}
  }
}
async function rollDice(){
  const n=1+Math.floor(Math.random()*100);
  const tier=W.DICE.find(t=>n>=t.min)||W.DICE[W.DICE.length-1];
  await botSay(["🎲 骰子滾動中……","擲出 "+n+" 點！",tier.txt.replace(/\{n\}/g,n)]);
}

/* ---------- 回覆引擎 ---------- */
function keyRule(txt){
  for(const k of W.KEYS){
    if(new RegExp(k.re,"i").test(txt))return k;
  }
  return null;
}
async function respond(txt){
  /* ③ 復讀機 */
  if(txt===prevMsg){
    repeatCount++;
    if(repeatCount>=2){await botSay(W.MISC.REPEAT_BREAK);prevMsg=txt;return}
    await botSay(esc(txt));prevMsg=txt;return;
  }
  prevMsg=txt;repeatCount=0;

  /* ④ 純 emoji */
  if(isEmojiOnly(txt)){await botSay(pick(W.EMOJI));return}
  /* ⑤ 滿屏問號／笑聲 */
  if(reQmarks.test(txt)){await botSay(pick(W.QMARKS));return}
  /* 反差安慰（優先於嗆與笑聲，避免對難過的人開玩笑） */
  if(reComfort.test(txt)){await botSay(pick(W.COMFORT));return}
  if(reLaugh.test(txt)&&!/笑話/.test(txt)){await botSay(pick(W.LAUGH));return}

  /* 關鍵字規則 */
  const k=keyRule(txt);
  let reply=null,noSystem=false;
  if(k){
    if(k.type==="egg"){eggShown=true;reply=eggMsg();noSystem=true}
    else if(k.type==="egg2"){egg2Shown=true;reply=egg2Msg();noSystem=true}
    else if(k.type==="joke"){reply=pick(W.JOKES)}
    else if(k.type==="fortune"){reply=["🎋 搖籤筒中……（嘩啦嘩啦）",pick(W.FORTUNE)]}
    else if(k.type==="rps"){await playRPS();return}
    else if(k.type==="dice"){await rollDice();return}
    else reply=rand(k.r);
  }
  /* 彩蛋隨機掉落（各 2%，未觸發過才掉） */
  if(!reply&&!eggShown&&Math.random()<0.02){eggShown=true;reply=eggMsg();noSystem=true}
  if(!reply&&!egg2Shown&&Math.random()<0.02){egg2Shown=true;reply=egg2Msg();noSystem=true}
  /* 隨機池 */
  if(!reply){
    const roll=Math.random();
    const q=/[?？]/.test(txt)||txt.length>14;
    if(roll<0.08)reply=pick(W.MURMUR);
    else if(roll<0.09)reply=pick(W.JOKES);
    else if(q&&roll<0.45)reply=pick(W.REALISH);
    else if(roll<0.4)reply=pick(W.OFFTOPIC);
    else if(roll<0.7)reply=pick(W.SASSY);
    else reply=pick(W.CANNED);
  }
  /* 12% 已讀不回 */
  if(Math.random()<0.12){
    const s=addStatus("已讀");
    await new Promise(r=>setTimeout(r,3200+Math.random()*2000));
    s.remove();
    await botSay([rand(W.EXCUSE)].concat(reply));
  }else{
    await botSay(reply);
  }
  /* 假系統公告 3% */
  if(!noSystem&&Math.random()<0.03)await botSay(pick(W.SYSTEM));
}

/* ---------- 佇列 ---------- */
async function pump(){
  if(processing)return;processing=true;
  while(queue.length){
    const job=queue.shift();
    if(job.spam){await botSay(W.MISC.SPAM);continue}
    if(job.seq){await botSay(job.seq);continue}
    await respond(job.txt);
  }
  if(msgCount>=20&&!milestone){milestone=true;await botSay(W.MISC.MILESTONE)}
  processing=false;
  if(queue.length)pump();
}

/* ---------- 開場（② 回頭客記憶）---------- */
async function opening(){
  if(opened)return;opened=true;
  const visits=(parseInt(lsGet("pp_fish_visits"))||0)+1;
  lsSet("pp_fish_visits",visits);
  let greet;
  if(visits<=1)greet=W.GREET.FIRST;
  else if(visits===2)greet=W.GREET.SECOND;
  else if(visits<10)greet=W.GREET.REGULAR;
  else greet=W.GREET.VETERAN.map(s=>s.replace(/\{N\}/g,visits));
  await botSay(greet);
  const wrap=document.createElement("div");wrap.className="fc-opts";
  W.OPTS.forEach(o=>{
    const b=document.createElement("button");b.className="fc-opt";b.textContent=o.t;
    b.addEventListener("click",()=>{
      wrap.remove();addUser(o.t);msgCount++;
      queue.push({seq:o.seq});pump();
    });
    wrap.appendChild(b);
  });
  M.appendChild(wrap);scrollDown();
}

/* ---------- 事件 ---------- */
const panel=document.getElementById("fishchat");
document.getElementById("fishfab").addEventListener("click",()=>{
  openFlag=!openFlag;panel.classList.toggle("show",openFlag);
  if(openFlag){opening();document.getElementById("fcin").focus()}
});
document.getElementById("fcclose").addEventListener("click",()=>{openFlag=false;panel.classList.remove("show")});
function send(){
  const inp=document.getElementById("fcin");
  const t=inp.value.trim();if(!t)return;
  inp.value="";
  addUser(t);msgCount++;
  const now=Date.now();stamps.push(now);
  while(stamps.length&&now-stamps[0]>8000)stamps.shift();
  if(stamps.length>=5){stamps.length=0;queue.length=0;queue.push({spam:true})}
  else queue.push({txt:t});
  pump();
}
document.getElementById("fcsend").addEventListener("click",send);
document.getElementById("fcin").addEventListener("keydown",e=>{if(e.key==="Enter")send()});
/* 頭像連點 5 下 → 隨機一個彩蛋 */
document.getElementById("fcava").addEventListener("click",async()=>{
  avaClicks++;
  if(avaClicks===3){await botSay(W.MISC.POKE3)}
  else if(avaClicks>=5){
    avaClicks=0;
    const two=Math.random()<0.5;
    if(two){egg2Shown=true}else{eggShown=true}
    await botSay([W.MISC.POKE5[0],W.MISC.POKE5[1]+" "+(two?egg2Msg():eggMsg())]);
  }
});
/* 點名字切換全名／短名 */
document.getElementById("fcname").addEventListener("click",e=>{
  e.target.textContent=e.target.textContent===W.MISC.NAME_FULL?W.MISC.NAME_SHORT:W.MISC.NAME_FULL;
});
})();

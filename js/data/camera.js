/* ============================================================
   📚 Prompt 資料 — 鏡頭（鏡頭構圖）
   ✏️ 新增：複製一行照格式加進對應分類區塊（注意行尾逗號）
      {c:"分類代號", t:"代號 中文標題", k:"韓文標題(選填)", p:"english prompt", n:"備註(選填)"},
   代號規則：前綴＋流水號，全站不可重複；圖片檔名 = 代號（images/F4.png）
   本檔分類：camera=鏡頭構圖(前綴V)
============================================================ */
window.PROMPT_DATA.push(
/* ---- 鏡頭構圖（camera｜V1–V34，新增從 V35 續編）---- */
{c:"camera",t:"V1 全身",k:"전신샷",p:"full body"},
{c:"camera",t:"V2 七分身",k:"카우보이샷(7부)",p:"cowboy shot"},
{c:"camera",t:"V3 上半身",k:"상반신샷",p:"upper body"},
{c:"camera",t:"V4 臉部特寫",k:"얼굴 클로즈업",p:"portrait, close-up face"},
{c:"camera",t:"V5 大遠景人物點綴",k:"익스트림 롱샷",p:"wide shot, character small in vast scenery"},
{c:"camera",t:"V6 俯視",k:"부감(하이앵글)",p:"from above, bird's eye view"},
{c:"camera",t:"V7 仰視",k:"앙각(로우앵글)",p:"from below, low angle"},
{c:"camera",t:"V8 傾斜構圖",k:"더치앵글",p:"dutch angle, tilted frame"},
{c:"camera",t:"V9 置中對稱",k:"중앙 대칭구도",p:"centered composition, symmetrical framing"},
{c:"camera",t:"V10 純背影",k:"뒷모습샷",p:"from behind, back view"},
{c:"camera",t:"V11 正側面",k:"정측면샷",p:"profile view, side silhouette"},
{c:"camera",t:"V12 過肩視角",k:"오버숄더샷",p:"over-the-shoulder shot"},
{c:"camera",t:"V13 透視前縮伸手",k:"원근단축 손뻗기",p:"foreshortening, hand reaching toward camera"},
{c:"camera",t:"V14 魚眼",k:"어안렌즈",p:"fisheye lens effect, distorted wide angle"},
{c:"camera",t:"V15 前景虛化框景",k:"전경 아웃포커스 프레이밍",p:"depth of field, foreground blur framing"},
{c:"camera",t:"V16 物體透視仰視",k:"사물 너머 로우앵글",p:"from below, looking up, worm's eye view, dramatic perspective, dynamic low angle"},
{c:"camera",t:"V17 斜切電影感",k:"시네마틱 사선구도",p:"dutch angle, slightly tilted camera, cinematic framing, three-quarter view"},
{c:"camera",t:"V18 空俯大廣角",k:"항공부감 광각",p:"from above, top-down aerial view, bird's eye view, expansive overhead composition"},
{c:"camera",t:"V19 超近臉部特寫",k:"초근접 클로즈업",p:"extreme close-up, face focus, portrait, direct gaze, intense facial detail"},
{c:"camera",t:"V20 廣角橫構圖",k:"와이드 가로구도",p:"wide horizontal composition, panoramic view, lots of empty space, balanced composition, expansive scene"},
{c:"camera",t:"V21 第一人稱雙手",k:"1인칭 POV 손",p:"pov, first-person perspective, pov hands reaching into frame, immersive viewer viewpoint"},
{c:"camera",t:"V22 跨桌對坐視角",k:"테이블 맞은편 시점",p:"pov across table, seated opposite viewpoint, tabletop and cups in foreground, intimate conversation framing"},
{c:"camera",t:"V23 頭部出框",k:"머리 프레임아웃",p:"head out of frame, cropped above the mouth, anonymous cinematic framing, focus on posture and hands"},
{c:"camera",t:"V24 多重視角分格",k:"멀티뷰 설정샷",p:"multiple views, same character shown from several angles, reference sheet arrangement, turnaround layout",n:"適合設定圖/立繪三視圖"},
{c:"camera",t:"V25 眼部大特寫",k:"눈 익스트림 클로즈업",p:"extreme close-up on eyes, eyes focus, single strip of face in frame, intense cinematic eye detail"},
{c:"camera",t:"V26 顛倒構圖",k:"상하반전 구도",p:"upside-down composition, inverted camera frame, disorienting flipped perspective, surreal tension"},
{c:"camera",t:"V27 攻擊來襲視角",k:"공격 날아오는 시점",p:"incoming attack toward viewer, strike swinging at camera, dynamic threat perspective, flinch-inducing framing",n:"搭配 holding weapon 系標籤"},
{c:"camera",t:"V28 遞食視角",k:"음식 건네는 시점",p:"incoming food, hand offering a snack toward viewer, treat extended to camera, inviting warm gesture",n:"分支：incoming drink（遞飲料）｜incoming gift（遞禮物）"},
{c:"camera",t:"V29 分割雙畫面",k:"분할 화면",p:"split screen, two panels side by side, contrasting simultaneous scenes",n:"成功率偏低，建議搭配版面類加權"},
{c:"camera",t:"V30 窗外向內窺",k:"창밖에서 들여다보기",p:"from outside the window looking in, framed by window edges, glass reflection layer, voyeur-free cozy framing"},
{c:"camera",t:"V31 低水平線構圖",k:"낮은 수평선 구도",p:"low horizon line, vast sky dominating frame, subject anchored near the bottom edge"},
{c:"camera",t:"V32 動態戲劇鏡頭",k:"다이나믹 드라마틱 앵글",p:"dynamic angle, dramatic angle, sweeping motion composition, energetic cinematic tension"},
{c:"camera",t:"V33 大氣透視遠景",k:"대기원근 원경",p:"atmospheric perspective, distant layers fading into haze, depth built by air and mist, vast scale"},
{c:"camera",t:"V34 消點透視加魚眼",k:"소실점 어안 광각",p:"inside, one-point perspective, vanishing point, wide shot, fisheye, symmetry, straight-on, centered symmetrical framing, cinematic angle, vaporwave aesthetic",n:"消失點＋魚眼混用；負面詞建議：upside down, multiple views, wrong proportions"},
);

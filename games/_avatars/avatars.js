/* StreamStorm game avatars + 3D UI icons (ChatGPT art). Include on site and launcher, NOT deferred, right before </body>:
   <script src="games/_avatars/avatars.js"></script>  (launcher: ../games/_avatars/avatars.js)
   smooth v2 (2026-11-25): list + icon map are embedded (rebuild with design/smooth/make_avatars.py), so avatars and
   icons are in place before the first paint: no emoji→icon pop, no cover→avatar swap, no layout jump. */
(function(){
  var LIST=["balloon-race", "blade-arena", "boss-fight", "chat-football", "country-race", "duel-energy", "duel-fans", "duel-snow", "duel-space", "duel-summit", "duel-trade", "garden-defense", "gift-car", "girls-vs-boys", "help-or-hinder", "horse-race", "hot-bomb", "lava-rising", "paint-map", "throne", "tower", "tug-of-war", "zodiac-duel"], MAP={"⚡": "bolt", "💳": "card", "🎁": "gift", "❤": "heart", "⛶": "fullscreen", "💬": "chat", "🚀": "rocket", "🎨": "palette", "💎": "gem", "⚔": "swords", "🏆": "trophy", "🌍": "globe", "💾": "save", "📁": "folder", "🖼": "picture", "🔒": "lock", "➕": "plus", "👑": "crown", "🏁": "flag", "🔥": "fire", "✨": "sparkles", "🤝": "handshake", "📈": "chart", "🛡": "shield", "🔎": "search", "✅": "check", "🎬": "clapper", "🌈": "rainbow", "⚖": "scales", "📣": "megaphone", "🔑": "key", "⏳": "hourglass", "🔴": "dot-red", "🤖": "robot", "🟢": "dot-green", "🔄": "refresh", "❌": "cross", "👥": "people", "👇": "point-down", "🥇": "medal-gold", "🥈": "medal-silver", "🥉": "medal-bronze", "💰": "moneybag", "🪙": "coin", "⏱": "stopwatch", "⭐": "star", "😈": "devil", "💥": "boom", "😇": "angel", "⚽": "ball", "💪": "muscle", "❄": "snowflake", "👹": "ogre", "⚓": "anchor", "💣": "bomb", "🪚": "saw", "🌱": "sprout", "🪢": "rope", "🗼": "tower", "🌪": "tornado", "💚": "heart-green", "⛽": "fuel", "🧱": "bricks", "🌋": "volcano", "⛈": "storm", "💨": "wind", "🏇": "horse", "🎈": "balloon", "☠": "skull-bones", "💫": "dizzy", "⚠": "warning", "🏃": "runner", "🚗": "car", "🪽": "wing", "🪨": "rock", "🐉": "dragon", "🌿": "herb", "🔁": "repeat", "☄": "comet", "♈": "z-aries", "♉": "z-taurus", "♊": "z-gemini", "♋": "z-cancer", "♌": "z-leo", "♍": "z-virgo", "♎": "z-libra", "♏": "z-scorpio", "♐": "z-sagittarius", "♑": "z-capricorn", "♒": "z-aquarius", "♓": "z-pisces", "🏗": "crane", "🌕": "moon-full", "🎛": "knobs", "💗": "heart-pink", "💙": "heart-blue", "🔵": "dot-blue", "💀": "skull", "🗡": "dagger", "🚩": "flag-red", "🌨": "snowcloud", "🌙": "moon", "🎙": "mic", "📄": "page", "🧾": "receipt", "🎃": "pumpkin", "🛸": "ufo", "👾": "alien", "🪵": "log", "🐝": "bee", "🖤": "heart-black", "🧲": "magnet", "🏳": "flag-white", "🧭": "compass", "🟡": "dot-yellow", "🔢": "numbers", "🔋": "battery", "🥁": "drum", "🧊": "ice", "🛰": "satellite", "🔬": "microscope", "🎭": "masks", "🌳": "tree", "📜": "scroll", "🪲": "beetle", "⛏": "pickaxe", "🫧": "bubbles", "🕷": "spider", "🏡": "house", "🏚": "house-old", "🐏": "ram", "🦘": "kangaroo", "💧": "drop", "💤": "sleep", "🌸": "blossom", "🪑": "chair", "🏹": "bow", "😱": "scream"};
  var me=document.currentScript&&document.currentScript.src||'';
  var base=me?me.replace(/avatars\.js.*$/,''):'games/_avatars/';
  if(!document.getElementById('ss-avatars-css')){var st=document.createElement('style');st.id='ss-avatars-css';st.textContent='.thumb.ss-sq{aspect-ratio:1/1!important;height:auto!important;background:none!important;border-radius:22%!important;box-shadow:0 10px 30px rgba(124,58,237,.35)}.thumb.ss-sq::after,.thumb.ss-sq::before{display:none!important}.thumb.ss-sq img{width:100%;height:100%;object-fit:cover;display:block}.ss-ava-h{display:inline-block;width:1.2em;height:1.2em;border-radius:.28em;vertical-align:-.18em;margin-right:.35em;box-shadow:0 0 22px rgba(168,85,247,.5),0 0 0 1px rgba(255,255,255,.15)}.ico.ss-has-ava{background:none!important;overflow:hidden;padding:0}.ico.ss-has-ava img{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}img.ss-ic{width:1.2em;height:1.2em;vertical-align:-.25em;display:inline-block;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,.35));pointer-events:none}';document.head.appendChild(st);}
  var S={};LIST.forEach(function(n){S[n]=1});
  var src=function(n){return base+n+'.webp'};
  var fix=function(){
    document.querySelectorAll('.thumb img[src*="_covers/"]').forEach(function(im){
      var n=im.getAttribute('src').split('/').pop().replace(/\.\w+$/,'');if(!S[n])return;
      im.parentNode.classList.add('ss-sq');im.setAttribute('src',src(n));});
    document.querySelectorAll('section.view').forEach(function(sec){
      var f=sec.querySelector('iframe[src*="games/"]'),h=sec.querySelector('h1');if(!f||!h||h.querySelector('.ss-ava-h'))return;
      var m=f.getAttribute('src').match(/games\/([a-z0-9-]+)\//);if(!m||!S[m[1]])return;
      var a=document.createElement('img');a.className='ss-ava-h';a.src=src(m[1]);a.alt='';a.decoding='async';h.insertBefore(a,h.firstChild);});
    if(typeof GAMES!=='undefined'){var P={};GAMES.forEach(function(g){P[g.id]=g.path});
      document.querySelectorAll('button.game[data-id] .ico').forEach(function(s){
        if(s.classList.contains('ss-has-ava'))return;var n=P[s.closest('button').dataset.id];if(!S[n])return;
        s.classList.add('ss-has-ava');s.innerHTML='<img src="'+src(n)+'" alt="" decoding="async">';});}
  };
  /* icons */
  var keys=Object.keys(MAP).sort(function(a,b){return b.length-a.length});
  var esc=function(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')};
  var re=keys.length?new RegExp('('+keys.map(esc).join('|')+')️?','g'):null;
  var SEL='button,a,.tag,.chip,.badge,label,h1,h2,h3,h4,.btn,.pill,summary,.eyebrow,.plan li,.plan b';
  var skip=function(n){for(var e=n.parentNode;e&&e!==document.body;e=e.parentNode){var t=e.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='INPUT'||t==='SELECT'||t==='OPTION'||t==='IFRAME'||(e.classList&&(e.classList.contains('ss-no-ic')||e.classList.contains('thumb'))))return true;}return false};
  var ic=function(root){if(!re||!root.querySelectorAll&&!root.matches)return;
    var els=(root.matches&&root.matches(SEL))?[root]:[];els=els.concat([].slice.call(root.querySelectorAll?root.querySelectorAll(SEL):[]));
    els.forEach(function(el){
      var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),list=[],n;while(n=w.nextNode()){re.lastIndex=0;if(re.test(n.nodeValue)&&!skip(n))list.push(n);}
      list.forEach(function(t){re.lastIndex=0;var s=t.nodeValue,f=document.createDocumentFragment(),last=0,m;
        while(m=re.exec(s)){if(m.index>last)f.appendChild(document.createTextNode(s.slice(last,m.index)));var i=document.createElement('img');i.className='ss-ic';i.alt=m[1];i.decoding='async';i.src=base+'ui/'+MAP[m[1]]+'.webp';f.appendChild(i);last=m.index+m[0].length;}
        if(last<s.length)f.appendChild(document.createTextNode(s.slice(last)));t.parentNode.replaceChild(f,t);});
    });
  };
  var go=function(){fix();ic(document.body);
    var pend=[],tm=0;
    new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(x){
        if(x.nodeType===1){if(!(x.classList&&x.classList.contains('ss-ic')))pend.push(x)}else if(x.nodeType===3&&x.parentNode&&re&&(re.lastIndex=0,re.test(x.nodeValue)))pend.push(x.parentNode)})});
      if(pend.length){var p=pend.splice(0);p.forEach(function(x){if(x.isConnected)ic(x)})}
      if(!tm)tm=setTimeout(function(){tm=0;fix()},60)}).observe(document.body,{childList:true,subtree:true});
  };
  if(document.body)go();else document.addEventListener('DOMContentLoaded',go);
})();

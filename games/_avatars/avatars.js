/* StreamStorm game avatars (ChatGPT art). Include on site and launcher:
   <script src="games/_avatars/avatars.js" defer></script>  (launcher: ../games/_avatars/avatars.js)
   Avatars listed in list.json are applied automatically; games without one keep their emoji/cover. */
(function(){
  var me=document.currentScript&&document.currentScript.src||'';
  var base=me?me.replace(/avatars\.js.*$/,''):'games/_avatars/';
  var css='.thumb.ss-sq{aspect-ratio:1/1!important;height:auto!important;background:none!important;border-radius:22%!important;box-shadow:0 10px 30px rgba(124,58,237,.35)}.thumb.ss-sq::after,.thumb.ss-sq::before{display:none!important}.thumb.ss-sq img{width:100%;height:100%;object-fit:cover;display:block}'+
    '.ss-ava-h{display:inline-block;width:1.2em;height:1.2em;border-radius:.28em;vertical-align:-.18em;margin-right:.35em;box-shadow:0 0 22px rgba(168,85,247,.5),0 0 0 1px rgba(255,255,255,.15)}'+
    '.ico.ss-has-ava{background:none!important;overflow:hidden;padding:0}.ico.ss-has-ava img{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}';
  var ic=document.createElement('script');ic.src=base+'icons.js';ic.defer=true;document.head.appendChild(ic);
  var st=document.createElement('style');st.id='ss-avatars-css';st.textContent=css;document.head.appendChild(st);
  fetch(base+'list.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(list){
    var S={};list.forEach(function(n){S[n]=1});
    var src=function(n){return base+n+'.webp'};
    var fix=function(){
      document.querySelectorAll('.thumb img[src*="_covers/"]').forEach(function(im){
        var n=im.getAttribute('src').split('/').pop().replace(/\.\w+$/,'');if(!S[n])return;
        im.parentNode.classList.add('ss-sq');im.setAttribute('src',src(n));});
      document.querySelectorAll('section.view').forEach(function(sec){
        var f=sec.querySelector('iframe[src*="games/"]'),h=sec.querySelector('h1');if(!f||!h||h.querySelector('.ss-ava-h'))return;
        var m=f.getAttribute('src').match(/games\/([a-z0-9-]+)\//);if(!m||!S[m[1]])return;
        var a=document.createElement('img');a.className='ss-ava-h';a.src=src(m[1]);a.alt='';h.insertBefore(a,h.firstChild);});
      if(typeof GAMES!=='undefined'){var P={};GAMES.forEach(function(g){P[g.id]=g.path});
        document.querySelectorAll('button.game[data-id] .ico').forEach(function(s){
          if(s.classList.contains('ss-has-ava'))return;var n=P[s.closest('button').dataset.id];if(!S[n])return;
          s.classList.add('ss-has-ava');s.innerHTML='<img src="'+src(n)+'" alt="">';});}
    };
    fix();new MutationObserver(function(){clearTimeout(fix.t);fix.t=setTimeout(fix,60)}).observe(document.body,{childList:true,subtree:true});
  }).catch(function(){});
})();

/* StreamStorm UI icons (ChatGPT art): replaces selected emoji in buttons, links, tags and headings with 3D icons.
   Loaded by avatars.js. Icons live in games/_avatars/ui/<name>.webp, map in ui/map.json {"⚡":"bolt",...}. */
(function(base){
  fetch(base+'ui/map.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(M){
    var keys=Object.keys(M).sort(function(a,b){return b.length-a.length});if(!keys.length)return;
    var esc=function(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')};
    var re=new RegExp('('+keys.map(esc).join('|')+')️?','g');
    var st=document.createElement('style');st.textContent='img.ss-ic{width:1.2em;height:1.2em;vertical-align:-.25em;display:inline-block;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,.35));pointer-events:none}';document.head.appendChild(st);
    var SEL='button,a,.tag,.chip,.badge,label,h1,h2,h3,h4,.btn,.pill,summary,.eyebrow,.plan li,.plan b';
    var skip=function(n){for(var e=n.parentNode;e&&e!==document.body;e=e.parentNode){var t=e.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='INPUT'||t==='SELECT'||t==='OPTION'||t==='IFRAME'||(e.classList&&(e.classList.contains('ss-no-ic')||e.classList.contains('thumb'))))return true;}return false};
    var run=function(root){
      var els=(root.matches&&root.matches(SEL))?[root]:[];els=els.concat([].slice.call(root.querySelectorAll?root.querySelectorAll(SEL):[]));
      els.forEach(function(el){
        var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),list=[],n;while(n=w.nextNode()){re.lastIndex=0;if(re.test(n.nodeValue)&&!skip(n))list.push(n);}
        list.forEach(function(t){re.lastIndex=0;var s=t.nodeValue,f=document.createDocumentFragment(),last=0,m;
          while(m=re.exec(s)){if(m.index>last)f.appendChild(document.createTextNode(s.slice(last,m.index)));var i=document.createElement('img');i.className='ss-ic';i.alt=m[1];i.src=base+'ui/'+M[m[1]]+'.webp';f.appendChild(i);last=m.index+m[0].length;}
          if(last<s.length)f.appendChild(document.createTextNode(s.slice(last)));t.parentNode.replaceChild(f,t);});
      });
    };
    run(document.body);
    new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(x){if(x.nodeType===1)run(x);else if(x.nodeType===3&&x.parentNode)run(x.parentNode)})})}).observe(document.body,{childList:true,subtree:true,characterData:false});
  }).catch(function(){});
})((document.currentScript&&document.currentScript.src||'games/_avatars/').replace(/[^\/]*$/,''));

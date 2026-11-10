'use strict';
const cfg=window.BIRTHDAY;
const $=s=>document.querySelector(s);
$('#friend').textContent=cfg.name;$('#subtitle').textContent=cfg.subtitle;$('#from').textContent=cfg.sender;
const dialog=$('#giftDialog'),content=$('#giftContent'),audio=$('#audio');
let currentPhoto=0,openedBy=null,musicPlaying=false,audioCtx=null,melodyTimer=null,localMusic=null;
if(cfg.music)audio.src=cfg.music;
function element(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function heading(tag,title){dialog.querySelector('.party-layer')?.remove();content.replaceChildren(element('div',tag,'modal-tag'),element('h2',title,'modal-title'));dialog.scrollTop=0;}
function button(text,fn,cls='primary'){const b=element('button',text,cls);b.type='button';b.addEventListener('click',fn);return b;}
function burst(petals=false){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const host=dialog.open?dialog:document.body;
 host.querySelector('.party-layer')?.remove();
 const layer=element('div',undefined,'party-layer');layer.setAttribute('aria-hidden','true');host.append(layer);
 for(let i=0;i<70;i++){const c=element('i',undefined,petals?'party-piece petal-piece':'party-piece');c.style.left=Math.random()*100+'%';c.style.background=(petals?['#d8789c','#e7a9b9','#f6c9c9']:['#d3a34e','#bb5577','#e9b787','#a1bda1'])[i%4];c.style.animationDelay=Math.random()*.65+'s';c.style.setProperty('--drift',(Math.random()-.5)*190+'px');layer.append(c);}
 setTimeout(()=>layer.remove(),4800);
}
function animateOnce(node,name){node.classList.remove(name);void node.offsetWidth;node.classList.add(name);}
function openGift(type){
 if(type==='letter'){
 heading('A NOTE FOR YOU','Gửi cậu, người bạn đáng quý.');const letter=element('article',undefined,'letter');cfg.letter.forEach(t=>letter.append(element('p',t)));letter.append(element('div',cfg.sender,'signature'));content.append(letter);
 }else if(type==='flowers'){
 heading('A LITTLE SUNSHINE','Một bó vui vẻ gửi cậu.');
 const flowers=button('',receiveFlowers,'flower-scene interactive-art');flowers.setAttribute('aria-label','Chạm để hoa nở');flowers.innerHTML=window.BIRTHDAY_ART.bouquet;
 const hint=element('p','Chạm vào bó hoa hoặc bấm nút bên dưới nhé.','interaction-hint');
 const result=element('p','Tặng Kim Loan một bó hoa và thật nhiều niềm vui!','flower-copy gift-result');result.setAttribute('role','status');
 const tags=element('div',undefined,'wish-tags');['Nhiều niềm vui','Luôn bình an','Đủ tự tin','Thật nhiều may mắn'].forEach(t=>tags.append(element('span',t)));
 const actions=element('div',undefined,'modal-actions');let count=0;
 const receive=button('Nhận hoa và mở lời chúc ✧',receiveFlowers);actions.append(receive);
 function receiveFlowers(){const wishes=['Hoa đã đến tay Kim Loan rồi! Chúc cậu luôn rạng rỡ như hôm nay.','Gửi thêm một chút may mắn. Mong những điều cậu ấp ủ đều thành công!','Một bó bình an dành cho cậu. Tuổi mới hãy cười thật nhiều nhé!','Chúc cậu có những ngày thật vui và những người bạn thật tốt bên cạnh.'];result.textContent=wishes[count++%wishes.length];receive.textContent='Nhận thêm một lời chúc ✧';animateOnce(flowers,'blooming');animateOnce(result,'result-pop');tags.classList.add('received');burst(true);}
 content.append(flowers,hint,result,tags,actions);
 }else if(type==='cake'){
 heading('MAKE A WISH','Một tuổi mới. Ngàn điều vui.');
 const scene=button('',toggleCandles,'cake-scene interactive-art');scene.setAttribute('aria-label','Chạm vào bánh để thổi nến');scene.innerHTML=window.BIRTHDAY_ART.cake;
 const smoke=element('div',undefined,'smoke-trails');smoke.setAttribute('aria-hidden','true');for(let i=0;i<3;i++)smoke.append(element('i'));scene.append(smoke);
 const hint=element('p','Ước một điều, rồi chạm bánh hoặc bấm nút để thổi nến.','interaction-hint');
 const result=element('p','Nhắm mắt lại và nghĩ về một điều cậu mong nhé.','wish-result gift-result');result.setAttribute('role','status');
 const actions=element('div',undefined,'modal-actions');let off=false;
 const blow=button('Ước xong rồi, thổi nến thôi! ✨',toggleCandles);actions.append(blow);
 function toggleCandles(){off=!off;scene.classList.toggle('blown',off);scene.setAttribute('aria-label',off?'Chạm để thắp lại nến':'Chạm vào bánh để thổi nến');result.textContent=off?'Sinh nhật vui vẻ, Kim Loan! Chúc điều ước của cậu sớm thành hiện thực! 🎉':'Nến sáng rồi! Cậu có thể ước thêm một điều nữa.';blow.textContent=off?'Thắp nến, ước thêm lần nữa':'Thổi nến ✨';animateOnce(result,'result-pop');if(off){animateOnce(smoke,'smoking');burst();}else smoke.classList.remove('smoking');}
 content.append(scene,hint,result,actions);
 }else if(type==='album'){showAlbum();}
 if(!dialog.open)dialog.showModal();animateOnce(content,'gift-enter');
}
function showAlbum(){heading('THE BIRTHDAY ARCHIVE','Những khoảnh khắc rất cậu.');const grid=element('div',undefined,'album-grid');cfg.photos.forEach((p,i)=>{const b=button('',()=>showPhoto(i),'album-item');const im=element('img');im.src=p.src;im.alt=p.caption;im.loading='lazy';b.append(im,element('span',p.caption));grid.append(b);});content.append(grid);}
function showPhoto(i){currentPhoto=(i+cfg.photos.length)%cfg.photos.length;const p=cfg.photos[currentPhoto];heading(`KHOẢNH KHẮC ${currentPhoto+1} / ${cfg.photos.length}`,p.caption);const view=element('div',undefined,'photo-view'),im=element('img');im.src=p.src;im.alt=p.caption;view.append(im);const controls=element('div',undefined,'photo-controls');controls.append(button('← Ảnh trước',()=>showPhoto(currentPhoto-1),''),button('Xem cả album',showAlbum,''),button('Ảnh tiếp →',()=>showPhoto(currentPhoto+1),''));content.append(view,controls);}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{openedBy=b;openGift(b.dataset.open);}));
$('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{dialog.querySelector('.party-layer')?.remove();openedBy?.focus();});
// Nhạc không phụ thuộc Internet: một giai điệu chúc mừng bằng Web Audio.
const melody=[[67,.35],[67,.15],[69,.5],[67,.5],[72,.5],[71,1],[67,.35],[67,.15],[69,.5],[67,.5],[74,.5],[72,1],[67,.35],[67,.15],[79,.5],[76,.5],[72,.5],[71,.5],[69,.8],[77,.35],[77,.15],[76,.5],[72,.5],[74,.5],[72,1.4]];
function playMelody(){if(!musicPlaying||!audioCtx)return;let t=audioCtx.currentTime+.1;for(const [note,d]of melody){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=440*Math.pow(2,(note-69)/12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.085,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d*.95);o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+d);t+=d;}melodyTimer=setTimeout(playMelody,(t-audioCtx.currentTime+1)*1000);}
function musicLabel(){ $('#music span').textContent=musicPlaying?'Tắt nhạc':'Bật nhạc';$('#music').setAttribute('aria-label',musicPlaying?'Tắt nhạc':'Bật nhạc');$('#music').setAttribute('aria-pressed',String(musicPlaying));}
async function stopMusic(){musicPlaying=false;clearTimeout(melodyTimer);audio.pause();if(audioCtx){await audioCtx.close();audioCtx=null;}musicLabel();}
async function startMusic(){try{if(audio.getAttribute('src')){await audio.play();musicPlaying=true;}else{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();await audioCtx.resume();musicPlaying=true;playMelody();}musicLabel();}catch(e){musicPlaying=false;musicLabel();$('#soundStatus').textContent='Không phát được nhạc. Bạn thử bấm Bật nhạc lại nhé.';}}
$('#music').addEventListener('click',()=>musicPlaying?stopMusic():startMusic());

// =====================================================
// ✏️ EDIT HERE — CHANGE ONLY THESE VALUES
// =====================================================
const CONFIG = {
  password: "ujuu",
  name: "Ujuu",
  intro: "A surprise for",
  letter: `You are one of those rare people who make ordinary moments feel special.
May every smile, every dream and every new chapter bring you happiness.
Today is all about celebrating YOU. Happy Birthday! ❤️`,
  ending: "Happy Birthday",
  memories: [
    { image: "photos/photo1.jpg", caption: "A beautiful memory" },
    { image: "photos/photo2.jpg", caption: "One moment, forever remembered" },
    { image: "photos/photo3.jpg", caption: "A little piece of happiness" }
  ]
};

// Basic text
document.getElementById("heroName").textContent = CONFIG.name;
document.getElementById("letterName").textContent = CONFIG.name;
document.getElementById("letterText").textContent = CONFIG.letter;
document.getElementById("finalName").textContent = CONFIG.name;

// Opening -> vault
document.getElementById("beginBtn").addEventListener("click",()=>{
  document.getElementById("opening").classList.add("hidden");
  document.getElementById("vault").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});

// Password
function unlock(){
  const value=document.getElementById("password").value;
  const error=document.getElementById("error");
  if(value===CONFIG.password){
    error.textContent="";
    document.getElementById("vault").classList.add("hidden");
    document.getElementById("reveal").classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  }else{
    error.textContent="That isn't the secret password ✦";
    document.getElementById("password").animate(
      [{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],350
    );
  }
}
document.getElementById("unlockBtn").addEventListener("click",unlock);
document.getElementById("password").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});

// Continue buttons
document.querySelectorAll(".scroll-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.getElementById(btn.dataset.target).scrollIntoView({behavior:"smooth"});
  });
});

// Envelope
document.getElementById("envelope").addEventListener("click",()=>{
  document.getElementById("envelope").classList.toggle("open");
});

// Gallery
let current=0;
const card=document.getElementById("memoryCard");
const img=document.getElementById("memoryImage");
const fallback=document.getElementById("photoFallback");
const caption=document.getElementById("memoryCaption");
const number=document.getElementById("memoryNo");
const dots=document.getElementById("memoryDots");

CONFIG.memories.forEach((_,i)=>{
  const d=document.createElement("span");
  if(i===0)d.classList.add("active");
  d.addEventListener("click",()=>showMemory(i));
  dots.appendChild(d);
});

function showMemory(index){
  current=(index+CONFIG.memories.length)%CONFIG.memories.length;
  const item=CONFIG.memories[current];
  img.style.display="block";
  fallback.style.display="none";
  img.src=item.image;
  img.onerror=()=>{img.style.display="none";fallback.style.display="flex"};
  caption.textContent=item.caption;
  number.textContent=String(current+1).padStart(2,"0");
  [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===current));
  card.animate(
    [{opacity:.35,transform:"rotate(1deg) scale(.97)"},{opacity:1,transform:"rotate(-1deg) scale(1)"}],
    {duration:550,easing:"ease-out"}
  );
}
document.getElementById("prev").addEventListener("click",()=>showMemory(current-1));
document.getElementById("next").addEventListener("click",()=>showMemory(current+1));
setInterval(()=>showMemory(current+1),5000);

let touchX=0;
card.addEventListener("touchstart",e=>touchX=e.changedTouches[0].screenX);
card.addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].screenX-touchX;
  if(Math.abs(dx)>50)showMemory(current+(dx<0?1:-1));
});
showMemory(0);

// Gift
document.getElementById("gift").addEventListener("click",()=>{
  document.getElementById("gift").classList.toggle("open");
  if(document.getElementById("gift").classList.contains("open")){
    setTimeout(()=>document.getElementById("final").scrollIntoView({behavior:"smooth"}),1800);
  }
});

// Particle canvas
const pc=document.getElementById("particles"),ctx=pc.getContext("2d");
let p=[];
function resize(){pc.width=innerWidth;pc.height=innerHeight}
resize();addEventListener("resize",resize);
for(let i=0;i<120;i++)p.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.2,s:Math.random()*.3+.05});
function particles(){
  ctx.clearRect(0,0,pc.width,pc.height);
  p.forEach(a=>{
    a.y+=a.s;if(a.y>innerHeight)a.y=0;
    ctx.fillStyle=`rgba(239,207,130,${.1+Math.random()*.5})`;
    ctx.fillRect(a.x,a.y,a.r,a.r);
  });
  requestAnimationFrame(particles);
}
particles();

// Fireworks
const fw=document.getElementById("fireworks"),fctx=fw.getContext("2d");
let sparks=[];
function resizeFW(){fw.width=innerWidth;fw.height=innerHeight}
resizeFW();addEventListener("resize",resizeFW);
function burst(x,y){
  for(let i=0;i<85;i++){
    const a=Math.random()*Math.PI*2,v=Math.random()*5+2;
    sparks.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,size:Math.random()*2+1,h:Math.random()*45+25});
  }
}
function fireworks(){
  fctx.fillStyle="rgba(3,2,5,.18)";fctx.fillRect(0,0,fw.width,fw.height);
  sparks=sparks.filter(s=>s.life>0);
  sparks.forEach(s=>{
    s.x+=s.vx;s.y+=s.vy;s.vy+=.035;s.life-=.012;
    fctx.fillStyle=`hsla(${s.h},85%,70%,${s.life})`;
    fctx.fillRect(s.x,s.y,s.size,s.size);
  });
  requestAnimationFrame(fireworks);
}
setInterval(()=>burst(Math.random()*fw.width,Math.random()*fw.height*.65),900);
fireworks();

// ✏️ EASY EDIT AREA
const CONFIG={
  name:"Ujuu",
  date:"08.08.2026",
  letter:`Some people make ordinary days feel a little more beautiful.

I hope this new chapter brings you calm mornings, brave dreams, genuine laughter and memories you will always want to keep.

Today is simply a reminder that you are special, appreciated and deeply worth celebrating.

Happy Birthday. ❤️`,
  photos:[
    {src:"photos/photo1.jpg",label:"01 / 03"},
    {src:"photos/photo2.jpg",label:"02 / 03"},
    {src:"photos/photo3.jpg",label:"03 / 03"}
  ]
};

document.getElementById("name").textContent=CONFIG.name;
document.querySelector(".nav-right span").textContent=CONFIG.date;

const typed=document.getElementById("typed");
let ti=0;
function typeLetter(){
  if(ti<CONFIG.letter.length){
    typed.textContent+=CONFIG.letter[ti++];
    setTimeout(typeLetter,28);
  }
}
const io=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){typeLetter();io.disconnect();}
},{threshold:.35});
io.observe(document.getElementById("letter"));

const cards=[...document.querySelectorAll(".photo-card")];
let current=0;
function show(i){
  current=(i+cards.length)%cards.length;
  cards.forEach((c,n)=>c.classList.toggle("active",n===current));
  const img=cards[current].querySelector("img");
  img.src=CONFIG.photos[current].src;
  cards[current].querySelector("span").textContent=CONFIG.photos[current].label;
}
document.getElementById("next").onclick=()=>show(current+1);
document.getElementById("prev").onclick=()=>show(current-1);
setInterval(()=>show(current+1),5500);

let startX=0;
document.querySelector(".gallery").addEventListener("touchstart",e=>startX=e.changedTouches[0].screenX);
document.querySelector(".gallery").addEventListener("touchend",e=>{
  const d=e.changedTouches[0].screenX-startX;
  if(Math.abs(d)>50)show(current+(d<0?1:-1));
});

document.getElementById("gift").addEventListener("click",()=>{
  const gift=document.getElementById("gift");
  gift.classList.toggle("open");
  if(gift.classList.contains("open")){
    setTimeout(()=>document.getElementById("ending").scrollIntoView({behavior:"smooth"}),1500);
  }
});

// Subtle mouse light
const glow=document.querySelector(".cursor-glow");
addEventListener("mousemove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

// Elegant fireworks on final section
const canvas=document.getElementById("fireworks"),ctx=canvas.getContext("2d");
let particles=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();addEventListener("resize",resize);
function burst(x,y){
  for(let i=0;i<65;i++){
    const a=Math.random()*Math.PI*2,v=1.5+Math.random()*4;
    particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1});
  }
}
function animate(){
  ctx.fillStyle="rgba(23,32,25,.15)";ctx.fillRect(0,0,canvas.width,canvas.height);
  particles=particles.filter(p=>p.life>0);
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.life-=.012;
    ctx.fillStyle=`rgba(221,190,113,${p.life})`;ctx.fillRect(p.x,p.y,2,2);
  });
  requestAnimationFrame(animate);
}
setInterval(()=>burst(Math.random()*canvas.width,Math.random()*canvas.height*.65),1200);
animate();

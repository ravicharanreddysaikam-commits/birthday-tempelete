// ==========================================
// ✏️ EDIT ONLY THIS SECTION
// ==========================================
const CONFIG = {
  password: "ujuu",
  name: "Ujuu",
  intro: "A Surprise For Ujuu ✨💫",
  letter: `You are one of those rare people who make ordinary moments feel special.
May this new chapter bring you endless smiles, beautiful memories and everything your heart wishes for. Happy Birthday! ❤️`,
  ending: "Happy Birthday"
};

// ---------- Password ----------
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const error = document.getElementById("error");
unlockBtn.addEventListener("click", unlock);
passwordInput.addEventListener("keydown", e => { if(e.key === "Enter") unlock(); });

function unlock(){
  if(passwordInput.value === CONFIG.password){
    document.getElementById("lock").classList.add("unlock");
    setTimeout(() => document.getElementById("lock").style.display="none", 850);
    startIntro();
  }else{
    error.textContent = "Wrong password — try again ✨";
    passwordInput.animate(
      [{transform:"translateX(-7px)"},{transform:"translateX(7px)"},{transform:"translateX(0)"}],
      300
    );
  }
}

// ---------- Intro countdown ----------
document.getElementById("introTitle").textContent = CONFIG.intro;
document.getElementById("letterName").textContent = CONFIG.name;
document.getElementById("letterText").textContent = CONFIG.letter;
document.getElementById("endingTitle").innerHTML = `${CONFIG.ending}<br>${CONFIG.name} ❤️`;

function startIntro(){
  let n=3;
  const el=document.getElementById("count");
  const timer=setInterval(()=>{
    n--; el.textContent=n;
    if(n<=0){
      clearInterval(timer);
      el.textContent="✨";
      document.getElementById("intro").scrollIntoView({behavior:"smooth"});
    }
  },900);
}

// ---------- Sakura + floating hearts ----------
setInterval(()=>{
  const p=document.createElement("div");
  p.className="petal";
  p.textContent=Math.random()>.5 ? "🌸" : "🌺";
  p.style.left=Math.random()*100+"vw";
  p.style.setProperty("--x",(Math.random()*240-120)+"px");
  p.style.animationDuration=(6+Math.random()*6)+"s";
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),13000);
},500);

setInterval(()=>{
  const h=document.createElement("div");
  h.className="heart";
  h.textContent=Math.random()>.5 ? "❤️" : "💗";
  h.style.left=Math.random()*100+"vw";
  h.style.setProperty("--x",(Math.random()*200-100)+"px");
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),5500);
},1200);

// ---------- Envelope ----------
document.getElementById("envelope").addEventListener("click",()=>{
  document.getElementById("envelope").classList.toggle("open");
});

// ---------- Typing letter ----------
let i=0;
function typeLetter(){
  if(i<CONFIG.letter.length){
    document.getElementById("typed").textContent += CONFIG.letter[i++];
    setTimeout(typeLetter,42);
  }
}
setTimeout(typeLetter,1200);

// ---------- Gallery ----------
const slides=[...document.querySelectorAll(".slide")];
const dots=document.getElementById("dots");
let current=0;

slides.forEach((_,i)=>{
  const d=document.createElement("span");
  d.className="dot"+(i===0?" active":"");
  d.addEventListener("click",()=>showSlide(i));
  dots.appendChild(d);
});

function showSlide(i){
  slides[current].classList.remove("active");
  dots.children[current].classList.remove("active");
  current=(i+slides.length)%slides.length;
  slides[current].classList.add("active");
  dots.children[current].classList.add("active");
}
setInterval(()=>showSlide(current+1),4000);

// Touch/swipe
let touchStartX=0;
document.querySelector(".slider").addEventListener("touchstart",e=>touchStartX=e.changedTouches[0].screenX);
document.querySelector(".slider").addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].screenX-touchStartX;
  if(Math.abs(dx)>50) showSlide(current+(dx<0?1:-1));
});

// ---------- Gift ----------
document.getElementById("gift").addEventListener("click",()=>{
  document.getElementById("gift").classList.toggle("open");
});

// ---------- Moving stars ----------
const starCanvas=document.getElementById("stars");
const sc=starCanvas.getContext("2d");
let stars=[];

function resizeStars(){
  starCanvas.width=innerWidth;
  starCanvas.height=innerHeight;
  stars=Array.from({length:180},()=>({
    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight,
    r:Math.random()*1.7+.2,
    s:Math.random()*.25+.05
  }));
}
function drawStars(){
  sc.clearRect(0,0,innerWidth,innerHeight);
  stars.forEach(s=>{
    s.y+=s.s;
    if(s.y>innerHeight)s.y=0;
    sc.beginPath();
    sc.arc(s.x,s.y,s.r,0,Math.PI*2);
    sc.fillStyle=`rgba(255,255,255,${.25+Math.random()*.7})`;
    sc.fill();
  });
  requestAnimationFrame(drawStars);
}
addEventListener("resize",resizeStars);
resizeStars();
drawStars();

// ---------- Real canvas fireworks ----------
const fc=document.getElementById("fireworks");
const fx=fc.getContext("2d");
let particles=[];

function resizeFx(){
  fc.width=innerWidth;
  fc.height=innerHeight;
}
function burst(x,y){
  for(let i=0;i<75;i++){
    const a=Math.random()*Math.PI*2;
    const v=Math.random()*5+2;
    particles.push({
      x,y,
      vx:Math.cos(a)*v,
      vy:Math.sin(a)*v,
      life:1,
      size:Math.random()*2+1
    });
  }
}
function drawFx(){
  fx.fillStyle="rgba(0,0,0,.18)";
  fx.fillRect(0,0,fc.width,fc.height);
  particles=particles.filter(p=>p.life>0);
  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.vy+=.035;
    p.life-=.014;
    fx.fillStyle=`hsla(${Math.random()*360},100%,75%,${p.life})`;
    fx.fillRect(p.x,p.y,p.size,p.size);
  });
  requestAnimationFrame(drawFx);
}
resizeFx();
addEventListener("resize",resizeFx);
setInterval(()=>burst(Math.random()*fc.width,Math.random()*fc.height*.65),850);
drawFx();

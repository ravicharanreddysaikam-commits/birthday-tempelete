// ============================================
// ✏️ EDIT ONLY THIS AREA
// ============================================
const CONFIG = {
  name: "Ujuu",
  letter: `Some people make ordinary days feel a little more beautiful.

I wanted to give you a small moment that feels like it came from another time — a folded letter, a few roses, a birthday wish, and memories worth keeping.

May you always have reasons to smile, dreams worth chasing, and people around you who make life feel special.

Happy Birthday, Ujuu. ❤️`,
  photos: [
    "images/photo1.jpg","images/photo2.jpg","images/photo3.jpg",
    "images/photo4.jpg","images/photo5.jpg","images/photo6.jpg",
    "images/photo7.jpg","images/photo8.jpg","images/photo9.jpg",
    "images/photo10.jpg"
  ]
};

document.querySelector(".letter-to").textContent=`Dear ${CONFIG.name},`;
document.getElementById("letterText").textContent=CONFIG.letter;

// Intro -> reveal
setTimeout(()=>{
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("reveal").classList.remove("hidden");
},3500);

// Reveal -> experience
document.getElementById("revealBtn").addEventListener("click",()=>{
  document.getElementById("reveal").classList.add("hidden");
  document.getElementById("experience").classList.remove("hidden");
  document.getElementById("scroll").scrollIntoView({behavior:"smooth"});
});

// Old royal scroll opening
document.getElementById("openScroll").addEventListener("click",()=>{
  const scroll=document.getElementById("scroll");
  scroll.classList.toggle("open");
  const btn=document.getElementById("openScroll");
  btn.textContent=scroll.classList.contains("open")?"LETTER OPENED ✦":"UNROLL THE LETTER";
});

// Roses: bouquet + arm/hand comes forward as if offering it
document.getElementById("giveRoses").addEventListener("click",()=>{
  const stage=document.getElementById("roseStage");
  stage.classList.add("present");
  document.getElementById("roseMessage").textContent="For you. Just for you. 🌹";
  document.getElementById("giveRoses").textContent="ROSES, WITH LOVE ✦";
});

// Cake
document.getElementById("cutCake").addEventListener("click",()=>{
  const cake=document.getElementById("cake");
  cake.classList.add("cut");
  document.getElementById("cakeMessage").textContent="Wish made. ✨ Happy Birthday!";
  const music=document.getElementById("birthdayMusic");
  music.currentTime=0;
  music.play().catch(()=>{});
  setTimeout(()=>{
    document.getElementById("birthday").classList.remove("hidden");
    document.getElementById("birthday").scrollIntoView({behavior:"smooth"});
    makeConfetti();
  },1000);
});

function makeConfetti(){
  for(let i=0;i<90;i++){
    const c=document.createElement("span");
    c.textContent=["✦","•","♥","✧"][Math.floor(Math.random()*4)];
    c.style.position="fixed";
    c.style.left=Math.random()*100+"vw";
    c.style.top="-20px";
    c.style.zIndex="30";
    c.style.color=["#d8b56a","#fff","#c94b69","#f3df9b"][Math.floor(Math.random()*4)];
    c.style.fontSize=(10+Math.random()*16)+"px";
    c.style.transition="transform 4s linear,opacity 4s";
    document.body.appendChild(c);
    requestAnimationFrame(()=>c.style.transform=`translate(${Math.random()*180-90}px,${innerHeight+60}px) rotate(720deg)`);
    c.style.opacity="0";
    setTimeout(()=>c.remove(),4200);
  }
}

// Gallery
const cards=[...document.querySelectorAll(".gallery-card")];
let current=0;
const galleryMusic=document.getElementById("galleryMusic");

function showGallery(i){
  current=(i+cards.length)%cards.length;
  cards.forEach((card,n)=>{
    card.classList.toggle("active",n===current);
    card.querySelector("img").src=CONFIG.photos[n];
  });
  document.getElementById("galleryCounter").textContent=`${String(current+1).padStart(2,"0")} / 10`;
}

document.getElementById("galleryNext").onclick=()=>{
  showGallery(current+1);
  galleryMusic.play().catch(()=>{});
};
document.getElementById("galleryPrev").onclick=()=>{
  showGallery(current-1);
  galleryMusic.play().catch(()=>{});
};

let touchX=0;
document.getElementById("gallery").addEventListener("touchstart",e=>touchX=e.changedTouches[0].screenX);
document.getElementById("gallery").addEventListener("touchend",e=>{
  const d=e.changedTouches[0].screenX-touchX;
  if(Math.abs(d)>50)showGallery(current+(d<0?1:-1));
});
showGallery(0);

new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting)document.getElementById("birthdayMusic").pause();
},{threshold:.2}).observe(document.querySelector(".gallery-section"));

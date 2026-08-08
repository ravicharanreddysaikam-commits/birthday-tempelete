// ===========================================
// ✏️ EDIT ONLY THIS AREA
// ===========================================
const CONFIG = {
  name: "Ujuu",
  letter: `Some people make ordinary days feel a little more beautiful.

I just wanted to give you a small moment that you can keep — a few words, a few memories, and a little happiness made especially for you.

May you always have reasons to smile, dreams worth chasing, and people around you who make life feel special.

Happy Birthday, Ujuu. ❤️`,
  photos: [
    "images/photo1.jpg","images/photo2.jpg","images/photo3.jpg",
    "images/photo4.jpg","images/photo5.jpg","images/photo6.jpg",
    "images/photo7.jpg","images/photo8.jpg","images/photo9.jpg",
    "images/photo10.jpg"
  ]
};

// Initial text
document.querySelector(".reveal-screen h1").innerHTML = "Tap to <em>reveal</em>";
document.querySelector(".note-to").textContent = `Dear ${CONFIG.name},`;
document.getElementById("letter").textContent = CONFIG.letter;

// Intro: message disappears, reveal appears
setTimeout(()=>{
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("reveal").classList.remove("hidden");
}, 3000);

// Reveal
document.getElementById("revealBtn").addEventListener("click",()=>{
  document.getElementById("reveal").classList.add("hidden");
  document.getElementById("experience").classList.remove("hidden");
  document.getElementById("note").scrollIntoView({behavior:"smooth"});
});

// Note
document.getElementById("openNote").addEventListener("click",()=>{
  document.getElementById("note").classList.toggle("open");
  if(document.getElementById("note").classList.contains("open")){
    document.getElementById("letter").animate(
      [{opacity:0},{opacity:1}],
      {duration:1200,fill:"forwards"}
    );
  }
});

// Roses
document.getElementById("roseBtn").addEventListener("click",()=>{
  document.getElementById("roseBouquet").classList.add("show");
  for(let i=0;i<18;i++){
    setTimeout(()=>{
      const petal=document.createElement("span");
      petal.textContent="🌹";
      petal.style.position="fixed";
      petal.style.left=Math.random()*100+"vw";
      petal.style.top="-30px";
      petal.style.zIndex="20";
      petal.style.fontSize=(16+Math.random()*18)+"px";
      petal.style.transition="transform 3s linear, opacity 3s";
      document.body.appendChild(petal);
      requestAnimationFrame(()=>petal.style.transform=`translate(${Math.random()*160-80}px, ${innerHeight+80}px) rotate(520deg)`);
      petal.style.opacity="0";
      setTimeout(()=>petal.remove(),3200);
    },i*100);
  }
});

// Cake
document.getElementById("cutCake").addEventListener("click",()=>{
  const cake=document.getElementById("cake");
  cake.classList.add("cut");
  document.getElementById("cakeMessage").textContent="Make your wish... ✨";
  const music=document.getElementById("birthdayMusic");
  music.currentTime=0;
  music.play().catch(()=>{});
  setTimeout(()=>{
    document.getElementById("birthday").classList.remove("hidden");
    document.getElementById("birthday").scrollIntoView({behavior:"smooth"});
    confetti();
  },900);
});

// Confetti
function confetti(){
  for(let i=0;i<70;i++){
    const c=document.createElement("span");
    c.textContent=["✦","•","♥","✧"][Math.floor(Math.random()*4)];
    c.style.position="fixed";
    c.style.left=Math.random()*100+"vw";
    c.style.top="-20px";
    c.style.zIndex="40";
    c.style.color=["#d8b56a","#fff","#c94b69","#f3df9b"][Math.floor(Math.random()*4)];
    c.style.fontSize=(10+Math.random()*14)+"px";
    c.style.transition="transform 4s linear, opacity 4s";
    document.body.appendChild(c);
    requestAnimationFrame(()=>c.style.transform=`translate(${Math.random()*180-90}px, ${innerHeight+60}px) rotate(720deg)`);
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
    const img=card.querySelector("img");
    if(img)img.src=CONFIG.photos[n];
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

let touchStart=0;
document.getElementById("gallery").addEventListener("touchstart",e=>touchStart=e.changedTouches[0].screenX);
document.getElementById("gallery").addEventListener("touchend",e=>{
  const d=e.changedTouches[0].screenX-touchStart;
  if(Math.abs(d)>50)showGallery(current+(d<0?1:-1));
});
showGallery(0);

// Pause birthday music when gallery begins and start selected gallery music.
const galleryObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){
    document.getElementById("birthdayMusic").pause();
  }
},{threshold:.25});
galleryObserver.observe(document.querySelector(".gallery-section"));

// Final section subtle gold particles
setInterval(()=>{
  const s=document.createElement("span");
  s.textContent="✦";
  s.style.position="fixed";
  s.style.left=Math.random()*100+"vw";
  s.style.top="100vh";
  s.style.color="#d8b56a";
  s.style.zIndex="15";
  s.style.pointerEvents="none";
  s.style.transition="transform 7s linear, opacity 7s";
  document.body.appendChild(s);
  requestAnimationFrame(()=>{s.style.transform=`translate(${Math.random()*100-50}px,-${innerHeight+100}px)`;s.style.opacity="0"});
  setTimeout(()=>s.remove(),7200);
},700);

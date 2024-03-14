import{f as g}from"./fetch-8tlroGx1.js";document.addEventListener("DOMContentLoaded",async function(){const t=localStorage.getItem("token");if(!t){window.location.href="etusivu.html";return}await k(t),document.getElementById("logoutButton").addEventListener("click",function(){localStorage.removeItem("token"),window.location.href="etusivu.html"})});async function k(t){const o="https://health.northeurope.cloudapp.azure.com/api/auth/me",e={method:"GET",headers:{Authorization:`Bearer ${t}`}};try{const n=await g(o,e);document.getElementById("name").textContent=n.user.username}catch(n){console.error("Error fetching user name:",n)}}const p=document.getElementById("diary-form");console.log(p);p.addEventListener("submit",B);const I=document.querySelector("#fetchEntries");I.addEventListener("click",h);const l=document.getElementById("editdiaryModal"),v=document.querySelector(".close");document.getElementById("edit-diary-form");v.onclick=()=>l.style.display="none";window.onclick=t=>{t.target===l&&(l.style.display="none")};async function B(t){t.preventDefault();const o=localStorage.getItem("user_id"),e=new FormData(p),n={};e.forEach((d,r)=>{n[r]=d,console.log(n)}),n.user_id=o;try{const d=`https://health.northeurope.cloudapp.azure.com/api/entries/diary/${o}`,a={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(n)},i=await fetch(d,a);if(console.log(i),!i.ok)throw new Error("Failed to add entry");p.reset(),alert("Päiväkirjamerkintä lisätty!")}catch(d){console.error("Error adding diary entry:",d.message),alert("Päiväkirjamerkinnän lisääminen epäonnistui, Yritä uudelleen.")}}async function h(){const o=`https://health.northeurope.cloudapp.azure.com/api/entries/diary/${localStorage.getItem("user_id")}`,n={method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}};g(o,n).then(d=>{w(d)})}function w(t){console.log(t);const o=document.querySelector(".tbody");o.innerHTML="",t.forEach(e=>{console.log(e.diary_id,e.user_id,e.entry_date);const n=document.createElement("tr"),d=new Date(e.entry_date).toLocaleDateString("fi-Fi"),r=document.createElement("td");r.innerText=d;const a=document.createElement("td");a.innerText=e.mood;const i=document.createElement("td");i.innerText=e.training_time;const u=document.createElement("td");u.innerText=e.notes;const m=document.createElement("td");m.innerText=e.goals;const y=document.createElement("td"),s=document.createElement("button");s.className="del",s.setAttribute("diary-id",e.diary_id),s.innerText="Poista",s.addEventListener("click",f),y.appendChild(s);const E=document.createElement("td"),c=document.createElement("button");c.className="edit",c.setAttribute("diary-id",e.diary_id),c.setAttribute("data-entry-id",e.diary_id),c.innerText="Muokkaa",c.addEventListener("click",()=>S(e)),E.appendChild(c),n.appendChild(r),n.appendChild(a),n.appendChild(i),n.appendChild(u),n.appendChild(m),n.appendChild(y),n.appendChild(E),o.appendChild(n)}),document.querySelectorAll(".del").forEach(e=>e.addEventListener("click",f))}function S(t){document.getElementById("edit-entry-date").value=new Date(t.entry_date).toISOString().split("T")[0],document.getElementById("edit-mood").value=t.mood,document.getElementById("edit-training-time").value=t.training_time,document.getElementById("edit-notes").value=t.notes,document.getElementById("edit-goals").value=t.goals,document.getElementById("edit-diary-id").value=t.diary_id,document.getElementById("edit-diary-form").addEventListener("submit",T),l.style.display="block"}async function T(t){t.preventDefault(),console.log("Päivitetään merkintä"),console.log(t);const e=`https://health.northeurope.cloudapp.azure.com/api/entries/diary/${document.getElementById("edit-diary-id").value}`,n=localStorage.getItem("token"),d=document.getElementById("edit-entry-date").value,r=document.getElementById("edit-mood").value,a=document.getElementById("edit-training-time").value,i=document.getElementById("edit-notes").value,u=document.getElementById("edit-goals").value,m={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({entry_date:d,mood:r,training_time:a,notes:i,goals:u})};g(e,m).then(y=>{console.log(y),alert("Merkinnän päivitys onnistunut!"),l.style.display="none",h()})}async function f(t){console.log(t);const o=t.target.attributes["diary-id"].value;console.log(o);const e=`https://health.northeurope.cloudapp.azure.com/api/entries/diary/${o}`,d={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};confirm("Haluatko varmasti poistaa merkinnän?")&&g(e,d).then(a=>{console.log(a),h()})}document.getElementById("fetchEntries").addEventListener("click",h);

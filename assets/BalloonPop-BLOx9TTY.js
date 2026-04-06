import{r as i,u as M,j as s,B as n,T as z,I,p as j,k as u}from"./index-CGdl7K-x.js";import{u as k}from"./useSound-BkL5vTcj.js";const R=u`
  0%   { transform: translateY(0)      translateX(0);    }
  20%  { transform: translateY(-20vh)  translateX(14px); }
  40%  { transform: translateY(-40vh)  translateX(-10px);}
  60%  { transform: translateY(-60vh)  translateX(16px); }
  80%  { transform: translateY(-80vh)  translateX(-8px); }
  100% { transform: translateY(-115vh) translateX(0);    }
`,A=u`
  0%   { transform: scale(1);   opacity: 1; }
  30%  { transform: scale(1.5); opacity: 0.8; }
  100% { transform: scale(0);   opacity: 0; }
`,B=u`
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
`,C=[0,45,90,135,180,225,270,315];let L=0,T=0;const X=()=>({id:L++,x:Math.random()*82+5,size:Math.random()*80+60,speed:Math.random()*5+6,hue:Math.random()*360,popping:!1}),g=400,m=2400,b=400,P=()=>{const[x,p]=i.useState([]),[v,h]=i.useState([]),[y,S]=i.useState(0),[c,f]=i.useState(1200),{play:w}=k(),$=M(),d=i.useCallback((t=1)=>{p(e=>{const o=[...e];for(let r=0;r<t;r++)o.push(X());return o.slice(-30)})},[]);i.useEffect(()=>{const t=setInterval(()=>d(),c);return()=>clearInterval(t)},[d,c]),i.useEffect(()=>{const t=e=>{e.code==="Space"&&(e.preventDefault(),d(5))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[d]);const E=(t,e)=>{const o=e.currentTarget.getBoundingClientRect(),r=x.find(a=>a.id===t);r&&(p(a=>a.map(l=>l.id===t?{...l,popping:!0}:l)),h(a=>[...a,{id:T++,x:o.left+o.width/2,y:o.top+o.height/2,hue:r.hue}]),w("balloon-pop/pop.mp3"),S(a=>a+1))};return s.jsxs(n,{sx:{position:"fixed",inset:0,overflow:"hidden",background:"linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",userSelect:"none"},children:[s.jsx(n,{sx:{position:"absolute",top:16,left:0,right:0,textAlign:"center",zIndex:10,pointerEvents:"none"},children:s.jsxs(z,{variant:"h4",fontWeight:800,sx:{color:"#fff",textShadow:"0 2px 8px rgba(0,0,0,0.4)"},children:["🫧 ",y]})}),s.jsxs(n,{sx:{position:"absolute",bottom:24,left:0,right:0,display:"flex",justifyContent:"center",gap:2,zIndex:10},children:[s.jsx(n,{onClick:()=>f(t=>Math.min(t+b,m)),sx:{px:3,py:1.5,borderRadius:6,bgcolor:"rgba(255,255,255,0.15)",color:"#fff",fontWeight:800,fontSize:"1.1rem",cursor:"pointer",userSelect:"none",border:"2px solid rgba(255,255,255,0.25)","&:active":{bgcolor:"rgba(255,255,255,0.25)"},opacity:c>=m?.3:1},children:"🫧 Less"}),s.jsx(n,{onClick:()=>f(t=>Math.max(t-b,g)),sx:{px:3,py:1.5,borderRadius:6,bgcolor:"rgba(255,255,255,0.15)",color:"#fff",fontWeight:800,fontSize:"1.1rem",cursor:"pointer",userSelect:"none",border:"2px solid rgba(255,255,255,0.25)","&:active":{bgcolor:"rgba(255,255,255,0.25)"},opacity:c<=g?.3:1},children:"🫧🫧 More"})]}),s.jsx(I,{onClick:()=>$("/"),sx:{position:"absolute",top:16,left:16,bgcolor:"rgba(255,255,255,0.15)",color:"#fff",zIndex:20,boxShadow:2},size:"large",children:s.jsx(j,{sx:{fontSize:32}})}),x.map(t=>s.jsx(n,{onClick:e=>!t.popping&&E(t.id,e),onAnimationEnd:()=>p(e=>e.filter(o=>o.id!==t.id)),sx:{position:"absolute",left:`${t.x}%`,bottom:`-${t.size}px`,width:t.size,height:t.size,borderRadius:"50%",background:`radial-gradient(
              circle at 35% 28%,
              rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.6)  18%,
              hsla(${t.hue}, 85%, 65%, 0.85) 52%,
              hsla(${t.hue}, 80%, 45%, 0.95) 100%
            )`,border:`2px solid hsla(${t.hue}, 70%, 80%, 0.6)`,boxShadow:`
              inset 0 0 ${t.size*.2}px rgba(255,255,255,0.4),
              0 6px ${t.size*.5}px hsla(${t.hue}, 80%, 55%, 0.5),
              0 0 ${t.size*.3}px hsla(${t.hue}, 90%, 65%, 0.3)
            `,cursor:"pointer",animation:t.popping?`${A} 0.28s ease-out forwards`:`${R} ${t.speed}s ease-in-out forwards`}},t.id)),v.map(t=>s.jsx(n,{onAnimationEnd:()=>h(e=>e.filter(o=>o.id!==t.id)),sx:{position:"absolute",left:t.x,top:t.y,pointerEvents:"none",zIndex:30},children:C.map(e=>{const o=e*Math.PI/180,r=60+Math.random()*40,a=Math.round(Math.cos(o)*r),l=Math.round(Math.sin(o)*r);return s.jsx(n,{sx:{position:"absolute",width:12,height:12,borderRadius:"50%",bgcolor:`hsla(${t.hue+e*.5}, 90%, 65%, 1)`,transform:"translate(-50%, -50%)","--dx":`${a}px`,"--dy":`${l}px`,animation:`${B} 0.5s ease-out forwards`}},e)})},t.id))]})};export{P as BalloonPop};

import{a as t,H as g}from"./Header.fe280c9c.js";import{x as a,y as d,e as y,f as k,g as p,z as v,T as q,o as _,a as h,j as f,d as w}from"./index.555d4081.js";const I=["src"],N={__name:"rqLogin",setup(x){const l=a("\u4E8C\u7EF4\u7801\u767B\u5F55"),s=a(""),n=a(""),o=a(null),r=d(),i=y();k({}),p(async()=>{u(),o.value=setInterval(()=>{m()},5e3)}),v(async()=>{clearInterval(o.value)});const u=async()=>{await t.get("/login/qr/key?timerstamp="+Date.now()).then(e=>{s.value=r.query.key=e.data.unikey}),await t.get("/login/qr/create?qrimg=true&key="+s.value+"&timerstamp="+Date.now()).then(e=>{n.value=e.data.qrimg})},m=async()=>{await t.get("/login/qr/check?key="+r.query.key+"&timerstamp="+Date.now()).then(e=>{console.log(e.code),e.code===803&&(clearInterval(o.value),t.post("/login/status?=timestamp="+Date.now(),{cookie:e.cookie}).then(c=>{localStorage.setItem("token",JSON.stringify(c))}),q.success("\u626B\u7801\u767B\u5F55\u6210\u529F"),i.push("/"))})};return(e,c)=>(_(),h("div",null,[f(g,{title:l.value,back:!0},null,8,["title"]),w("img",{src:n.value,alt:""},null,8,I)]))}};export{N as default};

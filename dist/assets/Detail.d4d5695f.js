import{H as f,a as c}from"./Header.fe280c9c.js";import{_ as g,e as h,f as x,g as k,r as u,o as l,a as i,j as r,w,d as o,F as C,b,l as D}from"./index.555d4081.js";const V={class:"playlist"},N=["onClick"],B=["src"],S={__name:"Detail",setup($){const _=h(),t=x({title:"\u6B4C\u5355",option1:[],params:{cat:"\u5168\u90E8"},playlist:[]}),d=async()=>{c.get("/playlist/catlist").then(n=>{let a=n.sub.map(s=>({text:s.name,value:s.name}));t.option1=JSON.parse(JSON.stringify(a)),t.option1.unshift({text:"\u5168\u90E8",value:"\u5168\u90E8"})})},p=async n=>{c.post("/top/playlist",t.params).then(a=>{t.playlist=a.playlists})},m=async()=>{p()},y=n=>{_.push({path:`/playlist/${n}`})};return k(async()=>{d(),p()}),(n,a)=>{const s=u("van-dropdown-item"),v=u("van-dropdown-menu");return l(),i("div",null,[r(f,{title:t.title,back:!0},null,8,["title"]),r(v,null,{default:w(()=>[r(s,{modelValue:t.params.cat,"onUpdate:modelValue":a[0]||(a[0]=e=>t.params.cat=e),options:t.option1,onChange:a[1]||(a[1]=e=>m())},null,8,["modelValue","options"])]),_:1}),o("div",V,[o("ul",null,[(l(!0),i(C,null,b(t.playlist,e=>(l(),i("li",{key:e.id,onClick:F=>y(e.id)},[o("img",{src:e.coverImgUrl,alt:""},null,8,B),o("span",null,D(e.name),1)],8,N))),128))])])])}}},J=g(S,[["__scopeId","data-v-0c73fbf9"]]);export{J as default};

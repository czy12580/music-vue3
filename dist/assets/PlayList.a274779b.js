import{H as j}from"./Header.fe280c9c.js";import{A as w}from"./ActionSheet.2e4fa68f.js";import{_ as C,y as P,x as V,f as B,g as H,t as L,r as c,o as i,a as r,j as p,d as e,l as d,F as g,b as v,c as x,w as N,n as y}from"./index.555d4081.js";import{e as k}from"./data.a9af6471.js";const F={components:{Header:j,ActionSheet:w},setup(){const n=P(),a=V(1),s=B({playlist:{},songs:[],params:{id:n.params.id,limit:10,offset:0},objects:{},isActive:!1}),t=async()=>{const l=await k("playlist/track/all",s.params);s.songs=l.songs};H(async()=>{let l=await k("/playlist/detail",{id:s.params.id});s.playlist=l.playlist,t()});const f=()=>{s.params.offset=a.value*10,t()},h=l=>{s.objects=l,s.isActive=!0},_=()=>{s.isActive=!1};return{...L(s),currentPage:a,changePage:f,initList:t,openSheet:h,closeSheet:_}}},I={class:"header"},R={class:"left"},U=["src"],z={class:"right"},D={class:"main"},E={class:"songlist"},M={style:{"text-align":"left"}},T={style:{color:"red"}},$={class:"ar"};function q(n,a,s,t,f,h){const _=c("Header"),l=c("van-tag"),b=c("van-icon"),A=c("van-pagination"),S=c("ActionSheet");return i(),r("div",null,[p(_,{title:"\u6B4C\u5355",back:!0}),e("div",I,[e("div",R,[e("img",{src:n.playlist.coverImgUrl,alt:""},null,8,U)]),e("div",z,[e("p",null,d(n.playlist.name),1),e("p",null,[(i(!0),r(g,null,v(n.playlist.tags,(o,u)=>(i(),x(l,{style:{"margin-right":"10px"},type:"danger",key:u},{default:N(()=>[y(d(o),1)]),_:2},1024))),128))])])]),e("div",D,[e("ul",E,[(i(!0),r(g,null,v(n.songs,(o,u)=>(i(),r("li",{key:o.id},[e("div",M,[e("span",null,[e("strong",T,d(u+1),1),y(". "+d(o.name),1)]),e("div",$,[(i(!0),r(g,null,v(o.ar,m=>(i(),r("span",{key:m.id},d(m.name),1))),128))])]),p(b,{name:"ellipsis",onClick:m=>t.openSheet(o)},null,8,["onClick"])]))),128))]),p(A,{modelValue:t.currentPage,"onUpdate:modelValue":a[0]||(a[0]=o=>t.currentPage=o),"total-items":50,"show-page-size":3,"force-ellipses":"",onChange:a[1]||(a[1]=o=>t.changePage())},null,8,["modelValue"])]),p(S,{obj:n.objects,show:n.isActive,onClose:t.closeSheet},null,8,["obj","show","onClose"])])}const Q=C(F,[["render",q],["__scopeId","data-v-2e929f37"]]);export{Q as default};
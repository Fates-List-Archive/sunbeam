import{S as at,i as ot,s as lt,X as _t,e as q,v as d,j as v,c as D,a as I,w as g,l as w,d as m,b as V,f as p,x as h,F as L,p as u,n as _,A as b,t as P,g as Q,k as N,m as U,o as W,Y as Z}from"../chunks/vendor-22677977.js";import{f as pt,r as dt}from"../chunks/request-2d5483df.js";import{S as gt,T as ht}from"../chunks/Tag-6f90ee50.js";import{B as K,C as tt}from"../chunks/CardContainer-fe7298a5.js";import{B as bt}from"../chunks/BristlefrostMeta-4b5eefb5.js";import{S as et}from"../chunks/Section-04b3bd4d.js";import"../chunks/enums-06152dee.js";function vt(f){let s;return{c(){s=P("Roll")},l(l){s=Q(l,"Roll")},m(l,n){p(l,s,n)},d(l){l&&m(s)}}}function wt(f){let s,l,n,t,c,r,o;return l=new K({props:{type:f[0],rand:!1,data:f[1]}}),t=new _t({props:{class:"random-button white",touch:!0,variant:"outlined",$$slots:{default:[vt]},$$scope:{ctx:f}}}),t.$on("click",f[2]),{c(){s=q("div"),d(l.$$.fragment),n=v(),d(t.$$.fragment),c=v(),r=q("div"),this.h()},l(a){s=D(a,"DIV",{class:!0});var $=I(s);g(l.$$.fragment,$),n=w($),g(t.$$.fragment,$),$.forEach(m),c=w(a),r=D(a,"DIV",{class:!0}),I(r).forEach(m),this.h()},h(){V(s,"class","flex svelte-1she08m"),V(r,"class","spacer svelte-1she08m")},m(a,$){p(a,s,$),h(l,s,null),L(s,n),h(t,s,null),p(a,c,$),p(a,r,$),o=!0},p(a,[$]){const B={};$&1&&(B.type=a[0]),$&2&&(B.data=a[1]),l.$set(B);const S={};$&8&&(S.$$scope={dirty:$,ctx:a}),t.$set(S)},i(a){o||(u(l.$$.fragment,a),u(t.$$.fragment,a),o=!0)},o(a){_(l.$$.fragment,a),_(t.$$.fragment,a),o=!1},d(a){a&&m(s),b(l),b(t),a&&m(c),a&&m(r)}}}function Bt(f,s,l){let{type:n}=s,{randomBot:t}=s;console.log(t);const c=()=>{window.location.reload()};return f.$$set=r=>{"type"in r&&l(0,n=r.type),"randomBot"in r&&l(1,t=r.randomBot)},[n,t,c]}class kt extends at{constructor(s){super();ot(this,s,Bt,wt,lt,{type:0,randomBot:1})}}function ft(f,s,l){const n=f.slice();return n[2]=s[l],n}function it(f,s,l){const n=f.slice();return n[2]=s[l],n}function ct(f,s,l){const n=f.slice();return n[2]=s[l],n}function $t(f){let s,l;return s=new K({props:{data:f[2],type:"bot",rand:!1}}),{c(){d(s.$$.fragment)},l(n){g(s.$$.fragment,n)},m(n,t){h(s,n,t),l=!0},p(n,t){const c={};t&1&&(c.data=n[2]),s.$set(c)},i(n){l||(u(s.$$.fragment,n),l=!0)},o(n){_(s.$$.fragment,n),l=!1},d(n){b(s,n)}}}function yt(f){let s,l,n=f[0].certified_bots,t=[];for(let r=0;r<n.length;r+=1)t[r]=$t(ct(f,n,r));const c=r=>_(t[r],1,1,()=>{t[r]=null});return{c(){for(let r=0;r<t.length;r+=1)t[r].c();s=N()},l(r){for(let o=0;o<t.length;o+=1)t[o].l(r);s=N()},m(r,o){for(let a=0;a<t.length;a+=1)t[a].m(r,o);p(r,s,o),l=!0},p(r,o){if(o&1){n=r[0].certified_bots;let a;for(a=0;a<n.length;a+=1){const $=ct(r,n,a);t[a]?(t[a].p($,o),u(t[a],1)):(t[a]=$t($),t[a].c(),u(t[a],1),t[a].m(s.parentNode,s))}for(U(),a=n.length;a<t.length;a+=1)c(a);W()}},i(r){if(!l){for(let o=0;o<n.length;o+=1)u(t[o]);l=!0}},o(r){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)_(t[o]);l=!1},d(r){Z(t,r),r&&m(s)}}}function ut(f){let s,l;return s=new K({props:{data:f[2],type:"bot",rand:!1}}),{c(){d(s.$$.fragment)},l(n){g(s.$$.fragment,n)},m(n,t){h(s,n,t),l=!0},p(n,t){const c={};t&1&&(c.data=n[2]),s.$set(c)},i(n){l||(u(s.$$.fragment,n),l=!0)},o(n){_(s.$$.fragment,n),l=!1},d(n){b(s,n)}}}function Ct(f){let s,l,n=f[0].top_voted,t=[];for(let r=0;r<n.length;r+=1)t[r]=ut(it(f,n,r));const c=r=>_(t[r],1,1,()=>{t[r]=null});return{c(){for(let r=0;r<t.length;r+=1)t[r].c();s=N()},l(r){for(let o=0;o<t.length;o+=1)t[o].l(r);s=N()},m(r,o){for(let a=0;a<t.length;a+=1)t[a].m(r,o);p(r,s,o),l=!0},p(r,o){if(o&1){n=r[0].top_voted;let a;for(a=0;a<n.length;a+=1){const $=it(r,n,a);t[a]?(t[a].p($,o),u(t[a],1)):(t[a]=ut($),t[a].c(),u(t[a],1),t[a].m(s.parentNode,s))}for(U(),a=n.length;a<t.length;a+=1)c(a);W()}},i(r){if(!l){for(let o=0;o<n.length;o+=1)u(t[o]);l=!0}},o(r){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)_(t[o]);l=!1},d(r){Z(t,r),r&&m(s)}}}function mt(f){let s,l;return s=new K({props:{data:f[2],type:"bot",rand:!1}}),{c(){d(s.$$.fragment)},l(n){g(s.$$.fragment,n)},m(n,t){h(s,n,t),l=!0},p(n,t){const c={};t&1&&(c.data=n[2]),s.$set(c)},i(n){l||(u(s.$$.fragment,n),l=!0)},o(n){_(s.$$.fragment,n),l=!1},d(n){b(s,n)}}}function jt(f){let s,l,n=f[0].new_bots,t=[];for(let r=0;r<n.length;r+=1)t[r]=mt(ft(f,n,r));const c=r=>_(t[r],1,1,()=>{t[r]=null});return{c(){for(let r=0;r<t.length;r+=1)t[r].c();s=N()},l(r){for(let o=0;o<t.length;o+=1)t[o].l(r);s=N()},m(r,o){for(let a=0;a<t.length;a+=1)t[a].m(r,o);p(r,s,o),l=!0},p(r,o){if(o&1){n=r[0].new_bots;let a;for(a=0;a<n.length;a+=1){const $=ft(r,n,a);t[a]?(t[a].p($,o),u(t[a],1)):(t[a]=mt($),t[a].c(),u(t[a],1),t[a].m(s.parentNode,s))}for(U(),a=n.length;a<t.length;a+=1)c(a);W()}},i(r){if(!l){for(let o=0;o<n.length;o+=1)u(t[o]);l=!0}},o(r){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)_(t[o]);l=!1},d(r){Z(t,r),r&&m(s)}}}function Ft(f){let s,l,n,t,c,r,o,a,$,B,S,k,H,y,M,E,A,C,O,T,X,j,Y,z,G,F,J;return s=new bt({props:{url:"https://fateslist.xyz",title:"Fates List | Discord Bot List",description:"Find, invite and discover the best bots & servers now on Fates List",thumbnail:"https://fateslist.xyz/static/botlisticon.webp"}}),B=new gt({props:{type:"bot",query:""}}),k=new ht({props:{targetType:"bot",tags:f[0].tags_fixed}}),y=new kt({props:{type:"bot",randomBot:f[1]}}),E=new et({props:{icon:"fa-solid:certificate",title:"Certified"}}),C=new tt({props:{$$slots:{default:[yt]},$$scope:{ctx:f}}}),T=new et({props:{icon:"fa-solid:sort-amount-up",title:"Top Voted"}}),j=new tt({props:{$$slots:{default:[Ct]},$$scope:{ctx:f}}}),z=new et({props:{icon:"fa-solid:plus",title:"New Bots"}}),F=new tt({props:{$$slots:{default:[jt]},$$scope:{ctx:f}}}),{c(){d(s.$$.fragment),l=v(),n=q("section"),t=q("h1"),c=P("Fates List"),r=v(),o=q("h2"),a=P("Find the best bots for your servers!"),$=v(),d(B.$$.fragment),S=v(),d(k.$$.fragment),H=v(),d(y.$$.fragment),M=v(),d(E.$$.fragment),A=v(),d(C.$$.fragment),O=v(),d(T.$$.fragment),X=v(),d(j.$$.fragment),Y=v(),d(z.$$.fragment),G=v(),d(F.$$.fragment),this.h()},l(e){g(s.$$.fragment,e),l=w(e),n=D(e,"SECTION",{class:!0});var i=I(n);t=D(i,"H1",{class:!0});var R=I(t);c=Q(R,"Fates List"),R.forEach(m),r=w(i),o=D(i,"H2",{class:!0});var x=I(o);a=Q(x,"Find the best bots for your servers!"),x.forEach(m),i.forEach(m),$=w(e),g(B.$$.fragment,e),S=w(e),g(k.$$.fragment,e),H=w(e),g(y.$$.fragment,e),M=w(e),g(E.$$.fragment,e),A=w(e),g(C.$$.fragment,e),O=w(e),g(T.$$.fragment,e),X=w(e),g(j.$$.fragment,e),Y=w(e),g(z.$$.fragment,e),G=w(e),g(F.$$.fragment,e),this.h()},h(){V(t,"class","svelte-vvwszp"),V(o,"class","best-bots svelte-vvwszp"),V(n,"class","svelte-vvwszp")},m(e,i){h(s,e,i),p(e,l,i),p(e,n,i),L(n,t),L(t,c),L(n,r),L(n,o),L(o,a),p(e,$,i),h(B,e,i),p(e,S,i),h(k,e,i),p(e,H,i),h(y,e,i),p(e,M,i),h(E,e,i),p(e,A,i),h(C,e,i),p(e,O,i),h(T,e,i),p(e,X,i),h(j,e,i),p(e,Y,i),h(z,e,i),p(e,G,i),h(F,e,i),J=!0},p(e,[i]){const R={};i&1&&(R.tags=e[0].tags_fixed),k.$set(R);const x={};i&2&&(x.randomBot=e[1]),y.$set(x);const nt={};i&513&&(nt.$$scope={dirty:i,ctx:e}),C.$set(nt);const rt={};i&513&&(rt.$$scope={dirty:i,ctx:e}),j.$set(rt);const st={};i&513&&(st.$$scope={dirty:i,ctx:e}),F.$set(st)},i(e){J||(u(s.$$.fragment,e),u(B.$$.fragment,e),u(k.$$.fragment,e),u(y.$$.fragment,e),u(E.$$.fragment,e),u(C.$$.fragment,e),u(T.$$.fragment,e),u(j.$$.fragment,e),u(z.$$.fragment,e),u(F.$$.fragment,e),J=!0)},o(e){_(s.$$.fragment,e),_(B.$$.fragment,e),_(k.$$.fragment,e),_(y.$$.fragment,e),_(E.$$.fragment,e),_(C.$$.fragment,e),_(T.$$.fragment,e),_(j.$$.fragment,e),_(z.$$.fragment,e),_(F.$$.fragment,e),J=!1},d(e){b(s,e),e&&m(l),e&&m(n),e&&m($),b(B,e),e&&m(S),b(k,e),e&&m(H),b(y,e),e&&m(M),b(E,e),e&&m(A),b(C,e),e&&m(O),b(T,e),e&&m(X),b(j,e),e&&m(Y),b(z,e),e&&m(G),b(F,e)}}}const qt=!0;async function Dt({params:f,fetch:s,session:l,stuff:n}){const t="/api/v2/index?type=0",c=await pt(t,"",s);return c.ok?{props:{data:await c.json(),randomBot:await dt("bot")}}:{status:c.status,error:new Error(`Could not load ${t}`)}}function St(f,s,l){let{data:n}=s,{randomBot:t}=s;return f.$$set=c=>{"data"in c&&l(0,n=c.data),"randomBot"in c&&l(1,t=c.randomBot)},[n,t]}class It extends at{constructor(s){super();ot(this,s,St,Ft,lt,{data:0,randomBot:1})}}export{It as default,Dt as load,qt as prerender};
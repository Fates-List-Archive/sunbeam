import{S as _e,i as me,s as ve,v as H,w as J,x as L,p as j,n as D,A as R,e as h,j as G,c as g,a as $,l as K,d as o,V as te,b as f,f as C,F as u,X as pe,D as be,m as ae,o as le,Z as re,t as z,g as F,h as x,W as ee,K as we,O as Ee,P as ye,Q as je}from"./vendor-22677977.js";import{e as he}from"./enums-06152dee.js";function ge(r){let t,e;return t=new re({props:{class:"bot-card-cert",icon:"fa-solid:certificate",inline:!1,height:"3em"}}),{c(){H(t.$$.fragment)},l(a){J(t.$$.fragment,a)},m(a,l){L(t,a,l),e=!0},i(a){e||(j(t.$$.fragment,a),e=!0)},o(a){D(t.$$.fragment,a),e=!1},d(a){R(t,a)}}}function Ie(r){let t=r[0].user.username+"",e;return{c(){e=z(t)},l(a){e=F(a,t)},m(a,l){C(a,e,l)},p(a,l){l&1&&t!==(t=a[0].user.username+"")&&x(e,t)},d(a){a&&o(e)}}}function Ve(r){let t;return{c(){t=z("Fetching random bot...")},l(e){t=F(e,"Fetching random bot...")},m(e,a){C(e,t,a)},p:ee,d(e){e&&o(t)}}}function Ae(r){let t=r[0].description+"",e;return{c(){e=z(t)},l(a){e=F(a,t)},m(a,l){C(a,e,l)},p(a,l){l&1&&t!==(t=a[0].description+"")&&x(e,t)},d(a){a&&o(e)}}}function Ce(r){let t;return{c(){t=z("Try out your luck!")},l(e){t=F(e,"Try out your luck!")},m(e,a){C(e,t,a)},p:ee,d(e){e&&o(t)}}}function $e(r){let t,e,a,l,s,c,M,S,I,k,B,w,T;l=new re({props:{icon:"fa-solid:server",inline:!1}});function W(i,y){return i[2]?Ne:De}let N=W(r),v=N(r);k=new re({props:{icon:"fa-solid:thumbs-up",inline:!1}});function X(i,y){return i[2]?Se:Pe}let q=X(r),_=q(r);return{c(){t=h("div"),e=h("div"),a=h("p"),H(l.$$.fragment),s=G(),c=h("span"),v.c(),M=G(),S=h("div"),I=h("p"),H(k.$$.fragment),B=G(),w=h("span"),_.c(),this.h()},l(i){t=g(i,"DIV",{class:!0});var y=$(t);e=g(y,"DIV",{class:!0});var Q=$(e);a=g(Q,"P",{class:!0});var A=$(a);J(l.$$.fragment,A),s=K(A),c=g(A,"SPAN",{style:!0,class:!0});var d=$(c);v.l(d),d.forEach(o),A.forEach(o),Q.forEach(o),M=K(y),S=g(y,"DIV",{class:!0});var Z=$(S);I=g(Z,"P",{class:!0});var O=$(I);J(k.$$.fragment,O),B=K(O),w=g(O,"SPAN",{style:!0,class:!0});var V=$(w);_.l(V),V.forEach(o),O.forEach(o),Z.forEach(o),y.forEach(o),this.h()},h(){te(c,"margin-left","3px"),f(c,"class","bot-servers"),f(a,"class","text-center white-bold svelte-14mj578"),f(e,"class","bot-card-footer-stats svelte-14mj578"),te(w,"margin-left","3px"),f(w,"class","bot-votes"),f(I,"class","text-center white-bold svelte-14mj578"),f(S,"class","bot-card-footer-stats svelte-14mj578"),f(t,"class","d-flex bot-card-footer svelte-14mj578")},m(i,y){C(i,t,y),u(t,e),u(e,a),L(l,a,null),u(a,s),u(a,c),v.m(c,null),u(t,M),u(t,S),u(S,I),L(k,I,null),u(I,B),u(I,w),_.m(w,null),T=!0},p(i,y){N===(N=W(i))&&v?v.p(i,y):(v.d(1),v=N(i),v&&(v.c(),v.m(c,null))),q===(q=X(i))&&_?_.p(i,y):(_.d(1),_=q(i),_&&(_.c(),_.m(w,null)))},i(i){T||(j(l.$$.fragment,i),j(k.$$.fragment,i),T=!0)},o(i){D(l.$$.fragment,i),D(k.$$.fragment,i),T=!1},d(i){i&&o(t),R(l),v.d(),R(k),_.d()}}}function De(r){let t=r[0].guild_count+"",e;return{c(){e=z(t)},l(a){e=F(a,t)},m(a,l){C(a,e,l)},p(a,l){l&1&&t!==(t=a[0].guild_count+"")&&x(e,t)},d(a){a&&o(e)}}}function Ne(r){let t;return{c(){t=z("N/A")},l(e){t=F(e,"N/A")},m(e,a){C(e,t,a)},p:ee,d(e){e&&o(t)}}}function Pe(r){let t=r[0].votes+"",e;return{c(){e=z(t)},l(a){e=F(a,t)},m(a,l){C(a,e,l)},p(a,l){l&1&&t!==(t=a[0].votes+"")&&x(e,t)},d(a){a&&o(e)}}}function Se(r){let t;return{c(){t=z("N/A")},l(e){t=F(e,"N/A")},m(e,a){C(e,t,a)},p:ee,d(e){e&&o(t)}}}function Be(r){let t;return{c(){t=z("View")},l(e){t=F(e,"View")},m(e,a){C(e,t,a)},d(e){e&&o(t)}}}function ke(r){let t,e;return t=new pe({props:{"aria-label":"Invite",href:"/"+r[1]+"/"+r[0].user.id+"/invite",class:"bot-card-actions-link",target:"_blank",touch:!0,variant:"outlined",$$slots:{default:[ze]},$$scope:{ctx:r}}}),{c(){H(t.$$.fragment)},l(a){J(t.$$.fragment,a)},m(a,l){L(t,a,l),e=!0},p(a,l){const s={};l&3&&(s.href="/"+a[1]+"/"+a[0].user.id+"/invite"),l&8&&(s.$$scope={dirty:l,ctx:a}),t.$set(s)},i(a){e||(j(t.$$.fragment,a),e=!0)},o(a){D(t.$$.fragment,a),e=!1},d(a){R(t,a)}}}function ze(r){let t;return{c(){t=z("Invite")},l(e){t=F(e,"Invite")},m(e,a){C(e,t,a)},d(e){e&&o(t)}}}function Fe(r){let t,e,a,l,s,c,M,S,I,k,B,w,T,W,N,v,X,q,_,i,y,Q,A,d=(r[1]=="bot"||r[1]=="server")&&r[0].state==he.BotState.certified&&ge();function Z(n,m){return n[2]?Ve:Ie}let O=Z(r),V=O(r);function se(n,m){return n[2]?Ce:Ae}let U=se(r),P=U(r),p=(r[1]=="bot"||r[1]=="server")&&$e(r);i=new pe({props:{"aria-label":"View",href:"/"+r[1]+"/"+r[0].user.id,class:"bot-card-actions-link",touch:!0,variant:"outlined",$$slots:{default:[Be]},$$scope:{ctx:r}}});let b=r[1]!="profile"&&ke(r);return{c(){t=h("section"),e=h("div"),d&&d.c(),a=G(),l=h("a"),s=h("img"),S=G(),I=h("div"),k=h("a"),B=h("div"),w=h("p"),V.c(),W=G(),N=h("p"),v=h("span"),P.c(),X=G(),p&&p.c(),q=G(),_=h("div"),H(i.$$.fragment),y=G(),b&&b.c(),this.h()},l(n){t=g(n,"SECTION",{class:!0});var m=$(t);e=g(m,"DIV",{class:!0,"data-background-image":!0});var E=$(e);d&&d.l(E),a=K(E),l=g(E,"A",{href:!0,class:!0});var ne=$(l);s=g(ne,"IMG",{alt:!0,class:!0,src:!0,loading:!0}),ne.forEach(o),S=K(E),I=g(E,"DIV",{});var ie=$(I);k=g(ie,"A",{href:!0,class:!0});var oe=$(k);B=g(oe,"DIV",{class:!0});var ce=$(B);w=g(ce,"P",{class:!0});var fe=$(w);V.l(fe),fe.forEach(o),ce.forEach(o),oe.forEach(o),ie.forEach(o),W=K(E),N=g(E,"P",{class:!0});var ue=$(N);v=g(ue,"SPAN",{class:!0,style:!0});var de=$(v);P.l(de),de.forEach(o),ue.forEach(o),X=K(E),p&&p.l(E),q=K(E),_=g(E,"DIV",{class:!0});var Y=$(_);J(i.$$.fragment,Y),y=K(Y),b&&b.l(Y),Y.forEach(o),E.forEach(o),m.forEach(o),this.h()},h(){f(s,"alt","Bot Avatar"),f(s,"class","bot-card-avatar svelte-14mj578"),be(s.src,c=r[0].user.avatar.replace(".png",".webp"))||f(s,"src",c),f(s,"loading","lazy"),f(l,"href",M="/"+r[1]+"/"+r[0].user.id),f(l,"class","bot-card-view-link bot-card-avatar-container svelte-14mj578"),f(w,"class","bot-card-username-txt white-bold svelte-14mj578"),f(B,"class","bot-card-username svelte-14mj578"),f(k,"href",T="/"+r[1]+"/"+r[0].user.id),f(k,"class","bot-card-view-link svelte-14mj578"),f(v,"class","bot-card-description-txt"),te(v,"overflow-wrap","anywhere"),f(N,"class","bot-card-description svelte-14mj578"),f(_,"class","bot-card-actions svelte-14mj578"),f(e,"class","lozad bot-card-banner svelte-14mj578"),f(e,"data-background-image",Q=r[0].banner),f(t,"class","bot-card svelte-14mj578")},m(n,m){C(n,t,m),u(t,e),d&&d.m(e,null),u(e,a),u(e,l),u(l,s),u(e,S),u(e,I),u(I,k),u(k,B),u(B,w),V.m(w,null),u(e,W),u(e,N),u(N,v),P.m(v,null),u(e,X),p&&p.m(e,null),u(e,q),u(e,_),L(i,_,null),u(_,y),b&&b.m(_,null),A=!0},p(n,[m]){(n[1]=="bot"||n[1]=="server")&&n[0].state==he.BotState.certified?d?m&3&&j(d,1):(d=ge(),d.c(),j(d,1),d.m(e,a)):d&&(ae(),D(d,1,1,()=>{d=null}),le()),(!A||m&1&&!be(s.src,c=n[0].user.avatar.replace(".png",".webp")))&&f(s,"src",c),(!A||m&3&&M!==(M="/"+n[1]+"/"+n[0].user.id))&&f(l,"href",M),O===(O=Z(n))&&V?V.p(n,m):(V.d(1),V=O(n),V&&(V.c(),V.m(w,null))),(!A||m&3&&T!==(T="/"+n[1]+"/"+n[0].user.id))&&f(k,"href",T),U===(U=se(n))&&P?P.p(n,m):(P.d(1),P=U(n),P&&(P.c(),P.m(v,null))),n[1]=="bot"||n[1]=="server"?p?(p.p(n,m),m&2&&j(p,1)):(p=$e(n),p.c(),j(p,1),p.m(e,q)):p&&(ae(),D(p,1,1,()=>{p=null}),le());const E={};m&3&&(E.href="/"+n[1]+"/"+n[0].user.id),m&8&&(E.$$scope={dirty:m,ctx:n}),i.$set(E),n[1]!="profile"?b?(b.p(n,m),m&2&&j(b,1)):(b=ke(n),b.c(),j(b,1),b.m(_,null)):b&&(ae(),D(b,1,1,()=>{b=null}),le()),(!A||m&1&&Q!==(Q=n[0].banner))&&f(e,"data-background-image",Q)},i(n){A||(j(d),j(p),j(i.$$.fragment,n),j(b),A=!0)},o(n){D(d),D(p),D(i.$$.fragment,n),D(b),A=!1},d(n){n&&o(t),d&&d.d(),V.d(),P.d(),p&&p.d(),R(i),b&&b.d()}}}function Te(r,t,e){let{data:a}=t,{type:l}=t,{rand:s}=t;return a.id&&!a.user&&(a.user={id:a.id}),a.banner=a.banner||"https://api.fateslist.xyz/static/assets/prod/banner.webp?v=2",r.$$set=c=>{"data"in c&&e(0,a=c.data),"type"in c&&e(1,l=c.type),"rand"in c&&e(2,s=c.rand)},[a,l,s]}class Me extends _e{constructor(t){super();me(this,t,Te,Fe,ve,{data:0,type:1,rand:2})}}function qe(r){let t,e;const a=r[1].default,l=we(a,r,r[0],null);return{c(){t=h("div"),l&&l.c(),this.h()},l(s){t=g(s,"DIV",{class:!0});var c=$(t);l&&l.l(c),c.forEach(o),this.h()},h(){f(t,"class","container svelte-1gp4ux9")},m(s,c){C(s,t,c),l&&l.m(t,null),e=!0},p(s,[c]){l&&l.p&&(!e||c&1)&&Ee(l,a,s,s[0],e?je(a,s[0],c,null):ye(s[0]),null)},i(s){e||(j(l,s),e=!0)},o(s){D(l,s),e=!1},d(s){s&&o(t),l&&l.d(s)}}}function Oe(r,t,e){let{$$slots:a={},$$scope:l}=t;return r.$$set=s=>{"$$scope"in s&&e(0,l=s.$$scope)},[l,a]}class Qe extends _e{constructor(t){super();me(this,t,Oe,qe,ve,{})}}export{Me as B,Qe as C};
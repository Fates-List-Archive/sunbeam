import{S as l,i as c,s as d,e as f,t as u,c as m,a as p,g as h,d as i,f as _,F as g,h as v,W as o}from"../../chunks/vendor-22677977.js";import{l as x}from"../../chunks/request-2d5483df.js";function P(n){let e,r;return{c(){e=f("p"),r=u(n[0])},l(t){e=m(t,"P",{});var s=p(e);r=h(s,n[0]),s.forEach(i)},m(t,s){_(t,e,s),g(e,r)},p(t,[s]){s&1&&v(r,t[0])},i:o,o,d(t){t&&i(e)}}}function w(n,e,r){let t="Please wait...";function s(){let a=new URLSearchParams(window.location.search).get("redirect");if(a&&a.startsWith("/")&&(a="https://fateslist.xyz"+a),!a||!a.startsWith("https://fateslist.xyz")){r(0,t="Invalid redirect");return}localStorage.sunbeamLogin=a,x(!0)}return s(),[t]}class L extends l{constructor(e){super();c(this,e,w,P,d,{})}}export{L as default};

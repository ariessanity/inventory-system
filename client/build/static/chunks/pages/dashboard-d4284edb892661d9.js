(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{6117:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard",function(){return r(9269)}])},3956:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return g}});var t=r(5893);r(7294);var i=r(6554),d=r(3179),o=r(7030),s=r(6914),a=r(5432),l=(0,i.G)(function(e,n){let{className:r,centerContent:i,...l}=(0,d.Lr)(e),u=(0,o.mq)("Container",e);return(0,t.jsx)(s.m.div,{ref:n,className:(0,a.cx)("chakra-container",r),...l,__css:{...u,...i&&{display:"flex",flexDirection:"column",alignItems:"center"}}})});l.displayName="Container";var u=r(9078),c=r(8940),x=r(7634),h=r(3951),m=(0,i.G)(function(e,n){let{columns:r,spacingX:i,spacingY:d,spacing:o,minChildWidth:s,...a}=e,l=(0,c.F)(),m=s?(0,h.XQ)(s,e=>{let n=(0,x.LP)("sizes",e,"number"==typeof e?`${e}px`:e)(l);return null===e?null:`repeat(auto-fit, minmax(${n}, 1fr))`}):(0,h.XQ)(r,e=>null===e?null:`repeat(${e}, minmax(0, 1fr))`);return(0,t.jsx)(u.r,{ref:n,gap:o,columnGap:i,rowGap:d,templateColumns:m,...a})});m.displayName="SimpleGrid";var f=r(7747),p=r(1293),g=e=>{let{data:n}=e;return(0,t.jsx)(l,{maxW:"7xl",p:{base:5,md:10},children:(0,t.jsxs)(m,{columns:{base:1,sm:2,xl:4},spacing:5,mb:4,children:[(0,t.jsxs)(f.xu,{p:5,boxShadow:"md",rounded:"md",borderWidth:1,children:[(0,t.jsxs)(p.x,{fontWeight:"semibold",fontSize:"x-large",children:["₱",null==n?void 0:n.salesToday.toFixed()]}),(0,t.jsx)(p.x,{fontWeight:"300",children:"Sales Today"})]}),(0,t.jsxs)(f.xu,{p:5,boxShadow:"md",rounded:"md",borderWidth:1,children:[(0,t.jsx)(p.x,{fontWeight:"semibold",fontSize:"x-large",children:null==n?void 0:n.soldToday}),(0,t.jsx)(p.x,{fontWeight:"300",children:"Sold Today"})]}),(0,t.jsxs)(f.xu,{p:5,boxShadow:"md",rounded:"md",borderWidth:1,children:[(0,t.jsx)(p.x,{fontWeight:"semibold",fontSize:"x-large",children:null==n?void 0:n.totalProducts}),(0,t.jsx)(p.x,{fontWeight:"300",children:"Total Products"})]}),(0,t.jsxs)(f.xu,{p:5,boxShadow:"md",rounded:"md",borderWidth:1,children:[(0,t.jsxs)(p.x,{fontWeight:"semibold",fontSize:"x-large",children:["₱",null==n?void 0:n.inventoryValue.toFixed()]}),(0,t.jsx)(p.x,{fontWeight:"300",children:"Inventory Value"})]})]})})}},9269:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return u}});var t=r(5893),i=r(9008),d=r.n(i);r(7294);var o=r(3956),s=r(9457);let a=s.h.injectEndpoints({endpoints:e=>({getStatistics:e.query({query:()=>({url:"dashboard/api/getStatistics",method:"GET"}),transformResponse:(e,n,r)=>e.data,providesTags:["Product","Transaction"]})})}),{useGetStatisticsQuery:l}=a;var u=()=>{let{data:e,isError:n,isLoading:r}=l();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d(),{children:(0,t.jsx)("title",{children:"Dashboard"})}),(0,t.jsx)(o.default,{data:e})]})}},9008:function(e,n,r){e.exports=r(9201)},9078:function(e,n,r){"use strict";r.d(n,{r:function(){return o}});var t=r(6554),i=r(6914),d=r(5893),o=(0,t.G)(function(e,n){let{templateAreas:r,gap:t,rowGap:o,columnGap:s,column:a,row:l,autoFlow:u,autoRows:c,templateRows:x,autoColumns:h,templateColumns:m,...f}=e;return(0,d.jsx)(i.m.div,{ref:n,__css:{display:"grid",gridTemplateAreas:r,gridGap:t,gridRowGap:o,gridColumnGap:s,gridAutoColumns:h,gridColumn:a,gridRow:l,gridAutoFlow:u,gridAutoRows:c,gridTemplateRows:x,gridTemplateColumns:m},...f})});o.displayName="Grid"}},function(e){e.O(0,[774,888,179],function(){return e(e.s=6117)}),_N_E=e.O()}]);
"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[344],{8669:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var i=t(5893),s=t(5662),r=t(2724),a=t(3792),[o,l]=(0,t(5607).eC)("Card"),c=t(5432),d=t(6554),u=t(3179),h=t(7030),x=t(6914),f=(0,d.G)(function(e,n){let{className:t,children:s,direction:r="column",justify:a,align:l,...d}=(0,u.Lr)(e),f=(0,h.jC)("Card",e);return(0,i.jsx)(x.m.div,{ref:n,className:(0,c.cx)("chakra-card",t),__css:{display:"flex",flexDirection:r,justifyContent:a,alignItems:l,position:"relative",minWidth:0,wordWrap:"break-word",...f.container},...d,children:(0,i.jsx)(o,{value:f,children:s})})}),m=(0,d.G)(function(e,n){let{className:t,...s}=e,r=l();return(0,i.jsx)(x.m.div,{ref:n,className:(0,c.cx)("chakra-card__body",t),__css:r.body,...s})}),j=t(2757),g=t(3717),p=t(9993),v=t(4880),y=t(1293);t(7294);var C=t(8193),b=e=>{var n;let{name:t,quantity:o,price:l,unit:c,category:d,description:u,productId:h}=e,b=(0,s.TL)(),{cart:k}=(0,s.CG)(e=>e.cart),{data:S}=(0,r.Jy)(""),z=null==S?void 0:null===(n=S.products)||void 0===n?void 0:n.find(e=>e._id===h),W=k.find(e=>e._id===h),T=()=>{b((0,a.B8)(h))};return(0,i.jsx)(f,{direction:{base:"column",sm:"row"},variant:"outline",children:(0,i.jsxs)(m,{children:[(0,i.jsx)(j.X,{size:"md",fontWeight:"300",children:(0,i.jsxs)(g.k,{alignItems:"center",justifyContent:"space-between",children:[t,(0,i.jsx)(p.h,{size:"sm",color:"gray.500",icon:(0,i.jsx)(C.oHP,{}),"aria-label":"Remove Item",variant:"clear",onClick:T})]})}),(0,i.jsx)(v.C,{size:"sm",variant:"outline",colorScheme:"teal",mb:2,children:d}),(0,i.jsx)(y.x,{fontSize:"sm",fontWeight:"300",children:u}),(0,i.jsxs)(g.k,{justifyContent:"space-between",alignItems:"center",children:[(0,i.jsxs)(y.x,{fontWeight:"300",fontSize:"md",children:["₱",null==l?void 0:l.toFixed(2)," / ",c]}),(0,i.jsxs)(g.k,{align:"center",children:[(0,i.jsx)(p.h,{size:"sm",icon:(0,i.jsx)(C.Lfi,{}),"aria-label":"Add Quantity",onClick:()=>{b((0,a.Qd)(h))},isDisabled:((null==z?void 0:z.quantity)||1)<=(null==W?void 0:W.quantity)}),(0,i.jsx)(x.m.h3,{mx:2,children:o}),(0,i.jsx)(p.h,{size:"sm",icon:(0,i.jsx)(C.ywL,{}),"aria-label":"Minus Quantity",onClick:o>1?()=>{b((0,a.a3)(h))}:T})]})]})]})})}},2344:function(e,n,t){t.r(n);var i=t(5893),s=t(7294),r=t(5662),a=t(7963),o=t(967),l=t(3717),c=t(1293),d=t(4225),u=t(5281),h=t(8669),x=t(3792),f=t(3839),m=t(4659);n.default=()=>{let e=(0,a.p)(),n=(0,r.TL)(),{cart:t,totalPrice:j}=(0,r.CG)(e=>e.cart),[g,{isSuccess:p}]=(0,m.Dx)(),{isOpen:v,onClose:y,onOpen:C}=(0,o.q)();return(0,s.useEffect)(()=>{p&&p&&e({title:"Payment Successful",variant:"left-accent",status:"success",position:"top",isClosable:!0})},[p,e]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(l.k,{alignItems:"center",justifyContent:"space-between",mb:5,children:[(0,i.jsx)(c.x,{fontSize:30,fontWeight:"300",children:"Current Order"}),0!==t.length&&(0,i.jsxs)(l.k,{alignItems:"center",children:[(0,i.jsxs)(c.x,{fontSize:15,fontWeight:"300",mr:2,children:["Item: ",null==t?void 0:t.length]}),(0,i.jsx)(d.z,{size:"sm",fontWeight:"300",colorScheme:"red",onClick:()=>n((0,x.LL)()),children:"Clear Cart"})]})]}),(0,i.jsx)(u.K,{overflowY:"auto",maxH:"75vh",mb:5,children:t.map((e,n)=>(0,i.jsx)(h.default,{name:null==e?void 0:e.name,quantity:null==e?void 0:e.quantity,price:null==e?void 0:e.price,unit:null==e?void 0:e.unit,category:null==e?void 0:e.category,description:null==e?void 0:e.description,productId:null==e?void 0:e._id},(null==e?void 0:e._id)+n))}),(0,i.jsxs)(l.k,{justifyContent:"space-between",bottom:0,position:"sticky",flexDirection:"column",children:[(0,i.jsxs)(l.k,{fontSize:"lg",fontWeight:"300",mb:4,justifyContent:"space-between",children:[(0,i.jsx)(c.x,{children:"Total Price:"}),(0,i.jsxs)(c.x,{fontWeight:"semibold",children:["₱",j.toFixed(2)]})]}),(0,i.jsx)(d.z,{isDisabled:0===t.length,colorScheme:"teal",fontWeight:"300",onClick:C,whiteSpace:"pre-line",children:"Proceed to payment"})]}),(0,i.jsx)(f.default,{isOpen:v,totalPrice:j,onClose:y,handleTransaction:(e,i)=>{g({cartData:t,totalPrice:j,paymentReceived:e,paymentChange:j-(e||0),customerName:i}),n((0,x.LL)()),y()}})]})}},3839:function(e,n,t){t.r(n);var i=t(5893),s=t(5541),r=t(9778),a=t(4581),o=t(4859),l=t(6205),c=t(4346),d=t(3717),u=t(1293),h=t(6479),x=t(4253),f=t(4225),m=t(7294);n.default=e=>{let{isOpen:n,totalPrice:t,onClose:j,handleTransaction:g}=e,[p,v]=(0,m.useState)(0),[y,C]=(0,m.useState)("");return(0,m.useEffect)(()=>{v(0)},[n]),(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(s.u_,{isCentered:!0,onClose:j,isOpen:n,motionPreset:"slideInBottom",children:[(0,i.jsx)(r.Z,{}),(0,i.jsxs)(a.h,{children:[(0,i.jsx)(o.x,{fontWeight:"400",children:"Payment"}),(0,i.jsx)(l.o,{}),(0,i.jsxs)(c.f,{children:[(0,i.jsxs)(d.k,{alignItems:"center",children:[(0,i.jsx)(u.x,{mr:2,fontSize:"lg",fontWeight:"300",children:"Name"}),(0,i.jsx)(h.I,{id:"name",my:2,fontSize:"lg",fontWeight:"300",value:y,onChange:e=>C(e.target.value),placeholder:"Enter customer name . . ."})]}),(0,i.jsxs)(d.k,{alignItems:"center",mb:4,children:[(0,i.jsx)(u.x,{fontSize:"lg",fontWeight:"300",mr:3.5,children:"Cash"}),(0,i.jsx)(h.I,{id:"cash",my:2,fontSize:"lg",fontWeight:"300",value:p,onChange:e=>v(parseInt(e.target.value)||0),placeholder:"Enter payment . . .",step:"any"})]}),(0,i.jsxs)(d.k,{justifyContent:"space-between",children:[(0,i.jsxs)(u.x,{fontSize:"lg",fontWeight:"300",children:["Total Price: ₱",t.toFixed(2)]}),(0,i.jsxs)(u.x,{fontSize:"lg",fontWeight:"300",children:["Change:"," ",(p||0)-t<0?"₱0":"₱".concat(((p||0)-t).toFixed(2))]})]})]}),(0,i.jsxs)(x.m,{children:[(0,i.jsx)(f.z,{fontWeight:"300",variant:"solid",mr:3,onClick:j,children:"Cancel"}),(0,i.jsx)(f.z,{fontWeight:"300",colorScheme:"teal",onClick:()=>{g(p,y),j()},isDisabled:t>(p||0),children:"Paid"})]})]})]})})}},4659:function(e,n,t){t.d(n,{Dx:function(){return r},F:function(){return o},pb:function(){return a}});var i=t(9457);let s=i.h.injectEndpoints({endpoints:e=>({createTransaction:e.mutation({query:e=>({url:"transaction/api/createTransaction",method:"POST",data:e}),invalidatesTags:["Transaction","Product"]}),getTransactionHistory:e.query({query:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{url:"transaction/api/getTransactionHistory".concat(e),method:"GET"}},transformResponse:(e,n,t)=>e.data,providesTags:["Transaction"]}),getProductSold:e.query({query:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{url:"transaction/api/getProductSold".concat(e),method:"GET"}},transformResponse:(e,n,t)=>e.data,providesTags:["Transaction"]})})}),{useCreateTransactionMutation:r,useGetTransactionHistoryQuery:a,useGetProductSoldQuery:o}=s},2757:function(e,n,t){t.d(n,{X:function(){return c}});var i=t(6554),s=t(7030),r=t(3179),a=t(6914),o=t(5432),l=t(5893),c=(0,i.G)(function(e,n){let t=(0,s.mq)("Heading",e),{className:i,...c}=(0,r.Lr)(e);return(0,l.jsx)(a.m.h2,{ref:n,className:(0,o.cx)("chakra-heading",e.className),...c,__css:t})});c.displayName="Heading"},7963:function(e,n,t){t.d(n,{p:function(){return o}});var i=t(1089),s=t(3988),r=t(7634),a=t(7294);function o(e){let{theme:n}=(0,r.uP)(),t=(0,i.OX)();return(0,a.useMemo)(()=>(0,s.Cj)(n.direction,{...t,...e}),[e,n.direction,t])}}}]);
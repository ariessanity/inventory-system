(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[428],{7043:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/supplier",function(){return r(9750)}])},2797:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return D}});var i=r(5893),n=r(7294),s=r(7963),a=r(5083),c=r(9778),o=r(5335),l=r(6205),d=r(4859),u=r(4346),m=r(5970),p=r(5418),h=r(6479),x=r(4203),f=r(8912),j=r(6554),v=r(7030),N=r(3179),g=r(6914),C=r(5432),S=["h","minH","height","minHeight"],b=(0,j.G)((e,t)=>{let r=(0,v.mq)("Textarea",e),{className:n,rows:s,...a}=(0,N.Lr)(e),c=(0,f.Y)(a),o=s?function(e,t=[]){let r=Object.assign({},e);for(let e of t)e in r&&delete r[e];return r}(r,S):r;return(0,i.jsx)(g.m.textarea,{ref:t,rows:s,...c,className:(0,C.cx)("chakra-textarea",n),__css:o})});b.displayName="Textarea";var y=r(4253),k=r(3717),E=r(4225),_=r(7533),w=r(7536),I=r(662),q=r(5527),W=r(6310);let O=W.Ry().shape({companyName:W.Z_().required("Supplier name is required").max(30,"Supplier must be less than 30 characters!"),contactName:W.Z_().required("Contact name is required").max(30,"Contact name must be less than 30 characters!"),contactNumber:W.Z_().required("Contact number is required"),email:W.Z_().required("Email is required"),remarks:W.Z_().max(30,"Supplier must be less than 30 characters!")});var D=e=>{let{isOpen:t,onClose:r,isEdit:f,editData:j,deleteSupplier:v}=e,[N,{isSuccess:g,isError:C,error:S}]=(0,I.PU)(),[W,{isSuccess:D,isError:T,error:H}]=(0,I.Hp)(),P=(0,s.p)(),{handleSubmit:Z,register:J,reset:A,setValue:L,formState:{errors:z}}=(0,w.cI)({resolver:(0,_.X)(O)});(0,n.useEffect)(()=>{if(f&&j){let{companyName:e,contactName:t,contactNumber:r,email:i,remarks:n}=j;L("companyName",e),L("contactName",t),L("contactNumber",r),L("email",i),L("remarks",n)}else A()},[f,j,L,A]),(0,n.useEffect)(()=>{if(g&&P({title:"Success",variant:"left-accent",status:"success",position:"top",isClosable:!0}),C){var e,t;P({title:null==S?void 0:null===(t=S.data)||void 0===t?void 0:null===(e=t.response)||void 0===e?void 0:e.message,variant:"left-accent",status:"error",position:"top",isClosable:!0})}},[g,C,S,P]),(0,n.useEffect)(()=>{if(D&&P({title:"Success",variant:"left-accent",status:"success",position:"top",isClosable:!0}),T){var e,t;P({title:null==H?void 0:null===(t=H.data)||void 0===t?void 0:null===(e=t.response)||void 0===e?void 0:e.message,variant:"left-accent",status:"error",position:"top",isClosable:!0})}},[D,T,H,P]),(0,n.useEffect)(()=>{f&&D&&(r(),A())},[f,D,r,A]),(0,n.useEffect)(()=>{!f&&g&&(r(),A())},[f,g,r,A]);let B=async e=>{f?await W({...e,_id:null==j?void 0:j._id}):await N(e)};return(0,i.jsx)(a.d,{isOpen:t,placement:"right",onClose:()=>{f||A(),r()},children:(0,i.jsxs)("form",{onSubmit:Z(B),children:[(0,i.jsx)(c.Z,{}),(0,i.jsxs)(o.s,{children:[(0,i.jsx)(l.o,{}),(0,i.jsx)(d.x,{fontWeight:"400",children:f?"Update Supplier":"Create Supplier"}),(0,i.jsxs)(u.f,{children:[(0,i.jsxs)(m.NI,{isInvalid:!!(null==z?void 0:z.companyName),mb:5,children:[(0,i.jsx)(p.l,{htmlFor:"companyName",fontWeight:"300",children:"Supplier"}),(0,i.jsx)(h.I,{id:"companyName",...J("companyName"),placeholder:"ABC Company",fontWeight:"300"}),(0,i.jsx)(x.J1,{children:z.companyName&&z.companyName.message})]}),(0,i.jsxs)(m.NI,{isInvalid:!!(null==z?void 0:z.contactName),mb:5,children:[(0,i.jsx)(p.l,{htmlFor:"contactName",fontWeight:"300",children:"Contact Name"}),(0,i.jsx)(h.I,{id:"contactName",...J("contactName"),placeholder:"Juan Dela Cruz",fontWeight:"300"}),(0,i.jsx)(x.J1,{children:z.contactName&&z.contactName.message})]}),(0,i.jsxs)(m.NI,{isInvalid:!!(null==z?void 0:z.contactNumber),mb:5,children:[(0,i.jsx)(p.l,{htmlFor:"contactNumber",fontWeight:"300",children:"Contact Number"}),(0,i.jsx)(h.I,{id:"contactNumber",...J("contactNumber"),placeholder:"",type:"number",fontWeight:"300"}),(0,i.jsx)(x.J1,{children:z.contactNumber&&z.contactNumber.message})]}),(0,i.jsxs)(m.NI,{isInvalid:!!(null==z?void 0:z.email),mb:5,children:[(0,i.jsx)(p.l,{htmlFor:"email",fontWeight:"300",children:"Email"}),(0,i.jsx)(h.I,{id:"email",...J("email"),placeholder:"juandelacruz@gmail.com",type:"email",fontWeight:"300"}),(0,i.jsx)(x.J1,{children:z.email&&z.email.message})]}),(0,i.jsxs)(m.NI,{isInvalid:!!(null==z?void 0:z.remarks),mb:5,children:[(0,i.jsx)(p.l,{htmlFor:"remarks",fontWeight:"300",children:"Remarks"}),(0,i.jsx)(b,{id:"remarks",...J("remarks"),fontWeight:"300"}),(0,i.jsx)(x.J1,{children:z.remarks&&z.remarks.message})]})]}),(0,i.jsxs)(y.m,{justifyContent:"space-between",children:[(0,i.jsx)(k.k,{children:(0,i.jsx)(q.p,{onClick:()=>v(null==j?void 0:j._id),color:"red.500",cursor:"pointer"})}),(0,i.jsxs)(k.k,{children:[(0,i.jsx)(E.z,{variant:"outline",mr:3,onClick:r,children:"Cancel"}),(0,i.jsx)(E.z,{type:"submit",colorScheme:"teal",children:f?"Update":"Create"})]})]})]})]})})}},9750:function(e,t,r){"use strict";r.r(t);var i=r(5893),n=r(1971),s=r(967),a=r(1293),c=r(3717),o=r(7239),l=r(4225),d=r(2140),u=r(2735),m=r(6479),p=r(7294),h=r(8193),x=r(662),f=r(9784),j=r(5527),v=r(6899),N=r(5130),g=r(9008),C=r.n(g),S=r(2797);t.default=()=>{let[e,t]=(0,p.useState)(),[r,g]=(0,p.useState)(),[b,y]=(0,p.useState)(),[k,E]=(0,p.useState)(""),[_,w]=(0,p.useState)({page:1,limit:20}),[I,q]=(0,p.useState)({sortDirection:"none",accessor:"",direction:""}),[W]=(0,x.eL)(),O=(0,N.L)({..._}),{data:D,refetch:T,isFetching:H,isLoading:P}=(0,x.SJ)(O),{isOpen:Z,onClose:J,onOpen:A}=(0,s.q)(),{isOpen:L,onClose:z,onOpen:B}=(0,s.q)(),F=e=>{var r;let i=null==D?void 0:null===(r=D.suppliers)||void 0===r?void 0:r.find(t=>t._id===e);A(),t(!0),g(i)},R=async()=>{await W(b),z(),J()},U=e=>{B(),y(e)},M=[{Header:"Company Name",accessor:"companyName",width:150,sortDirection:"companyName"===I.accessor?I.direction:"none"},{Header:"Contact Name",accessor:"contactName",width:150,Cell:e=>{let{cell:{value:t}}=e;return(0,i.jsx)(a.x,{children:t||"-"})},sortDirection:"contactName"===I.accessor?I.direction:"none"},{Header:"Contact Number",accessor:"contactNumber",width:150,Cell:e=>{let{cell:{value:t}}=e;return(0,i.jsx)(a.x,{children:t})},sortDirection:"contactNumber"===I.accessor?I.direction:"none"},{Header:"Email",accessor:"email",width:180,Cell:e=>{let{cell:{value:t}}=e;return(0,i.jsx)(a.x,{children:t})},sortDirection:"email"===I.accessor?I.direction:"none"},{Header:"Remarks",accessor:"remarks",width:100,sortDirection:"remarks"===I.accessor?I.direction:"none",Cell:e=>{let{cell:{value:t}}=e;return(0,i.jsx)(a.x,{children:t||"-"})}},{Header:"Action",accessor:"_id",width:80,Cell:e=>{let{cell:{value:t}}=e;return(0,i.jsxs)(c.k,{children:[(0,i.jsx)(f.d,{mr:5,color:"teal.500",cursor:"pointer",onClick:()=>F(t)}),(0,i.jsx)(j.p,{onClick:()=>U(t),color:"red.500",cursor:"pointer"})]})}}];return(0,i.jsxs)(c.k,{flexDirection:"column",justifyContent:"space-between",children:[(0,i.jsx)(C(),{children:(0,i.jsx)("title",{children:"Supplier Management"})}),(0,i.jsx)(o.M,{fontSize:30,fontWeight:"300",color:"gray.600",fontFamily:"monospace",children:"SUPPLIER MANAGEMENT"}),(0,i.jsxs)(c.k,{flexDirection:{base:"column-reverse",sm:"row"},justifyContent:"space-between",alignItems:"center",my:5,children:[(0,i.jsx)(l.z,{w:"100%",maxWidth:{base:"100%",sm:"8em"},fontWeight:"300",colorScheme:"teal",variant:"outline",onClick:()=>{A(),t(!1)},leftIcon:(0,i.jsx)(h.dEn,{}),children:"Add Supplier"}),(0,i.jsxs)(d.B,{w:"100%",maxWidth:{base:"100%",sm:"18.75em"},mb:{base:2,sm:0},children:[(0,i.jsx)(u.Z,{cursor:"pointer",onClick:e=>{w({..._,search:k,page:1}),T()},children:(0,i.jsx)(h.RB5,{})}),(0,i.jsx)(m.I,{value:k||"",onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"===e.key&&(w({..._,search:k,page:1}),T())},type:"text",placeholder:"Search..."}),(0,i.jsx)(u.x,{cursor:"pointer",onClick:()=>{E(""),w({..._,search:""}),T()},children:(0,i.jsx)(h.oHP,{})})]})]}),(0,i.jsx)(n.Z,{columns:M,data:(null==D?void 0:D.suppliers)||[],count:null==D?void 0:D.count,isLoading:P,currentPage:null==_?void 0:_.page,onPageChange:e=>{w({..._,page:e}),T()},onSortChange:e=>{switch(e.sortDirection){case"none":q({direction:"asc",accessor:e.id}),w({..._,sortBy:e.id,sortOrder:"asc"});break;case"asc":q({direction:"desc",accessor:e.id}),w({..._,sortBy:e.id,sortOrder:"desc"});break;case"desc":q({direction:"none",accessor:e.id}),w({..._,sortBy:"",sortOrder:""})}}}),(0,i.jsx)(S.default,{isOpen:Z,onClose:J,isEdit:e,editData:r,deleteSupplier:U}),(0,i.jsx)(v.Z,{isOpen:L,onClose:z,onClick:R})]})}},662:function(e,t,r){"use strict";r.d(t,{Hp:function(){return c},PU:function(){return s},SJ:function(){return a},eL:function(){return o}});var i=r(9457);let n=i.h.injectEndpoints({endpoints:e=>({createSupplier:e.mutation({query:e=>({url:"supplier/api/createSupplier",method:"POST",data:e}),invalidatesTags:["Supplier"]}),getAllSuppliers:e.query({query:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{url:"supplier/api/getAllSuppliers".concat(e),method:"GET"}},transformResponse:(e,t,r)=>e.data,providesTags:["Supplier"]}),updateSupplier:e.mutation({query:e=>({url:"supplier/api/updateSupplier/".concat(e._id),method:"PUT",data:e}),invalidatesTags:["Supplier"]}),deleteSupplier:e.mutation({query:e=>({url:"supplier/api/deleteSupplier/".concat(e),method:"DELETE"}),invalidatesTags:["Supplier"]})})}),{useCreateSupplierMutation:s,useGetAllSuppliersQuery:a,useUpdateSupplierMutation:c,useDeleteSupplierMutation:o}=n}},function(e){e.O(0,[776,471,586,774,888,179],function(){return e(e.s=7043)}),_N_E=e.O()}]);
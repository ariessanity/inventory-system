(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[970],{1351:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/transaction/_modal/TransactionModal",function(){return l(3839)}])},3839:function(e,n,l){"use strict";l.r(n);var t=l(5893),i=l(5541),r=l(9778),a=l(4581),s=l(4859),o=l(6205),d=l(4346),u=l(3717),c=l(1293),h=l(6479),f=l(4253),m=l(4225),x=l(7294);n.default=e=>{let{isOpen:n,totalPrice:l,onClose:v,handleTransaction:p}=e,[j,g]=(0,x.useState)(0),[b,C]=(0,x.useState)("");return(0,x.useEffect)(()=>{g(0)},[n]),(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(i.u_,{isCentered:!0,onClose:v,isOpen:n,motionPreset:"slideInBottom",children:[(0,t.jsx)(r.Z,{}),(0,t.jsxs)(a.h,{children:[(0,t.jsx)(s.x,{fontWeight:"400",children:"Payment"}),(0,t.jsx)(o.o,{}),(0,t.jsxs)(d.f,{children:[(0,t.jsxs)(u.k,{alignItems:"center",children:[(0,t.jsx)(c.x,{mr:2,fontSize:"lg",fontWeight:"300",children:"Name"}),(0,t.jsx)(h.I,{id:"name",my:2,fontSize:"lg",fontWeight:"300",value:b,onChange:e=>C(e.target.value),placeholder:"Enter customer name . . ."})]}),(0,t.jsxs)(u.k,{alignItems:"center",mb:4,children:[(0,t.jsx)(c.x,{fontSize:"lg",fontWeight:"300",mr:3.5,children:"Cash"}),(0,t.jsx)(h.I,{id:"cash",my:2,fontSize:"lg",fontWeight:"300",value:j,onChange:e=>g(parseInt(e.target.value)||0),placeholder:"Enter payment . . .",step:"any"})]}),(0,t.jsxs)(u.k,{justifyContent:"space-between",children:[(0,t.jsxs)(c.x,{fontSize:"lg",fontWeight:"300",children:["Total Price: ₱",l.toFixed(2)]}),(0,t.jsxs)(c.x,{fontSize:"lg",fontWeight:"300",children:["Change:"," ",(j||0)-l<0?"₱0":"₱".concat(((j||0)-l).toFixed(2))]})]})]}),(0,t.jsxs)(f.m,{children:[(0,t.jsx)(m.z,{fontWeight:"300",variant:"solid",mr:3,onClick:v,children:"Cancel"}),(0,t.jsx)(m.z,{fontWeight:"300",colorScheme:"teal",onClick:()=>{p(j,b),v()},isDisabled:l>(j||0),children:"Paid"})]})]})]})})}},8912:function(e,n,l){"use strict";l.d(n,{K:function(){return a},Y:function(){return r}});var t=l(5970),i=l(5432);function r(e){let{isDisabled:n,isInvalid:l,isReadOnly:t,isRequired:r,...s}=a(e);return{...s,disabled:n,readOnly:t,required:r,"aria-invalid":(0,i.Qm)(l),"aria-required":(0,i.Qm)(r),"aria-readonly":(0,i.Qm)(t)}}function a(e){var n,l,r;let a=(0,t.NJ)(),{id:s,disabled:o,readOnly:d,required:u,isRequired:c,isInvalid:h,isReadOnly:f,isDisabled:m,onFocus:x,onBlur:v,...p}=e,j=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==a?void 0:a.hasFeedbackText)&&(null==a?void 0:a.isInvalid)&&j.push(a.feedbackId),(null==a?void 0:a.hasHelpText)&&j.push(a.helpTextId),{...p,"aria-describedby":j.join(" ")||void 0,id:null!=s?s:null==a?void 0:a.id,isDisabled:null!=(n=null!=o?o:m)?n:null==a?void 0:a.isDisabled,isReadOnly:null!=(l=null!=d?d:f)?l:null==a?void 0:a.isReadOnly,isRequired:null!=(r=null!=u?u:c)?r:null==a?void 0:a.isRequired,isInvalid:null!=h?h:null==a?void 0:a.isInvalid,onFocus:(0,i.v0)(null==a?void 0:a.onFocus,x),onBlur:(0,i.v0)(null==a?void 0:a.onBlur,v)}}},5970:function(e,n,l){"use strict";l.d(n,{NI:function(){return v},NJ:function(){return x},e:function(){return f}});var t=l(5227),i=l(1103),r=l(6554),a=l(7030),s=l(3179),o=l(6914),d=l(5432),u=l(7294),c=l(5893),[h,f]=(0,t.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[m,x]=(0,t.k)({strict:!1,name:"FormControlContext"}),v=(0,r.G)(function(e,n){let l=(0,a.jC)("Form",e),t=(0,s.Lr)(e),{getRootProps:r,htmlProps:f,...x}=function(e){let{id:n,isRequired:l,isInvalid:t,isDisabled:r,isReadOnly:a,...s}=e,o=(0,u.useId)(),c=n||`field-${o}`,h=`${c}-label`,f=`${c}-feedback`,m=`${c}-helptext`,[x,v]=(0,u.useState)(!1),[p,j]=(0,u.useState)(!1),[g,b]=(0,u.useState)(!1),C=(0,u.useCallback)((e={},n=null)=>({id:m,...e,ref:(0,i.lq)(n,e=>{e&&j(!0)})}),[m]),k=(0,u.useCallback)((e={},n=null)=>({...e,ref:n,"data-focus":(0,d.PB)(g),"data-disabled":(0,d.PB)(r),"data-invalid":(0,d.PB)(t),"data-readonly":(0,d.PB)(a),id:void 0!==e.id?e.id:h,htmlFor:void 0!==e.htmlFor?e.htmlFor:c}),[c,r,g,t,a,h]),y=(0,u.useCallback)((e={},n=null)=>({id:f,...e,ref:(0,i.lq)(n,e=>{e&&v(!0)}),"aria-live":"polite"}),[f]),_=(0,u.useCallback)((e={},n=null)=>({...e,...s,ref:n,role:"group","data-focus":(0,d.PB)(g),"data-disabled":(0,d.PB)(r),"data-invalid":(0,d.PB)(t),"data-readonly":(0,d.PB)(a)}),[s,r,g,t,a]),F=(0,u.useCallback)((e={},n=null)=>({...e,ref:n,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!l,isInvalid:!!t,isReadOnly:!!a,isDisabled:!!r,isFocused:!!g,onFocus:()=>b(!0),onBlur:()=>b(!1),hasFeedbackText:x,setHasFeedbackText:v,hasHelpText:p,setHasHelpText:j,id:c,labelId:h,feedbackId:f,helpTextId:m,htmlProps:s,getHelpTextProps:C,getErrorMessageProps:y,getRootProps:_,getLabelProps:k,getRequiredIndicatorProps:F}}(t),v=(0,d.cx)("chakra-form-control",e.className);return(0,c.jsx)(m,{value:x,children:(0,c.jsx)(h,{value:l,children:(0,c.jsx)(o.m.div,{...r({},n),className:v,__css:l.container})})})});v.displayName="FormControl",(0,r.G)(function(e,n){let l=x(),t=f(),i=(0,d.cx)("chakra-form__helper-text",e.className);return(0,c.jsx)(o.m.div,{...null==l?void 0:l.getHelpTextProps(e,n),__css:t.helperText,className:i})}).displayName="FormHelperText"},6479:function(e,n,l){"use strict";l.d(n,{I:function(){return u}});var t=l(8912),i=l(6554),r=l(7030),a=l(3179),s=l(6914),o=l(5432),d=l(5893),u=(0,i.G)(function(e,n){let{htmlSize:l,...i}=e,u=(0,r.jC)("Input",i),c=(0,a.Lr)(i),h=(0,t.Y)(c),f=(0,o.cx)("chakra-input",e.className);return(0,d.jsx)(s.m.input,{size:l,...h,__css:u.field,ref:n,className:f})});u.displayName="Input",u.id="Input"}},function(e){e.O(0,[774,888,179],function(){return e(e.s=1351)}),_N_E=e.O()}]);
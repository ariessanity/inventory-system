(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[962],{4832:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/report/_component/TransactionHistoryComponent",function(){return t(8489)}])},4027:function(e,n,t){"use strict";t.d(n,{I:function(){return l}});var r=t(6948),o=t(6554),i=t(7294),u=t(5893);function l(e){let{viewBox:n="0 0 24 24",d:t,displayName:l,defaultProps:a={}}=e,c=i.Children.toArray(e.path),s=(0,o.G)((e,o)=>(0,u.jsx)(r.J,{ref:o,viewBox:n,...a,...e,children:c.length?c:(0,u.jsx)("path",{fill:"currentColor",d:t})}));return s.displayName=l,s}},7640:function(e,n,t){"use strict";t.d(n,{g:function(){return r}});var r=(0,t(4027).I)({d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z",displayName:"ChevronUpIcon"})},6147:function(e,n,t){"use strict";t.d(n,{v:function(){return r}});var r=(0,t(4027).I)({displayName:"ChevronDownIcon",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})},4325:function(e,n,t){"use strict";t.d(n,{y:function(){return p}});var r=t(5904),o=t(6914),i=t(6554),u=t(7745),l=t(5893),a={exit:{opacity:0,scale:.95,transition:{duration:.1,ease:[.4,0,1,1]}},enter:{scale:1,opacity:1,transition:{duration:.15,ease:[0,0,.2,1]}}},c=(0,o.m)(u.E.section),s=(0,i.G)(function(e,n){let{variants:t=a,...o}=e,{isOpen:i}=(0,r.lp)();return(0,l.jsx)(c,{ref:n,variants:function(e){if(e)return{enter:{...e.enter,visibility:"visible"},exit:{...e.exit,transitionEnd:{visibility:"hidden"}}}}(t),initial:!1,animate:i?"enter":"exit",...o})});s.displayName="PopoverTransition";var d=t(5432),p=(0,i.G)(function(e,n){let{rootProps:t,motionProps:i,...u}=e,{getPopoverProps:a,getPopoverPositionerProps:c,onAnimationComplete:p}=(0,r.lp)(),v=(0,r.SV)(),f={position:"relative",display:"flex",flexDirection:"column",...v.content};return(0,l.jsx)(o.m.div,{...c(t),__css:v.popper,className:"chakra-popover__popper",children:(0,l.jsx)(s,{...i,...a(u,n),onAnimationComplete:(0,d.PP)(p,u.onAnimationComplete),className:(0,d.cx)("chakra-popover__content",e.className),__css:f})})});p.displayName="PopoverContent"},7191:function(e,n,t){"use strict";t.d(n,{J:function(){return N}});var r=t(3694),o=t(7134),i=()=>"undefined"!=typeof window,u=e=>i()&&e.test(navigator.vendor),l=e=>i()&&e.test(function(){var e;let n=navigator.userAgentData;return null!=(e=null==n?void 0:n.platform)?e:navigator.platform}()),a=()=>l(/mac|iphone|ipad|ipod/i),c=()=>a()&&u(/apple/i),s=t(2654),d=t(5075),p=t(6919),v=t(6766),f=t(1103),m=t(5432),h=t(2625),y=t(7294),C={click:"click",hover:"hover"};function _(e,n){return e===n||(null==e?void 0:e.contains(n))}function k(e){var n;let t=e.currentTarget.ownerDocument.activeElement;return null!=(n=e.relatedTarget)?n:t}var w=t(5904),b=t(7030),x=t(3179),g=t(8940),E=t(5893);function N(e){let n=(0,b.jC)("Popover",e),{children:t,...i}=(0,x.Lr)(e),u=(0,g.F)(),l=function(e={}){let{closeOnBlur:n=!0,closeOnEsc:t=!0,initialFocusRef:i,id:u,returnFocusOnClose:l=!0,autoFocus:a=!0,arrowSize:w,arrowShadowColor:b,trigger:x=C.click,openDelay:g=200,closeDelay:E=200,isLazy:N,lazyBehavior:P="unmount",computePositionOnMount:T,...D}=e,{isOpen:S,onClose:M,onOpen:j,onToggle:R}=(0,d.q)(e),q=(0,y.useRef)(null),G=(0,y.useRef)(null),L=(0,y.useRef)(null),I=(0,y.useRef)(!1),O=(0,y.useRef)(!1);S&&(O.current=!0);let[B,A]=(0,y.useState)(!1),[F,z]=(0,y.useState)(!1),K=(0,y.useId)(),H=null!=u?u:K,[U,V,$,J]=["popover-trigger","popover-content","popover-header","popover-body"].map(e=>`${e}-${H}`),{referenceRef:W,getArrowProps:X,getPopperProps:Q,getArrowInnerProps:Y,forceUpdate:Z}=(0,p.D)({...D,enabled:S||!!T}),ee=(0,r.h)({isOpen:S,ref:L});!function(e){let{ref:n,elements:t,enabled:r}=e,i=()=>{var e,t;return null!=(t=null==(e=n.current)?void 0:e.ownerDocument)?t:document};(0,o.O)(i,"pointerdown",e=>{if(!c()||!r)return;let o=e.target,u=(null!=t?t:[n]).some(e=>{let n="current"in e?e.current:e;return(null==n?void 0:n.contains(o))||n===o});i().activeElement!==o&&u&&(e.preventDefault(),o.focus())})}({enabled:S,ref:G}),(0,s.C)(L,{focusRef:G,visible:S,shouldFocus:l&&x===C.click}),(0,s.G)(L,{focusRef:i,visible:S,shouldFocus:a&&x===C.click});let en=(0,h.k)({wasSelected:O.current,enabled:N,mode:P,isSelected:ee.present}),et=(0,y.useCallback)((e={},r=null)=>{let o={...e,style:{...e.style,transformOrigin:v.Dq.transformOrigin.varRef,[v.Dq.arrowSize.var]:w?`${w}px`:void 0,[v.Dq.arrowShadowColor.var]:b},ref:(0,f.lq)(L,r),children:en?e.children:null,id:V,tabIndex:-1,role:"dialog",onKeyDown:(0,m.v0)(e.onKeyDown,e=>{t&&"Escape"===e.key&&M()}),onBlur:(0,m.v0)(e.onBlur,e=>{let t=k(e),r=_(L.current,t),o=_(G.current,t);S&&n&&!r&&!o&&M()}),"aria-labelledby":B?$:void 0,"aria-describedby":F?J:void 0};return x===C.hover&&(o.role="tooltip",o.onMouseEnter=(0,m.v0)(e.onMouseEnter,()=>{I.current=!0}),o.onMouseLeave=(0,m.v0)(e.onMouseLeave,e=>{null!==e.nativeEvent.relatedTarget&&(I.current=!1,setTimeout(()=>M(),E))})),o},[en,V,B,$,F,J,x,t,M,S,n,E,b,w]),er=(0,y.useCallback)((e={},n=null)=>Q({...e,style:{visibility:S?"visible":"hidden",...e.style}},n),[S,Q]),eo=(0,y.useCallback)((e,n=null)=>({...e,ref:(0,f.lq)(n,q,W)}),[q,W]),ei=(0,y.useRef)(),eu=(0,y.useRef)(),el=(0,y.useCallback)(e=>{null==q.current&&W(e)},[W]),ea=(0,y.useCallback)((e={},t=null)=>{let r={...e,ref:(0,f.lq)(G,t,el),id:U,"aria-haspopup":"dialog","aria-expanded":S,"aria-controls":V};return x===C.click&&(r.onClick=(0,m.v0)(e.onClick,R)),x===C.hover&&(r.onFocus=(0,m.v0)(e.onFocus,()=>{void 0===ei.current&&j()}),r.onBlur=(0,m.v0)(e.onBlur,e=>{let t=k(e),r=!_(L.current,t);S&&n&&r&&M()}),r.onKeyDown=(0,m.v0)(e.onKeyDown,e=>{"Escape"===e.key&&M()}),r.onMouseEnter=(0,m.v0)(e.onMouseEnter,()=>{I.current=!0,ei.current=window.setTimeout(()=>j(),g)}),r.onMouseLeave=(0,m.v0)(e.onMouseLeave,()=>{I.current=!1,ei.current&&(clearTimeout(ei.current),ei.current=void 0),eu.current=window.setTimeout(()=>{!1===I.current&&M()},E)})),r},[U,S,V,x,el,R,j,n,M,g,E]);(0,y.useEffect)(()=>()=>{ei.current&&clearTimeout(ei.current),eu.current&&clearTimeout(eu.current)},[]);let ec=(0,y.useCallback)((e={},n=null)=>({...e,id:$,ref:(0,f.lq)(n,e=>{A(!!e)})}),[$]),es=(0,y.useCallback)((e={},n=null)=>({...e,id:J,ref:(0,f.lq)(n,e=>{z(!!e)})}),[J]);return{forceUpdate:Z,isOpen:S,onAnimationComplete:ee.onComplete,onClose:M,getAnchorProps:eo,getArrowProps:X,getArrowInnerProps:Y,getPopoverPositionerProps:er,getPopoverProps:et,getTriggerProps:ea,getHeaderProps:ec,getBodyProps:es}}({...i,direction:u.direction});return(0,E.jsx)(w.H2,{value:l,children:(0,E.jsx)(w.WG,{value:n,children:(0,m.Pu)(t,{isOpen:l.isOpen,onClose:l.onClose,forceUpdate:l.forceUpdate})})})}N.displayName="Popover"},6083:function(e,n,t){"use strict";t.d(n,{u:function(){return a}});var r=t(5904),o=t(3949),i=t(6554),u=t(5432),l=t(5893),a=(0,i.G)(function(e,n){let{onClose:t}=(0,r.lp)(),i=(0,r.SV)();return(0,l.jsx)(o.P,{size:"sm",onClick:t,className:(0,u.cx)("chakra-popover__close-btn",e.className),__css:i.closeButton,ref:n,...e})});a.displayName="PopoverCloseButton"},151:function(e,n,t){"use strict";t.d(n,{x:function(){return i}});var r=t(5904),o=t(7294);function i(e){let n=o.Children.only(e.children),{getTriggerProps:t}=(0,r.lp)();return(0,o.cloneElement)(n,t(n.props,n.ref))}i.displayName="PopoverTrigger"},5904:function(e,n,t){"use strict";t.d(n,{H2:function(){return o},SV:function(){return l},WG:function(){return u},lp:function(){return i}});var r=t(5227),[o,i]=(0,r.k)({name:"PopoverContext",errorMessage:"usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"}),[u,l]=(0,r.k)({name:"PopoverStylesContext",errorMessage:"usePopoverStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Popover />\" "})},9840:function(e,n,t){"use strict";t.d(n,{h:function(){return l}});var r=t(991),o=t(6554),i=t(6914),u=t(5893),l=(0,o.G)((e,n)=>{let t=(0,r.p)();return(0,u.jsx)(i.m.thead,{...e,ref:n,__css:t.thead})})},4693:function(e,n,t){"use strict";t.d(n,{Th:function(){return l}});var r=t(991),o=t(6554),i=t(6914),u=t(5893),l=(0,o.G)(({isNumeric:e,...n},t)=>{let o=(0,r.p)();return(0,u.jsx)(i.m.th,{...n,ref:t,__css:o.th,"data-is-numeric":e})})}},function(e){e.O(0,[776,815,489,774,888,179],function(){return e(e.s=4832)}),_N_E=e.O()}]);
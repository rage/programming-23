(self.webpackChunkohjelmoinnin_mooc=self.webpackChunkohjelmoinnin_mooc||[]).push([[975],{22702:function(e,t,o){"use strict";o.d(t,{Z:function(){return y}});var a=o(22122),n=o(81253),r=o(67294),i=o(85505),l=o(49044),c=o(6018),d=(0,c.Z)(r.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),s=(0,c.Z)(r.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),u=o(37595),p=(0,c.Z)(r.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),m=o(81664),h=o(34621),f=r.createElement(s,null),v=r.createElement(d,null),g=r.createElement(p,null),b=r.forwardRef((function(e,t){var o=e.checkedIcon,c=void 0===o?f:o,d=e.classes,s=e.color,u=void 0===s?"secondary":s,p=e.icon,h=void 0===p?v:p,b=e.indeterminate,y=void 0!==b&&b,Z=e.indeterminateIcon,k=void 0===Z?g:Z,C=e.inputProps,x=e.size,E=void 0===x?"medium":x,I=(0,n.Z)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),w=y?k:h,S=y?k:c;return r.createElement(l.Z,(0,a.Z)({type:"checkbox",classes:{root:(0,i.Z)(d.root,d["color".concat((0,m.Z)(u))],y&&d.indeterminate),checked:d.checked,disabled:d.disabled},color:u,inputProps:(0,a.Z)({"data-indeterminate":y},C),icon:r.cloneElement(w,{fontSize:void 0===w.props.fontSize&&"small"===E?E:w.props.fontSize}),checkedIcon:r.cloneElement(S,{fontSize:void 0===S.props.fontSize&&"small"===E?E:S.props.fontSize}),ref:t},I))})),y=(0,h.Z)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,u.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,u.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(b)},48086:function(e,t,o){"use strict";var a=o(22122),n=o(81253),r=o(67294),i=o(85505),l=o(68725),c=o(34621),d=o(80453),s=o(81664),u=r.forwardRef((function(e,t){e.checked;var o=e.classes,c=e.className,u=e.control,p=e.disabled,m=(e.inputRef,e.label),h=e.labelPlacement,f=void 0===h?"end":h,v=(e.name,e.onChange,e.value,(0,n.Z)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),g=(0,l.Z)(),b=p;void 0===b&&void 0!==u.props.disabled&&(b=u.props.disabled),void 0===b&&g&&(b=g.disabled);var y={disabled:b};return["checked","name","onChange","value","inputRef"].forEach((function(t){void 0===u.props[t]&&void 0!==e[t]&&(y[t]=e[t])})),r.createElement("label",(0,a.Z)({className:(0,i.Z)(o.root,c,"end"!==f&&o["labelPlacement".concat((0,s.Z)(f))],b&&o.disabled),ref:t},v),r.cloneElement(u,y),r.createElement(d.Z,{component:"span",className:(0,i.Z)(o.label,b&&o.disabled)},m))}));t.Z=(0,c.Z)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(u)},23729:function(e,t,o){"use strict";var a=o(22122),n=o(81253),r=o(67294),i=o(85505),l=o(34621),c=o(37595),d=o(67055),s=o(81664),u=r.forwardRef((function(e,t){var o=e.edge,l=void 0!==o&&o,c=e.children,u=e.classes,p=e.className,m=e.color,h=void 0===m?"default":m,f=e.disabled,v=void 0!==f&&f,g=e.disableFocusRipple,b=void 0!==g&&g,y=e.size,Z=void 0===y?"medium":y,k=(0,n.Z)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return r.createElement(d.Z,(0,a.Z)({className:(0,i.Z)(u.root,p,"default"!==h&&u["color".concat((0,s.Z)(h))],v&&u.disabled,"small"===Z&&u["size".concat((0,s.Z)(Z))],{start:u.edgeStart,end:u.edgeEnd}[l]),centerRipple:!0,focusRipple:!b,disabled:v,ref:t},k),r.createElement("span",{className:u.label},c))}));t.Z=(0,l.Z)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:(0,c.U1)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,c.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,c.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(u)},90058:function(e,t,o){"use strict";o.d(t,{Z:function(){return b}});var a=o(81253),n=o(96156),r=o(22122),i=o(67294),l=o(85505),c=o(34621),d=o(67055),s=o(61008),u=o(11291),p=o(38582),m=o(73935),h="undefined"==typeof window?i.useEffect:i.useLayoutEffect,f=i.forwardRef((function(e,t){var o=e.alignItems,n=void 0===o?"center":o,c=e.autoFocus,f=void 0!==c&&c,v=e.button,g=void 0!==v&&v,b=e.children,y=e.classes,Z=e.className,k=e.component,C=e.ContainerComponent,x=void 0===C?"li":C,E=e.ContainerProps,I=(E=void 0===E?{}:E).className,w=(0,a.Z)(E,["className"]),S=e.dense,R=void 0!==S&&S,z=e.disabled,N=void 0!==z&&z,B=e.disableGutters,P=void 0!==B&&B,M=e.divider,$=void 0!==M&&M,F=e.focusVisibleClassName,L=e.selected,O=void 0!==L&&L,A=(0,a.Z)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),V=i.useContext(p.Z),H={dense:R||V.dense||!1,alignItems:n},T=i.useRef(null);h((function(){f&&T.current&&T.current.focus()}),[f]);var D=i.Children.toArray(b),U=D.length&&(0,s.Z)(D[D.length-1],["ListItemSecondaryAction"]),G=i.useCallback((function(e){T.current=m.findDOMNode(e)}),[]),W=(0,u.Z)(G,t),j=(0,r.Z)({className:(0,l.Z)(y.root,Z,H.dense&&y.dense,!P&&y.gutters,$&&y.divider,N&&y.disabled,g&&y.button,"center"!==n&&y.alignItemsFlexStart,U&&y.secondaryAction,O&&y.selected),disabled:N},A),q=k||"li";return g&&(j.component=k||"div",j.focusVisibleClassName=(0,l.Z)(y.focusVisible,F),q=d.Z),U?(q=j.component||k?q:"div","li"===x&&("li"===q?q="div":"li"===j.component&&(j.component="div")),i.createElement(p.Z.Provider,{value:H},i.createElement(x,(0,r.Z)({className:(0,l.Z)(y.container,I),ref:W},w),i.createElement(q,j,D),D.pop()))):i.createElement(p.Z.Provider,{value:H},i.createElement(q,(0,r.Z)({ref:W},j),D))})),v=(0,c.Z)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(f),g=i.forwardRef((function(e,t){var o,n=e.classes,c=e.className,d=e.component,s=void 0===d?"li":d,u=e.disableGutters,p=void 0!==u&&u,m=e.ListItemClasses,h=e.role,f=void 0===h?"menuitem":h,g=e.selected,b=e.tabIndex,y=(0,a.Z)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(o=void 0!==b?b:-1),i.createElement(v,(0,r.Z)({button:!0,role:f,tabIndex:o,component:s,selected:g,disableGutters:p,classes:(0,r.Z)({dense:n.dense},m),className:(0,l.Z)(n.root,c,g&&n.selected,!p&&n.gutters),ref:t},y))})),b=(0,c.Z)((function(e){return{root:(0,r.Z)({},e.typography.body1,(0,n.Z)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:(0,r.Z)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(g)},87198:function(e,t,o){"use strict";o.d(t,{Z:function(){return Z}});var a=o(22122),n=o(81253),r=o(67294),i=o(85505),l=o(49044),c=o(6018),d=(0,c.Z)(r.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),s=(0,c.Z)(r.createElement("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),u=o(34621);var p=(0,u.Z)((function(e){return{root:{position:"relative",display:"flex","&$checked $layer":{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}},layer:{left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},checked:{}}}),{name:"PrivateRadioButtonIcon"})((function(e){var t=e.checked,o=e.classes,a=e.fontSize;return r.createElement("div",{className:(0,i.Z)(o.root,t&&o.checked)},r.createElement(d,{fontSize:a}),r.createElement(s,{fontSize:a,className:o.layer}))})),m=o(37595),h=o(81664),f=o(88231),v=o(98358);var g=r.createElement(p,{checked:!0}),b=r.createElement(p,null),y=r.forwardRef((function(e,t){var o=e.checked,c=e.classes,d=e.color,s=void 0===d?"secondary":d,u=e.name,p=e.onChange,m=e.size,y=void 0===m?"medium":m,Z=(0,n.Z)(e,["checked","classes","color","name","onChange","size"]),k=r.useContext(v.Z),C=o,x=(0,f.Z)(p,k&&k.onChange),E=u;return k&&(void 0===C&&(C=k.value===e.value),void 0===E&&(E=k.name)),r.createElement(l.Z,(0,a.Z)({color:s,type:"radio",icon:r.cloneElement(b,{fontSize:"small"===y?"small":"default"}),checkedIcon:r.cloneElement(g,{fontSize:"small"===y?"small":"default"}),classes:{root:(0,i.Z)(c.root,c["color".concat((0,h.Z)(s))]),checked:c.checked,disabled:c.disabled},name:E,checked:C,onChange:x,ref:t},Z))})),Z=(0,u.Z)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,m.U1)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,m.U1)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiRadio"})(y)},92206:function(e,t,o){"use strict";o.d(t,{Z:function(){return f}});var a=o(22122),n=o(28481),r=o(81253),i=o(67294),l=o(85505),c=o(34621),d=i.forwardRef((function(e,t){var o=e.classes,n=e.className,c=e.row,d=void 0!==c&&c,s=(0,r.Z)(e,["classes","className","row"]);return i.createElement("div",(0,a.Z)({className:(0,l.Z)(o.root,n,d&&o.row),ref:t},s))})),s=(0,c.Z)({root:{display:"flex",flexDirection:"column",flexWrap:"wrap"},row:{flexDirection:"row"}},{name:"MuiFormGroup"})(d),u=o(11291),p=o(12933),m=o(98358),h=o(15126),f=i.forwardRef((function(e,t){var o=e.actions,l=e.children,c=e.name,d=e.value,f=e.onChange,v=(0,r.Z)(e,["actions","children","name","value","onChange"]),g=i.useRef(null),b=(0,p.Z)({controlled:d,default:e.defaultValue,name:"RadioGroup"}),y=(0,n.Z)(b,2),Z=y[0],k=y[1];i.useImperativeHandle(o,(function(){return{focus:function(){var e=g.current.querySelector("input:not(:disabled):checked");e||(e=g.current.querySelector("input:not(:disabled)")),e&&e.focus()}}}),[]);var C=(0,u.Z)(t,g),x=(0,h.Z)(c);return i.createElement(m.Z.Provider,{value:{name:x,onChange:function(e){k(e.target.value),f&&f(e,e.target.value)},value:Z}},i.createElement(s,(0,a.Z)({role:"radiogroup",ref:C},v),l))}))},98358:function(e,t,o){"use strict";var a=o(67294).createContext();t.Z=a},80453:function(e,t,o){"use strict";var a=o(22122),n=o(81253),r=o(67294),i=o(85505),l=o(34621),c=o(81664),d={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p"},s=r.forwardRef((function(e,t){var o=e.align,l=void 0===o?"inherit":o,s=e.classes,u=e.className,p=e.color,m=void 0===p?"initial":p,h=e.component,f=e.display,v=void 0===f?"initial":f,g=e.gutterBottom,b=void 0!==g&&g,y=e.noWrap,Z=void 0!==y&&y,k=e.paragraph,C=void 0!==k&&k,x=e.variant,E=void 0===x?"body1":x,I=e.variantMapping,w=void 0===I?d:I,S=(0,n.Z)(e,["align","classes","className","color","component","display","gutterBottom","noWrap","paragraph","variant","variantMapping"]),R=h||(C?"p":w[E]||d[E])||"span";return r.createElement(R,(0,a.Z)({className:(0,i.Z)(s.root,u,"inherit"!==E&&s[E],"initial"!==m&&s["color".concat((0,c.Z)(m))],Z&&s.noWrap,b&&s.gutterBottom,C&&s.paragraph,"inherit"!==l&&s["align".concat((0,c.Z)(l))],"initial"!==v&&s["display".concat((0,c.Z)(v))]),ref:t},S))}));t.Z=(0,l.Z)((function(e){return{root:{margin:0},body2:e.typography.body2,body1:e.typography.body1,caption:e.typography.caption,button:e.typography.button,h1:e.typography.h1,h2:e.typography.h2,h3:e.typography.h3,h4:e.typography.h4,h5:e.typography.h5,h6:e.typography.h6,subtitle1:e.typography.subtitle1,subtitle2:e.typography.subtitle2,overline:e.typography.overline,srOnly:{position:"absolute",height:1,width:1,overflow:"hidden"},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},alignJustify:{textAlign:"justify"},noWrap:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},gutterBottom:{marginBottom:"0.35em"},paragraph:{marginBottom:16},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorTextPrimary:{color:e.palette.text.primary},colorTextSecondary:{color:e.palette.text.secondary},colorError:{color:e.palette.error.main},displayInline:{display:"inline"},displayBlock:{display:"block"}}}),{name:"MuiTypography"})(s)},49044:function(e,t,o){"use strict";var a=o(22122),n=o(28481),r=o(81253),i=o(67294),l=o(85505),c=o(12933),d=o(68725),s=o(34621),u=o(23729),p=i.forwardRef((function(e,t){var o=e.autoFocus,s=e.checked,p=e.checkedIcon,m=e.classes,h=e.className,f=e.defaultChecked,v=e.disabled,g=e.icon,b=e.id,y=e.inputProps,Z=e.inputRef,k=e.name,C=e.onBlur,x=e.onChange,E=e.onFocus,I=e.readOnly,w=e.required,S=e.tabIndex,R=e.type,z=e.value,N=(0,r.Z)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),B=(0,c.Z)({controlled:s,default:Boolean(f),name:"SwitchBase",state:"checked"}),P=(0,n.Z)(B,2),M=P[0],$=P[1],F=(0,d.Z)(),L=v;F&&void 0===L&&(L=F.disabled);var O="checkbox"===R||"radio"===R;return i.createElement(u.Z,(0,a.Z)({component:"span",className:(0,l.Z)(m.root,h,M&&m.checked,L&&m.disabled),disabled:L,tabIndex:null,role:void 0,onFocus:function(e){E&&E(e),F&&F.onFocus&&F.onFocus(e)},onBlur:function(e){C&&C(e),F&&F.onBlur&&F.onBlur(e)},ref:t},N),i.createElement("input",(0,a.Z)({autoFocus:o,checked:s,defaultChecked:f,className:m.input,disabled:L,id:O&&b,name:k,onChange:function(e){var t=e.target.checked;$(t),x&&x(e,t)},readOnly:I,ref:Z,required:w,tabIndex:S,type:R,value:z},y)),M?p:g)}));t.Z=(0,s.Z)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(p)},15126:function(e,t,o){"use strict";o.d(t,{Z:function(){return n}});var a=o(67294);function n(e){var t=a.useState(e),o=t[0],n=t[1],r=e||o;return a.useEffect((function(){null==o&&n("mui-".concat(Math.round(1e5*Math.random())))}),[o]),r}}}]);
//# sourceMappingURL=8536b526e15da5462f650a580b79ed0a385338f6-58dfc299b984e2a74b0b.js.map
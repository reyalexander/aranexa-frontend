(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[144],{4875:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var r=n(8307),s=n(29),a=n(4687),i=n.n(a),o=n(6312),c=n(9332),l=n(7294),d=n(7536),m=n(887),u=n(5587),x=n(4686),p=n(5893);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e){var t=e.id,n=e.index,r=(0,u.nB)({id:t}),s=r.attributes,a=r.listeners,i=r.setNodeRef,o=r.transform,c=r.transition,l=r.isDragging,d={transform:x.ux.Translate.toString(o),transition:c,opacity:l?.7:1};return(0,p.jsxs)("div",b(b(b({ref:i,style:d},s),a),{},{className:"flex items-center space-x-3 rounded bg-zinc-800 px-3 py-2",children:[(0,p.jsx)("div",{className:"cursor-grab select-none text-gray-300",children:(0,p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"size-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8 9h.01M8 15h.01M12 9h.01M12 15h.01M16 9h.01M16 15h.01"})})}),(0,p.jsx)("span",{className:"inline-block rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white",children:n+1}),(0,p.jsx)("span",{className:"flex-1",children:t})]}))}function h(e){var t=e.items,n=e.onChange,r=(0,m.Dy)((0,m.VT)(m.we));return(0,p.jsx)(m.LB,{sensors:r,collisionDetection:m.pE,onDragEnd:function(e){var r=e.active,s=e.over;if(s&&r.id!==s.id){var a=t.indexOf(r.id),i=t.indexOf(s.id);n((0,u.Rp)(t,a,i))}},children:(0,p.jsx)(u.Fo,{items:t,strategy:u.qw,children:(0,p.jsx)("div",{className:"space-y-2",children:t.map(function(e,t){return(0,p.jsx)(f,{id:e,index:t},e)})})})})}var j=n(1604),y=j.z.object({brand_information:j.z.string().min(4,"Los datos de la empresa son obligatorios."),brand_name_registered:j.z.number().optional(),currently_present_media:j.z.array(j.z.string()).optional(),goals_achieve:j.z.array(j.z.string()).optional(),digital_media:j.z.coerce.number().optional()});function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _(){var e,t,n=(0,l.useState)(!1),r=n[0],a=n[1],m=(0,l.useState)(null),u=m[0],x=m[1],g=(0,l.useState)(!1),b=g[0],f=g[1],j=(0,c.useRouter)(),v=(0,d.cI)({resolver:(0,o.F)(y),defaultValues:{brand_information:"",brand_name_registered:void 0,currently_present_media:[],goals_achieve:["Establecerme como referente en mi mercado (reputaci\xf3n)","Conectar con mi comunidad","Concientizar sobre un tema social","Hacer m\xe1s conocido a mi producto/servicio","Mayores ventas","Ampliar mi alcance, llegar a nuevos sectores"]}}),_=v.register,O=v.handleSubmit,w=v.watch,k=v.setValue,P=v.formState.errors,E=null!==(t=w("goals_achieve"))&&void 0!==t?t:[],z=(e=(0,s.Z)(i().mark(function e(t){var n,r,s;return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(!0),x(null),n=localStorage.getItem("accountId"),r=N(N({},t),{},{account_id:n?parseInt(n,10):null}),e.next=7,fetch("http://3.133.157.177:8002/api/v1/company/company_brand/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});case 7:if((s=e.sent).ok){e.next=13;break}return e.next=11,s.json();case 11:throw Error(e.sent.detail||"Error al guardar la informaci\xf3n");case 13:f(!0),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),x("Error: ".concat(e.t0.message));case 19:return e.prev=19,a(!1),e.finish(19);case 22:case"end":return e.stop()}},e,null,[[0,16,19,22]])})),function(t){return e.apply(this,arguments)});return(0,p.jsxs)("div",{className:"mx-auto mt-10 max-w-xl rounded bg-zinc-900 p-6 text-gray-100 shadow-md",children:[(0,p.jsx)("h1",{className:"mb-4 text-2xl font-bold",children:"Datos de mi marca"}),u&&(0,p.jsx)("p",{className:"mb-4 text-sm ".concat(u.startsWith("Error")?"text-red-500":"text-green-600"),children:u}),(0,p.jsxs)("form",{onSubmit:O(z),className:"space-y-4",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{className:"mb-1 block text-sm font-semibold",children:"Nombre Comercial"}),(0,p.jsx)("input",N({type:"text",className:"w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"},_("brand_information"))),P.brand_information&&(0,p.jsx)("p",{className:"mt-1 text-xs text-red-500",children:P.brand_information.message})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{className:"mb-1 block text-sm font-medium",children:"El nombre de mi marca est\xe1 registrada legalmente"}),(0,p.jsxs)("select",N(N({className:"w-full rounded border-none bg-zinc-800 p-2 focus:ring-2 focus:ring-indigo-500"},_("brand_name_registered",{valueAsNumber:!0})),{},{children:[(0,p.jsx)("option",{value:"",children:"Seleccionar"}),(0,p.jsx)("option",{value:1,children:"S\xed"}),(0,p.jsx)("option",{value:2,children:"No"}),(0,p.jsx)("option",{value:3,children:"Prefiero no decirlo"})]})),P.brand_name_registered&&(0,p.jsx)("p",{className:"text-sm text-red-500",children:P.brand_name_registered.message})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h2",{className:"mb-2 text-sm font-semibold",children:"Actualmente tengo presencia en los siguientes medios:"}),(0,p.jsx)("label",{className:"mb-1 block text-xs font-light text-gray-500",children:"Escoge todas las que apliquen."}),(0,p.jsx)("div",{className:"space-y-2",children:["Espacio f\xedsico (oficina, tienda, consultorio, etc.)","Facebook","Instagram","Tiktok","LinkedIn","Whatsapp","Twitter (X)","P\xe1gina Web","Llamada telef\xf3nica","Otros"].map(function(e){return(0,p.jsxs)("label",{className:"flex items-center space-x-2",children:[(0,p.jsx)("input",N(N({type:"checkbox",value:e},_("currently_present_media")),{},{className:"size-4 rounded border-gray-400 bg-zinc-800 text-indigo-600 focus:ring-indigo-500"})),(0,p.jsx)("span",{className:"text-sm",children:e})]},e)})}),P.currently_present_media&&(0,p.jsx)("p",{className:"mt-1 text-xs text-red-500",children:P.currently_present_media.message})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{className:"text-lg font-bold",children:"Mis metas a conseguir son"}),(0,p.jsx)("p",{className:"text-sm text-gray-400",children:"Ordena las siguientes opciones seg\xfan prioridad (1 = m\xe1s importante)"}),(0,p.jsx)(h,{items:E,onChange:function(e){k("goals_achieve",e,{shouldValidate:!0})}}),P.goals_achieve&&(0,p.jsx)("p",{className:"mt-1 text-sm text-red-500",children:P.goals_achieve.message})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{className:"text-lg font-bold",children:"\xbfLos medios digitales/f\xedsicos en los que tengo presencia me est\xe1n ayudando a conseguir mis metas?"}),(0,p.jsx)("p",{className:"text-sm text-gray-400",children:"Selecciona 1 si no lo estoy consiguiendo, 5 si lo estoy logrando."}),(0,p.jsx)("div",{className:"mt-2 flex space-x-4",children:[1,2,3,4,5].map(function(e){return(0,p.jsxs)("label",{className:"flex cursor-pointer flex-col items-center",children:[(0,p.jsx)("input",N(N({type:"radio",value:e},_("digital_media",{valueAsNumber:!0})),{},{className:"mb-1 size-4 text-indigo-600 focus:ring-indigo-500"})),(0,p.jsx)("span",{className:"text-sm",children:e})]},e)})}),P.digital_media&&(0,p.jsx)("p",{className:"mt-1 text-sm text-red-500",children:P.digital_media.message})]}),(0,p.jsx)("button",{type:"submit",disabled:r,className:"flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50",children:r?"Enviando...":"Continuar"})]}),b&&(0,p.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",children:(0,p.jsxs)("div",{className:"w-full max-w-sm rounded bg-white p-6 text-gray-800 shadow-lg",children:[(0,p.jsx)("h3",{className:"mb-2 text-xl font-bold",children:"\xa1Datos Guardados!"}),(0,p.jsx)("p",{className:"mb-4 text-sm",children:"La informaci\xf3n de la marca de tu empresa se guard\xf3 correctamente."}),(0,p.jsx)("button",{onClick:function(){f(!1),j.push("/product-form")},className:"rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700",children:"Continuar"})]})})]})}},1413:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/company-brand",function(){return n(4875)}])}},function(e){e.O(0,[192,332,587,888,774,179],function(){return e(e.s=1413)}),_N_E=e.O()}]);
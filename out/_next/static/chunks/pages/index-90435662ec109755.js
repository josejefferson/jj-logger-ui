(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{37113:function(m,d,a){"use strict";a.r(d),a.d(d,{default:function(){return aj}});var n=a(72640),o=a(67294),f=a(9008),p=a.n(f),q=a(37690),r=a(71927),g=a(26295),s=(0,g.Z)({palette:{mode:"dark"},components:{MUIDataTableBodyCell:{styleOverrides:{root:{padding:"3px 10px",wordBreak:"break-all"}}},MUIDataTableToolbar:{styleOverrides:{filterPaper:{"@media (max-width: 450px)":{width:"100vw !important",left:"0 !important",top:"0 !important",maxWidth:"100vw !important"},"@media (min-width: 451px)":{minWidth:"450px !important"}}}}}}),t={body:{noMatch:"Nenhum log",toolTip:"Ordenar",columnHeaderTooltip:function(a){return"Ordenar por ".concat(a.label)}},pagination:{next:"Pr\xf3xima p\xe1gina",previous:"P\xe1gina anterior",rowsPerPage:"Logs por p\xe1gina:",displayRows:"de"},toolbar:{search:"Pesquisar",downloadCsv:"Baixar CSV",print:"Imprimir",viewColumns:"Colunas vis\xedveis",filterTable:"Filtrar tabela",adjustColumnWidth:"Ajustar largura das colunas",refresh:"Atualizar logs",downloadJson:"Baixar JSON",uploadJson:"Importar logs de JSON",dbFilter:"Filtros em JSON do banco de dados",settings:"Configurar servidor"},filter:{all:"Todos",title:"FILTROS",reset:"REDEFINIR",apply:"Filtrar",dateTime:"Data/hora",before:"Antes de",after:"Depois de"},viewColumns:{title:"Colunas vis\xedveis",titleAria:"Exibir/Ocultar colunas da tabela"},selectedRows:{text:"linha(s) selecionadas",delete:"Excluir",deleteAria:"Excluir linhas selecionadas"},dbFilter:{dialogTitle:"Filtros JSON do banco de dados",dialogTextFieldLabel:"JSON",dialogButtonCancel:"Cancelar",dialogButtonOK:"OK",dialogReset:"Redefinir para o padr\xe3o",dialogSave:"Salvar como padr\xe3o",dialogClear:"Limpar filtros"},settings:{dialogTitle:"Configurar servidor",dialogTextFieldURL:"URL do servidor",dialogTextFieldUsername:"Nome de usu\xe1rio (opcional)",dialogTextFieldPassword:"Senha (opcional)",dialogButtonCancel:"Cancelar",dialogButtonOK:"OK",dialogReset:"Redefinir para o padr\xe3o",dialogSave:"Salvar como padr\xe3o",dialogClear:"Limpar filtros"}},u=a(50029),h=a(87794),v=a.n(h),i=a(9669),w=a.n(i),c=a(81458),b=a(85893),x={date:(0,b.jsx)(c.Z,{}),level:(0,b.jsx)(c.Z,{}),info:(0,b.jsx)(c.Z,{}),title:(0,b.jsx)(c.Z,{}),code:(0,b.jsx)(c.Z,{}),contents:(0,b.jsx)(c.Z,{}),details:(0,b.jsx)(c.Z,{})},y={date:(0,b.jsx)("span",{children:"-"}),level:"ERROR",title:(0,b.jsx)("span",{children:"Erro"}),contents:(0,b.jsx)("span",{children:"Ocorreu um erro ao baixar os logs"}),details:(0,b.jsx)("span",{children:"Atualize para tentar novamente"})};function z(a,b){return A.apply(this,arguments)}function A(){return(A=(0,u.Z)(v().mark(function a(b,c){var d,e,f,g,h;return v().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b([x]),d=localStorage.getItem("logs.settings.serverURL"),e=localStorage.getItem("logs.settings.serverUsername"),f=localStorage.getItem("logs.settings.serverPassword"),a.next=6,w().get(d||"./data",{auth:e&&f?{username:e,password:f}:void 0,params:{q:c||localStorage.getItem("logs.dbFilter")||"{}"}}).catch(function(a){return console.error(a),{data:[y]}});case 6:b(h=(g=a.sent).data);case 9:case"end":return a.stop()}},a)}))).apply(this,arguments)}var B=a(59499),j=a(27484),e=a.n(j),k=a(84110),l=a.n(k);a(57548);var C=a(32286),D=a(97717),E=a(41208),F=a(79332),G=a(53640),H=a(70785),I=a(40476),J=a(60076),K={customFilterListOptions:{render:function(a){return a[0]&&a[1]?["".concat(t.filter.after,": ").concat(new Date(a[0]).toLocaleString()),"".concat(t.filter.before,": ").concat(new Date(a[1]).toLocaleString())]:a[0]?"".concat(t.filter.after,": ").concat(new Date(a[0]).toLocaleString()):a[1]?"".concat(t.filter.before,": ").concat(new Date(a[1]).toLocaleString()):[]},update:function(b,a,c){return 0===a?b[c].splice(a,1,""):1===a?b[c].splice(a,1):-1===a&&(b[c]=[]),b}},filterOptions:{names:[],logic:function(g,e,f){var d=(0,n.Z)(e,2),a=d[0],b=d[1],c=new Date(f[0]);return a&&b?!(c>new Date(a)&&c<new Date(b)):a?!(c>new Date(a)):!!b&&!(c<new Date(b))},display:function(a,d,c,e){return(0,b.jsxs)("div",{children:[(0,b.jsx)(I.Z,{children:t.filter.dateTime}),(0,b.jsxs)(H.Z,{row:!0,children:[(0,b.jsxs)(G.Z,{sx:{m:1,width:"25ch"},variant:"standard",children:[(0,b.jsx)(J.Z,{shrink:!0,htmlFor:"filter-date-after",children:t.filter.after}),(0,b.jsx)(F.Z,{id:"filter-date-after",type:"datetime-local",value:a[c][0]||"",onChange:function(b){a[c][0]=b.target.value,d(a[c],c,e)}})]}),(0,b.jsxs)(G.Z,{sx:{m:1,width:"25ch"},variant:"standard",children:[(0,b.jsx)(J.Z,{shrink:!0,htmlFor:"filter-date-before",children:t.filter.before}),(0,b.jsx)(F.Z,{id:"filter-date-before",type:"datetime-local",value:a[c][1]||"",onChange:function(b){a[c][1]=b.target.value,d(a[c],c,e)}})]})]})]})}}};function L(a){var c=a.level,d=a.children;return(0,b.jsx)("div",{style:{backgroundColor:{SUCCESS:"#198754",WARNING:"#ffc107",ERROR:"#dc3545",INFO:"#0d6efd",DEBUG:"#111111"}[c],color:"white",borderRadius:"1000px",padding:"5px 10px",textAlign:"center",fontWeight:"bold",fontSize:"10px"},children:d})}function M(c){var a=c.color;return(0,b.jsx)("div",{title:a,style:{backgroundColor:{black:"#000000",red:"#842029",green:"#0f5132",yellow:"#997404",blue:"#084298",magenta:"#432874",cyan:"#087990",white:"#dddddd",blackBright:"#6c757d",gray:"#6c757d",grey:"#6c757d",redBright:"#dc3545",greenBright:"#198754",yellowBright:"#ffc107",blueBright:"#0d6efd",magentaBright:"#6f42c1",cyanBright:"#0dcaf0",whiteBright:"#ffffff"}[a],borderRadius:"50%",width:"24px",height:"24px",border:"white 2px solid",display:"inline-block",marginLeft:"4px"}})}function N(c,d){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(c);d&&(b=b.filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable})),a.push.apply(a,b)}return a}function O(c){for(var a=1;a<arguments.length;a++){var b=null!=arguments[a]?arguments[a]:{};a%2?N(Object(b),!0).forEach(function(a){(0,B.Z)(c,a,b[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(b)):N(Object(b)).forEach(function(a){Object.defineProperty(c,a,Object.getOwnPropertyDescriptor(b,a))})}return c}e().locale("pt-br"),e().extend(l());var P=a(42992),Q=a(54799),R=a(52789),S=a(54970),T=a(13505),U=a(23365),V=a(1849),W=a(50657),X=a(31425),Y=a(6514),Z=a(37645),$=a(76798),_=a(18571),aa=a(68162),ab=a(74663),ac=a(34282),ad=a(27971);function ae(f){var m=f.fetchData,g=o.useState(!1),c=(0,n.Z)(g,2),h=c[0],p=c[1],i=o.useState(),d=(0,n.Z)(i,2),j=d[0],q=d[1],k=o.useState(!1),e=(0,n.Z)(k,2),l=e[0],r=e[1];o.useEffect(function(){q(localStorage.getItem("logs.dbFilter")||"{}")},[]);var a=function(){try{var a=JSON.parse(j);return"object"==typeof a}catch(b){return!1}};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(R.Z,{title:t.toolbar.dbFilter,disableFocusListener:!0,children:(0,b.jsx)(Q.Z,{"aria-label":t.toolbar.dbFilter,onClick:function(){return p(!0)},children:(0,b.jsx)(aa.Z,{})})}),(0,b.jsxs)(W.Z,{open:h,onClose:function(){return p(!1)},children:[(0,b.jsx)(Z.Z,{children:t.dbFilter.dialogTitle}),(0,b.jsxs)(Y.Z,{children:[(0,b.jsx)(_.Z,{autoFocus:!0,error:!a(),fullWidth:!0,helperText:!a()&&"JSON inv\xe1lido",InputProps:{style:{fontFamily:"monospace"}},label:t.dbFilter.dialogTextFieldLabel,margin:"dense",multiline:!0,onChange:function(a){return q(a.target.value)},rows:4,sx:{mb:2},value:j,variant:"filled"}),(0,b.jsx)(P.Z,{fullWidth:!0,onClick:function(){q(localStorage.getItem("logs.dbFilter")||"{}")},startIcon:(0,b.jsx)(ab.Z,{}),children:t.dbFilter.dialogReset}),(0,b.jsx)(P.Z,{fullWidth:!0,onClick:function(){a()&&(localStorage.setItem("logs.dbFilter",j),r(!0))},startIcon:(0,b.jsx)(ad.Z,{}),disabled:!a(),children:t.dbFilter.dialogSave}),(0,b.jsx)(P.Z,{fullWidth:!0,onClick:function(){q("{}")},startIcon:(0,b.jsx)(ac.Z,{}),children:t.dbFilter.dialogClear})]}),(0,b.jsxs)(X.Z,{children:[(0,b.jsx)(P.Z,{onClick:function(){p(!1)},children:t.dbFilter.dialogButtonCancel}),(0,b.jsx)(P.Z,{onClick:function(){p(!1),m(j)},disabled:!a(),children:t.dbFilter.dialogButtonOK})]})]}),(0,b.jsx)($.Z,{open:l,autoHideDuration:6e3,onClose:function(){return r(!1)},message:"Filtro padr\xe3o atualizado"})]})}var af=a(94229);function ag(g){var u=g.fetchData,h=o.useState(!1),a=(0,n.Z)(h,2),i=a[0],v=a[1],j=o.useState(!1),c=(0,n.Z)(j,2),k=c[0],w=c[1],l=o.useState(),d=(0,n.Z)(l,2),m=d[0],x=d[1],p=o.useState(),e=(0,n.Z)(p,2),q=e[0],y=e[1],r=o.useState(),f=(0,n.Z)(r,2),s=f[0],z=f[1];return o.useEffect(function(){x(localStorage.getItem("logs.settings.serverURL")||""),y(localStorage.getItem("logs.settings.serverUsername")||""),z(localStorage.getItem("logs.settings.serverPassword")||"")},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(R.Z,{title:t.toolbar.settings,disableFocusListener:!0,children:(0,b.jsx)(Q.Z,{"aria-label":t.toolbar.settings,onClick:function(){return v(!0)},children:(0,b.jsx)(af.Z,{})})}),(0,b.jsxs)(W.Z,{open:i,onClose:function(){return v(!1)},children:[(0,b.jsx)(Z.Z,{children:t.settings.dialogTitle}),(0,b.jsxs)(Y.Z,{children:[(0,b.jsx)(_.Z,{autoFocus:!0,fullWidth:!0,label:t.settings.dialogTextFieldURL,margin:"dense",onChange:function(a){return x(a.target.value)},sx:{mb:2},value:m}),(0,b.jsx)(_.Z,{fullWidth:!0,label:t.settings.dialogTextFieldUsername,margin:"none",onChange:function(a){return y(a.target.value)},size:"small",sx:{mb:2},value:q}),(0,b.jsx)(_.Z,{fullWidth:!0,label:t.settings.dialogTextFieldPassword,margin:"none",onChange:function(a){return z(a.target.value)},size:"small",sx:{mb:2},type:"password",value:s})]}),(0,b.jsxs)(X.Z,{children:[(0,b.jsx)(P.Z,{onClick:function(){v(!1)},children:t.settings.dialogButtonCancel}),(0,b.jsx)(P.Z,{onClick:function(){v(!1),localStorage.setItem("logs.settings.serverURL",m),localStorage.setItem("logs.settings.serverUsername",q),localStorage.setItem("logs.settings.serverPassword",s),m||localStorage.removeItem("logs.settings.serverURL"),q||localStorage.removeItem("logs.settings.serverUsername"),s||localStorage.removeItem("logs.settings.serverPassword"),u(),w(!0)},children:t.settings.dialogButtonOK})]})]}),(0,b.jsx)($.Z,{open:k,autoHideDuration:6e3,onClose:function(){return w(!1)},message:"Configura\xe7\xf5es do servidor atualizadas"})]})}function ah(){return(ah=(0,u.Z)(v().mark(function a(b){var c,d,e,f,g,h,i;return v().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c={types:[{description:"JSON",accept:{"application/json":[".json"]}}],multiple:!1},a.prev=1,a.next=4,window.showOpenFilePicker(c);case 4:return d=a.sent,f=(e=(0,n.Z)(d,1))[0],a.next=9,f.getFile();case 9:return g=a.sent,a.next=12,g.text();case 12:if(h=a.sent,a.prev=13,i=JSON.parse(h),Array.isArray(i)){a.next=17;break}throw Error("JSON content is not an Array");case 17:b(i),a.next=23;break;case 20:a.prev=20,a.t0=a.catch(13),alert("O conte\xfado do arquivo \xe9 inv\xe1lido");case 23:a.next=27;break;case 25:a.prev=25,a.t1=a.catch(1);case 27:case"end":return a.stop()}},a,null,[[1,25],[13,20]])}))).apply(this,arguments)}var ai=function(a){var c=a.setResizableColumns,d=a.resizableColumns,e=a.data,f=a.setData,g=a.fetchData;return function(){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(R.Z,{title:t.toolbar.adjustColumnWidth,disableFocusListener:!0,children:(0,b.jsx)("span",{className:"resize-columns-btn",children:(0,b.jsx)(Q.Z,{"aria-label":t.toolbar.adjustColumnWidth,onClick:function(){return c(!d)},children:(0,b.jsx)(U.Z,{style:{transform:"rotate(90deg)"}})})})}),(0,b.jsx)(R.Z,{title:t.toolbar.downloadJson,disableFocusListener:!0,children:(0,b.jsx)(Q.Z,{"aria-label":t.toolbar.downloadJson,onClick:function(){var f,c,d,b,a;return c=JSON.stringify(f=e),d=new Blob([c],{type:"octet/stream"}),b=URL.createObjectURL(d),a=document.createElement("a"),void(document.body.appendChild(a),a.style.display="none",a.href=b,a.download="logs-".concat(new Date().toISOString(),".json"),a.click(),URL.revokeObjectURL(b))},children:(0,b.jsx)(T.Z,{})})}),(0,b.jsx)(R.Z,{title:t.toolbar.uploadJson,disableFocusListener:!0,children:(0,b.jsx)(Q.Z,{"aria-label":t.toolbar.uploadJson,onClick:function(){return function(a){return ah.apply(this,arguments)}(f)},children:(0,b.jsx)(S.Z,{})})}),(0,b.jsx)(ae,{fetchData:function(a){return g(f,a)}}),(0,b.jsx)(ag,{fetchData:function(a){return g(f,a)}}),(0,b.jsx)(R.Z,{title:t.toolbar.refresh,disableFocusListener:!0,children:(0,b.jsx)(Q.Z,{"aria-label":t.toolbar.refresh,onClick:function(){return g(f)},children:(0,b.jsx)(V.Z,{})})})]})}},aj=function(){var h=o.useState([x]),c=(0,n.Z)(h,2),a=c[0],i=c[1],j=o.useState(!1),d=(0,n.Z)(j,2),f=d[0],k=d[1],l=o.useState(50),g=(0,n.Z)(l,2),m=g[0],w=g[1];o.useEffect(function(){z(i)},[]);var u,v=ai({setResizableColumns:k,resizableColumns:f,data:a,setData:i,fetchData:z});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p(),{children:(0,b.jsx)("title",{children:"Logs"})}),(0,b.jsx)(r.Z,{theme:s,children:(0,b.jsx)(q.ZP,{title:"Logs",className:"no-border-radius",data:a,columns:(u=a,[{label:"ID",name:"_id",options:{display:!1,filterType:"textField",setCellProps:function(){return{style:{whiteSpace:"nowrap"}}}}},{label:"Tempo",name:"date",options:{filterType:"custom",setCellProps:function(){return{style:{whiteSpace:"nowrap"}}},customBodyRenderLite:function(d){var c,a=null===(c=u[d])|| void 0===c?void 0:c.date;return isNaN(Number(new Date(a)))?a:(0,b.jsxs)("small",{children:[(0,b.jsx)("div",{children:e()(a).format("HH:mm:ss DD/MM/YY")}),(0,b.jsx)("div",{children:(0,b.jsx)("small",{children:e()(a).fromNow()})})]})},customFilterListOptions:K.customFilterListOptions,filterOptions:K.filterOptions}},{label:"N\xedvel",name:"level",filterList:["SUCCESS","ERROR","DEBUG","INFO","WARNING"],options:{setCellProps:function(){return{style:{whiteSpace:"nowrap"}}},customBodyRender:function(a){return void 0===a?(0,b.jsx)(b.Fragment,{}):(0,b.jsx)(L,{level:a,children:a})}}},{label:"T\xedtulo",name:"title",options:{setCellProps:function(){return{style:{whiteSpace:"nowrap"}}},customHeadLabelRender:function(a){return(0,b.jsx)("div",{style:{whiteSpace:"nowrap"},children:a.label})}}},{label:"C\xf3digo",name:"code",options:{display:!1}},{label:"Info",name:"info",options:{filter:!1,display:!1,setCellProps:function(){return{style:{whiteSpace:"nowrap"}}},customBodyRenderLite:function(a){if(o.isValidElement(null===(g=u[a])|| void 0===g?void 0:g.info))return u[a].info;var g,c,d,e=null===(c=u[a])|| void 0===c?void 0:c.hideProduction,f=null===(d=u[a])|| void 0===d?void 0:d.hideConsole;return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("span",{title:"Mostrado no modo de produ\xe7\xe3o",hidden:e,children:(0,b.jsx)(E.Z,{})}),(0,b.jsx)("span",{title:"Oculto do console",hidden:!f,children:(0,b.jsx)(D.Z,{style:{marginLeft:"4px"}})})]})}}},{label:"Cor",name:"color",options:{setCellProps:function(){return{style:{padding:"0"}}},customBodyRenderLite:function(a){if(o.isValidElement(null===(e=u[a])|| void 0===e?void 0:e.info))return u[a].info;var e,c,d=null===(c=u[a])|| void 0===c?void 0:c.color;return(0,b.jsx)(M,{color:d})}}},{label:"Conte\xfado",name:"contents",options:{filterType:"textField",customBodyRender:function(a){return void 0===a?(0,b.jsx)(b.Fragment,{}):Array.isArray(a)?a.map(function(a,c){return"object"==typeof a?(0,b.jsx)("span",{className:"content-cell-object",children:(0,b.jsx)(C.vu,{data:a,theme:O(O({},C.i6),{BASE_BACKGROUND_COLOR:"transparent"})},c)}):(0,b.jsx)("span",{className:"content-cell-text",title:a,children:a},c)}):a}}},{label:"Detalhes",name:"details",sort:!1,options:{setCellProps:function(){return{className:"details-cell"}},filterType:"textField",filterOptions:{names:[],logic:function(a,c){var b;try{a=JSON.stringify(a)}catch(d){}return!(null!==(b=a)&& void 0!==b?b:"").toString().includes(c[0])}},customBodyRenderLite:function(d){var c,a=null===(c=u[d])|| void 0===c?void 0:c.details;return void 0===a?(0,b.jsx)(b.Fragment,{}):o.isValidElement(a)?a:(0,b.jsx)(C.vu,{data:a,theme:O(O({},C.i6),{BASE_BACKGROUND_COLOR:"transparent"})})}}}]),options:{confirmFilters:!0,customFilterDialogFooter:function(c,a){return(0,b.jsx)("div",{style:{marginTop:"40px"},children:(0,b.jsx)(P.Z,{variant:"contained",onClick:a,children:t.filter.apply})})},customToolbar:v,download:!1,filterType:"multiselect",fixedHeader:!0,print:!1,resizableColumns:f,onChangeRowsPerPage:function(a){return w(a)},rowsPerPage:m,rowsPerPageOptions:[10,50,100,200,500,1e3],selectableRows:"none",sortOrder:{name:"date",direction:"desc"},tableBodyHeight:"calc(100vh - 64px - 53px)",textLabels:t}})})]})}},45728:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(37113)}])}},function(a){a.O(0,[641,774,888,179],function(){var b;return a(a.s=45728)}),_N_E=a.O()}])
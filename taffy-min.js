var TAFFY,exports,T;(function(){"use strict";var typeList,makeTest,idx,typeKey,version,TC,idpad,cmax,API,protectJSON,each,eachin,isIndexable,returnFilter,runFilters,numcharsplit,orderByCol,run,intersection,filter,makeCid,safeForJson,isRegexp,sortArgs;if(!TAFFY){version="2.7.12";TC=1;idpad="000000";cmax=1e3;API={};sortArgs=function(args){var v=Array.prototype.slice.call(args);return v.sort()};protectJSON=function(t){if(TAFFY.isArray(t)||TAFFY.isObject(t)){return t}else{return JSON.parse(t)}};intersection=function(array1,array2){return filter(array1,function(item){return array2.indexOf(item)>=0})};filter=function(obj,iterator,context){var results=[];if(obj==null)return results;if(Array.prototype.filter&&obj.filter===Array.prototype.filter)return obj.filter(iterator,context);each(obj,function(value,index,list){if(iterator.call(context,value,index,list))results[results.length]=value});return results};isRegexp=function(aObj){return Object.prototype.toString.call(aObj)==="[object RegExp]"};safeForJson=function(aObj){var myResult=T.isArray(aObj)?[]:T.isObject(aObj)?{}:null;if(aObj===null)return aObj;for(var i in aObj){myResult[i]=isRegexp(aObj[i])?aObj[i].toString():T.isArray(aObj[i])||T.isObject(aObj[i])?safeForJson(aObj[i]):aObj[i]}return myResult};makeCid=function(aContext){var myCid=JSON.stringify(aContext);if(myCid.match(/regex/)===null)return myCid;return JSON.stringify(safeForJson(aContext))};each=function(a,fun,u){var r,i,x,y;if(a&&(T.isArray(a)&&a.length===1||!T.isArray(a))){fun(T.isArray(a)?a[0]:a,0)}else{for(r,i,x=0,a=T.isArray(a)?a:[a],y=a.length;x<y;x++){i=a[x];if(!T.isUndefined(i)||(u||false)){r=fun(i,x);if(r===T.EXIT){break}}}}};eachin=function(o,fun){var x=0,r,i;for(i in o){if(o.hasOwnProperty(i)){r=fun(o[i],i,x++);if(r===T.EXIT){break}}}};API.extend=function(m,f){API[m]=function(){return f.apply(this,sortArgs(arguments))}};isIndexable=function(f){var i;if(T.isString(f)&&/[t][0-9]*[r][0-9]*/i.test(f)){return true}if(T.isObject(f)&&f.___id&&f.___s){return true}if(T.isArray(f)){i=true;each(f,function(r){if(!isIndexable(r)){i=false;return TAFFY.EXIT}});return i}return false};runFilters=function(r,filter){var match=true;each(filter,function(mf){switch(T.typeOf(mf)){case"function":if(!mf.apply(r)){match=false;return TAFFY.EXIT}break;case"array":match=mf.length===1?runFilters(r,mf[0]):mf.length===2?runFilters(r,mf[0])||runFilters(r,mf[1]):mf.length===3?runFilters(r,mf[0])||runFilters(r,mf[1])||runFilters(r,mf[2]):mf.length===4?runFilters(r,mf[0])||runFilters(r,mf[1])||runFilters(r,mf[2])||runFilters(r,mf[3]):false;if(mf.length>4){each(mf,function(f){if(runFilters(r,f)){match=true}})}break}});return match};returnFilter=function(f){var nf=[];if(T.isString(f)&&/[t][0-9]*[r][0-9]*/i.test(f)){f={___id:f}}if(T.isArray(f)){each(f,function(r){nf.push(returnFilter(r))});f=function(){var that=this,match=false;each(nf,function(f){if(runFilters(that,f)){match=true}});return match};return f}if(T.isObject(f)){if(T.isObject(f)&&f.___id&&f.___s){f={___id:f.___id}}eachin(f,function(v,i){if(!T.isObject(v)){v={is:v}}eachin(v,function(mtest,s){var c=[],looper;looper=s==="hasAll"?function(mtest,func){func(mtest)}:each;looper(mtest,function(mtest){var su=true,f=false,matchFunc;matchFunc=function(){var mvalue=this[i],eqeq="==",bangeq="!=",eqeqeq="===",lt="<",gt=">",lteq="<=",gteq=">=",bangeqeq="!==",r;if(typeof mvalue==="undefined"){return false}if(s.indexOf("!")===0&&s!==bangeq&&s!==bangeqeq){su=false;s=s.substring(1,s.length)}r=s==="regex"?mtest.test(mvalue):s==="lt"||s===lt?mvalue<mtest:s==="gt"||s===gt?mvalue>mtest:s==="lte"||s===lteq?mvalue<=mtest:s==="gte"||s===gteq?mvalue>=mtest:s==="left"?mvalue.indexOf(mtest)===0:s==="leftnocase"?mvalue.toLowerCase().indexOf(mtest.toLowerCase())===0:s==="right"?mvalue.substring(mvalue.length-mtest.length)===mtest:s==="rightnocase"?mvalue.toLowerCase().substring(mvalue.length-mtest.length)===mtest.toLowerCase():s==="like"?mvalue.indexOf(mtest)>=0:s==="likenocase"?mvalue.toLowerCase().indexOf(mtest.toLowerCase())>=0:s===eqeqeq||s==="is"?mvalue===mtest:s===eqeq?mvalue==mtest:s===bangeqeq?mvalue!==mtest:s===bangeq?mvalue!=mtest:s==="isnocase"?mvalue.toLowerCase?mvalue.toLowerCase()===mtest.toLowerCase():mvalue===mtest:s==="has"?T.has(mvalue,mtest):s==="hasall"?T.hasAll(mvalue,mtest):s==="contains"?TAFFY.isArray(mvalue)&&mvalue.indexOf(mtest)>-1:s.indexOf("is")===-1&&!TAFFY.isNull(mvalue)&&!TAFFY.isUndefined(mvalue)&&!TAFFY.isObject(mtest)&&!TAFFY.isArray(mtest)?mtest===mvalue[s]:T[s]&&T.isFunction(T[s])&&s.indexOf("is")===0?T[s](mvalue)===mtest:T[s]&&T.isFunction(T[s])?T[s](mvalue,mtest):false;r=r&&!su?false:!r&&!su?true:r;return r};c.push(matchFunc)});if(c.length===1){nf.push(c[0])}else{nf.push(function(){var that=this,match=false;each(c,function(f){if(f.apply(that)){match=true}});return match})}})});f=function(){var that=this,match=true;match=nf.length===1&&!nf[0].apply(that)?false:nf.length===2&&(!nf[0].apply(that)||!nf[1].apply(that))?false:nf.length===3&&(!nf[0].apply(that)||!nf[1].apply(that)||!nf[2].apply(that))?false:nf.length===4&&(!nf[0].apply(that)||!nf[1].apply(that)||!nf[2].apply(that)||!nf[3].apply(that))?false:true;if(nf.length>4){each(nf,function(f){if(!runFilters(that,f)){match=false}})}return match};return f}if(T.isFunction(f)){return f}};orderByCol=function(ar,o){var sortFunc=function(a,b){var r=0;T.each(o,function(sd){var o,col,dir,c,d;o=sd.split(" ");col=o[0];dir=o.length===1?"logical":o[1];if(dir==="logical"){c=numcharsplit(a[col]);d=numcharsplit(b[col]);T.each(c.length<=d.length?c:d,function(x,i){if(c[i]<d[i]){r=-1;return TAFFY.EXIT}else if(c[i]>d[i]){r=1;return TAFFY.EXIT}})}else if(dir==="logicaldesc"){c=numcharsplit(a[col]);d=numcharsplit(b[col]);T.each(c.length<=d.length?c:d,function(x,i){if(c[i]>d[i]){r=-1;return TAFFY.EXIT}else if(c[i]<d[i]){r=1;return TAFFY.EXIT}})}else if(dir==="asec"&&a[col]<b[col]){r=-1;return T.EXIT}else if(dir==="asec"&&a[col]>b[col]){r=1;return T.EXIT}else if(dir==="desc"&&a[col]>b[col]){r=-1;return T.EXIT}else if(dir==="desc"&&a[col]<b[col]){r=1;return T.EXIT}if(r===0&&dir==="logical"&&c.length<d.length){r=-1}else if(r===0&&dir==="logical"&&c.length>d.length){r=1}else if(r===0&&dir==="logicaldesc"&&c.length>d.length){r=-1}else if(r===0&&dir==="logicaldesc"&&c.length<d.length){r=1}if(r!==0){return T.EXIT}});return r};return ar&&ar.push?ar.sort(sortFunc):ar};(function(){var cache={},cachcounter=0;numcharsplit=function(thing){if(cachcounter>cmax){cache={};cachcounter=0}return cache["_"+thing]||function(){var nthing=String(thing),na=[],rv="_",rt="",x,xx,c;for(x=0,xx=nthing.length;x<xx;x++){c=nthing.charCodeAt(x);if(c>=48&&c<=57||c===46){if(rt!=="n"){rt="n";na.push(rv.toLowerCase());rv=""}rv=rv+nthing.charAt(x)}else{if(rt!=="s"){rt="s";na.push(parseFloat(rv));rv=""}rv=rv+nthing.charAt(x)}}na.push(rt==="n"?parseFloat(rv):rv.toLowerCase());na.shift();cache["_"+thing]=na;cachcounter++;return na}()}})();run=function(){this.context({results:this.getDBI().query(this.context())})};API.extend("filter",function(){var nc=TAFFY.mergeObj(this.context(),{run:null}),nq=[];each(nc.q,function(v){nq.push(v)});nc.q=nq;each(sortArgs(arguments),function(f){nc.q.push(returnFilter(f));nc.filterRaw.push(f)});return this.getroot(nc)});API.extend("order",function(o){o=o.split(",");var x=[],nc;each(o,function(r){x.push(r.replace(/^\s*/,"").replace(/\s*$/,""))});nc=TAFFY.mergeObj(this.context(),{sort:null});nc.order=x;return this.getroot(nc)});API.extend("limit",function(n){var nc=TAFFY.mergeObj(this.context(),{}),limitedresults;nc.limit=n;if(nc.run&&nc.sort){limitedresults=[];each(nc.results,function(i,x){if(x+1>n){return TAFFY.EXIT}limitedresults.push(i)});nc.results=limitedresults}return this.getroot(nc)});API.extend("start",function(n){var nc=TAFFY.mergeObj(this.context(),{}),limitedresults;nc.start=n;if(nc.run&&nc.sort&&!nc.limit){limitedresults=[];each(nc.results,function(i,x){if(x+1>n){limitedresults.push(i)}});nc.results=limitedresults}else{nc=TAFFY.mergeObj(this.context(),{run:null,start:n})}return this.getroot(nc)});API.extend("update",function(arg0,arg1,arg2){var runEvent=true,o={},args=sortArgs(arguments),that;if(TAFFY.isString(arg0)&&(arguments.length===2||arguments.length===3)){o[arg0]=arg1;if(arguments.length===3){runEvent=arg2}}else{o=arg0;if(args.length===2){runEvent=arg1}}that=this;run.call(this);each(this.context().results,function(r){var c=o;if(TAFFY.isFunction(c)){c=c.apply(TAFFY.mergeObj(r,{}))}else{if(T.isFunction(c)){c=c(TAFFY.mergeObj(r,{}))}}if(TAFFY.isObject(c)){that.getDBI().update(r.___id,c,runEvent)}});if(this.context().results.length){this.context({run:null})}return this});API.extend("remove",function(runEvent){var that=this,c=0;run.call(this);each(this.context().results,function(r){that.getDBI().remove(r.___id);c++});if(this.context().results.length){this.context({run:null});that.getDBI().removeCommit(runEvent)}return c});API.extend("count",function(){run.call(this);return this.context().results.length});API.extend("callback",function(f,delay){if(f){var that=this;setTimeout(function(){run.call(that);f.call(that.getroot(that.context()))},delay||0)}return null});API.extend("get",function(){run.call(this);return this.context().results});API.extend("stringify",function(){return JSON.stringify(this.get())});API.extend("first",function(){run.call(this);return this.context().results[0]||false});API.extend("last",function(){run.call(this);return this.context().results[this.context().results.length-1]||false});API.extend("sum",function(){var total=0,that=this;run.call(that);each(sortArgs(arguments),function(c){each(that.context().results,function(r){total=total+(r[c]||0)})});return total});API.extend("min",function(c){var lowest=null;run.call(this);each(this.context().results,function(r){if(lowest===null||r[c]<lowest){lowest=r[c]}});return lowest});(function(){var innerJoinFunction=function(){var fnCompareList,fnCombineRow,fnMain;fnCompareList=function(left_row,right_row,arg_list){var data_lt,data_rt,op_code,error;if(arg_list.length===2){data_lt=left_row[arg_list[0]];op_code="===";data_rt=right_row[arg_list[1]]}else{data_lt=left_row[arg_list[0]];op_code=arg_list[1];data_rt=right_row[arg_list[2]]}switch(op_code){case"===":return data_lt===data_rt;case"!==":return data_lt!==data_rt;case"<":return data_lt<data_rt;case">":return data_lt>data_rt;case"<=":return data_lt<=data_rt;case">=":return data_lt>=data_rt;case"==":return data_lt==data_rt;case"!=":return data_lt!=data_rt;default:throw String(op_code)+" is not supported"}};fnCombineRow=function(left_row,right_row){var out_map={},i,prefix;for(i in left_row){if(left_row.hasOwnProperty(i)){out_map[i]=left_row[i]}}for(i in right_row){if(right_row.hasOwnProperty(i)&&i!=="___id"&&i!=="___s"){prefix=!TAFFY.isUndefined(out_map[i])?"right_":"";out_map[prefix+String(i)]=right_row[i]}}return out_map};fnMain=function(table){var right_table,i,arg_list=sortArgs(arguments),arg_length=arg_list.length,result_list=[];if(typeof table.filter!=="function"){if(table.TAFFY){right_table=table()}else{throw"TAFFY DB or result not supplied"}}else{right_table=table}this.context({results:this.getDBI().query(this.context())});TAFFY.each(this.context().results,function(left_row){right_table.each(function(right_row){var arg_data,is_ok=true;CONDITION:for(i=1;i<arg_length;i++){arg_data=arg_list[i];if(typeof arg_data==="function"){is_ok=arg_data(left_row,right_row)}else if(typeof arg_data==="object"&&arg_data.length){is_ok=fnCompareList(left_row,right_row,arg_data)}else{is_ok=false}if(!is_ok){break CONDITION}}if(is_ok){result_list.push(fnCombineRow(left_row,right_row))}})});return TAFFY(result_list)()};return fnMain}();API.extend("join",innerJoinFunction)})();API.extend("max",function(c){var highest=null;run.call(this);each(this.context().results,function(r){if(highest===null||r[c]>highest){highest=r[c]}});return highest});API.extend("select",function(){var ra=[],args=sortArgs(arguments);run.call(this);if(arguments.length===1){each(this.context().results,function(r){ra.push(r[args[0]])})}else{each(this.context().results,function(r){var row=[];each(args,function(c){row.push(r[c])});ra.push(row)})}return ra});API.extend("distinct",function(){var ra=[],args=sortArgs(arguments);run.call(this);if(arguments.length===1){each(this.context().results,function(r){var v=r[args[0]],dup=false;each(ra,function(d){if(v===d){dup=true;return TAFFY.EXIT}});if(!dup){ra.push(v)}})}else{each(this.context().results,function(r){var row=[],dup=false;each(args,function(c){row.push(r[c])});each(ra,function(d){var ldup=true;each(args,function(c,i){if(row[i]!==d[i]){ldup=false;return TAFFY.EXIT}});if(ldup){dup=true;return TAFFY.EXIT}});if(!dup){ra.push(row)}})}return ra});API.extend("supplant",function(template,returnarray){var ra=[];run.call(this);each(this.context().results,function(r){ra.push(template.replace(/\{([^\{\}]*)\}/g,function(a,b){var v=r[b];return typeof v==="string"||typeof v==="number"?v:a}))});return!returnarray?ra.join(""):ra});API.extend("each",function(m){run.call(this);each(this.context().results,m);return this});API.extend("map",function(m){var ra=[];run.call(this);each(this.context().results,function(r){ra.push(m(r))});return ra});T=function(d){var TOb=[],ID={},RC=1,settings={template:false,onInsert:false,onUpdate:false,onRemove:false,onDBChange:false,storageName:false,forcePropertyCase:null,cacheSize:100,name:""},dm=new Date,CacheCount=0,CacheClear=0,Cache={},DBI,runIndexes,root;runIndexes=function(indexes){var records=[],UniqueEnforce=false;if(indexes.length===0){return TOb}each(indexes,function(f){if(T.isString(f)&&/[t][0-9]*[r][0-9]*/i.test(f)&&TOb[ID[f]]){records.push(TOb[ID[f]]);UniqueEnforce=true}if(T.isObject(f)&&f.___id&&f.___s&&TOb[ID[f.___id]]){records.push(TOb[ID[f.___id]]);UniqueEnforce=true}if(T.isArray(f)){each(f,function(r){each(runIndexes(r),function(rr){records.push(rr)})})}});if(UniqueEnforce&&records.length>1){records=[]}return records};DBI={dm:function(nd){if(nd){dm=nd;Cache={};CacheCount=0;CacheClear=0}if(settings.onDBChange){setTimeout(function(){settings.onDBChange.call(TOb)},0)}if(settings.storageName){setTimeout(function(){localStorage.setItem("taffy_"+settings.storageName,JSON.stringify(TOb))})}return dm},insert:function(i,runEvent){var columns=[],records=[],input=protectJSON(i);each(input,function(v,i){var nv,o;if(T.isArray(v)&&i===0){each(v,function(av){columns.push(settings.forcePropertyCase==="lower"?av.toLowerCase():settings.forcePropertyCase==="upper"?av.toUpperCase():av)});return true}else if(T.isArray(v)){nv={};each(v,function(av,ai){nv[columns[ai]]=av});v=nv}else if(T.isObject(v)&&settings.forcePropertyCase){o={};eachin(v,function(av,ai){o[settings.forcePropertyCase==="lower"?ai.toLowerCase():settings.forcePropertyCase==="upper"?ai.toUpperCase():ai]=v[ai]});v=o}RC++;v.___id="T"+String(idpad+TC).slice(-6)+"R"+String(idpad+RC).slice(-6);v.___s=true;records.push(v.___id);if(settings.template){v=T.mergeObj(settings.template,v)}TOb.push(v);ID[v.___id]=TOb.length-1;if(settings.onInsert&&(runEvent||TAFFY.isUndefined(runEvent))){settings.onInsert.call(v)}DBI.dm(new Date)});return root(records)},sort:function(o){TOb=orderByCol(TOb,o.split(","));ID={};each(TOb,function(r,i){ID[r.___id]=i});DBI.dm(new Date);return true},update:function(id,changes,runEvent){var nc={},or,nr,tc,hasChange;if(settings.forcePropertyCase){eachin(changes,function(v,p){nc[settings.forcePropertyCase==="lower"?p.toLowerCase():settings.forcePropertyCase==="upper"?p.toUpperCase():p]=v});changes=nc}or=TOb[ID[id]];nr=T.mergeObj(or,changes);tc={};hasChange=false;eachin(nr,function(v,i){if(TAFFY.isUndefined(or[i])||or[i]!==v){tc[i]=v;hasChange=true}});if(hasChange){if(settings.onUpdate&&(runEvent||TAFFY.isUndefined(runEvent))){settings.onUpdate.call(nr,TOb[ID[id]],tc)}TOb[ID[id]]=nr;DBI.dm(new Date)}},remove:function(id){TOb[ID[id]].___s=false},removeCommit:function(runEvent){var x;for(x=TOb.length-1;x>-1;x--){if(!TOb[x].___s){if(settings.onRemove&&(runEvent||TAFFY.isUndefined(runEvent))){settings.onRemove.call(TOb[x])}ID[TOb[x].___id]=undefined;TOb.splice(x,1)}}ID={};each(TOb,function(r,i){ID[r.___id]=i});DBI.dm(new Date)},query:function(context){var returnq,cid,results,indexed,limitq,ni;if(settings.cacheSize){cid="";each(context.filterRaw,function(r){if(T.isFunction(r)){cid="nocache";return TAFFY.EXIT}});if(cid===""){cid=makeCid(T.mergeObj(context,{q:false,run:false,sort:false}))}}if(!context.results||!context.run||context.run&&DBI.dm()>context.run){results=[];if(settings.cacheSize&&Cache[cid]){Cache[cid].i=CacheCount++;return Cache[cid].results}else{if(context.q.length===0&&context.index.length===0){each(TOb,function(r){results.push(r)});returnq=results}else{indexed=runIndexes(context.index);each(indexed,function(r){if(context.q.length===0||runFilters(r,context.q)){results.push(r)}});returnq=results}}}else{returnq=context.results}if(context.order.length>0&&(!context.run||!context.sort)){returnq=orderByCol(returnq,context.order)}if(returnq.length&&(context.limit&&context.limit<returnq.length||context.start)){limitq=[];each(returnq,function(r,i){if(!context.start||context.start&&i+1>=context.start){if(context.limit){ni=context.start?i+1-context.start:i;if(ni<context.limit){limitq.push(r)}else if(ni>context.limit){return TAFFY.EXIT}}else{limitq.push(r)}}});returnq=limitq}if(settings.cacheSize&&cid!=="nocache"){CacheClear++;setTimeout(function(){var bCounter,nc;if(CacheClear>=settings.cacheSize*2){CacheClear=0;bCounter=CacheCount-settings.cacheSize;nc={};eachin(function(r,k){if(r.i>=bCounter){nc[k]=r}});Cache=nc}},0);Cache[cid]={i:CacheCount++,results:returnq}}return returnq}};root=function(){var iAPI,context;iAPI=TAFFY.mergeObj(TAFFY.mergeObj(API,{insert:undefined}),{getDBI:function(){return DBI},getroot:function(c){return root.call(c)},context:function(n){if(n){context=TAFFY.mergeObj(context,n.hasOwnProperty("results")?TAFFY.mergeObj(n,{run:new Date,sort:new Date}):n)}return context},extend:undefined});context=this&&this.q?this:{limit:false,start:false,q:[],filterRaw:[],runFilters:runFilters,index:[],order:[],results:false,run:null,sort:null,settings:settings};each(sortArgs(arguments),function(f){if(isIndexable(f)){context.index.push(f)}else{context.q.push(returnFilter(f))}context.filterRaw.push(f)});return iAPI};TC++;if(d){DBI.insert(d)}root.insert=DBI.insert;root.merge=function(i,key,runEvent){var search={},finalSearch=[],obj={};runEvent=runEvent||false;key=key||"id";each(i,function(o){var existingObject;search[key]=o[key];finalSearch.push(o[key]);existingObject=root(search).first();if(existingObject){DBI.update(existingObject.___id,o,runEvent)}else{DBI.insert(o,runEvent)}});obj[key]=finalSearch;return root(obj)};root.TAFFY=true;root.sort=DBI.sort;root.settings=function(n){if(n){settings=TAFFY.mergeObj(settings,n);if(n.template){root().update(n.template)}}return settings};root.store=function(n){var r=false,i;if(localStorage){if(n){i=localStorage.getItem("taffy_"+n);if(i&&i.length>0){root.insert(i);r=true}if(TOb.length>0){setTimeout(function(){localStorage.setItem("taffy_"+settings.storageName,JSON.stringify(TOb))})}}root.settings({storageName:n})}return root};return root};TAFFY=T;T.each=each;T.eachin=eachin;T.extend=API.extend;TAFFY.EXIT="TAFFYEXIT";TAFFY.mergeObj=function(ob1,ob2){var c={};eachin(ob1,function(v,n){c[n]=ob1[n]});eachin(ob2,function(v,n){c[n]=ob2[n]});return c};TAFFY.has=function(var1,var2){var re=false,n;if(var1.TAFFY){re=var1(var2);if(re.length>0){return true}else{return false}}else{switch(T.typeOf(var1)){case"object":if(T.isObject(var2)){eachin(var2,function(v,n){if(re===true&&!T.isUndefined(var1[n])&&var1.hasOwnProperty(n)){re=T.has(var1[n],var2[n])}else{re=false;return TAFFY.EXIT}})}else if(T.isArray(var2)){each(var2,function(v,n){re=T.has(var1,var2[n]);if(re){return TAFFY.EXIT}})}else if(T.isString(var2)){if(!TAFFY.isUndefined(var1[var2])){return true}else{return false}}return re;case"array":if(T.isObject(var2)){each(var1,function(v,i){re=T.has(var1[i],var2);if(re===true){return TAFFY.EXIT}})}else if(T.isArray(var2)){each(var2,function(v2,i2){each(var1,function(v1,i1){re=T.has(var1[i1],var2[i2]);if(re===true){return TAFFY.EXIT}});if(re===true){return TAFFY.EXIT}})}else if(T.isString(var2)||T.isNumber(var2)){re=false;for(n=0;n<var1.length;n++){re=T.has(var1[n],var2);if(re){return true}}}return re;case"string":if(T.isString(var2)&&var2===var1){return true}break;default:if(T.typeOf(var1)===T.typeOf(var2)&&var1===var2){return true}break}}return false};TAFFY.hasAll=function(var1,var2){var T=TAFFY,ar;if(T.isArray(var2)){ar=true;each(var2,function(v){ar=T.has(var1,v);if(ar===false){return TAFFY.EXIT}});return ar}else{return T.has(var1,var2)}};TAFFY.typeOf=function(v){var s=typeof v;if(s==="object"){if(v){if(typeof v.length==="number"&&!v.propertyIsEnumerable("length")){s="array"}}else{s="null"}}return s};TAFFY.getObjectKeys=function(ob){var kA=[];eachin(ob,function(n,h){kA.push(h)});kA.sort();return kA};TAFFY.isSameArray=function(ar1,ar2){return TAFFY.isArray(ar1)&&TAFFY.isArray(ar2)&&ar1.join(",")===ar2.join(",")?true:false};TAFFY.isSameObject=function(ob1,ob2){var T=TAFFY,rv=true;if(T.isObject(ob1)&&T.isObject(ob2)){if(T.isSameArray(T.getObjectKeys(ob1),T.getObjectKeys(ob2))){eachin(ob1,function(v,n){if(!(T.isObject(ob1[n])&&T.isObject(ob2[n])&&T.isSameObject(ob1[n],ob2[n])||T.isArray(ob1[n])&&T.isArray(ob2[n])&&T.isSameArray(ob1[n],ob2[n])||ob1[n]===ob2[n])){rv=false;return TAFFY.EXIT}})}else{rv=false}}else{rv=false}return rv};typeList=["String","Number","Object","Array","Boolean","Null","Function","Undefined"];makeTest=function(thisKey){return function(data){return TAFFY.typeOf(data)===thisKey.toLowerCase()?true:false}};for(idx=0;idx<typeList.length;idx++){typeKey=typeList[idx];TAFFY["is"+typeKey]=makeTest(typeKey)}}})();if(typeof exports==="object"){exports.taffy=TAFFY}
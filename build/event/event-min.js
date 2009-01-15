(function(){var E=YUI.Env,G=YUI.config,F=G.doc,B=G.pollInterval||20;if(!E._ready){E.windowLoaded=false;var A=function(C){E._ready();};E._ready=function(){if(!E.DOMReady){E.DOMReady=true;if(F.removeEventListener){F.removeEventListener("DOMContentLoaded",A,false);}}};if(navigator.userAgent.match(/MSIE/)){E._dri=setInterval(function(){try{document.documentElement.doScroll("left");clearInterval(E._dri);E._dri=null;A();}catch(C){}},B);}else{F.addEventListener("DOMContentLoaded",A,false);}}})();YUI.add("event",function(D){(function(){var L=D.UA.ie?"focusin":"focus",X=D.UA.ie?"focusout":"blur",Z="capture_",Y=D.Lang;D.Env.eventAdaptors={focus:{on:function(){arguments[0]=Z+L;return D.Event.attach.apply(D.Event,arguments);},detach:function(){arguments[0]=Z+L;return D.Event.detach.apply(D.Event,arguments);}},blur:{on:function(){arguments[0]=Z+X;return D.Event.attach.apply(D.Event,arguments);},detach:function(){arguments[0]=Z+X;return D.Event.detach.apply(D.Event,arguments);}},available:{on:function(d,c,f,e){var b=arguments.length>4?D.Array(arguments,4,true):[];return D.Event.onAvailable.call(D.Event,f,c,e,b);}},contentready:{on:function(d,c,f,e){var b=arguments.length>4?D.Array(arguments,4,true):[];return D.Event.onContentReady.call(D.Event,f,c,e,b);}},key:{on:function(e,g,b,k,c){if(!k||k.indexOf(":")==-1){arguments[0]="keypress";return D.on.apply(D,arguments);}var f=k.split(":"),j=f[0],i=(f[1])?f[1].split(/,|\+/):null,d=(Y.isString(b)?b:D.stamp(b))+k,h=D.Array(arguments,0,true);D.on(e+j,function(p){var q=false,m=false;for(var n=0;n<i.length;n=n+1){var l=i[n],o=parseInt(l,10);if(Y.isNumber(o)){if(p.charCode===o){q=true;}else{m=true;}}else{if(q||!m){q=(p[l+"Key"]);m=!q;}}}if(q){D.fire(d,p);}},b);h.splice(2,2);h[0]=d;return D.on.apply(D,h);}}};D.on=function(c,d,e){var b=D.Env.eventAdaptors[c];if(b&&b.on){return b.on.apply(D,arguments);}else{if(b||c.indexOf(":")>-1){return D.subscribe.apply(D,arguments);}else{return D.Event.attach.apply(D.Event,arguments);}}};D.detach=function(c,d,e){var b=D.Env.eventAdaptors[c];if(Y.isObject(c)&&c.detach){return c.detach();}else{if(b&&b.detach){return b.detach.apply(D,arguments);}else{if(b||c.indexOf(":")>-1){return D.unsubscribe.apply(D,arguments);}else{return D.Event.detach.apply(D.Event,arguments);}}}};D.before=function(b,c,d){if(Y.isFunction(b)){return D.Do.before.apply(D.Do,arguments);}else{return D.on.apply(D,arguments);}};var a=D.after;D.after=function(b,c,d){if(Y.isFunction(b)){return D.Do.after.apply(D.Do,arguments);}else{return a.apply(D,arguments);}};})();(function(){var L=0,X=1;D.Do={objs:{},before:function(Z,d,e,g){var b=Z;if(g){var Y=[Z,g].concat(D.Array(arguments,4,true));b=D.bind.apply(D,Y);}return this._inject(L,b,d,e);},after:function(Z,d,e,g){var b=Z;if(g){var Y=[Z,g].concat(D.Array(arguments,4,true));b=D.bind.apply(D,Y);}return this._inject(X,b,d,e);},_inject:function(Y,a,b,d){var e=D.stamp(b);if(!this.objs[e]){this.objs[e]={};}var c=this.objs[e];if(!c[d]){c[d]=new D.Do.Method(b,d);b[d]=function(){return c[d].exec.apply(c[d],arguments);};}var Z=e+D.stamp(a)+d;c[d].register(Z,a,Y);return new D.EventHandle(c[d],Z);},detach:function(Y){if(Y.detach){Y.detach();}},_unload:function(Z,Y){}};D.Do.Method=function(Y,Z){this.obj=Y;this.methodName=Z;this.method=Y[Z];this.before={};this.after={};};D.Do.Method.prototype.register=function(Z,a,Y){if(Y){this.after[Z]=a;}else{this.before[Z]=a;}};D.Do.Method.prototype._delete=function(Y){delete this.before[Y];delete this.after[Y];};D.Do.Method.prototype.exec=function(){var a=D.Array(arguments,0,true),b,Z,e,c=this.before,Y=this.after,d=false;for(b in c){if(c.hasOwnProperty(b)){Z=c[b].apply(this.obj,a);if(Z){switch(Z.constructor){case D.Do.Halt:return Z.retVal;case D.Do.AlterArgs:a=Z.newArgs;break;case D.Do.Prevent:d=true;break;default:}}}}if(!d){Z=this.method.apply(this.obj,a);}for(b in Y){if(Y.hasOwnProperty(b)){e=Y[b].apply(this.obj,a);if(e&&e.constructor==D.Do.Halt){return e.retVal;}else{if(e&&e.constructor==D.Do.AlterReturn){Z=e.newRetVal;}}}}return Z;};D.Do.AlterArgs=function(Z,Y){this.msg=Z;this.newArgs=Y;};D.Do.AlterReturn=function(Z,Y){this.msg=Z;this.newRetVal=Y;};D.Do.Halt=function(Z,Y){this.msg=Z;this.retVal=Y;};D.Do.Prevent=function(Y){this.msg=Y;};D.Do.Error=D.Do.Halt;})();var N="_event:onsub",R="after",B=["broadcast","bubbles","context","configured","currentTarget","defaultFn","details","emitFacade","fireOnce","host","preventable","preventedFn","queuable","silent","stoppedFn","target","type"],K=9;D.EventHandle=function(L,X){this.evt=L;this.sub=X;};D.EventHandle.prototype={detach:function(){if(this.evt){this.evt._delete(this.sub);}}};D.CustomEvent=function(L,X){X=X||{};this.id=D.stamp(this);this.type=L;this.context=D;this.logSystem=(L=="yui:log");this.broadcast=0;this.silent=this.logSystem;this.queuable=false;this.subscribers={};this.afters={};this.fired=false;this.fireOnce=false;this.stopped=0;this.prevented=0;this.host=null;this.defaultFn=null;this.stoppedFn=null;this.preventedFn=null;this.preventable=true;this.bubbles=true;this.signature=K;this.emitFacade=false;this.applyConfig(X,true);this.log("Creating "+this.type);if(L!==N){this.subscribeEvent=new D.CustomEvent(N,{context:this,silent:true});}};D.CustomEvent.prototype={_YUI_EVENT:true,applyConfig:function(X,L){if(X){D.mix(this,X,L,B);}},_subscribe:function(a,Y,X,L){if(!a){D.fail("Invalid callback for CE: "+this.type);}var b=this.subscribeEvent;if(b){b.fire.apply(b,X);}var Z=new D.Subscriber(a,Y,X,L);if(this.fireOnce&&this.fired){D.later(0,this,this._notify,Z);}if(L==R){this.afters[Z.id]=Z;}else{this.subscribers[Z.id]=Z;}return new D.EventHandle(this,Z);},subscribe:function(X,L){return this._subscribe(X,L,arguments,true);},after:function(X,L){return this._subscribe(X,L,arguments,R);},unsubscribe:function(a,Y){if(a&&a.detach){return a.detach();}if(!a){return this.unsubscribeAll();}var b=false,X=this.subscribers;for(var L in X){if(X.hasOwnProperty(L)){var Z=X[L];if(Z&&Z.contains(a,Y)){this._delete(Z);b=true;}}}return b;},_getFacade:function(X){var L=this._facade;
if(!L){L=new D.Event.Facade(this,this.currentTarget);}var Y=X&&X[0];if(D.Lang.isObject(Y,true)&&!Y._yuifacade){D.mix(L,Y,true);}L.details=this.details;L.target=this.target;L.currentTarget=this.currentTarget;L.stopped=0;L.prevented=0;this._facade=L;return this._facade;},_notify:function(a,Y,L){this.log(this.type+"->"+": "+a);var X,b,Z;if(this.emitFacade){if(!L){L=this._getFacade(Y);Y[0]=L;}}Z=(Y&&D.Lang.isObject(Y[0])&&Y[0].currentTarget);X=a.notify(Z||this.context,Y,this);if(false===X||this.stopped>1){this.log(this.type+" cancelled by subscriber");return false;}return true;},log:function(Z,L){var Y=D.Env._eventstack,X=Y&&Y.logging;if(!this.silent){}},fire:function(){var f=D.Env._eventstack;if(f){if(this.queuable&&this.type!=f.next.type){this.log("queue "+this.type);f.queue.push([this,arguments]);return true;}}else{D.Env._eventstack={id:this.id,next:this,silent:this.silent,logging:(this.type==="yui:log"),stopped:0,prevented:0,queue:[]};f=D.Env._eventstack;}var d=true;if(this.fireOnce&&this.fired){this.log("fireOnce event: "+this.type+" already fired");}else{var Y=D.merge(this.subscribers),g,e=D.Array(arguments,0,true),Z;this.stopped=0;this.prevented=0;this.target=this.target||this.host;this.currentTarget=this.host||this.currentTarget;this.fired=true;this.details=e.slice();this.log("Firing "+this.type);var c=false;f.lastLogState=f.logging;var a=null;if(this.emitFacade){this._facade=null;a=this._getFacade(e);e[0]=a;}for(Z in Y){if(Y.hasOwnProperty(Z)){if(!c){f.logging=(f.logging||(this.type==="yui:log"));c=true;}if(this.stopped==2){break;}g=Y[Z];if(g&&g.fn){d=this._notify(g,e,a);if(false===d){this.stopped=2;}}}}f.logging=(f.lastLogState);if(this.bubbles&&this.host&&!this.stopped){f.stopped=0;f.prevented=0;d=this.host.bubble(this);this.stopped=Math.max(this.stopped,f.stopped);this.prevented=Math.max(this.prevented,f.prevented);}if(this.defaultFn&&!this.prevented){this.defaultFn.apply(this.host||this,e);}if(!this.prevented&&this.stopped<2){Y=D.merge(this.afters);for(Z in Y){if(Y.hasOwnProperty(Z)){if(!c){f.logging=(f.logging||(this.type==="yui:log"));c=true;}if(this.stopped==2){break;}g=Y[Z];if(g&&g.fn){d=this._notify(g,e,a);if(false===d){this.stopped=2;}}}}}}if(f.id===this.id){var b=f.queue;while(b.length){var L=b.pop(),X=L[0];f.stopped=0;f.prevented=0;f.next=X;d=X.fire.apply(X,L[1]);}D.Env._eventstack=null;}return(d!==false);},unsubscribeAll:function(){var Y=this.subscribers,X,L=0;for(X in Y){if(Y.hasOwnProperty(X)){this._delete(Y[X]);L++;}}this.subscribers={};return L;},_delete:function(L){if(L){delete L.fn;delete L.context;delete this.subscribers[L.id];delete this.afters[L.id];}},toString:function(){return this.type;},stopPropagation:function(){this.stopped=1;D.Env._eventstack.stopped=1;if(this.stoppedFn){this.stoppedFn.call(this.host||this,this);}},stopImmediatePropagation:function(){this.stopped=2;D.Env._eventstack.stopped=2;if(this.stoppedFn){this.stoppedFn.call(this.host||this,this);}},preventDefault:function(){if(this.preventable){this.prevented=1;D.Env._eventstack.prevented=1;}if(this.preventedFn){this.preventedFn.call(this.host||this,this);}}};D.Subscriber=function(Y,X,L){this.fn=Y;this.context=X;this.id=D.stamp(this);this.wrappedFn=Y;if(X){this.wrappedFn=D.bind.apply(D,L);}};D.Subscriber.prototype={notify:function(L,Y,b){var d=this.context||L,X=true,Z=function(){switch(b.signature){case 0:X=this.fn.call(d,b.type,Y,this.context);break;case 1:X=this.fn.call(d,Y[0]||null,this.context);break;default:X=this.wrappedFn.apply(d,Y||[]);}};if(D.config.throwFail){Z.call(this);}else{try{Z.call(this);}catch(a){D.fail(this+" failed: "+a.message,a);}}return X;},contains:function(X,L){if(L){return((this.fn==X)&&this.context==L);}else{return(this.fn==X);}},toString:function(){return"Subscriber "+this.id;}};var H={"yui:log":true},I=D.Lang;D.EventTarget=function(L){var X=(I.isObject(L))?L:{};this._yuievt={events:{},targets:{},config:X,defaults:{context:this,host:this,emitFacade:X.emitFacade||false,bubbles:("bubbles" in X)?X.bubbles:true}};};var P=D.EventTarget;P.prototype={subscribe:function(e,g,L){if(I.isObject(e)){var Y=g,d=L,b=D.Array(arguments,0,true),Z={};D.each(e,function(c,a){if(c){Y=c.fn||Y;d=c.context||d;}b[0]=a;b[1]=Y;b[2]=d;Z[a]=this.subscribe.apply(this,b);},this);return Z;}var X=this._yuievt.events[e]||this.publish(e),h=D.Array(arguments,1,true);return X.subscribe.apply(X,h);},unsubscribe:function(b,a,Z){if(I.isObject(b)&&b.detach){return b.detach();}var L=this._yuievt.events;if(b){var c=L[b];if(c){return c.unsubscribe(a,Z);}}else{var X=true;for(var Y in L){if(L.hasOwnProperty(Y)){X=X&&L[Y].unsubscribe(a,Z);}}return X;}return false;},unsubscribeAll:function(L){return this.unsubscribe(L);},publish:function(Y,Z){if(I.isObject(Y)){var L={};D.each(Y,function(d,c){L[c]=this.publish(c,d||Z);},this);return L;}var X=this._yuievt.events,a=X[Y];if(a){a.applyConfig(Z,true);}else{var b=Z||{};D.mix(b,this._yuievt.defaults);a=new D.CustomEvent(Y,b);X[Y]=a;if(b.onSubscribeCallback){a.subscribeEvent.subscribe(b.onSubscribeCallback);}}return X[Y];},addTarget:function(L){this._yuievt.targets[D.stamp(L)]=L;this._yuievt.hasTargets=true;},removeTarget:function(L){delete this._yuievt.targets[D.stamp(L)];},fire:function(Z){var c=I.isString(Z),Y=(c)?Z:(Z&&Z.type);var b=this.getEvent(Y);if(!b){if(this._yuievt.hasTargets){b=this.publish(Y);b.details=D.Array(arguments,(c)?1:0,true);return this.bubble(b);}return true;}var L=D.Array(arguments,(c)?1:0,true);var X=b.fire.apply(b,L);b.target=null;return X;},getEvent:function(L){var X=this._yuievt.events;return(X&&L in X)?X[L]:null;},bubble:function(X){var c=this._yuievt.targets,Y=true;if(!X.stopped&&c){for(var a in c){if(c.hasOwnProperty(a)){var Z=c[a],b=X.type,d=Z.getEvent(b),L=X.target||this;if(!d){d=Z.publish(b,X);d.context=(X.host===X.context)?Z:X.context;d.host=Z;d.defaultFn=null;d.preventedFn=null;d.stoppedFn=null;}d.target=L;d.currentTarget=Z;Y=Y&&d.fire.apply(d,X.details);if(d.stopped){break;}}}}return Y;},after:function(Y,X){if(I.isFunction(Y)){return D.Do.after.apply(D.Do,arguments);
}else{var Z=this._yuievt.events[Y]||this.publish(Y),L=D.Array(arguments,1,true);return Z.after.apply(Z,L);}},before:function(X,L){if(I.isFunction(X)){return D.Do.after.apply(D.Do,arguments);}else{return this.subscribe.apply(this,arguments);}}};D.mix(D,P.prototype,false,false,{bubbles:false});P.call(D);var A=YUI.Env;D.mix(D.Env.eventAdaptors,{domready:{},"event:ready":{on:function(){arguments[0]="domready";return D.subscribe.apply(D,arguments);},detach:function(){arguments[0]="domready";return D.unsubscribe.apply(D,arguments);}}});D.publish("domready",{fireOnce:true});var J=function(){D.fire("domready");};if(A.DOMReady){J();}else{D.before(J,A,"_ready");}var M=function(Z,Y,X,L){if(Z.addEventListener){Z.addEventListener(Y,X,!!L);}else{if(Z.attachEvent){Z.attachEvent("on"+Y,X);}}},V=function(Z,Y,X,L){if(Z.removeEventListener){Z.removeEventListener(Y,X,!!L);}else{if(Z.detachEvent){Z.detachEvent("on"+Y,X);}}},C=function(){YUI.Env.windowLoaded=true;D.Event._load();V(window,"load",C);},U=function(){D.Event._unload();V(window,"unload",U);},E="domready",T="~yui|2|compat~",G="capture_";D.Event=function(){var Y=false;var Z=0;var X=[];var a={};var L=null;var b={};return{POLL_RETRYS:2000,POLL_INTERVAL:20,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){var c=D.Event;if(!c._interval){c._interval=setInterval(D.bind(c._tryPreloadAttach,c),c.POLL_INTERVAL);}},onAvailable:function(k,f,j,h,g,d){var c=D.Array(k);for(var e=0;e<c.length;e=e+1){X.push({id:c[e],fn:f,obj:j,override:h,checkReady:g,compat:d});}Z=this.POLL_RETRYS;setTimeout(D.bind(D.Event._tryPreloadAttach,D.Event),0);return new D.EventHandle();},onContentReady:function(g,d,f,e,c){return this.onAvailable(g,d,f,e,true,c);},attach:function(j,m,d,n){var h=D.Array(arguments,0,true),g=h.slice(1),k,o=D.Event,r=false;if(j.indexOf(G)>-1){j=j.substr(G.length);r=true;}if(g[g.length-1]===T){k=true;g.pop();}if(!m||!m.call){return false;}if(this._isValidCollection(d)){var c=[],t,s;D.each(d,function(l,i){h[2]=l;c.push(o.attach.apply(o,h));});return(c.length===1)?c[0]:c;}else{if(D.Lang.isString(d)){var q=(k)?D.DOM.byId(d):D.all(d);if(q&&(q instanceof D.Node)){var p=q.size();if(p>1){h[2]=q;return o.attach.apply(o,h);}else{d=q.item(0);}}else{if(q){d=q;}else{return this.onAvailable(d,function(){o.attach.apply(o,h);},o,true,false,k);}}}}if(!d){return false;}var e=D.stamp(d),v="event:"+e+j,u=a[v];if(!u){u=D.publish(v,{silent:true,bubbles:false});u.el=d;u.type=j;u.fn=function(i){u.fire(o.getEvent(i,d,k));};if(d==D.config.win&&j=="load"){u.fireOnce=true;L=v;if(YUI.Env.windowLoaded){u.fire();}}a[v]=u;b[e]=b[e]||{};b[e][v]=u;M(d,j,u.fn,r);}var f=g[2]||((k)?d:D.get(d));g[1]=f;g.splice(2,1);return u.subscribe.apply(u,g);},detach:function(k,m,e,f){var j=D.Array(arguments,0,true),o;if(j[j.length-1]===T){o=true;}if(k&&k.detach){return k.detach();}var g,h,n;if(typeof e=="string"){e=(o)?D.DOM.byId(e):D.all(e);}else{if(this._isValidCollection(e)){var l=true;for(g=0,h=e.length;g<h;++g){j[2]=e[g];l=(D.Event.detach.apply(D.Event,j)&&l);}return l;}}if(!m||!m.call){return this.purgeElement(e,false,k);}var c="event:"+D.stamp(e)+k,d=a[c];if(d){return d.unsubscribe(m);}else{return false;}},getEvent:function(g,d,c){var f=g||window.event;return(c)?f:new D.Event.Facade(f,d,a["event:"+D.stamp(d)+g.type]);},generateId:function(c){var d=c.id;if(!d){d=D.stamp(c);c.id=d;}return d;},_isValidCollection:function(d){try{return(d&&typeof d!=="string"&&(d.length&&((!d.size)||(d.size()>1)))&&!d.tagName&&!d.alert&&(d.item||typeof d[0]!=="undefined"));}catch(c){return false;}},_load:function(c){if(!Y){Y=true;if(D.fire){D.fire(E);}D.Event._tryPreloadAttach();}},_tryPreloadAttach:function(){if(this.locked){return;}if(D.UA.ie&&!YUI.Env.DOMReady){this.startInterval();return;}this.locked=true;var h=!Y;if(!h){h=(Z>0);}var g=[];var j=function(l,m){var k,i=m.override;if(m.compat){if(m.override){if(i===true){k=m.obj;}else{k=i;}}else{k=l;}m.fn.call(k,m.obj);}else{k=m.obj||D.get(l);m.fn.apply(k,(D.Lang.isArray(i))?i:[]);}};var d,c,f,e;for(d=0,c=X.length;d<c;++d){f=X[d];if(f&&!f.checkReady){e=(f.compat)?D.DOM.byId(f.id):D.get(f.id);if(e){j(e,f);X[d]=null;}else{g.push(f);}}}for(d=0,c=X.length;d<c;++d){f=X[d];if(f&&f.checkReady){e=(f.compat)?D.DOM.byId(f.id):D.get(f.id);if(e){if(Y||(e.get&&e.get("nextSibling"))||e.nextSibling){j(e,f);X[d]=null;}}else{g.push(f);}}}Z=(g.length===0)?0:Z-1;if(h){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return;},purgeElement:function(h,j,g){var e=(D.Lang.isString(h))?D.get(h):h,k=D.stamp(e);var d=this.getListeners(e,g),f,c;if(d){for(f=0,c=d.length;f<c;++f){d[f].unsubscribeAll();}}if(j&&e&&e.childNodes){for(f=0,c=e.childNodes.length;f<c;++f){this.purgeElement(e.childNodes[f],j,g);}}},getListeners:function(g,f){var h=D.stamp(g),c=b[h];if(!c){return null;}var e=[],d=(f)?"event:"+f:null;if(d){if(c[d]){e.push(c[d]);}}else{D.each(c,function(j,i){e.push(j);});}return(e.length)?e:null;},_unload:function(d){var c=D.Event;D.each(a,function(f,e){f.unsubscribeAll();V(f.el,f.type,f.fn);delete a[e];});V(window,"load",c._load);V(window,"unload",c._unload);},nativeAdd:M,nativeRemove:V};}();M(window,"load",C);M(window,"unload",U);var W=D.Event;if(D.UA.ie&&D.on){D.on(E,W._tryPreloadAttach,W,true);}W.Custom=D.CustomEvent;W.Subscriber=D.Subscriber;W.Target=D.EventTarget;W._tryPreloadAttach();var F={"altKey":1,"cancelBubble":1,"ctrlKey":1,"clientX":1,"clientY":1,"detail":1,"keyCode":1,"metaKey":1,"shiftKey":1,"type":1,"x":1,"y":1};var S=D.UA,O={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},Q=function(X){if(!X){return null;}try{if(S.webkit&&3==X.nodeType){X=X.parentNode;}}catch(L){}return D.Node.get(X);};D.Event.Facade=function(l,Y,X,L){var g=l,a=Y,h=D.config.doc,m=h.body,n=g.pageX,k=g.pageY,Z=(l._YUI_EVENT);for(var f in F){if(F.hasOwnProperty(f)){this[f]=g[f];}}if(!n&&0!==n){n=g.clientX||0;k=g.clientY||0;if(S.ie){n+=Math.max(h.documentElement.scrollLeft,m.scrollLeft);k+=Math.max(h.documentElement.scrollTop,m.scrollTop);
}}this._yuifacade=true;this.pageX=n;this.pageY=k;var j=g.keyCode||g.charCode||0;if(S.webkit&&(j in O)){j=O[j];}this.keyCode=j;this.charCode=j;this.button=g.which||g.button;this.which=this.button;this.details=L;this.time=g.time||new Date().getTime();this.target=(Z)?g.target:Q(g.target||g.srcElement);this.currentTarget=(Z)?a:Q(a);var o=g.relatedTarget;if(!o){if(g.type=="mouseout"){o=g.toElement;}else{if(g.type=="mouseover"){o=g.fromElement;}}}this.relatedTarget=(Z)?o:Q(o);this.stopPropagation=function(){if(g.stopPropagation){g.stopPropagation();}else{g.cancelBubble=true;}if(X){X.stopPropagation();}};this.stopImmediatePropagation=function(){if(g.stopImmediatePropagation){g.stopImmediatePropagation();}else{this.stopPropagation();}if(X){X.stopImmediatePropagation();}};this.preventDefault=function(){if(g.preventDefault){g.preventDefault();}else{g.returnValue=false;}if(X){X.preventDefault();}};this.halt=function(b){if(b){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};};(function(){var d=D.Lang,c=D.Array,Z=d.isFunction,Y=d.isString,a=d.isBoolean,g=d.isObject,f=d.isNumber,h=["click","dblclick","mouseover","mouseout","mousedown","mouseup","mousemove"],e=["keydown","keyup","keypress"];function b(m,q,l,j,s,i,L,r,o,u,t){if(!m){D.fail("simulateKeyEvent(): Invalid target.");}if(Y(q)){q=q.toLowerCase();switch(q){case"textevent":q="keypress";case"keyup":case"keydown":case"keypress":break;default:D.fail("simulateKeyEvent(): Event type '"+q+"' not supported.");}}else{D.fail("simulateKeyEvent(): Event type must be a string.");}if(!a(l)){l=true;}if(!a(j)){j=true;}if(!g(s)){s=window;}if(!a(i)){i=false;}if(!a(L)){L=false;}if(!a(r)){r=false;}if(!a(o)){o=false;}if(!f(u)){u=0;}if(!f(t)){t=0;}var p=null;if(Z(document.createEvent)){try{p=document.createEvent("KeyEvents");p.initKeyEvent(q,l,j,s,i,L,r,o,u,t);}catch(n){try{p=document.createEvent("Events");}catch(k){p=document.createEvent("UIEvents");}finally{p.initEvent(q,l,j);p.view=s;p.altKey=L;p.ctrlKey=i;p.shiftKey=r;p.metaKey=o;p.keyCode=u;p.charCode=t;}}m.dispatchEvent(p);}else{if(g(document.createEventObject)){p=document.createEventObject();p.bubbles=l;p.cancelable=j;p.view=s;p.ctrlKey=i;p.altKey=L;p.shiftKey=r;p.metaKey=o;p.keyCode=(t>0)?t:u;m.fireEvent("on"+q,p);}else{D.fail("simulateKeyEvent(): No event simulation framework present.");}}}function X(r,w,o,l,x,q,n,m,k,i,j,L,v,t,p,s){if(!r){D.fail("simulateMouseEvent(): Invalid target.");}if(Y(w)){w=w.toLowerCase();if(c.indexOf(h,w)==-1){D.fail("simulateMouseEvent(): Event type '"+w+"' not supported.");}}else{D.fail("simulateMouseEvent(): Event type must be a string.");}if(!a(o)){o=true;}if(!a(l)){l=(w!="mousemove");}if(!g(x)){x=window;}if(!f(q)){q=1;}if(!f(n)){n=0;}if(!f(m)){m=0;}if(!f(k)){k=0;}if(!f(i)){i=0;}if(!a(j)){j=false;}if(!a(L)){L=false;}if(!a(v)){v=false;}if(!a(t)){t=false;}if(!f(p)){p=0;}var u=null;if(Z(document.createEvent)){u=document.createEvent("MouseEvents");if(u.initMouseEvent){u.initMouseEvent(w,o,l,x,q,n,m,k,i,j,L,v,t,p,s);}else{u=document.createEvent("UIEvents");u.initEvent(w,o,l);u.view=x;u.detail=q;u.screenX=n;u.screenY=m;u.clientX=k;u.clientY=i;u.ctrlKey=j;u.altKey=L;u.metaKey=t;u.shiftKey=v;u.button=p;u.relatedTarget=s;}if(s&&!u.relatedTarget){if(w=="mouseout"){u.toElement=s;}else{if(w=="mouseover"){u.fromElement=s;}}}r.dispatchEvent(u);}else{if(g(document.createEventObject)){u=document.createEventObject();u.bubbles=o;u.cancelable=l;u.view=x;u.detail=q;u.screenX=n;u.screenY=m;u.clientX=k;u.clientY=i;u.ctrlKey=j;u.altKey=L;u.metaKey=t;u.shiftKey=v;switch(p){case 0:u.button=1;break;case 1:u.button=4;break;case 2:break;default:u.button=0;}u.relatedTarget=s;r.fireEvent("on"+w,u);}else{D.fail("simulateMouseEvent(): No event simulation framework present.");}}}c.each(h,function(L){D.Event[L]=function(j,i){i=i||{};X(j,L,i.bubbles,i.cancelable,i.view,i.detail,i.screenX,i.screenY,i.clientX,i.clientY,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.button,i.relatedTarget);};});c.each(e,function(L){D.Event[L]=function(j,i){i=i||{};b(j,L,i.bubbles,i.cancelable,i.view,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.keyCode,i.charCode);};});D.Event.simulate=function(j,i,L){if(Z(D.Event[i])){D.Event[i](j,L);}};})();},"@VERSION@");
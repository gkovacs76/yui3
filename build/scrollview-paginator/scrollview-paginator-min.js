YUI.add("scrollview-paginator",function(c,e){var g=c.ClassNameManager.getClassName,t="scrollview",o=g(t,"hidden"),d=g(t,"paged"),h=(c.ScrollView)?c.ScrollView.UI_SRC:"ui",s="index",n="scrollX",m="scrollY",l="total",r="host",u="boundingBox",k="contentBox",f="selector",a="flick",b="drag",j="axis",q="x",p="y";function i(){i.superclass.constructor.apply(this,arguments);}c.extend(i,c.Plugin.Base,{initializer:function(v){var x=this,w=x.get(r);x._pageDims=[];x._pageBuffer=1;x._optimizeMemory=false;x._host=w;x._bb=w._bb;x._cb=w._cb;x._cIndex=x.get(s);x._cAxis=x.get(j);if(v._optimizeMemory){x._optimizeMemory=v._optimizeMemory;}if(v._pageBuffer){x._pageBuffer=v._pageBuffer;}x._bindAttrs();},_bindAttrs:function(){var v=this;v.after({"indexChange":v._afterIndexChange,"axisChange":v._afterAxisChange});v.beforeHostMethod("scrollTo",v._beforeHostScrollTo);v.beforeHostMethod("_mousewheel",v._beforeHostMousewheel);v.beforeHostMethod("_flick",v._beforeHostFlick);v.afterHostMethod("_onGestureMoveEnd",v._afterHostGestureMoveEnd);v.afterHostMethod("_uiDimensionsChange",v._afterHostUIDimensionsChange);v.afterHostMethod("syncUI",v._afterHostSyncUI);v.afterHostEvent("render",v._afterHostRender);v.afterHostEvent("scrollEnd",v._afterHostScrollEnded);},_afterHostRender:function(x){var C=this,y=C._bb,D=C._host,w=C._cIndex,v=C._cAxis,A=C._getPageNodes(),E=A.size(),B=C._pageDims[w].maxScrollX,z=C._pageDims[w].maxScrollY;if(v[p]){D._maxScrollX=B;}else{if(v[q]){D._maxScrollY=z;}}C.set(l,E);if(w!==0){C.scrollToIndex(w,0);}y.addClass(d);C._optimize();},_afterHostSyncUI:function(y){var B=this,w=B._host,x=w.get(a),A=B._getPageNodes(),v=A.size(),z;B.set(l,v);if(B._cAxis===undefined){B._set(j,w.get(j));}},_afterHostUIDimensionsChange:function(y){var B=this,w=B._host,z=w._getScrollDims(),x=z.offsetWidth,v=z.offsetHeight,A=B._getPageNodes();A.each(function(G,D){var C=G.get("scrollWidth"),E=G.get("scrollHeight"),H=Math.max(0,C-x),F=Math.max(0,E-v);if(!B._pageDims[D]){B._pageDims[D]={scrollX:0,scrollY:0,_minScrollX:0,_minScrollY:0,maxScrollX:H,maxScrollY:F};}else{B._pageDims[D].maxScrollX=H;B._pageDims[D].maxScrollY=F;}});},_beforeHostScrollTo:function(F,D,w,C,v){var H=this,I=H._host,G=I._gesture,A=H._cIndex,z=H._cAxis,E=this._getPageNodes(),B;if(G){B=G.axis;if(B===p){F=null;}else{D=null;}if(z[B]===false){v=E.item(A);}}return new c.Do.AlterArgs("new args",[F,D,w,C,v]);},_afterHostGestureMoveEnd:function(y){var A=this,w=A._host,v=w._gesture,z=A._cAxis,x=v&&v.axis;if(z[x]){if(v[(x===q?"deltaX":"deltaY")]>0){A[w.rtl?"prev":"next"]();}else{A[w.rtl?"next":"prev"]();}}},_beforeHostMousewheel:function(x){var A=this,v=A._host,y=v._bb,w=x.wheelDelta<0,z=A._cAxis;v._gesture={axis:p};if(y.contains(x.target)&&z[p]){if(w){A.next();}else{A.prev();}x.preventDefault();return new c.Do.Prevent();}},_beforeHostFlick:function(w){var y=this,x=y.get(j),v=w.flick.axis||false;if(x[v]){return new c.Do.Prevent();}},_afterHostScrollEnded:function(y){var B=this,w=B._host,v=B._cIndex,z=w.get(n),x=w.get(m),A=B._cAxis;if(A[p]){B._pageDims[v].scrollX=z;}else{B._pageDims[v].scrollY=x;}B._optimize();},_afterIndexChange:function(z){var B=this,y=B._host,w=z.newVal,x=B._pageDims[w],v=y._cAxis,A=B._cAxis;B._cIndex=w;if(v[q]&&v[p]){if(A[p]){y._maxScrollX=x.maxScrollX;y.set(n,x.scrollX,{src:h});}else{if(A[q]){y._maxScrollY=x.maxScrollY;y.set(m,x.scrollY,{src:h});}}}if(z.src!==h){B.scrollToIndex(w);}},_optimize:function(){if(!this._optimizeMemory){return false;}var x=this,v=x._cIndex,w=x._getStage(v);x._showNodes(w.visible);x._hideNodes(w.hidden);},_getStage:function(y){var x=this._pageBuffer,w=this.get(l),A=this._getPageNodes(),z=Math.max(0,y-x),v=Math.min(w,y+1+x);return{visible:A.splice(z,v-z),hidden:A};},_showNodes:function(v){if(v){v.removeClass(o).setStyle("visibility","");}},_hideNodes:function(v){if(v){v.addClass(o).setStyle("visibility","hidden");}},_getPageNodes:function(){var z=this,w=z._host,v=w._cb,x=z.get(f),y=x?v.all(x):v.get("children");return y;},next:function(){var y=this,v=y._cIndex,x=v+1,w=this.get(l);if(x>=w){return;}y.set(s,x);},prev:function(){var x=this,v=x._cIndex,w=v-1;if(w<0){return;}x.set(s,w);},scrollTo:function(){return this.scrollToIndex.apply(this,arguments);},scrollToIndex:function(x,A,C){var B=this,z=B._host,w=B._getPageNodes().item(x),y=(B._cAxis[q]?n:m),v=w.get(y===n?"offsetLeft":"offsetTop");A=(A!==undefined)?A:i.TRANSITION.duration;C=(C!==undefined)?A:i.TRANSITION.easing;B.set(s,x);B._showNodes(w);z.set(y,v,{duration:A,easing:C});},_axisSetter:function(w,v){if(c.Lang.isString(w)){return{x:w.match(/x/i)?true:false,y:w.match(/y/i)?true:false};}},_afterAxisChange:function(v){this._cAxis=v.newVal;}},{NAME:"pluginScrollViewPaginator",NS:"pages",ATTRS:{axis:{setter:"_axisSetter",writeOnce:"initOnly"},selector:{value:null},index:{value:0,validator:function(v){return true;}},total:{value:0}},TRANSITION:{duration:300,easing:"ease-out"}});c.namespace("Plugin").ScrollViewPaginator=i;},"@VERSION@",{"requires":["plugin","classnamemanager"]});
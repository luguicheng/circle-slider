(function(t){function e(e){for(var n,a,o=e[0],u=e[1],h=e[2],c=0,d=[];c<o.length;c++)a=o[c],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(d.length)d.shift()();return s.push.apply(s,h||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,o=1;o<i.length;o++){var u=i[o];0!==r[u]&&(n=!1)}n&&(s.splice(e--,1),t=a(a.s=i[0]))}return t}var n={},r={app:0},s=[];function a(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=n,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(i,n,function(e){return t[e]}.bind(null,n));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=e,o=o.slice();for(var h=0;h<o.length;h++)e(o[h]);var l=u;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"App"}},[i("slider",{attrs:{value:t.initialValue,max:t.max,stepMinutes:t.stepMinutes,side:120},on:{input:t.onChange}})],1)},s=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("svg",{ref:"_svg",style:{cursor:"grabbing"===t.pathCursor?"grabbing":"default"},attrs:{width:t.side+"px",height:t.side+"px",viewBox:"0 0 "+t.side+" "+t.side},on:{dblclick:function(e){return t.init([0,t.max])},mouseup:t.handleSvgMouseup,mousewheel:t.handleMousewheel}},[i("circle",{ref:"_circle",attrs:{stroke:t.circleColor,fill:"none","stroke-width":t.cpMainCircleStrokeWidth,cx:t.cpCenter,cy:t.cpCenter,r:t.radius}}),i("text",{staticStyle:{"font-size":"16px","user-select":"none"},attrs:{x:t.side/2-31,y:t.side/2-8,fill:"#555"}},[t._v(" 起 "+t._s(t.sliderTime.split("-")[0])+" ")]),i("text",{staticStyle:{"font-size":"16px","user-select":"none"},attrs:{x:t.side/2-31,y:t.side/2+13,fill:"#555"}},[t._v(" 止 "+t._s(t.sliderTime.split("-")[1])+" ")]),i("line",{staticStyle:{stroke:"#ccc","stroke-width":"2"},attrs:{x1:t.side/2-2,y1:t.line.y1,x2:t.side/2-2,y2:t.line.y2}}),i("path",{ref:"_path",style:{cursor:t.pathCursor},attrs:{stroke:t.progressColor,fill:"none","stroke-width":t.cpPathStrokeWidth,d:t.cpPathD},on:{mousedown:t.pathMousedown,mouseup:t.pathMouseup}}),i("circle",{staticStyle:{cursor:"move"},attrs:{title:"开始时间",fill:t.knobColorStart,r:t.cpKnobRadius,cx:t.cpPathXStart,cy:t.cpPathYStart,"data-pos":"start"},on:{touchmove:function(e){return t.handleTouchMove(e,"start")},mousedown:function(e){return t.handleMouseDown(e,"start")},mouseup:t.handleMouseUp}}),i("circle",{staticStyle:{cursor:"move"},attrs:{title:"结束时间",fill:t.knobColor,r:t.cpKnobRadius,cx:t.cpPathX,cy:t.cpPathY,"data-pos":"end"},on:{touchmove:function(e){return t.handleTouchMove(e,"end")},mousedown:function(e){return t.handleMouseDown(e,"end")},mouseup:t.handleMouseUp}})])])},o=[],u=(i("a9e3"),i("a15b"),i("a630"),i("3ca3"),i("ac1f"),i("1276"),i("4d90"),i("d3b7"),i("25f0"),i("2af1"),i("d4ec")),h=i("bee2"),l=function(){function t(e,i,n){Object(u["a"])(this,t),this.containerElement=e,this.sliderRadius=i,this.sliderTolerance=n,this.setNewPosition({x:0,y:0})}return Object(h["a"])(t,[{key:"setNewPosition",value:function(t){var e=this.containerElement.getBoundingClientRect(),i=e.width;this.center=i/2,this.relativeX=t.clientX-e.left,this.relativeY=t.clientY-e.top}},{key:"sliderAngle",get:function(){return(Math.atan2(this.relativeY-this.center,this.relativeX-this.center)+3*Math.PI/2)%(2*Math.PI)}},{key:"isTouchWithinSliderRange",get:function(){var t=Math.sqrt(Math.pow(Math.abs(this.relativeX-this.center),2)+Math.pow(Math.abs(this.relativeY-this.center),2));return Math.abs(t-this.sliderRadius)<=this.sliderTolerance}}]),t}(),c=(i("c740"),i("35b3"),function(){function t(e,i,n){Object(u["a"])(this,t),this.steps=e,this.offset=i,this.currentStepStartIndex=0,this.currentStepIndex=0,this.length=this.steps.length-1,n.length&&(this.firstStep=n[0],this.lastStep=n[1],this.currentStepStartIndex=this.steps.findIndex((function(t){return t===n[0]})),this.currentStepIndex=this.steps.findIndex((function(t){return t===n[1]})))}return Object(h["a"])(t,[{key:"angleUnit",get:function(){return(2*Math.PI-this.offset)/this.length}},{key:"angleValue",get:function(){return Math.min(this.offset+this.angleUnit*this.currentStepIndex,2*Math.PI-Number.EPSILON)-1e-5}},{key:"angleStartValue",get:function(){return Math.min(this.offset+this.angleUnit*this.currentStepStartIndex,2*Math.PI-Number.EPSILON)-1e-5}},{key:"currentStep",get:function(){return this.steps[this.currentStepIndex]}},{key:"currentStepStart",get:function(){return this.steps[this.currentStepStartIndex]}},{key:"updateCurrentStepFromValue",value:function(t,e){for(var i=0;i<this.length;i++)if(t<=this.steps[i])return"start"==e&&(this.firstStep=t,this.currentStepStartIndex=i),void("end"==e&&(this.lastStep=t,this.currentStepIndex=i))}},{key:"updateCurrentStepFromAngle",value:function(t,e){var i=Math.round((t-this.offset)/this.angleUnit);"start"==e&&(this.currentStepStartIndex=Math.min(Math.max(i,0),this.length),this.firstStep=this.steps[this.currentStepStartIndex]),"end"==e&&(this.currentStepIndex=Math.min(Math.max(i,0),this.length),this.lastStep=this.steps[this.currentStepIndex])}}]),t}()),d={name:"RoundSlider",props:{startAngleOffset:{type:Number,required:!1,default:function(){return 0}},value:{type:[Array,String],required:!1,default:function(){return[22,6]}},side:{type:Number,required:!1,default:100},stepSize:{type:Number,required:!1,default:1},min:{type:Number,required:!1,default:0},max:{type:Number,required:!1,default:24},circleColor:{type:String,required:!1,default:"#ccc"},progressColor:{type:String,required:!1,default:"#00be7e"},knobColor:{type:String,required:!1,default:"#be7e00"},knobColorStart:{type:String,required:!1,default:"#00be7e"},knobRadius:{type:Number,required:!1,default:null},knobRadiusRel:{type:Number,required:!1,default:7},circleWidth:{type:Number,required:!1,default:null},circleWidthRel:{type:Number,required:!1,default:20},progressWidth:{type:Number,required:!1,default:null},progressWidthRel:{type:Number,required:!1,default:10},stepMinutes:{type:Number,required:!1,default:30}},data:function(){return{pathCursor:"grab",moving:null,line:{y1:this.side-14,y2:this.side-6},sliderTime:"",steps:null,stepsCount:null,radius:0,angle:0,angleStart:0,currentStepValue:0,currentStepStartValue:0,mousePressed:!1,circleSliderState:null,mousemoveTicks:0,pos:"",touchPosition:null,isShiftPress:!1,startDelta:0,endDelta:0,startX:0,startY:0}},computed:{cpCenter:function(){return this.side/2},cpAngle:function(){return this.angle+Math.PI/2},cpAngleStart:function(){return this.angleStart+Math.PI/2},cpMainCircleStrokeWidth:function(){return this.circleWidth||this.side/2/this.circleWidthRel},cpPathDirection:function(){var t=1;return t=this.cpAngleStart>this.cpAngle?this.cpAngleStart-this.cpAngle<Math.PI?1:0:this.cpAngle-this.cpAngleStart<Math.PI?0:1,t},cpPathDirectionStart:function(){return this.cpAngle<1.5*Math.PI?0:1},cpPathX:function(){return this.cpCenter+this.radius*Math.cos(this.cpAngle)},cpPathY:function(){return this.cpCenter+this.radius*Math.sin(this.cpAngle)},cpPathXStart:function(){return this.cpCenter+this.radius*Math.cos(this.cpAngleStart)},cpPathYStart:function(){return this.cpCenter+this.radius*Math.sin(this.cpAngleStart)},cpPathStrokeWidth:function(){return this.progressWidth||this.side/2/this.progressWidthRel},cpKnobRadius:function(){return this.knobRadius||this.side/2/this.knobRadiusRel},cpPathD:function(){var t=[];t.push("M"+this.cpPathXStart),t.push(this.cpPathYStart),t.push("A"),t.push(this.radius),t.push(this.radius),t.push(0),t.push(this.cpPathDirection),t.push(1);var e=this.cpPathX,i=this.cpPathY;return 0==this.currentStepStartValue&&this.currentStepValue==this.max&&(e=Math.ceil(this.cpPathX)),t.push(e),t.push(i),t.join(" ")}},watch:{value:{handler:function(t){var e=t;e=this.stringToArray(t),this.updateFromPropValue(e)},immediate:!0}},created:function(){var t=this;this.stepsCount=1+(this.max-this.min)/this.stepSize,this.steps=Array.from({length:this.stepsCount},(function(e,i){return t.min+i*t.stepSize})),this.init(this.value),this.eventListener(),window.addEventListener("mouseup",(function(){t.moving=!1}))},mounted:function(){var t=this.cpKnobRadius,e=t<this.cpPathStrokeWidth?this.cpPathStrokeWidth:t;this.touchPosition=new l(this.$refs._svg,this.radius,e),this.setFlagPosition()},beforeDestroy:function(){this.removeKeyboardListener()},methods:{init:function(t){var e=this.stringToArray(t);this.circleSliderState=new c(this.steps,this.startAngleOffset,e),this.angle=this.circleSliderState.angleValue,this.angleStart=this.circleSliderState.angleStartValue,this.currentStepStartValue=this.circleSliderState.currentStepStart,this.currentStepValue=this.circleSliderState.currentStep;var i=Math.max(this.cpMainCircleStrokeWidth,this.cpPathStrokeWidth);this.radius=this.side/2-Math.max(i,2*this.cpKnobRadius)/2,this.updateFromPropValue(e)},initMoving:function(){this.moving=null},pathMousedown:function(t){this.startX=t.x,this.startY=t.y,this.pathCursor="grabbing",this.touchPosition.setNewPosition(t);var e=this.touchPosition.sliderAngle;this.startDelta=e-this.angleStart,this.endDelta=this.angle-e,this.initMoving(),this.angleStart>this.angle&&(e<=Math.PI?this.startDelta=e+(2*Math.PI-this.angleStart):this.endDelta=this.angle+(2*Math.PI-e)),window.addEventListener("mousemove",this.handlePathMousemove),window.addEventListener("mouseup",this.handlePathMouseup)},pathMouseup:function(){window.removeEventListener("mousemove",this.handlePathMousemove),window.removeEventListener("mouseup",this.handlePathMouseup)},handlePathMousemove:function(t){if(!1!==this.moving&&(this.startX!==t.x||this.startY!==t.y)){this.moving=!0,this.touchPosition.setNewPosition(t);var e=this.touchPosition.sliderAngle,i=e-this.startDelta,n=e+this.endDelta;i<=0&&(i=2*Math.PI-(this.startDelta-e)),n>=2*Math.PI&&(n=this.endDelta-(2*Math.PI-e)),this.moveSlider(i,n)}},handlePathMouseup:function(t){this.pathCursor="grab"},moveSlider:function(t,e){var i=this,n=function(){i.pos="start",i.updateAngle(t),i.$nextTick((function(){i.pos="end",i.updateAngle(e)}))};window.requestAnimationFrame(n)},setFlagPosition:function(){var t=this.$refs._circle.getBoundingClientRect(),e=this.cpKnobRadius,i=this.cpMainCircleStrokeWidth<e?e:this.cpMainCircleStrokeWidth;this.line.y1=t.height+(this.side-2*this.radius)/2-i,this.line.y2=t.height+(this.side-2*this.radius)/2},removeKeyboardListener:function(){window.removeEventListener("keydown",this.keydownListener),window.removeEventListener("keyup",this.keyupListener)},eventListener:function(){window.addEventListener("keydown",this.keydownListener),window.addEventListener("keyup",this.keyupListener)},keydownListener:function(t){"Shift"==t.key&&(this.isShiftPress=!0)},keyupListener:function(t){"Shift"==t.key&&(this.isShiftPress=!1)},stringToArray:function(t){var e=t;if("string"===typeof e){var i=t.split("-"),n=i[0],r=i[1],s=n.split(":"),a=r.split(":"),o=60*Number(s[0])+Number(s[1]),u=60*Number(a[0])+Number(a[1]),h=o/this.stepMinutes,l=u/this.stepMinutes;e=[h,l]}return e},arrayToString:function(t){var e="",i=t[0]*this.stepMinutes,n=t[1]||this.max,r=n*this.stepMinutes,s=Math.floor(i/60).toString().padStart(2,0)+":"+(i%60).toString().padStart(2,0),a=Math.floor(r/60).toString().padStart(2,0)+":"+(r%60).toString().padStart(2,0);return e=s+"-"+a,e},getValue:function(){var t=[this.circleSliderState.firstStep,this.circleSliderState.lastStep],e=this.arrayToString(t);return this.sliderTime=e.toString(),e},fitToStep:function(t){return Math.round(t/this.stepSize)*this.stepSize},handleMousewheel:function(t){this.pos="end",this.isShiftPress&&(this.pos="start");var e=Math.sign(t.deltaY),i=e*(2*Math.PI)/this.max,n=this.circleSliderState.angleValue;this.isShiftPress&&(n=this.circleSliderState.angleStartValue),-1e-5==n&&(n=2*Math.PI),n==2*Math.PI-1e-5&&(n=1e-5);var r=n-i;this.updateAngle(r)},handleSvgMouseup:function(t){if(this.pathCursor="grab",this.moving)this.moving=!1;else if(this.touchPosition.setNewPosition(t),this.touchPosition.isTouchWithinSliderRange){var e=this.touchPosition.sliderAngle;this.pos="end";var i=this.angle;this.isShiftPress&&(this.pos="start",i=this.angleStart),this.animateSlider(i,e)}},handleMouseDown:function(t,e){return this.pos=e,t.preventDefault(),t.stopPropagation(),this.mousePressed=!0,window.addEventListener("mousemove",this.handleWindowMouseMove),window.addEventListener("mouseup",this.handleMouseUp),!1},handleMouseUp:function(t){return this.pos="",t.preventDefault(),t.stopPropagation(),this.mousePressed=!1,window.removeEventListener("mousemove",this.handleWindowMouseMove),window.removeEventListener("mouseup",this.handleMouseUp),this.mousemoveTicks=0,!1},handleTouchMove:function(t,e){if(this.pos=e,this.$emit("touchmove"),t.targetTouches.length>1||t.changedTouches.length>1||t.touches.length>1)return!0;var i=t.targetTouches.item(t.targetTouches.length-1);this.touchPosition.setNewPosition(i),this.touchPosition.isTouchWithinSliderRange&&(t.preventDefault(),this.updateSlider())},handleWindowMouseMove:function(t){this.mousePressed&&(t.preventDefault(),this.touchPosition.setNewPosition(t),this.updateSlider())},updateAngle:function(t){0==t&&"end"==this.pos?this.circleSliderState.updateCurrentStepFromAngle(2*Math.PI,this.pos):this.circleSliderState.updateCurrentStepFromAngle(t,this.pos),"start"==this.pos&&(this.angleStart=this.circleSliderState.angleStartValue),"end"==this.pos&&(this.angle=this.circleSliderState.angleValue),this.currentStepValue=this.circleSliderState.currentStep,this.currentStepStartValue=this.circleSliderState.currentStepStart;var e=this.getValue();this.$emit("input",e)},updateFromPropValue:function(t){var e=this;this.$nextTick((function(){var i=e.fitToStep(t[0]);e.circleSliderState.updateCurrentStepFromValue(i,"start");var n=e.fitToStep(t[1]);e.circleSliderState.updateCurrentStepFromValue(n,"end"),e.angleStart=e.circleSliderState.angleStartValue,e.angle=e.circleSliderState.angleValue,e.currentStepStartValue=i,e.currentStepValue=n;var r=e.getValue();e.$emit("input",r)}))},updateSlider:function(){var t=this.touchPosition.sliderAngle;this.updateAngle(t)},animateSlider:function(t,e,i){var n=this;if(!i){var r=this.angle;"start"===this.pos&&(r=this.angleStart);var s=e-r;e<r&&(s=e+(2*Math.PI-r)),i=s<Math.PI?1:-1}var a=i*this.circleSliderState.angleUnit*2,o=function(){if(Math.abs(e-t)<Math.abs(2*a))n.updateAngle(e);else{var r=n.angle;"start"===n.pos&&(r=n.angleStart);var s=t+a;-1==i&&-1e-5==r&&(s=2*Math.PI),1===i&&r==2*Math.PI-1e-5&&(s=1e-5),n.updateAngle(s),n.animateSlider(s,e,i)}};window.requestAnimationFrame(o)}}},p=d,f=i("2877"),S=Object(f["a"])(p,a,o,!1,null,null,null),g=S.exports,m={name:"circle-slider",components:{Slider:g},props:{},data:function(){return{initialValue:"22:00-02:00",stepMinutes:5}},mounted:function(){},computed:{max:function(){var t=1440,e=t/this.stepMinutes;return e}},created:function(){},beforeDestroy:function(){},methods:{onChange:function(t){}}},v=m,M=Object(f["a"])(v,r,s,!1,null,"da9e102a",null),P=M.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(P)}}).$mount("#app")}});
//# sourceMappingURL=app.2abd8bc1.js.map
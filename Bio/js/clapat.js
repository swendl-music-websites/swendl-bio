"use strict";var _ie,_firefox,_opera,_webkit,_chrome,_ie_real_version,_osx,_windows,_linux,_android,_win64,_iphone,_ipad,_native,_mobile,_populated=!1;function _populate(){if(!_populated){_populated=!0;var t=navigator.userAgent,e=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(t),i=/(Mac OS X)|(Windows)|(Linux)/.exec(t);if(_iphone=/\b(iPhone|iP[ao]d)/.exec(t),_ipad=/\b(iP[ao]d)/.exec(t),_android=/Android/i.exec(t),_native=/FBAN\/\w+;/i.exec(t),_mobile=/Mobile/i.exec(t),_win64=!!/Win64/.exec(t),e){(_ie=e[1]?parseFloat(e[1]):e[5]?parseFloat(e[5]):NaN)&&document&&document.documentMode&&(_ie=document.documentMode);var s=/(?:Trident\/(\d+.\d+))/.exec(t);_ie_real_version=s?parseFloat(s[1])+4:_ie,_firefox=e[2]?parseFloat(e[2]):NaN,_opera=e[3]?parseFloat(e[3]):NaN,_chrome=(_webkit=e[4]?parseFloat(e[4]):NaN)&&(e=/(?:Chrome\/(\d+\.\d+))/.exec(t))&&e[1]?parseFloat(e[1]):NaN}else _ie=_firefox=_opera=_chrome=_webkit=NaN;if(i){if(i[1]){var n=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(t);_osx=!n||parseFloat(n[1].replace("_","."))}else _osx=!1;_windows=!!i[2],_linux=!!i[3]}else _osx=_windows=_linux=!1}}var useHasFeature,UserAgent_DEPRECATED={ie:function(){return _populate()||_ie},ieCompatibilityMode:function(){return _populate()||_ie_real_version>_ie},ie64:function(){return UserAgent_DEPRECATED.ie()&&_win64},firefox:function(){return _populate()||_firefox},opera:function(){return _populate()||_opera},webkit:function(){return _populate()||_webkit},safari:function(){return UserAgent_DEPRECATED.webkit()},chrome:function(){return _populate()||_chrome},windows:function(){return _populate()||_windows},osx:function(){return _populate()||_osx},linux:function(){return _populate()||_linux},iphone:function(){return _populate()||_iphone},mobile:function(){return _populate()||_iphone||_ipad||_android||_mobile},nativeApp:function(){return _populate()||_native},android:function(){return _populate()||_android},ipad:function(){return _populate()||_ipad}},canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement),ExecutionEnvironment={canUseDOM:canUseDOM,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:canUseDOM&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:canUseDOM&&!!window.screen,isInWorker:!canUseDOM};function isEventSupported(t,e){if(!ExecutionEnvironment.canUseDOM||e&&!("addEventListener"in document))return!1;var i="on"+t,s=i in document;if(!s){var n=document.createElement("div");n.setAttribute(i,"return;"),s="function"==typeof n[i]}return!s&&useHasFeature&&"wheel"===t&&(s=document.implementation.hasFeature("Events.wheel","3.0")),s}ExecutionEnvironment.canUseDOM&&(useHasFeature=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));var PIXEL_STEP=10,LINE_HEIGHT=40,PAGE_HEIGHT=800;function normalizeWheel(t){var e=0,i=0,s=0,n=0;return"detail"in t&&(i=t.detail),"wheelDelta"in t&&(i=-t.wheelDelta/120),"wheelDeltaY"in t&&(i=-t.wheelDeltaY/120),"wheelDeltaX"in t&&(e=-t.wheelDeltaX/120),"axis"in t&&t.axis===t.HORIZONTAL_AXIS&&(e=i,i=0),s=e*PIXEL_STEP,n=i*PIXEL_STEP,"deltaY"in t&&(n=t.deltaY),"deltaX"in t&&(s=t.deltaX),(s||n)&&t.deltaMode&&(1==t.deltaMode?(s*=LINE_HEIGHT,n*=LINE_HEIGHT):(s*=PAGE_HEIGHT,n*=PAGE_HEIGHT)),s&&!e&&(e=s<1?-1:1),n&&!i&&(i=n<1?-1:1),{spinX:e,spinY:i,pixelX:s,pixelY:n}}normalizeWheel.getEventType=function(){return UserAgent_DEPRECATED.firefox()?"DOMMouseScroll":isEventSupported("wheel")?"wheel":"mousewheel"};const store={ww:window.innerWidth,wh:window.innerHeight,isDevice:navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)};class ClapatSlider{constructor(t,e={}){if(this.bindAll(),this.isElement(t))this.el=t,this.el.clapat_slider=this;else{let i=document.querySelectorAll(t);for(let s=0;s<i.length;s++){let n=i[s];0==s?(this.el=n,this.el.clapat_slider=this):new ClapatSlider(n,e)}}this.opts=Object.assign({debug:!1,direction:"horizontal",eventTarget:".clapat-slider",inner:".clapat-slider-viewport",slides:".clapat-slide",clones:"clapat-slide-clone",snap:!1,snapwait:{before:10,after:80},speed:2,threshold:50,ease:.075,click:!1,mousewheel:!0,navigation:!0,pagination:!0,renderBullet:null,parallax:null,on:{init:null,activeSlideChange:null,slideEnterViewport:null,slideLeaveViewport:null}},e),this.elEventTarget=this.el.querySelector(this.opts.eventTarget),this.elInner=this.el.querySelector(this.opts.inner),this.btnNext=this.btnPrev=null,this.isObject(this.opts.navigation)||1==this.opts.navigation&&(this.btnNext=this.el.querySelector(".clapat-button-next"),this.btnPrev=this.el.querySelector(".clapat-button-prev")),this.isObject(this.opts.navigation)&&(this.btnNext=document.querySelector(this.opts.navigation.nextEl),this.btnPrev=document.querySelector(this.opts.navigation.prevEl)),null!=this.btnNext&&this.btnNext.addEventListener("click",this.debounce(this.onNext,50)),null!=this.btnPrev&&this.btnPrev.addEventListener("click",this.debounce(this.onPrev,50)),this.elPagination=null,this.isObject(this.opts.pagination)||1==this.opts.pagination&&(this.elPagination=this.el.querySelector(".clapat-pagination")),this.isObject(this.opts.pagination)&&(this.elPagination=this.el.querySelector(this.opts.navigation.el)),this.vh=store.wh,this.vw=store.ww,this.vshifth=0,this.vshiftw=0,this.state={target:0,current:0,currentRounded:0,currentScrollDirection:0,currentSlideItem:null,moveOffset:0,y:0,on:{x:0,y:0},off:0,progress:0,diff:0,flags:{mousedown:!1,dragging:!1,click:!0,resizing:!1}},this.items=[],this.itemsInitial=[],this.itemsCloned=[],this.itemsPagination=[],this.tl=null,this.events={move:store.isDevice?"touchmove":"mousemove",up:store.isDevice?"touchend":"mouseup",down:store.isDevice?"touchstart":"mousedown",click:"click",wheel:"wheel",mousewheel:"mousewheel",resize:"resize"},this.enabled=!0,this.length=0,this.updater=gsap.set(this.updateUI,{delay:.2,onRepeat:this.updateUI,repeat:-1,repeatDelay:.2}),this.snapWheelEvents={tsSnap:null,events:[]},this.init(),ClapatSlider.instances.push(this)}bindAll(){["onDown","onMove","onUp","onClick","onWheel","onResize","onPagination","onPrev","onNext","updateUI","updateWheelSnap","tick"].forEach(t=>this[t]=this[t].bind(this))}init(){return gsap.utils.pipe(this.setup(),this.setupEvents())}on(t,e){this.opts.on[t]=e}destroy(){this.off(),this.state=null,this.items=null,this.opts=null,this.ui=null}setupEvents(){let{move:t,up:e,down:i,resize:s,wheel:n,mousewheel:l}=this.events,a=this.elEventTarget;null!=a&&(a.addEventListener(i,this.onDown),a.addEventListener(t,this.onMove),this.opts.mousewheel&&(a.addEventListener(n,this.onWheel),a.addEventListener(l,this.onWheel)),window.addEventListener(e,this.onUp)),window.addEventListener(s,this.debounce(this.onResize,250))}off(){let{move:t,up:e,down:i,resize:s,wheel:n,mousewheel:l}=this.events,a=this.elEventTarget;null!=a&&(a.removeEventListener(i,this.onDown),a.removeEventListener(t,this.onMove),this.opts.mousewheel&&(a.removeEventListener(n,this.onWheel),a.removeEventListener(l,this.onWheel)),window.removeEventListener(e,this.onUp)),null!=this.btnNext&&this.btnNext.removeEventListener("click",this.debounce(this.onNext,50)),null!=this.btnPrev&&this.btnPrev.removeEventListener("click",this.debounce(this.onPrev,50)),null!=this.el&&0!=this.opts.click&&this.el.removeEventListener("click",this.onClick),window.removeEventListener(s,this.debounce(this.onResize,250)),this.updater.kill(),this.updater=null,gsap.ticker.remove(this.tick)}viewportSize(){return"vertical"==this.opts.direction?this.vh:this.vw}viewportShift(){return"vertical"==this.opts.direction?this.vshifth:this.vshiftw}setup(){if(null!=this.el){let{top:t,left:e,width:i,height:s}=this.el.getBoundingClientRect();this.vh=s,this.vw=i,this.vshifth=t,this.vshiftw=e}let n=this.elInner.querySelectorAll(this.opts.slides),l=1;for(let a=n.length-1;a>=0;a--){let h=n[a],r=h.cloneNode(!0);"vertical"==this.opts.direction?(h.style.top=100*a+"%",r.style.top=-(100*l)+"%",r.classList.add(this.opts.clones),this.elInner.append(r)):(h.style.left=100*a+"%",r.style.left=-(100*l)+"%",r.classList.add(this.opts.clones),this.elInner.prepend(r)),l++}if(null!=this.elPagination)for(let o=0;o<n.length;o++){n[o];let p=document.createElement("div");p.classList.add("clapat-pagination-bullet"),"function"==typeof this.opts.renderBullet&&(p.innerHTML=this.opts.renderBullet()),this.elPagination.appendChild(p),p.addEventListener("click",this.onPagination),this.itemsPagination.push({el:p})}this.tl=gsap.timeline({paused:!0,defaults:{duration:1,ease:"linear"}});let g=this.elInner.querySelectorAll(this.opts.slides);for(let c=0;c<g.length;c++){let d=g[c],{left:u,right:v,top:m,bottom:f,width:$,height:w}=d.getBoundingClientRect(),E=null;"vertical"==this.opts.direction?(E={el:d,start:m,end:f,length:w,translate:0},this.length+=w):(E={el:d,start:u,end:v,length:$,translate:0},this.length+=$),d.classList.contains(this.opts.clones)?(this.itemsCloned.push(E),E.clone=!0):(this.itemsInitial.push(E),E.clone=!1),this.items.push(E)}"vertical"==this.opts.direction&&this.itemsCloned.reverse();let b=n.length;if("vertical"==this.opts.direction){for(let x=0;x<b;x++){let S=this.items[x];S.prevElement=0==x?this.items[b]:this.items[x-1],S.nextElement=x==b-1?this.items[this.items.length-1]:this.items[x+1]}for(let _=this.items.length-1;_>=b;_--){let L=this.items[_];_==this.items.length-1?L.prevElement=this.items[b-1]:L.prevElement=this.items[_+1],L.nextElement=_==b?this.items[0]:this.items[_-1]}}else for(let P=0;P<this.items.length;P++){let I=this.items[P];I.prevElement=0==P?this.items[this.items.length-1]:this.items[P-1],P==this.items.length-1?I.nextElement=this.items[0]:I.nextElement=this.items[P+1]}null!=this.el&&0!=this.opts.click&&this.el.addEventListener("click",this.onClick),gsap.ticker.add(this.tick)}tick(){this.render()}calc(){let t=this.state;t.current+=(t.target-t.current)*this.opts.ease,t.currentRounded=Math.round(100*t.current)/100,t.diff=t.target-t.currentRounded;let e=Math.round(-this.length/2*100)/100;t.progress=gsap.utils.wrap(0,1,t.currentRounded/e),t.moveOffset=gsap.utils.wrap(0,this.length,Math.abs(t.currentRounded)),this.tl&&this.tl.progress(t.progress)}render(){this.state.flags.resizing||(this.opts.snap&&this.updateWheelSnap(),this.calc(),this.transformItems(),this.parallax())}transformItems(){let t=this.viewportSize(),e=this.viewportShift();for(let i=0;i<this.items.length;i++){let s=this.items[i],n=this.state.moveOffset*Math.sign(this.state.currentRounded);n<0&&s.end+n<t+e+s.length-this.length&&(n+=this.length),n>0&&s.end+n>this.length&&(n-=this.length),"vertical"==this.opts.direction?s.el.style.transform="translate(0, "+n+"px)":s.el.style.transform="translate("+n+"px, 0)"}}updateUI(){let t=this.viewportSize(),e=this.viewportShift(),i=this.elInner.getBoundingClientRect(),s=gsap.utils.wrap(0,this.length,Math.abs(this.state.target)),n=Math.sign(this.state.target);null!=this.el&&(this.state.currentScrollDirection>=0?(this.el.classList.contains("bw")&&this.el.classList.remove("bw"),this.el.classList.add("fw")):(this.el.classList.contains("fw")&&this.el.classList.remove("fw"),this.el.classList.add("bw")));let l=this.state.currentSlideItem;this.state.currentSlideItem=null;for(let a=0;a<this.items.length;a++){let h=this.items[a],r=s*n;r<0&&h.end+r<t+e+h.length-this.length&&(r+=this.length),r>0&&h.end+r>this.length&&(r-=this.length);let o=h.start+r-(e+(t-h.length)/2);if(Math.abs(o)<h.length/2?(h.el.classList.add("clapat-slide-active"),h.nextElement.el.classList.add("clapat-slide-next"),h.nextElement.nextElement.el.classList.add("clapat-slide-next-two"),h.nextElement.nextElement.nextElement.el.classList.add("clapat-slide-next-three"),h.prevElement.el.classList.add("clapat-slide-prev"),h.prevElement.prevElement.el.classList.add("clapat-slide-prev-two"),h.prevElement.prevElement.prevElement.el.classList.add("clapat-slide-prev-three"),this.state.currentSlideItem=h,null!=l&&l!==this.state.currentSlideItem&&"function"==typeof this.opts.on.activeSlideChanged&&this.opts.on.activeSlideChanged(this.state.currentSlideItem.el,this.state.currentSlideItem.prevElement.el,this.state.currentSlideItem.nextElement.el)):(h.el.classList.remove("clapat-slide-active"),h.nextElement.el.classList.remove("clapat-slide-next"),h.nextElement.nextElement.el.classList.remove("clapat-slide-next-two"),h.nextElement.nextElement.nextElement.el.classList.remove("clapat-slide-next-three"),h.prevElement.el.classList.remove("clapat-slide-prev"),h.prevElement.prevElement.el.classList.remove("clapat-slide-prev-two"),h.prevElement.prevElement.prevElement.el.classList.remove("clapat-slide-prev-three")),h.end+r>e&&h.start+r<t+e?h.el.classList.add("clapat-slide-visible"):h.el.classList.remove("clapat-slide-visible"),h.translate!=r){let p=this.isItemInsideView(i,h);h.translate=r;let g=this.isItemInsideView(i,h);p&&!g&&"function"==typeof this.opts.on.slideLeaveViewport&&this.opts.on.slideLeaveViewport(h.el),!p&&g&&"function"==typeof this.opts.on.slideEnterViewport&&this.opts.on.slideEnterViewport(h.el)}}this.state.flags.dragging?this.el.classList.add("clapat-state-dragging"):this.el.classList.remove("clapat-state-dragging"),this.updatePaginationUI(),null==l&&"function"==typeof this.opts.on.init&&this.opts.on.init()}updatePaginationUI(){if(this.opts.pagination&&!(this.itemsPagination.length<=0)&&null!=this.state.currentSlideItem){let t=null;t=this.state.currentSlideItem.clone?this.itemsCloned:this.itemsInitial;let e=-1;for(let i=0;i<t.length;i++){let s=t[i];if(this.state.currentSlideItem.el===s.el){e=i;break}}let n=this.itemsPagination[e];null!=n&&n.el.classList.add("clapat-pagination-bullet-active");let l=e-1;l<0&&(l=this.itemsPagination.length-1);let a=this.itemsPagination[l];null!=a&&a.el.classList.add("clapat-pagination-bullet-prev");let h=e+1;h>=this.itemsPagination.length&&(h=0);let r=this.itemsPagination[h];null!=r&&r.el.classList.add("clapat-pagination-bullet-next");for(let o=0;o<this.itemsPagination.length;o++){let p=this.itemsPagination[o];o!=e&&p.el.classList.remove("clapat-pagination-bullet-active"),o!=h&&p.el.classList.remove("clapat-pagination-bullet-next"),o!=l&&p.el.classList.remove("clapat-pagination-bullet-prev")}}}parallax(){if(null==this.opts.parallax||0==this.opts.parallax)return;let t=this.viewportSize(),e=this.viewportShift(),i=(this.elInner.getBoundingClientRect(),this.state.moveOffset*Math.sign(this.state.currentRounded));for(let s=0;s<this.items.length;s++){let n=this.items[s],l=i;if(l<0&&n.end+l<t+e+n.length-this.length&&(l+=this.length),l>0&&n.end+l>this.length&&(l-=this.length),n.end+l>e&&n.start+l<t+e){let a=n.start+l-(e+(t-n.length)/2);if(Array.isArray(this.opts.parallax))for(let h=0;h<this.opts.parallax.length;h++){let r=this.opts.parallax[h];if(void 0!==r.element&&void 0!==r.margin){let o=n.el.querySelectorAll(r.element),p=-r.margin*a*2/(n.length+t);for(let g=0;g<o.length;g++){let c=o[g];"vertical"==this.opts.direction?c.style.transform="translateY("+p+"%)":c.style.transform="translateX("+p+"%)"}}}}}}snapTargetOnDrag(t){let e=this.viewportSize(),i=this.viewportShift(),s=gsap.utils.wrap(0,this.length,Math.abs(t)),n=Math.sign(t);for(let l=0;l<this.items.length;l++){let a=this.items[l],h=s*n;h<0&&a.end+h<e+i+a.length-this.length&&(h+=this.length),h>0&&a.end+h>this.length&&(h-=this.length);let r=a.start+h-(i+(e-a.length)/2);if(Math.abs(r)<a.length/2)return t-r}return t}snapTargetOnWheel(t,e){let i=this.viewportSize(),s=this.viewportShift(),n=gsap.utils.wrap(0,this.length,Math.abs(t)),l=Math.sign(t),a=-1;for(let h=0;h<this.items.length;h++){let r=this.items[h],o=n*l;o<0&&r.end+o<i+s+r.length-this.length&&(o+=this.length),o>0&&r.end+o>this.length&&(o-=this.length);let p=r.start+o-(s+(i-r.length)/2);if(Math.abs(p)<r.length/2){a=h;break}}let g=gsap.utils.wrap(0,this.length,Math.abs(e)),c=Math.sign(e);for(let d=0;d<this.items.length;d++){let u=this.items[d],v=g*c;v<0&&u.end+v<i+s+u.length-this.length&&(v+=this.length),v>0&&u.end+v>this.length&&(v-=this.length);let m=u.start+v-(s+(i-u.length)/2);if(Math.abs(m)<u.length/2)return a==d&&Math.abs(e-t)<this.length?(this.log("Snapping - start and end items are the same, the scroll did not go over a full item"),this.state.currentScrollDirection>0?m<0?e-(u.length/2+m+u.nextElement.length/2):e-m:m<0?e-m:e-m+u.prevElement.length):(this.log("Snapping - start and end items are different"),e-m)}return e}getPos({changedTouches:t,clientX:e,clientY:i,target:s}){return{x:t?t[0].clientX:e,y:t?t[0].clientY:i,target:s}}onDown(t){if(!this.enabled)return;let{x:e,y:i}=this.getPos(t),{flags:s,on:n}=this.state;s.mousedown=!0,n.x=e,n.y=i}onMove(t){if(!this.enabled)return;let e=this.state;if(!e.flags.mousedown)return;let{x:i,y:s}=this.getPos(t);e.flags.dragging=!0;let{off:n,on:l}=e,a=i-l.x,h=s-l.y;Math.abs(a)>Math.abs(h)&&t.cancelable&&t.preventDefault(),"vertical"==this.opts.direction?(e.target=n+h*this.opts.speed,e.currentScrollDirection=-Math.sign(h)):(e.target=n+a*this.opts.speed,e.currentScrollDirection=-Math.sign(a))}onUp(t){if(!this.enabled)return;this.log("on up");let e=this.state;this.opts.snap&&(e.target=this.snapTargetOnDrag(e.target));let i=e.flags.dragging;if(e.flags.mousedown=!1,e.flags.dragging=!1,e.off=e.target,i){if(e.flags.click=!1,t.cancelable)return t.preventDefault(),t.stopPropagation(),this.log("ending dragging"),!1}else e.flags.click=!0,this.log("simple click")}onClick(t){if(this.enabled){if(this.log("on click. Drag? "+!this.state.flags.click),this.state.flags.click){let e=null;null!=t.target&&null!=(e=t.target.querySelector("a"))&&e.click()}this.state.flags.click=!1}}isItemInsideView(t,e){let i=0,s=0,n=e.start+e.translate,l=e.end+e.translate;return"vertical"==this.opts.direction?(i=t.top+5,s=t.bottom-5):(i=t.left+5,s=t.right-5),l>i&&n<s}distanceToCenter(t){if(null==t)return null;let e=this.viewportSize(),i=this.viewportShift(),s=gsap.utils.wrap(0,this.length,Math.abs(this.state.target))*Math.sign(this.state.target);return t.start+s-(i+(e-t.length)/2)}goTo(t){if(t<0||t>=this.items.length)return;let e=this.items[t];this.state.target-=this.distanceToCenter(e),this.state.off=this.state.target}update(){let t=this.viewportSize(),e=this.viewportShift(),i=gsap.utils.wrap(0,this.length,Math.abs(this.state.target)),s=Math.sign(this.state.target),n=0;for(let l=0;l<this.items.length;l++){let a=this.items[l],h=i*s;h<0&&a.end+h<t+e+a.length-this.length&&(h+=this.length),h>0&&a.end+h>this.length&&(h-=this.length);let r=a.start+h-(e+(t-a.length)/2);if(Math.abs(r)<a.length/2){n=l;break}}if(null!=this.el){let{top:o,left:p,width:g,height:c}=this.el.getBoundingClientRect();this.vh=c,this.vw=g,this.vshifth=o,this.vshiftw=p}else this.vh=store.wh,this.vw=store.ww,this.vshifth=0,this.vshiftw=0;this.length=0;for(let d=0;d<this.items.length;d++){let u=this.items[d];if("vertical"==this.opts.direction){u.el.style.transform="translate(0, 0px)";let{left:v,right:m,top:f,bottom:$,width:w,height:E}=u.el.getBoundingClientRect();this.length+=E,u.start=f,u.end=$,u.length=E}else{u.el.style.transform="translate(0px, 0)";let{left:b,right:x,top:S,bottom:_,width:L,height:P}=u.el.getBoundingClientRect();this.length+=L,u.start=b,u.end=x,u.length=L}}let I=0;if(n<this.items.length/2){if("vertical"==this.opts.direction)for(let y=0;y<n;y++)I-=this.items[y].length;else for(let k=n;k<this.items.length/2;k++)I+=this.items[k].length}else if("vertical"==this.opts.direction)for(let D=this.items.length/2;D<=n;D++)I+=this.items[D].length;else for(let W=this.items.length/2;W<n;W++)I-=this.items[W].length;this.state.currentRounded=this.state.current=this.state.target=I,this.state.off=this.state.target}onResize(t){this.state.flags.resizing=!0,this.update(),this.state.flags.resizing=!1,this.log("on resize")}onPagination(t){if(!this.enabled)return;let e=-1;for(let i=0;i<this.itemsPagination.length;i++)if(this.itemsPagination[i].el===t.currentTarget){e=i;break}if(e>=0&&null!=this.state.currentSlideItem){let s=this.itemsInitial;this.state.currentSlideItem.clone&&(s=this.itemsCloned);let n=s[e];this.state.target-=this.distanceToCenter(n),this.state.off=this.state.target}}onPrev(t){if(!this.enabled)return;let e=this.viewportSize(),i=this.viewportShift(),s=gsap.utils.wrap(0,this.length,Math.abs(this.state.target)),n=Math.sign(this.state.target);for(let l=0;l<this.items.length;l++){let a=this.items[l],h=s*n;h<0&&a.end+h<e+i+a.length-this.length&&(h+=this.length),h>0&&a.end+h>this.length&&(h-=this.length);let r=a.start+h-(i+(e-a.length)/2);Math.abs(r)<a.length/2&&(this.state.target=this.state.target-r+a.prevElement.length,this.state.off=this.state.target)}}onNext(t){if(!this.enabled)return;let e=this.viewportSize(),i=this.viewportShift(),s=gsap.utils.wrap(0,this.length,Math.abs(this.state.target)),n=Math.sign(this.state.target);for(let l=0;l<this.items.length;l++){let a=this.items[l],h=s*n;h<0&&a.end+h<e+i+a.length-this.length&&(h+=this.length),h>0&&a.end+h>this.length&&(h-=this.length);let r=a.start+h-(i+(e-a.length)/2);Math.abs(r)<a.length/2&&(this.state.target=this.state.target-(a.length/2+r+a.nextElement.length/2),this.state.off=this.state.target)}}onWheel(t){if(!this.enabled)return;let e=performance.now(),i=this.state,s=.2*normalizeWheel(t).pixelY,{x:n,y:l}=this.getPos(t);i.flags.dragging=!1;let{off:a,on:h}=i;if(this.log("Event timestamp: "+e+" Scroll delta "+s),this.opts.snap&&null!=this.snapWheelEvents.tsSnap){if(e-this.snapWheelEvents.tsSnap<=this.opts.snapwait.after)return void this.log("Ignoring wheel event as there is a snapping going on");this.log("Resetting the snapping events buffer"),this.snapWheelEvents.tsSnap=null,this.snapWheelEvents.events=[]}i.target-=s*this.opts.speed,i.currentScrollDirection=Math.sign(s),this.opts.snap&&this.snapWheelEvents.events.push({ts:e,delta:s,currentTarget:i.target}),"vertical"==this.opts.direction?h.y=i.target:h.x=i.target,i.off=i.target}updateWheelSnap(){if(this.opts.snap&&this.snapWheelEvents.events.length>0){let t=performance.now();if(t-this.snapWheelEvents.events[this.snapWheelEvents.events.length-1].ts>this.opts.snapwait.before){let e=0,i=0,s=1e4,n=0,l=0,a=1e4,h=0;for(let r=0;r<this.snapWheelEvents.events.length;r++){let o=this.snapWheelEvents.events[r];if(0==r&&(h=o.currentTarget),r>0){let p=this.snapWheelEvents.events[r-1],g=o.ts-p.ts;e+=g,i<g&&(i=g),s>g&&(s=g)}let c=o.delta;n+=c,l<c&&(l=c),a>c&&(a=c)}this.log("--> Event timestamp: "+t+". Snapping.\nAvg time interval between scroll events: "+e/this.snapWheelEvents.events.length+".\nMin time interval between scroll events: "+s+".\nMax time interval between scroll events: "+i+".\nWheel events count: "+this.snapWheelEvents.events.length),this.log("Total delta interval: "+n+".\nAvg delta interval between scroll events: "+n/this.snapWheelEvents.events.length+".\nMin delta interval between scroll events: "+a+".\nMax delta interval between scroll events: "+l+".");let d=this.state,{off:u,on:v}=d;d.target=this.snapTargetOnWheel(h,d.target),"vertical"==this.opts.direction?v.y=d.target:v.x=d.target,d.off=d.target,this.snapWheelEvents.tsSnap=t,this.snapWheelEvents.events=[]}}}debounce(t,e){let i;return function(...s){i&&clearTimeout(i),i=setTimeout(()=>t(...s),e)}}isObject(t){return t instanceof Object&&!Array.isArray(t)&&null!==t}isElement(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}log(t){1==this.opts.debug&&console.log(t)}}ClapatSlider.instances=[];
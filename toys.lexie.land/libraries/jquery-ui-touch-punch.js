/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /npm/@rwap/jquery-ui-touch-punch@1.1.5/jquery.ui.touch-punch.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*!
 * jQuery UI Touch Punch 1.1.5 as modified by RWAP Software
 * based on original touchpunch v0.2.3 which has not been updated since 2014
 *
 * Updates by RWAP Software to take account of various suggested changes on the original code issues
 *
 * Original: https://github.com/furf/jquery-ui-touch-punch
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Fork: https://github.com/RWAP/jquery-ui-touch-punch
 *
 * Depends:
 * jquery.ui.widget.js
 * jquery.ui.mouse.js
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery","jquery-ui"],t):t(jQuery)}((function(t){if(t.mspointer=window.navigator.msPointerEnabled,t.touch="ontouchstart"in document||"ontouchstart"in window||window.TouchEvent||window.DocumentTouch&&document instanceof DocumentTouch||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,!t.touch&&!t.mspointer||!t.ui.mouse)return;let e,o,n,i,u=t.ui.mouse.prototype,c=u._mouseInit,s=u._mouseDestroy,a=0;function h(t){return{x:t.originalEvent.changedTouches[0].pageX,y:t.originalEvent.changedTouches[0].pageY}}function r(e,o){if(e.originalEvent.touches.length>1)return;if(t(e.target).is("input")||t(e.target).is("textarea"))return;e.cancelable&&e.preventDefault();let n=e.originalEvent.changedTouches[0],i=new MouseEvent(o,{bubbles:!0,cancelable:!0,view:window,screenX:n.screenX,screenY:n.screenY,clientX:n.clientX,clientY:n.clientY});e.target.dispatchEvent(i)}u._touchStart=function(t){let o=this;this._startedMove=t.timeStamp,o._startPos=h(t),!e&&o._mouseCapture(t.originalEvent.changedTouches[0])&&(e=!0,o._touchMoved=!1,r(t,"mouseover"),r(t,"mousemove"),r(t,"mousedown"))},u._touchMove=function(t){e&&(this._touchMoved=!0,r(t,"mousemove"))},u._touchEnd=function(t){if(!e)return;r(t,"mouseup"),r(t,"mouseout");let o=t.timeStamp-this._startedMove;if(!this._touchMoved||o<500)t.timeStamp-a<400?r(t,"dblclick"):r(t,"click"),a=t.timeStamp;else{let e=h(t);Math.abs(e.x-this._startPos.x)<10&&Math.abs(e.y-this._startPos.y)<10&&(this._touchMoved&&"stylus"!==t.originalEvent.changedTouches[0].touchType||r(t,"click"))}this._touchMoved=!1,e=!1},u._mouseInit=function(){let e=this;t.support.mspointer&&(e.element[0].style.msTouchAction="none"),o=u._touchStart.bind(e),n=u._touchMove.bind(e),i=u._touchEnd.bind(e),e.element.on({touchstart:o,touchmove:n,touchend:i}),c.call(e)},u._mouseDestroy=function(){this.element.off({touchstart:o,touchmove:n,touchend:i}),s.call(this)}}));
//# sourceMappingURL=/sm/8b28aa63567755159e9dece64304a911483f5a19240eaa8868f305f2f64a2afe.map
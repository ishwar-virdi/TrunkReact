(function(window){var svgSprite='<svg><symbol id="icon-chazhao" viewBox="0 0 1024 1024"><path d="M938.176 832.512l-214.336-214.4c-2.496-2.496-5.248-4.352-7.872-6.528 36.16-55.552 57.344-121.728 57.344-193.024C773.312 222.72 614.592 64 418.688 64 222.848 64 64 222.72 64 418.624s158.848 354.624 354.688 354.624c71.232 0 137.472-21.248 193.216-57.344 1.984 2.752 3.904 5.376 6.336 7.744l214.4 214.528C847.232 952.768 866.24 960 885.376 960s38.208-7.232 52.8-21.888C967.296 908.992 967.296 861.76 938.176 832.512M418.688 661.248c-133.76 0-242.688-108.864-242.688-242.624 0-133.76 108.928-242.688 242.688-242.688s242.624 108.928 242.624 242.688C661.312 552.384 552.448 661.248 418.688 661.248"  ></path></symbol><symbol id="icon-delete" viewBox="0 0 1024 1024"><path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m203.52 640A55.68 55.68 0 1 1 640 715.52l-128-128-128 128A55.68 55.68 0 1 1 308.48 640l128-128-128-128A55.68 55.68 0 1 1 384 308.48l128 128 128-128A55.68 55.68 0 1 1 715.52 384l-128 128z" fill="" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)
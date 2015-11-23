if (Meteor.isClient) {
    Template.becomeWalker.rendered = function () {
      $('html').css('height','100%');
      $('body').css('height','100%');
       Meteor.defer(function() {
           window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.cssanimations=function(){return F("animationName")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("csscalc",function(){var a="width:",b="calc(10px);",c=document.createElement("div");return c.style.cssText=a+Modernizr._prefixes.join(b+a),!!c.style.length}),Modernizr.addTest("cssvhunit",function(){var a;return Modernizr.testStyles("#modernizr { height: 50vh; }",function(b,c){var d=parseInt(window.innerHeight/2,10),e=parseInt((window.getComputedStyle?getComputedStyle(b,null):b.currentStyle).height,10);a=e==d}),a});
           /*!
            * classie - class helper functions
            * from bonzo https://github.com/ded/bonzo
            *
            * classie.has( elem, 'my-class' ) -> true/false
            * classie.add( elem, 'my-new-class' )
            * classie.remove( elem, 'my-unwanted-class' )
            * classie.toggle( elem, 'my-class' )
            */

           /*jshint browser: true, strict: true, undef: true */
           /*global define: false */

           ( function( window ) {

               'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

               function classReg( className ) {
                   return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
               }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
               var hasClass, addClass, removeClass;

               if ( 'classList' in document.documentElement ) {
                   hasClass = function( elem, c ) {
                       return elem.classList.contains( c );
                   };
                   addClass = function( elem, c ) {
                       elem.classList.add( c );
                   };
                   removeClass = function( elem, c ) {
                       elem.classList.remove( c );
                   };
               }
               else {
                   hasClass = function( elem, c ) {
                       return classReg( c ).test( elem.className );
                   };
                   addClass = function( elem, c ) {
                       if ( !hasClass( elem, c ) ) {
                           elem.className = elem.className + ' ' + c;
                       }
                   };
                   removeClass = function( elem, c ) {
                       elem.className = elem.className.replace( classReg( c ), ' ' );
                   };
               }

               function toggleClass( elem, c ) {
                   var fn = hasClass( elem, c ) ? removeClass : addClass;
                   fn( elem, c );
               }

               var classie = {
                   // full names
                   hasClass: hasClass,
                   addClass: addClass,
                   removeClass: removeClass,
                   toggleClass: toggleClass,
                   // short names
                   has: hasClass,
                   add: addClass,
                   remove: removeClass,
                   toggle: toggleClass
               };

// transport
               if ( typeof define === 'function' && define.amd ) {
                   // AMD
                   define( classie );
               } else {
                   // browser global
                   window.classie = classie;
               }

           })( window ); //end classie

           /**
            * selectFx.js v1.0.0
            * http://www.codrops.com
            *
            * Licensed under the MIT license.
            * http://www.opensource.org/licenses/mit-license.php
            *
            * Copyright 2014, Codrops
            * http://www.codrops.com
            */
           ( function( window ) {

               'use strict';

               /**
                * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
                */
               function hasParent( e, p ) {
                   if (!e) return false;
                   var el = e.target||e.srcElement||e||false;
                   while (el && el != p) {
                       el = el.parentNode||false;
                   }
                   return (el!==false);
               };

               /**
                * extend obj function
                */
               function extend( a, b ) {
                   for( var key in b ) {
                       if( b.hasOwnProperty( key ) ) {
                           a[key] = b[key];
                       }
                   }
                   return a;
               }

               /**
                * SelectFx function
                */
               function SelectFx( el, options ) {
                   this.el = el;
                   this.options = extend( {}, this.options );
                   extend( this.options, options );
                   this._init();
               }

               /**
                * SelectFx options
                */
               SelectFx.prototype.options = {
                   // if true all the links will open in a new tab.
                   // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
                   newTab : true,
                   // when opening the select element, the default placeholder (if any) is shown
                   stickyPlaceholder : true,
                   // callback when changing the value
                   onChange : function( val ) { return false; }
               }

               /**
                * init function
                * initialize and cache some vars
                */
               SelectFx.prototype._init = function() {
                   // check if we are using a placeholder for the native select box
                   // we assume the placeholder is disabled and selected by default
                   var selectedOpt = this.el.querySelector( 'option[selected]' );
                   this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

                   // get selected option (either the first option with attr selected or just the first option)
                   this.selectedOpt = selectedOpt || this.el.querySelector( 'option' );

                   // create structure
                   this._createSelectEl();

                   // all options
                   this.selOpts = [].slice.call( this.selEl.querySelectorAll( 'li[data-option]' ) );

                   // total options
                   this.selOptsCount = this.selOpts.length;

                   // current index
                   this.current = this.selOpts.indexOf( this.selEl.querySelector( 'li.cs-selected' ) ) || -1;

                   // placeholder elem
                   this.selPlaceholder = this.selEl.querySelector( 'span.cs-placeholder' );

                   // init events
                   this._initEvents();
               }

               /**
                * creates the structure for the select element
                */
               SelectFx.prototype._createSelectEl = function() {
                   var self = this, options = '', createOptionHTML = function(el) {
                       var optclass = '', classes = '', link = '';

                       if( el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder ) {
                           classes += 'cs-selected ';
                           this.foundSelected = true;
                       }
                       // extra classes
                       if( el.getAttribute( 'data-class' ) ) {
                           classes += el.getAttribute( 'data-class' );
                       }
                       // link options
                       if( el.getAttribute( 'data-link' ) ) {
                           link = 'data-link=' + el.getAttribute( 'data-link' );
                       }

                       if( classes !== '' ) {
                           optclass = 'class="' + classes + '" ';
                       }

                       return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
                   };

                   [].slice.call( this.el.children ).forEach( function(el) {
                       if( el.disabled ) { return; }

                       var tag = el.tagName.toLowerCase();

                       if( tag === 'option' ) {
                           options += createOptionHTML(el);
                       }
                       else if( tag === 'optgroup' ) {
                           options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
                           [].slice.call( el.children ).forEach( function(opt) {
                               options += createOptionHTML(opt);
                           } )
                           options += '</ul></li>';
                       }
                   } );

                   var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
                   this.selEl = document.createElement( 'div' );
                   this.selEl.className = this.el.className;
                   this.selEl.tabIndex = this.el.tabIndex;
                   this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
                   this.el.parentNode.appendChild( this.selEl );
                   this.selEl.appendChild( this.el );
               }

               /**
                * initialize the events
                */
               SelectFx.prototype._initEvents = function() {
                   var self = this;

                   // open/close select
                   this.selPlaceholder.addEventListener( 'click', function() {
                       self._toggleSelect();
                   } );

                   // clicking the options
                   this.selOpts.forEach( function(opt, idx) {
                       opt.addEventListener( 'click', function() {
                           self.current = idx;
                           self._changeOption();
                           // close select elem
                           self._toggleSelect();
                       } );
                   } );

                   // close the select element if the target it´s not the select element or one of its descendants..
                   document.addEventListener( 'click', function(ev) {
                       var target = ev.target;
                       if( self._isOpen() && target !== self.selEl && !hasParent( target, self.selEl ) ) {
                           self._toggleSelect();
                       }
                   } );

                   // keyboard navigation events
                   this.selEl.addEventListener( 'keydown', function( ev ) {
                       var keyCode = ev.keyCode || ev.which;

                       switch (keyCode) {
                           // up key
                           case 38:
                               ev.preventDefault();
                               self._navigateOpts('prev');
                               break;
                           // down key
                           case 40:
                               ev.preventDefault();
                               self._navigateOpts('next');
                               break;
                           // space key
                           case 32:
                               //ev.preventDefault();
                               if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
                                   self._changeOption();
                               }
                               self._toggleSelect();
                               break;
                           //// enter key
                           case 13:
                               ev.stopPropagation();
                               ev.preventDefault();
                               if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
                                   self._changeOption();
                                   self._toggleSelect();
                               }
                               break;
                           // esc key
                           case 27:
                               ev.preventDefault();
                               if( self._isOpen() ) {
                                   self._toggleSelect();
                               }
                               break;
                       }
                   } );
               }

               /**
                * navigate with up/dpwn keys
                */
               SelectFx.prototype._navigateOpts = function(dir) {
                   if( !this._isOpen() ) {
                       this._toggleSelect();
                   }

                   var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

                   if( dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1 ) {
                       // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
                       this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
                       // remove focus class if any..
                       this._removeFocus();
                       // add class focus - track which option we are navigating
                       classie.add( this.selOpts[this.preSelCurrent], 'cs-focus' );
                   }
               }

               /**
                * open/close select
                * when opened show the default placeholder if any
                */
               SelectFx.prototype._toggleSelect = function() {
                   // remove focus class if any..
                   this._removeFocus();

                   if( this._isOpen() ) {
                       if( this.current !== -1 ) {
                           // update placeholder text
                           this.selPlaceholder.textContent = this.selOpts[ this.current ].textContent;
                       }
                       classie.remove( this.selEl, 'cs-active' );
                   }
                   else {
                       if( this.hasDefaultPlaceholder && this.options.stickyPlaceholder ) {
                           // everytime we open we wanna see the default placeholder text
                           this.selPlaceholder.textContent = this.selectedOpt.textContent;
                       }
                       classie.add( this.selEl, 'cs-active' );
                   }
               }

               /**
                * change option - the new value is set
                */
               SelectFx.prototype._changeOption = function() {
                   // if pre selected current (if we navigate with the keyboard)...
                   if( typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ) {
                       this.current = this.preSelCurrent;
                       this.preSelCurrent = -1;
                   }

                   // current option
                   var opt = this.selOpts[ this.current ];

                   // update current selected value
                   this.selPlaceholder.textContent = opt.textContent;

                   // change native select element´s value
                   this.el.value = opt.getAttribute( 'data-value' );

                   // remove class cs-selected from old selected option and add it to current selected option
                   var oldOpt = this.selEl.querySelector( 'li.cs-selected' );
                   if( oldOpt ) {
                       classie.remove( oldOpt, 'cs-selected' );
                   }
                   classie.add( opt, 'cs-selected' );

                   // if there´s a link defined
                   if( opt.getAttribute( 'data-link' ) ) {
                       // open in new tab?
                       if( this.options.newTab ) {
                           window.open( opt.getAttribute( 'data-link' ), '_blank' );
                       }
                       else {
                           window.location = opt.getAttribute( 'data-link' );
                       }
                   }

                   // callback
                   this.options.onChange( this.el.value );
               }

               /**
                * returns true if select element is opened
                */
               SelectFx.prototype._isOpen = function(opt) {
                   return classie.has( this.selEl, 'cs-active' );
               }

               /**
                * removes the focus class from the option
                */
               SelectFx.prototype._removeFocus = function(opt) {
                   var focusEl = this.selEl.querySelector( 'li.cs-focus' )
                   if( focusEl ) {
                       classie.remove( focusEl, 'cs-focus' );
                   }
               }

               /**
                * add to global namespace
                */
               window.SelectFx = SelectFx;

           } )( window ); //end selectFx


           /**
            * fullscreenForm.js v1.0.0
            * http://www.codrops.com
            *
            * Licensed under the MIT license.
            * http://www.opensource.org/licenses/mit-license.php
            *
            * Copyright 2014, Codrops
            * http://www.codrops.com
            */
           ( function( window ) {

               'use strict';

               var support = { animations : Modernizr.cssanimations },
                   animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
               // animation end event name
                   animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

               /**
                * extend obj function
                */
               function extend( a, b ) {
                   for( var key in b ) {
                       if( b.hasOwnProperty( key ) ) {
                           a[key] = b[key];
                       }
                   }
                   return a;
               }

               /**
                * createElement function
                * creates an element with tag = tag, className = opt.cName, innerHTML = opt.inner and appends it to opt.appendTo
                */
               function createElement( tag, opt ) {
                   var el = document.createElement( tag )
                   if( opt ) {
                       if( opt.cName ) {
                           el.className = opt.cName;
                       }
                       if( opt.inner ) {
                           el.innerHTML = opt.inner;
                       }
                       if( opt.appendTo ) {
                           opt.appendTo.appendChild( el );
                       }
                   }
                   return el;
               }

               /**
                * FForm function
                */
               function FForm( el, options ) {
                   this.el = el;
                   this.options = extend( {}, this.options );
                   extend( this.options, options );
                   this._init();
               }

               /**
                * FForm options
                */
               FForm.prototype.options = {
                   // show progress bar
                   ctrlProgress : true,
                   // show navigation dots
                   ctrlNavDots : true,
                   // show [current field]/[total fields] status
                   ctrlNavPosition : true,
                   // reached the review and submit step
                   onReview : function() { return false; }
               };

               /**
                * init function
                * initialize and cache some vars
                */
               FForm.prototype._init = function() {
                   // the form element
                   this.formEl = this.el.querySelector( 'form' );

                   // list of fields
                   this.fieldsList = this.formEl.querySelector( 'ol.fs-fields' );

                   // current field position
                   this.current = 0;

                   // all fields
                   this.fields = [].slice.call( this.fieldsList.children );

                   // total fields
                   this.fieldsCount = this.fields.length;

                   // show first field
                   classie.add( this.fields[ this.current ], 'fs-current' );

                   // create/add controls
                   this._addControls();

                   // create/add messages
                   this._addErrorMsg();

                   // init events
                   this._initEvents();
               };

               /**
                * addControls function
                * create and insert the structure for the controls
                */
               FForm.prototype._addControls = function() {
                   // main controls wrapper
                   this.ctrls = createElement( 'div', { cName : 'fs-controls', appendTo : this.el } );

                   // continue button (jump to next field)
                   this.ctrlContinue = createElement( 'button', { cName : 'fs-continue', inner : 'Continue', appendTo : this.ctrls } );
                   this._showCtrl( this.ctrlContinue );

                   // navigation dots
                   if( this.options.ctrlNavDots ) {
                       this.ctrlNav = createElement( 'nav', { cName : 'fs-nav-dots', appendTo : this.ctrls } );
                       var dots = '';
                       for( var i = 0; i < this.fieldsCount; ++i ) {
                           dots += i === this.current ? '<button class="fs-dot-current"></button>' : '<button disabled></button>';
                       }
                       this.ctrlNav.innerHTML = dots;
                       this._showCtrl( this.ctrlNav );
                       this.ctrlNavDots = [].slice.call( this.ctrlNav.children );
                   }

                   // field number status
                   if( this.options.ctrlNavPosition ) {
                       this.ctrlFldStatus = createElement( 'span', { cName : 'fs-numbers', appendTo : this.ctrls } );

                       // current field placeholder
                       this.ctrlFldStatusCurr = createElement( 'span', { cName : 'fs-number-current', inner : Number( this.current + 1 ) } );
                       this.ctrlFldStatus.appendChild( this.ctrlFldStatusCurr );

                       // total fields placeholder
                       this.ctrlFldStatusTotal = createElement( 'span', { cName : 'fs-number-total', inner : this.fieldsCount } );
                       this.ctrlFldStatus.appendChild( this.ctrlFldStatusTotal );
                       this._showCtrl( this.ctrlFldStatus );
                   }

                   // progress bar
                   if( this.options.ctrlProgress ) {
                       this.ctrlProgress = createElement( 'div', { cName : 'fs-progress', appendTo : this.ctrls } );
                       this._showCtrl( this.ctrlProgress );
                   }
               }

               /**
                * addErrorMsg function
                * create and insert the structure for the error message
                */
               FForm.prototype._addErrorMsg = function() {
                   // error message
                   this.msgError = createElement( 'span', { cName : 'fs-message-error', appendTo : this.el } );
               }

               /**
                * init events
                */
               FForm.prototype._initEvents = function() {
                   var self = this;

                   // show next field
                   this.ctrlContinue.addEventListener( 'click', function() {
                       self._nextField();
                   } );

                   // navigation dots
                   if( this.options.ctrlNavDots ) {
                       this.ctrlNavDots.forEach( function( dot, pos ) {
                           dot.addEventListener( 'click', function() {
                               self._showField( pos );
                           } );
                       } );
                   }

                   // jump to next field without clicking the continue button (for fields/list items with the attribute "data-input-trigger")
                   this.fields.forEach( function( fld ) {
                       if( fld.hasAttribute( 'data-input-trigger' ) ) {
                           var input = fld.querySelector( 'input[type="radio"]' ) || /*fld.querySelector( '.cs-select' ) ||*/ fld.querySelector( 'select' ); // assuming only radio and select elements (TODO: exclude multiple selects)
                           if( !input ) return;

                           switch( input.tagName.toLowerCase() ) {
                               case 'select' :
                                   input.addEventListener( 'change', function() { self._nextField(); } );
                                   break;

                               case 'input' :
                                   [].slice.call( fld.querySelectorAll( 'input[type="radio"]' ) ).forEach( function( inp ) {
                                       inp.addEventListener( 'change', function(ev) { self._nextField(); } );
                                   } );
                                   break;

                               /*
                                // for our custom select we would do something like:
                                case 'div' :
                                [].slice.call( fld.querySelectorAll( 'ul > li' ) ).forEach( function( inp ) {
                                inp.addEventListener( 'click', function(ev) { self._nextField(); } );
                                } );
                                break;
                                */
                           }
                       }
                   } );

                   // keyboard navigation events - jump to next field when pressing enter
                   document.addEventListener( 'keydown', function( ev ) {
                       if( !self.isLastStep && ev.target.tagName.toLowerCase() !== 'textarea' ) {
                           var keyCode = ev.keyCode || ev.which;
                           if( keyCode === 13 ) {
                               ev.preventDefault();
                               self._nextField();
                           }
                       }
                   } );
               };

               /**
                * nextField function
                * jumps to the next field
                */
               FForm.prototype._nextField = function( backto ) {
                   if( this.isLastStep || !this._validade() || this.isAnimating ) {
                       return false;
                   }
                   this.isAnimating = true;

                   // check if on last step
                   this.isLastStep = this.current === this.fieldsCount - 1 && backto === undefined ? true : false;

                   // clear any previous error messages
                   this._clearError();

                   // current field
                   var currentFld = this.fields[ this.current ];

                   // save the navigation direction
                   this.navdir = backto !== undefined ? backto < this.current ? 'prev' : 'next' : 'next';

                   // update current field
                   this.current = backto !== undefined ? backto : this.current + 1;

                   if( backto === undefined ) {
                       // update progress bar (unless we navigate backwards)
                       this._progress();

                       // save farthest position so far
                       this.farthest = this.current;
                   }

                   // add class "fs-display-next" or "fs-display-prev" to the list of fields
                   classie.add( this.fieldsList, 'fs-display-' + this.navdir );

                   // remove class "fs-current" from current field and add it to the next one
                   // also add class "fs-show" to the next field and the class "fs-hide" to the current one
                   classie.remove( currentFld, 'fs-current' );
                   classie.add( currentFld, 'fs-hide' );

                   if( !this.isLastStep ) {
                       // update nav
                       this._updateNav();

                       // change the current field number/status
                       this._updateFieldNumber();

                       var nextField = this.fields[ this.current ];
                       classie.add( nextField, 'fs-current' );
                       classie.add( nextField, 'fs-show' );
                   }

                   // after animation ends remove added classes from fields
                   var self = this,
                       onEndAnimationFn = function( ev ) {
                           if( support.animations ) {
                               this.removeEventListener( animEndEventName, onEndAnimationFn );
                           }

                           classie.remove( self.fieldsList, 'fs-display-' + self.navdir );
                           classie.remove( currentFld, 'fs-hide' );

                           if( self.isLastStep ) {
                               // show the complete form and hide the controls
                               self._hideCtrl( self.ctrlNav );
                               self._hideCtrl( self.ctrlProgress );
                               self._hideCtrl( self.ctrlContinue );
                               self._hideCtrl( self.ctrlFldStatus );
                               // replace class fs-form-full with fs-form-overview
                               classie.remove( self.formEl, 'fs-form-full' );
                               classie.add( self.formEl, 'fs-form-overview' );
                               classie.add( self.formEl, 'fs-show' );
                               // callback
                               self.options.onReview();
                           }
                           else {
                               classie.remove( nextField, 'fs-show' );

                               if( self.options.ctrlNavPosition ) {
                                   self.ctrlFldStatusCurr.innerHTML = self.ctrlFldStatusNew.innerHTML;
                                   self.ctrlFldStatus.removeChild( self.ctrlFldStatusNew );
                                   classie.remove( self.ctrlFldStatus, 'fs-show-' + self.navdir );
                               }
                           }
                           self.isAnimating = false;
                       };

                   if( support.animations ) {
                       if( this.navdir === 'next' ) {
                           if( this.isLastStep ) {
                               currentFld.querySelector( '.fs-anim-upper' ).addEventListener( animEndEventName, onEndAnimationFn );
                           }
                           else {
                               nextField.querySelector( '.fs-anim-lower' ).addEventListener( animEndEventName, onEndAnimationFn );
                           }
                       }
                       else {
                           nextField.querySelector( '.fs-anim-upper' ).addEventListener( animEndEventName, onEndAnimationFn );
                       }
                   }
                   else {
                       onEndAnimationFn();
                   }
               }

               /**
                * showField function
                * jumps to the field at position pos
                */
               FForm.prototype._showField = function( pos ) {
                   if( pos === this.current || pos < 0 || pos > this.fieldsCount - 1 ) {
                       return false;
                   }
                   this._nextField( pos );
               }

               /**
                * updateFieldNumber function
                * changes the current field number
                */
               FForm.prototype._updateFieldNumber = function() {
                   if( this.options.ctrlNavPosition ) {
                       // first, create next field number placeholder
                       this.ctrlFldStatusNew = document.createElement( 'span' );
                       this.ctrlFldStatusNew.className = 'fs-number-new';
                       this.ctrlFldStatusNew.innerHTML = Number( this.current + 1 );

                       // insert it in the DOM
                       this.ctrlFldStatus.appendChild( this.ctrlFldStatusNew );

                       // add class "fs-show-next" or "fs-show-prev" depending on the navigation direction
                       var self = this;
                       setTimeout( function() {
                           classie.add( self.ctrlFldStatus, self.navdir === 'next' ? 'fs-show-next' : 'fs-show-prev' );
                       }, 25 );
                   }
               }

               /**
                * progress function
                * updates the progress bar by setting its width
                */
               FForm.prototype._progress = function() {
                   if( this.options.ctrlProgress ) {
                       this.ctrlProgress.style.width = this.current * ( 100 / this.fieldsCount ) + '%';
                   }
               }

               /**
                * updateNav function
                * updates the navigation dots
                */
               FForm.prototype._updateNav = function() {
                   if( this.options.ctrlNavDots ) {
                       classie.remove( this.ctrlNav.querySelector( 'button.fs-dot-current' ), 'fs-dot-current' );
                       classie.add( this.ctrlNavDots[ this.current ], 'fs-dot-current' );
                       this.ctrlNavDots[ this.current ].disabled = false;
                   }
               }

               /**
                * showCtrl function
                * shows a control
                */
               FForm.prototype._showCtrl = function( ctrl ) {
                   classie.add( ctrl, 'fs-show' );
               }

               /**
                * hideCtrl function
                * hides a control
                */
               FForm.prototype._hideCtrl = function( ctrl ) {
                   classie.remove( ctrl, 'fs-show' );
               }

               // TODO: this is a very basic validation function. Only checks for required fields..
               FForm.prototype._validade = function() {
                   var fld = this.fields[ this.current ],
                       input = fld.querySelector( 'input[required]' ) || fld.querySelector( 'textarea[required]' ) || fld.querySelector( 'select[required]' ),
                       error;

                   if( !input ) return true;

                   switch( input.tagName.toLowerCase() ) {
                       case 'input' :
                           if( input.type === 'radio' || input.type === 'checkbox' ) {
                               var checked = 0;
                               [].slice.call( fld.querySelectorAll( 'input[type="' + input.type + '"]' ) ).forEach( function( inp ) {
                                   if( inp.checked ) {
                                       ++checked;
                                   }
                               } );
                               if( !checked ) {
                                   error = 'NOVAL';
                               }
                           }
                           else if( input.value === '' ) {
                               error = 'NOVAL';
                           }
                           break;

                       case 'select' :
                           // assuming here '' or '-1' only
                           if( input.value === '' || input.value === '-1' ) {
                               error = 'NOVAL';
                           }
                           break;

                       case 'textarea' :
                           if( input.value === '' ) {
                               error = 'NOVAL';
                           }
                           break;
                   }

                   if( error != undefined ) {
                       this._showError( error );
                       return false;
                   }

                   return true;
               }

               // TODO
               FForm.prototype._showError = function( err ) {
                   var message = '';
                   switch( err ) {
                       case 'NOVAL' :
                           message = 'Please fill the field before continuing';
                           break;
                       case 'INVALIDEMAIL' :
                           message = 'Please fill a valid email address';
                           break;
                       // ...
                   };
                   this.msgError.innerHTML = message;
                   this._showCtrl( this.msgError );
               }

               // clears/hides the current error message
               FForm.prototype._clearError = function() {
                   this._hideCtrl( this.msgError );
               }

               // add to global namespace
               window.FForm = FForm;

           })( window );

           (function() {
               var formWrap = document.getElementById( 'fs-form-wrap' );

               [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
                   new SelectFx( el, {
                       stickyPlaceholder: false,
                       onChange: function(val){
                           document.querySelector('span.cs-placeholder').style.backgroundColor = val;
                       }
                   });
               } );

               new FForm( formWrap, {
                   onReview : function() {
                       classie.add( document.body, 'overview' ); // for demo purposes only
                   }
               } );
           })();

       });// end defer
     
    };

    Template.becomeWalker.events({
        'keyup input': function (e, t) {
            //console.log("keyup");
            //
            //
            //
            //if(bothNames != "" && phoneNum !== "" && address !== "") {
            //    console.log("we're good to go. Prepare to launch");
            //
            //
            //    //Meteor.apply('AddClientProfile',[id, firstName, lastName, phoneNum, address, dog1, dog2, dog3, instruction]);
            //}
            //
            //
            //console.log(bothNames,phoneNum,address,walkRadius, socialShare, ownIphone);
        },
        'keyup textarea': function (e,t) {

            //console.log( about,whyTrottr);
        },
        'click .fs-submit': function (e,t) {
            console.log("submit clicked");
            e.preventDefault();
            var role = ["walker"];
            var id = Meteor.user()._id;
            var bothNames = $('#q1').val();
            var namesArray = bothNames.split(" ");
            var firstName = namesArray[0];
            if (namesArray.length < 3) {
                var lastName = namesArray[1];
            }
            if (namesArray.length == 3) {
                lastName = namesArray[1] + " " + namesArray[2]
            }
            if (namesArray.length > 3) {
                lastName = namesArray[1] + " " + namesArray[2] + " " + namesArray[3];
            }
            var phoneNum = $('#q2').val();
            var address = $('#q3').val();
            var walkRadius = $('#q4').val();
            var socialShare = $('#q5').val();
            var ownIphone = $('#q6').val();
            var about = $('#q7').val();
            var whyTrottr = $('#q8').val();

            Meteor.apply('AddWalkerProfile',[id, role, firstName, lastName, phoneNum, address,walkRadius,about]);
            Meteor.apply('SendNewWalkerEmail',[bothNames,phoneNum,address,walkRadius,socialShare,ownIphone,about,whyTrottr]);
            sweetAlert({
                title: "Thanks for applying!",
                text: "We will be in touch shortly. Feel free to login and look at the client section!",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#eb6a5a",
                confirmButtonText: "Cool",
                closeOnConfirm: true,
                closeOnCancel: true });
            Meteor.setTimeout(function () {
              Router.go('/walkerProfile');
            }, 1000);
            
        }
    });


}
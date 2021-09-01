(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/status/index"],{"58a2":function(t,n,e){"use strict";var u=e("78cf"),r=e.n(u);r.a},"781c":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={data:function(){return{afterHeaderOpacity:1,headerPosition:"fixed",headerTop:null,statusTop:null}},props:{styles:{type:String,default:function(){return""}},backdrop:{type:Boolean,default:function(){return!0}}},onPageScroll:function(t){this.headerPosition=t.scrollTop>=0?"fixed":"absolute",this.headerTop=t.scrollTop>=0?null:0,this.statusTop=t.scrollTop>=0?null:-this.statusHeight+"px"}};n.default=u},"78cf":function(t,n,e){},"7a8f":function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var r=function(){var t=this,n=t.$createElement;t._self._c},a=[]},9464:function(t,n,e){"use strict";e.r(n);var u=e("781c"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=r.a},db15:function(t,n,e){"use strict";e.r(n);var u=e("7a8f"),r=e("9464");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("58a2");var o,c=e("f0c5"),i=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/status/index-create-component',
    {
        'components/status/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("db15"))
        })
    },
    [['components/status/index-create-component']]
]);

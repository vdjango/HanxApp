(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/read-more/u-read-more"],{"01a5":function(t,e,n){"use strict";n.r(e);var o=n("1170"),i=n("942e");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("8378");var r,a=n("f0c5"),s=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"05b98f34",null,!1,o["a"],r);e["default"]=s.exports},1170:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var o={uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"5bde"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.isLongContent?t.__get_style([t.innerShadowStyle]):null);t.$mp.data=Object.assign({},{$root:{s0:n}})},u=[]},"3eb8":function(t,e,n){},4668:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-read-more",props:{showHeight:{type:[Number,String],default:400},toggle:{type:Boolean,default:!1},closeText:{type:String,default:"展开阅读全文"},openText:{type:String,default:"收起"},color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},shadowStyle:{type:Object,default:function(){return{backgroundImage:"linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",paddingTop:"300rpx",marginTop:"-300rpx"}}},textIndent:{type:String,default:"2em"},index:{type:[Number,String],default:""}},watch:{paramsChange:function(t){this.init()}},computed:{paramsChange:function(){return"".concat(this.toggle,"-").concat(this.showHeight)},innerShadowStyle:function(){return this.showMore?{}:this.shadowStyle}},data:function(){return{isLongContent:!1,showMore:!1,elId:this.$u.guid()}},mounted:function(){var t=this;this.$nextTick((function(){t.init()}))},methods:{init:function(){var e=this;this.$uGetRect("."+this.elId).then((function(n){n.height>t.upx2px(e.showHeight)&&(e.isLongContent=!0,e.showMore=!1)}))},toggleReadMore:function(){this.showMore=!this.showMore,0==this.toggle&&(this.isLongContent=!1),this.$emit(this.showMore?"open":"close",this.index)}}};e.default=n}).call(this,n("543d")["default"])},8378:function(t,e,n){"use strict";var o=n("3eb8"),i=n.n(o);i.a},"942e":function(t,e,n){"use strict";n.r(e);var o=n("4668"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/read-more/u-read-more-create-component',
    {
        'components/read-more/u-read-more-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("01a5"))
        })
    },
    [['components/read-more/u-read-more-create-component']]
]);
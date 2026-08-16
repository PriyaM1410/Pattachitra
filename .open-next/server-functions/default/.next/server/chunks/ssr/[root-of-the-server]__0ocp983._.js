module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},950640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},587127,a=>{"use strict";var b={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},c={0:8203,1:8204,2:8205,3:65279},d={0:String.fromCodePoint(c[0]),1:String.fromCodePoint(c[1]),2:String.fromCodePoint(c[2]),3:String.fromCodePoint(c[3])},e=[,,,,].fill(String.fromCodePoint(c[0])).join("");Object.fromEntries(Object.entries(d).map(a=>[a[1],+a[0]])),Object.fromEntries(Object.entries(b).map(a=>a.reverse()));var f=`${Object.values(b).map(a=>`\\u{${a.toString(16)}}`).join("")}`,g=RegExp(`[${f}]{4,}`,"gu");a.s(["isRecord",0,function(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)},"stegaClean",0,function(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(g,""),encoded:(null==(c=b.match(g))?void 0:c[0])||""}.cleaned)},"y",0,function(a,b,c="auto"){return!0===c||"auto"===c&&(!(!Number.isNaN(Number(a))||/[a-z]/i.test(a)&&!/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(a))&&Date.parse(a)||function(a){try{new URL(a,a.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}(a))?a:`${a}${function(a){let b=JSON.stringify(a),c=new TextEncoder().encode(b),f="";for(let a=0;a<c.length;a++){let b=c[a];f+=d[b>>6&3]+d[b>>4&3]+d[b>>2&3]+d[3&b]}return e+f}(b)}`}])},217562,a=>{"use strict";a.s(["groq",0,function(a,...b){let c=a.length-1;return a.slice(0,c).reduce((a,c,d)=>a+c+b[d],"")+a[c]}],217562)},326758,a=>{a.v("/_next/static/media/favicon.2vob68tjqpejf.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},438872,a=>{"use strict";let b={src:a.i(326758).default,width:256,height:256};a.s(["default",0,b])},371349,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/components/GalleryClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/GalleryClient.tsx <module evaluation>","default")},948164,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/components/GalleryClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/components/GalleryClient.tsx","default")},187804,a=>{"use strict";a.i(371349);var b=a.i(948164);a.n(b)},548239,a=>{"use strict";var b=a.i(907997),c=a.i(187804),d=a.i(497281),e=a.i(217562);e.groq`
  *[_type == "hero"][0]{
    title,
    subtitle,
    image
  }
`;let f=e.groq`
  *[_type == "artwork" && availableForSale == true]
  | order(_createdAt desc) {
    _id,
    title,
    artworkId,
    slug,
    price,
    size,
    description,
    availableForSale,

    image{
      asset,
      alt
    },

    category->{
      _id,
      title,
      prefix
    }
  }
`;async function g(){let a=await d.client.fetch(f);return(0,b.jsx)(c.default,{artworks:a})}e.groq`
  *[_type == "artwork" && slug.current == $slug][0]{
    _id,
    title,
    artworkId,
    slug,
    price,
    size,
    description,
    availableForSale,
    colours,
    material,
    otherMaterial,
    timeTaken,

    image{
      asset,
      alt
    },

    category->{
      _id,
      title,
      prefix
    }
  }
`,e.groq`
  *[_type == "category" && isActive == true]
  | order(title asc) {
    _id,
    title,
    prefix
  }
`,e.groq`
  *[_type == "contact"]
  | order(createdAt desc) {
    _id,
    name,
    email,
    phone,
    subject,
    message,
    createdAt
  }
`,a.s(["default",0,g],548239)},318935,a=>{a.n(a.i(548239))},609489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_1wffdy6.js"].map(b=>a.l(b))).then(()=>b(614025)))},276016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__0l_42p6._.js"].map(b=>a.l(b))).then(()=>b(312374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ocp983._.js.map
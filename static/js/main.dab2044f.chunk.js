(this.webpackJsonppumpify=this.webpackJsonppumpify||[]).push([[0],{139:function(e,t){},172:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r(1),i=r.n(n),s=r(25),o=r.n(s),c=r(73),l=r.n(c),u=r(74),d=r.n(u),h=(r(85),r(86),r(26)),p=r(75),f=r(27),b=r(10);h.b.add(p.a,f.a,f.d,f.b,f.c,b.a,b.d,b.c,b.b,b.e,b.g,b.f);var g=r(11),j=(r(91),r(92),r(17)),y=r(18),m=r(20),v=r(19),x=r(173),O=r(4),k=r.n(O),w=r(12),T=r(76),S=r.n(T),C=r(77);function E(e){e=e.replace(/[[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(window.location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}var P=new(r.n(C).a)({maxConcurrent:1,minTime:0});P.on("failed",function(){var e=Object(w.a)(k.a.mark((function e(t,r){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(429===t.response.status&&r.retryCount<2)){e.next=4;break}return e.abrupt("return",1e3*(t.response.headers["retry-after"]||1)+1e3);case 4:if(401===t.response.status||429===t.response.status||0!==r.retryCount){e.next=7;break}return o.a.notify(t,(function(e){e.addMetadata("response",t.response),e.addMetadata("request",t.config),e.groupingHash="Retried Request"})),e.abrupt("return",1e3);case 7:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}());P.wrap((function(e,t){return S.a.get(e,{headers:{Authorization:"Bearer "+t}})}));var I=function(e){Object(m.a)(r,e);var t=Object(v.a)(r);function r(){return Object(j.a)(this,r),t.apply(this,arguments)}return Object(y.a)(r,[{key:"authorize",value:function(){var e=E("app_client_id"),t=""!==E("change_user");""===e&&(e="b8267324f80b4a9b9ba8c410e566b844"),window.location.href="https://accounts.spotify.com/authorize?client_id="+e+"&redirect_uri="+encodeURIComponent([window.location.protocol,"//",window.location.host,window.location.pathname].join(""))+"&scope=user-library-read%20playlist-modify-public&response_type=token&show_dialog="+t}},{key:"render",value:function(){return Object(a.jsxs)(x.a,{id:"loginButton",type:"submit",variant:"outline-secondary",size:"lg",onClick:this.authorize,children:[Object(a.jsx)(g.a,{icon:["far","check-circle"],size:"sm"})," Get Started"]})}}]),r}(i.a.Component),R=function(e){Object(m.a)(r,e);var t=Object(v.a)(r);function r(){var e;Object(j.a)(this,r);for(var a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).handleClick=function(){window.location.href="".concat(window.location.href.split("#")[0],"?change_user=true")},e}return Object(y.a)(r,[{key:"render",value:function(){return Object(a.jsx)(x.a,{id:"logoutButton",type:"submit",variant:"link",size:"lg",onClick:this.handleClick,title:"Change user",children:Object(a.jsx)(g.a,{icon:["fas","sign-out-alt"],size:"lg"})})}}]),r}(i.a.Component),A=r(78),_=r.n(A),F=r(13),M=r(29),z=r.n(M),U=function(){var e=Object(n.useState)(7),t=Object(F.a)(e,2),r=t[0],s=t[1],o=i.a.useState(r),c=Object(F.a)(o,2),l=c[0],u=c[1],d=Object(n.useState)(5),h=Object(F.a)(d,2),p=h[0],f=h[1],b=i.a.useState(p),g=Object(F.a)(b,2),j=g[0],y=g[1],m=Object(n.useState)(120),v=Object(F.a)(m,2),x=v[0],O=v[1],k=i.a.useState(x),w=Object(F.a)(k,2),T=w[0],S=w[1];return Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)(z.a,{value:r,onChange:function(e){return s(e.target.value)},onAfterChange:function(e){return u(e.target.value)},min:0,max:10,tooltip:"off"}),Object(a.jsxs)("div",{children:["Minimum Energy Rating: ",l/10]})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)(z.a,{value:p,onChange:function(e){return f(e.target.value)},onAfterChange:function(e){return y(e.target.value)},min:0,max:10,tooltip:"off"}),Object(a.jsxs)("div",{children:["Minimum Danceability Rating: ",j/10]})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)(z.a,{value:x,onChange:function(e){return O(e.target.value)},onAfterChange:function(e){return S(e.target.value)},min:0,max:200,tooltip:"off"}),Object(a.jsxs)("div",{children:["Minimum Tempo: ",T," bpm"]})]})]})},B=new _.a,L=function(e){Object(m.a)(r,e);var t=Object(v.a)(r);function r(e){var a;Object(j.a)(this,r),(a=t.call(this,e)).workoutTracks=[],a.energyFilter=.7,a.danceabilityFilter=.5,a.tempoFilter=120,a.state={userId:"",initialized:!1,savedTracks:[],filteredUris:[],playlistId:"",savedSongs:{limit:0,count:0},progressBar:{show:!1,label:"",value:0}};var n=a.getHashParams().access_token;return n&&B.setAccessToken(n),a}return Object(y.a)(r,[{key:"getHashParams",value:function(){var e,t={},r=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);for(e=r.exec(a);e;)t[e[1]]=decodeURIComponent(e[2]),e=r.exec(a);return t}},{key:"getMyUserId",value:function(){var e=Object(w.a)(k.a.mark((function e(){var t=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.getMe().then((function(e){t.setState({userId:e.id})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getMySavedTracks",value:function(){var e=Object(w.a)(k.a.mark((function e(){var t,r,a=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=50,r=0;case 2:if(!(r<2e3)){e.next=8;break}return e.next=5,B.getMySavedTracks({limit:t,offset:r}).then((function(e){a.setState({totalSaved:e.total}),a.getTrackAudioFeatures(e.items),console.log(e.offset)})).catch((function(e){console.error(e),console.error("ERROR: Error getting saved tracks")}));case 5:r+=t,e.next=2;break;case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getTrackAudioFeatures",value:function(e){var t=this,r=[];e.forEach((function(e){r.push(e.track.id)})),B.getAudioFeaturesForTracks(r).then((function(r){var a=0;r.audio_features.forEach((function(r){t.state.savedTracks.push({id:r.id,uri:r.uri,name:e[a++].track.name,energy:r.energy,danceability:r.danceability,tempo:r.tempo})})),t.filterTracks()})).catch((function(e){console.error(e),console.error("Error getting audio features for tracks")}))}},{key:"filterTracks",value:function(){var e=this,t=[];this.state.savedTracks.forEach((function(r){r.energy>=e.energyFilter&&r.danceability>=e.danceabilityFilter&&r.tempo>=e.tempoFilter&&t.push(r.uri)})),this.setState({filteredUris:t}),console.log(this.state.filteredUris)}},{key:"createPlaylist",value:function(){var e=Object(w.a)(k.a.mark((function e(){var t=this;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.createPlaylist(this.state.userId,{name:"API Playlist",description:"Liked Songs filtered by Energy: ".concat(this.energyFilter,", Danceability: ").concat(this.danceabilityFilter,", and Tempo: ").concat(this.tempoFilter,"."),public:!0}).then((function(e){console.log("MAKING PLAYLIST! "+e.id),t.setState({playlistId:e.id})})).catch((function(e){console.error(e),console.error("ERROR: Error creating playlist")}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addTracksToPlaylist",value:function(){for(var e=0;e<this.state.filteredUris.length;e+=100){var t=this.state.filteredUris.slice(e,e+100);B.addTracksToPlaylist(this.state.playlistId,t).then((function(){console.log("added!")})).catch((function(e){console.error(e),console.error("ERROR: Error adding workout tracks to playlist")}))}}},{key:"generatePlaylist",value:function(){var e=Object(w.a)(k.a.mark((function e(){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getMyUserId();case 2:return e.next=4,this.getMySavedTracks();case 4:return e.next=6,this.createPlaylist();case 6:this.addTracksToPlaylist(),console.log("help!"+this.state.playlistId);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{children:[Object(a.jsx)(U,{}),Object(a.jsx)(x.a,{onClick:function(){return e.generatePlaylist()},children:"Generate Playlist"})]})}}]),r}(i.a.Component);var N=function(){var e,t=new URLSearchParams(window.location.hash.substring(1));return e=""!==E("rate_limit_message")?Object(a.jsxs)("div",{id:"rateLimitMessage",className:"lead",children:[Object(a.jsx)("p",{children:Object(a.jsx)(g.a,{icon:["fas","bolt"],style:{fontSize:"50px",marginBottom:"20px"}})}),Object(a.jsxs)("p",{children:["Oops, Exportify has encountered a ",Object(a.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://developer.spotify.com/web-api/user-guide/#rate-limiting",children:"rate limiting"})," error while using the Spotify API. This might be because of the number of users currently exporting playlists, or perhaps because you have too many playlists to export all at once. Try ",Object(a.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/watsonbox/exportify/issues/6#issuecomment-110793132",children:"creating your own"})," Spotify application. If that doesn't work, please add a comment to ",Object(a.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/watsonbox/exportify/issues/6",children:"this issue"})," where possible resolutions are being discussed."]}),Object(a.jsx)("p",{style:{marginTop:"50px"},children:"It should still be possible to export individual playlists, particularly when using your own Spotify application."})]}):t.has("access_token")?Object(a.jsx)("div",{children:Object(a.jsx)(L,{accessToken:t.get("access_token")})}):Object(a.jsx)(I,{}),Object(a.jsxs)("div",{className:"App container",children:[Object(a.jsxs)("header",{className:"App-header",children:[t.has("access_token")&&Object(a.jsx)(R,{}),Object(a.jsxs)("h1",{children:[Object(a.jsx)(g.a,{icon:["fab","spotify"],color:"#84BD00",size:"sm"})," ",Object(a.jsx)("a",{href:"/pump-exportify",children:"Pumpify"})]}),Object(a.jsx)("p",{id:"subtitle",className:"lead text-secondary",children:"Create Spotify playlist from your Liked Songs to get Pumped"})]}),e,Object(a.jsx)("footer",{className:"App-footer",children:Object(a.jsxs)("p",{id:"subtitle",className:"lead text-secondary",children:["Based on",Object(a.jsx)("a",{href:"https://watsonbox.github.io/exportify/",target:"_blank",children:" Exportify by Watsonbox"})]})})]})},D=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,174)).then((function(t){var r=t.getCLS,a=t.getFID,n=t.getFCP,i=t.getLCP,s=t.getTTFB;r(e),a(e),n(e),i(e),s(e)}))};r(132).shim(),o.a.start({apiKey:"a65916528275f084a1754a59797a36b3",plugins:[new l.a],redactedKeys:["Authorization"],enabledReleaseStages:["production","staging"],onError:function(e){e.request.url="[REDACTED]",e.originalError.isAxiosError&&(e.groupingHash=e.originalError.message)}});var H=o.a.getPlugin("react").createErrorBoundary(i.a);d.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(H,{children:Object(a.jsx)(N,{})})}),document.getElementById("root")),D()},85:function(e,t,r){},86:function(e,t,r){}},[[172,1,2]]]);
//# sourceMappingURL=main.dab2044f.chunk.js.map
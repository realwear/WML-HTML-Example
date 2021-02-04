var wearML=new function(){this.voiceCommandsCallBack,this.config={attributes:!0,attributeFilter:["class","style"],childList:!0,subtree:!0,characterData:!1},this.observer=new MutationObserver(function(t){console.log("DOM Mutation detected, re-acquiring WearML commands."),wmlNodes=document.querySelectorAll('button[id$="WML_NODE"]'),wmlNodes.forEach(t=>{t.parentNode.removeChild(t)}),wearML.pollCommands()}),window.addEventListener("load",function(){wearML.pollCommands()},!1),this.wearMLElements=[],this.callbackElements=[],this.commandSet,this.root="--root",this.text_field="--text_field",this.overlay_show_number="--overlay_show_number",this.overlay_show_text="--overlay_show_text",this.overlay_persists="--overlay_persists",this.overlay_orientation="--overlay_orientation",this.overlay_background_color="--overlay_background_color",this.overlay_text_color="--overlay_text_color",this.overlay_border_color="--overlay_border_color",this.overlay_anchor_hv="--overlay_anchor_hv",this.overlay_show_dot="--overlay_show_dot",this.overlay_show_icon="--overlay_show_icon",this.overlay_offset="--overlay_offset",this.hf_scroll="--hf_scroll",this.barcode="--hf_barcode",this.global="--global_commands",this.hide_help="--hide_help",this.broadcast_results="--broadcast_results",this.include_help="--include_help",this.root_text_field="",this.root_overlay_show_number="",this.root_overlay_show_text="",this.root_overlay_persists="",this.root_overlay_orientation="",this.root_overlay_background_color="",this.root_overlay_text_color="",this.root_overlay_border_color="",this.root_overlay_anchor_hv="",this.root_overlay_show_dot="",this.root_overlay_show_icon="",this.root_overlay_offset="",this.root_hf_scroll="",this.root_hide_help="",this.root_include_help="",this.shouldHideHelp=null,this.getCommands=function(){!navigator.userAgent.match(/Android/i)&&screen.width>480&&screen.height>854?console.log("This is not an HMT device, WearML commands will not be registered."):(wearML.observer.disconnect(),wearML.clearHelpCommands(),this.shouldHideHelp=!1,this.elements=wearML.getAllElementsWithAttribute("*"),wearML.createOverrideDom(),this.rootElement=document.documentElement,wearML.observer.observe(this.rootElement,wearML.config))},this.setCommandSet=function(t){console.log("Changing commandSet from '"+this.commandSet+"' to '"+t+"'."),this.commandSet=t,this.pollCommands()},this.initCallbackBtn=function(t){var e=document.createElement("BUTTON");return e.id=t+"WML_CB_NODE",e.style.top=0,e.style.left=0,e.style.opacity="0.01",e.style.position="fixed",e.setAttribute("data-wml-speech-command",t),e},this.registerCallbackBtn=function(t){var e=document.body.firstChild;document.body.insertBefore(t,e),wearML.pollCommands()},this.addCallbackCommand=function(t,e,o){var r=document.getElementById(t+"WML_CB_NODE"),l=null==r||null==r;l&&(r=wearML.initCallbackBtn(t)),r.onclick=o,e&&r.setAttribute("data-wml-commandsets",e),l&&wearML.registerCallbackBtn(r)},this.removeCallbackCommand=function(t){var e=document.getElementById(t+"WML_CB_NODE");null!=e&&null!=e&&e.parentNode.removeChild(e),wearML.pollCommands()},this.automaticCommandParsing=!0,this.setAutomaticCommandParsing=function(t){console.log("Setting automatic command parsing to "+t),this.automaticCommandParsing=t,this.pollCommands()},this.isElementParsable=function(t){return this.automaticCommandParsing?null!==t.getAttribute("data-wml-style")||null!==t.getAttribute("data-wml-speech-command")||"DIV"!=t.tagName:null!==t.getAttribute("data-wml-style")||null!==t.getAttribute("data-wml-speech-command")},this.ASRPolling,this.isValidCommandSet=function(t){var e=!1;null==this.commandSet?e=!0:e=t.split("|").includes(wearML.commandSet);return e},this.isElementHidden=function(t){return"hidden"==t.type||1==t.hidden||"none"===t.display},this.helpCommands=new Set,this.addHelpCommand=function(t){wearML.helpCommands.add(t)},this.clearHelpCommands=function(){wearML.helpCommands.clear()},this.getAllElementsWithAttribute=function(t){wearML.wearMLElements=[],this.allElements=document.body.getElementsByTagName(t);for(var e=0,o=this.allElements.length;e<o;e++){this.currentElement=this.allElements[e];try{if(this.isElementParsable(this.currentElement)){if(wearML.isElementHidden(this.currentElement))continue;"SCRIPT"!=this.currentElement.tagName&&(this.styleId=this.currentElement.getAttribute("data-wml-style"),this.elementCommandSets=this.currentElement.getAttribute("data-wml-commandsets"),this.speech_command=this.currentElement.getAttribute("data-wml-speech-command"),this.command=this.currentElement.text,null==this.speech_command||" "==this.speech_command||""==this.speech_command||(this.command=this.speech_command,""===this.currentElement.id&&(this.currentElement.id=this.guid()),(null==wearML.commandSet||null==wearML.commandSet||wearML.isValidCommandSet(this.elementCommandSets))&&(this.position=this.getPosition(this.currentElement),this.element={tag:this.command,id:this.currentElement.id,x:this.position.x,y:this.position.y,styleId:this.styleId},this.element.id.includes("WML_CB_NODE")?wearML.callbackElements.push(this.element):(wearML.wearMLElements.push(this.element),this.createButton(this.element,this.currentElement)))))}}catch(t){console.log("An error has occurred while parsing an HTML element and a WearML element will not be registered"),console.error(t)}}return wearML.wearMLElements},this.onReceivedCommand=function(t){},this.pollCommands=function(){null!=wearML.ASRPolling&&(clearTimeout(wearML.ASRPolling),this.ASRPolling=null),wearML.ASRPolling=setTimeout(wearML.getCommands,300)},this.createOverrideDom=function(){this.btn=document.getElementById("wearHF_root_button"),null!=this.btn&&document.body.removeChild(this.btn),this.btn=document.createElement("BUTTON"),this.btn.id="wearHF_root_button",this.t=document.createTextNode(this.generateRootWearML()),this.btn.appendChild(this.t),this.btn.style.top=0,this.btn.style.left=0,this.btn.style.opacity="0.01",this.btn.style.position="fixed",this.theFirstChild=document.body.firstChild,document.body.insertBefore(this.btn,this.theFirstChild)},this.createButton=function(t,e){this.btn=document.getElementById(t.tag+"WML_NODE"),null!=this.btn&&document.body.removeChild(this.btn),this.btn=document.createElement("BUTTON"),this.btn.id=t.tag+"WML_NODE",this.t=document.createTextNode(t.tag),this.btn.style.fontSize="0.01px",this.btn.appendChild(this.t),this.btn.style.top=e.getBoundingClientRect().top+"px",this.btn.style.left=e.getBoundingClientRect().left+"px",this.btn.onclick=function(t){for(var e=0,o=wearML.wearMLElements.length;e<o;e++)void 0!==t.srcElement&&void 0!==t.srcElement.textContent&&t.srcElement.textContent===wearML.wearMLElements[e].tag&&(this.ele=document.getElementById(wearML.wearMLElements[e].id),"INPUT"===this.ele.tagName|"TEXTAREA"===this.ele.tagName?(this.ele.focus(),this.ele.click()):"SELECT"===this.ele.tagName?(this.event=document.createEvent("MouseEvents"),this.event.initMouseEvent("mousedown",!0,!0,window),this.ele.dispatchEvent(this.event)):(this.event=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0}),this.ele.dispatchEvent(this.event)))},this.btn.style.opacity="0.01",this.btn.style.position="absolute",this.btn.style.width=e.offsetWidth,this.btn.style.height=e.offsetHeight,this.btn.style.zIndex="-1";document.body.firstChild;document.body.appendChild(this.btn)},this.listHelpCommands=function(){var t="";return wearML.helpCommands.forEach(function(e){t+=e+","}),t.slice(0,-1)+"|"},this.generateRootWearML=function(){var t='<WearML><Package>com.android.webview</Package><Language>en_GB</Language><UniqueIdentifier id="web_app"/> ';document.title="hf_no_number",parseElementIntoXml=function(t,e){t.command=t.tag,t.styleId=t.styleId;var o="";return o+="<View ",o+='id="'+t.id+'" ',null==t.command?o+='speech_command="no" ':o+='speech_command="'+t.command+'" ',e?(o+='overlay_show_number="no" ',wearML.addHelpCommand(t.command)):(t.style=wearML.getStyle(t.styleId),null!=t.style&&(o+=wearML.wearMLParser(t.style,t))),o+="/> "};for(var e=0,o=wearML.wearMLElements.length;e<o;e++)t+=parseElementIntoXml(wearML.wearMLElements[e],!1);for(var r=0,l=wearML.callbackElements.length;r<l;r++)t+=parseElementIntoXml(wearML.callbackElements[r],!0);t+="</WearML>";var s=this.utf8_to_b64(t),n=wearML.shouldHideHelp?"hf_hide_help|":"";return(0==wearML.helpCommands.size?"":"hf_show_help_commands:"+wearML.listHelpCommands())+n+"hf_wearml_override:"+s},this.utf8_to_b64=function(t){return window.btoa(unescape(encodeURIComponent(t)))},this.getStyle=function(t){for(var e=0;e<document.styleSheets.length;e++)if(!document.styleSheets[e].href||document.styleSheets[e].href.startsWith(window.location.origin)){var o=document.styleSheets[e].cssRules;if(null!=o)for(var r=0;r<o.length;r++)if(o[r].selectorText==t)return o[r].style}},this.guid=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},this.getPosition=function(t){for(this.xPos=0,this.yPos=0;t;)"BODY"==t.tagName?(this.xScroll=t.scrollLeft||document.documentElement.scrollLeft,this.yScroll=t.scrollTop||document.documentElement.scrollTop,this.xPos+=t.offsetLeft-this.xScroll+t.clientLeft,this.yPos+=t.offsetTop-this.yScroll+t.clientTop):(this.xPos+=t.offsetLeft-t.scrollLeft+t.clientLeft,this.yPos+=t.offsetTop-t.scrollTop+t.clientTop),t=t.offsetParent;return{x:this.xPos,y:this.yPos}},this.wearMLParser=function(t,e){var o="",r=null!=t?t.getPropertyValue(this.root).trim():"",l=null!=t?t.getPropertyValue(this.text_field).trim():this.root_text_field,s=null!=t?t.getPropertyValue(this.overlay_show_number).trim():this.root_overlay_show_number,n=null!=t?t.getPropertyValue(this.overlay_show_text).trim():this.root_overlay_show_text,i=null!=t?t.getPropertyValue(this.overlay_persists).trim():this.root_overlay_persists,a=null!=t?t.getPropertyValue(this.overlay_orientation).trim():this.root_overlay_orientation,h=null!=t?t.getPropertyValue(this.overlay_background_color).trim():this.root_overlay_background_color,m=null!=t?t.getPropertyValue(this.overlay_text_color).trim():this.root_overlay_text_color,c=null!=t?t.getPropertyValue(this.overlay_border_color).trim():this.root_overlay_border_color,d=null!=t?t.getPropertyValue(this.overlay_anchor_hv).trim():this.root_overlay_anchor_hv,_=null!=t?t.getPropertyValue(this.overlay_show_dot).trim():this.root_overlay_show_dot,u=null!=t?t.getPropertyValue(this.overlay_show_icon).trim():this.root_overlay_show_icon,y=null!=t?t.getPropertyValue(this.overlay_offset).trim():this.root_overlay_offset,v=null!=t?t.getPropertyValue(this.hf_scroll).trim():this.root_hf_scroll,w=null!=t?t.getPropertyValue(this.barcode).trim():"",b=null!=t?t.getPropertyValue(this.global).trim():"",g=null!=t?t.getPropertyValue(this.hide_help).trim():"",p=null!=t?t.getPropertyValue(this.broadcast_results).trim():"",f=null!=t?t.getPropertyValue(this.include_help).trim():"";return""!=r&&"true"==r&&(this.root_text_field=l,this.root_overlay_show_number=s,this.root_overlay_show_text=n,this.root_overlay_persists=i,this.root_overlay_orientation=a,this.root_overlay_background_color=h,this.root_overlay_text_color=m,this.root_overlay_border_color=c,this.root_overlay_anchor_hv=d,this.root_overlay_show_dot=_,this.root_overlay_show_icon=u,this.root_overlay_offset=y,this.root_hf_scroll=v,this.root_hide_help=g,this.root_include_help=f),""!=l&&(o+='text_field="'+l+'" '),""!=s&&(o+="true"==s?'overlay_show_number="yes" ':'overlay_show_number="no" '),""!=n&&(o+="true"==n?'overlay_show_text="yes" ':'overlay_show_text="no" '),""!=i&&(o+="true"==i?'overlay_persists="yes" ':'overlay_persists="no" '),""!=a&&(o+="overlay_orientation="+a+" "),""!=h&&(o+="overlay_background_color="+h+" "),""!=m&&(o+="overlay_text_color="+m+" "),""!=c&&(o+="overlay_border_color="+c+" "),""!=d&&(o+="overlay_anchor="+d+" "),""!=_&&(o+="true"==_?'overlay_show_dot="yes" ':'overlay_show_dot="no" '),""!=u&&(o+="true"==u?'overlay_show_icon="yes" ':'overlay_show_icon="no" '),""!=y&&(o+="overlay_offset="+y+" "),""!=v&&(o+="scroll="+v+" "),""!=w&&(o+="barcode="+w+" "),""!=g&&(wearML.shouldHideHelp="true"==g),""!=b&&(o+="true"==b?'global_commands="yes" ':'global_commands="no" '),""!=p&&(o+="true"==p?'broadcast_results="yes" ':'broadcast_results="no" '),""!=f&&(console.log("Adding help command '"+e.command+"'"),wearML.addHelpCommand(e.command)),o}};

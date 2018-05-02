(function(){
    var selectors = [
		'div.selectedEntry a.title',			
		'.selectedEntry a.visitWebsiteButton',	
		'.list-entries .selected a.visitWebsiteButton',
		'a.visitWebsiteButton',					
		'.entry.selected a.title'			
    ]
	
	var App = function() {
		var _triggerCharCode = 104

		this.init = function() {
			chrome.storage.local.get("shortcut", items=>{
				if (typeof items.shortcut === "undefined") {
				}else{
					_triggerCharCode = items.shortcut.charCodeAt(0)
				}
			})
		}

		this.keyPressHandler = function(e) {
			var tag = e.target.tagName.toLowerCase()
			if (tag != 'input' && tag != 'textarea') {
				if (e.charCode == _triggerCharCode) {
					var url
                    for (var x in selectors) {
                        url = document.querySelector(selectors[x])
                        if(url){break}
                    }
					if (url) {
						chrome.runtime.sendMessage({url: url.href})
					}
                    else {
                        console.log("Could not find any selectors from: " + selectors.join())
                    }
				}
			}
		}
	}

	if (window == top) {
		var app = new App()
		app.init()
		window.addEventListener('keypress', app.keyPressHandler, false)

	}
})()
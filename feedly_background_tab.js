(function () {
	// for article mode.
	var article_mode_selector = ".inlineFrame--selected";
	var entry_title_selector = ".entryTitle";
	var floating_mode_selector = ".floatingEntryContent";

	var selectors = [
		article_mode_selector,
		'div.selectedEntry a.title',
		'.selectedEntry a.visitWebsiteButton',
		'.list-entries .selected a.visitWebsiteButton',
		'a.visitWebsiteButton',
		'.entry.selected a.title',
		'.entry--selected a.entry__title'	 // add feedback		
	]

	var App = function () {
		var _triggerCharCode = "KeyH"  // default is 'h'
		this.init = function () {
			// if setting another shortcut key,,, change trigger
			chrome.storage.local.get("shortcut", items => {
				if (typeof items.shortcut === "undefined") {
				} else {
					_triggerCharCode = items.shortcut.toUpperCase();
				}
			})
		}

		this.keyDownHandler = function (e) {
			var tag = e.target.tagName.toLowerCase()
			var key = e.key.toUpperCase();
			// console.log(" e.key = " + e.key);
			// console.log(" key = " + key);
			// console.log(_triggerCharCode);
			if (tag != 'input' && tag != 'textarea') {
				if (key == _triggerCharCode) {
					var url
					for (var x in selectors) {			// for Article mode
						url = document.querySelector(selectors[x])
						if (selectors[x] == article_mode_selector) {
							// console.log("catch selectors from: " + selectors[x])
							var isFloting = document.querySelector(floating_mode_selector)
							if (isFloting) {
								// console.log("floating mode")
								url = isFloting.querySelector(entry_title_selector)
							} else {
								// console.log("article mode")
								url = url.querySelector(entry_title_selector)
							}
							// console.log("url is " + url)
						} else {
							continue;
						}
						if (url) { break }
					}
					if (url) {
						chrome.runtime.sendMessage({ url: url.href })
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
		window.addEventListener('keydown', app.keyDownHandler, false)

	}
})()
(function () {
	// for article mode.
	var article_mode_selector = ".Article--selected";
	var entry_title_selector = ".Article__title";
	var floating_mode_selector = ".floatingEntryContent";
	var article_mode_selector2 = ".InlineArticle";
	

	var selectors = [
		article_mode_selector,
		'div.selectedEntry a.title',
		'.selectedEntry a.visitWebsiteButton',
		'.list-entries .selected a.visitWebsiteButton',
		'a.visitWebsiteButton',
		'.entry.selected a.title',
		'.entry--selected a.entry__title',	 // add feedback
		'#EntryTitleLink-selected',	 // add user feedback
	]

	var App = function () {
		var _triggerCharCode = "h"  // default is 'h'
		this.init = function () {
			// if setting another shortcut key,,, change trigger
			chrome.storage.local.get("shortcut", items => {
				if (typeof items.shortcut === "undefined") {
				} else {
					_triggerCharCode = items.shortcut;
					console.log("change key by setting")
					console.log(_triggerCharCode)
				}
			})
		}

		this.keyDownHandler = function (e) {
			var tag = e.target.tagName.toLowerCase()
			// console.log(" e.key = " + e.key);
			// console.log(_triggerCharCode);
			if (tag != 'input' && tag != 'textarea') {
				if (e.key == _triggerCharCode) {
					var url
					var select = getSelection()
					// console.log('select')
					// console.log(select)
					select = select.anchorNode
					// console.log('select')
					// console.log(select)
					if (select){
						var url = select.querySelector(selectors)
						// console.log(url)
					} else {
						for (var x in selectors) {			// for Article mode
							// console.log(document)
							url = document.querySelector(selectors[x])
							// console.log("url is " + url)
							// console.log("selectors[x] is ")
							// console.log(selectors[x])
							if (selectors[x] == article_mode_selector) {
								// console.log("catch selectors from: " + selectors[x])
								var isFloting = document.querySelector(floating_mode_selector)
								if (isFloting) {
									// console.log("floating mode")
									// console.log(isFloting)
									url = isFloting.querySelector(entry_title_selector)
								}
								var isArticle = document.querySelector(article_mode_selector2)
								if(isArticle) {
									// console.log("article mode")
									url = isArticle.querySelector(entry_title_selector)
								}
								// console.log("url is " + url)
							} else {
								continue;
							}
							if (url) { break }
						}
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

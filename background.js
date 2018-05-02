chrome.runtime.onMessage.addListener(
	function(messageObject) {
		chrome.tabs.create({
			url: messageObject.url,
			active: false
		});
	}
);
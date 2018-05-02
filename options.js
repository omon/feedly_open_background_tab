(function(){
	function Options() {
		const shortcutKeyTextArea = document.querySelector("#shortcut-key")

		this.init = function() {
			document.addEventListener('DOMContentLoaded', restore)
			document.querySelector('#change_shortcut_key').addEventListener('click', change)
		}

		var restore = function() {
  			chrome.storage.local.get("shortcut", items=>{
				if (typeof items.shortcut === "undefined") {
				}else{
					shortcutKeyTextArea.value = items.shortcut
				}
			})					
		}

		var change = function() {
			if (document.querySelector('#shortcut-key').value == '') {
				document.querySelector('#status').innerText = "set 1 character shortcut key."
				return false
			}
			browser.storage.local.set({"shortcut" : shortcutKeyTextArea.value})
			document.querySelector('#status').innerText = "change shortcut key."
		}
	}
	var options = new Options();
	options.init();
})();
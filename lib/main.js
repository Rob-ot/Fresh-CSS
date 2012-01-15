var hotkeys = require("hotkeys")
var widgets = require("widget")
var tabs = require("tabs")
var self = require("self")
var simplePrefs = require("simple-prefs")

var hotkey

widgets.Widget({
	id: "fresh-css-icon",
	label: "Fresh CSS",
	contentURL: self.data.url("HTML5_Styling_128.png"),
	onClick: refreshCss
})

simplePrefs.on("hotkey", bindHotkey)
bindHotkey()

function refreshCss () {
	tabs.activeTab.attach({
		contentScriptFile: self.data.url("ReloadCSS.js")
	})
}

function bindHotkey (e) {
	var key = simplePrefs.prefs.hotkey

	if (hotkey) hotkey.destroy()
	if (!key) return // if they don't specify a key they can disable the hotkey

	try {
		hotkey = hotkeys.Hotkey({
			combo: key,
			onPress: refreshCss
		})
	}
	catch (e) {
		throw new Error("Error creating hotkey with key string '" + key + "'")
	}
}

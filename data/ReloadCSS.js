var sheets = document.querySelectorAll("link[rel=stylesheet]")
	, sheet
	, href
	, now = Date.now()
	, previousCacheKill
	, cacheKill
	, cacheKillDataAttr = "data-reloadcss-cachekill"

for (var i = 0; i < sheets.length; i++) {
	sheet = sheets[i]

	previousCacheKill = sheet.getAttribute(cacheKillDataAttr)

	href = sheet.getAttribute("href")
	if (previousCacheKill) href = href.replace(previousCacheKill, "")

	cacheKill = ~href.indexOf("?") ? "&" + now : "?" + now
	href += cacheKill

	sheet.setAttribute("href", href)
	sheet.setAttribute(cacheKillDataAttr, cacheKill)
}
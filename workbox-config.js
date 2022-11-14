module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,ico,png,svg,html,js,json,txt}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
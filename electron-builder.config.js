if (process.env.VITE_APP_VERSION === undefined) {
	const now = new Date()
	process.env.VITE_APP_VERSION = `${now.getUTCFullYear() -
		2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() *
		60 +
		now.getUTCMinutes()}`
}

export const build = {
	directories: {
		output: 'dist_electron'
	},
	files: ['src/**/*'],
	appId: 'blah',
	productName: 'cock',
	nsis: {
		oneClick: false,
		allowToChangeInstallationDirectory: true
	},
	extraMetadata: {
		version: process.env.VITE_APP_VERSION
	}
}

module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				productName: 'Hotline Bat Generator',
				win: {
					target: ['portable']
				},
				portable: {
					artifactName: 'hotlineBatGen2_portable.exe'
				}
			},
			preload: 'src/preload.ts'
		}
	}
}

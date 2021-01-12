const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('preload', {
	send: (channel, data) => {
		let validChannels = [
			'directory-dialog-message',
			'file-dialog-message',
			'save-dialog-message'
		]
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data)
		}
	},
	receive: (channel, func) => {
		let validChannels = [
			'directory-dialog-reply',
			'file-dialog-reply',
			'save-dialog-reply'
		]
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args))
		}
	}
})

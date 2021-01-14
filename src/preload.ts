const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('preload', {
	send: (channel: string, data: string[]) => {
		let validChannels: string[] = [
			'directory-dialog-message',
			'file-dialog-message',
			'save-dialog-message'
		]
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data)
		}
	},
	receive: (channel: string, func: Function) => {
		let validChannels: string[] = [
			'directory-dialog-reply',
			'file-dialog-reply',
			'save-dialog-reply'
		]
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args))
		}
	}
})

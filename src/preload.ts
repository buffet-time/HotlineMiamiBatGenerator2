import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('preload', {
	send: (channel: string, data: string[]) => {
		const validChannels: string[] = [
			'directory-dialog-message',
			'file-dialog-message',
			'save-dialog-message'
		]
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data)
		}
	},
	// eslint-disable-next-line @typescript-eslint/ban-types
	receive: (channel: string, func: Function) => {
		const validChannels: string[] = [
			'directory-dialog-reply',
			'file-dialog-reply',
			'save-dialog-reply'
		]
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (_event, ...args) => func(...args))
		}
	}
})

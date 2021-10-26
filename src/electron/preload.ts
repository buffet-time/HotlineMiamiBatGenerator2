import { contextBridge, ipcRenderer } from 'electron'

const validChannels = [
	'directory-dialog-message',
	'file-dialog-message',
	'save-dialog-message'
]

contextBridge.exposeInMainWorld('preload', {
	send: (channel: string, data: string[]) => {
		if (validChannels.includes(channel)) ipcRenderer.send(channel, data)
	},
	// eslint-disable-next-line @typescript-eslint/ban-types
	receive: (channel: string, func: Function) => {
		if (validChannels.includes(channel))
			ipcRenderer.on(channel, (_event, ...args) => func(...args))
	}
})

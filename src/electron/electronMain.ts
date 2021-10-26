import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
const isDevelopment = process.env.NODE_ENV !== 'production'
import path from 'path'
import fs from 'fs'

protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
	const win = new BrowserWindow({
		width: 550,
		height: 400,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js')
		}
	})

	ipcListeners(win)
	win.removeMenu()
}

function ipcListeners(win: BrowserWindow) {
	ipcMain.on('directory-dialog-message', async event =>
		dialog
			.showOpenDialog(win, {
				properties: ['openDirectory'],
				defaultPath: 'C:/Users/%userprofile%/Documents/My Games'
			})
			.then(result => {
				if (result.filePaths) {
					event.returnValue = 'blah'
					event.reply('directory-dialog-reply', result.filePaths)
				}
			})
			.catch(error => console.log(error))
	)
	ipcMain.on('file-dialog-message', async event =>
		dialog
			.showOpenDialog(win, {
				properties: ['openFile'],
				defaultPath: 'C:/Users/%userprofile%/Documents/My Games'
			})
			.then(result => {
				if (result.filePaths) {
					event.returnValue = 'blah'
					event.reply('file-dialog-reply', result.filePaths)
				}
			})
			.catch(error => console.log(error))
	)
	ipcMain.on('save-dialog-message', async (event, args) =>
		dialog
			.showSaveDialog(win, {
				defaultPath: app.getPath('downloads') + '\\hotlineMiamiNGAny.bat'
			})
			.then(result => {
				if (!result.filePath) event.reply('save-dialog-reply', result.filePath)

				if (args[0] === 'delete')
					fs.writeFile(
						result.filePath!,
						`@ECHO OFF\ndel "${args[1]}\\SaveData.sav"`,
						error => {
							if (error) console.log(error)
						}
					)
				else
					fs.writeFile(
						result.filePath!,
						`@ECHO OFF\ndel "${args[1]}\\SaveData.sav"\ncopy "${args[2]}" "${args[1]}\\"`,
						error => {
							if (error) console.log(error)
						}
					)

				event.reply('save-dialog-reply', result.filePath)
			})
			.catch(error => console.log(error))
	)
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => createWindow())

if (isDevelopment) {
	if (process.platform === 'win32')
		process.on('message', data => {
			if (data === 'graceful-exit') app.quit()
		})
	else process.on('SIGTERM', () => app.quit())
}

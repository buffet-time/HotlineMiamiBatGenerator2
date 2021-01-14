import { Vue } from 'vue-class-component'

export default class Home extends Vue {
	public checked: string = 'false'
	public fileCreated: boolean = false
	public myDocumentsDirectory: string = ''
	public premadeSaveFileDirectory: string = ''

	public async mounted() {
		;(window as any).preload.receive('directory-dialog-reply', arg => {
			this.myDocumentsDirectory = arg[0]
		})
		;(window as any).preload.receive('file-dialog-reply', arg => {
			this.premadeSaveFileDirectory = arg[0]
		})
		;(window as any).preload.receive('save-dialog-reply', arg => {
			if (arg[0]) {
				this.fileCreated = true
				setTimeout(() => {
					this.fileCreated = false
				}, 5000)
			}
		})
	}

	public directoryDialog() {
		;(window as any).preload.send('directory-dialog-message')
	}

	public fileDialog() {
		;(window as any).preload.send('file-dialog-message')
	}

	public submitButtonPressed() {
		if (this.checked === 'false') {
			;(window as any).preload.send('save-dialog-message', [
				'delete',
				this.myDocumentsDirectory
			])
		} else {
			;(window as any).preload.send('save-dialog-message', [
				'replace',
				this.myDocumentsDirectory,
				this.premadeSaveFileDirectory
			])
		}
	}
}

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const checked = ref(false),
	fileCreated = ref(false),
	myDocumentsDirectory = ref(''),
	premadeSaveFileDirectory = ref('')

onMounted(async () => {
	;(window as any).preload.receive(
		'directory-dialog-reply',
		(arg: string[]) => {
			myDocumentsDirectory.value = arg[0]
		}
	)
	;(window as any).preload.receive('file-dialog-reply', (arg: string[]) => {
		premadeSaveFileDirectory.value = arg[0]
	})
	;(window as any).preload.receive('save-dialog-reply', (arg: any[]) => {
		if (arg[0]) {
			fileCreated.value = true
			setTimeout(() => {
				fileCreated.value = false
			}, 5000)
		}
	})
})

function directoryDialog() {
	;(window as any).preload.send('directory-dialog-message')
}

function fileDialog() {
	;(window as any).preload.send('file-dialog-message')
}

function submitButtonPressed() {
	if (!checked.value) {
		;(window as any).preload.send('save-dialog-message', [
			'delete',
			myDocumentsDirectory
		])
	} else {
		;(window as any).preload.send('save-dialog-message', [
			'replace',
			myDocumentsDirectory,
			premadeSaveFileDirectory
		])
	}
}
</script>

<template>
	<div class="hello">
		<div class="form-group form-check">
			<input
				type="checkbox"
				id="checkbox"
				v-model="checked"
				true-value="true"
				false-value="false"
				class="form-check-input"
			/>
			<label class="form-check-label" for="exampleCheck1"
				>Copy in a premade save file?
			</label>
		</div>
		<div class="form-group">
			HotlineMiami directory in Documents
			<br />
			<button @click="directoryDialog">
				Select Directory
			</button>
		</div>
		<div v-if="checked" class="form-group">
			SaveData.sav to copy into the HotlineMiami Folder
			<br />
			<button @click="fileDialog">
				Select File
			</button>
		</div>
		<button class="btn btn-primary" @click="submitButtonPressed">
			Generate
		</button>
		<div v-if="fileCreated">
			File Created
		</div>
	</div>
</template>

<script lang="ts" src="./home.component.ts"></script>

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
		<div v-if="checked === 'true'" class="form-group">
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

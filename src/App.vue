<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Home from './components/Home.vue'

@Options({
	components: {
		Home
	}
})
export default class App extends Vue {}
</script>

<template>
	<Home />
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 50px;
}
</style>

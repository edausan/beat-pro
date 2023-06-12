<script lang="ts">
import { defineComponent } from 'vue';
import MainWrapper from './components/Main.vue';

export default defineComponent({
    name: "App",
    components: { MainWrapper }
})
</script>

<template>
    <MainWrapper />
</template>

<style scoped>

</style>

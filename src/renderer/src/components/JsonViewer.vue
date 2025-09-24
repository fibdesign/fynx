<template>
  <JsonViewer :value="jsonData" copyable boxed sort theme="dark"/>
</template>

<script setup lang="ts">

import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/vue3-json-viewer.css";
import { reactive } from 'vue'

const {json} = defineProps<{
  json: string
}>();
const jsonData = reactive(JSON.parse(json));
</script>

<style scoped>
.json-viewer {
  padding: 1rem;
  background: #1e1e1e;
  color: #dcdcdc;
  font-family: monospace;
  overflow: auto;
  height: 100%;
}
</style>

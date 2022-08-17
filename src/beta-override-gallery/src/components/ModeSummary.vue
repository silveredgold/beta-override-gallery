<template>
<n-space vertical item-style="display: flex;" align="start">
    <n-checkbox v-for="mode of OperationMode" :label="startCase(mode)" :value="mode" :checked="modes.includes(mode)" />
</n-space>
</template>
<script setup lang="ts">
import { NSpace, NCheckbox } from "naive-ui";
import { OperationMode } from '@silveredgold/beta-shared/preferences';
import { toRefs } from "vue";
import { startCase } from "lodash";


// const availableModes =  Object.keys(OperationMode).map(label => [label, OperationMode as any[label]]);

const availableModes = Object.keys(OperationMode).map((e, i) => [e, Object.values(OperationMode)[i]]);

const props = withDefaults(defineProps<{modes: OperationMode[], showAll?: boolean}>(), {
    showAll: true
});

const {modes} = toRefs(props);
</script>
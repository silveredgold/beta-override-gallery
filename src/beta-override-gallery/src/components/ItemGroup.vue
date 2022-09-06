<template>
<n-space :vertical="vertical" item-style="display: flex;" align="center" :justify="justify" :wrap="false"><slot></slot></n-space>
</template>
<script setup lang="ts">
import { NSpace } from "naive-ui";
import type { Justify } from "naive-ui/es/space/src/Space";
import { toRefs } from "vue";

const props = withDefaults(defineProps<{justify?: Justify, vertical?: boolean}>(), {
    justify: 'space-between',
    vertical: false
});

const {justify, vertical} = toRefs(props)

</script>
<template>
    <n-space item-style="display: flex; align-items: center;" justify="start">
        <!-- <n-thing :title="override.owner"></n-thing> -->
        <n-tag size="large" :bordered="false">{{ owner }}</n-tag>
    </n-space>
</template>
<script setup lang="ts">
import { NTag, NSpace } from "naive-ui";
import { toRefs } from "vue";

const props = withDefaults(defineProps<{owner: string}>(), {
    
});
</script>

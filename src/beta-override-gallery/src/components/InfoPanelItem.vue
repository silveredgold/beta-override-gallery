<template>
    <n-collapse-item :title="title" :name="itemName">
        <slot></slot>
        <n-card size="small" v-if="$slots.extra">
        <slot name="extra"></slot>
        </n-card>
    </n-collapse-item>
</template>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { NCollapseItem, NCard, NThing } from "naive-ui";
import { toRefs, useSlots } from "vue";
import { snakeCase } from "lodash";
const props = withDefaults(defineProps<{ title: string, name?: string }>(), {
    name: undefined
});

const { title, name } = toRefs(props);
const slots = useSlots();

const itemName = computed(() => snakeCase(name.value || (title.value || 'help-item')));

const hasExtra = computed(() => !!slots.extraInfo);
</script>
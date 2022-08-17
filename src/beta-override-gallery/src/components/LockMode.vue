<template>
    <n-tooltip trigger="hover">
        <template #trigger>
                <n-icon :size="24" :component="modeIcon" />
        </template>
        {{modeText}}
    </n-tooltip>
</template>
<script setup lang="ts">
import { KeyMode } from '@/shared/types';
import { computed, toRefs } from 'vue';
import { NIcon, NIconWrapper, NTooltip, NAvatar } from "naive-ui";
import { PersonCircle, ShieldCheckmark, Eye, HelpCircleOutline } from "@vicons/ionicons5";

const props = withDefaults(defineProps<{ mode: KeyMode | undefined }>(), {
    mode: undefined
});

const { mode } = toRefs(props);

const modeText = computed(() => {
    switch (mode.value) {
        case KeyMode.AskOwner:
            return "Ask Owner for Unlock Key"
        case KeyMode.OnlyInstalled:
            return "Only available after activation!";
        case KeyMode.Visible:
            return "Unlock key available"
        default:
            return "Unknown";
    }
});

const modeIcon = computed(() => {
    switch (mode.value) {
        case KeyMode.AskOwner:
            return PersonCircle;
        case KeyMode.OnlyInstalled:
            return ShieldCheckmark;
        case KeyMode.Visible:
            return Eye;
        default:
            return HelpCircleOutline;
    }
})

</script>
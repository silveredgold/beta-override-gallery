<template>
    <n-space vertical>
        <n-input-group v-if="override.keyMode == 'visible'">
            <n-input-group-label>
                <n-icon style="margin-top: auto; margin-bottom: auto;" :component="LockClosed" />
            </n-input-group-label>
            <n-input :style="{ width: '75%' }" :disabled="true" :value="override.key" />
        </n-input-group>
        <n-input-group v-if="override.keyMode == KeyMode.OnlyInstalled && override.id === currentOverrideId">
            <n-input-group-label>
                <n-icon style="margin-top: auto; margin-bottom: auto;" :component="LockClosed" />
            </n-input-group-label>
            <n-input :style="{ width: '75%' }" :disabled="true" :value="override.key" />
        </n-input-group>
        <n-statistic label="Minimum Active Time" :value="remainingTime" />
        <!-- <n-thing title="Minimum Active Time" v-if="override.override.minimumTime || 0 > 0">
            {{ getDuration(override.override.minimumTime) }}
            {{ remainingTime }}
        </n-thing> -->
    </n-space>
</template>
<script setup lang="ts">
import { KeyMode, type UploadOverride } from "@/shared/types";
import { DateTime, Duration } from "luxon";
import { NSpace, NInputGroup, NInputGroupLabel, NInput, NThing, NIcon, NStatistic } from "naive-ui";
import { LockClosed } from "@vicons/ionicons5";
import { computed, onMounted, ref, toRefs } from "vue";
import { formatDistanceStrict } from "date-fns";
import { useOverrideProvider } from "./override-provider";

const props = withDefaults(defineProps<{override: UploadOverride}>(), {
    
});

const {override} = toRefs(props);

const overrideService = useOverrideProvider();

onMounted(async () => {
    let override = await overrideService.getActiveId();
    currentOverrideId.value = override;
})

const remainingDuration = computed(() => {
    const then = DateTime.fromMillis(currentTime.value);
    const target = then.plus(Duration.fromObject({ minutes: override.value.override.minimumTime }));
    return then > target ? 0 : target.diff(then).toMillis();
});

const targetTime = computed(() => {
    return currentTime.value + remainingDuration.value;
});

const remainingTime = computed(() => {
    return formatDistanceStrict(targetTime.value, currentTime.value);
})

const currentTime = ref(new Date().getTime());
const currentOverrideId = ref<string|undefined>(undefined);


</script>
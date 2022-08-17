<script setup lang="ts">
import { sendChannelMessage, useExtensionInfoProvider } from '@/util';
import { generateUUID } from '@silveredgold/beta-shared';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useOverrideProvider } from './override-provider';
import { NThing, NTag, NPopover } from "naive-ui";
import { DateTime } from 'luxon';
import { formatDistanceStrict } from "date-fns";


const currentVersion: Ref<string | undefined> = ref(undefined);
const currentOverride: Ref<string | undefined> = ref(undefined);
const activatedTime: Ref<DateTime | undefined> = ref(undefined);
const remainingTime: Ref<Duration | undefined> = ref(undefined);

// const getOverride = async () => {
//     const override = await sendChannelMessage<{id?: string, remainingTime?: number, activatedTime?: number}>('getCurrentOverride');
//     console.log('got override details', override);
//     if (override == undefined) {
//         currentOverride.value = undefined;
//         remainingTime.value = undefined;
//         activatedTime.value = undefined;
//     } else if (override && override.id != undefined) {
//         currentOverride.value = override.id;
//         remainingTime.value = override.remainingTime;
//         activatedTime.value = override.activatedTime;
//     } else if (override && override.id == undefined) {
//         currentOverride.value = 'none';
//         remainingTime.value = -1;
//         activatedTime.value = -1
//     }
// }

const currentTime = ref(DateTime.fromMillis(new Date().getTime()));

const statusText = computed(() => {
    if (currentVersion.value == undefined) {
        return "Not Connected!"
    } else {
        return `Connected to Beta Protection v${currentVersion.value}`;
    }
})


const remainingTimeText = computed(() => {
    if (remainingTime.value != undefined) {
        return formatDistanceStrict((currentTime.value.plus(remainingTime.value!)).toJSDate(), currentTime.value.toJSDate()) + " remaining";
    }
    return "";
});

const activatedTimeText = computed(() => {
    const text = activatedTime.value!.toLocaleString(DateTime.DATETIME_SHORT);
    console.log('date text', text);
    return `Activated ${text}`
    });

onMounted(async () => {
    const provider = useOverrideProvider();
    const info = useExtensionInfoProvider();
    const override = await provider.getCurrentOverride();
    const version = await info.getCurrentVersion();
    currentVersion.value = version;
    // await getOverride();
    activatedTime.value = override?.activatedTime;
    currentOverride.value = override?.id;
    remainingTime.value = override?.remainingTime;

})
</script>
<template>
    <n-thing v-if="currentVersion != undefined" :title="statusText">
        <template v-if="currentOverride != undefined">

            Current Override: <n-popover><template #trigger>
                    <n-tag :bordered="false">{{ currentOverride }}</n-tag>
                </template>
                <n-thing :title="activatedTimeText" :description="remainingTimeText" />
            </n-popover>
        </template>
        <template v-if="activatedTime != undefined" #footer></template>
    </n-thing>
    <n-thing v-if="currentVersion == undefined" :title="statusText">
        Could not establish connection to Beta Protection!
    </n-thing>
    <!-- Version: {{currentVersion || 'unknown'}}
Current Override: {{currentOverride || 'unknown'}}
Activated: {{ activatedTime || 'unknown'}}
Remaining: {{remainingTime == undefined ? 'unknown' : remainingTime}} -->
</template>
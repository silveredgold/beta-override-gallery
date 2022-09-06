<script setup lang="ts">
import { sendChannelMessage, useExtensionInfoProvider } from '@/util';
import { HelpTooltip } from "@silveredgold/beta-shared-components";
import { computed, onMounted, ref, type Ref } from 'vue';
import { useOverrideProvider } from './override-provider';
import { NThing, NTag, NPopover, NText } from "naive-ui";
import { DateTime } from 'luxon';
import { formatDistanceStrict } from "date-fns";


const currentVersion: Ref<string | undefined> = ref(undefined);
const currentOverride: Ref<string | undefined> = ref(undefined);
const activatedTime: Ref<DateTime | undefined> = ref(undefined);
const remainingTime: Ref<Duration | undefined> = ref(undefined);

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
    <n-thing v-if="currentVersion == undefined" :title="statusText" :content-style="{marginTop: '0px'}">
        <template #header-extra>
            <HelpTooltip>Make sure you have Beta Protection installed, enabled and updated to at least v0.1.6!</HelpTooltip>
        </template>
        Could not establish connection to Beta Protection!
    </n-thing>
</template>
<template>
    <n-card :title="override.name" style="height: 20rem;"
        content-style="padding: 0rem 1rem 0rem 1rem; padding-bottom: 0;"
        header-style="padding-top: 1rem; padding-bottom: 1rem;">
        <!-- <n-layout> -->
        <n-tabs type="line" animated pane-style="max-height: 8rem; overflow: auto; padding-top: 0.5rem;" size="small"
            justify-content="space-evenly">
            <n-tab-pane name="info" tab="Info">
                <n-scrollbar style="max-height: 8rem;">
                    <n-thing style="padding-top: 0.5rem;">
                        {{ override.description || 'No description provided' }}
                    </n-thing>
                </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="key" tab="Unlock">
                <UnlockDetails :override="override" style="padding-top: 0.5rem;" />
            </n-tab-pane>
            <n-tab-pane name="modes" tab="Modes">
                <ModeSummary :modes="override.override.allowedModes" />
            </n-tab-pane>
            <n-tab-pane name="sites" tab="Sites" style="padding-top: 0;"
                v-if="override.override.preferences.allowList != undefined || override.override.preferences.forceList != undefined">
                <n-scrollbar style="max-height: 8rem;">
                    <DomainList :allow-list="override.override.preferences.allowList"
                        :force-list="override.override.preferences.forceList" style="padding-top: 0; margin-top: 0;" />
                </n-scrollbar>
            </n-tab-pane>

        </n-tabs>

        <!-- </n-layout> -->
        <template #header-extra>
            <LockMode :mode="override.keyMode" />
        </template>
        <template #action>
            <n-space item-style="display: flex;" justify="space-between">
                <Owner v-if="override.owner" :owner="override.owner" />
                <n-space item-style="display: flex;" justify="end">
                    <n-button @click="showDetail">Show Details</n-button>
                    <OverrideDownload :override="override.override" :name="override.name" label="Download" />
                </n-space>
            </n-space>
        </template>
    </n-card>
    <n-modal :show="showModal" preset="card" title="Override Details" size="large" :segmented="segmented"
        style="max-width: 66%; width: 40vw;">

        <template #header-extra>
            {{ override.override.id }}
        </template>
        <CensoringSummary :preferences="override.override.preferences" extra-category="Site Lists">
            <template #extra>
                <DomainList :allow-list="override.override.preferences.allowList"
                    :force-list="override.override.preferences.forceList" />
            </template>
        </CensoringSummary>
    </n-modal>
    <n-drawer v-model:show="active" :width="502" placement="right">
        <n-drawer-content v-if="override.override">
            <template #header>
                Override Details
            </template>
            <!-- {{ override.override.id }}
            {{ override.override.allowedModes }} -->
            <CensoringSummary :preferences="override.override.preferences" extra-category="Site Lists">
                <template #extra>
                    <DomainList :allow-list="override.override.preferences.allowList"
                        :force-list="override.override.preferences.forceList" />
                </template>
            </CensoringSummary>
            <template #footer>
                <n-space item-style="display: flex; align-items: center;" justify="space-between">
                    <n-tag size="large" :bordered="false">{{ override.id || override.override.id }}</n-tag>
                    <n-button @click="toggle">Close</n-button>
                </n-space>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>
<script setup lang="ts">
import type { IExtensionPreferences, UploadOverride } from "@/shared/types";
import { NCard, NThing, NTabs, NTabPane, NInput, NIcon, NInputGroup, NInputGroupLabel, NSpace, NButton, NModal, NDrawer, NDrawerContent, NTag, NScrollbar } from "naive-ui";
import { ref, toRefs } from "vue";
import { LockClosed, Download } from "@vicons/ionicons5";
import { Duration } from "luxon";
import LockMode from "./LockMode.vue";
import OverrideDownload from "./OverrideDownload.vue";
import ModeSummary from "./ModeSummary.vue";
import UnlockDetails from "./UnlockDetails.vue";
import type { IOverride } from "@silveredgold/beta-shared/preferences";
import CensoringSummary from "./CensoringSummary.vue";
import DomainList from "./DomainList.vue";
import Owner from "./Owner.vue";
import type { Segmented } from "naive-ui/es/card/src/Card";


const props = withDefaults(defineProps<{ override: UploadOverride, useModal?: boolean }>(), {
    useModal: false
});

const emit = defineEmits<{
    (e: 'showDetail', override: IOverride<IExtensionPreferences>): void
}>();




const showModal = ref(false);
let active = ref(false);
const toggle = () => {
    active.value = !active.value;
}
const segmented: Segmented = {
    content: 'soft',
    footer: 'soft'
}

const { override, useModal } = toRefs(props);

const showDetail = () => {
    if (useModal.value) {
        showModal.value = true;
    } else {
        active.value = true;
    }
    emit('showDetail', override.value.override);
}
</script>
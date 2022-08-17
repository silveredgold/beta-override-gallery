<template>
<n-card :title="override.name" style="height: 20rem;">
            
            
        <n-tabs type="line" animated pane-style="max-height: 25rem;">
            
            <n-tab-pane name="info" tab="Info">
                
                <n-thing>
                    {{ override.description || 'No description provided' }}
                    <template #action>
                        <n-button @click="showDetail">Show Details</n-button>
                    </template>
                </n-thing>
            </n-tab-pane>
            <n-tab-pane name="key" tab="Unlock">
                <n-space vertical>
                    <n-input-group v-if="override.keyMode == 'visible'">
                        <n-input-group-label>
                            <n-icon style="margin-top: auto; margin-bottom: auto;" :component="LockClosed" />
                        </n-input-group-label>
                        <n-input :style="{ width: '75%' }" :disabled="true" :value="override.key" />
                    </n-input-group>
                    <n-thing title="Minimum Active Time" v-if="override.override.minimumTime || 0 > 0">
                        {{ getDuration(override.override.minimumTime) }}
                    </n-thing>
                </n-space>
            </n-tab-pane>
            <n-tab-pane name="modes" tab="Modes">
                <ModeSummary :modes="override.override.allowedModes" />
            </n-tab-pane>
            <n-tab-pane name="sites" tab="Sites" v-if="override.override.preferences.allowList != undefined || override.override.preferences.forceList != undefined">
                    <DomainList :allow-list="override.override.preferences.allowList" :force-list="override.override.preferences.forceList" />
            </n-tab-pane>
            
        </n-tabs>
        
        
        <template #header-extra>
            <LockMode :mode="override.keyMode" />
        </template>
        <template #action>
            <n-space item-style="display: flex;" justify="space-between">
                <n-thing :title="override.owner"></n-thing>
                <OverrideDownload :override="override.override" :name="override.name" label="Download" />
            </n-space>
        </template>
    
    
    </n-card>
    <n-modal :show="showModal">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        {{override.override.id}}
      </template>
      Content
      <template #footer>
        {{override.override.hash}}
      </template>
    </n-card>
  </n-modal>
  <n-drawer :show="active" :width="502" placement="right">
    <n-drawer-content v-if="override.override">
      <template #header>
        Override Details
      </template>
        {{override.override.id}}
        {{override.override.allowedModes}}
        <CensoringSummary :preferences="override.override.preferences" extra-category="Site Lists">
        <template #extra>
            <DomainList :allow-list="override.override.preferences.allowList" :force-list="override.override.preferences.forceList" />
        </template>
        </CensoringSummary>
      <template #footer>
        <n-button @click="toggle">Close</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup lang="ts">
import type { IExtensionPreferences, UploadOverride } from "@/shared/types";
import { NCard, NThing, NTabs, NTabPane, NInput, NIcon, NInputGroup, NInputGroupLabel, NSpace, NButton, NModal, NDrawer, NDrawerContent, NLayout, NLayoutContent } from "naive-ui";
import { ref, toRefs } from "vue";
import { LockClosed, Download } from "@vicons/ionicons5";
import { Duration } from "luxon";
import LockMode from "./LockMode.vue";
import OverrideDownload from "./OverrideDownload.vue";
import ModeSummary from "./ModeSummary.vue";
import type { IOverride } from "@silveredgold/beta-shared/preferences";
import CensoringSummary from "./CensoringSummary.vue";
import DomainList from "./DomainList.vue";


const props = withDefaults(defineProps<{ override: UploadOverride, useModal?: boolean }>(), {
    useModal: false
});

const emit = defineEmits<{
    (e: 'showDetail', override: IOverride<IExtensionPreferences>): void
}>();


const getDuration: (minutes?: number) => string = (minutes) => {
    if (minutes) {
        let dur = Duration.fromObject({ minutes });
        return dur.toHuman();
    } else {
        return 'None';
    }
}

const showModal = ref(false);
const active = ref(false);
const toggle = () => {
    active.value = !active.value;
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
<template>
    <n-card size="huge" title="Review your override" v-if="!!validUpload" style="max-width: 50vw; margin:auto;"
        :segmented="{
            content: true,
            footer: 'soft'
        }">
        <template #header-extra>
            <n-avatar round :size="36">
                <n-icon :component="CloudUpload" />
            </n-avatar>
        </template>
        <n-thing title="Your upload summary"
            description="Review the details of your override below, and click upload below when you're ready">
            <div style="max-width: 35rem; margin: auto;">
                <DynamicOverrideTile :override="validUpload" :use-modal="true" :allow-download="false" />
            </div>
            <template #action>
            </template>
        </n-thing>
        <template #action>
            <ItemGroup>
                <n-space :vertical="true" item-style="display: flex;" align="start" justify="space-evenly" :wrap="false">
                <n-text type="warning">You will not be able to delete or unlist an override once shared!</n-text>
                <n-text type="warning">Your Discord username will be shown with this override when it is listed!</n-text>
                </n-space>
                <n-button type="success" @click="handleUpload">Upload and Share</n-button>
            </ItemGroup>
        </template>
    </n-card>
</template>
<script setup lang="ts">import type { UploadOverride } from '@/shared/types';
import { NCard, NAvatar, NIcon, NThing, NText, NButton, NSpace } from "naive-ui";
import { CloudUpload } from "@vicons/ionicons5";
import { toRefs } from 'vue';
import { removeTrailingSlashes } from "@/util";
import DynamicOverrideTile from './DynamicOverrideTile.vue';
import ItemGroup from './ItemGroup.vue';

const props = withDefaults(defineProps<{ validUpload?: UploadOverride, uploadEnabled?: boolean }>(), {
    uploadEnabled: true,
    validUpload: undefined
});

const { validUpload, uploadEnabled } = toRefs(props)


const emit = defineEmits<{
    (e: 'upload', response: { success: boolean, error?: string }): void,
    (e: 'submit'): void
}>();

const handleUpload = () => {
    emit('submit');
    if (uploadEnabled.value && validUpload.value) {
        uploadOverride(validUpload.value).then(resp => {
            emit('upload', resp);
        });
    }
}

const uploadOverride = async (upload: UploadOverride) => {
    const path = removeTrailingSlashes(import.meta.env.VITE_API_URL) + '/overrides'
    var resp = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(upload)
    });
    if (resp.status == 201) {
        return {
            success: true,
            error: undefined
        }
    } else {
        var msg = await resp.text();
        return {
            success: false,
            error: resp.statusText + msg ? ` (${msg})` : ''
        }
    }
}

</script>
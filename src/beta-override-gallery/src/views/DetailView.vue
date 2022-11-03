<template>
    <main style="max-width: 50vw; width: 40vw; margin:auto;">
        <n-spin size="large" :show="loading" v-if="loading">
            <template #description>
                Fetching the requested override from the Gallery.
            </template>
        </n-spin>
        <DynamicOverrideTile v-if="!loading && override" :override="override" height="50vh" />
    </main>
</template>
<script setup lang="ts">
import { onMounted, ref, toRefs, type Ref } from "vue";
import { NCard, NSpin, NAlert } from "naive-ui";
import type { Segmented } from "naive-ui/es/card/src/Card";
import type { UploadOverride } from "@/shared/types";
import { removeTrailingSlashes } from "@/util";
import CensoringSummary from "@/components/CensoringSummary.vue";
import DomainList from "@/components/DomainList.vue";
import DynamicOverrideTile from "@/components/DynamicOverrideTile.vue";

type AppError = null | {
    json: () => string, value: Error, message: string
};

const props = defineProps<{ overrideId?: string }>();
const { overrideId } = toRefs(props);

const loading = ref(true);
const override: Ref<UploadOverride | undefined> = ref(undefined);
const error: Ref<AppError> = ref(null);

const segmented: Segmented = {
    content: 'soft',
    footer: 'soft'
}

onMounted(() => {
    if (overrideId?.value) {
        console.debug('requesting override!', overrideId.value);
        fetchData(overrideId.value);
    }
});

async function fetchData(overrideId: string) {
    loading.value = true;
    try {
        let res = await fetch(removeTrailingSlashes(import.meta.env.VITE_API_URL) + `/overrides/${overrideId}`, {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        });
        // a non-200 response code
        if (!res.ok) {
            // create error instance with HTTP status text
            const error: any = new Error(res.statusText);
            error.json = res.json();
            throw error;
        }

        let json = await res.json();
        // set the response data
        console.debug(json);
        override.value = json;
    } catch (err: any) {

        error.value = err;
        // In case a custom JSON error response was provided
        if (err.json) {
            let json = await err.json;
            error.value!.message = json.message;
        }
    }
    loading.value = false;
}
</script>
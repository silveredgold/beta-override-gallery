<template>
    <n-grid cols="8 m:4" :x-gap="18" :y-gap="18" responsive="screen">
        <n-gi :span="8">
            <n-card title="Currently available overrides">
                You can find a list of the currently shared overrides below. You can have a look at each override,
                including its unlock requirements before you download the override for yourself.
                <template #action>
                    The gallery currently has {{ data.length }} overrides available.
                </template>
            </n-card>
        </n-gi>
        <n-gi :span="8">
            <div class="list">
                <!-- <h3 v-for="(record, idx) of data">{{ record.override.id }}</h3> -->
                <n-grid cols="2 s:1 m:2 l:3 xl:4 2xl:5" :x-gap="18" :y-gap="12" v-if="!!data && data.length > 0"
                    responsive="screen">
                    <n-gi v-for="record of data" class="tile">
                        <DynamicOverrideTile :use-modal="false" :override="record" @show-detail="showDetail" />
                    </n-gi>
                </n-grid>
            </div>
        </n-gi>
    </n-grid>
</template>
<script setup lang="ts">
import { NGi, NGrid, NCard } from "naive-ui";
import type { IExtensionPreferences, UploadOverride } from '@/shared/types';
import { ref, onMounted, type Ref } from 'vue';
import OverrideTile from '../components/OverrideTile.vue';
import DynamicOverrideTile from '../components/DynamicOverrideTile.vue';
import type { IOverride } from "@silveredgold/beta-shared/preferences";
import { removeTrailingSlashes } from "@/util";

export type AppError = null | {
    json: () => string, value: Error, message: string
};

const data: Ref<UploadOverride[]> = ref([]);
const loading = ref(true);
const error: Ref<AppError> = ref(null);
const currentOverride: Ref<IOverride<IExtensionPreferences> | undefined> = ref(undefined);

const active = ref(false)
const toggle = () => {
    active.value = false;
    currentOverride.value = undefined;
}

const showDetail = (override: IOverride<IExtensionPreferences>) => {
    console.log('got show detail input', override);
}

async function fetchData() {

    

    loading.value = true;
    // I prefer to use fetch
    // you can use use axios as an alternative
    try {
        let res = await fetch(removeTrailingSlashes(import.meta.env.VITE_API_URL) + '/overrides/all', {
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
        data.value = json;
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

onMounted(() => {
    fetchData();
});
</script>
<style scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

.tile {
    display: flex;
    align-items: stretch;
    justify-content: center;
}
</style>

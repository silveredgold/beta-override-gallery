<template>
    <UploadForm v-if="!validUploadRequest" @validated="handleValidated" />
    <UploadReview v-if="validUploadRequest" :valid-upload="validUploadRequest" @upload="handleUpload" />
</template>
<script setup lang="ts">
import type { UploadOverride } from "@/shared/types";
import { useMessage } from "naive-ui";
import { computed, ref, type Ref } from "vue";
import UploadForm from "@/components/UploadForm.vue";
import UploadReview from "@/components/UploadReview.vue";
import router from "@/router";

const message = useMessage();

const validUploadRequest: Ref<UploadOverride | undefined> = ref(undefined);

const handleValidated = (upload: UploadOverride) => {
    validUploadRequest.value = upload;
}

const handleUpload = async (resp: {success: boolean, error?: string}) => {
    try {
        if (resp.success) {
            message.success('Your override has been uploaded!', { onAfterLeave: () => router.push('/gallery') });
        } else {
            message.error('There was an error uploading your override! ' + resp.error || '');
        }
    } catch (err: Error) {
        message.error('There was an unexpected error uploading your override! ' + err.message);
    }
}



</script>
<template>
    <n-card size="huge" title="Upload an override" style="max-width: 50vw; margin:auto;" :segmented="{
        content: true,
        footer: 'soft'
    }">
        <template #header-extra>
            <n-avatar round :size="36">
                <n-icon :component="CloudUpload" />
            </n-avatar>
        </template>
        <n-form ref="formRef" :model="details" :rules="rules">
            <n-grid cols="12" :span="12" :x-gap="24">
                <n-form-item-gi :span="12" path="title" label="Title">
                    <n-input v-model:value="details.title" @keydown.enter.prevent
                        placeholder="Enter a descriptive title for your override" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" path="password" label="Password">
                    <n-input v-model:value="details.description"
                        placeholder="Enter a description for this override to give others an idea of what's included."
                        type="textarea" :autosize="{
                            minRows: 3,
                            maxRows: 5
                        }" @keydown.enter.prevent />
                </n-form-item-gi>
                <n-form-item-gi :span="6" path="key" label="Unlock Key" ref="formItemKeyRef">
                    <n-input v-model:value="details.key" @keydown.enter.prevent />
                    <help-tooltip>The key you enter here must match the override file you upload for it to be included
                        in the gallery.</help-tooltip>
                </n-form-item-gi>
                <n-form-item-gi :span="6" path="keyMode" label="Key Visibilty">
                    <n-radio-group v-model:value="details.keyMode" name="keyModeGroup">
                        <n-radio-button :value="KeyMode.Visible">
                            <n-space :vertical="false" item-style="display: flex;" align="center"
                                justify="space-between" :wrap="false">
                                Visible <help-tooltip>The unlock key will be visible to anyone browsing the gallery
                                </help-tooltip>
                            </n-space>
                        </n-radio-button>
                        <n-radio-button :value="KeyMode.OnlyInstalled">
                            <n-space :vertical="false" item-style="display: flex;" align="center"
                                justify="space-between" :wrap="false">
                                Only Installed <help-tooltip>The key will become visible on the gallery
                                    <strong>after</strong> the override has been activated
                                </help-tooltip>
                            </n-space>
                        </n-radio-button>
                        <n-radio-button :value="KeyMode.AskOwner">
                            <n-space :vertical="false" item-style="display: flex;" align="center"
                                justify="space-between" :wrap="false">
                                Ask Owner <help-tooltip>The key will not be shown on the gallery at all, users will have
                                    to
                                    contact you for it.</help-tooltip>
                            </n-space>
                        </n-radio-button>
                    </n-radio-group>
                </n-form-item-gi>
                <n-form-item-gi :span="6" path="integrityCheck" label="Integrity Check" ref="formItemIntegrityRef">
                    <n-checkbox :checked="currentOverrideIntegrity">Check Passed</n-checkbox>
                    <help-tooltip>This will automatically complete if the </help-tooltip>
                </n-form-item-gi>
                <!-- <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button :disabled="model.age === null" round type="primary"
                                @click="handleValidateButtonClick">
                                Validate
                            </n-button>
                        </div>
                    </n-col>
                </n-row> -->

            </n-grid>
        </n-form>
        <template #footer>
            <n-tooltip trigger="hover" v-if="!currentOverride">
                <template #trigger>
                    <n-button @click="openFile">Import Single File...</n-button>
                </template>
                Choose a single image to use for any category.
            </n-tooltip>
            <n-thing title="Summary" v-if="currentOverrideIntegrity">
                <censoring-summary :preferences="currentOverride!.preferences" extra-category="Site Lists">
                    <template #extra>
                        <DomainList :allow-list="currentOverride!.preferences.allowList"
                            :force-list="currentOverride!.preferences.forceList" />
                    </template>
                </censoring-summary>
            </n-thing>
        </template>
        <template #action>
            <n-button @click="handleValidate">Submit</n-button>
        </template>
    </n-card>
</template>
<script setup lang="ts">
import { KeyMode, type IExtensionPreferences, type UploadOverride } from "@/shared/types";
import { NCard, NForm, NFormItem, NFormItemGi, NGrid, NGridItem, NInput, NRadioGroup, NRadioButton, NSpace, NButton, NTooltip, NCheckbox, NAvatar, NIcon, NThing, type FormRules, type FormItemRule, type FormInst, useMessage, type FormItemInst } from "naive-ui";
import { computed, ref, type Ref } from "vue";
import { CloudUpload } from "@vicons/ionicons5";
import { HelpTooltip, services } from "@silveredgold/beta-shared-components";
import type { IOverride } from "@silveredgold/beta-shared/preferences";
import { AES, enc } from "crypto-js";
import { hashCode } from "@silveredgold/beta-shared";
import type { LoadedFileHandle } from "@silveredgold/beta-shared-components/lib/services";
import CensoringSummary from "../components/CensoringSummary.vue";
import DomainList from "@/components/DomainList.vue";
import router from "@/router";

interface UploadDetails {
    title: string;
    description?: string;
    key?: string;
    keyMode: KeyMode;
    integrityCheck: boolean;
}

const openFile = async () => {
    const fs = new services.FileSystemClient();
    const result = await fs.getFile([{
        description: 'Override files',
        accept: {
            'text/*': ['.betaoverride']
        }
    }]);
    console.debug('loaded files', result);
    importedFile.value = result;
    const content = await result.file.text();
    const newPrefs = JSON.parse(content) as IOverride<IExtensionPreferences>;
    currentOverride.value = newPrefs;
    formItemIntegrityRef.value?.validate({trigger: 'file-uploaded'})
    formItemKeyRef.value?.validate({trigger: 'file-uploaded'})
}

const formRef = ref<FormInst | null>(null);
const formItemKeyRef = ref<FormItemInst|null>(null);
const formItemIntegrityRef = ref<FormItemInst|null>(null);
const message = useMessage();

const importedFile: Ref<LoadedFileHandle | undefined> = ref(undefined);

const details: Ref<UploadDetails> = ref({ title: '', keyMode: KeyMode.Visible, integrityCheck: false });

const currentOverride: Ref<IOverride<IExtensionPreferences> | undefined> = ref(undefined);

const currentCipherKey = computed(() => {
    if (currentOverride.value && currentOverride.value.key) {
        return currentOverride.value.key;
    }
    return undefined;
});

const currentOverrideHash = computed(() => currentOverride.value?.preferences ? hashCode(JSON.stringify(currentOverride.value?.preferences)) : undefined);

const currentOverrideIntegrity = computed(() => currentOverrideHash.value !== undefined && currentOverrideHash.value == currentOverride.value?.hash);

const validateKeyUnlocksOverride = (rule: FormItemRule, value: string): boolean => {
    if (details.value.key !== undefined && !!currentCipherKey.value) {
        const bytes = AES.decrypt(currentCipherKey.value, details.value.key);
        const candidate = bytes.toString(enc.Utf8);
        return candidate === currentOverride.value?.id
    }
    return false;
}

const rules: FormRules = {
    title: [
        {
            required: true,
            trigger: ['input', 'blur']
        }
    ],
    description: [
        {
            required: false
        }
    ],
    key: [
        {
            required: true,
            message: 'You must enter the unlock key for this override',
            trigger: ['input', 'blur']
        },
        {
            validator: validateKeyUnlocksOverride,
            message: 'Unlock key is not valid for the current override!',
            trigger: ['file-uploaded']
        }
    ],
    keyMode: [{ required: true }],
    integrityCheck: [
        {validator: () => currentOverrideIntegrity.value,
        message: 'The override file has been tampered with!', trigger: ['file-uploaded']}
    ]
}

const handleValidate = async (e: MouseEvent) => {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            console.log(`errors`, errors);
          if (!errors) {
            createUploadRequest(currentOverride.value!)
                .then((resp) => {
                    if (resp.success) {
                        message.success('Successfully uploaded your override!', {onAfterLeave: () => router.push('/gallery')});
                    } else {
                        message.error('There was an error uploading your override! ' + resp.error)
                    }
                })
          } else {
            console.log(errors)
            message.error('Invalid submission. Check your override details and try again!')
          }
        })
      }

const createUploadRequest = async (override: IOverride<IExtensionPreferences>) => {
    const upload: UploadOverride = {
        id: override.id,
        key: details.value.key!,
        keyMode: details.value.keyMode,
        name: details.value.title,
        description: details.value.description,
        override
    };
    var resp = await fetch('/api/overrides', {
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
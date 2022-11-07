<template>
    <n-card size="huge" title="Upload an override" style="max-width: 50vw; margin:auto;"
        :segmented="{
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
                <n-form-item-gi :span="12" path="description" label="Description">
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
                    <help-tooltip>This will automatically complete if the uploaded override file is valid.
                    </help-tooltip>
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <template #footer>
            <n-tooltip trigger="hover" v-if="!currentOverride">
                <template #trigger>
                    <n-button @click="openFile">Import Override File...</n-button>
                </template>
                <n-text>Choose the <n-text code>.betaoverride</n-text> file to upload to the gallery.</n-text>
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
import { computed, ref, toRefs, type Ref } from "vue";
import { NCard, NAvatar, NIcon, NForm, NGrid, NFormItemGi, NInput, NRadioGroup, NRadioButton, NSpace, NCheckbox, NTooltip, NThing, NButton, NText, type FormInst, type FormItemInst, type FormItemRule, type FormRules, useMessage } from "naive-ui";
import { HelpTooltip, services } from "@silveredgold/beta-shared-components";
import type { LoadedFileHandle } from "@silveredgold/beta-shared-components/lib/services";
import CensoringSummary from "./CensoringSummary.vue";
import DomainList from "./DomainList.vue";
import { KeyMode, type IExtensionPreferences, type UploadOverride } from "@/shared/types";
import type { IOverride } from "@silveredgold/beta-shared/preferences";
import { hashCode } from "@silveredgold/beta-shared";
import { AES, enc } from "crypto-js";
import { CloudUpload } from "@vicons/ionicons5";


interface UploadDetails {
    title: string;
    description?: string;
    key?: string;
    keyMode: KeyMode;
    integrityCheck: boolean;
}

const message = useMessage();

const emit = defineEmits<{
    (e: 'validated', upload: UploadOverride): void
}>();


const details: Ref<UploadDetails> = ref({ title: '', keyMode: KeyMode.Visible, integrityCheck: false });
const importedFile: Ref<LoadedFileHandle | undefined> = ref(undefined);
const currentOverride: Ref<IOverride<IExtensionPreferences> | undefined> = ref(undefined);

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
    formItemIntegrityRef.value?.validate({ trigger: 'file-uploaded' })
    formItemKeyRef.value?.validate({ trigger: 'file-uploaded' })
}

const formRef = ref<FormInst | null>(null);
const formItemKeyRef = ref<FormItemInst | null>(null);
const formItemIntegrityRef = ref<FormItemInst | null>(null);

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
        {
            validator: () => currentOverrideIntegrity.value,
            message: 'The override file has been tampered with!', trigger: ['file-uploaded']
        }
    ]
}

const handleValidate = async (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
        console.log(`errors`, errors);
        if (!errors) {
            try {
            createUploadRequest(currentOverride.value!)
                .then((resp) => {
                    if (resp) {
                        message.info('Your override is valid and ready for upload!');
                        emit('validated', resp)
                    } else {
                        message.error('There was an error validating your override!');
                    }
                })
            } catch (err: any) {
                message.error('There was an error validating your override! ' + err.message)
            }
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
    return upload;
}

</script>
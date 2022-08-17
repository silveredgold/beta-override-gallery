<template>
    <n-card size="huge" title="Frequently Asked Questions" :segmented="{
        content: true,
        footer: 'soft'
    }">
        <template #header-extra>
            <n-avatar round :size="36">
                <n-icon :component="HelpCircle" />
            </n-avatar>
        </template>
        <InfoPanel>
            <InfoPanelItem title="How do I install an override">
                <n-text tag="p">You can install an override file you've downloaded by opening your Beta Protection
                    settings, clicking the Overrides button in the top right then import the file you downloaded.
                </n-text>
                <n-text tag="p">Make sure you know the unlock key, or how to get it, before you import an override into
                    Beta Protection as you cannot disable it without the key.</n-text>
                <template #extra>
                    <n-thing title="More Information">
                        You can find more information in the <n-button @click="openDocs" tertiary type="info">Beta
                            Protection documentation</n-button>
                    </n-thing>
                </template>
            </InfoPanelItem>
            <InfoPanelItem title="How do I get the unlock key for an override in the Gallery?">
                <n-text tag="p">That depends on the <em>key mode</em> chosen by the uploader. When the key is set to
                    <em>Visible</em>, you'll be able to see the unlock key right in the gallery before you download the
                    override file. When the key is set to <em>Only Installed</em>, you'll be able to see the unlock key
                    in the gallery but <strong>only after</strong> you have imported and activated the override. The
                    Gallery will communicate with your browser to check that the override is active before showing you
                    the key.</n-text>
                <n-text tag="p">If the key is set to <em>Ask Owner</em> the Gallery will <strong>not</strong> show you
                    the key anywhere. You will need to contact the owner of the override to get the key. We recommend
                    you contact them <em>before</em> you activate an override with this option to ensure you don't get
                    stuck.</n-text>
            </InfoPanelItem>
            <InfoPanelItem title="Can I share my own override?">
                <n-text tag="p"><strong>Yes!</strong> You can upload your own override files using the <em>Upload</em>
                    option from the top menu. You'll be asked to provide the override file itself and some extra
                    details, then your override will be visible in the gallery for other Beta Protection users!</n-text>
                <template #extra>
                    <n-thing title="About uploading!">
                        For a few reasons, you will only be able to upload an override after logging in with Discord.
                        When you do this, we attach your Discord username to any overrides you upload and this will be
                        shown to other users.
                        <template #action>
                            <strong>Beta Override Gallery does not have access to your Discord account, it is used only
                                to get your username and prevent abuse.</strong>
                        </template>
                    </n-thing>
                </template>
            </InfoPanelItem>
            <InfoPanelItem title="The Gallery can't connect to Beta Protection!">
                <n-text tag="p">The most likely cause for this is that you are running an old version of Beta
                    Protection. You will need to be using <n-text code>v0.1.6</n-text> or later for the Gallery to be
                    able to communicate with Beta Protection. Alternatively, if the Gallery is open in an incognito
                    window, it may not be able to connect to Beta Protetion.</n-text>
            </InfoPanelItem>
        </InfoPanel>
        <n-divider />
        <!-- <n-collapse accordion>
            <n-collapse-item title="How do I install an override" name="help-install">


            </n-collapse-item>
            <n-collapse-item title="How do I get the unlock key for an override in the Gallery?" name="help-get-key">

            </n-collapse-item>
            <n-collapse-item title="Can I share my own override?" name="help-upload">
                <n-text tag="p"><strong>Yes!</strong> You can upload your own override files using the <em>Upload</em>
                    option from the top menu. You'll be asked to provide the override file itself and some extra
                    details, then your override will be visible in the gallery for other Beta Protection users!</n-text>
                <n-thing title="About uploading!">
                    For a few reasons, you will only be able to upload an override after logging in with Discord. When
                    you do this, we attach your Discord username to any overrides you upload and this will be shown to
                    other users.
                    <template #action>
                        <strong>Beta Override Gallery does not have access to your Discord account, it is used only to
                            get your username and prevent abuse.</strong>
                    </template>
                </n-thing>
            </n-collapse-item>
            <n-collapse-item title="The Gallery can't connect to Beta Protection!" name="help-connector">
                <n-text tag="p">The most likely cause for this is that you are running an old version of Beta
                    Protection. You will need to be using <n-text code>v0.1.6</n-text> or later for the Gallery to be
                    able to communicate with Beta Protection. Alternatively, if the Gallery is open in an incognito
                    window, it may not be able to connect to Beta Protetion.</n-text>
            </n-collapse-item>
        </n-collapse> -->
    </n-card>
</template>
<script setup lang="ts">
import { NCard, NCollapse, NCollapseItem, NThing, NAvatar, NIcon, NText, NButton, NDivider } from "naive-ui";
import { HelpCircle } from "@vicons/ionicons5";
import InfoPanel from "./InfoPanel.vue";
import InfoPanelItem from "./InfoPanelItem.vue";

const openDocs = () => window.open('https://silveredgold.github.io/beta-protection/guide/overrides', '_blank');

</script>
import type { InjectionKey, Plugin } from "vue";
import { OverrideChannelClient, overrideProviderKey } from "./components/override-provider";
import { sendChannelMessage } from "./util";

export interface ExtensionInfoProvider {
    getCurrentVersion: () => Promise<string|undefined>;
    // getIsEnabledOnPage: () => Promise<string>;
}

export const extensionInfoProviderKey = Symbol() as InjectionKey<ExtensionInfoProvider>;

export class ExtensionInfoClient implements ExtensionInfoProvider {
    getCurrentVersion: () => Promise<string|undefined> = async () => {
        const version = await sendChannelMessage<string|undefined>('getExtensionVersion');
        return version;
    }
}

export const extensionInfoPlugin: Plugin = {
    install: (app, options) => {
        app.config.unwrapInjectedRef = true;
        app.provide(overrideProviderKey, new OverrideChannelClient());
        app.provide(extensionInfoProviderKey, new ExtensionInfoClient());
    }
}
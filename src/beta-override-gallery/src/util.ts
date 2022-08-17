import { generateUUID } from "@silveredgold/beta-shared";
import { inject } from "vue";
import { extensionInfoProviderKey, type ExtensionInfoProvider } from "./ExtensionInfoPlugin";

export const sendChannelMessage = <T>(requestMsg: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        let channel = new BroadcastChannel('beta_protection');
        const requestId = generateUUID();
        channel.onmessage = e => {
            if (e.data.type == "RESPONSE" && e.data.requestId == requestId) {
                resolve(e.data.response)
            }
        }
        channel.postMessage({type: "REQUEST", request: requestMsg, requestId});
    });
}

export function throwError (location: string, message: string): never {
    throw new Error(`[override-gallery/${location}]: ${message}`)
  }

  
export function useExtensionInfoProvider(): ExtensionInfoProvider {
    const info = inject(extensionInfoProviderKey, null);
    if (info === null) {
        throwError('use-extension-info-provider', 'Could not inject extension info provider!');
    }
    return info;
}
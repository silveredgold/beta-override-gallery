import { sendChannelMessage, throwError } from "@/util";
import { DateTime, Duration } from "luxon";
import { inject, type InjectionKey } from "vue";

export type OverrideDetails = {
    id: string,
    activatedTime?: DateTime,
    remainingTime?: Duration
}

export interface OverrideDetailsProvider {
    isActive: () => Promise<boolean>;
    getActiveId: () => Promise<string | undefined>;
    getCurrentOverride: () => Promise<OverrideDetails|undefined>;
}


export function useOverrideProvider(): OverrideDetailsProvider {
    const loadingBar = inject(overrideProviderKey, null)
    if (loadingBar === null) {
        throwError(
            'use-override-provider',
            'No outer <override-provider /> found.'
        )
    }
    return loadingBar
}

export const overrideProviderKey = Symbol() as InjectionKey<OverrideDetailsProvider>;


export class OverrideChannelClient implements OverrideDetailsProvider {
    private getOverride = async () => {
        const override = await sendChannelMessage<{ id?: string, remainingTime?: number, activatedTime?: number }>('getCurrentOverride');
        console.log('got override details', override);
        if (override == undefined) {
            return undefined;
        } else if (override && override.id != undefined && override.activatedTime != undefined && override.remainingTime != undefined) {
            return { id: override.id, activatedTime: DateTime.fromMillis(override.activatedTime), remainingTime: Duration.fromMillis(override.remainingTime) };
        } else if (override && override.id == undefined) {
            return {};
            // currentOverride.value = 'none';
            // remainingTime.value = -1;
            // activatedTime.value = -1
        }
    }
    isActive: () => Promise<boolean> = async () => {
        const override = await this.getOverride();
        return override?.id !== undefined;
    }
    getActiveId: () => Promise<string | undefined> = async () => {
        const override = await this.getOverride();
        return override?.id;
    }
    getCurrentOverride: () => Promise<OverrideDetails | undefined> = async () => {
        const override = await this.getOverride();
        if (override?.id !== undefined) {
            return {
                id: override.id,
                activatedTime: override.activatedTime,
                remainingTime: override.remainingTime
            }
        }
        return undefined;

    }
}
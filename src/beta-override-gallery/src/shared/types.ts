import type { IOverride, IPreferences } from "@silveredgold/beta-shared/preferences/types";

export type SubliminalOptions = {
    enabled: boolean;
    delay: number;
    duration: number;
    ignoreCensorState: boolean;
}

export type IExtensionPreferences = IPreferences & {
    // mode: OperationMode;
    gifsAsVideos: boolean;
    enabledPlaceholders: string[];
    subliminal: SubliminalOptions;
    allowList: string[];
    forceList: string[];
}

export type UploadOverride = {
    id: string;
    owner?: string;
    override: IOverride<IExtensionPreferences>;
    key: string;
    keyMode: KeyMode;
    name: string;
    description?: string;
}

export enum KeyMode {
    Visible = "visible",
    OnlyInstalled = "installed",
    AskOwner = "owner"
}
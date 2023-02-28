import type { IExtensionPreferences } from "@/shared/types";
import { generateUUID, hashCode } from "@silveredgold/beta-shared";
import type {
  IOverride,
  OperationMode,
} from "@silveredgold/beta-shared/preferences";
import { services } from "@silveredgold/beta-shared-components";
import { AES } from "crypto-js";

export class OverrideService {
  static createOverride(
    keyPhrase: string,
    allowedModes: OperationMode[],
    prefs: Partial<IExtensionPreferences>
  ) {
    const overrideId = generateUUID();
    const key = AES.encrypt(overrideId, keyPhrase).toString();
    const override: IOverride<IExtensionPreferences> = {
      key,
      id: overrideId,
      allowedModes,
      preferences: prefs,
      hash: hashCode(JSON.stringify(prefs)),
    };
    return override;
  }

  static exportOverride = async (
    override: IOverride<IExtensionPreferences>
  ) => {
    const fs = new services.FileSystemClient();
    const output = JSON.stringify(override);
    await fs.saveTextFile(output, OverrideService.overrideFileType);
  };

  static overrideFileType = [
    {
      accept: { "text/json": ".betaoverride" },
      description: "Beta Protection Overrides",
    },
  ];
}

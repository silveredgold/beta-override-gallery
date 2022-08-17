import { Injectable } from "@nestjs/common";
import { JSONFile, Low } from "lowdb";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { UploadOverride } from "./upload-override.dto.js";

@Injectable()
export class OverridesService {
    private _db: Low<UploadOverride[]>;

    init() {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const file = join(__dirname, 'overrides-db.json')
        const adapter = new JSONFile<UploadOverride[]>(file)
        const db = new Low(adapter)
        this._db = db;
    }

    async read() {
        await this._db.read();
        if (this._db.data == null) {
            this._db.data = [];
            await this._db.write();
        }
        return this._db.data.length;
    }

    async add(override: UploadOverride): Promise<boolean> {
        await this.read();
        override.id ||= override.override.id;
        if (!this._db.data.find(ov => ov.id == override.id)) {
            this._db.data.push(override);
            await this._db.write();
            return true;
        }
        return false;
    }

    async getAll() {
        await this._db.read();
        return this._db.data;
    }

}
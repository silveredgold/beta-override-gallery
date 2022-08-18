import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JSONFile, Low } from "lowdb";
import { dirname, join, isAbsolute, extname } from "node:path";
import { fileURLToPath } from "url";
import { UploadOverride } from "./upload-override.dto.js";

@Injectable()
export class OverridesService {
    /**
     *
     */
    constructor(private configService: ConfigService) {}
    private _db: Low<UploadOverride[]>;

    init() {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const filePath = this.configService.get('DB_PATH', './');
        let file = '';
        if (isAbsolute(filePath)) {
            file = filePath;
            
        } else {
            file = join(__dirname, filePath)
        }
        if (!extname(file)) {
            file = join(file, 'overrides.db.json');
        }
        const adapter = new JSONFile<UploadOverride[]>(file);
        const db = new Low(adapter);
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
        await this.read();
        return this._db.data;
    }

}
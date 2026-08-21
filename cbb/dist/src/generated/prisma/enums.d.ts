export declare const ProviderType: {
    readonly GOOGLE_DRIVE: "GOOGLE_DRIVE";
    readonly ONEDRIVE: "ONEDRIVE";
    readonly TELEGRAM: "TELEGRAM";
    readonly CLOUDINARY: "CLOUDINARY";
    readonly MEGA: "MEGA";
    readonly DROPBOX: "DROPBOX";
    readonly BOX: "BOX";
    readonly PCLOUD: "PCLOUD";
    readonly YANDEX: "YANDEX";
    readonly VPS: "VPS";
    readonly LOCAL_MACHINE: "LOCAL_MACHINE";
};
export type ProviderType = (typeof ProviderType)[keyof typeof ProviderType];
export declare const NodeType: {
    readonly FILE: "FILE";
    readonly FOLDER: "FOLDER";
};
export type NodeType = (typeof NodeType)[keyof typeof NodeType];

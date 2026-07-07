export interface GccDownloadInfo {
    url: string;
    md5: string | null;
    sha256?: string | null;
}
export declare const gccVersions: {
    [gccRelease: string]: {
        [platform: string]: GccDownloadInfo;
    };
};

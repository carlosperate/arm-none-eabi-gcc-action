export interface GccDownloadInfo {
    url: string;
    urlOriginal?: string;
    md5: string | null;
}
export declare const gccVersions: {
    [gccRelease: string]: {
        [platform: string]: GccDownloadInfo;
    };
};

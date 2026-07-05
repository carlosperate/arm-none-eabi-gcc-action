export interface GccDownloadInfo {
    url: string;
    resolvedUrl?: string;
    md5: string | null;
    sha256?: string | null;
    ephemeralUrl?: boolean;
}
export declare const gccVersions: {
    [gccRelease: string]: {
        [platform: string]: GccDownloadInfo;
    };
};

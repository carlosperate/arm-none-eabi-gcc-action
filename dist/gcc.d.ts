import { GccDownloadInfo } from './gcc-versions.js';
export declare function availableVersions(): string[];
export declare function latestGccVersion(): string;
export declare function distributionUrl(version: string, platform: string, arch: string): Promise<GccDownloadInfo>;
export declare function gccVersionToSemver(gccVersion: string): string;

export interface GccDownloadInfo {
  url: string;
  urlOriginal?: string;
  md5: string | null;
}

export const gccVersions: {[gccRelease: string]: {[platform: string]: GccDownloadInfo}} = {
  '15.2.Rel1': {
    win32: {
      url:
        'https://armkeil.blob.core.windows.net/developer/files/downloads/gnu/15.2.rel1/binrel/arm-gnu-toolchain-15.2.rel1-mingw-w64-x86_64-arm-none-eabi.zip',
      md5: '88cce5f8c71445cf54dfa1667b3ae6ab',
    },
    mac_arm64: {
      url:
        'https://armkeil.blob.core.windows.net/developer/files/downloads/gnu/15.2.rel1/binrel/arm-gnu-toolchain-15.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: 'e91fd6348ba0f3e5ec35eeba1ad7e2b8',
    },
    linux_x86_64: {
      url:
        'https://armkeil.blob.core.windows.net/developer/files/downloads/gnu/15.2.rel1/binrel/arm-gnu-toolchain-15.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: 'da62bef8821e7fc2a9b5d023871036e0',
    },
    linux_aarch64: {
      url:
        'https://armkeil.blob.core.windows.net/developer/files/downloads/gnu/15.2.rel1/binrel/arm-gnu-toolchain-15.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '458c5d9b362726c9ac20c96f1894ae13',
    },
  },
  '14.3.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-mingw-w64-x86_64-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-mingw-w64-x86_64-arm-none-eabi.zip',
      md5: 'ab64d0b20882ba164dbca44121c7f216',
    },
    mac_arm64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-darwin-arm64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: '1c4a092430c167d08de4b55c6840e46b',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: '17272b6c72d476c82b692a06ada0636c',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '5b44bdd1d983247ec153fe548b4ff8ed',
    },
  },
  '14.2.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-mingw-w64-x86_64-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-mingw-w64-x86_64-arm-none-eabi.zip',
      md5: '7426b9eec8b576f0a524ede63013c547',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: 'd5fb1ae60e4d67eb2986837dbcd6a066',
    },
    mac_arm64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-arm64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: '40d1c9208aed7fab08b0f27e5383dcef',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: 'fcdcd7c8d5b22d2d0cc6bf3721686e69',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '342d6d9dc75e6d4c05a748f2cecc96a6',
    },
  },
  '13.3.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-mingw-w64-i686-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: '39d9882ca0eb475e81170ae826c1435d',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: '4bb141e44b831635fde4e8139d470f1f',
    },
    mac_arm64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-arm64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: 'f1c18320bb3121fa89dca11399273f4e',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: '0601a9588bc5b9c99ad2b56133b7f118',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '303102d97b877ebbeb36b3158994b218',
    },
  },
  '13.2.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-mingw-w64-i686-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: '7fd677088038cdf82f33f149e2e943ee',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: '41d49840b0fc676d2ae35aab21a58693',
    },
    mac_arm64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-arm64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: '2c43e9d72206c1f81227b0a685df5ea6',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: '791754852f8c18ea04da7139f153a5b7',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '5a08122e6d4caf97c6ccd1d29e62599c',
    },
  },
  '12.3.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-mingw-w64-i686-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: '36c3f864ae8a4ded4a464e67c74f4973',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: '13ae2cc016564507c91a4fcffb6e3c54',
    },
    mac_arm64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-arm64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: '53d034e9423e7f470acc5ed2a066758e',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: '00ebb1b70b1f88906c61206457eacb61',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '02c9b0d3bb1110575877d8eee1f223f2',
    },
  },
  '12.2.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-mingw-w64-i686-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: '0122a821c28b200f251cd23d2edc38c5',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: 'b98c6f58a4ccf64c38f92b456eb3b3d1',
    },
    mac_arm64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-arm64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: '26329762f802bb53ac73385d85b11646',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: 'f3d1d32c8ac58f1e0f9dbe4bc56efa05',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: '2014a0ebaae3168da555efdcabf03f2a',
    },
  },
  '11.3.Rel1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-mingw-w64-i686-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-mingw-w64-i686-arm-none-eabi.zip',
      // Arm's published MD5 seems incorrect: f1ff0b48304dbc4ff558f0753a3a8860
      // https://community.arm.com/support-forums/f/compilers-and-libraries-forum/53343/arm-gnu-toolchain-11-3-rel1-windows-arm-none-eabi-md5-is-incorrect
      md5: 'b287cf60045910dd56c56cdc2a490049',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: 'f4a3df0bff51bf872db679c406a9154d',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: '8cb33f7ec29682f2f9cdc0b4e687f9a6',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: 'f020e29a861c5dbf199dce93643d68cc',
    },
  },
  '11.2-2022.02': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-mingw-w64-i686-arm-none-eabi.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-mingw-w64-i686-arm-none-eabi.zip',
      md5: 'e2bb05445200ed8e8c9140fad6a0afb5',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-darwin-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: 'c51d8257b67d7555047f172698730685',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-x86_64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-x86_64-arm-none-eabi.tar.xz',
      md5: 'a48e6f8756be70b071535048a678c481',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-aarch64-arm-none-eabi.tar.xz
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-aarch64-arm-none-eabi.tar.xz',
      md5: '746f20d2eb8acad4e7085e1395665219',
    },
  },
  '10.3-2021.10': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-win32.zip',
      md5: '2bc8f0c4c4659f8259c8176223eeafc1',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-mac.tar.bz2',
      md5: '7f2a7b7b23797302a9d6182c6e482449',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2',
      md5: '2383e4eb4ea23f248d33adc70dc3227e',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-aarch64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-aarch64-linux.tar.bz2',
      md5: '3fe3d8bb693bd0a6e4615b6569443d0d',
    },
  },
  '10.3-2021.07': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-win32.zip',
      md5: 'fca12668002f8c52cfa174400fd2d03e',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-mac-10.14.6.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-mac-10.14.6.tar.bz2',
      md5: '42d5f143cdc303d73a3602fa5052c790',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-x86_64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-x86_64-linux.tar.bz2',
      md5: 'b56ae639d9183c340f065ae114a30202',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-aarch64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-aarch64-linux.tar.bz2',
      md5: 'c20b0535d01f8d4418341d893c62a782',
    },
  },
  '10-2020-q4': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-win32.zip',
      md5: '5ee6542a2af847934177bc8fa1294c0d',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-mac.tar.bz2',
      md5: 'e588d21be5a0cc9caa60938d2422b058',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-x86_64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-x86_64-linux.tar.bz2',
      md5: '8312c4c91799885f222f663fc81f9a31',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-aarch64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-aarch64-linux.tar.bz2',
      md5: '1c3b8944c026d50362eef1f01f329a8e',
    },
  },
  '9-2020-q2': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-win32.zip',
      md5: '184b3397414485f224e7ba950989aab6',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-mac.tar.bz2',
      md5: '75a171beac35453fd2f0f48b3cb239c3',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-x86_64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-x86_64-linux.tar.bz2',
      md5: '2b9eeccc33470f9d3cda26983b9d2dc6',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-aarch64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-aarch64-linux.tar.bz2',
      md5: '000b0888cbe7b171e2225b29be1c327c',
    },
  },
  '9-2019-q4': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-win32.zip',
      md5: '82525522fefbde0b7811263ee8172b10',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-mac.tar.bz2',
      md5: '241b64f0578db2cf146034fc5bcee3d4',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2',
      md5: 'fe0029de4f4ec43cf7008944e34ff8cc',
    },
    linux_aarch64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-aarch64-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-aarch64-linux.tar.bz2',
      md5: '0dfa059aae18fcf7d842e30c525076a4',
    },
  },
  '8-2019-q3': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-win32.zip',
      md5: '5fa382a547abe0b0d5c0a6e9eaa75c7b',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-mac.tar.bz2',
      md5: '405cfbe54cee25a1b925ad0657f73924',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-linux.tar.bz2',
      md5: '6341f11972dac8de185646d0fbd73bfc',
    },
  },
  '8-2018-q4': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-win32.zip',
      md5: '9b1cfb7539af11b0badfaa960679ea6f',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-mac.tar.bz2',
      md5: '4c0d86df0244df22bc783f83df886db9',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-linux.tar.bz2',
      md5: 'f55f90d483ddb3bcf4dae5882c2094cd',
    },
  },
  '7-2018-q2': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-win32.zip',
      md5: 'bc8ae26d7c429f30d583a605a4bcf9bc',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-mac.tar.bz2',
      md5: 'a66be9828cf3c57d7d21178e07cd8904',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-linux.tar.bz2',
      md5: '299ebd3f1c2c90930d28ab82e5d8d6c0',
    },
  },
  '7-2017-q4': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-win32.zip',
      md5: '168c68c41ee0986ecc1dadceaa8b6a3f',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-mac.tar.bz2',
      md5: '1ec5bed45d78788723036f22c4e83ba8',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2',
      md5: 'd3b00ae09e847747ef11316a8b04989a',
    },
  },
  '6-2017-q2': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-win32.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-win32.zip',
      md5: 'df6c2f763a6114c951e3f1e509af3cbc',
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-mac.tar.bz2',
      md5: 'd536d7fb167c04b24f7f0d40cd739cac',
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-linux.tar.bz2',
      md5: '13747255194398ee08b3ba42e40e9465',
    },
  },
  '6-2017-q1': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-win32-zip.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-win32.zip',
      md5: 'ec8b98945d4faf0c28a05bcdc1c2e537', // This MD5 was calculated by me instead of coming from Arm
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-mac.tar.bz2',
      md5: '709c86af4c92d17bd5fb9dcfe00ffd6d', // This MD5 was calculated by me instead of coming from Arm
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-linux.tar.bz2',
      md5: '30004c24f4632bc594952462bb0cd1c9', // This MD5 was calculated by me instead of coming from Arm
    },
  },
  '6-2016-q4': {
    win32: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-win32-zip.zip
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-win32.zip',
      md5: '6aa8f5795abf176190b9eef9a9f34ef1', // This MD5 was calculated by me instead of coming from Arm
    },
    mac_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-mac.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-mac.tar.bz2',
      md5: 'dff94a68a97ba8526a825254c336d660', // This MD5 was calculated by me instead of coming from Arm
    },
    linux_x86_64: {
      // redirect from https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-linux.tar.bz2
      url:
        'https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-linux.tar.bz2',
      md5: '8986a0d41a8e4c92e8a64487d8b0eac7', // This MD5 was calculated by me instead of coming from Arm
    },
  },
  '5-2016-q3': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-win32.zip
      url: 'https://launchpadlibrarian.net/287101634/gcc-arm-none-eabi-5_4-2016q3-20160926-win32.zip',
      md5: 'dd46badbea382c884dd7079dcc5b4e0d',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/287101378/gcc-arm-none-eabi-5_4-2016q3-20160926-mac.tar.bz2',
      md5: '968ef87c0c03372aa933bab31d6789af',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/287101520/gcc-arm-none-eabi-5_4-2016q3-20160926-linux.tar.bz2',
      md5: 'f7004b904541c09a8a0a7a52883c9e5b',
    },
  },
  '5-2016-q2': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q2-update/+download/gcc-arm-none-eabi-5_4-2016q2-20160622-win32.zip
      url: 'https://launchpadlibrarian.net/268330601/gcc-arm-none-eabi-5_4-2016q2-20160622-win32.zip',
      md5: '3f3ba8772ccf9bccdb3f897cc5569aaa',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q2-update/+download/gcc-arm-none-eabi-5_4-2016q2-20160622-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/268330406/gcc-arm-none-eabi-5_4-2016q2-20160622-mac.tar.bz2',
      md5: 'bb2c7501a2d6a6e517267197f4c069e6',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q2-update/+download/gcc-arm-none-eabi-5_4-2016q2-20160622-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/268330503/gcc-arm-none-eabi-5_4-2016q2-20160622-linux.tar.bz2',
      md5: '47b26ff8e4eb2c91af615dd73ada0c50',
    },
  },
  '5-2016-q1': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q1-update/+download/gcc-arm-none-eabi-5_3-2016q1-20160330-win32.zip
      url: 'https://launchpadlibrarian.net/251688125/gcc-arm-none-eabi-5_3-2016q1-20160330-win32.zip',
      md5: '1ea9a1b83666a5a363018fba8a088879',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q1-update/+download/gcc-arm-none-eabi-5_3-2016q1-20160330-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/251687676/gcc-arm-none-eabi-5_3-2016q1-20160330-mac.tar.bz2',
      md5: 'aa60d23587dc7456c79a7e39acdafe0b',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q1-update/+download/gcc-arm-none-eabi-5_3-2016q1-20160330-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/251687888/gcc-arm-none-eabi-5_3-2016q1-20160330-linux.tar.bz2',
      md5: '5a261cac18c62d8b7e8c70beba2004bd',
    },
  },
  '5-2015-q4': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2015-q4-major/+download/gcc-arm-none-eabi-5_2-2015q4-20151219-win32.zip
      url: 'https://launchpadlibrarian.net/231143489/gcc-arm-none-eabi-5_2-2015q4-20151219-win32.zip',
      md5: '5b513d3453ecd5e2034eeb951a79607f',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2015-q4-major/+download/gcc-arm-none-eabi-5_2-2015q4-20151219-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/231140334/gcc-arm-none-eabi-5_2-2015q4-20151219-mac.tar.bz2',
      md5: '603bcce8e59683ac27054b3197a53254',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/5.0/5-2015-q4-major/+download/gcc-arm-none-eabi-5_2-2015q4-20151219-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/231142403/gcc-arm-none-eabi-5_2-2015q4-20151219-linux.tar.bz2',
      md5: 'f88caac80b4444a17344f57ccb760b90',
    },
  },
  '4.9-2015-q3': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-win32.zip
      url: 'https://launchpadlibrarian.net/218827522/gcc-arm-none-eabi-4_9-2015q3-20150921-win32.zip',
      md5: 'd944be40a5bdb2327d80db23290c6b9d',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/218827447/gcc-arm-none-eabi-4_9-2015q3-20150921-mac.tar.bz2',
      md5: '7886163ba5a1c17b560939e3dcf1382b',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/218827486/gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar.bz2',
      md5: '8a4a74872830f80c788c944877d3ad8c',
    },
  },
  '4.9-2015-q2': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q2-update/+download/gcc-arm-none-eabi-4_9-2015q2-20150609-win32.zip
      url: 'https://launchpadlibrarian.net/209776218/gcc-arm-none-eabi-4_9-2015q2-20150609-win32.zip',
      md5: '2e5812e1a7786adeb8461f17b2a6e6dc',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q2-update/+download/gcc-arm-none-eabi-4_9-2015q2-20150609-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/209776104/gcc-arm-none-eabi-4_9-2015q2-20150609-mac.tar.bz2',
      md5: '34904f10367d622c139c782063212cd9',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q2-update/+download/gcc-arm-none-eabi-4_9-2015q2-20150609-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/209776202/gcc-arm-none-eabi-4_9-2015q2-20150609-linux.tar.bz2',
      md5: '6d5e1ae27607bab87bd324c9be2df17a',
    },
  },
  '4.9-2015-q1': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q1-update/+download/gcc-arm-none-eabi-4_9-2015q1-20150306-win32.zip
      url: 'https://launchpadlibrarian.net/200701725/gcc-arm-none-eabi-4_9-2015q1-20150306-win32.zip',
      md5: 'ef2df916f1ea4c5cc1022fa9aaf338a1',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q1-update/+download/gcc-arm-none-eabi-4_9-2015q1-20150306-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/200700934/gcc-arm-none-eabi-4_9-2015q1-20150306-mac.tar.bz2',
      md5: 'e3d92e5eaac7f9b0c20bf69822a434dd',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q1-update/+download/gcc-arm-none-eabi-4_9-2015q1-20150306-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/200701245/gcc-arm-none-eabi-4_9-2015q1-20150306-linux.tar.bz2',
      md5: '68f5928cdfb990691ea53246c56f6720',
    },
  },
  '4.9-2014-q4': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2014-q4-major/+download/gcc-arm-none-eabi-4_9-2014q4-20141203-win32.zip
      url: 'https://launchpadlibrarian.net/192228054/gcc-arm-none-eabi-4_9-2014q4-20141203-win32.zip',
      md5: 'fe043db84c6c6ff423496f5e3ebd33e4',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2014-q4-major/+download/gcc-arm-none-eabi-4_9-2014q4-20141203-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/192227901/gcc-arm-none-eabi-4_9-2014q4-20141203-mac.tar.bz2',
      md5: 'a3b0ab5bd08ba5ad840b7cb5f17becb0',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.9/4.9-2014-q4-major/+download/gcc-arm-none-eabi-4_9-2014q4-20141203-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/192227997/gcc-arm-none-eabi-4_9-2014q4-20141203-linux.tar.bz2',
      md5: '74cc4f012699c171089e72832d95bf4c',
    },
  },
  '4.8-2014-q3': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-win32.zip
      url: 'https://launchpadlibrarian.net/186124217/gcc-arm-none-eabi-4_8-2014q3-20140805-win32.zip',
      md5: '4b07ff1ce5a38d394a6c13bf9ac07810',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/186124092/gcc-arm-none-eabi-4_8-2014q3-20140805-mac.tar.bz2',
      md5: '1ca44d778fc3b4799d76c98345ed7826',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/186124160/gcc-arm-none-eabi-4_8-2014q3-20140805-linux.tar.bz2',
      md5: 'acc8c8ff45f8801e2155934214309a87',
    },
  },
  '4.8-2014-q2': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q2-update/+download/gcc-arm-none-eabi-4_8-2014q2-20140609-win32.zip
      url: 'https://launchpadlibrarian.net/177524899/gcc-arm-none-eabi-4_8-2014q2-20140609-win32.zip',
      md5: 'd6e29ea8b587f871ec308214703383bf',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q2-update/+download/gcc-arm-none-eabi-4_8-2014q2-20140609-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/177524733/gcc-arm-none-eabi-4_8-2014q2-20140609-mac.tar.bz2',
      md5: '4a05e26d9eb30f43752667a34001e755',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q2-update/+download/gcc-arm-none-eabi-4_8-2014q2-20140609-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/177524816/gcc-arm-none-eabi-4_8-2014q2-20140609-linux.tar.bz2',
      md5: '0f80c6d2684c8e2bece37a2de4e8963b',
    },
  },
  '4.8-2014-q1': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q1-update/+download/gcc-arm-none-eabi-4_8-2014q1-20140314-win32.zip
      url: 'https://launchpadlibrarian.net/170926686/gcc-arm-none-eabi-4_8-2014q1-20140314-win32.zip',
      md5: '09c19b3248863074f5498a88f31bee16',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q1-update/+download/gcc-arm-none-eabi-4_8-2014q1-20140314-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/170926386/gcc-arm-none-eabi-4_8-2014q1-20140314-mac.tar.bz2',
      md5: '5d34d95a53ba545f1585b9136cbb6805',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q1-update/+download/gcc-arm-none-eabi-4_8-2014q1-20140314-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/170926605/gcc-arm-none-eabi-4_8-2014q1-20140314-linux.tar.bz2',
      md5: '72b0d06ae16b303c25fd70b2883d3950',
    },
  },
  '4.7-2014-q2': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2014-q2-update/+download/gcc-arm-none-eabi-4_7-2014q2-20140408-win32.zip
      url: 'https://launchpadlibrarian.net/174121673/gcc-arm-none-eabi-4_7-2014q2-20140408-win32.zip',
      md5: '4bdec324a4f3f36d54f084f890aabb2a',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2014-q2-update/+download/gcc-arm-none-eabi-4_7-2014q2-20140408-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/174121504/gcc-arm-none-eabi-4_7-2014q2-20140408-mac.tar.bz2',
      md5: '911649c1756d9501e90de0be120d1696',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2014-q2-update/+download/gcc-arm-none-eabi-4_7-2014q2-20140408-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/174121628/gcc-arm-none-eabi-4_7-2014q2-20140408-linux.tar.bz2',
      md5: '239a1a180e10dc40aff870e1e7b650f9',
    },
  },
  '4.8-2013-q4': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131204-win32.zip
      url: 'https://launchpadlibrarian.net/160488289/gcc-arm-none-eabi-4_8-2013q4-20131204-win32.zip',
      md5: 'ca47c682f9b3bd14d0a6ce1f175716fa',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131218-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/162333029/gcc-arm-none-eabi-4_8-2013q4-20131218-mac.tar.bz2',
      md5: '850caa23f01ea8c1e6abcc3c217d36f7',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131204-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/160488069/gcc-arm-none-eabi-4_8-2013q4-20131204-linux.tar.bz2',
      md5: '4869e6a6e1dc11ea0835e8b8213bb194',
    },
  },
  '4.7-2013-q3': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q3-update/+download/gcc-arm-none-eabi-4_7-2013q3-20130916-win32.zip
      url: 'https://launchpadlibrarian.net/151487752/gcc-arm-none-eabi-4_7-2013q3-20130916-win32.zip',
      md5: 'bf5ed93bc5f8fbb7caf4ff1689c14ab7',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q3-update/+download/gcc-arm-none-eabi-4_7-2013q3-20130916-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/151487551/gcc-arm-none-eabi-4_7-2013q3-20130916-mac.tar.bz2',
      md5: '2d0642041f09e2949ccb7c5f826642cf',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q3-update/+download/gcc-arm-none-eabi-4_7-2013q3-20130916-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/151487636/gcc-arm-none-eabi-4_7-2013q3-20130916-linux.tar.bz2',
      md5: 'c35b662e371f369619cf202692a4d10b',
    },
  },
  '4.7-2013-q2': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q2-update/+download/gcc-arm-none-eabi-4_7-2013q2-20130614-win32.zip
      url: 'https://launchpadlibrarian.net/143626040/gcc-arm-none-eabi-4_7-2013q2-20130614-win32.zip',
      md5: '7e9e17ebeb2fc3d4117ff9f537f42852',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q2-update/+download/gcc-arm-none-eabi-4_7-2013q2-20130614-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/143625835/gcc-arm-none-eabi-4_7-2013q2-20130614-mac.tar.bz2',
      md5: '11c77b8eec68d4e90e7a300c0d506deb',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q2-update/+download/gcc-arm-none-eabi-4_7-2013q2-20130614-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/143625888/gcc-arm-none-eabi-4_7-2013q2-20130614-linux.tar.bz2',
      md5: 'b842a77113622246c7db615b99a616ef',
    },
  },
  '4.7-2013-q1': {
    win32: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q1-update/+download/gcc-arm-none-eabi-4_7-2013q1-20130313-win32.zip
      url: 'https://launchpadlibrarian.net/135590595/gcc-arm-none-eabi-4_7-2013q1-20130313-win32.zip',
      md5: 'eb0cf714f1bafb42bd0b22c8b6128ce0',
    },
    mac_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q1-update/+download/gcc-arm-none-eabi-4_7-2013q1-20130313-mac.tar.bz2
      url: 'https://launchpadlibrarian.net/135590305/gcc-arm-none-eabi-4_7-2013q1-20130313-mac.tar.bz2',
      md5: '017aebb1e47dd772bd535741c68df5de',
    },
    linux_x86_64: {
      // redirect from https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q1-update/+download/gcc-arm-none-eabi-4_7-2013q1-20130313-linux.tar.bz2
      url: 'https://launchpadlibrarian.net/135590399/gcc-arm-none-eabi-4_7-2013q1-20130313-linux.tar.bz2',
      md5: 'bcf845e5cd0608a0d56825d8763cba77',
    },
  },
};

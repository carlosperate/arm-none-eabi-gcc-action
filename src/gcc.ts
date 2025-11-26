/* eslint-disable @typescript-eslint/naming-convention */

import * as core from '@actions/core';
import semverValid from 'semver/functions/valid';

interface UrlData {
  url: string;
  md5: string | null;
  sha256: string | null;
}

const versions: {[gccRelease: string]: {[platform: string]: UrlData}} = {
  '14.3.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-mingw-w64-x86_64-arm-none-eabi.zip',
      md5: null,
      sha256: '864c0c8815857d68a1bbba2e5e2782255bb922845c71c97636004a3d74f60986',
    },
    mac_arm64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '30f4d08b219190a37cded6aa796f4549504902c53cfc3c7e044a8490b6eba1f7',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '8f6903f8ceb084d9227b9ef991490413014d991874a1e34074443c2a72b14dbd',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.3.rel1/binrel/arm-gnu-toolchain-14.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '2d465847eb1d05f876270494f51034de9ace9abe87a4222d079f3360240184d3',
    },
  },
  '14.2.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-mingw-w64-x86_64-arm-none-eabi.zip',
      md5: null,
      sha256: 'f074615953f76036e9a51b87f6577fdb4ed8e77d3322a6f68214e92e7859888f',
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '2d9e717dd4f7751d18936ae1365d25916534105ebcb7583039eff1092b824505',
    },
    mac_arm64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: 'c7c78ffab9bebfce91d99d3c24da6bf4b81c01e16cf551eb2ff9f25b9e0a3818',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '62a63b981fe391a9cbad7ef51b17e49aeaa3e7b0d029b36ca1e9c3b2a9b78823',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/14.2.rel1/binrel/arm-gnu-toolchain-14.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '87330bab085dd8749d4ed0ad633674b9dc48b237b61069e3b481abd364d0a684',
    },
  },
  '13.3.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: null,
      sha256: 'e46fda043c0ce83582bc8db4b3ef85f77f4beb7333344c2f4193c17e1167a095',
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '1ab00742d1ed0926e6f227df39d767f8efab46f5250505c29cb81f548222d794',
    },
    mac_arm64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: 'fb6921db95d345dc7e5e487dd43b745e3a5b4d5c0c7ca4f707347148760317b4',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '95c011cee430e64dd6087c75c800f04b9c49832cc1000127a92a97f9c8d83af4',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.3.rel1/binrel/arm-gnu-toolchain-13.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: 'c8824bffd057afce2259f7618254e840715f33523a3d4e4294f471208f976764',
    },
  },
  '13.2.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: null,
      sha256: '51d933f00578aa28016c5e3c84f94403274ea7915539f8e56c13e2196437d18f',
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '075faa4f3e8eb45e59144858202351a28706f54a6ec17eedd88c9fb9412372cc',
    },
    mac_arm64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '39c44f8af42695b7b871df42e346c09fee670ea8dfc11f17083e296ea2b0d279',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '6cd1bbc1d9ae57312bcd169ae283153a9572bd6a8e4eeae2fedfbc33b115fdbb',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/13.2.rel1/binrel/arm-gnu-toolchain-13.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '8fd8b4a0a8d44ab2e195ccfbeef42223dfb3ede29d80f14dcf2183c34b8d199a',
    },
  },
  '12.3.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: null,
      sha256: 'd52888bf59c5262ebf3e6b19b9f9e6270ecb60fd218cf81a4e793946e805a654',
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: 'e6ed8bf930fad9ce33e120ab90b36957b1f779fccaa6de6c9ca9a58982c04291',
    },
    mac_arm64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '3b2eee0bdf71c1bbeb3c3b7424fbf7bd9d5c3f0f5a3a4a78159c9e3ad219e7bd',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '12a2815644318ebcceaf84beabb665d0924b6e79e21048452c5331a56332b309',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.3.rel1/binrel/arm-gnu-toolchain-12.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '14c0487d5753f6071d24e568881f7c7e67f80dd83165dec5164b3731394af431',
    },
  },
  '12.2.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-mingw-w64-i686-arm-none-eabi.zip',
      md5: null,
      sha256: 'ad1427496cde9bbe7604bc448ec6e115c6538e04af1c8275795ebb1c2b7b2830',
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '00c0eeb57ae92332f216151ac66df6ba17d2d3b306dac86f4006006f437b2902',
    },
    mac_arm64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-darwin-arm64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '21a9e875250bcb0db8df4cb23dd43c94c00a1d3b98ecba9cdd6ed51586b12248',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '84be93d0f9e96a15addd490b6e237f588c641c8afdf90e7610a628007fc96867',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/12.2.rel1/binrel/arm-gnu-toolchain-12.2.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '7ee332f7558a984e239e768a13aed86c6c3ac85c90b91d27f4ed38d7ec6b3e8c',
    },
  },
  '11.3.Rel1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-mingw-w64-i686-arm-none-eabi.zip',
      // Arm's published MD5 seems incorrect: f1ff0b48304dbc4ff558f0753a3a8860
      // https://community.arm.com/support-forums/f/compilers-and-libraries-forum/53343/arm-gnu-toolchain-11-3-rel1-windows-arm-none-eabi-md5-is-incorrect
      md5: 'b287cf60045910dd56c56cdc2a490049',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '826353d45e7fbaa9b87c514e7c758a82f349cb7fc3fd949423687671539b29cf',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: 'd420d87f68615d9163b99bbb62fe69e85132dc0a8cd69fca04e813597fe06121',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.3.rel1/binrel/arm-gnu-toolchain-11.3.rel1-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '6c713c11d018dcecc16161f822517484a13af151480bbb722badd732412eb55e',
    },
  },
  '11.2-2022.02': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-mingw-w64-i686-arm-none-eabi.zip',
      md5: null,
      sha256: '585156432d73c9c2c8b4742e342564a75d47886d90ac821f88d2b564c33e6766',
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-darwin-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '31d6d3b400db89e204ab1a7ff3f4bb6230d2cdf5a551514ae9deedeebbb07bac',
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-x86_64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: '8c5acd5ae567c0100245b0556941c237369f210bceb196edfe5a2e7532c60326',
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu/11.2-2022.02/binrel/gcc-arm-11.2-2022.02-aarch64-arm-none-eabi.tar.xz',
      md5: null,
      sha256: 'ef1d82e5894e3908cb7ed49c5485b5b95deefa32872f79c2b5f6f5447cabf55f',
    },
  },
  '10.3-2021.10': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-win32.zip',
      md5: '2bc8f0c4c4659f8259c8176223eeafc1',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-mac.tar.bz2',
      md5: '7f2a7b7b23797302a9d6182c6e482449',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-x86_64-linux.tar.bz2',
      md5: '2383e4eb4ea23f248d33adc70dc3227e',
      sha256: null,
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.10/gcc-arm-none-eabi-10.3-2021.10-aarch64-linux.tar.bz2',
      md5: '3fe3d8bb693bd0a6e4615b6569443d0d',
      sha256: null,
    },
  },
  '10.3-2021.07': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-win32.zip',
      md5: 'fca12668002f8c52cfa174400fd2d03e',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-mac-10.14.6.tar.bz2',
      md5: '42d5f143cdc303d73a3602fa5052c790',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-x86_64-linux.tar.bz2',
      md5: 'b56ae639d9183c340f065ae114a30202',
      sha256: null,
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10.3-2021.07/gcc-arm-none-eabi-10.3-2021.07-aarch64-linux.tar.bz2',
      md5: 'c20b0535d01f8d4418341d893c62a782',
      sha256: null,
    },
  },
  '10-2020-q4': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-win32.zip',
      md5: '5ee6542a2af847934177bc8fa1294c0d',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-mac.tar.bz2',
      md5: 'e588d21be5a0cc9caa60938d2422b058',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-x86_64-linux.tar.bz2',
      md5: '8312c4c91799885f222f663fc81f9a31',
      sha256: null,
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/10-2020q4/gcc-arm-none-eabi-10-2020-q4-major-aarch64-linux.tar.bz2',
      md5: '1c3b8944c026d50362eef1f01f329a8e',
      sha256: null,
    },
  },
  '9-2020-q2': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-win32.zip',
      md5: '184b3397414485f224e7ba950989aab6',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-mac.tar.bz2',
      md5: '75a171beac35453fd2f0f48b3cb239c3',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-x86_64-linux.tar.bz2',
      md5: '2b9eeccc33470f9d3cda26983b9d2dc6',
      sha256: null,
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2020q2/gcc-arm-none-eabi-9-2020-q2-update-aarch64-linux.tar.bz2',
      md5: '000b0888cbe7b171e2225b29be1c327c',
      sha256: null,
    },
  },
  '9-2019-q4': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-win32.zip',
      md5: '82525522fefbde0b7811263ee8172b10',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-mac.tar.bz2',
      md5: '241b64f0578db2cf146034fc5bcee3d4',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2',
      md5: 'fe0029de4f4ec43cf7008944e34ff8cc',
      sha256: null,
    },
    linux_aarch64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/9-2019q4/gcc-arm-none-eabi-9-2019-q4-major-aarch64-linux.tar.bz2',
      md5: '0dfa059aae18fcf7d842e30c525076a4',
      sha256: null,
    },
  },
  '8-2019-q3': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-win32.zip',
      md5: '5fa382a547abe0b0d5c0a6e9eaa75c7b',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-mac.tar.bz2',
      md5: '405cfbe54cee25a1b925ad0657f73924',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2019q3/RC1.1/gcc-arm-none-eabi-8-2019-q3-update-linux.tar.bz2',
      md5: '6341f11972dac8de185646d0fbd73bfc',
      sha256: null,
    },
  },
  '8-2018-q4': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-win32.zip',
      md5: '9b1cfb7539af11b0badfaa960679ea6f',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-mac.tar.bz2',
      md5: '4c0d86df0244df22bc783f83df886db9',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/8-2018q4/gcc-arm-none-eabi-8-2018-q4-major-linux.tar.bz2',
      md5: 'f55f90d483ddb3bcf4dae5882c2094cd',
      sha256: null,
    },
  },
  '7-2018-q2': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-win32.zip',
      md5: 'bc8ae26d7c429f30d583a605a4bcf9bc',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-mac.tar.bz2',
      md5: 'a66be9828cf3c57d7d21178e07cd8904',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2018q2/gcc-arm-none-eabi-7-2018-q2-update-linux.tar.bz2',
      md5: '299ebd3f1c2c90930d28ab82e5d8d6c0',
      sha256: null,
    },
  },
  '7-2017-q4': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-win32.zip',
      md5: '168c68c41ee0986ecc1dadceaa8b6a3f',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-mac.tar.bz2',
      md5: '1ec5bed45d78788723036f22c4e83ba8',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2',
      md5: 'd3b00ae09e847747ef11316a8b04989a',
      sha256: null,
    },
  },
  '6-2017-q2': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-win32.zip',
      md5: 'df6c2f763a6114c951e3f1e509af3cbc',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-mac.tar.bz2',
      md5: 'd536d7fb167c04b24f7f0d40cd739cac',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2017q2/gcc-arm-none-eabi-6-2017-q2-update-linux.tar.bz2',
      md5: '13747255194398ee08b3ba42e40e9465',
      sha256: null,
    },
  },
  '6-2017-q1': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-win32-zip.zip',
      md5: 'ec8b98945d4faf0c28a05bcdc1c2e537', // This MD5 was calculated by me instead of coming from Arm
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-mac.tar.bz2',
      md5: '709c86af4c92d17bd5fb9dcfe00ffd6d', // This MD5 was calculated by me instead of coming from Arm
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6_1-2017q1/gcc-arm-none-eabi-6-2017-q1-update-linux.tar.bz2',
      md5: '30004c24f4632bc594952462bb0cd1c9', // This MD5 was calculated by me instead of coming from Arm
      sha256: null,
    },
  },
  '6-2016-q4': {
    win32: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-win32-zip.zip',
      md5: '6aa8f5795abf176190b9eef9a9f34ef1', // This MD5 was calculated by me instead of coming from Arm
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-mac.tar.bz2',
      md5: 'dff94a68a97ba8526a825254c336d660', // This MD5 was calculated by me instead of coming from Arm
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://developer.arm.com/-/media/Files/downloads/gnu-rm/6-2016q4/gcc-arm-none-eabi-6_2-2016q4-20161216-linux.tar.bz2',
      md5: '8986a0d41a8e4c92e8a64487d8b0eac7', // This MD5 was calculated by me instead of coming from Arm
      sha256: null,
    },
  },
  '5-2016-q3': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-win32.zip',
      md5: 'dd46badbea382c884dd7079dcc5b4e0d',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-mac.tar.bz2',
      md5: '968ef87c0c03372aa933bab31d6789af',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-linux.tar.bz2',
      md5: 'f7004b904541c09a8a0a7a52883c9e5b',
      sha256: null,
    },
  },
  '5-2016-q2': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q2-update/+download/gcc-arm-none-eabi-5_4-2016q2-20160622-win32.zip',
      md5: '3f3ba8772ccf9bccdb3f897cc5569aaa',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q2-update/+download/gcc-arm-none-eabi-5_4-2016q2-20160622-mac.tar.bz2',
      md5: 'bb2c7501a2d6a6e517267197f4c069e6',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q2-update/+download/gcc-arm-none-eabi-5_4-2016q2-20160622-linux.tar.bz2',
      md5: '47b26ff8e4eb2c91af615dd73ada0c50',
      sha256: null,
    },
  },
  '5-2016-q1': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q1-update/+download/gcc-arm-none-eabi-5_3-2016q1-20160330-win32.zip',
      md5: '1ea9a1b83666a5a363018fba8a088879',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q1-update/+download/gcc-arm-none-eabi-5_3-2016q1-20160330-mac.tar.bz2',
      md5: 'aa60d23587dc7456c79a7e39acdafe0b',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q1-update/+download/gcc-arm-none-eabi-5_3-2016q1-20160330-linux.tar.bz2',
      md5: '5a261cac18c62d8b7e8c70beba2004bd',
      sha256: null,
    },
  },
  '5-2015-q4': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2015-q4-major/+download/gcc-arm-none-eabi-5_2-2015q4-20151219-win32.zip',
      md5: '5b513d3453ecd5e2034eeb951a79607f',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2015-q4-major/+download/gcc-arm-none-eabi-5_2-2015q4-20151219-mac.tar.bz2',
      md5: '603bcce8e59683ac27054b3197a53254',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/5.0/5-2015-q4-major/+download/gcc-arm-none-eabi-5_2-2015q4-20151219-linux.tar.bz2',
      md5: 'f88caac80b4444a17344f57ccb760b90',
      sha256: null,
    },
  },
  '4.9-2015-q3': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-win32.zip',
      md5: 'd944be40a5bdb2327d80db23290c6b9d',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-mac.tar.bz2',
      md5: '7886163ba5a1c17b560939e3dcf1382b',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar.bz2',
      md5: '8a4a74872830f80c788c944877d3ad8c',
      sha256: null,
    },
  },
  '4.9-2015-q2': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q2-update/+download/gcc-arm-none-eabi-4_9-2015q2-20150609-win32.zip',
      md5: '2e5812e1a7786adeb8461f17b2a6e6dc',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q2-update/+download/gcc-arm-none-eabi-4_9-2015q2-20150609-mac.tar.bz2',
      md5: '34904f10367d622c139c782063212cd9',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q2-update/+download/gcc-arm-none-eabi-4_9-2015q2-20150609-linux.tar.bz2',
      md5: '6d5e1ae27607bab87bd324c9be2df17a',
      sha256: null,
    },
  },
  '4.9-2015-q1': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q1-update/+download/gcc-arm-none-eabi-4_9-2015q1-20150306-win32.zip',
      md5: 'ef2df916f1ea4c5cc1022fa9aaf338a1',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q1-update/+download/gcc-arm-none-eabi-4_9-2015q1-20150306-mac.tar.bz2',
      md5: 'e3d92e5eaac7f9b0c20bf69822a434dd',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q1-update/+download/gcc-arm-none-eabi-4_9-2015q1-20150306-linux.tar.bz2',
      md5: '68f5928cdfb990691ea53246c56f6720',
      sha256: null,
    },
  },
  '4.9-2014-q4': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2014-q4-major/+download/gcc-arm-none-eabi-4_9-2014q4-20141203-win32.zip',
      md5: 'fe043db84c6c6ff423496f5e3ebd33e4',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2014-q4-major/+download/gcc-arm-none-eabi-4_9-2014q4-20141203-mac.tar.bz2',
      md5: 'a3b0ab5bd08ba5ad840b7cb5f17becb0',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.9/4.9-2014-q4-major/+download/gcc-arm-none-eabi-4_9-2014q4-20141203-linux.tar.bz2',
      md5: '74cc4f012699c171089e72832d95bf4c',
      sha256: null,
    },
  },
  '4.8-2014-q3': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-win32.zip',
      md5: '4b07ff1ce5a38d394a6c13bf9ac07810',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-mac.tar.bz2',
      md5: '1ca44d778fc3b4799d76c98345ed7826',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q3-update/+download/gcc-arm-none-eabi-4_8-2014q3-20140805-linux.tar.bz2',
      md5: 'acc8c8ff45f8801e2155934214309a87',
      sha256: null,
    },
  },
  '4.8-2014-q2': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q2-update/+download/gcc-arm-none-eabi-4_8-2014q2-20140609-win32.zip',
      md5: 'd6e29ea8b587f871ec308214703383bf',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q2-update/+download/gcc-arm-none-eabi-4_8-2014q2-20140609-mac.tar.bz2',
      md5: '4a05e26d9eb30f43752667a34001e755',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q2-update/+download/gcc-arm-none-eabi-4_8-2014q2-20140609-linux.tar.bz2',
      md5: '0f80c6d2684c8e2bece37a2de4e8963b',
      sha256: null,
    },
  },
  '4.8-2014-q1': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q1-update/+download/gcc-arm-none-eabi-4_8-2014q1-20140314-win32.zip',
      md5: '09c19b3248863074f5498a88f31bee16',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q1-update/+download/gcc-arm-none-eabi-4_8-2014q1-20140314-mac.tar.bz2',
      md5: '5d34d95a53ba545f1585b9136cbb6805',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2014-q1-update/+download/gcc-arm-none-eabi-4_8-2014q1-20140314-linux.tar.bz2',
      md5: '72b0d06ae16b303c25fd70b2883d3950',
      sha256: null,
    },
  },
  '4.7-2014-q2': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2014-q2-update/+download/gcc-arm-none-eabi-4_7-2014q2-20140408-win32.zip',
      md5: '4bdec324a4f3f36d54f084f890aabb2a',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2014-q2-update/+download/gcc-arm-none-eabi-4_7-2014q2-20140408-mac.tar.bz2',
      md5: '911649c1756d9501e90de0be120d1696',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2014-q2-update/+download/gcc-arm-none-eabi-4_7-2014q2-20140408-linux.tar.bz2',
      md5: '239a1a180e10dc40aff870e1e7b650f9',
      sha256: null,
    },
  },
  '4.8-2013-q4': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131204-win32.zip',
      md5: 'ca47c682f9b3bd14d0a6ce1f175716fa',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131218-mac.tar.bz2',
      md5: '850caa23f01ea8c1e6abcc3c217d36f7',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.8/4.8-2013-q4-major/+download/gcc-arm-none-eabi-4_8-2013q4-20131204-linux.tar.bz2',
      md5: '4869e6a6e1dc11ea0835e8b8213bb194',
      sha256: null,
    },
  },
  '4.7-2013-q3': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q3-update/+download/gcc-arm-none-eabi-4_7-2013q3-20130916-win32.zip',
      md5: 'bf5ed93bc5f8fbb7caf4ff1689c14ab7',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q3-update/+download/gcc-arm-none-eabi-4_7-2013q3-20130916-mac.tar.bz2',
      md5: '2d0642041f09e2949ccb7c5f826642cf',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q3-update/+download/gcc-arm-none-eabi-4_7-2013q3-20130916-linux.tar.bz2',
      md5: 'c35b662e371f369619cf202692a4d10b',
      sha256: null,
    },
  },
  '4.7-2013-q2': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q2-update/+download/gcc-arm-none-eabi-4_7-2013q2-20130614-win32.zip',
      md5: '7e9e17ebeb2fc3d4117ff9f537f42852',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q2-update/+download/gcc-arm-none-eabi-4_7-2013q2-20130614-mac.tar.bz2',
      md5: '11c77b8eec68d4e90e7a300c0d506deb',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q2-update/+download/gcc-arm-none-eabi-4_7-2013q2-20130614-linux.tar.bz2',
      md5: 'b842a77113622246c7db615b99a616ef',
      sha256: null,
    },
  },
  '4.7-2013-q1': {
    win32: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q1-update/+download/gcc-arm-none-eabi-4_7-2013q1-20130313-win32.zip',
      md5: 'eb0cf714f1bafb42bd0b22c8b6128ce0',
      sha256: null,
    },
    mac_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q1-update/+download/gcc-arm-none-eabi-4_7-2013q1-20130313-mac.tar.bz2',
      md5: '017aebb1e47dd772bd535741c68df5de',
      sha256: null,
    },
    linux_x86_64: {
      url:
        'https://launchpad.net/gcc-arm-embedded/4.7/4.7-2013-q1-update/+download/gcc-arm-none-eabi-4_7-2013q1-20130313-linux.tar.bz2',
      md5: 'bcf845e5cd0608a0d56825d8763cba77',
      sha256: null,
    },
  },
};

export function availableVersions(): string[] {
  return Object.keys(versions);
}

export function latestGccVersion(): string {
  // Since ES6 (from node v8.x) JS objects are ordered
  return Object.keys(versions)[0];
}

export function distributionUrl(version: string, platform: string, arch: string): UrlData {
  // Convert the node platform value to the versions URL keys
  let osName = '';
  switch (platform) {
    case 'darwin':
      if (arch === 'arm64') {
        if (versions[version].hasOwnProperty('mac_arm64')) {
          osName = 'mac_arm64';
        } else {
          // If the GCC version does not have an arm64 release,
          // use the x86_64 version as rosetta will be able to run it
          osName = 'mac_x86_64';
          core.warning(`No mac arm64 version found for GCC ${version}, using x86_64 version instead`);
        }
      } else {
        osName = 'mac_x86_64';
      }
      break;
    case 'linux':
      if (arch === 'arm64') {
        osName = 'linux_aarch64';
      } else {
        osName = 'linux_x86_64';
      }
      break;
    case 'win32':
      osName = 'win32';
      break;
    default:
      throw new Error(`platform ${platform} is not supported`);
  }
  if (!versions.hasOwnProperty(version)) {
    throw new Error(`invalid GCC version ${version}. Available: ${availableVersions()}`);
  }
  if (!versions[version].hasOwnProperty(osName)) {
    throw new Error(
      `invalid platform ${osName} for GCC version ${version}.\n` +
        'The action README has the list of available versions and platforms.'
    );
  }
  return versions[version][osName];
}

export function gccVersionToSemver(gccVersion: string): string {
  // This conversion is very specific to the current version format, but it
  // works with all the current versions. Tests have been added to check all
  // existing versions, but it will need updating if the format changes
  let gccVerStrArray = gccVersion.split('-');
  gccVerStrArray = gccVerStrArray.map(item => {
    // Convert qn -> n, i.e. q4 -> 4
    if (item.startsWith('q') && item.length > 1) {
      return item.substring(1);
    }
    // Convert yyyy.mm -> yyyymm, i.e. 2021.10 -> 202110
    else if (/^\d{4}\.\d{2}$/.test(item)) {
      return item.substr(0, 4) + item.substr(5);
    }
    // Everything else will be dealt later with the filtering
    else {
      return item;
    }
  });
  gccVerStrArray = gccVerStrArray.join('.').split('.');

  gccVerStrArray = gccVerStrArray.map(item => {
    // Convert Reln -> n, i.e. Rel1 -> 1
    if (item.startsWith('Rel') && item.length > 3) {
      return item.substring(3);
    } else {
      return item; // Everything else goes through
    }
  });

  // Remove any entry that cannot be cleanly converted to  number
  gccVerStrArray = gccVerStrArray.filter(item => Number(item));
  const gccVerIntArray = gccVerStrArray.map(item => Number(item));

  // If the end result is less than 3 entries something unexpected happened
  if (gccVerIntArray.length < 3) {
    throw new Error(`The GCC version did not result in 3 version parts: ${gccVerIntArray}`);
  }
  // If it has more than 3 entries we join any extras to the third
  else if (gccVerIntArray.length > 3) {
    gccVerIntArray[2] = parseInt(gccVerIntArray.slice(2).join(''));
  }
  const gccSemver = gccVerIntArray.slice(0, 3).join('.');

  if (!semverValid(gccSemver)) {
    throw new Error(`Could not convert the GCC version to a valid Semver: ${gccSemver}`);
  }

  return gccSemver;
}

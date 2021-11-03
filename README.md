# GitHub Action: GNU Arm Embedded Toolchain <br> (arm-none-eabi-gcc)

[![CI](https://github.com/carlosperate/arm-none-eabi-gcc-action/actions/workflows/test.yml/badge.svg)](https://github.com/carlosperate/arm-none-eabi-gcc-action/actions/workflows/test.yml)

This GitHub Action (compatible with all platforms) downloads, checks, sets up,
and caches `arm-none-eabi-gcc`.


## Usage

Simplest way to use this action is with the default options, which uses the
the latest `arm-none-eabi-gcc` release:

```yaml
steps:
- name: Install GNU Arm Embedded Toolchain (arm-none-eabi-gcc)
  uses: carlosperate/arm-none-eabi-gcc-action@v1
- run: arm-none-eabi-gcc --version
```

You can also specify a version (there is a list in the
[Available releases](#available-releases) section):

```yaml
steps:
- uses: carlosperate/arm-none-eabi-gcc-action@v1
  with:
    release: '10.3-2021.10' # <-- The compiler release to use
```

And/or use a "job matrix" to build your project with different versions of GCC:

```yaml
jobs:
  build:
    strategy:
      matrix:
        gcc: ['7-2017-q4', 'latest']
    steps:
      - uses: carlosperate/arm-none-eabi-gcc-action@v1
        with:
          release: ${{ matrix.gcc }}
      - run: arm-none-eabi-gcc --version
```


## Advantages over other options

- 🚀 Updated with the latest GCC releases from Arm
- 📅 Adds `latest` option to be able to always run tests with the latest compiler release
- ⚙️ Inputs are optional for simpler configuration
- ✅ Downloads are MD5 checked
- 🏎 CI caching added for faster runs (reduced time from 30s-2min to 5ish seconds)
- ⬇️ File downloads are more stable (no random failures)
- 🐞 Issue tracker is enabled
- 🧑‍💻 Actively maintained


## Available releases

- `latest` <-- Always points to the latest release
- `10.3-2021.10` &nbsp;`10.3-2021.07` &nbsp;`10-2020-q4`
- `9-2020-q2` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `9-2019-q4`
- `8-2019-q3` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `8-2018-q4`
- `7-2018-q2` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `7-2017-q4`
- `6-2017-q2` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `6-2017-q1` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `6-2016-q4`
- `5-2016-q3` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `5-2016-q2` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `5-2016-q1` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `5-2015-q4`
- `4.9-2015-q3` &nbsp;&nbsp; `4.9-2015-q2` &nbsp; `4.9-2015-q1` &nbsp; `4.9-2014-q4`
- `4.8-2014-q3` &nbsp;&nbsp; `4.8-2014-q2` &nbsp; `4.8-2014-q1` &nbsp; `4.8-2013-q4`
- `4.7-2014-q2` &nbsp;&nbsp; `4.7-2013-q3` &nbsp; `4.7-2013-q2` &nbsp; `4.7-2013-q1` &nbsp; `4.7-2012-q4`


## Changelog

The changes can be found in the [CHANGELOG.md](https://github.com/carlosperate/arm-none-eabi-gcc-action/blob/main/CHANGELOG.md)
file, or the [GitHub Releases](https://github.com/carlosperate/arm-none-eabi-gcc-action/releases) notes.


## License & Attribution

[MIT License](LICENSE).

This project is a fork of [fiam/arm-none-eabi-gcc](https://github.com/fiam/arm-none-eabi-gcc),
copyright [@fiam](https://github.com/fiam) (thanks for the awesome work
Alberto! without it this fork would have never existed). The extensive list of
changes can be seen
[here](https://github.com/carlosperate/arm-none-eabi-gcc-action/compare/4cecd3f99905c1c296edf75f570b9e68993be22f...main).

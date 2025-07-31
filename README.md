# GitHub Action: Arm GNU Toolchain <br> (aarch64-none-elf-gcc)

[![CI](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/actions/workflows/test.yml/badge.svg)](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/actions/workflows/test.yml) [![CI](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/actions/workflows/test-all-releases.yml/badge.svg)](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/actions/workflows/test-all-releases.yml) [![CI](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/actions/workflows/check-urls.yml/badge.svg)](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/actions/workflows/check-urls.yml)

GitHub Action (compatible with Linux x86_64 and aarch64, macOS x86_64
and arm64, and Windows x86_64 platforms) to download, check, set up,
and cache the `aarch64-none-elf-gcc` compiler toolchain.


## Usage

Simplest way to use this action is with the default options, which uses the
the latest `aarch64-none-elf-gcc` release:

```yaml
steps:
- uses: lawkai-vivo/aarch64-none-elf-gcc-action@v1
- run: aarch64-none-elf-gcc --version
```

You can also specify a version (a list can be found in the
[Available releases](#available-releases) section):

```yaml
steps:
- name: Install Arm GNU Toolchain (aarch64-none-elf-gcc)
  uses: lawkai-vivo/aarch64-none-elf-gcc-action@v1
  with:
    release: '14.2.Rel1' # <-- The compiler release to use
```

More information can be found in the [Advanced Options](#advanced-options)
section.


## Advantages over other options

- 🚀 Up-to-date with the latest GCC releases from Arm
- 🏎 Toolchain is cached for faster runs (reduced time from 30s-2min to 5ish seconds)
- 📅 Adds `latest` option to be able to always run tests with the latest compiler release
- ⚙️ Inputs are optional for simpler configuration
- ↗️ Toolchain path can be exported as an environmental variable and/or step output
- ✅ Downloads are MD5 checked
- ⬇️ File downloads are more stable (no random failures)
- 🐞 Issue tracker is enabled
- 🧑‍💻 Actively maintained


## Available releases

- `latest` <-- Always points to the latest release
- `14.3.Rel1` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `14.2.Rel1`
- `13.3.Rel1` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `13.2.Rel1`
- `12.3.Rel1` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `12.2.Rel1`

Older GCC version might not have releases for all operating system
architectures, specifically `arm64`.
This table shows the first release compatible with each OS architecture.

|         | x86_64       | arm64                  |
|---------|--------------|------------------------|
| Linux   | All versions | From version 9-2019-q4 |
| macOS   | All versions | From version 12.2.Rel1 |
| Windows | All versions | Not supported          |

## Advanced options

You can use a "job matrix" to build/test your project with multiple versions
of GCC:

```yaml
jobs:
  build:
    strategy:
      matrix:
        gcc: ['14.2.Rel1', 'latest']
    steps:
      - name: Install GNU Arm64 Embedded Toolchain - ${{ matrix.gcc }}
        uses: lawkai-vivo/aarch64-none-elf-gcc-action@v1
        with:
          release: ${{ matrix.gcc }}
      - run: aarch64-none-elf-gcc --version
```

If you need to pass the GCC path to a different action or step the `path`
output exports it:

```yaml
- name: To access a step output, you need to provide an `id`
  uses: lawkai-vivo/aarch64-none-elf-gcc-action@v1
  id: aarch64-none-elf-gcc-action
- name: The `path` to the toolchain executables can then be obtained as an output
  run: echo "The output path is ${{ steps.aarch64-none-elf-gcc-action.outputs.path }}"
```

The path can also be added to an environmental variable if it's specified as
an input:

```yaml
- name: To create an environmental variable with the toolchain path provide a name via the `path-env-var` input
  uses: lawkai-vivo/aarch64-none-elf-gcc-action@v1
  with:
    path-env-var: AARCH64_NONE_ELF_GCC_PATH
- name: The path will be exported to that environmental variable name
  run: echo "The output path is $AARCH64_NONE_ELF_GCC_PATH"
```


## Changelog

The changes can be found in the [CHANGELOG.md](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/blob/main/CHANGELOG.md)
file, or the [GitHub Releases](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/releases) notes.


## License & Attribution

[MIT License](LICENSE).

This project is a fork of [carlosperate/arm-none-eabi-gcc-action](https://github.com/carlosperate/arm-none-eabi-gcc-action),
copyright [@carlosperate](https://github.com/carlosperate) (thanks for the awesome work! without it this fork would have never existed).
The extensive list of changes can be seen
[here](https://github.com/lawkai-vivo/aarch64-none-elf-gcc-action/compare/a532c97fbfff58385beb2247ae1464dc4cc71724...main).

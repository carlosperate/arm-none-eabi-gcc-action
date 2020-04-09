# arm-none-eabi-gcc

<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="action status" src="https://github.com/fiam/arm-none-eabi-gcc/workflows/CI/badge.svg"></a>
</p>

This action downloads and sets up arm-none-eabi-gcc, adding it to the PATH. It
works on Windows, Linux and macOS.

## Usage

```yaml
steps:
- name: arm-none-eabi-gcc
- uses: fiam/arm-none-eabi-gcc@v1
  with:
    release: '9-2019-q4' # The arm-none-eabi-gcc release to use.
- run: ...
```

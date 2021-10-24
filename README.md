# GitHub Action: GNU Arm Embedded Toolchain <br> (arm-none-eabi-gcc)

[![CI](https://github.com/carlosperate/arm-none-eabi-gcc-action/actions/workflows/test.yml/badge.svg)](https://github.com/carlosperate/arm-none-eabi-gcc-action/actions/workflows/test.yml)

This GiiHub Action (for all Operating Systems) downloads, checks and sets up
`arm-none-eabi-gcc`, adding it to the PATH.


## Usage

```yaml
steps:
- name: Install GNU Arm Embedded Toolchain (arm-none-eabi-gcc)
  uses: carlosperate/arm-none-eabi-gcc-action@v1
  with:
    release: '10.3-2021.10' # The arm-none-eabi-gcc release to use.
- run: ...
```


## Advantages over other options

- [x] Updated with the latest GCC releases from Arm
- [x] Adds a `latest` option to always compile with the latest compiler release
- [x] Downloaded files are MD5 checked
- [ ] CI caching added for faster runs
- [x] File downloads are more stable (no random failures)
- [x] Issue tracker is enabled
- [x] Actively maintained


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


## License & Attribution

[MIT License](LICENSE).

This project is a fork of [fiam/arm-none-eabi-gcc](https://github.com/fiam/arm-none-eabi-gcc),
copyright [@fiam](https://github.com/fiam) (thanks for the awesome work Alberto!
without it this fork would have never existed). List of changes can be seen
[here](https://github.com/carlosperate/arm-none-eabi-gcc-action/compare/4cecd3f99905c1c296edf75f570b9e68993be22f...main).

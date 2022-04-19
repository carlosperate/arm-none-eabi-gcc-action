# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.4.0 - 2022-04-19
- Updated node dependencies with security updates

## v1.3.0 - 2021-11-08
### Added
- Compiler `bin/` directory path exported as an action output
- If a `path-env-var` input is provided, the compiler `bin/` directory path is
  exported as an environmental variable of that name

## v1.2.0 - 2021-11-03
### Added
- Caching is enabled for faster runs, time went down from usually around 30s
  to usually less than 5s.
- Some released did not provide MD5 values, so they have been manually
  calculated and added
- Improved documentation
- Improved testing

## v1.1.1 - 2021-10-25
### Fixed
- Updated `latest` tag to point to `10.3-2021.10`

## v1.1.0 - 2021-10-24
### Added
- Latest arm-none-eabi-gcc release: `10.3-2021.10`
- MD5 checks on the downloads

## v1.0.0 - 2021-10-19
Initial release.

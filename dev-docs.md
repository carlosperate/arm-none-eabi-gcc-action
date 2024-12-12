# Developer Documentation

## Update v1 tag

```
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

## Custom Runner

Remove any previously existing runner configuration:
```
./svc.sh stop
./svc.sh uninstall
rm .runner
./config.sh remove
```

Then follow the instructions from:
https://github.com/carlosperate/arm-none-eabi-gcc-action/settings/actions/runners/new?arch=arm64&os=linux

And install the service to run on start-up with:
```
./svc.sh install
```

If no runners appear in this list, you might need to reconfigure one:
https://github.com/carlosperate/arm-none-eabi-gcc-action/settings/actions/runners

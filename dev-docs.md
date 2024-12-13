# Developer Documentation

## Update v1 tag

```
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

## Self-Hosted Runner

Remove any previously existing runner configuration:
```
sudo ./svc.sh stop
sudo ./svc.sh uninstall
rm .runner
./config.sh remove
```

Then follow the instructions from:
https://github.com/carlosperate/arm-none-eabi-gcc-action/settings/actions/runners/new?arch=arm64&os=linux

With this config:
- Enter the name of the runner group to add this runner to: `<Enter>`
- Enter the name of runner: linux-arm64-runner
- Enter any additional labels (ex. label-1,label-2): self-hosted-linux-arm64
- Enter name of work folder: `<Enter>`

And install the service to run on start-up with:

```
./svc.sh install
```

If no runners appear in this list, you might need to reconfigure one:
https://github.com/carlosperate/arm-none-eabi-gcc-action/settings/actions/runners

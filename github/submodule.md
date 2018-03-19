# Submodule

__reset every submodules__
```
$ git submodule foreach git reset --hard
# or
$ git submodule foreach --recursive git reset --hard
```

__use specific branch__
```
$ cd PATH_TO_SUBMODULE
$ git fetch --all # if needed
$ git checkout SPECIFIC_BRANCH
```

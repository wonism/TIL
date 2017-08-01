# Git command alias
__Using git command__
```
# git command without parameters
$ git config --global alias.s status
# same as git status
$ git s

# git command with parameters
$ git config --global alias.nb "!f(){ git checkout -b \"$1\"; };f"
# same as git checkout -b "BRANCH_NAME"
```

__Modify .gitconfig__
```
[color]
  ...
[user]
  ...
[core]
  ...
[merge]
  ...
[push]
  ...
[filter "lfs"]
  ...
[alias]
  # add alias here
  ...
```

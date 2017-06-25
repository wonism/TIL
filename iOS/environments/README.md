# iOS environments
## Xcode CocoaPods 설치 및 사용방법
```
# Install CocoaPods in project directory
$ sudo gem install cocoapods

# Setup CocoaPods
$ pod setup

# Create podfile
$ touch podfile

# Install CocoaPods
$ pod install
```

__pod 명령어 입력 시 에러가 발생할 때__
```
...
Could not find 'cocoapods' (>= 0) among 50 total gem(s) (Gem::LoadError)
...
```
```
# remove all gems
$ gem uninstall --all
$ sudo gem uninstall --all

# install CocoaPods
$ gem install activesupport -v 4.2.6
$ gem install cocoapods

# re-open the terminal
$ pod setup
```

# Machine Learning with Python
## Install Python and Required Libraries
```
$ brew update
$ brew install pyenv

$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile

$ pyenv install 3.5.2

$ pyenv shell 3.5.2

$ brew link --overwrite python

$ pip install numpy matplotlib
```

## numpy
- 배열에 관한 편리한 메소드가 많이 있는 라이브러리
- `numpy.md` 참고

## matplotlib
- 그래프를 그려주는 라이브러리
- `examples/graph.ph` 및 `examples/image.ph` 참고
- Python이 프레임워크로 설치되지 않았다는 런타임에러가 발생하면, `~/.matplotlib` 경로에 `matplotlibrc` 파일을 생성하여 다음과 같이 작성한다.
```
backend: TkAgg
```

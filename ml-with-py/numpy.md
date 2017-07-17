# numpy
- python 인터프리터에서 실행

__배열 초기화__
```
>>> # numpy를 np라는 이름으로 가져오기
>>> import numpy as np
>>> x = np.array([1.0, 2.0, 3.0])
>>> print(x)
[1. 2. 3.]
>>> type(x)
<class 'numpy.ndarray'>
```

__배열의 연산__
```
>>> x = np.array([1.0, 2.0, 3.0])
>>> y = np.array([2.0, 4.0, 6.0])
>>> # x와 y의 원소 수가 다르면 에러가 발생한다.
>>> x + y
array([ 3.,  6.,  9.])
>>> x - y
array([-1., -2., -3.])
>>> x * y
array([  2.,   8.,  18.])
>>> x / y
array([ 0.5,  0.5,  0.5])
>>> x / 2
array([ 0.5,  1. ,  1.5])
```

__N차원 배열__
```
>>> A = np.array([[1, 2], [3, 4]])
>>> print(A)
[[1 2]
 [3 4]]
>>> A.shape
(2, 2)
>>> A.dtype
dtype('int64')
>>> B = np.array([[3, 0], [0, 6]])
>>> A + B
array([[ 4,  2],
       [ 3, 10]])
>>> A * B
array([[ 3,  0],
       [ 0, 24]])
>>> A * 10
array([[10, 20],
       [30, 40]])
```

__브로드 캐스트__
- `shape`가 다른 배열끼리 계산할 수 있다.
```
>>> A = np.array([[1, 2], [3, 4]])
>>> B = np.array([10, 20])
>>> A * 10
array([[10, 20],
       [30, 40]])
>>> A * B
array([[10, 40],
       [30, 80]])
```

__원소 접근__
```
>>> X = np.array([[51, 55], [14, 19], [0, 4]])
>>> print(X)
[[51 55]
 [14 19]
 [ 0  4]]
>>> X[0]
array([51, 55])
>>> X[0][1]
55
>>> for row in X:
...     print(row)
...
[51 55]
[14 19]
[0 4]
```

__평탄화__
```
>>> X = X.flatten()
>>> print(X)
[51 55 14 19 0 4]
>>> X[np.array([0, 2, 4])]
array([51, 14, 0])
>>> X > 15
array([ True,  True, False,  True, False, False], dtype=bool)
>>> X[X > 15]
array([51, 55, 19])
```

# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt

# 데이터 준비
x = np.arange(0, 6, 0.1)
# arange는 array range 말 그대로 array를 리턴한다.
# 여기에선 0부터 6까지 0.1 간격으로 array를 만든다.
y1 = np.sin(x)
y2 = np.cos(x)

# 그래프 그리기
plt.plot(x, y1, label="sin")
plt.plot(x, y2, label="cos", linestyle="--") # cos함수는 점선으로 그린다.
plt.xlabel("x") # x축 이름
plt.ylabel("y") # y축 이름
plt.title("sin & cos") # 제목
plt.legend() # 범례
plt.show()

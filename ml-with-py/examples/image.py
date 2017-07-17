import matplotlib.pyplot as plt
from matplotlib.image import imread

img = imread("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png")

plt.imshow(img)
plt.show()

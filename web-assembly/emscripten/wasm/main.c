#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <emscripten/emscripten.h>

int main(int argc, char** argv) {
  // console.log로 변환됨
  printf("Web Assembly loaded\n");
}

// Emscripten은 컴파일하는 동안 데드 코드를 제거하는데,
// 이 데코레이터는 코드가 제거되지 않도록 한다.
EMSCRIPTEN_KEEPALIVE
int generateRandom() {
  srand(time(NULL));
  printf("%d", rand());
  return rand();
}

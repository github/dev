#include <stdio.h>
#include <time.h>

int main(void)
{
    clock_t start_time = clock();
    while ((clock() - start_time) / CLOCKS_PER_SEC < 10)
    {
    }
    return 0;
}
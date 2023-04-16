#include "monitor.h"

typedef struct
{
    int thread_id;   /*!< The ID of the thread. */
    int num_threads; /*!< The total number of threads. */
    long int target; /*!< The target value to find. */
    long int result; /*!< The result found by the thread. */
} ThreadData;

int monitor(int fd_write, int fd_read)
{

    ThreadData thread_data;
    int ret, cero = 0, uno = 1;
    while (1)
    {

        ret = read(fd_read, &thread_data, sizeof(thread_data));

        if (ret == -1)
        {
            printf("ERROR LEYENDO\n");
            perror("read");

            exit(EXIT_FAILURE);
        }
        else if (ret == 0)
        {
            exit(EXIT_SUCCESS);
        }

        if (pow_hash(thread_data.result) == thread_data.target)
        {
            printf("Solution accepted: %08ld --> %08ld\n", thread_data.target, thread_data.result);

            ret = write(fd_write, &cero, sizeof(int));

            if (ret == -1)
            {
                printf("ERROR ESCRIBIENDO 0\n");
                perror("write");

                exit(EXIT_FAILURE);
            }
        }
        else
        {
            printf("Solution rejected: %08ld !-> %08ld\n", thread_data.target, thread_data.result);

            write(fd_write, &uno, sizeof(int));

            if (ret == -1)
            {
                printf("ERROR ESCRIBIENDO 1\n");
                perror("write");

                exit(EXIT_FAILURE);
            }
        }
    }
}
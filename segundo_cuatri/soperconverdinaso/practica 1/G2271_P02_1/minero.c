#include "minero.h"

typedef struct
{
    int thread_id;   /*!< The ID of the thread. */
    int num_threads; /*!< The total number of threads. */
    long int target; /*!< The target value to find. */
    long int result; /*!< The result found by the thread. */
} ThreadData;

int minero(int fd_write, int fd_read, long int target, int num_rounds, int num_threads)
{

    int buffer;
    int i, j, res;

    pthread_t threads[num_threads];
    ThreadData thread_data[num_threads];

    for (i = 0; i < num_rounds; i++)
    {
        for (int j = 0; j < num_threads; j++)
        {
            thread_data[j].thread_id = j;
            thread_data[j].num_threads = num_threads;
            thread_data[j].target = target;

            pthread_create(&threads[j], NULL, search_range, &thread_data[j]);
        }

        for (int j = 0; j < num_threads; j++)
        {
            pthread_join(threads[j], NULL);
        }

        int found = 0;
        for (j = 0; j < num_threads; j++)
        {
            if (thread_data[j].result != -1)
            {
                res = write(fd_write, &thread_data[j], sizeof(thread_data[j]));
                if (res == -1)
                {
                    printf("ERROR ESCRIBIENDO FD1\n");
                    perror("write");
                    exit(EXIT_FAILURE);
                }

                target = thread_data[j].result;
                found = 1;
                break;
            }
        }

        if (!found)
        {
            printf("Target not found!\n");
            exit(EXIT_FAILURE);
        }
        res = read(fd_read, &buffer, sizeof(int));

        if (res == -1)
        {
            printf("ERROR LEYENDO FD2\n");
            perror("read");
            exit(EXIT_FAILURE);
        }
        if (buffer == 1)
        {
            printf("The solution has been invalidated\n");
            exit(EXIT_FAILURE);
        }
    }
    return EXIT_SUCCESS;
}

void *search_range(void *data)
{
    ThreadData *thread_data = (ThreadData *)data;

    long int start = (long int)thread_data->thread_id * (long int)POW_LIMIT / (long int)thread_data->num_threads;
    long int end = (long int)(thread_data->thread_id + 1) * (long int)POW_LIMIT / (long int)thread_data->num_threads;

    for (long int i = start; i < end; i++)
    {
        if (pow_hash(i) == thread_data->target)
        {
            thread_data->result = i;
            return NULL;
        }
    }

    thread_data->result = -1;
    return NULL;
}
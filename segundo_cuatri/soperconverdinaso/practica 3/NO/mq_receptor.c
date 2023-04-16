#include <fcntl.h>
#include <mqueue.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <unistd.h>

#include "mq_sd_rc.h"

int main(void)
{
  Message msg;
  mqd_t queue;

  queue = mq_open(
      MQ_NAME,
      O_CREAT | O_RDONLY, /* This process is going to receive messages. */
      S_IRUSR | S_IWUSR,  /* The user can read and write. */
      &attributes);

  if (queue == (mqd_t)-1)
  {
    fprintf(stderr, "Error opening the queue\n");
    return EXIT_FAILURE;
  }

  if (mq_receive(queue, (char *)&msg, sizeof(msg), NULL) == -1)
  {
    fprintf(stderr, "Error receiving message\n");
    return EXIT_FAILURE;
  }

  printf("%d: %s\n", msg.value, msg.warning);

  /* Wait for input to end the program. */
  fprintf(stdout, "Press any key to finish\n");
  getchar();

  mq_close(queue);

  return EXIT_SUCCESS;
}

#include <fcntl.h>
#include <mqueue.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

#include "mq_sd_rc.h"

int main(void) {
  Message msg;
  mqd_t queue;

  queue = mq_open(
      MQ_NAME,
      O_CREAT | O_WRONLY, /* This process is going to send messages. */
      S_IRUSR | S_IWUSR,  /* The user can read and write. */
      &attributes);

  if (queue == (mqd_t)-1) {
    fprintf(stderr, "Error opening the queue\n");
    return EXIT_FAILURE;
  }

  msg.value = 29;
  strcpy(msg.warning, "Hi all!");

  if (mq_send(queue, (char *)&msg, sizeof(msg), 1) == -1) {
    fprintf(stderr, "Error sending message\n");
    return EXIT_FAILURE;
  }

  /* Wait for input to end the program. */
  fprintf(stdout, "Press any key to finish\n");
  getchar();

  mq_close(queue);
  mq_unlink(MQ_NAME);

  return EXIT_SUCCESS;
}

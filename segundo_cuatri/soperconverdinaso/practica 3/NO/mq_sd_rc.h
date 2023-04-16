#include <mqueue.h>

#define MQ_NAME "/mq_example"
#define N 33

typedef struct {
  int value;
  char warning[80];
} Message;

struct mq_attr attributes = {.mq_flags = 0,
                             .mq_maxmsg = 10,
                             .mq_curmsgs = 0,
                             .mq_msgsize = sizeof(Message)};

#define SHM_NAME "/shm_example"
#define INT_LIST_SIZE 10
#define MSG_MAX 100

typedef struct {
  int integer_list[INT_LIST_SIZE];
  char message[MSG_MAX];
} ShmExampleStruct;

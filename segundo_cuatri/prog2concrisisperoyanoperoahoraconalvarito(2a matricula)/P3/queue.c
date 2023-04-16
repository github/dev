#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "queue.h"


struct _Queue
{
    void *data[MAX_QUEUE];
    void **front;
    void **rear;
};

Queue *queue_new()
{
    Queue *q = (Queue *)malloc(sizeof(Queue));
    if (q == NULL)
    {
        return NULL;
    }
    q->front = q->rear = q->data;
    return q;
}

void queue_free(Queue *q)
{
    if (q == NULL)
    {
        return;
    }
    free(q);
}

Bool queue_isEmpty(const Queue *q)
{
    if (q == NULL)
    {
        return FALSE;
    }
    return q->front == q->rear;
}

Status queue_push(Queue *q, void *ele)
{
    if (q == NULL || ele == NULL)
    {
        return ERROR;
    }
    if (q->rear == q->data + MAX_QUEUE)
    {
        return ERROR;
    }
    *q->rear = ele;
    q->rear++;
    return OK;
}

void *queue_pop(Queue *q)
{
    if (q == NULL)
    {
        return NULL;
    }
    if (queue_isEmpty(q))
    {
        return NULL;
    }
    void *ele = *q->front;
    q->front++;
    return ele;
}

void *queue_getFront(const Queue *q){
    if (q == NULL){
        return NULL;
    }
    if (queue_isEmpty(q)){
        return NULL;
    }
    return *q->front;
}

void *queue_getBack(const Queue *q){
    if (q == NULL){
        return NULL;
    }
    if (queue_isEmpty(q)){
        return NULL;
    }
    return *(q->rear-1);
}

size_t queue_size(const Queue *q)
{
    if (q == NULL){
        return 0;
    }
    return q->rear - q->front;
}

int queue_print(FILE *fp, const Queue *q, p_queue_ele_print f){
    if (fp == NULL || q == NULL || f == NULL){
        return 0;
    }
    int i, n = 0;
    for (i = 0; i < queue_size(q); i++){
        n += f(fp, q->data[i]);
    }
    return n;
}
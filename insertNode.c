#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node *next;
};
struct node *head, *temp;

void insertAtBeginnig(int data)
{
   
   struct node *newNode = (struct node*) malloc(sizeof(struct node));
    
    newNode->data = data;
    if (newNode == NULL){
        printf("OVERFLOW");
        return;
    }
    else{
    newNode -> next = head;
    head = newNode;
    printf("Node inserted at beginning.\n");
    }
}


void insertAtEnd(int data)
{
   
   struct node *newNode = (struct node*) malloc(sizeof(struct node));
    
    newNode->data = data;
if (newNode == NULL){
        printf("OVERFLOW");
    }
    else
{

        if (head == NULL)
          {
            newNode->next = head;
            head = newNode;
            }

        else{

        temp = head;
        
        while(temp != NULL)
        {
            temp = temp->next;
        }
        newNode -> next = temp;
        newNode = temp;
    printf("Node inserted at the end.\n");
    }
 }
}

void insertAtRandom(int data, int count)
{

      struct node *newNode = (struct node*) malloc(sizeof(struct node));
    
    newNode->data = data;
if (newNode == NULL){
        printf("OVERFLOW");
        return;
    }
    else
{

        if (head == NULL || count == 0)
          {
            newNode->next = head;
            head = newNode;
            }

        else{

        temp = head;
        for(int i=0; i < count; i++)
        {
            
            if(temp == NULL)
            {
            printf("Node can't be inserted");
            return;
            }
            temp = temp->next;
        }
        newNode -> next = temp->next;
        temp->next = newNode;
    printf("Node inserted at position '%d'.\n", count);
    }
 }


}

int main()
{
    int choice,data,n,count;
    
    printf("Enter a number: \n");
    printf("1. Insert at beginning: \n");
    printf("2. Insert at end: \n");
    printf("3. Insert at specific position: \n");
    scanf("%d", &choice);
 if (choice == 1)
    {
        printf("Enter data: ");
        scanf("%d", &data);
        insertAtBeginnig(data);
        
    }  

    else if(choice == 2)
    {
        printf("Enter data: ");
        scanf("%d", &data);
        insertAtEnd(data);
       
    }

    else if(choice == 3)
    {
        printf("Enter data: ");
        scanf("%d", &data);
        printf("Enter position: ");
        scanf("%d", &count);
        insertAtRandom(data,count);
       
    }

    else{
        printf("Invalid input");
    }



    
return 0;
}

#include<stdio.h>  
#include<stdlib.h>  
struct node  
{  
    struct node *prev;  
    struct node *next;  
    int data;  
};  
struct node *head;  
void insertion_beginning();  
void insertion_last();  
void insertion_specified();  
void deletion_beginning();  
void deletion_last();  
void deletion_specified();  
void display();  
void search();  
void main ()  
{  
int choice =0;  
    while(choice != 9)  
    {  
        printf("\n*********Main Menu*********\n");  
        printf("\nChoose one option from the following list ...\n");  
        printf("\n===============================================\n");  
        printf("\n1.Insert in begining\n2.Insert at last\n3.Insert at any random location\n4.Delete from Beginning\n5.Delete from last\n6.Delete the node after the given data\n7.Search\n8.Show\n9.Exit\n");     
        printf("\nEnter your choice?\n");  
        scanf("\n%d",&choice);  
        switch(choice)  
        {  
            case 1:  
            insertion_beginning();  
            break;  
            case 2:  
                    insertion_last();  
            break;  
            case 3:  
            insertion_specified();  
            break;  
            case 4:  
            deletion_beginning();  
            break;  
            case 5:  
            deletion_last();  
            break;  
            case 6:  
            deletion_specified();  
            break;  
            case 7:  
            search();  
            break;  
            case 8:  
            display();  
            break;  
            case 9:  
            exit(0);  
            break;  
            default:  
            printf("Please enter valid choice..");  
        }  
    }  
}  
void insertion_beginning()  
{  
   struct node *newnode;   
   int item;  
   newnode = (struct node *)malloc(sizeof(struct node));  
   if(newnode == NULL)  
   {  
       printf("\nOVERFLOW");  
   }  
   else  
   {  
    printf("\nEnter Item value");  
    scanf("%d",&item);  
      
   if(head==NULL)  
   {  
       newnode->next = NULL;  
       newnode->prev=NULL;  
       newnode->data=item;  
       head=newnode;  
   }  
   else   
   {  
       newnode->data=item;  
       newnode->prev=NULL;  
       newnode->next = head;  
       head->prev=newnode;  
       head=newnode;  
   }  
   printf("\nNode inserted\n");  
}  
     
}  
void insertion_last()  
{  
   struct node *newnode,*temp;  
   int item;  
   newnode = (struct node *) malloc(sizeof(struct node));  
   if(newnode == NULL)  
   {  
       printf("\nOVERFLOW");  
   }  
   else  
   {  
       printf("\nEnter value");  
       scanf("%d",&item);  
        newnode->data=item;  
       if(head == NULL)  
       {  
           newnode->next = NULL;  
           newnode->prev = NULL;  
           head = newnode;  
       }  
       else  
       {  
          temp = head;  
          while(temp->next!=NULL)  
          {  
              temp = temp->next;  
          }  
          temp->next = newnode;  
          newnode ->prev=temp;  
          newnode->next = NULL;  
          }  
             
       }  
     printf("\nnode inserted\n");  
    }  
void insertion_specified()  
{  
   struct node *newnode,*temp;  
   int item,loc,i;  
   newnode = (struct node *)malloc(sizeof(struct node));  
   if(newnode == NULL)  
   {  
       printf("\n OVERFLOW");  
   }  
   else  
   {  
       temp=head;  
       printf("Enter the location");  
       scanf("%d",&loc);  
       for(i=0;i<loc;i++)  
       {  
           temp = temp->next;  
           if(temp == NULL)  
           {  
               printf("\n There are less than %d elements", loc);  
               return;  
           }  
       }  
       printf("Enter value");  
       scanf("%d",&item);  
       newnode->data = item;  
       newnode->next = temp->next;  
       newnode -> prev = temp;  
       temp->next = newnode;  
       temp->next->prev=newnode;  
       printf("\nnode inserted\n");  
   }  
}  
void deletion_beginning()  
{  
    struct node *newnode;  
    if(head == NULL)  
    {  
        printf("\n UNDERFLOW");  
    }  
    else if(head->next == NULL)  
    {  
        head = NULL;   
        free(head);  
        printf("\nnode deleted\n");  
    }  
    else  
    {  
        newnode = head;  
        head = head -> next;  
        head -> prev = NULL;  
        free(newnode);  
        printf("\nnode deleted\n");  
    }  
  
}  
void deletion_last()  
{  
    struct node *newnode;  
    if(head == NULL)  
    {  
        printf("\n UNDERFLOW");  
    }  
    else if(head->next == NULL)  
    {  
        head = NULL;   
        free(head);   
        printf("\nnode deleted\n");  
    }  
    else   
    {  
        newnode = head;   
        if(newnode->next != NULL)  
        {  
            newnode = newnode -> next;   
        }  
        newnode -> prev -> next = NULL;   
        free(newnode);  
        printf("\nnode deleted\n");  
    }  
}  
void deletion_specified()  
{  
    struct node *newnode, *temp;  
    int val;  
    printf("\n Enter the data after which the node is to be deleted : ");  
    scanf("%d", &val);  
    newnode = head;  
    while(newnode -> data != val)  
    newnode = newnode -> next;  
    if(newnode -> next == NULL)  
    {  
        printf("\nCan't delete\n");  
    }  
    else if(newnode -> next -> next == NULL)  
    {  
        newnode ->next = NULL;  
    }  
    else  
    {   
        temp = newnode -> next;  
        newnode -> next = temp -> next;  
        temp -> next -> prev = newnode;  
        free(temp);  
        printf("\nnode deleted\n");  
    }     
}  
void display()  
{  
    struct node *newnode;  
    printf("\n printing values...\n");  
    newnode = head;  
    while(newnode != NULL)  
    {  
        printf("%d\n",newnode->data);  
        newnode=newnode->next;  
    }  
}   
void search()  
{  
    struct node *newnode;  
    int item,i=0,flag;  
    newnode = head;   
    if(newnode == NULL)  
    {  
        printf("\nEmpty List\n");  
    }  
    else  
    {   
        printf("\nEnter item which you want to search?\n");   
        scanf("%d",&item);  
        while (newnode!=NULL)  
        {  
            if(newnode->data == item)  
            {  
                printf("\nitem found at location %d ",i+1);  
                flag=0;  
                break;  
            }   
            else  
            {  
                flag=1;  
            }  
            i++;  
            newnode = newnode -> next;  
        }  
        if(flag==1)  
        {  
            printf("\nItem not found\n");  
        }  
    }     
          
}  
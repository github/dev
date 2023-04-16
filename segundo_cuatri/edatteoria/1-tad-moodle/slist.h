#include "types.h"

/* SList: an ordered list of strings */
/* Note: ordered by position in list, not by any ordering criterion */
typedef struct _SList SList;

SList *sl_new();
void sl_free(SList *lst);

/* add str to the end of SList l */
/* if not NULL, str is assumed to be a NULL-terminated C string*/
/* returns OK or ERROR depending on whether the addition was successful*/
Status sl_append(SList *lst, char *str);

/* remove last string from SList */
/* str contains that string, if any, at the end*/
/* returns OK if successful, ERROR otherwise (e.g. if the list is empty) */
Status sl_removeLast(SList *lst, char **str);

/* returns in str the string in position pos in SList */
Status sl_get(SList *lst, int pos, char **str);

/* returns true of SList l is empty */
Bool sl_empty(SList *lst);

/*prints all strings in SList l */
void sl_print(SList *lst);

/* return the number of strings in lst */
int sl_size(SList *lst);
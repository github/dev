
#include "expressions.h"
#include "stack.h"
#include "types.h"
#include <ctype.h> // for isdigit()
#include <stdio.h>
#include <stdlib.h>

#define OPERATORS "+-*/%"

// is char c an operator?
Bool isOperator(char c)
{
  char *oper = OPERATORS;
  char *pc;

  // exclude the char '\0' as operator
  if (c == '\0')
    return FALSE;

  // search for c in operators
  pc = strchr(oper, c);

  if (!pc)
    return FALSE;
  return TRUE;
}

// is char c an operand?
// accepts anything that is not an operator
Bool isOperand(char c)
{
  Bool b;
  b = (isOperator(c) == TRUE) ? FALSE : TRUE;
  return b;
}

// is char c a digit
Bool isIntOperand(char c) { return isdigit(c) ? TRUE : FALSE; }

// evaluate expresion with operator oper
int evaluate(int arg1, int arg2, char oper)
{
  int p = 0;

  switch (oper)
  {
  case '+':
    p = arg1 + arg2;
    break;
  case '-':
    p = arg1 - arg2;
    break;
  case '*':
    p = arg1 * arg2;
    break;
  case '/':
    p = arg1 / arg2;
    break;
  default:
    printf("Invalid operator");
  }

  return p;
}
/******************************************/

// START YOUR CODE

// return TRUE if string str has well-balanced parenthesis

Bool balancedParens(char *str)
{
  Status st;
  Stack *s;
  int i, len;
  st = OK;
  if (!(s = stack_init()))
  {
    st = ERROR;
  }
  len = strlen(str);
  for (i = 0; i < len && st == OK; i++)
  {
    if (str[i] == '(')
    {
      st = stack_push(s, str + i);
    }
    else if (str[i] == ')')
    {
      if (NULL == (char *)stack_pop(s))
      {
        st = ERROR;
      }
    }
  }
  if (st == OK && stack_isEmpty(s) == FALSE)
  {
    st = ERROR;
  }
  stack_free(s);
  if (st == OK)
  {
    return TRUE;
  }
  else if (st == ERROR)
  {
    return FALSE;
  }
  return FALSE;
}

// evaluate the postfix expression in expr
// return OK or ERROR
// if no error, *result contains the result of evaluating the expression

Status evalPostfix(char *expr, int *result)
{
  Status st;
  Stack *s;
  void *a;
  int i, j = 0, k = 0, len, e;
  int *arg1 = NULL, *arg2 = NULL;
  int *aux[100];
  int *resultado[100];
  st = OK;
  if (!(s = stack_init()))
  {
    st = ERROR;
  }
  len = strlen(expr);
  for (i = 0; i < len; i++)
  {
    if (isIntOperand(expr[i]) == TRUE)
    {

      aux[j] = int_init(expr[i] - '0');
      st = stack_push(s, aux[j]);
      j++;
    }
    else if (isOperator(expr[i]) == TRUE)
    {
      arg2 = stack_pop(s);
      if (arg2 == NULL)
      {
        stack_free(s);

        for (i = 0; i < j; i++)
        {
          free(aux[i]);
        }
        for (i = 0; i < k; i++)
        {
          free(resultado[i]);
        }
        return ERROR;
      }
      arg1 = stack_pop(s);
      if (arg1 == NULL)
      {
        stack_free(s);

        for (i = 0; i < j; i++)
        {
          free(aux[i]);
        }
        for (i = 0; i < k; i++)
        {
          free(resultado[i]);
        }
        return ERROR;
      }
      e = evaluate(*arg1, *arg2, expr[i]);
      resultado[k] = int_init(e);
      st = stack_push(s, resultado[k]);
      k++;
    }
  }

  a = stack_pop(s);
  if (a == NULL)
  {
    st = ERROR;
  }

  *result = e;
  if (stack_isEmpty(s) == FALSE)
  {
    st = ERROR;
  }

  stack_free(s);

  for (i = 0; i < j; i++)
  {
    free(aux[i]);
  }
  for (i = 0; i < k; i++)
  {
    free(resultado[i]);
  }
  
  return st;
}

// END CODE
#include <stdio.h>
#include <stdlib.h>

#include "expressions.h"
#include "file_utils.h"
#include "stack.h"

#define MAX 10

// simple test that the stack library is working
int test_stack(void) {
  Stack *s = NULL;
  int a[MAX];
  int i;
  Status st = OK;

  s = stack_init();
  if (!s)
    return EXIT_FAILURE;

  for (i = 0; i < MAX && st == OK; i++) {
    a[i] = i;
    st = stack_push(s, a + i);
  }

  if (st == ERROR)
    i = EXIT_FAILURE;
  else
    i = EXIT_SUCCESS;

  stack_print(stdout, s, int_print);

  // pop the stack elements
  while (stack_isEmpty(s) == FALSE)
    stack_pop(s);

  stack_print(stdout, s, int_print);

  stack_free(s);
  return i;
}

// test 1 instance of a balanced parenthesis problem
void test_balancedParens(char *str) {
  if (!str)
    return;
  Bool ret = FALSE;
  ret = balancedParens(str);
  printf("%s is %s balanced\n", str, ret ? "" : "NOT");
}

void test_many_balancedParens() {
  char *test1 = "(())";        // balanced
  char *test2 = "()()";        // balanced
  char *test3 = "((())";       // NOT balanced
  char *test4 = "(()))";       // NOT balanced
  char *test5 = "(a+b*(c+d))"; // balanced
  char *test6 = "(a+b*((c+d)"; // not balanced

  test_balancedParens(test1);
  test_balancedParens(test2);
  test_balancedParens(test3);
  test_balancedParens(test4);
  test_balancedParens(test5);
  test_balancedParens(test6);
}

void test_evalPostfix(char *expr) {
  int result = 0;
  Status st = OK;

  if (!expr)
    return;

  st = evalPostfix(expr, &result);
  if (st == OK) {
    printf("%s returns %d\n", expr, result);
  } else {
    printf("%s is not a valid postfix expression\n", expr);
  }
}
void test_many_evalPostfix() {
  int i = 0, num_tests = 5;
  char **all_tests = malloc(sizeof(char *) * num_tests);
  all_tests[0] = "23+31++";   // 9
  all_tests[1] = "22*4+34+*"; // 56
  all_tests[2] = "22*4";      // invalid expression, stack not empty at end
  all_tests[3] =
      "2*5"; // invalid expression, '*' does not hace two arguments in stack
  all_tests[4] =
      "5b*"; // invalid expression, 'b' is neither a digit nor an operator

  for (i = 0; i < num_tests && i < 5; i++) {
    test_evalPostfix(all_tests[i]);
  }
  free(all_tests);
}

int main(int argc, char *argv[]) {
  // uncomment the next line to check whether the stack library is working
  //  test_stack();
  test_many_balancedParens();
  test_many_evalPostfix();
}

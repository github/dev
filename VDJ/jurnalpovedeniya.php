<h1>Журнал поведения<h1>
<form action=c:/for jurnal/поведение.txt"/path_to_send.php" method="post">
  <p><input type="text" name="name" placeholder="Напишите"></p>
  <p><input type="submit" value="Отправить"></p>
  <?php
$напишите  = $_POST['напишите'];  

$msg   = "userocenka: {$напишите}<br>";

mail('pioliu30@gmail.com', 'User submitted the form', $msg); 
</form>
<h3>Введите свой класс, имя ученика и оценка их поведения(с одного до пяти). Например. 4 класс, Никита Щеклеин, 2. Потом нажмите отправить</h3>
<h2>1 класс
?
2 класс
?
3 класс
?
4 класс
?
5 класс
?
6 класс
?
7 класс
?
8 класс
?
9 класс
?
10 класс
?
11 класс
?</h2>
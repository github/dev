program Calculator;
  {$CODEPAGE UTF-8}
  uses crt,
       Calculator_uFaP;
  var inputText: String;

begin
  setlength(inputArr,2);
  clrscr;
  inputText := '';
  textcolor(8);
  window(5,2,116,5); //Umožní napsat trvalé záhlaví programu do vlastního okna
  header();
  window32(5,5,116,9001); //Vytvoří programu "okraje" pomocí menšího okna
  // for i:=0 to 16 do begin
  //   textcolor(i);
  //   writeln(i, ' Hello World!');
  // end;
  repeat begin
    textcolor(3);
    write('>');
    textcolor(11);
    repeat
      readln(inputText);
      if IsBlank(inputText) then begin
        goToXY(2, WhereY-1);
        clrEoL;
      end;
    until not IsBlank(inputText);
    inputArr[1]:='';
    separateInput(inputText);
    if Commands(inputArr[1]) then Calculate(1, High(inputArr));
    writeln;
  end until inputArr[1] = 'EXIT exe';
end.

{ TODO:
  help funkce
  více debugů
  matematika:
    ✓ počítání se zápornými čísli
    funkce
    závorky
    auto krát
    vědecký formát
    promněné:
      uživatelské
      výsledky
      poslední výsledek (ans)
  soubory (ukládání + načítání):
    log (načítání výsledků)
    proměnné
    nastavení
  nastavení
}

{ Barvy:
  0/16 - černá           -
  1    - tmavě modrá     -
  2    - tmavě zelená    -
  3    - tmavě tyrkysová - identifikátor uživatelského vstupu (>)
  4    - tmavě červená   -
  5    - tmavě fialová   -
  6    - tmavě žlutá     -
  7    - světle šedá     -
  8    - tmavě šedá      - záhlaví programu
  9    - modrá           -
  10   - zelená          - hlavní text programu
  11   - tyrkysová       - uživatelský vstup
  12   - červená         - errors
  13   - fialová         - (výsledky)
  14   - žlutá           -
  15   - bílá            -
}
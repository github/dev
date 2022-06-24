unit uFaP;
{$CODEPAGE UTF-8}
interface
  uses crt;
  var inputArr: array of string;

  function Calculate(): Boolean;
  function IsDigit(search: String): Boolean;
  function SeparateInput(inputText: String): Boolean; //rozdělí vstup na jednotlivé části
  function Commands(inputText: String): Boolean; //stará se o příkazy
  procedure header(); //vytiskne záhlaví programu
  // procedure plus10(var a: Smallint); //přičte k proměnné 10

implementation
  const digits: array of char = ('1','2','3','4','5','6','7','8','9','0');
  // procedure plus10(var a: Smallint); begin
      // inc(a,10);
  // end;

  function Calculate(): Boolean;
  begin
    writeln(inputArr[1], 'Calculate');
    Calculate:=true;
  end;

  function IsDigit(search: String): Boolean;
  var a, i: Byte;
      charIsDigit: Boolean;
  begin
    for a:=1 to length(search) do begin
      for i:=low(digits) to high(digits) do begin
        if search[a] = digits[i] then
        begin
          charIsDigit:=true;
          break;
        end else begin
          charIsDigit:=false;
        end;
      end;
      if Not(charIsDigit) then begin
        IsDigit:=false;
        break;
      end;
    end;
  end;

  function SeparateInput(inputText: String): Boolean; //rozdělí vstup na jednotlivé části
  var i: Shortint = 1;
      a: Shortint = 2;
      tmp: String = '';
  begin
    while (length(inputText) > 0) do begin
      if (inputText[i]<>' ') and (i <= length(inputText)) then begin
        tmp:=tmp+inputText[i];
        inc(i);
      end
      else begin
        setlength(inputArr, a);
        inputArr[a-1]:=tmp;
        delete(inputText, 1, length(tmp)+1);
        inc(a);
        tmp:='';
        i:=1;
      end;
    end;

    SeparateInput:=true;
  end;

  function Commands(inputText: String): Boolean;
    var input: string[1];
    begin
    case LowerCase(inputText) of
      '':;
      'clr', 'clear':begin
        clrscr;
      end;
      'e', 'exit':begin
        textcolor(10);
        Writeln('Are you sure you want to exit? y/n');
        textcolor(3);
        Write('>');
        textcolor(11);
        readln(input);
        if LowerCase(input) = 'y' then inputArr[1]:='EXIT';
      end;
      'h', 'help':begin
        textcolor(10);
        Writeln('Commands list:');
        Writeln(' clr, clear . . . . clears window');
        Writeln(' h, help . . . . . .shows this list');
        Writeln(' e, exit . . . . . .ends program');
      end;
      else begin
        //writeln(IsDigit(inputText));
        if Not(IsDigit(inputText)) then begin
          textcolor(12);
          Commands:=false;
          Writeln('Command "', inputArr[1],'" doesn`t exist');
        end else Commands:=true;
      end;
    end;
  end;

  procedure header(); begin
    textcolor(8);
    Writeln('    Calculator.exe 0.0.1');
    Writeln('    For exit type "e", for help type "h"');
    Writeln;
  end;

initialization
  setlength(inputArr, 1);
end.




{TODO list:
  funkci která rozpozná číslo a smazat tento pokus z Commands
  zkusit začít něco počítat...
  vylepšit funkce - lepší algoritmy...
  čistota kódu a správná velká písmena
}
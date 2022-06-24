unit Calculator_uFaP;
{$CODEPAGE UTF-8}
{$MODE objfpc}
interface
  uses crt, sysutils;
  var inputArr: Array of String;

  function Calculate(first: Byte; last: Byte): Boolean;
  function IsDigit(search: String): Boolean;
  function IsBlank(search: String): Boolean;
  function SeparateInput(inputText: String): Boolean; //rozdělí vstup na jednotlivé části
  function Commands(inputText: String): Boolean; //stará se o příkazy
  procedure header(); //vytiskne záhlaví programu
  // procedure plus10(var a: Smallint); //přičte k proměnné 10

implementation
  const digits: Array of char = ('0','1','2','3','4','5','6','7','8','9', ',', 'e', 'E');
  // procedure plus10(var a: Smallint); begin
      // inc(a,10);
  // end;
  function IsBlank(search: String): Boolean;
    var a: Byte;
  begin
    IsBlank:=True;
    if search='' then exit;
    for a:=1 to Length(search) do begin
      if search[a]<>' ' then begin
        IsBlank:=False;
        exit;
      end;
    end;
  end;

  function arrayContains(const searchArray: Array of String; search: String): Byte;
    var a: Byte;
    begin
      for a:=Low(searchArray) to High(searchArray) do begin
        if searchArray[a] = search then begin
          arrayContains:=a;
          exit;
        end;
      end;
      arrayContains:=0;
    end;

  procedure help(command: String);
    type
      tCommand=Record
        names: Array of String;
        sDesc: String;
        desc: String;
      end;
    var a, b: Byte;
        conductor: String;
    const commandArr: Array of tCommand = (
      (names:('clear', 'clr');sDesc:'clears window';  desc:''),
      (names:('exit', 'e');   sDesc:'ends program';   desc:''),
      (names:('help', 'h');   sDesc:'shows this list';desc:'')
      // (names:(''); qDesc:''; desc:''),
    );
    begin
    if command='' then begin
      textcolor(15);
      writeln('Commands list:');
      for a:=low(commandArr) to high(commandArr) do begin
        write(' ');
        for b:=low(commandArr[a].names) to high(commandArr[a].names) do begin
          textcolor(10);
          write(commandArr[a].names[b]);
          if b <> high(commandArr[a].names) then begin
            textcolor(8);
            write(', ');
          end;
        end;
        conductor:=' ';
        while WhereX + length(conductor) < 19 do begin
          conductor:=conductor+'.';
        end;
        conductor:=conductor+' ';
        textcolor(8);
        write(conductor);
        textcolor(7);
        writeln(commandArr[a].sDesc);
      end;
    end else begin
      writeln('HELP - for each function - WIP')
    end;
  end;
  function Calculate(first: Byte;last: Byte): Boolean;
  type
    TArrayContains = Record
      plus: Byte;
      minus: Byte;
      times: Byte;
      divide: Byte
    end;
  var searchArray: TArrayContains;
      i: Byte;
  begin
    writeln('Calculate: ', first, ', ', last);
    try
      repeat begin
        for i:=Low(inputArr)+1 to High(inputArr)-1 do write(inputArr[i], ', ');
        writeln(inputArr[High(inputArr)]);
        searchArray.plus:=arrayContains(inputArr, '+');
        searchArray.minus:=arrayContains(inputArr, '-');
        searchArray.times:=arrayContains(inputArr, '*');
        searchArray.divide:=arrayContains(inputArr, '/');
        writeln(searchArray.plus, ', ', searchArray.minus, ', ', searchArray.times, ', ', searchArray.divide);
        if ((searchArray.times<searchArray.divide) or (searchArray.divide=0)) and (searchArray.times>0) then begin
          writeln('times at ', searchArray.times);
          if inputArr[searchArray.times+1] = '-' then begin
            delete(inputArr, searchArray.times+1, 1);
            inputArr[searchArray.times+1]:='-'+inputArr[searchArray.times+1];
          end;
          writeln(inputArr[searchArray.times-1], inputArr[searchArray.times], inputArr[searchArray.times+1]);
          inputArr[searchArray.times-1]:=FloatToStr(StrToFloat(inputArr[searchArray.times-1]) * (StrToFloat(inputArr[searchArray.times+1])));
          writeln( inputArr[searchArray.times-1]);
          delete(inputArr, searchArray.times, 2);
        end else if searchArray.divide>0 then begin
          writeln('divide at ', searchArray.divide);
          if inputArr[searchArray.divide+1] = '-' then begin
            delete(inputArr, searchArray.divide+1, 1);
            inputArr[searchArray.divide+1]:='-'+inputArr[searchArray.divide+1];
          end;
          writeln(inputArr[searchArray.divide-1], inputArr[searchArray.divide], inputArr[searchArray.divide+1]);
          inputArr[searchArray.divide-1]:=FloatToStr(StrToFloat(inputArr[searchArray.divide-1]) / (StrToFloat(inputArr[searchArray.divide+1])));
          writeln( inputArr[searchArray.divide-1]);
          delete(inputArr, searchArray.divide, 2);
        end else if ((searchArray.plus<searchArray.minus) or (searchArray.minus=0)) and (searchArray.plus>0) then begin
          writeln('plus at ', searchArray.plus);
          if inputArr[searchArray.plus+1] = '-' then begin
            delete(inputArr, searchArray.plus+1, 1);
            inputArr[searchArray.plus+1]:='-'+inputArr[searchArray.plus+1];
          end;
          writeln(inputArr[searchArray.plus-1], inputArr[searchArray.plus], inputArr[searchArray.plus+1]);
          inputArr[searchArray.plus-1]:=FloatToStr(StrToFloat(inputArr[searchArray.plus-1]) + (StrToFloat(inputArr[searchArray.plus+1])));
          writeln( inputArr[searchArray.plus-1]);
          delete(inputArr, searchArray.plus, 2);
        end else if searchArray.minus>0 then begin
          writeln('minus at ', searchArray.minus);
          if inputArr[searchArray.minus+1] = '-' then begin
            delete(inputArr, searchArray.minus+1, 1);
            inputArr[searchArray.minus+1]:='-'+inputArr[searchArray.minus+1];
          end;
          writeln(inputArr[searchArray.minus-1], inputArr[searchArray.minus], inputArr[searchArray.minus+1]);
          inputArr[searchArray.minus-1]:=FloatToStr(StrToFloat(inputArr[searchArray.minus-1]) - (StrToFloat(inputArr[searchArray.minus+1])));
          writeln( inputArr[searchArray.minus-1]);
          delete(inputArr, searchArray.minus, 2);
        end;
        writeln;
        readkey;
      end until (searchArray.plus+searchArray.minus+searchArray.times+searchArray.divide) = 0;
      Calculate:=true;
    except
      on E: Exception do begin
        textcolor(12);
        writeln;
        writeln('----------------------------------------');
        writeln(E.ClassName, ' ', E.Message); 
        writeln('----------------------------------------'); 
        textcolor(15);
      end;
    end;
  end;

  function IsDigit(search: String): Boolean;
  var a, i: Byte;
      charIsDigit: Boolean;
  begin
    IsDigit:=true;
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
    var 
      i: Shortint = 1;
      a: Shortint = 2;
      tmp: String = '';  
    const
      separateChars = [' ', '-', '+', '*', '/'];
  begin
    setlength(inputArr, a);
    while (inputText[1]=' ') and (Length(inputText) > 0) do begin
          delete(inputText, 1, 1);
    
    end;
    i:=1;
    while (length(inputText) > 0) do begin
      if not (inputText[i] in separateChars) and (i <= length(inputText)) then begin
        tmp:=tmp+inputText[i];
        inc(i);
      end
      else begin
        setlength(inputArr, a);
        inputArr[a-1]:=tmp;
        if (inputText[i]<>' ') and (Length(inputText) >= i) then begin
          if tmp <> '' then begin
            inc(a);
            setlength(inputArr, a);
          end;
          inputArr[a-1]:=inputText[i];
        end;
        delete(inputText, 1, length(tmp)+1);
        inc(a);
        tmp:='';
        i:=1;
        while (inputText[1]=' ') and (Length(inputText) > 0) do begin
          delete(inputText, 1, 1);
        end;
      end;
    end;
    SeparateInput:=true;
  end;

  function Commands(inputText: String): Boolean;
    var input: String[1];
        a: Byte;
    begin
    Commands:=false;
    case LowerCase(inputText) of
      '':;
      'clr', 'clear':begin
        clrscr;
      end;
      'e', 'exit':begin
        textcolor(10);
        writeln('Are you sure you want to exit? y/n');
        textcolor(3);
        write('EXIT>');
        textcolor(11);
        readln(input);
        if LowerCase(input)='y' then inputArr[1]:='EXIT exe';
      end;
      'h', 'help':begin
        if Length(inputArr)>2 then help(inputArr[2])
        else help('');
      end;
      'd', 'debug': begin
        for a:=Low(inputArr)+2 to High(inputArr) do writeln(inputArr[a]);
        delete(inputArr, 1, 1);
        if inputArr[1] <> 'd' then begin
          if Commands(inputArr[1]) then begin
            Commands:=true;
            exit;
          end;
        end;
      end;
      else begin
        if Not(IsDigit(inputText)) then begin
          textcolor(12);
          Commands:=false;
          writeln('Command "', inputText,'" does not exist');
        end else Commands:=true;
      end;
    end;
  end;




  procedure header(); begin
    textcolor(8);
    writeln('    Calculator.exe 0.0.1');
    writeln('    For exit type "e", for help type "h"');
    writeln;
  end;

initialization
  setlength(inputArr, 2);
end.




{TODO list:
  funkci která rozpozná číslo a smazat tento pokus z Commands
  zkusit začít něco počítat...
  vylepšit funkce - lepší algoritmy...
  čistota kódu a správná velká písmena
}
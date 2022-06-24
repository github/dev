program BracketTest;
  uses
    crt;
  type
    tBracketPair = record
      first: Byte;
      second: Byte;
      level: Byte;
    end;
  var
    input, noPair: String;
    bracketPairs: Array of tBracketPair;
    counter, counter2, position: Byte;
begin
  repeat begin
    clrScr;
    setLength(bracketPairs, 1);
    window32(1,1,120,9001);
    textcolor(15);
    input:='';
    Readln(input);
    writeln;
    bracketPairs[Length(bracketPairs)].first:=255;
    for counter:=1 to Length(input) do begin
      if input[counter]='(' then begin
        setLength(bracketPairs, Length(bracketPairs)+1);
        bracketPairs[Length(bracketPairs)-1].first:=counter;
        writeln('First: ', counter, '  ', Length(bracketPairs)-1);
      end;
    end;
    for counter:=1 to Length(input) do begin
      noPair:='';
      if input[counter]=')' then begin
        position:=0;
        for counter2:=1 to Length(bracketPairs)-1 do begin
          if (bracketPairs[counter2].first<counter) and (bracketPairs[counter2].second=0) then position:=counter2;
        end;
        if position<>0 then bracketPairs[position].second:=counter
        else begin
          setLength(bracketPairs, Length(bracketPairs)+1);
          bracketPairs[Length(bracketPairs)-1].first:=0;
          bracketPairs[Length(bracketPairs)-1].second:=counter;
          position:=Length(bracketPairs)-1;
          noPair:='  No pair';
        end;
        writeln('Second: ', counter, '  ', position, '  ', Length(bracketPairs)-1, noPair);
      end;
    end;
    writeln;
    for counter:=1 to Length(bracketPairs)-1 do begin
      writeln(counter, ': ', bracketPairs[counter].first, ' ', bracketPairs[counter].second);
    end;
    writeln;
    write(input);
    for counter:=1 to Length(bracketPairs)-1 do begin
      case (counter mod 3) of
        0:textcolor(11);
        1:textcolor(13);
        2:textcolor(14);
      end;
      if (bracketPairs[counter].first=0) or (bracketPairs[counter].second=0) then textcolor(12);
      if bracketPairs[counter].first<>0 then begin
        goToXY(bracketPairs[counter].first, WhereY);
        write('(');
      end;
      if bracketPairs[counter].second<>0 then begin
        goToXY(bracketPairs[counter].second, WhereY);
        write(')');
      end;
    end;
    writeln;
    textcolor(15);
    Readln(input);
  end until input='e';
end.
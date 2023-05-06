# just test it first
## hello

![github dev](https://github.com/xanxusldw/dev/blob/2023/note/images/1.png)

![github dev](https://user-images.githubusercontent.com/856858/130119109-4769f2d7-9027-4bc4-a38c-10f297499e8f.gif)

Regular **Markdown** here.

```
@startuml firstDiagram

Alice -> Bob: Hello
Bob -> Alice: Hi!
		
@enduml

```

![](firstDiagram.svg)

Some more markdown.


java -jar plantuml-1.2023.6.jar -tsvg firstDiagram.svg

![](/images/firstDiagram.svg)
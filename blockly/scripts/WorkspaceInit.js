import Blockly from Blockly;

'using strict';

var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox'),
     grid:
         {spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true},
     trashcan: true});
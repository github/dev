import blockly from blockly;

let options = {
    toolbox: toolbox,
    scrollbars: false,
    horizontalLayout: true,
    toolboxPosition: "end",
}

blockly.inject('container', options)
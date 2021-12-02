//Code editor from  https://codemirror.net/
class Editor {
  constructor(id) {
    this.codeEditor = CodeMirror.fromTextArea(document.getElementById(id), {
      lineNumbers: true,
      mode: "xml",
      mode: "javascript",
      // mode:"css",
      // theme: "dracula",
      theme: "material",
      lineWrapping: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
    })
  }
}
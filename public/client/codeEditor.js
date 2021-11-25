class Editor {
  constructor(id) {
    this.codeEditor = CodeMirror.fromTextArea(document.getElementById(id), {
      lineNumbers: true,
      mode: "xml",
      mode: "javascript",
      // mode:"css",
      theme: "dracula",
      lineWrapping: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
    })
  }
}
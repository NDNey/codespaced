
  var editor = CodeMirror.fromTextArea(document.querySelector('.codeEditor'), {
    lineNumbers: true,
    mode:"xml",
    mode:"javascript",
    // mode:"css",
      theme:"dracula",
      lineWrapping:true,
      autoCloseTags: true,
      autoCloseBrackets: true,
  
    });
    editor.refresh()
  

    document.querySelector('#openEditor').addEventListener('click',()=>{
      editor.setValue('')
      document.querySelectorAll('.cardBack').forEach(e => e.classList.toggle("hidden"))
      document.querySelector('.back').value = ''
    
      // console.log(editor.getValue())
      // editor.setValue()
    })

 
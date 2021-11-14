// Postcard

document.querySelector('#submitCard').addEventListener('click', () => {
    let front = document.querySelector('#cardFrond')
    let back = document.querySelector('.back')
    let alerta = document.querySelector('#alert')
    let deckId = document.querySelector('#submitCard').getAttribute('data-id')
    let codeCard = editor.getValue()
    let mirror = document.querySelector('.CodeMirror').outerHTML 
    if(!front.value.length){
      alert('please input card content')
      return
    }
    fetch(`/deck/newCard/${deckId}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        front: front.value,
          back: codeCard.length ? '' : back.value,
          codeCard: back.value.length ? '' : codeCard,
          mirror: mirror
      })
    }) 
    front.value = ''
    back.value = ''
    editor.setValue('')
  alerta.classList.toggle("hidden")
  setTimeout(()=>{
    alerta.classList.toggle("hidden")
  },2000)
     
  });

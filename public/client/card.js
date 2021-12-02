const submitEditor = new Editor('createCard')
submitEditor.codeEditor.refresh()

// Postcard
document.querySelector('#submitCard').addEventListener('click', () => {
  let front = document.querySelector('#cardFrond')
  let back = document.querySelector('.back')
  let alerta = document.querySelector('#alert')
  let deckId = document.querySelector('#submitCard').getAttribute('data-id')
  let codeCard = submitEditor.codeEditor.getValue()
  let mirror = document.querySelector('.CodeMirror').outerHTML
  if (!front.value.length) {
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
  submitEditor.codeEditor.setValue('')
  alerta.classList.toggle("hidden")
  setTimeout(() => {
    alerta.classList.toggle("hidden")
  }, 2000)

});

document.querySelector('#openEditor').addEventListener('click', () => {

  document.querySelectorAll('.cardBack').forEach(e => e.classList.toggle("hidden"))
  document.querySelector('.back').value = ''

})
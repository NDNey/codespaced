// submit and compare answer
if (document.querySelector('#studyEditor')) {

  const studyEditor = new Editor('studyEditor')
  studyEditor.codeEditor.refresh()

  let submitAnswer = document.querySelector('#submitAnswer')
  submitAnswer.addEventListener('click', () => {

    let answer = studyEditor.codeEditor.getValue().replace(/\s|;/ig, '')
    let answerToCompare = submitAnswer.getAttribute('data-backcode').replace(/\s|;/ig, '')
    let match = document.querySelector('#answerMatch')

    if (answer === answerToCompare) {
      match.innerHTML = '<div class="alert alert-success" role="alert">Your answer is correct!</div>'
    } else {
      match.innerHTML = '<div class="alert alert-danger role="alert">Your answer did not match!</div>'
    }
    flip()
  })
}else{
  
document.querySelector('#answer').addEventListener('click', flip)
}

const codeCard = new Editor('codeCard')
codeCard.codeEditor.refresh()
console.log(codeCard)




// edit card

document.querySelector('#editedCard').addEventListener('click', () => {

  let editButton = document.querySelector('#editedCard')
  let front = document.querySelector('#front')
  let back = document.querySelector('#back')
  let id = editButton.getAttribute('data-id')
  let codeCardEdited = codeCard.codeEditor.getValue()


  let mirror = document.querySelector('#codeCard').nextElementSibling.outerHTML
  let deckId = editButton.getAttribute('data-deckid')

  if (!front.value.length) {
    alert('please input card content')
    return
  }
  fetch(`/study/edit/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      front: front.value,
      back: codeCard.length ? '' : back.value,
      codeCard: back.value.length ? '' : codeCardEdited,
      mirror: mirror,
      id: id,
      deckId: deckId

    })
  })
  front.value = ''
  back.value = ''
  codeCard.codeEditor.setValue('')
  // window.location.reload(true)

  // alerta.classList.toggle("hidden")
  // setTimeout(()=>{
  //   alerta.classList.toggle("hidden")
  // },2000)

});


//  flip card 
function flip() {
  document.querySelector('.flip-card-inner').style.transform = "rotateY(180deg)"
  let answer = document.querySelector('#cardAnswer')
  answer.innerHTML = answer.dataset.mirror
}


document.querySelectorAll('.next').forEach(e=> e.addEventListener('click',(e)=>{
let index = 0
  let max= e.target.getAttribute('data-decklength')
 

  console.log(max)


}))
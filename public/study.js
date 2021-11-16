const studyEditor = new Editor('studyEditor')

studyEditor.codeEditor.refresh()



  document.querySelector('#answer').addEventListener('click', ()=>{
    document.querySelector('.flip-card-inner').style.transform = "rotateY(180deg)"
    let answer = document.querySelector('#cardAnswer')
    answer.innerHTML = answer.dataset.mirror
  })


 


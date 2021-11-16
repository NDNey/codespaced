// bootstrap sent info from profile to modals

$('#addCard').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let modal = $(this)
    modal.find('.modal-footer #submitCard').attr("data-id", button.data('whatever'))
    return
  })

  $('#editDeck').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let val = button.data('previousval')
    let action = `/deck/editDeck/${button.data('whatever')}?_method=PUT`
    let modal = $(this)
    modal.find('.modal-body #newDeckName').attr("action", action)
    modal.find('.modal-body #title').attr("value", val)
    return
  })

  const codeCard = new Editor('codeCard')
  codeCard.codeEditor.refresh()
  $('#editCard').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let action = `/study/edit/${button.data('id')}?_method=PUT`
    let deckId = button.data('deckid')
    let front = button.data('front')
    let back = button.data('back')
    let backCode = button.data('backcode')
    let modal = $(this)
    modal.find('.modal-body #editedCard').attr("action", action)
    modal.find('.modal-body #front').attr("value", front)
    modal.find('.modal-body #deckId').attr("value", deckId)
    if(back.length){
      modal.find('.modal-body .editedCard').removeClass("hidden")
      modal.find('.modal-body #back').val(back)
    }else{
      codeCard.codeEditor.setValue(backCode)
     
    }
   
    return
  })


// bootstrap sent info from profile to modals

$('#addCard').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  let modal = $(this)
  modal.find('.modal-footer #submitCard').attr("data-id", button.data('whatever'))
  return
})
// delete deck info send to modal
$('#AlertdeleteDeck').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  let modal = $(this)
  let action = `/deck/deleteDeck/${button.data('id')}?_method=DELETE`
  modal.find('.modal-footer #deleteDeck').attr("action", action)
  return
})
// sendig info to the modal edite deck
$('#editDeck').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  let val = button.data('previousval')
  let action = `/deck/editDeck/${button.data('whatever')}?_method=PUT`
  let modal = $(this)
  modal.find('.modal-body #newDeckName').attr("action", action)
  modal.find('.modal-body #title').attr("value", val)
  return
})


$('#editCard').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  // let action = `/study/edit/${button.data('id')}?_method=PUT`
  let deckId = button.data('deckid')
  let front = button.data('front')
  let back = button.data('back')
  let backCode = button.data('backcode')
  let id = button.data('id')
  let modal = $(this)
  // modal.find('.modal-body #editedCard').attr("action", action)
  modal.find('.modal-body #front').attr("value", front)
  modal.find('.modal-footer #editedCard').attr('data-deckid', deckId)
  modal.find('.modal-footer #editedCard').attr('data-id', id)


  if (back.length) {
    modal.find('.modal-body .cardBackText').removeClass("hidden")
    modal.find('.modal-body #back').val(back)
  } else {
    modal.find('.modal-body .cardBackCode').removeClass("hidden")
    codeCard.codeEditor.setValue(backCode)

  }

  return
})


import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('body')

function ReactModal(props) {
  return (
    <Modal isOpen={props.isOpen} className="remove-article-modal">
      <div>
        Do you really want to delete the <b>{props.article.title} </b>
        article?
      </div>
      <div className="modal__btns">
        <button
          className="btn-primary modal__btn"
          onClick={props.removeArticle}
        >
          yes
        </button>
        <button className="btn-primary modal__btn" onClick={props.closeModal}>
          no
        </button>
      </div>
    </Modal>
  )
}

export default ReactModal

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import shave from 'shave'

import style from './style.css'

import Comments from '../../Comments'

export const ThemeContext = React.createContext(true)

const modalStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    padding: '50px',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(169, 164, 164)',
    display: 'flex',
    flexDirection: 'column',
  },
}

Modal.setAppElement('body')

export default class Article extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      modalIsOpen: false,
      isRemoveArticle: false,
    }
  }

  componentDidMount() {
    shave(this.node, this.computedHeight())
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { article } = this.props
    const { isOpen, isRemoveArticle } = this.state
    return (
      <Fragment>
        {!isRemoveArticle ? (
          <div className="article-block">
            <div className="article__header">
              <h1 className="article__title">{article.title}</h1>
              <div>
                <div className="article__btns">
                  <button
                    onClick={this.showsText}
                    className="btn-primary article__btn"
                  >
                    {isOpen ? 'hide' : 'show'}
                  </button>

                  <ThemeContext.Consumer>
                    {show => (
                      <button
                        className="btn-primary article__btn"
                        onClick={this.openModal}
                        style={{ display: show ? 'block' : 'none' }}
                      >
                        Remove
                      </button>
                    )}
                  </ThemeContext.Consumer>
                </div>

                <Modal isOpen={this.state.modalIsOpen} style={modalStyles}>
                  <div>
                    Do you really want to delete the <b>{article.title}</b>{' '}
                    article?
                  </div>
                  <div className="modal__btns">
                    <button
                      className="btn-primary modal__btn"
                      onClick={this.removeArticle}
                    >
                      yes
                    </button>
                    <button
                      className="btn-primary modal__btn"
                      onClick={this.closeModal}
                    >
                      no
                    </button>
                  </div>
                </Modal>
              </div>
            </div>

            <div>
              <p
                className="article"
                ref={node => {
                  this.node = node
                }}
              >
                {article.text}
              </p>
              <div>
                <b>{article.date}</b>
              </div>
              {isOpen && <Comments comments={article.comments} />}
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }

  computedHeight = () => {
    const line = 2
    const style = getComputedStyle(this.node)
    const fontSize = parseInt(style.getPropertyValue('font-size'), 10)
    let lineh = style.getPropertyValue('line-height')

    if (
      (!lineh && lineh !== 0) ||
      String('normal|initial|inherit').indexOf(lineh) > -1
    ) {
      lineh = fontSize
    }
    return parseFloat(lineh) * line
  }

  toggleText = () => {
    const { isOpen } = this.state
    const height = isOpen ? Infinity : this.computedHeight()

    shave(this.node, height)
  }

  showsText = e => {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => this.toggleText()
    )
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  removeArticle = () => {
    this.setState(prevState => ({
      isRemoveArticle: !prevState.isRemoveArticle,
    }))
  }

  handleResize = () => {
    this.toggleText()
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    comments: PropTypes.array,
    date: PropTypes.string.isRequired,
  }),
}

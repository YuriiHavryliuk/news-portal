import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactModal from '../../Modal'
import shave from 'shave'

import style from './style.css'
import Comments from '../../Comments'
import ThemeContext from '../../../contexts'

export default class Article extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      modalIsOpen: false,
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
    const { article, removeArticle } = this.props
    const { isOpen } = this.state
    return (
      <Fragment>
        <div className="article-block">
          <ReactModal
            isOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            removeArticle={removeArticle}
            article={article}
          />
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

  handleResize = () => {
    this.toggleText()
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
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

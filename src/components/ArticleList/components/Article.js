import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shave from 'shave'

import style from './style.css'
import Comments from '../../Comments'

export default class Article extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
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
    const { isOpen } = this.state
    return (
      <div>
        <div className="article__header">
          <h1 className="article__title">{article.title}</h1>
          <div>
            <button
              onClick={this.showsText}
              className="btn-primary article__btn"
            >
              {isOpen ? 'hide' : 'show'} article
            </button>
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
}

Article.propTypes = {
  article: PropTypes.shape({
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    comments: PropTypes.array,
    date: PropTypes.string.isRequired,
  }),
}

import React, { Component } from 'react'

import style from './style.css'
import Comments from '../../Comments'

export default class Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  render() {
    const { article } = this.props
    const { visible } = this.state
    return (
      <div>
        <div className="article__header">
          <h1 className="article__title">{article.title}</h1>
          <div>
            <button
              onClick={this.showsText}
              className="btn-primary article__btn"
            >
              {visible ? 'hide' : 'show'} article
            </button>
          </div>
        </div>
        {visible && (
          <div>
            {article.text}
            <div>
              <b>{article.date}</b>
            </div>
            <Comments comments={article.comments} />
          </div>
        )}
      </div>
    )
  }
  showsText = e => {
    this.setState(prevState => ({ visible: !prevState.visible }))
  }
}

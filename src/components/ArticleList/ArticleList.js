import React, { Component, Fragment } from 'react'
import articles from '../../fixtures'
import style from './style.css'
import Article from './components/Article'

import { ThemeContext } from './components/Article.js'

export default class ArticleList extends Component {
  state = { showRemoveBtn: true }

  showRemoveBtn = () => {
    this.setState(prevState => ({ showRemoveBtn: !prevState.showRemoveBtn }))
  }

  render() {
    return (
      <div className="articles">
        <h4>News portal</h4>
        <button
          className="btn-primary article__btn btn-dark"
          onClick={this.showRemoveBtn}
        >
          CHANGE
        </button>
        {articles.map(article => (
          <Fragment key={article.id}>
            <ThemeContext.Provider value={this.state.showRemoveBtn}>
              <Article article={article} />
            </ThemeContext.Provider>
          </Fragment>
        ))}
      </div>
    )
  }
}

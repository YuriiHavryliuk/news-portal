import React, { Component } from 'react'
import articles from '../../fixtures'
import style from './style.css'
import Article from './components/Article'

const ArticleList = props => (
  <div className="articles">
    <h4>News portal</h4>
    {articles.map(article => (
      <Article article={article} key={article.id} />
    ))}
  </div>
)

export default ArticleList

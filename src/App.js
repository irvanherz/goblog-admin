import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ArticleListPage from './pages/articles/ArticleListPage';
import StaticListPage from './pages/statics/StaticListPage';
import NotFoundPage from './pages/404/NotFoundPage';
import DefaultLayout from './DefaultLayout';
import ArticleEditorPage from './pages/articles/ArticleEditorPage';
import CreateArticlePage from './pages/articles/CreateArticlePage';
import HomePage from './pages/home/HomePage';
import 'antd/dist/antd.css'
import BlankLayout from './BlankLayout';
import LoginPage from './pages/login/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <DefaultLayout selectedMenu='home'>
            <HomePage />
          </DefaultLayout>
        </Route>
        <Route exact path='/articles'>
          <DefaultLayout selectedMenu='articles'>
            <ArticleListPage />
          </DefaultLayout>
        </Route>
        <Route exact path='/articles/create'>
          <DefaultLayout selectedMenu='articles'>
            <CreateArticlePage />
          </DefaultLayout>
        </Route>
        <Route exact path='/articles/:id/edit'>
          <DefaultLayout selectedMenu='articles'>
            <ArticleEditorPage />
          </DefaultLayout>
        </Route>
        <Route exact path='/static-pages'>
          <DefaultLayout selectedMenu='statics'>
            <StaticListPage />
          </DefaultLayout>
        </Route>

                
        <Route exact path='/auth/login'>
          <BlankLayout>
            <LoginPage />
          </BlankLayout>
        </Route>
        
        
        <Route exact path='*'>
          <DefaultLayout>
            <NotFoundPage />
          </DefaultLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App

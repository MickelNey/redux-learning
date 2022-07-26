import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'

function App() {
  console.log('render')
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <section>
                  <h2>Welcome to the Redux Essentials example app!</h2>
                </section>
                <AddPostForm></AddPostForm>
                <PostsList></PostsList>
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postID" component={SinglePostPage}></Route>
          <Route exact path="/editPost/:postID" component={EditPostForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Component
const Nav = (props) => {
  return (
    <nav className={`frame ${props.name}`}>
      <h2 className='align-center' data-text='Hello, World!'><span>{'Hello, World!'}</span></h2>
      <ul className='without-list-style align-center cursor-pointer'>
        <li><Link className='underline' to='/posts'>POSTS</Link></li>
        <li><Link className='underline' to='/categories'>CAREGORIES</Link></li>
        <li><Link className='underline' to='/tags'>TAGS</Link></li>
        <li><Link className='underline' to='/about'>ABOUT</Link></li>
      </ul>
    </nav>
  );
}

const Paper = (props) => {
  return <div className={`frame ${props.name}`}>PAPER</div>;
}

const Posts = (props) => {
  return <div className={`frame ${props.name}`}>POSTS</div>;
}

const Categories = (props) => {
  return <div className={`frame ${props.name}`}>CATEGORIES</div>;
}

const Tags = (props) => {
  return <div className={`frame ${props.name}`}>TAGS</div>;
}

const About = (props) => {
  return <div className={`frame ${props.name}`}>ABOUT</div>;
}

const ViewTemplate = {
  Default: function (props) {
    return (<section className={`view ${props.name}`}>{props.children}</section>);
  }
}

// Skeleton
const SKELETON = {
  views: [
    { name: 'view-main' },
    { name: 'view-right' },
    { name: 'view-bottom' },
  ],
  frames: [
    { name: 'frame-home', path: '/', exactPath: true, component: Nav, in: 'view-main' },
    { name: 'frame-posts', path: '/posts/:query(category|tag|date)?/:keyword?', component: Posts, in: 'view-right' },
    { name: 'frame-categories', path: '/categories', component: Categories, in: 'view-right' },
    { name: 'frame-tags',path: '/tags', component: Tags, in: 'view-right' },
    { name: 'frame-about', path: '/about', component: About, in: 'view-right' },
    { name: 'frame-post', path: 'posts/:identifier', component: Paper, in: 'view-bottom' },
  ],
};

// Functions to render App
function draw (skeleton) {
  const { views, frames } = skeleton;
  return views.map(view => {
    const T = !!view.template ? ViewTemplate[view.template] : ViewTemplate.Default;
    return (
      <T name={view.name} key={view.name}>
        {frames.filter(frame => frame.in === view.name)
          .map(frame => { const C = frame.component; return <C name={frame.name} key={frame.name} />; })}
      </T>
    );
  });
}

function hex (skeleton) {
  return skeleton.frames.map(({ name, path, exactPath }) => <Route exact={!!exactPath} key={name} path={path} component={function () { 
    const _skeleton = { ...skeleton, frames: skeleton.frames.map(frame => {
      return frame.name === name ? { ...frame, in: 'view-main' } : frame;
    })};
    return draw(_skeleton);
  }} />);
}

// App component
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>{hex(SKELETON)}</Switch>
      </Router>
    );
  }
}

export default App;

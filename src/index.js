import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './assets/css/fontawesome.all.min.css'
import * as datastore from './datastore/request';
/* HEADER FUNCTIONS */

function PlaylistHeaderButtons() {
  return (
    <div className = "header-buttons-container">
      <button className="playlist-exit-buttons back-button" onClick={() => console.log("you clicked the back button")}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="playlist-exit-buttons close-button" onClick={() => console.log("you clicked the close button")}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

function PlaylistHeaderInfo(props) {
  return (
    <div className="playlist-header-info">
      <div className="playlist-icon">
        <i className="fas fa-music"></i>
      </div>
      <div className="playlist-description">
        <span className="playlist-type">PRIVATE</span>
        <span className="playlist-title">
          {props.playlist_title}
        </span>
        <span className="user-description">
          This is an Example Playlist I created to prototype the playlist feature I am designing. I want to be able to sort projects into folders so that I could organize "My Projects" into sections.
        </span>
      </div>
    </div>
  );
}
/* need to add the drop menu ul */
function PlaylistSortCount() {
  return (
    <div className="sort-count-row">
      <div className="sort-count-row sort-menu">
        <span className="sort-count-row sort-criteria">Custom Order</span>
        <div className="sort-count-row expand-button">
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
      <div className="sort-count-row project-count">
        3 Projects - 472 Lines
      </div>
    </div>
  );
}

/* INDIVIUDAL PROJECT ITEM FUNTION*/
/* change to the expand toggle to props.icon */
function ProjectItem(props) {
  return (
      <div className="project-summary">
        <button className="project-icon" style={{backgroundColor: props.color}} onClick={() => console.log("you clicked the project icon")}></button>
        <div className="project-name" onClick={() => console.log("you clicked the project name")}>
        {props.projectName}
        </div>
        <div className="sort-criteria">Modified: {props.dateModified}</div>
        <button className="expand-button" onClick={props.onClick}>
          <i className={props.toggleIcon}></i>
        </button>
      </div>  
      );
    }
function ClickedProjectItem(props) {
  return (
    <div className={props.isHidden}>
      <div className="left-column">
        <div className="project-icon" style={{backgroundColor: props.color}}></div>
        <div className="music-info">{props.projectBPM} bpm | {props.projectTimeSig} time | {props.projectKey}</div>
      </div>
      <div className="right-column">
        <h1 className="name">{props.projectName}</h1>
        <h3 className="author">by {props.userCreated}</h3>
        <p className="summary"></p>
        <ul className="tags"></ul>
        <div className="created">Created: {props.dateCreated}</div>
      </div>
      <div className="project-toolbar-container">
        <button className="project-toolbar project-edit-button"><i className="fas fa-pen"></i> Edit</button>
        <button className="project-toolbar project-clone-button"><i className="fas fa-code-branch"></i> Remix</button>
        <button className="project-toolbar project-delete-button"><i className="fas fa-trash"></i> Delete</button>
      </div>
    </div>
  )
}
/* FOOTER FUNCTION*/

function PlaylistFooter() {
  return (
    <div className="playlist-footer">
      <button className="new-playlist-button" onClick={() => console.log("you clicked the new playlist button")}>Add to Playlist</button>
    </div>
  )
}

/* CLASSES BELOW */

class Header extends React.Component {

  renderHeaderButtons() {
    return <PlaylistHeaderButtons/>
  }
  renderHeaderInfo() {
    return <PlaylistHeaderInfo
      playlist_title = {this.props.playlist_title}/>
  }
  renderSortCount() {
    return <PlaylistSortCount/>
  }
  render() {
    return(
      <div className="header-container">
        {this.renderHeaderButtons()}
        {this.renderHeaderInfo()}
        {this.renderSortCount()}   
      </div>
    )
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleDown: true,
    }
  }
  handleClick() {
    console.log("you clicked the toggle down");
    this.setState({
      isToggleDown: !this.state.isToggleDown,
    });
  }
  render() {
    let icon, isHidden;
    icon = this.state.isToggleDown ? "fas fa-chevron-down" : "fas fa-chevron-up";
    isHidden = this.state.isToggleDown ? "project-details-hidden" : "project-details";
    
    return (
      <React.Fragment>
        <ProjectItem 
          projectName = {this.props.projectName}
          dateModified = {this.props.dateModified}
          toggleIcon = {icon}
          onClick = {() => this.handleClick()}
          color = {this.props.color}/>
        <ClickedProjectItem
          isHidden={isHidden}
          projectName = {this.props.projectName}
          projectBPM = {this.props.projectBPM}
          projectTimeSig = {this.props.projectTimeSig}
          projectKey = {this.props.projectKey}
          dateCreated = {this.props.dateCreated}
          userCreated = {this.props.userCreated}
          color = {this.props.color}/>
      </React.Fragment>
    )
  }
}

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_projects: props.project_data.length
    }
  }
  chooseColor() {
    var colors = ["black","#46d753","#5bc6fc","#934ee0","#aecad5","#f067d1","#fc3e74","#fd7d23","#fed330"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    return(randomColor);
  }
  renderProject(name, bpm, time, key, date, mod, user) {
    this.state.num_projects += 1;
    return <Project
      projectName = {name}
      projectBPM = {bpm}
      projectTimeSig = {time}
      projectKey = {key}
      dateCreated = {date}
      dateModified = {mod}
      userCreated = {user}
      color = {this.chooseColor()}/>
  }
  render() {
    const listItems = this.props.project_data.map((p) =>
    <li className = "project-item" key={p.project_id}>
      {this.renderProject(p.project_name, p.project_bpm, p.project_timesig, p.project_key, p.date_created, p.date_modified, p.user_created)}
    </li>);
    return (
     <ul className="project-list">
       {listItems}
    </ul>
    );
  }
}

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_data: [],
      playlist_data: [],
    }
  }
  renderHeader(title) {
    return <Header
    playlist_title = {title}/>
  }
  renderProjects() {
    return <ProjectList
      project_data = {this.state.project_data}
      />
  }
  renderFooter() {
    return <PlaylistFooter/>
  }
  async componentDidMount() {
    // declare the data fetching function
    const fetchData = await datastore.get_playlist();
    this.setState({project_data: fetchData});
    const fetchData1 = await datastore.playlists();
    const thisPlaylist = fetchData1.filter(p => p.playlist_id == 1)
    this.setState({playlist_data: thisPlaylist});
    console.log(this.state.playlist_data);
  }

  render() {
    /* look into: how to pass prop from parent to child OR how to update child component */
    /* for header: this.state.playlist_data["playlist_title"] */
    return (
      <div className="dialog window-box">
        {this.renderHeader("Example Playlist")} 
        {this.renderProjects()}
        {this.renderFooter()}
      </div>
    );
  }
}
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Playlist />);
  
import React, { Component } from "react";
import "./css/index.scoped.css";
import langg from "../../language";

export class NotsearchFound extends Component {

  render() {
    
    const lang = new langg("header");
    return (
      <div className="yt-recent-search-wrap my-2">
        {this.props.isMobile && this.props.children}
        <div className="d-flex align-items-center justify-content-end" onClick={() => this.props.hideSearch()}>
          <img alt="#img" src={require("./images/close-icn.png")} />
        </div>
        <div className="text-center mb-2">
          <img alt="#img" src={require("./images/no-search-found-icn.png")} />
          <h2 className="search-no-ttl">{lang.get("noResults","No Results Found !")}</h2>
          <h4 className="search-no-sub-ttl my-0">
            {lang.get("modifySearch","Try modifying your search to get relevant results.")}
          </h4>
        </div>
      </div>
    );
  }
}

export default NotsearchFound;

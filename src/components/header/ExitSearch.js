import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./css/index.scoped.css";
import { useHistory, Link } from "react-router-dom";
import commands from "../../commands";
import langg from "../../language";


function ItemWithRouter(props) {
  const history = useHistory();

  return <ListGroupItem {...props} onClick={() => {
    if (props.query) {
      commands.products.setRecentSearches({ query: props.query, productId: props.productId, className: props.itemClassName });
    }
    props.hideSearch();


    switch (props.itemClassName) {
      case "Category": history.push("/shop?page=1&per_page=15&category_id[]="+props.productId); break;
      case "SubCategory": history.push(`/shop?page=1&per_page=15&category_id[]=${props.categoryId}&sub_category_id[]=${props.productId}`); break;
      case "Product": history.push("/shop/"+props.productId); break;
    }


  }} />
}



export class ExitSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchItem: [
        "Abayas",
        "Casual Kaftans",
        "Dubai Style Abayas",
        "Formal Hijabs",
        "Tunics",
      ],
    };
  }

  render() {
    const { SearchItem } = this.state;
    const lang = new langg("header");
    return (
      <div className="yt-recent-search-wrap my-2">
        {this.props.isMobile && this.props.children}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <p className="recent-search-tag-name m-0">{this.props.isQuickResults ? lang.get("quickResults", "Quick Results") : lang.get("recentSearches", "Recent Searches")}</p>
          <img src={require("./images/close-icn.png")} onClick={() => this.props.hideSearch()} />
        </div>
        <ListGroup className="recent-search-list-wrap" flush>
          {this.props.results.map((item, index) => {
            return index < 10 && <ItemWithRouter hideSearch={this.props.hideSearch} className="px-0 w3-hover-opacity" style={{ cursor: "default" }} query={this.props.isQuickResults ? item.name : undefined} productId={item.class_id} categoryId={item.category_id} itemClassName={item.class_name}>{item.name}</ItemWithRouter>;
          })}
        </ListGroup>
      </div>
    );
  }
}

export default ExitSearch;

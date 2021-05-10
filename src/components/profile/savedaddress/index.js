import React, { useState ,useEffect} from "react";
import "./css/index.scoped.css";

import ExistAddress from './ExistAddress'


function SavedAddress(props) {
  console.log(props);
 
  return <><ExistAddress onProps={props}/> </>;
}
export default SavedAddress;

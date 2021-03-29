import NotFountPage from "./NotFountPage"
import MaterialPage from "@/views/toolCabinet/material/MaterialPage";
import React  from 'react';
export default function getComponent(url) {
    return componentMapping[url] ? componentMapping[url] : (<NotFountPage url={url}/>)
}

const componentMapping ={
    '/toolCabinet/material/MaterialPage':(<MaterialPage/>)
}

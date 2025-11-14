import { createElement } from "./createElement.js";
import { fetchAPI as fetchAPIClass } from "./classes/fetchAPI.js";

const fetchAPI = new fetchAPIClass();

export async function loadContent() {
    const loadContentRes = await fetchAPI.getAllData();
    
    const data = loadContentRes.data;
    console.log(loadContentRes);
    createElement(data);
}   
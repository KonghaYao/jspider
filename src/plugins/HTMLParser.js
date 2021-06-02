const type ={
    svg:'image/svg+xml',
    html:'text/html',
    xml:'text/xml',
}
function Parser(string,func,{documentType='html'}){
    let parser = new DOMParser()​​;
    let dom = parser.parseFromString(string, type[documentType]||type['html'])
    return func(dom)
}
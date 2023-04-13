/**获取当前页面的git参数 

如果url是 http://example.com/?id=123&name=John&name=Mike
则返回
{
  id: "123",
  name: ["John", "Mike"]
}
*/
function getAllQueryStrings() {
    var result = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i<vars.length; i++) {
      var pair = vars[i].split("=");
      if (typeof result[pair[0]] === "undefined") {
        result[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof result[pair[0]] === "string") {
        var arr = [result[pair[0]], decodeURIComponent(pair[1])];
        result[pair[0]] = arr;
      } else {
        result[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return result;
}

let AllQueryStrings = getAllQueryStrings();



//当被点击时通知父页面
document.body.addEventListener("click",()=>{
    parent.window.postMessage({
        type:'onclick',
        name:AllQueryStrings.name
    },'*');
});
function makeP(){}
function SumVec(Va,Vb){
  if(Va.length = Vb.length){
    var l = Va.length;
    var ans = [];
    for(var i=0;i<l;i++){
      ans.push(Va[i] + Vb[i]);
    }
    return ans;
  }
}
function SumT(v,d){
  var ans = []
  var tmp;
  if(d == "h"){
    for(var i of v){
      tmp = i.reduce((accumulator, currentValue) => accumulator + currentValue);
      ans.push(tmp);
    }
  }else if(d == "v"){
    var l = v[0].length;
    for(var i=0;i<l;i++){
      ans.push(0);
    }
    for(var i of v){
      if(i.length == l){
        ans = SumVec(ans,i);
      }
    }
  }
  return ans;
}
class polygon{
  cntr = [];
  vrtxs = [];
  rad = 0;
  constructor(vertexes){
    for(var i of center){
      cntr.push(i);
    }
    for(var i of vertexes){
      vrtxs.push([...i]);
    }
  }
}
PolygonA = new polygon([[1,1]])

//function makeP(){}
function CalVec(Va,Vb,operator){
  if(Va.length = Vb.length){
    var l = Va.length;
    var ans = [];
    if(operator == "+"){
      for(var i=0;i<l;i++){
        ans.push(Va[i] + Vb[i]);
      }
    }else if(operator == "-"){
      for(var i=0;i<l;i++){
        ans.push(Va[i] - Vb[i]);
      }
    }else if(operator == "*"){
      for(var i=0;i<l;i++){
        ans.push(Va[i] * Vb[i]);
      }
      ans = ans.reduce((accumulator, currentValue) => accumulator + currentValue);
    }else if(operator == "**"　&& l == 3){
      ans = [Va[1]*Vb[2]-Va[2]*Vb[1],Va[2]*Vb[0]-Va[0]*Vb[2],Va[0]*Vb[1]-Va[1]*Vb[0]]
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
        ans = CalVec(ans,i,"+");
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
    this.cntr = SumT(vertexes,"v");
    for(var i of vertexes){
      this.vrtxs.push(CalVec(i,cntr,"-"));
    }
  }
}

PolygonA = new polygon([[4,11,0],[4,5,0],[9,9,0]]);

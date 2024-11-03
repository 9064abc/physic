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
      ans = [Va[1]*Vb[2]-Va[2]*Vb[1],Va[2]*Vb[0]-Va[0]*Vb[2],Va[0]*Vb[1]-Va[1]*Vb[0]];
    }else if(operator == "/"){
      for(var i=0;i<l;i++){
        ans.push(Va[i] / Vb[i]);
      }
    }
    return ans;
  }
}


function SumT(v,d){
  var ans = [];
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
    var l = vertexes.length;
    this.cntr = Calvec(SumT(vertexes,"v"),[l,l,l],"/");
    for(var i of vertexes){
      this.vrtxs.push(CalVec(i,this.cntr,"-"));
    }
  }
}

var PolygonA = new polygon([[4,11,0],[4,5,0],[9,9,0]]);
var PolygonB = new polygon([[5,7,0],[7,3,0],[10,2,0],[12,7,0]])
console.log(PolygonA);
console.log(PolygonB);

function support(Pa,Pb,d){
  var dotA = [];
  var dotB = [];
  for(var i of Pa.vrtxs){
    dotA.push(CalVec(i,d,"*"));
  }
  max = dotA.reduce((a,b) => Math.max(a,b));
  Imax = dotA.indexOf(max);
  
  for(var i of Pb.vrtxs){
    dotA.push(CalVec(i,d,"*"));
  }
  min = dotA.reduce((a,b) => Math.min(a,b));
  Imin = dotA.indexOf(min);
  return Calvec(Pa.vrtxs[Imax],Pb.vrtxs[Imim],"-");
}

SppA = support(PolygonA,PolygonB,[1,0,0]);
SppB = support(PolygonA,PolygonB,[-1,0,0]);

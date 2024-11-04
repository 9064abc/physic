//function makeP(){}
function dot(matrix1, matrix2){
  var res = [];
  var row1 = matrix1.length;
  var row2 = matrix2.length;
  var col1 = matrix1[0].length;
  var col2 = matrix2[0].length;

  for(var i1 = 0; i1 < row1; i1++){
    res.push([]);
    for(var i2 = 0; i2 < col2; i2++){
      res[i1].push(0);
      for(var i3 = 0; i3 < col1; i3++){
        res[i1][i2] += matrix1[i1][i3] * matrix2[i3][i2];
      }
    }
  }

  return res;
}

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
    this.cntr = CalVec(SumT(vertexes,"v"),[l,l,l],"/");
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
  var max = dotA.reduce((a,b) => Math.max(a,b));
  var Imax = dotA.indexOf(max);
  
  for(var i of Pb.vrtxs){
    dotB.push(CalVec(i,d,"*"));
  }
  var min = dotB.reduce((a,b) => Math.min(a,b));
  var Imin = dotB.indexOf(min);
  return CalVec(CalVec(CalVec(Pa.vrtxs[Imax],Pb.vrtxs[Imin],"-"),Pa.cntr,"+"),Pb.cntr,"-");
}

var SppA = support(PolygonA,PolygonB,[1,0,0]);
var SppB = support(PolygonA,PolygonB,[-1,0,0]);
console.log(SppA,SppB);

function collision(Pa,Pb){
  var d = Calvec(Pa.cntr,Pb.cntr,"-");
  var simplex = [];
  var p = support(Pa,Pb,d);
  simplex.push(p);
  d = Calvec([0,0,0],p,"-")
  while(){
    var newVrtx = support(Pa,Pb,d);
    simplex.push(newVrtx);
    if(simplex.length > 2){
      var absolute = [];
      for(var i of simplex){
        absolute.push(i[0]*i[0] + i[1]*i[1]);
      }
      var max = absolute.reduce((a,b) => Math.max(a,b));
      var Imax = absolute.indexOf(max);
      delete simplex[Imax];
    }
    /*if(simplex.length == 3){
      for(var i of simplex){
        if(CalVec(CalVec([0,0,0],i,"-"),CalVec()))
      }
    }*/
    if(CalVec(d,newVrtx) < 0){
      return false;
      break
    } 
    var tmp = Calvec(simplex[0],simplex[1],"-");
    d = [-tmp[1],tmp[0]];
    if(CalVec(p,d,"*") > 0){
      d = [tmp[1],-tmp[0]];    
    }
  }
}

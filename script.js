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

function CalVec(Va,operator,Vb){
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
        ans = CalVec(ans,"+",i);
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
    this.cntr = CalVec(SumT(vertexes,"v"),"/",[l,l,l]);
    for(var i of vertexes){
      this.vrtxs.push(CalVec(i,"-",this.cntr));
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
    dotA.push(CalVec(i,"*",d));
  }
  var max = dotA.reduce((a,b) => Math.max(a,b));
  var Imax = dotA.indexOf(max);
  
  for(var i of Pb.vrtxs){
    dotB.push(CalVec(i,"*",d));
  }
  var min = dotB.reduce((a,b) => Math.min(a,b));
  var Imin = dotB.indexOf(min);
  return CalVec(CalVec(CalVec(Pa.vrtxs[Imax],"-",Pb.vrtxs[Imin]),"+",Pa.cntr),"-",Pb.cntr);
}

var SppA = support(PolygonA,PolygonB,[1,0,0]);
var SppB = support(PolygonA,PolygonB,[-1,0,0]);
console.log(SppA,SppB);

function GJK(Pa,Pb){
  var d = CalVec(Pa.cntr,"-",Pb.cntr);
  var simplex = [];
  var p = support(Pa,Pb,d);
  simplex.push(p);
  d = CalVec([0,0,0],"-",p)
  var t = false
  while(t == false){
    var newVrtx = support(Pa,Pb,d);
    simplex.push(newVrtx);
    if(simplex.length > 2){
      var AB = CalVec(simplex[0],"-",simplex[1]);
      var Vc = CalVec(simplex[0],"*",[-AB[1],AB[0],0])>0 ? [AB[1],-AB[0],0] : [-AB[1],AB[0],0];
      var BC = CalVec(simplex[1],"-",simplex[2]);
      var Va = CalVec(simplex[1],"*",[-BC[1],BC[0],0])>0 ? [BC[1],-BC[0],0] : [-BC[1],BC[0],0];
      var CA = CalVec(simplex[2],"-",simplex[0]);
      var Vb = CalVec(simplex[2],"*",[-CA[1],CA[0],0])>0 ? [CA[1],-CA[0],0] : [-CA[1],CA[0],0];
      if(CalVec(simplex[2],"*",Vc)>=0 && CalVec(simplex[0],"*",Va)>=0 && CalVec(simplex[1],"*",Vb)>=0){
        t = true;
        return simplex;
        break;
      }
      var absolute = [];
      for(var i of simplex){
        absolute.push(i[0]*i[0] + i[1]*i[1]);
      }
      var max = absolute.reduce((a,b) => Math.max(a,b));
      var Imax = absolute.indexOf(max);
      //delete simplex[Imax];
      simplex.splice(Imax,1);
    }
    if(CalVec(d,"*",newVrtx) < 0){
      t = true;
      return false;
      break;
    } 
    var tmp = CalVec(simplex[0],"-",simplex[1]);
    d = CalVec(simplex[0],"*",[-tmp[1],tmp[0],0])>0 ? [tmp[1],-tmp[0],0] : [-tmp[1],tmp[0],0];
  }
}

function EPA(Pa,Pb,simplex){
  var t = false;
  var preD = -1
  var Vrtxs = simplex;
  while(t == false){
    var l = Vrtxs.length;
    var Vlist = [];
    for(var i=0;i<l;i++){
      var A = Vrtxs[i%l];
      var B = Vrtxs[(i+1)%l];
      var AB = CalVec(A,"-",B);
      var V = [-AB[1],AB[0],0];
      var AbsV = CalVec(A,"*",V)/CalVec(V,"*",V);
      V = [AbsV*V[0],AbsV*V[1],0];
      Vlist.push(V);
    }
    var min = Vlist.reduce((a,b) => Math.min(CalVec(a,"*",a),CalVec(b,"*",b))==CalVec(a,"*",a) ? a : b);
    var Imin = Vlist.indexOf(min);
    var d = Vlist[Imin];
    var newVrtx = support(Pa,Pb,d);
    Vrtxs.includes(newVrtx) ? t = false : Vrtxs.push(newVrtx);
    if(preD == -1){
      preD = d;
    }else if(CalVec(preD,"*",preD) == CalVec(d,"*",d)){
      t = true;
      return d;
    }else{
      preD = d;
    }
  }
}

function drawPolygon(Polygon,dim = "2d"){
  var cntr = Polygon.cntr;
  const height = 1000;
  const width  = 1000;

    // canvasのお作法
  const cvs = document.getElementById('canvas');  // canvas要素への参照の取得
             // コンテキストの取得
  cvs.width = width;
  cvs.height = height;
  if(dim == "2d"){
    const ctx = cvs.getContext('2d'); 
    var vrtxs = Polygon.vrtxs;
    var l = vrtxs.length;
    for(var i=0;i<l;i++){
      var j = (i+1)%l
      ctx.beginPath();
      ctx.moveTo(vrtxs[i][0], vrtxs[i][1]);   // ペンを点Iへ移動
      ctx.lineTo(vrtxs[j][0], vrtxs[j][1]);   // 点Iから点Jへ線を引く
      ctx.stroke();
    }
  }
}

for(var i=0;i<20;i++){
  if(GJK(PolygonA,PolygonB) == false){
    console.log(i*0.5,"false");
  }else{
    var simplex = GJK(PolygonA,PolygonB);
    var d = EPA(PolygonA,PolygonB,simplex);
    console.log(i*0.5,"true   d = ",d);
  }
  PolygonB.cntr[1] += 0.5;
}


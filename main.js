console.log("Hello World main.js");
console.log(CalVec([1,1],"+",[4,3]));
/*const cvs = document.getElementById('canvas'); 
const ctx = cvs.getContext("2d");
ctx.translate(0,cvs.height); 
ctx.scale(1,-1)*/
var PolygonA = new polygon([[4,11,0],[4,5,0],[9,9,0]]);
var PolygonB = new polygon([[5,7,0],[7,3,0],[10,2,0],[12,7,0]])
var PolygonList = [PolygonA,PolygonB];
console.log(PolygonA);
console.log(PolygonB);
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
update(PolygonList);

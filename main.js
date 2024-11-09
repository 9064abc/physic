console.log("Hello World main.js");
console.log(CalVec([1,1],"+",[4,3]));
/*const cvs = document.getElementById('canvas'); 
const ctx = cvs.getContext("2d");
ctx.translate(0,cvs.height); 
ctx.scale(1,-1)*/
var PolygonA = new polygon([[16,44,0],[16,20,0],[36,36,0]],0);
var PolygonB = new polygon([[20,28,0],[28,12,0],[40,8,0],[48,28,0]],1)
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
  PolygonB.cntr[1] += 2;
}
update(PolygonList);
const interval = setInterval(
  function(){
    update(PolygonList);
    console.log(PolygonList[0].cntr,PolygonList[0].v);
  }
  ,400
);

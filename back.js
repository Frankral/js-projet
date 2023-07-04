function getValueInput(element, elementAff, oldVal, signed) {
    element.addEventListener('keyup', (evt)=>{
        sign = (element.value > 0 || element.value === '0')? "+" : "";
        if(element.value != ''){
            elementAff.innerHTML = (signed)? sign + element.value: element.value;
        } else{
            elementAff.innerHTML = (signed)? sign + oldVal: oldVal;
        }
    });
}

function getValueForm(form, rep){
    let frmdt = new FormData(form);
    let data = [];
    for( const [key, value] of frmdt ){
        if(value == ""){
            rep.innerHTML = "Aucune solution, veuillez remplir les champs correctement";
            return;
        } else{
            data.push(value);
        }
    }
    return data;
}



// equation du second degre

class SecondResolver{
    constructor(a, b, c){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    resolve(){
        let delta = this.b*this.b - 4 * this.a * this.c;
        if(delta < 0){
            return [];
        }
        else if(delta == 0){
            let rep = (-this.b)/(2*this.a);
            return [rep.toFixed(2)];
        } else{
            let rep1 = (-this.b - Math.sqrt(delta))/(2*this.a);
            let rep2 = (-this.b + Math.sqrt(delta))/(2*this.a);
            return [rep1.toFixed(2), rep2.toFixed(2)];
        }
    }
}
const sender = document.getElementById("2DegSender");
const form2 = document.getElementById('form2deg');
const equa2af = document.getElementsByName('equa2a');
const equa2a = document.getElementById('equa2a');
const equa2bf = document.getElementsByName('equa2b');
const equa2b = document.getElementById('equa2b');
const equa2cf = document.getElementsByName('equa2c');
const equa2c = document.getElementById('equa2c');

const equa2rep = document.getElementById('equa2rep');

sender.addEventListener('click', ()=>{
    let data = getValueForm(form2, equa2rep);
    const sres = new SecondResolver(data[0], data[1], data[2]);
    let val = sres.resolve();
    if(val.length == 0){
        equa2rep.innerHTML = "Aucune solution";
    } else if(val.length == 1){
        equa2rep.innerHTML = "x: " +  val[0];
    } else{
        equa2rep.innerHTML = "x': " +  val[0] + "<br/>x\":" + val[1];
    }
});

getValueInput(equa2af[0], equa2a, 'a', false);
getValueInput(equa2bf[0], equa2b, '+b', true);
getValueInput(equa2cf[0], equa2c, '+c', true);



// Systeme d'equation a trois inconnus

class Sys3Resolver{
    constructor(a, b, c, d){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    resolve(){
        let b1, c1, d1, b2, c2, d2, c2p, d2p;
        b1 = this.b[0] - (this.a[0]/this.a[1] * this.b[1]);
        c1 = this.c[0] - (this.a[0]/this.a[1] * this.c[1]);
        d1 = this.d[0] - (this.a[0]/this.a[1] * this.d[1]);
        
        b2 = this.b[0] - (this.a[0]/this.a[2] * this.b[2]);
        c2 = this.c[0] - (this.a[0]/this.a[2] * this.c[2]);
        d2 = this.d[0] - (this.a[0]/this.a[2] * this.d[2]);

        c2p = c1 - (b1/b2 * c2);
        d2p = d1 - (b1/b2 * d2);

        let z = d2p / c2p;
        let y = (d1 - c1*z) / b1;
        let x = (this.d[0] - this.b[0]*y - this.c[0]*z) / this.a[0];
        if(isNaN(x)||isNaN(y)||isNaN(z)){
            return [];
        }
        return [x.toFixed(2), y.toFixed(2), z.toFixed(2)];
    }

    resolve_cramer(){
        let delta = this.a[0]*this.b[1]*this.c[2] + this.b[0]*this.c[1]*this.a[2] + this.c[0]*this.a[1]*this.b[2] - this.a[2]*this.b[1]*this.c[0] - this.b[2]*this.c[1]*this.a[0] - this.c[2]*this.a[1]*this.b[0];
        if(delta != 0){
            let deltaz = this.a[0]*this.b[1]*this.d[2] + this.b[0]*this.d[1]*this.a[2] + this.d[0]*this.a[1]*this.b[2] - this.a[2]*this.b[1]*this.d[0] - this.b[2]*this.d[1]*this.a[0] - this.d[2]*this.a[1]*this.b[0];
            let deltay = this.a[0]*this.d[1]*this.c[2] + this.d[0]*this.c[1]*this.a[2] + this.c[0]*this.a[1]*this.d[2] - this.a[2]*this.d[1]*this.c[0] - this.d[2]*this.c[1]*this.a[0] - this.c[2]*this.a[1]*this.d[0];
            let deltax = this.d[0]*this.b[1]*this.c[2] + this.b[0]*this.c[1]*this.d[2] + this.c[0]*this.d[1]*this.b[2] - this.d[2]*this.b[1]*this.c[0] - this.b[2]*this.c[1]*this.d[0] - this.c[2]*this.d[1]*this.b[0]; 
            return [(deltax/delta).toFixed(2), (deltay/delta).toFixed(2), (deltaz/delta).toFixed(2)];
        }
        return [];

    }
}

let val3a = document.getElementsByClassName('a3val');
let val3b = document.getElementsByClassName('b3val');
let val3c = document.getElementsByClassName('c3val');
let val3d = document.getElementsByClassName('d3val');
let inp3a = document.getElementsByClassName('a3');
let inp3b = document.getElementsByClassName('b3');
let inp3c = document.getElementsByClassName('c3');
let inp3d = document.getElementsByClassName('d3');
let sys3send = document.getElementById('Sys3Sender');
let form3 = document.getElementById('form3sys');
let rep3sys = document.getElementById('equa3rep');

getValueInput(inp3a[0], val3a[0], 'a', false);
getValueInput(inp3a[1], val3a[1], 'a\'', false);
getValueInput(inp3a[2], val3a[2], 'a\"', false);

getValueInput(inp3b[0], val3b[0], '+b', true);
getValueInput(inp3b[1], val3b[1], '+b\'', true);
getValueInput(inp3b[2], val3b[2], '+b\"', true);

getValueInput(inp3c[0], val3c[0], '+c', true);
getValueInput(inp3c[1], val3c[1], '+c\'', true);
getValueInput(inp3c[2], val3c[2], '+c\"', true);

getValueInput(inp3d[0], val3d[0], 'd', false);
getValueInput(inp3d[1], val3d[1], 'd\'', false);
getValueInput(inp3d[2], val3d[2], 'd\"', false);

sys3send.addEventListener('click', ()=>{
    let data = getValueForm(form3, rep3sys);
    let resSys = new Sys3Resolver([data[0], data[1], data[2]], 
        [data[3], data[4], data[5]], 
        [data[6], data[7], data[8]],
        [data[9], data[10], data[11]]);
    let val = resSys.resolve_cramer();
    if(val.length !== 0){
        rep3sys.innerHTML = "x: " + val[0] + "<br/>y: " + val[1] + "<br/>z: " + val[2];
    } else {
        rep3sys.innerHTML = "Aucune solution";
    }
});





// advertisement
let adbox = document.querySelectorAll(".adbox");
let adclosed = document.getElementsByClassName("adClosed");
let adbigbox = document.getElementById('adBigBox');

let i = 0;
function show_ads(){
    if(i > 0) adbox[i-1].style.zIndex = 0;
    else adbox[9].style.zIndex = 0;
    adbox[i].style.zIndex = 10;
    i++;
    if(i >= 10) i = 0;
}

function loop_ads(){
    return setInterval(show_ads, 1000);
}


let intervalAds;

setTimeout(()=>{
    intervalAds = loop_ads();
    adbigbox.style.display = 'flex';
}, 3000);


function dispose_ads(){
    clearInterval(intervalAds);
    adbox.forEach(ad => {
        ad.style.display = "none"
        adclosed[0].style.display = "block";
    });   
}

let svgs = document.querySelectorAll("#adBigBox > div > svg");
svgs.forEach(svg => {
    svg.addEventListener("click", dispose_ads);
});

let reAd = document.getElementById("reAds");

reAd.addEventListener('click', ()=>{
    intervalAds = loop_ads();
    adbox.forEach(ad => {
        ad.style.display = "block";
        adclosed[0].style.display = "none";
    }); 
});
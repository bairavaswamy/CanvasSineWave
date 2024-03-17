const gui = new dat.GUI();
const canvas = document.querySelector("canvas")
const app = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const wave = {
    "y":innerHeight/2,
    "waveLength":0.01,
    "amplitude":100,
    "frequency":0.01
}
const waves = gui.addFolder("waves")
waves.add(wave,"y",0,innerHeight)
waves.add(wave,"waveLength",-0.01,0.01)
waves.add(wave,"amplitude",-300,300)
waves.add(wave,"frequency",-0.001,0.01)
waves.open();

const waveColor= {
    h:100,
    s:50,
    l:50
}

const waveColors = gui.addFolder("waveColors");
waveColors.add(waveColor,"h",0,360);
waveColors.add(waveColor,"s",0,100);
waveColors.add(waveColor,"l",0,100);
waveColors.open()

const backgroundColor = {
    r:100,
    g:100,
    b:100,
    a:0.03
}
const backgroundColors = gui.addFolder("backgroundColors");
backgroundColors.add(backgroundColor,"r",0,255)
backgroundColors.add(backgroundColor,"g",0,255)
backgroundColors.add(backgroundColor,"b",0,255)
backgroundColors.add(backgroundColor,"a",0.01,1)
backgroundColors.open()

let increseFrec = wave.frequency;
function animate(){
    requestAnimationFrame(animate)
    app.fillStyle = `rgba(${backgroundColor.r},
        ${backgroundColor.g},
        ${backgroundColor.b},
        ${backgroundColor.a})`;
    // draw
    app.fillRect(0,0,innerWidth,innerHeight)
    app.beginPath();
    app.moveTo(0,canvas.height/2);
    for(let i=0;i<canvas.width;i++){
        app.lineTo(i,wave.y + Math.sin(i*wave.waveLength + increseFrec) * wave.amplitude*Math.sin(increseFrec))
    }
    app.strokeStyle = `hsl(${Math.abs(waveColor.h * Math.sin(increseFrec))},${waveColor.s}%,${waveColor.l}%)`
    app.stroke()
    increseFrec += wave.frequency
}
animate()
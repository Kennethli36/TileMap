// Canvas still Maintains 480px even after scaling auto sizing height / weight.

var canvas = document.querySelector("canvas");
var tilesetContainer = document.querySelector(".tileset-container");
var tilesetSelection = document.querySelector(".tileset-container-selection");
var tilesetImage = document.querySelector("#tileset-source");
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
console.log(vw);

var selection = [0,0];  // selection of tile from menu, (x,y) coordinates

var currentLayer = 0;

var sizeOfCrop = 32;


//Structure is "x-y": ["tileset_x,"tileset_y"]
// ex: "1-1", [3,4] ,          "1-1" canvas Tile Selected , [3,4] Menu Option
var layers = [  
    //bottom
    {},
    //Middle 
    {},
    //Top
    {}

];



// Draw All.
function draw() {
    var ctx = canvas.getContext("2d")
    ctx.clearRect(0,0, canvas.width, canvas.height);
    

// arrow syntax
// (params) => ({foo: "a"})  , Not even needed cus we not naming function , parameter = () =>{}

// foreach object, object.keys.

    layers.forEach(layers => {                      //Not the Value, But Keys
        Object.keys(layers).forEach(key =>{  // Object.keys(Returns An Array of "Keys" from object)
            var positionX = Number(key.split("-")[0]) // Split returns into an [Array of subStrings]
            var positionY = Number(key.split("-")[1])   // After spliting , Key[0]

            var [tilesheetX, tilesheetY] = layers[key]; //accessOBJ keys and destructure.
            //The destructuring assignment syntax is a JavaScript expression that makes it 
            // possible to unpack values from arrays, or properties from objects,
            // into distinct variables.
            /*let a, b, rest;
                [a, b] = [10, 20];

                console.log(a); // a = 10 now.
                */
            

                // Oh idk.... Leave it at 32...... Size of crop Dont belong here LOL...
                // Image passed in still same Size.. So no need change anything else.
            ctx.drawImage(
                tilesetImage,
                tilesheetX * 32, tilesheetY * 32, // Start position of Source (x,y)
                32, 32,          // size width,height of source to Grab
                positionX * 32, positionY * 32, // Where to place on canvas
                32, 32      // WxH of Size You want it on canvas-> can stretch
            )
        })
    })
}
                // e.target = element that dispatch the event.
                // current listerner who is processing = event.currentTarget
                // can get tricky if u have alot of child elements.. on the binding event.

                //                   Top , left
                //getBoundingClientRect , X, Y of Element Clicked on. e.target
// HELPER FUNCTION COORDINATES [CLICKED EVENT]
function getCoords(event) {     // getBoundingClientRect , X, Y Coordinates of Current Listener
    const {x , y} = event.target.getBoundingClientRect(); // object destructure works too..
    console.log(x,y);
    const mouseX = event.clientX - x;  // sounds correct, Horzontial mouseClickX coordinates - x
    const mouseY = event.clientY - y;
    return [ Math.floor(mouseX/sizeOfCrop), Math.floor(mouseY/sizeOfCrop)];
}



// SELECTION MENU
// Add listener to this event , so not every element is listening?? could be false and is probably.
tilesetContainer.addEventListener("mousedown", event => {
    console.log( getCoords(event) );
    selection = getCoords(event);       //              [x,y] of tile that was [click event].

    tilesetSelection.style.left = selection[0] * sizeOfCrop + "px";
    tilesetSelection.style.top = selection[1] * sizeOfCrop + "px";
})

// Canvas Listeners
var isMouseDown = false;
canvas.addEventListener("mousedown", ()=> {
    isMouseDown = true;
});
canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
})
canvas.addEventListener("mouseleave", () => {
    isMouseDown = false;
})

canvas.addEventListener("mousedown", addTiles);
canvas.addEventListener("mousemove", event => {
    if (isMouseDown) {
        addTiles(event);
    }
})


// Add.Delete Tiles + Enter Coordinates to Layers{}
function addTiles(mouseEvent) {
    var clicked = getCoords(mouseEvent);       // [x,y] of tile that was [clicked event]
    var key = clicked[0] + "-" + clicked[1];    // convert array[access] to string like this? +concating

    if (mouseEvent.shiftKey) {
        delete layers[currentLayer][key]; // delete javascript - deletes objects
    } else {
        layers[currentLayer][key] = [ selection[0],selection[1] ]      // add within layer[], 
    }                                                          // object['property'] instead of obj.key
    draw();
}

// Pick Layers.
function setLayer(newLayer) {

    currentLayer = newLayer;

    var oldActive = document.querySelector(".layer.active");
    if (oldActive) {
        oldActive.classList.remove("active");   // remove active css.
    }
    document.querySelector(`[tile-layer="${currentLayer}"]`).classList.add("active"); // add class active,
    // to currentLayer , tile-layer={} same layer.
}

function clearCanvas() {
    layers = [{},{},{}]; // Reset Layers.
    draw();                 // draw it back.
}

function exportImage() {
    var data = canvas.toDataURL();
    var image = new Image();

    image.src = data;

    var w = window.open("");
    w.document.write(image.outerHTML);
}

//Default image for booting up -> Just looks nicer than loading empty canvas
var defaultState = [{"0-4":[3,2],"1-4":[4,2],"2-4":[4,2],"3-4":[4,2],"4-4":[4,1],"5-5":[4,2],"6-5":[4,2],"7-5":[4,2],"8-5":[4,2],"9-5":[4,2],"10-5":[4,2],"11-6":[3,2],"12-6":[4,2],"13-6":[4,2],"14-6":[4,2],"12-5":[4,1],"5-4":[4,1],"3-3":[4,1],"0-3":[4,1],"1-3":[4,1],"4-3":[4,1],"5-3":[4,1],"7-3":[4,1],"8-3":[4,1],"9-3":[4,1],"10-3":[4,1],"10-4":[4,1],"11-4":[4,1],"11-5":[4,1],"4-5":[3,2],"2-3":[4,1],"6-3":[4,1],"11-3":[4,1],"12-3":[4,1],"13-3":[4,1],"14-3":[4,1],"6-4":[4,1],"7-4":[4,1],"8-4":[4,1],"9-4":[4,1],"12-4":[4,1],"13-4":[4,1],"14-4":[4,1],"13-5":[4,1],"14-5":[4,1],"14-2":[4,1],"13-2":[4,1],"12-2":[4,1],"11-2":[4,1],"10-2":[4,1],"9-2":[4,1],"8-2":[4,1],"7-2":[4,1],"6-2":[4,1],"5-2":[4,1],"4-2":[4,1],"3-2":[4,1],"2-2":[4,1],"1-2":[4,1],"0-2":[4,1],"0-1":[4,1],"1-1":[4,1],"2-1":[4,1],"3-1":[4,1],"4-1":[4,1],"6-1":[4,1],"8-1":[4,1],"9-1":[4,1],"10-1":[4,1],"11-1":[4,1],"12-1":[4,1],"13-1":[4,1],"14-1":[4,1],"7-1":[4,1],"5-1":[4,1],"0-0":[4,1],"1-0":[4,1],"2-0":[4,1],"3-0":[4,1],"4-0":[4,1],"5-0":[4,1],"6-0":[4,1],"7-0":[4,1],"8-0":[4,1],"9-0":[4,1],"10-0":[4,1],"11-0":[4,1],"12-0":[4,1],"13-0":[4,1],"14-0":[4,1],"14-14":[2,6],"7-14":[3,6],"6-14":[2,6],"5-14":[3,6],"4-13":[3,6],"3-13":[2,6],"1-11":[2,10],"1-10":[2,10],"0-8":[0,6],"0-10":[2,10],"3-10":[3,6],"4-10":[2,6],"0-5":[3,6],"0-6":[0,6],"0-7":[1,6],"0-9":[1,6],"0-11":[2,10],"0-12":[2,10],"0-13":[2,10],"0-14":[0,6],"1-14":[1,6],"1-13":[2,10],"1-12":[3,6],"1-9":[2,6],"1-8":[1,6],"1-7":[0,6],"1-6":[3,6],"1-5":[2,6],"2-5":[3,6],"2-6":[2,6],"2-7":[3,6],"2-8":[0,6],"2-9":[3,6],"2-13":[2,10],"2-14":[0,6],"3-14":[1,6],"3-12":[3,6],"3-11":[2,6],"3-9":[2,6],"3-8":[3,6],"3-7":[2,6],"3-6":[3,6],"3-5":[2,6],"4-6":[2,6],"4-7":[3,6],"4-8":[2,6],"4-9":[3,6],"4-11":[3,6],"4-12":[2,6],"4-14":[2,6],"5-13":[2,6],"5-12":[4,10],"5-11":[4,10],"5-10":[4,10],"5-9":[4,10],"5-8":[3,6],"5-7":[2,6],"5-6":[3,6],"6-6":[2,6],"6-7":[3,6],"6-8":[2,6],"6-9":[4,10],"6-10":[4,10],"6-11":[4,10],"6-12":[4,10],"6-13":[3,6],"7-13":[2,6],"7-12":[4,10],"7-10":[4,10],"7-9":[4,10],"7-8":[3,6],"7-7":[2,6],"7-6":[3,6],"8-6":[2,6],"8-7":[3,6],"8-10":[4,10],"8-11":[4,10],"8-12":[4,10],"8-14":[2,6],"8-13":[3,6],"9-14":[3,6],"9-13":[2,6],"9-12":[4,10],"9-11":[4,10],"9-10":[4,10],"9-7":[2,6],"9-6":[3,6],"10-7":[3,6],"10-8":[2,6],"10-9":[3,6],"10-10":[2,6],"10-11":[3,6],"10-12":[2,6],"10-13":[3,6],"10-14":[2,6],"10-6":[2,6],"11-7":[2,6],"12-7":[3,6],"13-7":[2,6],"14-7":[2,6],"14-8":[2,6],"14-9":[3,6],"14-10":[4,3],"14-11":[4,4],"14-12":[2,6],"14-13":[3,6],"13-14":[3,6],"12-14":[2,6],"11-14":[3,6],"11-13":[2,6],"12-13":[3,6],"13-13":[2,6],"13-12":[3,6],"12-12":[2,6],"11-12":[3,6],"11-11":[2,6],"12-11":[3,6],"13-11":[4,4],"13-10":[2,6],"12-10":[2,6],"11-10":[3,6],"12-9":[3,6],"13-9":[2,6],"13-8":[3,6],"12-8":[2,6],"11-9":[2,6],"11-8":[3,6],"2-10":[2,10],"2-11":[2,10],"2-12":[2,10],"8-9":[4,10],"8-8":[4,10],"9-9":[4,10],"9-8":[4,10],"7-11":[4,10]},{"5-9":[2,7],"6-9":[2,7],"7-9":[2,7],"3-9":[0,6],"3-11":[0,6],"3-13":[0,6],"1-9":[0,6],"2-9":[1,6],"1-10":[1,7],"3-10":[1,6],"3-12":[1,6],"2-10":[1,7],"1-12":[2,10],"0-8":[1,2],"1-8":[1,2],"2-8":[1,2],"2-7":[2,1],"2-6":[2,0],"1-6":[1,0],"0-6":[1,0],"1-7":[1,1],"0-7":[1,1],"11-11":[3,3],"12-11":[4,3],"13-11":[4,4],"14-11":[4,4],"11-12":[3,4],"11-13":[3,5],"12-13":[4,5],"13-13":[4,5],"14-13":[4,5],"12-12":[4,4],"13-12":[4,4],"14-12":[4,4],"0-10":[0,7],"13-10":[3,3],"11-5":[3,1],"4-4":[3,1],"8-8":[2,7],"9-8":[2,7]},{"0-5":[4,12],"1-5":[4,12],"2-5":[4,12],"3-5":[4,12],"4-6":[4,12],"5-6":[4,12],"6-6":[4,12],"7-6":[4,12],"8-6":[4,12],"9-6":[4,12],"10-6":[4,12],"11-7":[4,12],"12-7":[4,12],"13-7":[4,12],"14-7":[4,12],"0-9":[4,12],"1-9":[4,12],"2-9":[4,12],"11-14":[4,12],"12-14":[4,12],"13-14":[4,12],"14-14":[4,12],"6-2":[2,15],"6-3":[0,13],"7-3":[3,12],"8-3":[0,14],"9-3":[1,16],"10-3":[1,15],"11-3":[4,15],"4-2":[4,14],"5-2":[0,12],"4-1":[0,13],"3-1":[3,14],"1-1":[1,16],"2-1":[0,14],"11-1":[4,2],"12-1":[4,2],"13-1":[5,2],"11-0":[4,0],"12-0":[4,0],"13-0":[5,0],"10-1":[4,2],"9-1":[3,2],"10-0":[4,0],"9-0":[3,0],"9-2":[4,12],"10-2":[4,12],"11-2":[4,12],"12-2":[4,12],"13-2":[4,12],"5-13":[4,13],"9-13":[5,13],"6-13":[4,11],"7-13":[4,11],"8-13":[4,11],"0-14":[4,11],"1-14":[4,11],"2-14":[5,13]}];

function resizeContainer() {
    if (vw < 600) {
        tilesetSelection.style.width = `${(tilesetImage.offsetWidth)/6}` + "px";
        tilesetSelection.style.height = `${(tilesetImage.offsetHeight)/18}`+ "px";
        sizeOfCrop = (tilesetImage.offsetWidth)/6;
    }
}



tilesetImage.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png"


tilesetImage.onload = function() {
    resizeContainer();
    layers = defaultState;
    draw();
    setLayer(0);    
}



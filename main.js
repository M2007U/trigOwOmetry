//---- ---- ---- ---- html functions

//getElementbyID but shorter
function POwO_docgetel(InString)
{
    return document.getElementById(InString);
}

//---- ---- ---- ---- math functions

//math clamping
function POwO_Math_Clamp(InMin, InVal, InMax)
{
    
    //return Math.max(InMin, Math.min(InVal, InMax) );
    if (InVal > InMax)
    {
        return InMax;
    }
    else if (InVal < InMin)
    {
        return InMin;
    }
    else
    {
        return InVal;
    }

}

//math lerping
function POwO_Math_LERP(A, B, t)
{
    return (B-A) * t + A
}

//math lerping rev
function POwO_Math_LERPinv(A,B,V)
{
    let ReturnResult = 0;

    if (A==B)
    {
        ReturnResult = A;
    }
    else
    {
        ReturnResult = (V-A) / (B-A) 
    }
    
    return ReturnResult;
}

//math lerp Mapping
function POwO_Math_LERPmap(a,b,v,A,B)
{
    let t = POwO_Math_LERPinv(a,b,v);
    return POwO_Math_LERP(A,B,t);
}

// ---- ---- ---- ---- page function

function POwO_getMouse(event)
{
    const rect = canvas.getBoundingClientRect();

    return {
        temp_mouseX: event.clientX - rect.left,
        temp_mouseY: event.clientY - rect.top
    };
}

function POwO_Kanvas_DrawTag(inX, inY, inW, inH, inR, inTagColor, inTextString, inTextColor, inTextFont)
{
    //first the tag
    ctx.beginPath()
    ctx.fillStyle = inTagColor
    ctx.roundRect( inX - inW/2 , inY - inH/2 , inW, inH, inR )
    ctx.fill()

    //then the text
    ctx.font = inTextFont
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = inTextColor
    ctx.fillText(inTextString, inX, inY)
}

function POwO_RedrawAll()
{
    let temp_CenterX = canvas.width / 2
    let temp_CenterY = canvas.height / 2

    let temp_deltaX = GLOBAL_RingRadius * Math.cos(GLOBAL_Angle)
    let temp_deltaY = Math.sin(GLOBAL_Angle) * GLOBAL_RingRadius

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //draw the main ring
    ctx.beginPath();
    ctx.arc( temp_CenterX , temp_CenterY , GLOBAL_RingRadius, 0, Math.PI * 2); // Radius is the center of the ring's thickness
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    //text ready
    ctx.font = "20px Calibri"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    

    //draw tickmarks
    ctx.strokeStyle = "#FFFFFF"
    for(let i = 0 ; i < 360 ; i += 5)
    {
        ctx.beginPath();
        let temp_i_angle = i / 360 * Math.PI * 2
        ctx.moveTo( temp_CenterX + GLOBAL_RingRadius * Math.cos(temp_i_angle) , temp_CenterY - GLOBAL_RingRadius * Math.sin(temp_i_angle) )

        if (i % 15 === 0)
        {
            ctx.lineWidth = 3
            ctx.strokeStyle = "rgba(255,255,255,1)"
            ctx.fillStyle = "#FFFFFF"
            ctx.lineTo( temp_CenterX + (GLOBAL_RingRadius - GLOBAL_TickMarkSize) * Math.cos(temp_i_angle) , temp_CenterY - (GLOBAL_RingRadius - GLOBAL_TickMarkSize) * Math.sin(temp_i_angle) )
            ctx.fillText(i.toString() + "°", temp_CenterX + (GLOBAL_RingRadius + GLOBAL_TickMarkTextOffset) * Math.cos(temp_i_angle) , temp_CenterY - ( GLOBAL_RingRadius + GLOBAL_TickMarkTextOffset ) * Math.sin(temp_i_angle))
        }
        else
        {
            ctx.lineWidth = 1
            ctx.strokeStyle = "rgba(255,255,255,0.5)"
            ctx.lineTo( temp_CenterX + (GLOBAL_RingRadius - GLOBAL_TickMarkSize / 2 ) * Math.cos(temp_i_angle) , temp_CenterY - (GLOBAL_RingRadius - GLOBAL_TickMarkSize / 2) * Math.sin(temp_i_angle) )
        }
        
        
        ctx.stroke()
    }

    //draw XY axis
    ctx.beginPath()
    ctx.strokeStyle = "#FF0000"
    ctx.lineWidth = 1
    ctx.moveTo(temp_CenterX - GLOBAL_RingRadius, temp_CenterY)
    ctx.lineTo(temp_CenterX + GLOBAL_RingRadius, temp_CenterY)
    ctx.stroke()
    ctx.beginPath()
    ctx.strokeStyle = "#00FF00"
    ctx.lineWidth = 1
    ctx.moveTo(temp_CenterX , temp_CenterY - GLOBAL_RingRadius)
    ctx.lineTo(temp_CenterX , temp_CenterY + GLOBAL_RingRadius)
    ctx.stroke()
    

    //draw radius
    ctx.beginPath();
    ctx.moveTo( temp_CenterX , temp_CenterY )
    ctx.lineTo( temp_CenterX + temp_deltaX , temp_CenterY - temp_deltaY );
    ctx.lineWidth = 5
    ctx.strokeStyle = "#FFC000"
    ctx.stroke()

    //draw deltaX
    ctx.beginPath();
    ctx.moveTo( temp_CenterX , temp_CenterY )
    ctx.lineTo( temp_CenterX + temp_deltaX , temp_CenterY);
    ctx.lineWidth = 5
    ctx.strokeStyle = "#FF0000"
    ctx.stroke()

    //draw deltaY
    ctx.beginPath();
    ctx.moveTo( temp_CenterX + temp_deltaX , temp_CenterY )
    ctx.lineTo( temp_CenterX + temp_deltaX , temp_CenterY - temp_deltaY );
    ctx.lineWidth = 5
    ctx.strokeStyle = "#00C040"
    ctx.stroke()

    //draw handle
    ctx.beginPath();
    ctx.arc( temp_CenterX + temp_deltaX , temp_CenterY - temp_deltaY , GLOBAL_HandleRadius, 0, Math.PI * 2);
    ctx.lineWidth = 50;
    ctx.fillStyle = '#FFC000';
    ctx.strokeStyle = "rgba(255,192,0,0.25)"
    ctx.fill();
    ctx.stroke();
    
    //draw secondary handle
    ctx.beginPath();
    ctx.arc( temp_CenterX + temp_deltaX , temp_CenterY , GLOBAL_Handle2Radius, 0, Math.PI * 2);
    ctx.lineWidth = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    //draw origin point
    ctx.beginPath();
    ctx.arc( temp_CenterX, temp_CenterY , 8, 0, Math.PI * 2);
    ctx.lineWidth = 24;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = "rgba(255,255,255,0.25)"
    ctx.fill();
    ctx.stroke()

    //draw text to show line labels
    let temp_TagCoord_X = ( temp_CenterX * 2 + temp_deltaX ) / 2
    let temp_TagCoord_Y = (temp_CenterY * 2 - temp_deltaY) / 2
    POwO_Kanvas_DrawTag(temp_TagCoord_X, temp_TagCoord_Y, 80, 50, 16, "#302010","R = 1","#FFC000","20px Calibri")
    POwO_Kanvas_DrawTag(temp_TagCoord_X, temp_CenterY, 150, 50, 16, "#201010","Rcosθ = " + Math.cos(GLOBAL_Angle).toFixed(3),"#FF0000","20px Calibri")
    POwO_Kanvas_DrawTag(temp_CenterX + temp_deltaX, temp_TagCoord_Y, 150,50,16, "#102010", "Rsinθ = " + Math.sin(GLOBAL_Angle).toFixed(3),"#00C040", "20px Calibri" )
    
}



// ---- ---- ---- ---- SETUP

const canvas = document.getElementById("kanvas");
const ctx = canvas.getContext("2d");
const HTML_Body = POwO_docgetel("HTML_body")

var GLOBAL_RingRadius = 400
var GLOBAL_TickMarkSize = 20
var GLOBAL_Angle = 60/360 * 2 * Math.PI
var GLOBAL_HandleRadius = 16
var GLOBAL_Handle2Radius = 8
var GLOBAL_TickMarkTextOffset = 30
var GLOBAL_TagSize_W = 150
var GLOBAL_TagSize_H = 50

class ShOwOpe
{
    constructor(inPosX, inPosY, inPosZ, inType, inParam0, inParam1, inColorStroke, inStrokeWidth, inColorFill)
    {
        this.PosX = inPosX
        this.PosY = inPosY
        this.PosZ = inPosZ
        this.Type = inType
        this.Param0 = inParam0
        this.Param1 = inParam1
        this.ColorStroke = inColorStroke
        this.StrokeWidth = inStrokeWidth
        this.ColorFill = inColorFill
    }

    drawMe(inKanvasContext)
    {
        inKanvasContext.beginPath()

        switch (this.Type)
        {

            case "circle":
                inKanvasContext.arc(this.PosX, this.PosY, this.Param0, 0, Math.PI * 2);
            break;

            case "rect" :
                let temp_RadiusX = this.Param0 / 2
                let temp_RadiusY = this.Param1 / 2
                inKanvasContext.rect(this.PosX - temp_RadiusX , this.PosY - temp_RadiusY , this.Param0, this.Param1);
            break;
        
            default:
            break;
        }

        inKanvasContext.fillStyle = this.ColorFill;
        inKanvasContext.strokeStyle = this.ColorStroke;
        inKanvasContext.lineWidth = this.StrokeWidth;

        inKanvasContext.fill();
        inKanvasContext.stroke();
    }

    isInside(mouseX, mouseY)
    {
        switch(this.Type)
        {
            case "circle":
                let dx = mouseX - this.PosX;
                let dy = mouseY - this.PosY;
                return (dx*dx + dy*dy) <= (this.Param0*this.Param0);
            break;

            case "rect":
                let temp_RadiusX = this.Param0 / 2
                let temp_RadiusY = this.Param1 / 2

                return (
                    mouseX >= this.PosX - temp_RadiusX &&
                    mouseX <= this.PosX + temp_RadiusX &&
                    mouseY >= this.PosY - temp_RadiusY &&
                    mouseY <= this.PosY + temp_RadiusY
                );
            break;

            default: return false; break;
        }

        return false;
    }
}

canvas.addEventListener("mousedown", (event) => {

    const { temp_mouseX, temp_mouseY } = POwO_getMouse(event);

    for (let i = GLOBAL_shapeList.length - 1; i >= 0 ; i--)
    {
        if (GLOBAL_shapeList[i].isInside(temp_mouseX, temp_mouseY))
        {
            GLOBAL_selectedShape = GLOBAL_shapeList[i];
            console.log("selectedShape : " + JSON.stringify(GLOBAL_selectedShape))

            GLOBAL_dragOffsetX = temp_mouseX - GLOBAL_selectedShape.PosX;
            GLOBAL_dragOffsetY = temp_mouseY - GLOBAL_selectedShape.PosY;

            break;
        }
    }


});

canvas.addEventListener("mousemove", (event) => {

    if (!GLOBAL_selectedShape) return;

    const { temp_mouseX, temp_mouseY } = POwO_getMouse(event);

    GLOBAL_selectedShape.PosX = temp_mouseX - GLOBAL_dragOffsetX;
    GLOBAL_selectedShape.PosY = temp_mouseY - GLOBAL_dragOffsetY;

    POwO_RedrawAll();
});

canvas.addEventListener("mouseup", () => {
    GLOBAL_selectedShape = null;
    console.log("selectedShape : " + JSON.stringify(GLOBAL_selectedShape))
});

HTML_Body.addEventListener("mouseup", () => {
    GLOBAL_selectedShape = null;
    console.log("selectedShape : " + JSON.stringify(GLOBAL_selectedShape))
});

var GLOBAL_shapeList = [];
var GLOBAL_selectedShape = null;
var GLOBAL_dragOffsetX = 0;
var GLOBAL_dragOffsetY = 0;




// ---- ---- ---- ---- RUN MAIN

let smol_circle = new ShOwOpe(500, 500, 1, "circle", 50, -1, "rgba(0,0,0,0)", 0, "rgba(255,0,0,1)", ctx)
let smol_square = new ShOwOpe(800, 500, 1, "rect", 100, 100, "rgba(0,0,0,0)", 0, "rgba(0,0,255,1)", ctx)

GLOBAL_shapeList.push(smol_circle)
GLOBAL_shapeList.push(smol_square)

setInterval(()=>{

    GLOBAL_Angle += Math.PI * 2 * 1/360
    POwO_RedrawAll()
},10)



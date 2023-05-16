onload = () => {
    const canvas = document.getElementById("CANVAS");
    const ctx = canvas.getContext("2d");
    
    ctx.canvas.width = 400; //////
    ctx.canvas.height = 400; ////////

    ctx.fillStyle = 'white'; /////
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'black'; ////
    let brushSize = 2;

    const drawAt = (x, y) => {    
        ctx.fillRect(x - brushSize/2, y - brushSize/2, brushSize, brushSize); /////
    };

    const getMouseCoords = (data) => {
        const { x, y } = canvas.getBoundingClientRect();
        const curX = data.clientX - x;
        const curY = data.clientY - y;
        return [curX, curY];
    };

    let buttonPressed = false;
    let prevX = null;
    let prevY = null;

    onmousemove = (data) => {
        if (!buttonPressed) { return; }

        const [curX, curY] = getMouseCoords(data);

        if (prevX === null) {
            drawAt(curX, curY);
        } else {
            const dx = curX - prevX;
            const dy = curY - prevY;

            if (dx === 0 && dy === 0) { 
                drawAt(curX, curY);
            } else if (Math.abs(dy) > Math.abs(dx)) {
                for (let i = 0; i <= Math.abs(dy); i++) {
                    const rx = prevX + dx * i / Math.abs(dy); 
                    const ry = prevY + dy * i / Math.abs(dy); 
                    drawAt(rx, ry);
                }
            } else if (Math.abs(dx) >= Math.abs(dy)) {
                for (let i = 0; i <= Math.abs(dx); i++) {
                    const rx = prevX + dx * i / Math.abs(dx); 
                    const ry = prevY + dy * i / Math.abs(dx); 
                    drawAt(rx, ry);
                }
            }
        }

        prevX = curX;
        prevY = curY;
    };

    canvas.onmousedown = (data) => {
        if (data.button !== 0) { return; }
        buttonPressed = true;

        const [x, y] = getMouseCoords(data);
        drawAt(x, y);
    };

    onmouseup = (data) => {
        if (data.button !== 0) { return; }
        buttonPressed = false;
        prevX = null;
        prevY = null;
    };
    
    ////////////////////////
    let colorPick = document.getElementsByName("colorPick");
    for (let radio of colorPick) {     
        radio.onclick = function(event) {
            ctx.fillStyle = event.target.value;
        };
    }
    
    let sizePick = document.getElementsByName("sizePick");
    for (let radio of sizePick) {     
        radio.onclick = function(event) {
            brushSize = Number(event.target.value);
        };
    }
    
    function circle(xc, yc, r, strokeColor, fillColor) {
        let {x, y} = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.arc(xc - x, yc - y + r, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
    
//    function chebu() {
//        circle(ctx.canvas.width / 2, ctx.canvas.height / 2, 100, 'blue', 'green');
//    }
//    
//    let but1 = document.getElementById("but1");
//    but1.onclick = function() {
//        chebu();
//    };
    
    let but2 = document.getElementById("but2");
    let imgBox = document.getElementById("imgBox");
    but2.onclick = function() {
       let img = document.createElement("img");
       img.style.height = "100px";
       img.style.width = "100px";
       let pix = canvas.toDataURL("image/png");
       img.src = pix;
       imgBox.appendChild(img);
       //console.log(pix);
    };

};





var color = [
    '','red','blue','yellow','green', 'purple', 'pink', 'orange','green','orange'
]
var thap = document.querySelectorAll('.thap')
var thapPos = [[9, 8,7,6,5,4,3,2,1],[],[]]
var a = thapPos[0]
var b = thapPos[1]
var c = thapPos[2]
var form = document.querySelector('form')
function setForm(){
    var i = 1
    while(i<=9){
        form.innerHTML += `<input checked onclick="newGame(this); return false;" value="${i}" name="thap" type="radio">${i}</button>`
        i ++
    }
}
function newGame(e){
    console.clear()
    a = []
    var i = Number(e.value)
    while(i>0){
        a.push(i)
        i --
    }
    c = []
    b = []
    thapPos = [a,[],[]]
    printMap()
    e[i].checked = true
}
function newGames(e){
    console.clear()
    a = []
    var i = Number(e.value)
    while(i>0){
        a.push(i)
        i --
    }
    c = []
    b = []
    thapPos = [a,[],[]]
    printMap()
}
setForm()
function setColor(){
    var vong = document.querySelectorAll('.vong')
    var i = 0
    while (i < vong.length){
        var e = vong[i]
        var coLor = color[Number(e.style.getPropertyValue('--i'))]
        e.style.backgroundColor = coLor
        i ++
    }
}
function printMap(){
    var i = 0
    while(i < thapPos.length){
        thap[i].innerHTML = ''
        var j = thapPos[i].length - 1
        while(j >=0){
            thap[i].innerHTML += `<div class="vong" style="--i: ${thapPos[i][j]};--j: ${j};"></div>`
            j --
        }
        i ++
    }
    setColor()
    setTimeout(function(){
        checkwin()
    }, 100)
}
printMap()
setColor()
function atob(){
    if(b.length==0){
        b.push(a[a.length - 1])
        a.pop()
        thapPos = [a, b, c]
    }
    else if(b[b.length - 1]>a[a.length - 1]){
        b.push(a[a.length - 1])
        a.pop()
        thapPos = [a, b, c]
    }
    printMap()
}
function atoc(){
    if(c.length==0){
        c.push(a[a.length - 1])
        a.pop()
        thapPos = [a, b, c]
    }
    else if(c[c.length - 1]>a[a.length - 1]){
        c.push(a[a.length - 1])
        a.pop()
        thapPos = [a, b, c]
    }
    printMap()
}
function btoa(){
    if(a.length==0){
        a.push(b[b.length - 1])
        b.pop()
        thapPos = [a, b, c]
    }
    else if(a[a.length - 1]>b[b.length - 1]){
        a.push(b[b.length - 1])
        b.pop()
        thapPos = [a, b, c]
    }
    printMap()
}
function btoc(){
    if(c.length==0){
        c.push(b[b.length - 1])
        b.pop()
        thapPos = [a, b, c]
    }
    else if(c[c.length - 1]>b[b.length - 1]){
        c.push(b[b.length - 1])
        b.pop()
        thapPos = [a, b, c]
    }
    printMap()
}
function ctoa(){
    if(a.length==0){
        a.push(c[c.length - 1])
        c.pop()
        thapPos = [a, b, c]
    }
    else if(a[a.length - 1]>c[c.length - 1]){
        a.push(c[c.length - 1])
        c.pop()
        thapPos = [a, b, c]
    }
    printMap()
}
function ctob(){
    if(b.length==0){
        b.push(c[c.length - 1])
        c.pop()
        thapPos = [a, b, c]
    }
    else if(b[b.length - 1]>c[c.length - 1]){
        b.push(c[c.length - 1])
        c.pop()
        thapPos = [a, b, c]
    }
    printMap()
}
function move(e){
    printMap()
    var i = Number(e.getAttribute('x')) - 1
    if(i==0){
        var from = 'a'
        var to = ['b', 'c']
    }
    else if(i==1){
        var from = 'b'
        var to = ['a', 'c']
    }
    else{
        var from = 'c'
        var to = ['a', 'b']
    }
    thap[i].innerHTML += `
    <div class="move">
    <div class="text">
        Chọn cột bạn muốn di chuyển tới
    </div>
        <div class="select">
            <div class="option" onclick = '${from}to${to[0]}(); return false;'>${to[0].toUpperCase()}</div>
            <div class="option" onclick = '${from}to${to[1]}(); return false;'>${to[1].toUpperCase()}</div>
        </div>
    </div>
    `
}
function checkwin()
{
    if(thapPos[0].length==0&&thapPos[1].length==0){
        alert('Thắng!')
    }
}
var obj = {
    atob: function(){
        atob()
    },
    atoc: function(){
        atoc()
    },
    btoa: function(){
        btoa()
    },
    btoc: function(){
        btoc()
    },
    ctoa: function(){
        ctoa()
    },
    ctob: function(){
        ctob()
    }
}
var time = 0
function moveThap(n, a, b, c){
    if(n==1){
        var str = `${a}to${c}`
        time ++
        setTimeout(function(){obj[str]()}, time *200)
    }
    else{
        moveThap(n - 1, a, c, b)
        moveThap(1, a, b, c)
        moveThap(n - 1, b, a, c)
    }

}
function giai(){
    time = 0
    var i = a.length + b.length + c.length
    var e = {
        value: i
    }
    newGames(e)
    moveThap(i, 'a', 'b', 'c')
}
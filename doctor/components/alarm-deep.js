import { getDataFromDocs } from '../uitil.js'
const style =
    `
    <style>
    *{
        color: #59323c;
    }
    #input1, #input2, #input5{
        transform: rotate(270deg);
        margin-top: 10vh;
        cursor: pointer;
        border-radius: 20px;
        outline: none;
        width: 10vw;
        height: 0.4vw;
        appearance: none;
        outline-offset: 0px;
    }
    #input, #input3{
        width: 2vw;
        text-align: center;
        outline: none;
        border-radius: 5px;
        border: 0px solid black;
        font-size: 1.5rem;
        margin: 0.5vw;
        font-family: 'Lobster', cursive;
        background-color: white;
        color: #59323c;
    }
    .z{
        display: flex;
        justify-content: space-between;
        font-family: 'Lobster', cursive;
    }

    .o{
        font-size: 3em;
        color: black;
        font-family: sans-serif;
    }
    
    .target{
        font-size: 2rem;
        text-align: left;
        display: flex;
        font-family: 'Lobster', cursive;
        justify-content: space-between;
    }
    #will{
        font-size: 2rem;
        text-align: left;
        font-family: 'Lobster', cursive;
        margin-top: 1vw;
    }

    #bed{
        font-size: 2rem;
        text-align: left;
        margin-top: 5vw;
        margin-left: 1vw;
        background-color: white;
        border-radius: 10px;
        padding: 1vh;
        color: #59323c;
    }
    
    #ok{
        font-size: 2rem;
        text-align: left;
        margin-top: 5vw;
        padding: 1vh;
    }
    .sleep{
        display: flex;
        font-family: 'Lobster', cursive;
    }
    #error, #error1{
        margin-left: 5vw;
        font-size: 1rem;
        margin-top: 1vw;
        color: red;
    }
    #alarm{
        display: flex;
        justify-content: center;
        margin-top: 1vw;
    }
    #q{
        background-color: skyblue;
        margin-left: 1vw; 
        border-radius: 10px;
        padding: 1.5vw;
        width: 55vw;
        height: 81vh;
        transition: all 0.3s ease-in 0s;
    }
    .snooze{
        font-size: 2rem;
        text-align: left;
        padding: 1vh;
    }
    
    #input4{
        padding: 1vh;
        width: 3vw;
        cursor: pointer;
        appearance: none;
        outline: none;
        border-radius: 10px;
        background-color: blue;
        transition: all 0.2s ease-in 0s;
    }
    #on{
        padding: 1vw 0;
    }
    #area{
        text-align: left;
    }
    #c{
        width: 54vw;
        outline: none;
        border: 0px solid black;
        height: 16vh;
        resize: none;
        padding: 1vh;
        border-radius: 10px;
        font-size: 1.5rem;
        font-family: 'Audiowide', cursive;
    }
    #back{
        color: yellow;
        transition: all 0.3s ease-in 0s;
        
    }
    button{
        background: blue;
        color: white;
        padding: 10px 15px;
        border-radius: 10px;
        font-family: sans-serif;
        font-size: 1rem;
        outline: none;
        cursor: pointer;
    }

    
    </style>
`
const style_king =
    `
    <style>
    *{
        text-align: left;
    }
    .flex{
        color: #a02c2d;
        font-size: 1.5rem;
        font-weight: 800;
        margin-top: 1vh;
    }
    .king{
        font-size: 1.15rem;
        color: black;
    }
    </style>
`

class Deep extends HTMLElement {
    constructor() {
        super()
        this._deep = this.attachShadow({ mode: 'open' })
    }
    async connectedCallback() {
        let a = await firebase.firestore().collection('alarm').get()
        a = getDataFromDocs(a)[0]
        let b = 0
        let node = 0
        if (a.isShow === "off") {
            b = 2
        }
        else {
            b = 1
        }
        if (a.node)
        {
            node = a.node
        }
        else{
            node = `Take notes before bed: breakfast, exercise`
        }
        this.error = this.getAttribute('error') || ``
        this._deep.innerHTML =
            `
        <div id="q">
        <div class="target">
            <div>
                Your target: sleep for <input id="input" type="text" maxlength="1" value="${a.target}"> hours
            </div>
            <div id="error">
            </div>
            <button id="id">save</button>
        </div>

        <div id="will">
                You will wake up at:
        </div>

        <div id="alarm">
            <div class="o">
                <div id="hour">${a.alarm.substr(0, 2)}</div>
                <input id="input1" type="range" value="${Number(a.alarm.substr(0, 2))}" min="0" max="23">
            </div>
            <div class="o">:</div>
            <div class="o">
                <div id="minutes">${a.alarm.substr(-2, 2)}</div>
                <input id="input2" type="range" value="${Number(a.alarm.substr(-2, 2))}" min="0" max="59">
            </div>
        </div>    

        <div class="sleep">
            <div id="ok">                    
                You should go to bed at:
            </div>
            <div id="bed">
                ${a.sleep}
            </div>
        </div>

        <div class="z">
            <div class="snooze">
                Snooze:<input id="input3" type="text"  maxlength="1" value="5">minutes
            </div>
            <div id="error1">
            </div>
            <div id="on">
                 <input id="input4" type="range" max="2" min="1" value="${b}"> 
            </div>
        </div>
        
        <div id="area">
            <textarea placeholder="${node}" id="c"></textarea>
        </div>
    </div>
    ${style}
        `
        
        if (b === 2) {
            this._deep.getElementById("input4").style.backgroundColor = `white`
        }
        if (Number(a.alarm.substr(0, 2)) >= 18 || Number(a.alarm.substr(0, 2)) <= 5) {
            this._deep.getElementById('q').style.backgroundColor = `steelblue`
        }
        this._deep.getElementById("on").addEventListener("click", () => {
            let a = Number(this._deep.getElementById("input4").value)
            let b = this._deep.getElementById("input4")
            if (a === 1) {
                a = 2
                b.style.backgroundColor = `blue`
            }
            else {
                a = 1
                b.style.backgroundColor = `white`
            }
        })
        this._deep.getElementById("input1").addEventListener("mousemove", () => {
            let a = Number(this._deep.getElementById("input1").value)
            let b = Number(this._deep.getElementById("input2").value)
            let c = Number(this._deep.getElementById("input").value)
            let d = 0
            let e = 0
            if (b >= 15) {
                e = b - 15
            } else {
                e = 15 - b
                e = 60 - e
                c = c + 1
            }
            if (a >= c) {
                d = a - c
            } else {
                d = c - a
                d = 24 - d
            }
            if (a < 10) {
                a = `0${a}`
            }
            if (b < 10) {
                b = `0${b}`
            }
            if (d < 10) {
                d = `0${d}`
            }
            if (e < 10) {
                e = `0${e}`
            }
            this._deep.getElementById("bed").innerHTML = `${d}:${e}`

            this._deep.getElementById("hour").innerHTML = a
            if (a >= 18 || a <= 5) {


                this._deep.getElementById('q').style.backgroundColor = `steelblue`
            }
            else {

                this._deep.getElementById("q").style.backgroundColor = `skyblue`
            }

        })
        this._deep.getElementById("input2").addEventListener("mousemove", () => {
            let b = Number(this._deep.getElementById("input2").value)
            let a = Number(this._deep.getElementById("input1").value)
            let c = Number(this._deep.getElementById("input").value)
            let d = 0
            let e = 0
            if (b >= 15) {
                e = b - 15
            } else {
                e = 15 - b
                e = 60 - e
                c = c + 1
            }
            if (a < 10) {
                a = `0${a}`
            }
            if (a >= c) {
                d = a - c
            } else {
                d = c - a
                d = 24 - d
            }
            if (a < 10) {
                a = `0${a}`
            }
            if (b < 10) {
                b = `0${b}`
            }
            if (d < 10) {
                d = `0${d}`
            }
            if (e < 10) {
                e = `0${e}`
            }

            this._deep.getElementById("bed").innerHTML = `${d}:${e}`
            this._deep.getElementById("minutes").innerHTML = b
        })
        this._deep.getElementById("input").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                let c = Number(this._deep.getElementById("input").value)
                let a = Number(this._deep.getElementById("input1").value)
                let b = Number(this._deep.getElementById("input2").value)
                if (c) {
                    let d = 0
                    let e = 0
                    if (b >= 15) {
                        e = b - 15
                    } else {
                        e = 15 - b
                        e = 60 - e
                        c = c + 1
                    }
                    if (a >= c) {
                        d = a - c
                    } else {
                        d = c - a
                        d = 24 - d
                    }
                    if (a < 10) {
                        a = `0${a}`
                    }
                    if (b < 10) {
                        b = `0${b}`
                    }
                    if (d < 10) {
                        d = `0${d}`
                    }
                    if (e < 10) {
                        e = `0${e}`
                    }


                    this._deep.getElementById("bed").innerHTML = `${d}:${e}`
                    this._deep.getElementById("error").innerHTML = ``
                }
                else {
                    this._deep.getElementById("error").innerHTML = `*only a number*`
                }
            }
        })
        this._deep.getElementById("input3").addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                let a = Number(this._deep.getElementById("input3").value)
                if (a) {
                    this._deep.getElementById('error1').innerHTML = ''
                }
                else {
                    this._deep.getElementById('error1').innerHTML = '*only a number*'
                }
            }
        })
        this._deep.getElementById("id").addEventListener('click', async() => {
            let a = Number(this._deep.getElementById("input1").value)
            let b = Number(this._deep.getElementById("input2").value)
            let c = Number(this._deep.getElementById("input").value)
            let q = this._deep.getElementById("c").value
            let p = Number(this._deep.getElementById('input4').value)
            let w = Number(this._deep.getElementById("input3").value)
            let d = 0
            let e = 0
            let r = c 
            if (b >= 15) {
                e = b - 15
            } else {
                e = 15 - b
                e = 60 - e
                c = c + 1
            }
            if (a >= c) {
                d = a - c
            } else {
                d = c - a
                d = 24 - d
            }
            if (a < 10) {
                a = `0${a}`
            }
            if (b < 10) {
                b = `0${b}`
            }
            if (d < 10) {
                d = `0${d}`
            }
            if (e < 10) {
                e = `0${e}`
            }
            if (p === 1) {
                p = `on`
            }
            else {
                p = `off`
            }
            if (q==='')
            {
                let v = await firebase.firestore().collection("alarm").get()
                q = getDataFromDocs(v)[0].node
            }
            const user = {
                alarm: `${a}:${b}`,
                sleep: `${d}:${e}`,
                target: `${r}`,
                node: `${q}`,
                snooze: `${w}`,
                isShow: `${p}`
            }

            firebase.firestore().collection("alarm").doc('rc2WByzIIVoane6Y7lY5').update(user)
        })
        this._deep.getElementById('id').addEventListener('click', () => {
            this._deep.getElementById('q').innerHTML =
                `
            <div >
                <div class="flex">21:00 – 23:00</div> 
                <div class="king">Hệ miễn dịch (bạch cầu lymph) bài độc (đào thải chất độc). Cần thả lỏng cơ thể và tinh thần, có thể nằm nghỉ ngơi trong phòng yên tĩnh, xem phim hoặc nghe nhạc thư giãn, tránh làm việc căng thẳng, có thể kết hợp vài động tác massage đầu và cổ. Không chỉ với người bị bệnh về viêm nhiễm mà ngay cả người bình thường cũng nên thư giãn và ngủ trong khoảng thời gian này để cơ thể nhanh phục hồi sức khỏe.
                </div>
            </div>
            <div >
                <div class="flex">23:00 - 1:00</div>
                <div class="king">Gan bài độc, loại bỏ các chất thừa thải ra ngoài cơ thể, sử dụng triệt để các chất dinh dưỡng của thực phẩm và giúp việc trao đổi chất trong cơ thể được tốt hơn. Gan sẽ thực hiện tốt nhất chức năng của nó khi cơ thể trong trạng thái ngủ say.
                </div>
            </div>
            <div >
                <div class="flex">1:00 – 3:00</div>
                <div class="king">Túi mật giúp cơ thể tiêu hoá chất béo, mỡ xấu, cholesterol trong thức ăn và trong máu. Cũng cần thực hiện trong giấc ngủ say.
                </div>
            </div>
            <div >
                <div class="flex">3:00 – 5:00</div>
                <div class="king">Là thời gian bài độc của phổi. Cũng chính là lý do tại sao mà người đang mắc bệnh ho lại hay ho dữ dội vào lúc này, bởi hoạt động bài độc đã chạy đến phổi. Vì thế, không nên dùng thuốc chống ho để tránh gây cản trở việc đào thải các chất cặn bã trong người vào lúc này.
                </div>
            </div>
            <div >
                <div class="flex">5:00 – 7:00</div>
                <div class="king">Là khoảng thời gian ruột già bài tiết các chất cặn bã, chất thải từ quá trình tiêu hóa. Cần đi toilet vào lúc này để làm sạch hệ tiêu hóa, ngăn ngừa độc tố vào cơ thể.
                </div>
            </div>
            <div >
                <div class="flex">7:00 – 9:00</div>
                <div class="king">Là lúc ruột non hấp thụ chất dinh dưỡng nhiều nhất, đây chính là thời điểm lý tưởng cho bữa ăn sáng, cung cấp năng lượng cho cơ thể.
                </div>
            </div>
            ${style_king}
            `
        })
    }
}

window.customElements.define('deep-z', Deep)
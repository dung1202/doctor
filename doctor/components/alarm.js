import { getDataFromDocs } from '../uitil.js'
import { getDataFromDoc } from '../uitil.js'
const style =
    `
    <style>
        #dong_ho{
            padding: 2vh 0vw;
            font-family: 'Open Sans', sans-serif;
            background: #87ded2;
            width: 20vw;
            height: 17vh;
            border-radius: 10px;
            margin-bottom: 1vw;
        }
        .service{
            text-align: center;
            margin: 0 10vw;
            border-radius: 10px;
            display: flex;
            margin-top: 1vw;
        }
        
    </style>
`
const k =
    `
        <style>
        h2{
            color:#fff;
            margin: 0.5vh 0;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        
        #thoi_gian{
            display:flex;
            justify-content: center;
        }
        
        #thoi_gian div{
            margin: 0 0.4vw;
            -webkit-box-reflect: below 0.1vw linear-gradient(transparent, #0004);
        }
        
       span{ 
            padding: 0.5vw;
            background: #2196f3;
            color: #fff;
            font-weight: 300;
            display:flex;
            align-items: center;
            font-size: 1.5rem;
            z-index:3;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.2);
            border-radius: 10px;
        }
        
        #dong_ho #thoi_gian div:last-child span {
            background: #ff006a;
        }



        #bao{
            padding: 1vw;
            font-family: 'Open Sans', sans-serif;
            background: steelblue;
            width: 18vw;
            border-radius: 10px;
            margin-bottom: 1vh;
        }
        #alarm{
            font-weight: 700;
            color: wheat;
            font-size: 3rem; 
            margin-bottom: 2vh;
            display: flex;
        }
        #ok{
            font-size: 1.5rem; 
            text-align: left;
            font-family: 'Audiowide', cursive;
            color: ;
            margin-bottom: 1vh;
        }
        #q{
            flex: 2;
        }
        #button{
            background: green;
            color: white;
            padding: 1vw;
            border-radius: 10px;
            font-size: 1rem;
            outline: none;
            cursor: pointer;
        }
        #note{
            height: 35vh;
            background-color: white;
            border-radius: 10px;
            padding: 1vw;
            text-align: left;
            font-size: 1.2rem;
        }
        </style>
`
class ServiceScreen2 extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }


    async connectedCallback() {
        let a = await firebase.firestore().collection("alarm").get()
        a = getDataFromDocs(a)[0]
        let html = ''
        if (a) {
            if (a.isShow === "off") {a.snooze = 0}
            html = `
            <div id='alarm'>
                <div id="q">
                ${a.alarm}
                </div>
                <button id="button">Edit</button>
            </div>
            <div id="ok">                    
                Bedtime: ${a.sleep}
            </div>

            <div id="ok">
                Snooze: ${a.snooze} minutes
            </div>

            <div id="note">
                ${a.node}
            </div>
            `
        }
        this.listenCollectionChange()
        this._shadowRoot.innerHTML =
            `
            <div class="service">
                <div class="screen">
                    <div id="dong_ho">
                        <h2>The time now</h2>
                        <div id="thoi_gian">
                            <div>
                                <span id="gio">00</span>
                            </div>
                            <div>    
                                <span id="phut">00</span>
                            </div>
                            <div>
                                <span id="giay">00</span>
                            </div>
                        </div>
                    </div>

                    <div id="bao">
                        ${html}
                    </div>
                </div>
                <deep-z id="woa"></deep-z>
            </div>    
            ${style} ${k}
        `
        setInterval(() => {
            let gio_ht = new Date().getHours()
            if (gio_ht < 10) gio_ht = `0${gio_ht}`
            let phut_ht = new Date().getMinutes()
            if (phut_ht < 10) phut_ht = `0${phut_ht}`
            let giay_ht = new Date().getSeconds()
            if (giay_ht < 10) giay_ht = `0${giay_ht}`
            var gio = this._shadowRoot.getElementById("gio").innerHTML = gio_ht
            var phut = this._shadowRoot.getElementById("phut").innerHTML = phut_ht
            var giay = this._shadowRoot.getElementById("giay").innerHTML = giay_ht
        }, 1000)
        this._shadowRoot.getElementById('button').addEventListener("click", ()=>{
            location.reload()
        })
    }
    listenCollectionChange(){
        let fisrtRun = true
        firebase.firestore().collection('alarm').onSnapshot((snapShot)=>{
            if (fisrtRun)
            { 
                fisrtRun = false  
                return
            }
            
            const docChange = snapShot.docChanges()
            for (const oneChages of docChange) {
                
                if (oneChages.type === 'modified') 
                {
                    this.appendPostItem(getDataFromDoc(oneChages.doc))
                }
            }
        })
    }
    appendPostItem(data)
    {
        if (data.isShow === "off") {data.snooze = 0}
        let postItem = 
        `
        <div id='alarm'>
                <div id="q">
                ${data.alarm}
                </div>
                <button id="button">Edit</button>
            </div>
            <div id="ok">                    
                Bedtime: ${data.sleep}
            </div>

            <div id="ok">
                Snooze: ${data.snooze} minutes
            </div>

            <div id="note">
                ${data.node}
            </div>
        `
        this._shadowRoot.querySelector('#bao').innerHTML = postItem
        this._shadowRoot.getElementById('button').addEventListener("click", ()=>{
            location.reload()
        })
    }
    
}
window.customElements.define('alarm-z', ServiceScreen2)
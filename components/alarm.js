const style =
`
    <style>
        .screen{
            padding: 2vh 0vw;
            font-family: 'Open Sans', sans-serif;
            background: #AA7B6F;
            display: flex;
            justify-content: center;
            width: 20vw;
            height: 17vh;
            border-radius: 10px;
        }
        .service{
            padding: 1vh 1vw;
            background-color: rgba(197, 197, 197, 0.8);
            text-align: center;
            margin: 0 10vw;
            height: 88vh;
            border-radius: 5px;
            display: flex;
            
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
        </style>
`
class ServiceScreen2 extends HTMLElement 
{
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback(){
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
                </div>
                <div>
                    
                </div>
            </div>    
            ${style} ${k}
        `
        setInterval(()=>{
            let gio_ht =  new Date().getHours()
                if (gio_ht < 10) gio_ht = `0${gio_ht}`
            let phut_ht =  new Date().getMinutes()
                if (phut_ht < 10) phut_ht = `0${phut_ht}`
            let giay_ht =  new Date().getSeconds()
                if (giay_ht < 10) giay_ht = `0${giay_ht}`
            var gio = this._shadowRoot.getElementById("gio").innerHTML = gio_ht
            var phut = this._shadowRoot.getElementById("phut").innerHTML = phut_ht
            var giay = this._shadowRoot.getElementById("giay").innerHTML = giay_ht
        }, 1000);
    }
}
window.customElements.define('alarm-z', ServiceScreen2)
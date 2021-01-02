const style =
`
    <style>
        .screen{
            padding-top: 5vh;
            font-size: 1.5rem;
            color: blue;
            font-weight: 700;
            margin-bottom: 0.5vh;
        }
        .service{
            padding: 0vh 5vw;
            background-color: rgba(197, 197, 197, 0.57);
            margin: 0 10vw;
            height: 90vh;
            border-radius: 5px;
        }
        #video{
            outine: none;
            border: 0px;
        }
    </style>
`
class ServiceScreen5 extends HTMLElement 
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
                        Bài tập trước khi đi ngủ
                </div>
                <video id="video" width="950" height="535" controls>
                    <source src="./anh nen/Thử xem điều gì sẽ xảy ra nếu bạn tập thể dục 8 phút trước khi đi ngủ trong vòng một tháng.mp4" type="video/mp4">
                </video>
            </div>    
            ${style}
        `
    }
}
window.customElements.define('body-z', ServiceScreen5)
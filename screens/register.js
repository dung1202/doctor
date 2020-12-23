
const style = `
    <style>
    #register-container{
        width: 100vw;
        height: 100vh;
        background: url('./anh nen/anhnen.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
    }
    #register-form{
        width: 40%;
        background-color: rgba(197, 197, 197, 0.7);
        height: 75vh;
        padding: 0px 20px;
        border-radius: 10px;
        margin-top: 5vh;
        margin: auto;
    }
    .h1{
        margin-top: 2vh;
        margin-bottom: 2vh;
        text-align: center;
        color: #fff;
        font-size: 6rem;
        font-family: 'Nerko One', cursive;
        font-style: italic;
    }
    button{
        background: #052642;
        color: white;
        padding: 10px;
        border-radius: 10px;
        width: 25vw;
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: bolder;
        outline: none;
    }

    #redirect1:hover{
        color: red;
    }
    .L-R{
        margin-top: 6vh;
        display: flex;
        justify-content: space-evenly;
    }
    #redirect2{
        color: red;
        text-decoration: underline; 
        font-weight: bolder; 
    }
    
    #redirect2, #redirect1{
        cursor: pointer;
        margin-bottom: 20px;
        font-size: 1.5rem;
        font-family: 'Bangers', cursive;
    }
    
    @media only screen and (max-width: 768px)
    {
        #register-form{
            width: 100%;
        }
    }
    </style>
`
// import { redirect } from '../index.js'
class RegisterScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this._shadowRoot.innerHTML = `
        <div id="register-container">
        <div class="h1">Doctor Sleep</div>
            <form id="register-form">
                <div class="L-R">
                    <div id="redirect1">Login</div>
                    <div id="redirect2">Register</div>
                </div>
                <input-wrapper id="first-name" type="text" placeholder="First name"></input-wrapper>
                <input-wrapper id="last-name" type="text" placeholder="Last name"></input-wrapper>
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <input-wrapper id="cpassword" type="password" placeholder="confirm password"></input-wrapper>
                <div style="text-align: center;">
                    <button>Register</button>
                </div>    
            </form>
        <div>
        ${style}
        `
        
        const registerFrom = this._shadowRoot.getElementById('register-form')
        registerFrom.addEventListener('submit', async (e) => {
            e.preventDefault() //chống gửi lên khi chưa ấn đăng ký

            let isValid = true
            const fname = this._shadowRoot.getElementById('first-name').value
            const lname = this._shadowRoot.getElementById('last-name').value
            const email = this._shadowRoot.getElementById('email').value
            const pass = this._shadowRoot.getElementById('password').value
            const cpass = this._shadowRoot.getElementById('cpassword').value

            if (fname.trim() === '') {
                this.SetError('first-name', 'Please input first name')
                isValid = false
                // dua vao 
            }

            if (lname.trim() === '') {
                this.SetError('last-name', 'Please input last name')
                isValid = false
            }

            if (email.trim() === '') {
                this.SetError('email', 'Please input email')
                isValid = false
            }

            if (pass.trim() === '') {
                this.SetError('password', 'Please input passpword')
                isValid = false
            }

            if (cpass.trim() === '') {
                this.SetError('cpassword', 'Please input comfirm password')
                isValid = false

                if (cpass !== pass) {
                    this.SetError('cpassword', 'comfirm password is not true')
                    isValid = false
                }
            }
            if (!isValid) {
                return
            }
            const user = {
                fullname: `${fname} ${lname}`,
                email: email,
                password: pass,//Crypto.MD5(pass).toString(),
            }
            // neu email ton tai thi tra ra true
            const check = await this.checkEmailExit(email)
            if (check) {
                alert('Email đã được đăng ký')
            }
            else {
                firebase.firestore().collection('users').add(user)
                alert('Đăng ký thành công')
                router.navigate('login')
            }
        })
        this._shadowRoot.getElementById('redirect1').addEventListener('click', () => {
            router.navigate('login')
        })
        this._shadowRoot.getElementById('register-form').addEventListener('mouseover', () => {
            let a = this._shadowRoot.getElementById('register-container')
            a.style.background = `url('./anh nen/anhnen1.jpg')`;
            a.style.backgroundSize= `cover`;
            a.style.backgroundRepeat = `no-repeat`;
        })
        this._shadowRoot.getElementById('register-form').addEventListener('mouseout', () => {
            let a = this._shadowRoot.getElementById('register-container')
            a.style.background = `url('./anh nen/anhnen.jpg')`;
            a.style.backgroundSize= `cover`;
            a.style.backgroundRepeat = `no-repeat`;
        })
    }

    SetError(id, message) {
        this._shadowRoot.getElementById(id).setAttribute('error', message)
    }

    async checkEmailExit(email) {
        const res = await firebase.firestore().collection('users')
            .where('email', '==', email).get()
        return !res.empty
        
    }
}
window.customElements.define('register-screen', RegisterScreen)

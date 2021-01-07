
const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
#login-container{
    width: 100vw;
    height: 100vh;
    background: url('./anh nen/anhnen.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
}
#login-form{
    width: 40%;
        background-color: rgba(197, 197, 197, 1);
        height: 76.5vh;
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
#redirect1:hover{
    color: red;
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

.footer{
    text-align: center;
    margin-top: 4vh;
    font-size: 1.3rem;
    color: #626262;
}
.k{
    font-size: 1.1rem;
    color: #805332;
}
hr{
    border: 2px solid gray;
    border-radius: 5px;
}
.or{
    text-align: center;
    font-family: 'Langar', cursive;
    font-size: 1.5rem;
    color: #726A95;
    margin-top: 1.3vh;
    margin-bottom: 1.3vh;
}
.flex{
    display: flex;
    justify-content: space-evenly;
}
#n2, #n3, #n1{
    background-color: transparent;
    padding: 1vh 1vw;
    border-radius: 5px;
    font-size: 1.5rem;
    cursor: pointer;
}
#n2{
    color: #3b5998;
}

#n3{
    color: #dd3e3a;
}


#n2:hover, #n3:hover, #n1:hover{
    background-color: gray;
    color: #fff;
}
@media only screen and (max-width: 768px)
{
    #login-form{
        width: 100%;
    }
}
</style>
`

// import { redirect } from '../index.js'
import { getDataFromDocs, saveToLocalStorege } from '../uitil.js'

class loginScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
        this._shadowRoot.innerHTML = `
    <div id="login-container">
        <div class="h1">Doctor Sleep</div>
        <form id="login-form">
        <div class="L-R">
            <div id="redirect2">Login</div>
            <div id="redirect1">Register</div>
        </div>
        <input-wrapper id="first-name" type="text" placeholder="Email" icon='<i class="fa fa-envelope" aria-hidden="true"></i>' iconl='1'></input-wrapper>
        <input-wrapper id="password" type="password" placeholder="Password" icon='<i class="fa fa-key" aria-hidden="true"></i>' iconl='<i class="fa fa-eye" aria-hidden="true"></i>'></input-wrapper>    
        <div style="text-align: center;">
            <button>login</button>
        </div>
        <div class="or">
            or
        </div>
        <div class="flex">
            <div id="n1">
                <i class="fa fa-apple" aria-hidden="true"></i>
            </div>
            <div id="n2">
                <i class="fa fa-facebook" aria-hidden="true"></i>
            </div>
            <div id="n3">
                <i class="fa fa-google-plus" aria-hidden="true"></i>
            </div>
        </div>
        <hr>
            <div style="text-align: center;" class="k">
                Contact information:
            </div>
            <div style="text-align: center;" class="k">
                Email: DoctorSleep.contact@gmail.com
                <div>Phone number: 0866577135</div>
            </div>
            <div class="footer">
                Copyright © 2020 Doctor Sleep. All rights reserved
            </div>
        </form>
    </div>
    ${style}
    `
        const loginFrom = this._shadowRoot.getElementById('login-form')
        loginFrom.addEventListener('keypress', async (Event) => {
            if (Event.key === 'Enter') {
                let isValid = true
                const email = this._shadowRoot.getElementById('first-name').value
                const pass = this._shadowRoot.getElementById('password').value

                if (email.trim() === '') {
                    this.SetError('first-name', 'Please input email')
                    isValid = false
                }
                else {
                    this.SetError('first-name', '')
                }
                if (pass.trim() === '') {
                    this.SetError('password', 'Please input passpword')
                    isValid = false
                }
                else {
                    this.SetError('password', '')
                }
                if (!isValid) {
                    return
                }


                const user = await firebase.firestore().collection('users')
                    .where('email', '==', email).where('password', '==', pass).get()
                if (!user.empty === true) {
                    saveToLocalStorege('currentUser', getDataFromDocs(user)[0])
                    router.navigate('home')
                }
                else {
                    this.SetError('password', 'Wrong email or wrong password')
                }
            }
        })
        loginFrom.addEventListener('submit', async (e) => {
            e.preventDefault() //chống gửi lên khi chưa ấn đăng ký

            let isValid = true
            const email = this._shadowRoot.getElementById('first-name').value
            const pass = this._shadowRoot.getElementById('password').value

            if (email.trim() === '') {
                this.SetError('first-name', 'Please input email')
                isValid = false
            }
            else {
                this.SetError('first-name', '')
            }
            if (pass.trim() === '') {
                this.SetError('password', 'Please input passpword')
                isValid = false
            }
            else {
                this.SetError('password', '')
            }
            if (!isValid) {
                return
            }


            const user = await firebase.firestore().collection('users')
                .where('email', '==', email).where('password', '==', pass).get()
            if (!user.empty === true) {
                saveToLocalStorege('currentUser', getDataFromDocs(user)[0])
                router.navigate('home')
            }
            else {
                this.SetError('password', 'Wrong email or wrong password')
            }
        })

        this._shadowRoot.getElementById('redirect1').addEventListener('click', () => {
            router.navigate('register')
        })

    }
    SetError(id, message) {
        this._shadowRoot.getElementById(id).setAttribute('error', message)
    }
}
window.customElements.define('login-screen', loginScreen)


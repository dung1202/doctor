import { getDataFromDocs } from '../uitil.js'
import { getDataFromDoc } from '../uitil.js'
const style =
    `
.list-post{
    width: 60%;
    margin: auto;
    margin-top: 10px;
}
`
class ListPost extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }
    async connectedCallback() {
        const res = await firebase.firestore().collection('posts').where('isshow', '==', true).get()
        const ListPost = getDataFromDocs(res)
        let html =''
        ListPost.forEach(element => {
            const imgSrc = (element.files && element.files.length >0)? element.files[0] : null
            html += `
                <post-item time="${element.createAt}" author="${element.authorname}" content="${element.content}" img="${imgSrc}"></post-item>
            `
        });
        this.listenCollectionChange()
        this._shadowDom.innerHTML =
            `
        <div class="list-post">
            ${html}
        </div>
        <style>${style}</style>
        `
    }
    listenCollectionChange(){
        let fisrtRun = true
        firebase.firestore().collection('posts').where('isshow', '==', true).onSnapshot((snapShot)=>{
            if (fisrtRun)
            { 
                fisrtRun = false  
                return
            }
            // console.log('snapShot', snapShot.docChanges())
            const docChange = snapShot.docChanges()
            for (const oneChages of docChange) {
                
                if (oneChages.type === 'added') 
                {
                    this.appendPostItem(getDataFromDoc(oneChages.doc))
                }
            }
        })
    }
    appendPostItem(data)
    {
        const postItem = document.createElement('post-item')
        // <post-item></post-item>
        postItem.setAttribute('time', data.createAt)
        postItem.setAttribute('author', data.authorname)
        postItem.setAttribute('content', data.content)
        console.log(postItem)
        const parent = this._shadowDom.querySelector('.list-post')
        parent.insertBefore(postItem, parent.firstChild) //đưa Item len dau
    }
}
window.customElements.define('list-post', ListPost)
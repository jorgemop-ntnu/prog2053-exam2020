import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      originalUser: {type : Object}
    };
  }
  constructor(){
    super()
    this.originalUser = this.user
    

  }

/**
 * 
 *  
 */
  async submitChanges(e){
      const form = new FormData(e.target.form)
      let obj = {}
      form.forEach((value, key) =>{
        obj[key] = value
      })
  
    let res = await fetch('api/updateUser.php',{
      method: "POST",
      body : JSON.stringify(obj),
    })
    let data = await res.json()
    alert(data)
    /*
      fetch('api/updateUser.php',{
        method: "POST",
        body : JSON.stringify(obj),
      }).then(res => {
        res.json().then(data=>{
          alert(obj)
          alert(data)
          if(data.status === "success"){
            alert("Changes has been made")
          }
          else{
            alert("Something went wrong!")
          }
        
      })

    })
  */
}


  // din kode her
  render(){
    return html`
     <form>
       <h4>UID: ${this.user.uid}</h4>
       <div>
          <label for="uname">User name</label>
          <input name="uname" id="uname" placeholder="${this.user.uname}" >
       </div>

       
       <div>
          <label for="firstName">First name</label>
          <input name="firstName" id="firstName" placeholder="${this.user.firstName}" >
       </div>

       
       <div>
         <label for="lastName">Last name</label>
         <input name="lastName" id="lastName" placeholder="${this.user.lastName}" >
       </div>
      
       <div>
         <label for="pwd">Password</label>
         <input name="pwd" id="pwd" placeholder="${this.user.pwd}" type="password">
       </div>
       
       <div>
         <label for="oldpwd">old password</label>
         <input name="oldpwd" id="oldpwd" type="password">
       </div>
   
      <div>
        <button type="submit" @click ="${e => {
           this.submitChanges(e)
        }}">Submit changes</button>
      </div>

     </form>
    `
  }

}

customElements.define('edit-user', EditUser);

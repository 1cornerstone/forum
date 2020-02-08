'use strict'


module.exports=class User{
     
    constructor(name,username,email){
    
        this.name=name; 
        this.email=email;
        this.username=username;
    }
    get mName(){return this.name}

    set mName(value){this.name=value}

    set mEmail (value){ this.email= value;}
    
    get mEmail(){ return this.email;}

    set musername (value){ this.username= value;}
    
    get musername(){ return this.username;}
   
}


 
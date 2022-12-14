// On attend que le DOM soit chargé
window.onload = () => {
    // Ici le DOM est chargé

    // On sélectionne le champ "pseudo"
    let pseudo = document.querySelector("#pseudo");

    // On surveille les entrées clavier sur le pseudo
    pseudo.addEventListener("over", function () {
        console.log("Du texte à été tapé");
        if (pseudo.value.length >= 5) {
            // Bordure verte
            pseudo.style.border = "2px solid green"
        } else {
            pseudo.style.border = "2px solid red"
        }
    })

    let email2 = document.querySelector("#email2");


    email2.addEventListener("blur", function () {

        // email2= this
        let email1 = document.querySelector("#email1")

        if (this.value === email1.value) {
            console.log("Le mail correspond ")
            this.style.border = "2px solid green"
            email1.style.border = "2px solid green"
        } else {
            console.log("Le mail correspond pas")
            this.style.border = "2px solid red"
            email1.style.border = "2px solid red"
        }

    })

    let mdp1 = document.querySelector("#mdp1")
    let mdp2 = document.querySelector("#mdp2")

    mdp2.addEventListener("blur", function () {

        if (mdp2.value === mdp1.value) {
            mdp2.style.border = "2px solid green"
            mdp1.style.border = "2px solid green"
            console.log("Le mot de passe correspond")
        } else {
            mdp2.style.border = "2px solid red"
            mdp1.style.border = "2px solid red"
            console.log("Le mot de passe correspond pas")
        }
    })
   


    // Voir mot de passe

    let show= document.querySelector("#show")

    console.log(show);

    show.addEventListener("click", function (){
        if(mdp1.type ==="password"){
            mdp1.type="text"
            mdp2.type="text"
            show.classList.D
        }else{
            mdp1.type="password"
            mdp2.type="password"
        }
    })



    let buttonForm = document.querySelector(".button-form")

    buttonForm.addEventListener("click", function(){
        window.alert("Formulaire enregistré ");
    })
    // Limiter à 5 caractéres le pseudo du formulaire



 let icons=document.querySelectorAll(".ico");let length=icons.length;icons.forEach((item,index)=>{item.addEventListener("mouseover",(e)=>{focus(e.target,index);});item.addEventListener("mouseleave",(e)=>{icons.forEach((item)=>{item.style.transform="scale(1)  translateY(0px)";});});});const focus=(elem,index)=>{let previous=index-1;let previous1=index-2;let next=index+1;let next2=index+2;if(previous==-1){console.log("first element");elem.style.transform="scale(2) translateY(-10px)";}else if(next==icons.length){elem.style.transform="scale(2)  translateY(-10px)";console.log("last element");}else{elem.style.transform="scale(2)  translateY(-10px)";icons[previous].style.transform="scale(1.2) translateY(-6px)";icons[previous1].style.transform="scale(1.1)";icons[next].style.transform="scale(1.2) translateY(-6px)";icons[next2].style.transform="scale(1.1)";}};



 function highlight(selector){$(selector).mouseenter(function(){var classLink=$(this).attr('class').split(' ')[1];$("."+classLink).addClass('over');$(".section-"+classLink).stop().fadeIn();}).mouseleave(function(){var classLink=$(this).attr('class').split(' ')[1];$("."+classLink).removeClass('over');$(".section-"+classLink).stop().fadeOut();});};;


} // fin window.onload


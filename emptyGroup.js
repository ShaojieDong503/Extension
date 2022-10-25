//emailScroll = (document.getElementById("app").getElementsByClassName("s0OAm"))[0];
//emails = (document.getElementById("app").getElementsByClassName("s0OAm"))[0].getElementsByClassName("ZtMcN");


function clickCheck(email){
    try{
        let circle = email.querySelector("div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2)");
        let circleArea = circle.parentNode;
        console.log(circle);
        console.log(circleArea);
    if(circle != null){
        if(circleArea.getAttribute("aria-checked") === "false"){
            circle.click();
            return 1===1;
        }
        else if(circleArea.getAttribute("aria-checked") === "true"){
            console.log("already checked");
            return 1===1;
        }
        else {
            return 1===0;
        } 
        }
        else{
            return 1===0;
        }
    }catch(e){
        console.log(e);
    }

}

function selectFirstEmail(){
    //#MainModule > div > div > div.q9iRC.css-156 > div > div > div.nbmyu.FkPdL.czwRD.LCprM > div.C1EJK.LyMTI.css-489 > div.Cz7T5.customScrollBar > div > div > div > div > div
    console.log(document.getElementById("MainModule").querySelector("div[role = 'listbox']").childNodes[0]); 
    //console.log((document.querySelector("#MainModule > div > div > div:nth-child(3) > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div").querySelectorAll("div[aria-selected]")));
    (document.getElementById("MainModule").querySelector("div[role = 'listbox']").querySelectorAll("div[aria-selected]"))[0].click(); 
}

 
//while(document.querySelector("#MainModule > div > div > div:nth-child(3) > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div") != null){
async function main(){
    
    const tasklen = (document.getElementById("MainModule").querySelector("div[role = 'listbox']").querySelectorAll("div[aria-selected]")).length;
    var observer = new MutationObserver(function(){
        if(document.getElementById("fluent-default-layer-host").querySelector('div[role="dialog"]') != null){
            let newlen = document.getElementById("fluent-default-layer-host").childNodes.length;
            console.log(newlen);
            console.log("mut")
            document.querySelector(`#fluent-default-layer-host > div:nth-child(${newlen}) > div > div > div > div:nth-child(2) > div:nth-child(2) > div >  div:nth-child(2) >  div:nth-child(2) > div > span:nth-child(1) > button`).click();
           }
        }
        );
    observer.observe(document.getElementById("fluent-default-layer-host"), {attributes: false, childList: true, characterData: false, subtree:true}); 
    const delay = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
    var j = 0;
    var breaker = "yes"
    while(j < Math.ceil(tasklen/10)){
        chrome.storage.local.get(['cont_work'], function(result) {
            breaker = result.cont_work;
          })
    if(breaker === "no"){
        console.log("stop");
        break;
    }
    console.log(`iteration ${j}`);
        selectFirstEmail();
        new Promise(function(resolve, reject){
   
        if(clickCheck((document.getElementById("MainModule").querySelector("div[role = 'listbox']").querySelectorAll("div[aria-selected]"))[0])){
            console.log("here");
            resolve((document.getElementById("MainModule").querySelector("div[role = 'listbox']").querySelectorAll("div[aria-selected]")).length);
        }
        else{
            reject();
        }
    }
    ).then((size) => {
   /** for(email of ((document.getElementById("app").getElementsByClassName("s0OAm"))[0].getElementsByClassName("ZtMcN"))){
        clickCheck(email);
    } */
    
        console.log(size)
        console.log(Math.min(size,10))
            for(let i = 0; i < Math.min(size,10); i++){
                clickCheck((document.getElementById("MainModule").querySelector("div[role = 'listbox']").querySelectorAll("div[aria-selected]"))[i]); 
            }
        return new Promise(function(resolve, reject){
            console.log(document.getElementById("MainModule").querySelector("div[role = 'listbox']"));
            resolve(document.getElementById("MainModule").querySelector("div[role = 'listbox']").getAttribute("aria-label"));
        })
        }).then(async (aria_label) => {
            console.log(aria_label);
            try{  
                if(aria_label === "Message list Everything in  is selected" || aria_label === "Message list"){
                    if(document.getElementById("innerRibbonContainer")){  
                        console.log(document.querySelector("#innerRibbonContainer > div:nth-child(1) > div > div > div > div:nth-child(3) > div > div > span > button:nth-child(1)")) 
                        setTimeout(() => {
                            document.querySelector("#innerRibbonContainer > div:nth-child(1) > div > div > div > div:nth-child(3) > div > div > span > button:nth-child(1)").click();              
                        }, 500); 

                    /**     return new Promise((resolve) => {
                                console.log("one round"); 
                                resolve(document.getElementById("fluent-default-layer-host").childNodes.length);       
                        })*/
                        
                    }
                    else{
                        throw "missing panel";
                    }
                }
                else{
                    throw "not all selected";
                }
            }
            catch(e){
                console.log(e);
            }
        })
      //  waitForElm(`#fluent-default-layer-host > div:nth-child(${len+1}) > div > div > div > div:nth-child(2) > div:nth-child(2) > div >  div:nth-child(2) >  div:nth-child(2) > div > span:nth-child(1) > button`) 
        
        j += 1;
        console.log(`j ${j}`);
        await delay(2000);
        
    }
    observer.disconnect(); 
    }

main();

console.log('hello world')

window.onload = async () => {
    checkMessages()
    
}

function checkMessages(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    //   // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    //   let value = params.some_key; // "some_value"
    if (params.message){
        Notiflix.Notify.info(params.message)
    }  else{
        console.log("no messages")
    }
}
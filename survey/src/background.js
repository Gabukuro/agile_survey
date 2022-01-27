chrome.storage.local.set({"identifier": Math.random().toString(16).slice(2)},function (){
    console.log("Storage Succesful");
});
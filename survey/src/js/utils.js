const getStorageData = async key => {
    new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, function(value) {
                
                console.log('getting', value);
                resolve(value[key]);
            });
        } catch (error) {
            reject(error);
        }
    });
}

const saveObjectInLocalStorage = async (obj) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set(obj, function() {
                console.log('storaged');
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
}

const toggleDisplay = (elementId, display) => {
    document.getElementById(elementId).style.display = display;
}

const appendElementFunction = (elementId, func) => {
    document.getElementById(elementId).addEventListener("click", func);
}

const generateRandomString = () => {
    return Math.random().toString(32).slice(7).toUpperCase();
}
class Hermes {
    constructor(url, method = 'GET', data = null) {
        this.url = url;
        this.method = method;
        this.data = data;
    }

    run() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest(this.method);
            request.open(this.method, this.url, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.onload = () => {
                if(request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.response));
                } else { 
                    reject(request.statusText);
                }
            }
            request.onerror = () => {
                reject(request.statusText);
            }
            request.send(this.data ? JSON.stringify(this.data) : null);
        });
    }
}
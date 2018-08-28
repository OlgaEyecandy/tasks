/*
два скрипта
Один поисковый модуль
Второй твой код на странице
Второй должен выглядеть как:
let searchEngine = new SearchEngine(...) // сюда можно передавать какие-то доп параметры
....
searchEngine.search(url, (err, result) => {
//делаем что-то с резалтом
} 
*/

export class Response {
    makeResponse(url) {
        let linksKey;
        return new Promise((resolve, reject) => {
            fetch(url, {
                    cache: "no-cache"
                })
                .then(response => response.json())
                .then(response => {
                    linksKey = response.map((item) => this.parseLink(item));
                    let listOfLinks = response.map((item) => this.getLink(item));
                    return Promise.all(listOfLinks.map(item => {
                        return fetch(item);
                    }));
                })
                .then(response => response.map(r => r.json()))
                .then(response => {
                    return Promise.all(response);
                })
                .then(response => {
                    let allData = response;
                    for (var i = 0; i < linksKey.length; i++) {
                        allData[i].url = linksKey[i];
                    }
                    return allData;
                })
                .then(response => {
                    return resolve(response)
                })
                .catch(err => reject(err))
        })
    }

    getLink(item) {
        return `data/${item.file}`;
    }

    parseLink(item) {
        return item.file;
    }

    createMessage(text) {
        var message = document.createElement('pre');
        message.innerHTML = `<span>File: </span>${text.url}<br><span>Data: </span>${JSON.stringify(text, null , 2)}`;
        messages.appendChild(message);
        message.className = 'message';
        return message;
    }

    deleteMessages() {
        document.getElementById('messages').innerHTML = ""
    };
    checkboxStatus(checkBox) {
        if (checkBox.checked == false) {
            this.deleteMessages();
        }
    }
}
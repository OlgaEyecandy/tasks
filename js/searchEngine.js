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

export class SearchEngine {
    constructor(response) {
        this.response = response;
    }
    search(url, value, checkBox, callback) {
        let result = this.response.makeResponse(url);
        result.then(data => {
                this.response.checkboxStatus(checkBox);
                if (value == "") {
                    return this.response.createMessage("Search value is empty");
                } else {
                    let answer = data.filter((item) => {
                        for (let key in item) {
                            if (key == value) {
                                item[`<b>${value}</b>`] = item[key];
                                delete item[key];
                                return true;
                            } else if (item[key] == value) {
                                item[key] = `<b>${value}</b>`;
                                return true;
                            } else {

                            }
                        }
                    })
                    if (answer.length > 0) {
                        return answer.forEach(item => this.response.createMessage(item));
                    } else {
                        return this.response.createMessage("The item "+ value +" is not found");
                    }
                }
            })
            .then(data => callback(null, data), err => callback(err))
    }
}
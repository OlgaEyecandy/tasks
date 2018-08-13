/* Реализовать:
1. класс для предыдущего задания, с методом, принимающим callback и результатом, переданным в callback. вызов метода(результаты,ошибка).
2. класс linkBuilder с методом, принимающим имя файла из списка и возвращающим имя как адрес.
3. класс responseBuilder с методами getNames, getCountFiles... ()
}
4 Протестировать с помощью unit-тестирования(используя библиотеку expect.js) */

class LinkBuilder {
    getLink(item) {
        return `data/${item.file}`;
    }
}

class ResponseBuilder {
    getCountFiles(arr) {
        return arr.length
    }
    getNames(item) {
        return item.name;
    }
    ifWithName(arr) {
        return arr.name != null;
    }
}

class Data {
    constructor(linkBuilder, responseBuilder) {
        this.linkBuilder = linkBuilder;
        this.responseBuilder = responseBuilder;
    }

    getData(url, callback) {
        let result = this.makeRequest(url);
        result.then(data => callback(null, data), err => callback(err));
    }

    makeRequest(url) {
        return new Promise((resolve, reject) => {
            var allInfo = {};
            var numOfErr = 0;
            fetch(url, {
                    cache: "no-cache"
                })
                .then(response => response.json())
                .then(response => {
                    let listOfLinks = response.map((item) => this.linkBuilder.getLink(item));
                    allInfo.numofFiles = this.responseBuilder.getCountFiles(listOfLinks);
                    return Promise.all(listOfLinks.map(item => fetch(item)));
                })
                .then(response => response.filter(
                    item => {
                        if (item.status != 404) {
                            return true;
                        } else {
                            numOfErr++;
                            allInfo.err404 = numOfErr;
                            return false;
                        }
                    }).map(r => r.json()))
                .then(response => Promise.all(response))
                .then(response => {
                    let filesWithNames = response.filter(arr => this.responseBuilder.ifWithName(arr));
                    allInfo.FilesWithNames = this.responseBuilder.getCountFiles(filesWithNames);
                    allInfo.namesInFiles = filesWithNames.map((item) => this.responseBuilder.getNames(item));
                    resolve(allInfo);
                })
                .catch(err => reject(err));
        });
    }
}

describe("Classes Test", function () {
    let dataSource, linkBuilder, responseBuilder;
    beforeEach(() => {
        linkBuilder = new LinkBuilder();
        responseBuilder = new ResponseBuilder();
        dataSource = new Data(linkBuilder, responseBuilder);
    })

    it("if file has links with some names and two files missing", function (done) {
        dataSource.getData('data/links.json', (err, result) => {
            let expRes = {
                "numofFiles": 5,
                "err404": 2,
                "FilesWithNames": 2,
                "namesInFiles": ["Peter", "Vasily"]
            };
            expect(result).to.eql(expRes);
            done();
        });
    });

    it("if file is empty", function (done) {
        dataSource.getData('data/empty-links.json', (err, result) => {
            expect(err.message).to.be("Unexpected end of JSON input");
            done()
        });
    });
    it("if file has links without names", function (done) {
        dataSource.getData('data/links-without-names.json', (err, result) => {
            expect(result).to.eql({
                "numofFiles": 2,
                "FilesWithNames": 0,
                "namesInFiles": []
            });
            done();
        });
    });
});

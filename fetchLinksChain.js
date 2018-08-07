let getData = callback => {
    var getAll = {};
    var numOfErr = 0;
    fetch("data/links.json")
        .then(response => response.json())
        .then(response => {
            let listOfLinks = response.map((item) => `data/${item.file}`);
            var numOfLinks = listOfLinks.length;
            getAll.numofFiles = numOfLinks;
            return Promise.all(listOfLinks.map(item => fetch(item)));

        })
        .then(response => response.filter(
            item => {
                if (item.status != 404) {
                    return true;
                } else {
                    numOfErr++;
                    getAll.err404 = numOfErr;
                    return false
                }
            }).map(r => r.json()))
        .then(response => Promise.all(response))
        .then(response => {
            let filesWithNames = response.filter(a => a.name != null);
            let numofFilesWithNames = filesWithNames.length;
            getAll.FilesWithNames = numofFilesWithNames;
            let names = filesWithNames.map(item => item.name);
            getAll.namesInFiles = names;
            callback(null, getAll)
        })
        .catch(err => callback(err));
}
getData((err, result) => console.log(err,result))
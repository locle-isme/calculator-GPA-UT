require('dotenv').config();
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const axios = require('axios')
const nodeHtmlParse = require('node-html-parser');
const app = express()
const port = process.env.PORT || 6969;

app.use(cors())
app.use(express.json());


app.post('/get-data', async (req, res) => {
    try {
        const url = req.body.url;
        let response = await axios.get(url);
        res.custom({type: "success", message: "Thành công", transcripts: getTranscript(response.data)})
    } catch (e) {
        let message = {type: "error", message: "Có lỗi xảy ra"};
        res.custom(message);
    }
})

function getBlockCourses() {
    let fileName = "block_courses.txt";
    let text = fs.readFileSync(fileName).toString('utf-8');
    return text.split("\n");
}

function getTranscript(stringSource) {
    try {
        let root = nodeHtmlParse.parse(stringSource);
        let userInfoDOM = root.querySelector('.user-info');
        let userInfo = {
            //avatar: userInfoDOM?.children[0]?.src || null,
            name: userInfoDOM?.children[1]?.text || null,
        }

        let rowTableData = root.querySelectorAll('#xemDiem_aaa tbody tr');
        if (!rowTableData.length) {
            rowTableData = root.querySelectorAll('table#xemDiem tbody tr');
        }
        let listFilter = rowTableData.filter(row => {
            return row.childNodes.length === 25
        });
        let listBanned = getBlockCourses();
        let tempTableData = listFilter.map(row => {
            let listTd = row.querySelectorAll('td');
            if (listTd[0].classList.contains('row-head')) {
                return null;
            }

            if (listBanned.includes(listTd[1].rawText.trim())) {
                return null;
            }

            return {
                id: listTd[1].rawText.trim(),
                name: listTd[2].rawText.trim(),
                credit: listTd[3].rawText.trim(),
                mark: parseFloat(listTd[8].rawText.trim().replace(',', '.').replace(' ', '')).toFixed(2)
            }
        }).filter(row => row);

        let listCourseID = tempTableData.map(row => row.id);
        let resultTable = tempTableData.filter((row, index) => {
            return index === listCourseID.indexOf(row.id);
        })


        //console.log(resultTable)
        return {
            user: userInfo,
            data: resultTable,
        }
    } catch (e) {
        console.log(e)
        throw e;
    }
}

app.response.custom = function (message) {
    // code is intentionally kept simple for demonstration purpose
    return this.contentType('application/json; charset=utf-8')
        .status(200)
        .send(message)
}


app.listen(port)

try {
    let userInfoDOM = document.querySelector('.user-info');
    let userInfo = {
        //avatar: userInfoDOM?.children[0]?.src || null,
        name: userInfoDOM?.children[1]?.text || null,
    }

    let rowTableData = document.querySelectorAll('#xemDiem_aaa tbody tr');
    if (!rowTableData.length) {
        rowTableData = document.querySelectorAll('table#xemDiem tbody tr');
    }
    let listFilter = [...rowTableData].filter(row => row.childElementCount == 12);
    let listBanned = [
        '010100700704',
        '010100700604',
        '010100410121',
        '010100700804',
        '010100410505',
        '010100410601',
        '010100410802',
    ];
    let tempTableData = listFilter.map(row => {
        if (row.children[0].classList.contains('row-head')) {
            return null;
        }

        if (listBanned.includes(row.children[1].innerText)) {
            return null;
        }

        return {
            id: row.children[1].innerText.trim(),
            name: row.children[2].innerText.trim(),
            credit: row.children[3].innerText.trim(),
            mark: parseFloat(row.children[8].innerText.trim().replace(',', '.').replace(' ', '')).toFixed(2)
        }
    }).filter(row => row);

    let listCourseID = tempTableData.map(row => row.id);
    let resultTable = tempTableData.filter((row, index) => {
        return index === listCourseID.indexOf(row.id);
    })

    let result = {
        user: userInfo,
        data: resultTable,
    }


    copy(JSON.stringify(result))
    alert('Thành công');
} catch (e) {
    alert('Có lỗi xảy ra, thử lại sau...');
}
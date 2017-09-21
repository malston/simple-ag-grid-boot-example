// used in our jasmine test
function selectAllRows() {
    gridOptions.api.selectAll();
}


(function () {

    // wait for the document to be loaded, otherwise ag-Grid will not find the div in the document.
    // document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function(){

        var gridDiv = document.querySelector('#myGrid');

        var gridOptions = {
            columnDefs: [
                {headerName: 'Country', field: 'country'},
                {headerName: 'City', field: 'city'},
                {headerName: 'Jan', field: 'jan_act'},
                {headerName: 'Feb', field: 'feb_act'},
                {headerName: 'Mar', field: 'mar_act'},
                {headerName: 'Apr', field: 'apr_act'},
                {headerName: 'May', field: 'may_act'}
            ],

            // enable sorting
            enableSorting: true
        };

        new agGrid.Grid(gridDiv, gridOptions),

        $.getJSON("sampleData.json", function (data, status) {
            if (status == "success") {
                gridOptions.api.setRowData(data);
                gridOptions.api.sizeColumnsToFit();
            }
        })
        .done(function() { console.log('getJSON request succeeded!'); })
        .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
        .always(function() { console.log('getJSON request ended!'); });

        // jsonLoad(function (data) {
        //     gridOptions.api.setRowData(data);
        //     gridOptions.api.sizeColumnsToFit();
        // });
    });

})();


function jsonLoad(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'sampleData.json'); // by default async
    xhr.responseType = 'json'; // in which format you expect the response to be

    xhr.onload = function () {
        if (this.status == 200) {// onload called even on 404 etc so check the status
            callback(this.response);
        }
    };

    xhr.onerror = function () {
        console.log('loading data error');
    };

    xhr.send();
}
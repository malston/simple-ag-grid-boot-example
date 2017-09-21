
// utility function that polls for the grid API to be ready
// a better solution would be to set some flag in the onGridReady event, but this would require an application code change
function waitForGridApiToBeAvailable(gridOptions, success) {
    // recursive without a terminating condition, but jasmines default test timeout will kill it (asmine.DEFAULT_TIMEOUT_INTERVAL)
    if(gridOptions.api) {
        success()
    } else {
        setTimeout(function () {
            waitForGridApiToBeAvailable(gridOptions, success);
        }, 500);
    }
}

describe("Player", function () {
    var gridOptionsUnderTest = gridOptions; // gridOptions is a global variable created in example.js

    beforeEach(function (done) {
        // wait for the grid to load and the api to be available
        waitForGridApiToBeAvailable(gridOptionsUnderTest, done);
    });

    it('grid API is available', () => {
        expect(gridOptionsUnderTest.api).toBeTruthy();
    });

    it('select all button selects all rows', () => {
        selectAllRows();                    // selectAllRows is a global function created in example.js
        expect(gridOptionsUnderTest.api.getSelectedNodes().length).toEqual(3);
    });

});

function takeScreenshot() {
    if (window.callPhantom) {
        var date = new Date()
        var filename = "screenshots/" + date.getTime()
        console.log("Taking screenshot " + filename)
        callPhantom({'screenshot': filename})
    }
}


afterEach(function () {
    if (this.currentTest.state == 'failed') {
        takeScreenshot();
    }
})

var a = '1';
describe('a', function () {
    it('expect(a).to.equal(1)', function(done){
        expect(a).to.equal('1');
        done();
    });
})

takeScreenshot();
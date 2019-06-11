function start() {
    $('.container-item').metaChange('test', function(ev) {
        console.log(ev.metaChanges)
    })
}

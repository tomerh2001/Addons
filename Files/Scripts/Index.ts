function start() {
    var a = $('<div>Hello</div>').appendTo('body')
        .observe(i => console.log(i))
}

function start() {
    $.observe("[name]", e => console.log($(e).attr('name')))
}

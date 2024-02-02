$(document).ready(function () {
    function autoResizeTextarea() {
        $(this).css('height', 'auto').css('height', this.scrollHeight + 'px');
    }
    $('#markdown').on('input', autoResizeTextarea);
    $('#markdown').trigger('input');
});
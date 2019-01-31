$.fn.postForm = function (ajaxOptions) {

    var jqObj = this;

    // get formdata
    var fd = new FormData(jqObj[0]);
    
    // parsing options
    var defaults = {
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            formResponse(jqObj, data);
        }
    };
    var ajaxOptions = Object.assign(defaults, ajaxOptions);

    $.ajax(ajaxOptions);

};
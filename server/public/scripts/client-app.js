$(document).ready(function() {
    $('#showEq').on('click', result);
    $('#clear').on('click', clearFields);
    $('.operandButt').on('click', operate);
    $('.numButt').on('click', numbButt);
});

var operand;
var currentNumButt = '';
var values = {};

function result() {
    event.preventDefault();
    values.numberTwo = currentNumButt;
    console.log('values: ' ,values);

    $.ajax({
        type: 'POST',
        url: '/catchMods',
        data: values,
        beforeSend: function() {
            console.log('before');
        },
        success: function(equation) {
            console.log('Server: ', equation);
            console.log(equation);
            $('.calcTotal').text(equation);
        },
        error: function (response) {
        console.log('Attempted POST /equation, did not work');
        }
    });

}

function operate() {
    event.preventDefault();
    operand = this.id;
    console.log(operand);

    var operatorDom;

    switch (operand) {
        case 'add':
            operatorDom = '+';
            break;
        case 'subtract':
            operatorDom = '-';
            break;
        case 'multiply':
            operatorDom = 'x';
            break;
        case 'divide':
            operatorDom = '/';
            break;
    }
    $('.calcTotal').text(operatorDom + ' ');

    console.log('Operator: ' + operand);
    values.numberOne = currentNumButt;
    values.type = operand;
    currentNumButt = '';
    console.log('values1:  ' ,values);



}

function numbButt() {
    event.preventDefault();
    if(this.id == 'decimal') {
        currentNumButt += '.';
    } else {

        currentNumButt += this.id;

    }

    console.log(currentNumButt);

    if(values.type) {
        values.numberTwo = currentNumButt;
    } else {
        values.numberOne = currentNumButt;
    }

    console.log(values);

    $('.calcTotal').text(currentNumButt + ' ');
}

function clearFields() {
    event.preventDefault();
    console.log('clear form');
    $('#calc-form').find('input[type=text]').val('');
    $('.calcTotal').text('');
    currentNumButt = '';
    values = {};
}

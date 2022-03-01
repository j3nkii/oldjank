//will not handle equations with spaces right now

$(ready)
function ready(){
    $(document).on('submit' ,'#calcForm', calculator);
}

function calculator(event){
    event.preventDefault();
    let equation = $('#calcInput').val();
    $('#calcInput').val(equates(equation))
}

function equates(str){
    if(!isNaN(Number(str))) return str
    let reggieVal = /^(?:-?\d*\.?\d+ ?[\+\-\*\/] ?){1,}-?\d*\.?\d+$/gm //validating equation
    if(!reggieVal.test(str) && !/\d.*/.test(str)){
        return "try again"
    }
    let arr = str.replace(/([*|\/|\-|+])/gm, ' $1 ').split(' ');
    //console.log(arr.length);
    for(let i in arr){
        
        if(arr[i] === '/' || arr[i] === '*'){
            if(arr[i] === '*'){
                arr.splice(i - 1, 3, arr[i - 1] * arr[Number(i) + 1])
                return equates(arr.join(''))
            } else if(arr[i] === '/'){
                arr.splice(i - 1, 3, arr[i - 1] / arr[Number(i) + 1])
                return equates(arr.join(''))
            } 
        }
    }
    for(let i in arr){
        if(arr[i] === '+' || arr[i] === '-'){
            if(arr[i] === '+'){
                arr.splice(i - 1, 3, Number(arr[i - 1]) + Number(arr[Number(i) + 1]))
                return equates(arr.join(''))
            } else {
                arr.splice(i - 1, 3, arr[i - 1] - arr[Number(i) + 1])
                return equates(arr.join(''))
            }
        }
    }
}
module.exports = function check(str, bracketsConfig) {
    let stack = [];
    
    /******if bracketsConfig has only one element*******/

    if(!Array.isArray(bracketsConfig[0])) {
        if(bracketsConfig[0] !== bracketsConfig[1]) {

          for(let i = 0; i < str.length; i++) {
              let currentSymbol = str[i];
              if(currentSymbol === bracketsConfig[0]) {
                  stack.push(currentSymbol);
              } else {
                  if(stack.length === 0) {
                      return false;
                  }
    
                  let topElement = stack[stack.length - 1];
    
                  if(topElement === bracketsConfig[0]) {
                      stack.pop();
                  } else {
                      return false
                  }
              }
          }

          return stack.length === 0;

        } else {
            if(str.length % 2 === 0) {
                return true;
            } else {
                return false;
            }
        }   
    }

    /************************************************************/

    const ARRAY_REPEATED_SYMBOLS = bracketsConfig.filter(item => item[0] === item[1]).map( sym => sym[0] );
    const OPEN_BRACKETS = bracketsConfig.filter( item => !(item[0] === item[1] )).map( arr => arr[0]);

    let bracketsPairs = {};

    for(let i = 0; i < bracketsConfig.length; i++) {
        if(bracketsConfig[i][0] === bracketsConfig[i][1]) continue;
        bracketsPairs[bracketsConfig[i][1]] = bracketsConfig[i][0]; 
    }  

    for(let i = 0; i < str.length; i++) {
        let currentSymbol = str[i];

        if(ARRAY_REPEATED_SYMBOLS.includes(currentSymbol)) {  //if repeated char
            let topElement = stack[stack.length - 1];
            if(currentSymbol === topElement) {
                stack.pop();
                continue;
            } else {
                stack.push(currentSymbol);
                continue;
            }
        } 

        if(OPEN_BRACKETS.includes(currentSymbol)) { //if normal char
            stack.push(currentSymbol);      
        } else {
            if(stack.length === 0) {
                return false;
            }

            let topElement = stack[stack.length - 1];

            if(bracketsPairs[currentSymbol] === topElement) {
                stack.pop(); 
                } else {
                    return false;
                }
        }
    }

    return stack.length === 0;     
}

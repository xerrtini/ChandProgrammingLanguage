
class Chand{
    constructor(codes){
        this.codes = codes
    }

    tokenize(){
        const length = this.codes.length
        let pos = 0
        let tokens = []
        const BUILT_IN_KEYWORDS = ["raat", "aasman", "poornima", "amawas","taare"]
         // allowed characters for variable/keyword

        const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890'

        let line = 1
        let column = 0

        while(pos < length){
            let currentChar = this.codes[pos]
              // if current char is space or newline,  continue
            if(currentChar === " "){
                pos++
                column++
                continue
            }else if(currentChar === "\n"){
                line++
                column = 0
                pos++
                continue
            }else if(currentChar === '"'){
                // if current char is " then we have a string
                let res = ""
                pos++
                column++
                while(this.codes[pos] !== '"' && pos < length){
                    res += this.codes[pos]
                    pos++
                    column++
                }
                if(this.codes[pos] !== '"'){
                    return {
                        error: `Unterminated string at line ${line} column ${column}`
                    }
                }
                pos++
                column++
                tokens.push({
                    // adding the string to the tokens
                    type: "string",
                    value: res,
                })
            }else if(varChars.includes(currentChar)){
                let res = currentChar
                pos++
                column++
                while(varChars.includes(this.codes[pos]) && pos < length){
                    res += this.codes[pos]
                    pos++
                    column++
                }
                tokens.push({
                    type: BUILT_IN_KEYWORDS.includes(res) ? "keyword" : "keyword_custom",
                    value: res
                })
            }else if(currentChar === "="){
                pos++
                column++
                tokens.push({
                    type: "operator",
                    value: "eq"
                })
            }else{
                return {
                    error: `Unexpected character ${this.codes[pos]} at line ${line} column ${column}`
                }
            }
        }
        return {
            error: false,
            tokens
        }
    }

    parse(tokens){
        const len = tokens.length
        let pos = 0
        const vars = {}

        while(pos < len){
            const token = tokens[pos]


            // if token is a print keyword

            if(token.type === "keyword" && token.value === "raat"){
                if(!tokens[pos + 1]){
                    return console.log("Unexpected end of line, expected string")
                }
                let isVar = tokens[pos + 1].type === "keyword_custom"
                let isString = tokens[pos + 1].type === "string"
                if(!isString && !isVar){
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected string`)
                }
                if(isVar){
                    if(!(tokens[pos + 1].value in vars)){
                        return console.log(`Undefined variable ${tokens[pos + 1].value}`)
                    }
                    console.log('\x1b[32m%s\x1b[0m', vars[tokens[pos + 1].value])
                }else{
                    console.log('\x1b[35m%s\x1b[0m', tokens[pos + 1].value)
                }
                pos += 2
            } 

            else if(token.type === "keyword" && token.value === "poornima"){
                if(!tokens[pos + 1]){
                    return console.log("Unexpected end of line, expected string")
                }
                let isVar = tokens[pos + 1].type === "keyword_custom"
                let isString = tokens[pos + 1].type === "string"
                if(!isString && !isVar){
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected string`)
                }
                if(isVar){
                    if(!(tokens[pos + 1].value in vars)){
                        return console.log(`Undefined variable ${tokens[pos + 1].value}`)
                    }
                    console.log('\x1b[43m%s\x1b[1m\x1b[0m', vars[tokens[pos + 1].value.toUpperCase()])
                }else{
                    console.log('\x1b[43m%s\x1b[1m\x1b[0m', tokens[pos + 1].value.toUpperCase())
                }
                pos += 2
            }

            else if(token.type === "keyword" && token.value === "amawas"){
                if(!tokens[pos + 1]){
                    return console.log("Unexpected end of line, expected string")
                }
                let isVar = tokens[pos + 1].type === "keyword_custom"
                let isString = tokens[pos + 1].type === "string"
                if(!isString && !isVar){
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected string`)
                }
                if(isVar){
                    if(!(tokens[pos + 1].value in vars)){
                        return console.log(`Undefined variable ${tokens[pos + 1].value}`)
                    }
                    console.log('\x1b[8m%s\x1b[0m', vars[tokens[pos + 1].value])
                }else{
                    console.log('\x1b[8m%s\x1b[0m', tokens[pos + 1].value)
                }
                pos += 2
            }
            
              else if(token.type === "keyword" && token.value === "taare"){
                if(!tokens[pos + 1]){
                    return console.log("Unexpected end of line, expected string")
                }
                let isVar = tokens[pos + 1].type === "keyword_custom"
                let isString = tokens[pos + 1].type === "string"
                if(!isString && !isVar){
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected string`)
                }
                if(isVar){
                    if(!(tokens[pos + 1].value in vars)){
                        return console.log(`Undefined variable ${tokens[pos + 1].value}`)
                    }
                    console.log('\x1b[5m%s\x1b[0m', vars[tokens[pos + 1].value])
                }else{
                    console.log('\x1b[5m%s\x1b[0m', tokens[pos + 1].value)
                }
                pos += 2
            } 
             

            else if(token.type === "keyword" && token.value === "aasman"){
                const isCustomKW = tokens[pos + 1] && tokens[pos + 1].type === "keyword_custom"
                if(!isCustomKW){
                    if(!tokens[pos + 1]){
                        return console.log("Unexpected end of line, expected variable name")
                    }
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected variable name`)
                }
                const varName = tokens[pos + 1].value

                const isEq = tokens[pos + 2] && tokens[pos + 2].type === "operator" && tokens[pos + 2].value === "eq"
                if(!isEq){
                    if(!tokens[pos + 2]){
                        return console.log("Unexpected end of line, expected =")
                    }
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected =`)
                }

                const isString = tokens[pos + 3] && tokens[pos + 3].type === "string"
                if(!isString){
                    if(!tokens[pos + 3]){
                        return console.log("Unexpected end of line, expected string")
                    }
                    return console.log(`Unexpected token ${tokens[pos + 1].type}, expected string`)
                }

                if(varName in vars){
                    return console.log(`Variable ${varName} already exists`)
                }
                vars[varName] = tokens[pos + 3].value
                pos += 4
            }else{
                return console.log(`Unexpected token ${token.type}`)
            }
        }
    }

    run(){
        const { tokens, error } = this.tokenize()
        if(error){
            return console.log(error)
        }
        this.parse(tokens)
    }
}

const codes = 
`raat "tm chandini main tmhara chand compiler"
aasman msg = "aasman k variable"
poornima "poornima ka chand"
amawas "baadal"
taare "timtim"
raat msg
poornima msg
amawas msg
taare msg`
const chand = new Chand(codes)
chand.run()
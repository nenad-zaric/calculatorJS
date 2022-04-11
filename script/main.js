//Cvor binarnog stabla sa poljem koje sadrzi vrednost i pokazivacima na levu i desnu granu
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
//Binarno stablo izraza
class ExpressionTree{
    //Konstruktor binarnog stabla koji prevodi postfix izraz u binarno stablo
    constructor(expression){
        var stack = [];
        var t1, t2;

        for(var i=0;i<expression.length;i++){
            if(!this.isOperator(expression[i])){
                this.t = new Node(expression[i])
                stack.push(this.t);
            }
            else{
                this.t = new Node(expression[i]);
                t1 = stack.pop();
                t2 = stack.pop();
                this.t.right = t1;
                this.t.left = t2;
                stack.push(this.t);
            }
        }   
        this.t = stack[stack.length-1]
        console.log(stack);
        stack.pop();
    }

    //Provera da li je dati karakter operator
    isOperator(c){
        if(c=="+"||c=="-"||c=="*"||c=="/"||c=="("||c==")"){
            return true;
        }
        return false;
    }
    //Racunanje binarnog stabla koriscenjem inorder algoritma za prolaz kroz stablo
    evaluateTree(node){ 
        if(node!=null){
            if(node.left == null & node.right == null){
                return parseFloat(node.value);
            }
            var leftEval = this.evaluateTree(node.left)
            var rightEval = this.evaluateTree(node.right);
            
            if(node.value == "+"){
                return leftEval + rightEval;
            }
            else if(node.value == "-"){
                return leftEval - rightEval;
            }
            else if(node.value == "*"){
                return leftEval * rightEval;
            }
            else if(node.value == "/"){
                return leftEval / rightEval;
            }
        }
    }
}

class Buffer{
    constructor(expression){
        this.expression = expression;
        this.display = "0";
        this.lastSubimt = "0";
    }

    infixToPostfix(){
        var infix = this.tokenize(this.expression);
        var stack = [];
        var postfix = [];
    
        infix.push(")");
        stack.push("(");
    
        for(var i=0;i<infix.length;++i){
            if(infix[i]=="("){
                stack.push(infix[i]);
            }
        
            else if(!this.isOperator(infix[i])){
                postfix.push(infix[i]);
            }
            
            else if(infix[i]==")"){
                while(stack.length > 0 && stack[stack.length-1] != "("){
                    if(stack[stack.length-1] !="("){
                        postfix.push(stack.pop());
                    }
                    else{
                        stack.pop();
                    }
                }
            }
            else{
                while(stack.length > 0 && this.precedence(infix[i]) <= this.precedence(stack[stack.length-1])){
                    postfix.push(stack.pop());
                }
                stack.push(infix[i]);
            }
        }
        while(stack.length > 0){
            if(stack[stack.length-1] == "("){
                stack.pop(); 
            }
            else{
                console.log(stack[stack.length-1]);
                postfix.push(stack.pop());
            }
    
        }
    
        this.expression = postfix
    }

    tokenize(expression){
    
        var j=0;
        var tokenized = [];
    
        for(var i=0; i<=expression.length; i++){
            if((this.isOperator(expression[i]) && expression[i] != "(") || i==expression.length-1){
                var temp = "";
                for(j; j<i;j++){
                    if(!this.isOperator(expression[j])){
                        temp += expression[j];
                    }
                }
                if(temp != ""){
                    tokenized.push(temp);
                }
                tokenized.push(expression[i]);
            }
            else if(expression[i] == ("(")){
                tokenized.push(expression[i]);
            }
        }
        console.log(tokenized);
        return tokenized;
    }

    
    submit(c){
        //console.log(buffer);
        if(!(this.isOperatorNoParentasis(c) & (this.isOperatorNoParentasis(this.lastSubimt)))){
            if(this.expression=="0"){
                this.display = c;   
            }
            else{
                this.display += c;
            }
            this.expression += c;
            this.lastSubimt = c;
            document.querySelector("input").value = this.display;
        }
    }

    clear(){
        console.log("Clear")
        document.querySelector("input").value = "0";
        this.expression = "0";
        this.lastSubimt = "0";
        
    }

    calculate(){
        this.infixToPostfix();
        console.log("Postfix: " + this.expression);
        var tree = new ExpressionTree(this.expression);
        console.log(tree.t);
        var result = tree.evaluateTree(tree.t);
        document.querySelector("input").value = result;
        this.display = result;
        this.expression = result;

    }

  
    precedence(c){
        if(c =="+"||c=="-"){
            return 1;
        }
        else if(c=="*"||c=="/"){
            return 2;
        }
        return -1;
    }
    isOperator(c){
        if(c=="+"||c=="-"||c=="*"||c=="/"||c=="("||c==")"){
            return true;
        }
        return false;
    }
    isOperatorNoParentasis(c){
        if(c=="+"||c=="-"||c=="*"||c=="/"){
            return true;
        }
        return false;
    }
}

var buffer = new Buffer("0");


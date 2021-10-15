//Covr binarnog stabla sa poljem koje sadrzi vrednost i pokazivacima na levu i desnu granu
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
        if(c=="+"|c=="-"|c=="*"|c=="/"){
            return true;
        }
        return false;
    }
    //Racunanje binarnog stabla koriscenjem inorder algoritma za prolaz kroz stablo
    evaluateTree(node){ 
        if(node!=null){
            if(node.left == null & node.right == null){
                return parseInt(node.value);
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

var buffer = "";

function submit(c){
    
    buffer += c;
    document.querySelector("input").value = buffer;
}

function clear(){
    console.log("Clear")
    document.querySelector("input").value = "";
    buffer = "";
}

function calculate(){
    var postFixBuffer = infixToPostfix(buffer).split(" ");
    deletePar(postFixBuffer);
    console.log("Postfix: " + postFixBuffer);
    tree = new ExpressionTree(postFixBuffer);
    console.log(tree.t);
    result = tree.evaluateTree(tree.t);
    document.querySelector("input").value = result;
}



function infixToPostfix(infix){
    var postfix = "";
    
    var stack = [];

    for(var i=0;i<infix.length;++i){
        var c = infix[i];

        if(!isOperator(c)){
            postfix += c;
        }
        else if(c=="("){
            stack.push(c);
        }
        else if(c==")"){
            while(stack.length > 0 & stack[stack.length-1] != "("){
                postfix += " ";
                postfix += stack.pop();
            }
        }
        else{
            while(stack.length > 0 && getPriority(c) <= stack[stack.length-1]){
                postfix += stack.pop();
                
            }
            stack.push(c);
            postfix += " ";
        }
    }

    while(stack.length > 0){
        postfix += " ";
        postfix += stack.pop();
    }

    return postfix
}

function getPriority(c){
    if(c =="+"|c=="-"){
        return 1;
    }
    else if(c=="*"|c=="*"){
        return 2;
    }
    return -1;
}

function isOperator(c){
    if(c=="+"|c=="-"|c=="*"|c=="/"|c=="("|c==")"){
        return true;
    }
    return false;
}

function deletePar(s){
    for(var i=0;i<s.length;i++){
        if(s[i] == "(" | s[i]==")"){
            console.log(s[i]);
            s.splice(i,1);
        }
    }
}
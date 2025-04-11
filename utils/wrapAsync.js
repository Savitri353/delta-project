 module.exports =  (fn)=> {
    return (req, res, next) => {
        fn(req,res,next).catch(next);
    }
};

//A function who takes an argument called function.
//which returns a function, who executes our func which is in parameter.//try catch
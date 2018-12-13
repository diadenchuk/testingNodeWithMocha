function AuthController(){

    let roles;
    let user;
    function setRoles(role){
        roles = role;
    }

    function setUser(inUser){
        user = inUser;
    }

    // function isAuthorized(neededRole){
    //     return roles.indexOf(neededRole) >= 0;
    // }

    function isAuthorized(neededRole){
        if(user){
            return user.isAuthorized(neededRole);
        }
    }

    function isAuthorizedAsync(neededRole, cb){
        setTimeout(function(){cb(roles.indexOf(neededRole) >= 0)}, 2100);
    }

    function isAuthorizedPromise(neededRole, cb){
        return new Promise(function(resolve){
            setTimeout(function(){resolve(roles.indexOf(neededRole) >= 0)}, 2100);
        });
    }
    function getIndex(req, res){
        try {
            if(req.user.isAuthorized('admin')){
                return res.render('index');
            }
            res.render('notAuth');
        } catch (error) {
            res.render('error');
        }
        
    }
    return {isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise, getIndex, setUser};
}

module.exports = AuthController();
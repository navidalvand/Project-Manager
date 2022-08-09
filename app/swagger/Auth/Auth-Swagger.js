//?                                            REGISTER USERS
/**
 * @swagger
 *  paths :
 *    /auth/register : 
 *      post :
 *        summary : Register Account
 *        tags : [Auth]
 *        requestBody :
 *          required : true
 *          content : 
 *            application/json :
 *              schema :
 *                type : object
 *                required :
 *                  - email
 *                  - username 
 *                  - phone_number
 *                  - password
 *                  - confirm_password
 *                properties : 
 *                  username :
 *                    type : string
 *                  email : 
 *                    type : string
 *                  phone_number :
 *                    type : string
 *                  password : 
 *                    type : string
 *                  confirm_password :
 *                    type : string
 *        responses :
 *          200 :
 *            description : The List Of The Users
 *            content :
 *              application/json :
 *                schema :
 *                  type : array
 *                  items :
 *                    $ref : "#/components/schemas/users"
 *          400 :
 *            description : Cannot Register
*/

//?                                            LOGIN USERS
/**
 * @swagger
 *  paths :
 *    /auth/login : 
 *      post :
 *        summary : Login Into Account
 *        tags : [Auth]
 *        requestBody :
 *          required : true
 *          content : 
 *            application/json :
 *              schema :
 *                type : object
 *                required :
 *                  - username 
 *                  - password
 *                properties : 
 *                  username :
 *                    type : string
 *                  password : 
 *                    type : string
 *        responses :
 *          200 :
 *            description : The List Of The Users
 *            content :
 *              application/json :
 *                schema :
 *                  type : array
 *                  items :
 *                    $ref : "#/components/schemas/users"
 *          400 :
 *             description : Cannot Login Into Your Account
*/

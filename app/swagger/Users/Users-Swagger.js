//?                                            GET USERS LIST
/**
 * @swagger
 *  paths :
 *    /users : 
 *      get :
 *        summary : Get All Users
 *        tags : [Users]
 *        responses :
 *          200 :
 *            description : The List Of The Users
 *            content :
 *              application/json :
 *                schema :
 *                  type : array
 *                  items :
 *                    $ref : "#/components/schemas/users"
*/

//?                                            USER PROFILE
/**
 * @swagger
 *  paths :
 *    /users/profile : 
 *      get :
 *        summary : Get User
 *        tags : [Users]
 *        parameters :
 *          - in : header
 *            name : authentication
 *            description : Bearer User Token
 *        responses :
 *          200 :
 *            description : The User Profile
 *            content :
 *              application/json :
 *                schema :
 *                  type : array
 *                  items :
 *                    $ref : "#/components/schemas/users"
*/

//?                                            USER DELETE ACCOUNT
/**
 * @swagger
 *  paths :
 *    /users/delete : 
 *      delete :
 *        summary : Delete User Account
 *        tags : [Users]
 *        parameters :
 *          - in : header
 *            name : authentication
 *            description : Bearer User Token
 *        responses :
 *          200 :
 *            description : Your Account Deleted
 *            content :
 *              application/json :
 *                schema :
 *                  type : array
 *                  items :
 *                    $ref : "#/components/schemas/users"
*/

//?                                            UPDATE USER PROFILE
/**
 * @swagger
 *  paths :
 *    /users/update : 
 *      patch :
 *        summary : Update User Account
 *        tags : [Users]
 *        parameters :
 *          - in : header
 *            name : authentication
 *            description : Bearer User Token
 *        requestBody :
 *          required : true
 *          content : 
 *            application/json :
 *              schema :
 *                type : object
 *                properties :
 *                     first_name :
 *                         type : string 
 *                     last_name : 
 *                         type : string
 *                     username : 
 *                         type : string
 *                     phone_number : 
 *                         type : string
 *                     email :
 *                         type : string
 *                     skills :
 *                         type : array
 *                         items : 
 *                           type : string
 *        responses :
 *          200 :
 *            description : Your Account Updated
 *            content :
 *              application/json :
 *                schema :
 *                  type : array
 *                  items :
 *                    $ref : "#/components/schemas/users"
*/

/**
 * @swagger 
 *  paths :
 *    /users/create :
 *       post :
 *          summary : Create User
 *          tags : [Users]
 *          requestBody :
 *              content :
 *                  application/json :
 *                      schema :
 *                          type : array
 *                          items :
 *                               $ref : "#/components/schemas/users"
 *          responses :
 *              200 :
 *                  description : User Created
 *                  content : 
 *                    application/json :
 *                       schema :
 *                          type : array
 *                          items :
 *                             $ref : "#/components/schemas/users"
 *              400 :
 *                  description : Cannot Create User
 */

//?                                            UPLOAD USER PROFILE PICTURE
/**
 * @swagger 
 *  paths :
 *    /users/profile-image :
 *       post :
 *          summary : Uoload User Profile
 *          tags : [Users]
 *          parameters :
 *              - name : authentication
 *                in : header
 *                description : Bearer User Token
 *                required : true
 *              - name : image 
 *                in : form-data
 *                description : User Profile Image
 *                required : true
 *          responses :
 *              200 : 
 *                  description : User Profile Uploaded
 *                  content : 
 *                      application/json :
 *                          schema :
 *                              type : array
 *                              items : 
 *                                  $ref : "#/components/schemas/users"
 *                          
 *              400 :
 *                  description : Cannot Upload User Profile
 */

//?                                            GET ONE USER BY ID
/**
 * @swagger 
 *   paths :
 *      /users/{id} :
 *          get :
 *              summary : Get User By ID
 *              tags : [Users]
 *              parameters :
 *                  - name : id
 *                    in : path
 *              responses :
 *                  200 :
 *                      description : The User
 *                      content : 
 *                          application/json :
 *                              schema : 
 *                                  type : array
 *                                  items : 
 *                                      $ref : "#/components/schemas/users"
 *                  400 : 
 *                      description : User Not Found
 */

//?                                            DELETE ONE USER BY ID
/**
 * @swagger 
 *   paths :
 *      /users/{id} :
 *          delete :
 *              summary : Delete User By ID
 *              tags : [Users]
 *              parameters :
 *                  - name : id
 *                    in : path
 *              responses :
 *                  200 :
 *                      description : Deleted User
 *                      content : 
 *                          application/json :
 *                              schema : 
 *                                  type : array
 *                                  items : 
 *                                      $ref : "#/components/schemas/users"
 *                  400 : 
 *                      description : User Not Found
 */


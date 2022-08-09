/**
 * @swagger 
 *  paths :
 *    /project/all-projects :
 *      get :
 *          summary : Get All Projects
 *          tags : [Projects]
 *          responses :
 *              200 :
 *                  description : All Projects
 *                  content :
 *                      application/json : 
 *                          schema :
 *                              type : array
 *                              items : 
 *                                  $ref : "#/components/schemas/Projects"
 */


/**
 * @swagger
 *   paths :
 *      /project/user:
 *          get :
 *              summary : Getting All User Projects
 *              tags : [Projects]
 *              parameters :
 *                - name : authentication
 *                  description : User Token
 *                  in : header
 *              responses : 
 *                  200 : 
 *                      description : All User Projects
 *                      content :
 *                          application/json : 
 *                              schema :    
 *                                  type : array
 *                                  items : 
 *                                      $ref : "#/components/schemas/Projects"
 *                  400 :
 *                      description : Please Login Into Your Account
 */

/**
 * @swagger
 *   paths :
 *      /project/create:
 *          post :
 *              summary : Create Project
 *              tags : [Projects]
 *              parameters :
 *                - name : authentication
 *                  description : User Token
 *                  in : header
 *              requestBody :
 *                  content :
 *                      application/json : 
 *                          schema :
 *                              type : object
 *                              required : 
 *                                  - title
 *                              properties :
 *                                  title :
 *                                      type : string
 *                                  description : 
 *                                      type : string
 *                                  privateProject :
 *                                      type : boolean
 *                                  tags :
 *                                      type : array 
 *                                      items : 
 *                                          type : string
 *              responses : 
 *                  200 : 
 *                      description : Project Created
 *                      content :
 *                          application/json : 
 *                              schema :    
 *                                  type : array
 *                                  items : 
 *                                      $ref : "#/components/schemas/Projects"
 *                  400 :
 *                      description : Faild To Create
 */

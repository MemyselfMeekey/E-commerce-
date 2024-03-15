 request-response cycle
    endpoint(URL/API)call

    URL------->Request------>Server(process)---->response--->client

    Request
        -shares everything
            Url endpoint
            method(5 get, post, put, patch, delete)---->route
            Data
                body--->hidden
                query--->?key=value&key1=value
                params--->/params/param1
            Generate/client
                -network
                -configuration
                -time

---------------------------------------------------------------
for express npm install express
    ---express is a complete framework because it can be structured as the developer wants

MVC pattern
    ---->Module-View-Controller

    Model===>Database
    View==>Presentation
    Controlller==>Business logic

    Route(url)---->Controller
    Route(url)---->Controller <----->Model---->DB Server    
                       --------->Client Response


//get,post,put,patch,delete-->http request, http verbs, rest api method

CRUD
C=> Create-=>post
R=> Read=> get
U=> Update=> ,patch
D=> Delete=> delete


res.send
res.end
res.render
res,download
res.json
res.sendStatus
res.status().json()

## Express rest method
## Routing in express
expressApp.get("url",req,res=>{logic}) //browser supported
expressApp.post("url",req,res=>{logic}) //browser supported
expressApp.put("url",req,res=>{logic})
expressApp.patch("url",req,res=>{logic})
expressApp.delete("url",req,res=>{logic})


## Poject plan(ecommerce)
 -> Authentication and Authorization using custom registration
 -> User
    -3roles=>admin,seller,customer
 -> product
 -> Brand
 -> Category
 -> Order

 -> transaction
 -> offers
 -> Review
 ->

 Api-->goes to server to check data and etc


 ## Middleware
    -> A special function built within or outside express which can
        -manipulate a request,
        -respond to the client,
        - call next middleware function

    --> every middleware contains atleast 3 params
        function(req:,res:,next){
            req manipulate,
            res send
            next()
        }



## app.use(router)
=>When you use app.use(router), you are telling Express to use the middleware functions or routes defined in the router object for all HTTP requests that match the specified path. This means that any request that matches the path specified when defining the router will be passed through the middleware functions and route handlers defined in that router.

## Poject Proposal
    -objective => What are you going to buld
    -> Features=> Lists
    E.g
        Single vendor commerce project
        -Authorizaton and Authentication
        -categorized products
        -Category Management
        -Brand Management
        -Banner Management
        -User Management
        -Order Management
        
design (MVC)
    -arct
    -service based


Auth Module 
    ==> registration
        --->name,email(usename),role,phone,image
    ==>Verification
    - > Set password
    =>Login
    => Changes Password by login User
    => reset or forget password 
        --OTP
    ==> reset the password
    => Get the logged in User

## Module Banner
    -create a folder banner inside module directory
    - define a router to handle all the crud operation
    - develop a router inside banner folder and mount it on /banner endpoint
    - The routes a banner can have are as follow:

    method              url                 middleware                        Authentication
    get                 /banner              loginCheck                       list all banner
    post                /banner              loginCheck                        create a banner
    get                 /banner/:id          loginCheck                       detail of a banner
    put                 /banner/:id          loginCheck                        update a banner
    delete              /banner/:id          loginCheck                        delete a banner
    get                 /banner/home/list                               list specialized banners

# brand module
    -same as that of banner
    method       url              middleware          action
    get         /:slug/products     ---none---      list products by brand slug

# category module
    -same as that of banner
     method       url              middleware          action
    get         /:slug/products     ---none---      category of products by brand slug

# password lai- login garesi password * garni




Body data 
    ==>name, email, role
        ===> Mappindg(Structuring the data recieved to store in DB)
            ===> generate token ====>for activation process i.e. OTP
                ==> validate
                    ==> Password Entry
                        ==> User account attach (token or otp===>invalid)
Email Service/ SMS service or GMS service(twilio,awa sns),api call in nepal
---->we use fake smtp server configuration
    host value, usernama value, tls, port
            NPM INSTALL NODE MAILER

## Socket sserver
-----       ------       -----          ------
clients     clients     clients         clients

//severv bhitra event hru huna sakcha jun chai backrgound ma run huncha


node events
    emitter==> emit
    listener==> 
    
## database server
    -stack
    -client
    -cost
    -project

    2 type
    a. Relational database Management system
        --mySql, msSql, Oracle, etc
    b. non-Relationaldatabase Management system
        --mongodb,couchdb,etc

        --mongodb server
            -local setup
            - cloud hosting(free upto 512 MB storage) atlas

        a. mongodb server(community edition)
        b. mongodb shell(mongosh shell service)// optional
        c. mongodb compass(GUI based application)//optional
username: meekey17
pass:UWYnH6PO1omDWrlI

server run garnalai
protocol-mongodb if localhost, mongodb+srv for server
host -localhost,127.0.0.1, or atlas
port- 27017
user-not required, atlas-dbusername
password-not required, atlas-dbusernamepassword
dbname-<your db name>

URL: protocol://username:password@host:port/dbName?options
eg:
    mongodb:///127.0.0.1:27017/
DB:
 ->CREATE AND USE IT 
  -> Data operation
    -CRUD operation

COLLECTION (Table)
    -create 
        =>.insertOne()
        =>.insertMany([objects])
    -Read
        =>.find(filter,projection)
        =>.find1(filter,projection)

        filter is a condition
        -->datatype is an object data
            {key:value,key1:Value}
             -->...where key=value and key1=balue1
             {$op:[{}]}
            operate or{$or:[{key:value},{key1:value1}]}
                =>...where key-value or key1=value1
                {$and=[{key:value},{key1:value1}]}

                {key:{$op:value}}
                eg:
                {age:{$gte:18}}
                ==>..where age>=18  
            mongodb
                $gt,$gte,$lt,$lte,$and and etc for more go to

            ==>Update
            ->.updateOne(filter,updatebody,options)
            ->.updateMany(filter,updatebody,options)

            ==>delete
            -->.deleteOne(filter)
            -->.deleteMany(filter)

MONGOOSE-->ORM-->Object Relation Mapper

    DB physical
    Table                                           Codes
    Name:plural and in small letter             Model:name==>singular form of table name
    eg user                    ===============> Model Name:User
Column Name:                    ==============> Model Property
e.g
    users->email,name            =============>user->Property->name,email
    Every row represents an instance of a model class

    mongodb ====>MONGOOSE
    sql(postgres, mySql)===>sequalize, typeorm, prisma

   -Authorizaton and Authentication
        --entity-->data users dara=>user entity
        -user Management
            -crud=>user entity
        -categorized products
            crud=product entity
        -Category Management
            -category entity
        -Brand Management
            -brand entity
        -User Management
            -user Managemententity
        -Order Management
            -order entity

USER entity
        ---enum Userrole{
  amdin
  seller
  customer
}
enum userstatus{
  active
  inactive
}
table users{
  _id objectId [primary key]
  name string 
  email string [unique]
  role Userrole [default: 'customer']
  password string
  activationtoken string
  expirydate datetime
  status userstatus [default: 'inactive']
  forgetToken string
  address json
  createdby string [ref: -users._id]
  updateBy objectId [ref: -users._id]
}

entity banner   
    title
    image
    url
    status--> active,inactive

entity brand
    title or name
    slug
    logo or image
    status->inactive and active
    show in home tab==>boolean

Category
    name
    slug
    status
    ShowInHome
    parentId ==>in mongoose when making datatype mongoose.types.objectId, ref:"Category",default:null
    image

_id     name    slug    status  ShowInHome  parentId    image
1.       electronics     active  true        null        null
2.      television      active  true        1           null3
3.      smart television active false       2           null
 
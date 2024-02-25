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
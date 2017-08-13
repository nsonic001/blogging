# blogging API

How to run this

1. install npm
2. install nodejs
3. create your own secrets.js inside `configs` and provide your db_credentials like given below
```
	module.exports = {
  		"db_url": "mongodb://<db-user>:<db-password>@<db-cluster-path>:<db-port>/<db-name>?replicaSet=<if-any>",
	}

``` 
3. run command `npm install`
4. run `node bin/www`

----------------------------------------------------------------
***API's exposed***

**API to POST Blog**
*POST - /api/blog/*

*body* -
```
{data:"<content>"}

``` 

*response* - 
```
{
    "__v": 0,
    "_id": "<blog-id>",
    "modified": "2017-08-13T12:19:21.154Z",
    "created": "2017-08-13T12:19:21.154Z",
    "paragraphs": [
        {
            "__v": 0,
            "text": "<paragraph-text>",
            "blog_id": "<blog-id>",
            "order": 1,
            "_id": "<paragraph-id>",
            "modified": "2017-08-13T12:19:21.240Z",
            "created": "2017-08-13T12:19:21.240Z",
            "comments": []
        },
    ]
}

``` 


----------------------------------------------------------------
**API to get Blogs list with limit offset**

*GET(list) - /api/blog/?limit=<limit-val>&offset=<offset-val>*

response -
```

{
    "meta": {
        "limit": <limit-val>,
        "offset": <offset-val>,
        "total_count": <total-doc-count>
    },
    "objects": [
        {
            "_id": "<blog-id>",
            "paragraphs": [
                {
                    "_id": "<paragraph-id>",
                    "text": "<paragraph-text>"
                },
                .
                .
                .
                
            ]
        }
    ]
}


```


----------------------------------------------------------------
**API to GET Blog by Id**

*GET(individual) - /api/blog/:id/*

*response* -

```
{
    "__v": 0,
    "_id": "<blog-id>",
    "modified": "2017-08-13T12:19:21.154Z",
    "created": "2017-08-13T12:19:21.154Z",
    "paragraphs": [
        {
            "__v": 0,
            "text": "<paragraph-text>",
            "blog_id": "<blog-id>",
            "order": 1,
            "_id": "<paragraph-id>",
            "modified": "2017-08-13T12:19:21.240Z",
            "created": "2017-08-13T12:19:21.240Z",
            "comments": <comments-list>
        },
    ]
}

``` 

----------------------------------------------------------------

**API to POST Comments**

*POST - /api/paragraph/<paragraph-id>/comment/*

*body* -
```
{data:"<content>"}

``` 

*response* - 
```
{
    "__v": 0,
    "text": "<paragraph-text>",
    "blog_id": "<blog-id>",
    "order": 1,
    "_id": "<paragraph-id>",
    "modified": "2017-08-13T12:19:21.240Z",
    "created": "2017-08-13T12:19:21.240Z",
    "comments": <comments-list>
}

```

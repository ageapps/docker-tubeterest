![foto](https://raw.githubusercontent.com/ageapps/docker-tubeterest/master/art/docker-tubeterest.jpg)
# docker-tubeterest
Dockerized tubeterest, based on my previous project [Tubeterest], which is an example of a web application using [Polymer] library.


Following the [Microservices architecture], the system consists on three services that run in separate containers:

+ Front-End service: [NGINX] server. It serves polymer´s built html. Using the official [nginx image].
+ Back-End service: [node.js] server. Using the official [node image].
+ Database service: [MongoDB] database. Using the official [mongo image].


## Demo

Yo can find a demo, working [here]

## Usage with git
Downloading the source code

```groovy
$ git clone https://github.com/ageapps/docker-tubeterest.git
$ cd docker-tubeterest
$ docker-compose up
// connect in your browser to <host IP>:8080
```

## Usage with docker-compose, without source code
Just download docker-compose file to pull all images and build the app.

```groovy
// download docker-compose file
$ curl https://raw.githubusercontent.com/ageapps/docker-tubeterest/master/docker-hub-compose.yml -o docker-compose.yml
// run application
$ docker-compose up
// connect in your browser to <host IP>:8080
```

## Usage with Docker Hub
No download needed, images will pull automatically.

```groovy
// run mongo service
$ docker run -v "$(pwd)"/database:/data --name mongo_tubeterest -d mongo mongod --smallfiles
// run docker-tubeterest-node image
$ docker run -d --name node_tubeterest --link mongo_tubeterest:db ageapps/docker-tubeterest-node:latest
// run docker-tubeterest-nginx image
$ docker run -d --name nginx_tubeterest --link node_tubeterest:back -p 8080:80 ageapps/docker-tubeterest-nginx:latest
// connect in your browser to <host IP>:8080
```

## Resources
+ [Polymer]: Front-End library
+ [NGINX]: Web server and reverse-proxi
+ [Docker]: Software containerization platform
+ [node.js]: Server enviroment.
+ [MongoDB]: NoSQL database system.
+ [mongoose]: MongoDB object modeling for *node.js*.
+ [docker-build]: Automated build of *Docker* images.
+ [docker-compose]: Automated configuration and run of multi-container *Docker* applications.



[here]: http://swarm1397.cloudhero.io:8083/
[Microservices architecture]: http://microservices.io/patterns/microservices.html
[SocketIOChatDemo]: https://github.com/ageapps/SocketIOChatDemo.git
[node image]: https://hub.docker.com/_/node/
[mongo image]: https://hub.docker.com/_/mongo/
[nginx image]: https://hub.docker.com/_/nginx/
[MongoDB]: https://www.mongodb.com
[mongoose]: http://mongoosejs.com/index.html
[node.js]: http://nodejs.org
[Docker]: https://docs.docker.com/
[docker-compose]:https://docs.docker.com/compose/compose-file/
[docker-build]:https://docs.docker.com/engine/reference/builder/
[Polymer]:https://www.polymer-project.org/1.0/docs/devguide/feature-overview
[NGINX]:https://www.nginx.com/
[Tubeterest]:https://github.com/ageapps/TubeTerest

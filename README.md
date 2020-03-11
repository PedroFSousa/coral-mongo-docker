# MongoDB Docker

This repository contains the source code for building an MongoDB Docker image based on the [original image](https://github.com/docker-library/mongo), modified to: 
- remove lock files from previous containers;
- change the authentication mechanism to MONGODB-CR before creating the user;
- create `obibauser` role with `anyAction` privileges on all resources;
- grant the user created with `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` the following roles:
  - `readWrite` and `dbAdmin` on the `agate` and `mica`  databases;
  - `obibauser`, `clusterMonitor` and `readAnyDatabase` on the `admin` database.

## Building
After every commit, GitLab CI automatically builds the image and pushes it into INESC TEC's Docker Registry. The version tag of the image is determined from a string matching `##x.x.x##` on the commit message.

Alternatively, an image can be built locally by running:
`docker build -t mongo-docker .`

## Setting Up
**Environment Variables**  
The following environment variables are required:

* `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` are the credentials that will be used to create the user.

If you are using Docker Swarm, you can instead set the following variables to enable Docker secrets:
* `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD_FILE`

**Volumes**  
To persist the data across executions, you can mount `/data/db` as a volume.

## Running

Create a `docker-compose.yml` file (examples bellow) and run `docker-compuse up`.

**Basic Example:**
```yml
version: '3.2'

services:
  mongo:
    image: docker-registry.inesctec.pt/coral/coral-docker-images/coral-mongo-docker:1.2.0
    container_name: mongo
    environment:
    - MONGO_INITDB_ROOT_USERNAME=<INSERT_VALUE_HERE>
    - MONGO_INITDB_ROOT_PASSWORD=<INSERT_VALUE_HERE>
    volumes:
    - mongo:/data/db

volumes:
  mongo:
```
**Docker Swarm Example:**
```yml
version: '3.2'

services:
  mongo:
    image: docker-registry.inesctec.pt/coral/coral-docker-images/coral-mongo-docker:1.2.0
    container_name: mongo
    environment:
    - MONGO_INITDB_ROOT_USERNAME=<INSERT_VALUE_HERE>
    - MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/MONGO_INITDB_ROOT_PASSWORD
    secrets:
    - MONGO_INITDB_ROOT_PASSWORD
    volumes:
    - mongo:/data/db

secrets:
  MONGO_INITDB_ROOT_PASSWORD:
    external: true

volumes:
  mongo:
```

<br>

---
master: [![pipeline status](https://gitlab.inesctec.pt/coral/coral-docker-images/coral-mongo-docker/badges/master/pipeline.svg)](https://gitlab.inesctec.pt/coral/coral-docker-images/coral-mongo-docker/commits/master)

dev: &emsp;&ensp;[![pipeline status](https://gitlab.inesctec.pt/coral/coral-docker-images/coral-mongo-docker/badges/dev/pipeline.svg)](https://gitlab.inesctec.pt/coral/coral-docker-images/coral-mongo-docker/commits/dev)

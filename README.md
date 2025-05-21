
* docker-compose => `docker-compose -f docker/docker-compose.yaml -f docker/dev/docker-compose.dev.yaml up --build`
* Network => `docker network create dev-shared-net prod-shared-net stg-shared-net`
* K8s => kubectl apply -f <path_to_k8s_directory>

# Mini-Instapay
Payments application offering ability to send, receive, and manage financial balances with summaries and transaction managment and reports.

---

## Project structure

```bash
.
├── frontend
│   ├── k8s
│   └── src
│       ├── components
│       └── pages
├── reporting-service
│   ├── docker
│   │   ├── dev
│   │   ├── prod
│   │   └── stg
│   ├── k8s
│   │   ├── dev
│   │   ├── prod
│   │   └── staging
│   └── src
│       ├── controllers
│       ├── middlewares
│       ├── models
│       ├── routes
│       ├── services
│       └── utils
├── transaction-service
│   ├── docker
│   │   ├── dev
│   │   ├── prod
│   │   └── stg
│   ├── k8s
│   │   ├── dev
│   │   ├── prod
│   │   └── staging
│   └── src
│       ├── controllers
│       ├── middlewares
│       ├── models
│       ├── routes
│       ├── services
│       └── utils
└── user-service
    ├── docker
    │   ├── dev
    │   ├── prod
    │   └── stg
    ├── k8s
    │   ├── dev
    │   ├── prod
    │   └── staging
    └── src
        ├── controllers
        ├── middlewares
        ├── models
        ├── routes
        ├── services
        └── utils
```

- Divided into 3 micro services, each has its own Docker image and Kubernetes deployment.
- Hosted on Ingress
- 3 environments: Development, Production, Staging
- Frontend built with ReactJS

---

## Installation

### Docker images
* To build images of each service using `docker build` use the following command:
```bash
cd <service>
docker build -f docker/Dockerfile -t <image_name> .
```

so for example to build the user service image we would do this:
```bash 
cd user-service
docker build -f docker/Dockerfile -t user-service-dev
```

---

### docker-compose
* To build images and run containers using `docker-compose` we would use the following command:
```bash
cd <service>
docker-compose -f docker/docker-compose.yaml -f docker-compose.<env>.yaml --build
```
where `<env>` is the environment we want to run from `dev`, `prod` or `stg`.
For example to build and run the `dev` environment of the user service we would use the following command:
```bash
cd user-service
docker-compose -f docker/docker-compose.yaml -f docker-compose.dev.yaml --build
```

---

### Kubernetes
* Mini-instapay is deployed on K8s and served through Ingress to offer easy access to the app.

* To deploy our app on K8s you need to have the images built and available locally on your device using one of the previous methods.

* To deploy a service we would use the following commands:
```bash
cd <service>
kubectl apply -f k8s/<env>
```
where `<env>` is the environment we want to run from `dev`, `prod` or `stg`.
For example to deploy the user service on `dev` environment we would use:
```bash
cd user-service
kubectl apply -f k8s/dev
```

to stop our deployment we would use:
```bash
kubectl delete -f k8s/<env>
```


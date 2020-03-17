## todo-app.yml

```yaml
version: "3"
services:
  vote:
    image: bretfisher/examplevotingapp_vote
    deploy:
      replicas: 1
      placement:
        constraints: [node.role != manager]
    ports:
      - 80:80
    networks:
      - frontend
    depends_on:
      - redis

  redis:
    image: redis:3.2
    networks:
      - frontend
    deploy:
      replicas: 1
      placement:
        constraints: [node.role != manager]

  db:
    image: postgres:9.4
    networks:
      - backend
    volumes:
      - db-data:/var/lib/postgresql/data
    deploy:
      placement:
        constraints: [node.role != manager]


  worker:
    image: bretfisher/examplevotingapp_worker:java
    deploy:
      placement:
        constraints: [node.role != manager]
      replicas: 1
    networks:
      - frontend
      - backend
    depends_on:
      - db
      - redis

  result-app:
    image: bretfisher/examplevotingapp_result
    deploy:
      replicas: 1
      placement:
        constraints: [node.role != manager]
    ports:
      - 30080:80
    networks:
      - backend
    depends_on:
      - db

  app:
    image: dockersamples/visualizer
    ports:
        - "9000:8080"
    volumes:
        - /var/run/docker.sock:/var/run/docker.sock
    deploy:
        mode: global
        placement:
            constraints: [node.role == manager]

networks:
  frontend:
  backend:
volumes:
  db-data:
```


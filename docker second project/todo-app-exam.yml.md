# todo-app-exam.yml

```yaml
version: "3"
services:
  nginx:
    image: registry:5000/ch04/nginx:latest
    deploy:
      replicas: 2
      placement:
        constraints: [node.role != manager]
    depends_on:
      - api
    environment:
      WORKER_PROCESSES: 2
      WORKER_CONNECTIONS: 1024
      KEEPALIVE_TIMEOUT: 65
      GZIP: "on"
      BACKEND_HOST: todo_app_exam_api:8080
      BACKEND_MAX_FAILES: 3
      BACKEND_FAIL_TIMEOUT: 10s
      SERVER_PORT: 8000
      SERVER_NAME: todo_app_exam_nginx
      LOG_STDOUT: "true"
    networks:
      - todoapp_exam

  api:
    image: registry:5000/ch04/todoapi:latest 
    deploy:
      replicas: 2
      placement:
        constraints: [node.role != manager]
    environment:
      TODO_BIND: ":8080"
      TODO_MASTER_URL: "gihyo:gihyo@tcp(todo_mysql_exam_master:3306)/tododb?parseTime=true"
      TODO_SLAVE_URL: "gihyo:gihyo@tcp(todo_mysql_exam_slave:3306)/tododb?parseTime=true"
    networks:
      - todoapp_exam

networks:
  todoapp_exam:
    external: true
```


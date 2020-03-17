# todo-frontend-exam.yml

```yaml
version: "3"
services:
  nginx-exam:
    image: registry:5000/ch04/nginx-nuxt:latest 
    deploy:
      replicas: 2
      placement:
        constraints: [node.role != manager]
    depends_on:
      - web
    environment:
      SERVICE_PORTS: 80
      WORKER_PROCESSES: 2
      WORKER_CONNECTIONS: 1024
      KEEPALIVE_TIMEOUT: 65
      GZIP: "on"
      BACKEND_HOST: todo_frontend_exam_web-exam:3000
      BACKEND_MAX_FAILES: 3
      BACKEND_FAIL_TIMEOUT: 10s
      SERVER_PORT: 80
      SERVER_NAME: localhost
      LOG_STDOUT: "true"
    networks:
      - todoapp_exam
    volumes:
      - assets:/var/www/_nuxt

  web-exam:
    image: registry:5000/ch04/todoweb:latest
    deploy:
      replicas: 2
      placement:
        constraints: [node.role != manager]
    environment:
      TODO_API_URL: http://todo_app_exam_nginx:8000
    networks:
      - todoapp_exam
    volumes:
      - assets:/todoweb/.nuxt/dist

networks:
  todoapp_exam:
    external: true

volumes:
  assets:
    driver: local
```


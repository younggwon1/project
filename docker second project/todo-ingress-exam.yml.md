# todo-ingress-exam.yml

```yaml
version: "3"

services:
  haproxy_exam:
    image: dockercloud/haproxy
    networks: 
      - todoapp_exam 
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      mode: global
      placement:
        constraints:
          - node.role == manager
    ports:
      - 80:80
      - 1936:1936 # for stats page (basic auth. stats:stats)

networks:
  todoapp_exam:
    external: true
```


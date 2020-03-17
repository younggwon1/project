## docker-compose.yml

```yaml
version: '3'
services:
  drupal:
    image: custom-drupal
    ports:
      - "8080:80"
    volumes:
      - drupal-modules:/var/www/html/modules
      - drupal-profiles:/var/www/html/profiles
      - drupal-sites:/var/www/html/sites
      - drupal-themes:/var/www/html/themes
  mysql:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=mypasswd 
volumes:
  drupal-modules:
  drupal-profiles:
  drupal-sites:
  drupal-themes:
```


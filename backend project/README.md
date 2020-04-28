### Spring Boot를 활용한 Web Application Project 생성하기

1. Spring Boot 프로젝트 생성
https://start.spring.io/
(boot 버전 2.1, java , maven)
group, artifactid는 소문자로 작성
web dependency 추가
해당 zip 파일이 생성 -> unzip한 후 -> file : open project

2. DB 연결
 : Maria DB / h2 memory
 : DatabaseRunner 클래스를 참고해서 연결되었는지 파악 (DataSource 사용, connection url, username ...)
 : spring boot jdbc 의존성 추가 되어야 함

3. ORM 선택
 : JPA, MyBatis 둘 중 하나  
JPA를 선택했다면,
 - spring boot data jpa 의존성 필요함
 - Entity Class 작성(Table 1개와 매핑되도록)
   - @Entity
   - @id, @Generated, @Column(unique 1개 설정해보기)

jpa 관련 설정(mariadb)

jpa

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

설정 이후 Table 생성 여부와 구조를 확인하기
(desc ...) 

4. Repository Interface 만들기
 - findById()는 자동 생성
 - pk이외의 컬럼에 대한 finder method를 생성할 수 있다.
 - findByUsername / findByEmail

5. TestCase 클래스 작성
 - 등록/조회

이게 다되면 다음 스텝으로 넘어가기
6. Rest 서비스 작성
 - RestController 클래스 작성
   - 등록/수정/삭제/조회(1개, 전체)
   - 기본 jason format
 - PostMan 툴을 사용한 테스트
   - xml format으로 조회 구현도 해보기
    - jackson dependency 추가
 - PostMan 툴을 사용해서 테스트

7. Controller 클래스 작성
 - 등록/수정/삭제/조회(1개, 전체)
 - static/index.html 작성
 - templates밑에 html (타임리프) 작성
  - Thymeleaf dependency 추가

8. 예외처리
 - system, 404 error 페이지 작성

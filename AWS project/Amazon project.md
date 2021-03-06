# Amazon EC2 Linux 인스턴스 시작하기

> 인스턴스를 시작할 때 키 페어와 보안 그룹을 지정하여 인스턴스 보안을 설정한다. 인스턴스에 연결할 때는 인스턴스 시작 시 지정한 키 페어의 프라이빗 키를 지정해야 한다.

[https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/EC2_GetStarted.html](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/EC2_GetStarted.html)

### 1. 인스턴스 시작

1. Amazon EC2 콘솔을 연다.
2. 콘솔 대시보드에서 **인스턴스 시작**을 선택합니다.
3. **Amazon Machine Image(AMI) 선택** 페이지에서 Amazon Linux 2의 HVM 버전을 선택합니다. 해당되는 AMI는 "프리 티어 사용 가능"으로 표시됩니다.
4. **인스턴스 유형 선택** 페이지에서 기본적으로 선택된 `t2.micro` 유형을 선택합니다.
5. **검토 후 시작(Review and Launch)** 클릭
6. **인스턴스 시작 검토** 페이지의 **보안 그룹** 아래에서 마법사가 보안 그룹을 만들고 선택했음을 확인합니다.
7. **인스턴스 시작 검토** 페이지에서 **시작**을 선택합니다.
8. 키 페어에 대한 메시지가 나타나면 **기존 키 페어 선택**을 선택한 다음 설치할 때 생성한 키 페어를 선택합니다. 또는 새로운 키 페어를 생성할 수 있습니다.
9. **인스턴스 보기**를 선택하여 확인 페이지를 닫고 콘솔로 돌아갑니다.
10. **인스턴스** 화면에서 시작 상태를 볼 수 있습니다. 인스턴스가 시작된 후에는 상태가 `running`으로 바뀌고 퍼블릭 DNS 이름을 받습니다.



### 2. 인스턴스에 연결

> putty를 사용하여 windows에서 Linux 인스턴스에 연결



#### 2.1 PuTTYgen을 사용하여 프라이빗 키 변환

1. **Type of key to generate(생성할 키 유형)**에서 **RSA**를 선택합니다.
2. **로드**를 선택합니다. 기본적으로 PuTTYgen에는 확장명이 `.ppk`인 파일만 표시됩니다. `.pem` 파일을 찾으려면 모든 유형의 파일을 표시하는 옵션을 선택합니다.
3. **Save private key(프라이빗 키 저장)**을 선택하여 PuTTY에서 사용할 수 있는 형식으로 키를 저장합니다. PuTTYgen에서 암호 없이 키 저장에 대한 경고가 표시됩니다. **예**를 선택합니다.



#### 2.2 **PuTTY를 사용하여 인스턴스에 연결**

1. **Host Name(호스트 이름)** 상자에  퍼블릭 DNS 이름을 입력합니다.

2. **Port(포트)** 값이 22인지 확인합니다.

3. **연결 유형** 아래에서 **SSH**를 선택합니다.

4. **범주** 창에서 **연결**, **SSH**를 확장한 다음 **Auth**를 선택합니다. 다음 작업을 완료합니다.

   4.1 **찾아보기**를 선택합니다.

   4.2 키 페어에 대해 생성한 `.ppk` 파일을 선택한 다음 **열기**를 선택합니다.

   4.3 **열기**를 선택합니다.

---

# NoSQL 테이블 생성 및 쿼리

>  [DynamoDB 콘솔](https://console.aws.amazon.com/console/home?region=us-east-1)을 사용하여 간단한 테이블을 만들고, 데이터를 추가하며, 데이터를 스캔 및 쿼리하고, 데이터와 테이블을 삭제하는 방법을 알아봅니다.
>
>  [https://aws.amazon.com/ko/getting-started/tutorials/create-nosql-table/](https://aws.amazon.com/ko/getting-started/tutorials/create-nosql-table/)



### 1. 원본 NoSQL 만들기



### 2. 데이터를 NoSQL 테이블에 추가하기



### 3. NoSQL 테이블 쿼리하기



### 4. 기존 항목 삭제하기



### 5. NoSQL 테이블 삭제하기



---

# Elastic Beanstalk 사용 시작(Platform은 도커로)

> [https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/GettingStarted.CreateApp.html](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/GettingStarted.CreateApp.html)

### 1. 예제 애플리케이션 생성

1. 다음 링크를 사용하여 Elastic Beanstalk 콘솔을 엽니다: https://console.aws.amazon.com/elasticbeanstalk/home#/gettingStarted?applicationName=getting-started-app
2. **플랫폼**에 대해 플랫폼을 선택한 다음 **애플리케이션 생성**을 선택합니다.(docker)
3. 이름이 **getting-started-app**인 Elastic Beanstalk 애플리케이션을 생성합니다.
4. 다음 AWS 리소스가 있으며 이름이 **GettingStartedApp-env**인 환경을 시작합니다.
5. **Sample Application**이라는 새 애플리케이션 버전을 작성합니다. 이것이 기본 Elastic Beanstalk 예제 애플리케이션 파일입니다.
6. **GettingStartedApp-env** 환경에 예제 애플리케이션의 코드를 배포합니다.

---



# 자습서: Amazon EC2에서 애플리케이션의 가용성 향상

> AMI에서 여러 EC2 인스턴스를 시작한 다음 Elastic Load Balancing을 사용하여 애플리케이션에 대한 수신 트래픽을 EC2 인스턴스 간에 분산할 수 있습니다. 이렇게 하면 애플리케이션의 가용성이 향상됩니다. 인스턴스를 여러 가용 영역에 배치하면 애플리케이션의 내결함성도 향상됩니다. 가용 영역 하나가 중단되면 트래픽이 다른 가용 영역으로 라우팅됩니다.
>
> Amazon EC2 Auto Scaling을 사용하여 애플리케이션에 대한 실행 인스턴스 수를 항상 최소한으로 유지할 수 있습니다. 인스턴스나 애플리케이션이 비정상일 때를 감지하고 자동으로 교체하여 애플리케이션의 가용성을 유지합니다.



- 사전 조건

  - 가상 사설 클라우드(VPC)를 생성한다.

  - VPC에서 인스턴스를 시작한다.

  - 인스턴스를 사용자 지정하였다.

  - 인스턴스에서 애플리케이션을 테스트하여 인스턴스가 올바르게 구성되었는지 확인한다.

    

#### 1. 애플리케이션 확장 및 로드 밸런싱

> 다음 절차를 사용하여 로드 밸런서를 만들고, 인스턴스에 대한 시작 구성을 만든 다음. 두 개 이상의 인스턴스가 포함된 Auto Scaling 그룹을 만들고. 로드 밸런서를 Auto Scaling 그룹과 연결합니다.



#### 2. 로드 밸런서 테스트

> 클라이언트가 로드 밸런서에 요청을 보내면 로드 밸런서는 그 요청을 등록된 인스턴스 중 하나로 라우팅합니다.

- 테스트 준비
  - 인스턴스가 준비되었는지 확인합니다. **Auto Scaling 그룹** 페이지에서 Auto Scaling 그룹을 선택한 후 **인스턴스**를 선택합니다. 처음에는 인스턴스가 `Pending` 상태로 되어 있습니다. 상태가 `InService`이면, 사용할 준비가 된 것입니다.
  - 인스턴스가 로드 밸런서에 등록되어 있는지 확인합니다. 인스턴스 상태가 `initial`이면, 아직 등록 중일 수도 있습니다. 인스턴스의 상태가 `healthy`이면 사용할 준비가 된 것입니다. 
  - 로드 밸런서 페이지에서 로드 밸런서를 선택합니다.
  - 설명 탭에서 DNS 이름을 찾습니다.


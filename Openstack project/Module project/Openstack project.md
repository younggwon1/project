# Openstack project

> Openstack을 이용하여 Private Cloud 구축

## 0 . 설정

```
hyper-v와 vm-ware 충돌 문제 
설정 -앱 - 프로그램 및 기능 - windows 기능 켜기/ 끄기 - hyper-v  체크 해제
```

## 1. 주제 1 : Manual 설치를 완성합니다.

```
0. 설정
10.0.0.11로 설정된 기존 manual-controller를 이용하고 block1 node(1cpu, 1G)는 분리하여 구축합니다.

1. 문제
	
	참고 :https://docs.openstack.org/install-guide/openstack-services.html
	
	1) comute service - nova installation for Rocky
	https://docs.openstack.org/nova/rocky/install
	
	2) networking service - neutron installation for Rocky
	https://docs.openstack.org/neutron/rocky/install
	
	3) dashboard - horizon installation for Rocky
	https://docs.openstack.org/horizon/rocky/install
	
	4) block storage service - cinder installation for Rocky
	https://docs.openstack.org/cinder/rocky/install
	
	5) launch an instance
	
	참고 : https://docs.openstack.org/install-guide/launch-instance.html
		
		(1) create virtual networks
		
		(2) self-service network
	 https://docs.openstack.org/install-guide/launch-instance-networks-selfservice.html
		
		(3) launch an instance on the self-service network
	
	6) floating ip로 key 기반 접속
```

### 1 - 1) openstack-manual.vmdk status

#### (1) manual ip / hostname 확인

```
[root@controller ~]# vi /etc/sysconfig/network-scripts/ifcfg-ens33
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
#UUID="e6724ecf-06b5-4d74-80bc-f838c0e98f6c"
DEVICE="ens33"
ONBOOT="yes"
IPADDR="10.0.0.11" ## ip 확인
PREFIX="24"
GATEWAY="10.0.0.2"
DNS1="10.0.0.2"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_PRIVACY="no"


[root@openstack-manual ~]# hostnamectl set-hostname openstack-manual
[root@openstack-manual ~]# hostname
openstack-manual
```

#### (2)openstack install status

```
[root@openstack-manual ~]# rpm -qa|grep openstack
openstack-nova-novncproxy-18.2.3-1.el7.noarch
python2-openstacksdk-0.17.3-1.el7.noarch
python2-openstackclient-3.16.3-1.el7.noarch
openstack-keystone-14.1.0-1.el7.noarch
openstack-nova-common-18.2.3-1.el7.noarch
openstack-nova-console-18.2.3-1.el7.noarch
openstack-nova-scheduler-18.2.3-1.el7.noarch
openstack-nova-conductor-18.2.3-1.el7.noarch
openstack-utils-2017.1-1.el7.noarch
openstack-selinux-0.8.14-1.el7.noarch
centos-release-openstack-rocky-1-1.el7.centos.noarch
openstack-glance-17.0.0-2.el7.noarch
python-openstackclient-lang-3.16.3-1.el7.noarch
openstack-nova-api-18.2.3-1.el7.noarch
openstack-nova-placement-api-18.2.3-1.el7.noarch
```

### 1 - 2) 설정 파일 변경 및 설치

#### (1) comute service - nova installation for Rocky

> [Nova](https://docs.openstack.org/nova/rocky/install/)

- Nova 설정 변경 전 상태

```
[root@openstack-manual ~]# rpm -qa|grep nova
python-nova-18.2.3-1.el7.noarch
openstack-nova-novncproxy-18.2.3-1.el7.noarch
python2-novaclient-11.0.1-1.el7.noarch
openstack-nova-common-18.2.3-1.el7.noarch
openstack-nova-console-18.2.3-1.el7.noarch
openstack-nova-scheduler-18.2.3-1.el7.noarch
openstack-nova-conductor-18.2.3-1.el7.noarch
openstack-nova-api-18.2.3-1.el7.noarch
openstack-nova-placement-api-18.2.3-1.el7.noarch
```

- Nova 설정 변경

```
Install and configure controller node for Red Hat Enterprise Linux and CentOS

1. Prerequisites : Before you install and configure the Compute service, you must create databases, service credentials, and API endpoints.

	1) To create the databases, complete these steps
	
		(1) Create the nova_api, nova, nova_cell0, and placement databases:
		
[root@openstack-manual ~]# mysql -u root -p
Enter password: (abc123)
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 14913
Server version: 10.1.20-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| glance             |
| information_schema |
| keystone           |
| mysql              |
| nova               |
| nova_api           |
| nova_cell0         |
| performance_schema |
| placement          |
| test               |
+--------------------+

		(2) Grant proper access to the databases:

MariaDB [(none)]> GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' \
    ->   IDENTIFIED BY 'NOVA_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' \
    ->   IDENTIFIED BY 'NOVA_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' \
    ->   IDENTIFIED BY 'NOVA_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]>  GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' \
    ->   IDENTIFIED BY 'NOVA_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' \
    ->   IDENTIFIED BY 'NOVA_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' \
    ->   IDENTIFIED BY 'NOVA_DBPASS';
Query OK, 0 rows affected (0.01 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'localhost' \
    ->   IDENTIFIED BY 'PLACEMENT_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON placement.* TO 'placement'@'%' \
    ->   IDENTIFIED BY 'PLACEMENT_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> flush privileges;
Query OK, 0 rows affected (0.01 sec)
 
		(3) Replace NOVA_DBPASS and PLACEMENT_DBPASS with a suitable password. Exit the 			database access client.

MariaDB [(none)]> exit
Bye
[root@openstack-manual ~]#

	2) Source the admin credentials to gain access to admin-only CLI commands:
	
[root@openstack-manual ~]# . admin-openrc
[root@openstack-manual ~]#

	3) Create the Compute service credentials:
	
		(1) Create the nova user:
	
[root@openstack-manual ~]# openstack user create --domain default --password-prompt nova
User Password:(abc123)
Repeat User Password:(abc123)
Conflict occurred attempting to store user - Duplicate entry found with name nova at domain ID default. (HTTP 409) (Request-ID: req-a6b8e80d-bf16-49a9-80de-4b905ce8b73a)

		(2) Add the admin role to the nova user : This command provides no output.
		
[root@openstack-manual ~]# openstack role add --project service --user nova admin
[root@openstack-manual ~]#

		(3) Create the nova service entity:

[root@openstack-manual ~]# openstack service create --name nova \
>   --description "OpenStack Compute" compute
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | OpenStack Compute                |
| enabled     | True                             |
| id          | 13fd1147730e417cb670ef62fa356820 |
| name        | nova                             |
| type        | compute                          |
+-------------+----------------------------------+

	4) Create the Compute API service endpoints:
	
[root@openstack-manual ~]# openstack endpoint create --region RegionOne \
>   compute public http://controller:8774/v2.1
Multiple service matches found for 'compute', use an ID to be more specific

[root@openstack-manual ~]# openstack endpoint create --region RegionOne \
>   compute internal http://controller:8774/v2.1
Multiple service matches found for 'compute', use an ID to be more specific.

[root@openstack-manual ~]# openstack endpoint create --region RegionOne \
>   compute admin http://controller:8774/v2.1
Multiple service matches found for 'compute', use an ID to be more specific.

	5) Create a Placement service user using your chosen PLACEMENT_PASS:
	
[root@openstack-manual ~]# openstack user create --domain default --password-prompt placement

User Password: (abc123)
Repeat User Password: (abc123)
Conflict occurred attempting to store user - Duplicate entry found with name placement at domain ID default. (HTTP 409) (Request-ID: req-12b328f1-16cf-4680-bdf3-724b6cf4cf20)

	6) Add the Placement user to the service project with the admin role : This command provides no output.
	
[root@openstack-manual ~]# openstack role add --project service --user placement admin
[root@openstack-manual ~]#

	7) Create the Placement API entry in the service catalog:
	
[root@openstack-manual ~]# openstack service create --name placement \
>   --description "Placement API" placement

+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Placement API                    |
| enabled     | True                             |
| id          | a1114f82a0214f53a3de84f4cab4f855 |
| name        | placement                        |
| type        | placement                        |
+-------------+----------------------------------+
[root@openstack-manual ~]# 

	8) Create the Placement API service endpoints:
	
[root@openstack-manual ~]#  openstack endpoint create --region RegionOne \
>   placement public http://controller:8778
Multiple service matches found for 'placement', use an ID to be more specific.
[root@openstack-manual ~]# openstack endpoint create --region RegionOne \
>   placement internal http://controller:8778
Multiple service matches found for 'placement', use an ID to be more specific.
[root@openstack-manual ~]# openstack endpoint create --region RegionOne \
>   placement admin http://controller:8778
Multiple service matches found for 'placement', use an ID to be more specific.


2. Install and configure components : Default configuration files vary by distribution. You might need to add these sections and options rather than modifying existing sections and options. Also, an ellipsis (...) in the configuration snippets indicates potential default configuration options that you should retain

	1) Install the packages:
	
[root@openstack-manual ~]# yum install openstack-nova-api openstack-nova-conductor \
>   openstack-nova-console openstack-nova-novncproxy \
>   openstack-nova-scheduler openstack-nova-placement-api
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirror.kakao.com
 * centos-qemu-ev: mirror.kakao.com
 * extras: mirror.kakao.com
 * updates: mirror.kakao.com
Package 1:openstack-nova-api-18.2.3-1.el7.noarch already installed and latest version
Package 1:openstack-nova-conductor-18.2.3-1.el7.noarch already installed and latest version
Package 1:openstack-nova-console-18.2.3-1.el7.noarch already installed and latest version
Package 1:openstack-nova-novncproxy-18.2.3-1.el7.noarch already installed and latest version
Package 1:openstack-nova-scheduler-18.2.3-1.el7.noarch already installed and latest version
Package 1:openstack-nova-placement-api-18.2.3-1.el7.noarch already installed and latest version
Nothing to do

	2)Edit the /etc/nova/nova.conf file and complete the following actions:

[root@openstack-manual ~]# vim /etc/nova/nova.conf

  	1 [DEFAULT]
    2 enabled_apis = osapi_compute,metadata
    
```

## 2. 주제 2 : Packstack을 이용하여 two-nodes openstack을 구축합니다.

```
0. 설정
controller - 10.0.0.200(6G , 2cpus)
compute1 - 10.0.0.201(2G, 2cpus)

1. 문제
구축 후 glacne의 backend stores를 swift와 연결합니다.
Dashboard에 연결하여 cirros 이미지를 등록하고
swift 사용자로 로그인 하여 저장된 container를 확인합니다.

2. packstack answerfile의 요구사항

CONFIG_DEFAULT_PASSWORD=abc123 
CONFIG_CEILOMETER_INSTALL=n 
CONFIG_AODH_INSTALL=n 
CONFIG_KEYSTONE_ADMIN_PW=abc123 
CONFIG_HEAT_INSTALL=y 
CONFIG_MAGNUM_INSTALL=y 
CONFIG_TROVE_INSTALL=y 
CONFIG_NEUTRON_L2_AGENT=openvswitch 
CONFIG_NEUTRON_OVS_BRIDGE_IFACES=br-ex:ens33 
CONFIG_COMPUTE_HOSTS=10.0.0.200,10.0.0.201 
```

#### 2 - 0) 설정

```
1. controller 

	1) ip 변경
	
root@controller ~]# vi /etc/sysconfig/network-scripts/ifcfg-ens33
TYPE="Ethernet"
BOOTPROTO="none"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="54f12d5e-fee7-46b7-b657-b03ea86991ba"
DEVICE="ens33"
ONBOOT="yes"
IPADDR="10.0.0.200" ## 100 -> 200
PREFIX="24"
GATEWAY="10.0.0.2"
DNS1="10.0.0.2"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_PRIVACY="no"

	2) hostname 변경
	
root@controller ~]# hostnamectl set-hostname Ex-compute1
재접속
[root@ex-compute1 ~]#

2. compute1 
	
	1)ip 변경

TYPE="Ethernet"
BOOTPROTO="none"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="54f12d5e-fee7-46b7-b657-b03ea86991ba"
DEVICE="ens33"
ONBOOT="yes"
IPADDR="10.0.0.201" # 101->201
PREFIX="24"
GATEWAY="10.0.0.2"
DNS1="10.0.0.2"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_PRIVACY="no"

	2) hostname 변경
	
root@controller ~]# hostnamectl set-hostname Ex-controller
재접속
root@ex-controller ~]# 
```

[![2 - compute1 성능](https://user-images.githubusercontent.com/48763676/72583276-00516c80-3929-11ea-8328-eb5d6a7d8324.PNG)](https://user-images.githubusercontent.com/48763676/72583276-00516c80-3929-11ea-8328-eb5d6a7d8324.PNG)

[![2 - controller 성능](https://user-images.githubusercontent.com/48763676/72583277-00516c80-3929-11ea-8877-6be2697a9044.PNG)](https://user-images.githubusercontent.com/48763676/72583277-00516c80-3929-11ea-8877-6be2697a9044.PNG)

#### 2 - 1) controller packstack install

```
1. yum을 최신으로 업데이트 한다.
[root@controller ~]# yum update


2. 오픈스택 ocata release 설치를 위한 패키지를 설치한다.
[root@controller ~]# yum install centos-release-openstack-ocata epel-release -y


3. packstack package install
[root@controller ~]# yum install openstack-packstack -y


4. openstack package 정보 확인
[root@ex-controller ~]# rpm -qa|grep openstack
openstack-packstack-13.0.0-1.el7.noarch
puppet-openstack_extras-13.3.1-1.el7.noarch
openstack-packstack-puppet-13.0.0-1.el7.noarch
centos-release-openstack-rocky-1-1.el7.centos.noarch
puppet-openstacklib-13.3.1-1.el7.noarch


5. network 및 방화벽 조건 설정
[root@ex-controller ~]# systemctl disable firewalld
[root@ex-controller ~]# systemctl stop firewalld
[root@ex-controller ~]# setenforce 0
setenforce: SELinux is disabled
[root@ex-controller ~]# systemctl disable NetworkManager
[root@ex-controller ~]# systemctl stop NetworkManager
[root@ex-controller ~]# systemctl enable network
network.service is not a native service, redirecting to /sbin/chkconfig.
Executing /sbin/chkconfig network on
[root@ex-controller ~]# systemctl start network
[root@ex-controller ~]#

6. answerfile.txt 수정
[root@ex-controller ~]# packstack --gen-answer-file=/root/answerfile.txt
[root@ex-controller ~]# vim answerfile.txt

   9 # Default password to be used everywhere (overridden by passwords set
  10 # for individual services or users).
  11 CONFIG_DEFAULT_PASSWORD=abc123

  43 # Specify 'y' to install OpenStack Metering (ceilometer). Note this
  44 # will also automatically install gnocchi service and configures it as
  45 # the metrics backend. ['y', 'n']
  46 CONFIG_CEILOMETER_INSTALL=n
  
  48 # Specify 'y' to install OpenStack Telemetry Alarming (Aodh). Note
  49 # Aodh requires Ceilometer to be installed as well. ['y', 'n']
  50 CONFIG_AODH_INSTALL=n
  
 325 # Password to use for the Identity service 'admin' user.
 326 CONFIG_KEYSTONE_ADMIN_PW=abc123

  59 # Specify 'y' to install OpenStack Orchestration (heat). ['y', 'n']
  60 CONFIG_HEAT_INSTALL=y
  
  62 # Specify 'y' to install OpenStack Container Infrastructure
  63 # Management Service (magnum). ['y', 'n']
  64 CONFIG_MAGNUM_INSTALL=y

  66 # Specify 'y' to install OpenStack Database (trove) ['y', 'n']
  67 CONFIG_TROVE_INSTALL=y

 842 # Name of the L2 agent to be used with OpenStack Networking.
 843 # ['linuxbridge', 'openvswitch', 'ovn']
 844 CONFIG_NEUTRON_L2_AGENT=openvswitch

 864 # Comma-separated list of colon-separated Open vSwitch
 865 # <bridge>:<interface> pairs. The interface will be added to the
 866 # associated bridge. If you desire the bridge to be persistent a value
 867 # must be added to this directive, also
 868 # CONFIG_NEUTRON_OVS_BRIDGE_MAPPINGS must be set in order to create
 869 # the proper port. This can be achieved from the command line by
 870 # issuing the following command: packstack --allinone --os-neutron-
 871 # ovs-bridge-mappings=ext-net:br-ex --os-neutron-ovs-bridge-interfaces
 872 # =br-ex:eth0
 873 CONFIG_NEUTRON_OVS_BRIDGE_IFACES=br-ex:ens33

  96 # List the servers on which to install the Compute service.
  97 CONFIG_COMPUTE_HOSTS=10.0.0.200,10.0.0.201



7. hosts 수정

1) Ex-controller

[root@ex-controller ~]# vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.0.0.100 controller ## 100->200 controller -> Ex-controller 
10.0.0.100 compute    ## 200->201 compute -> Ex-compute1

2) Ex-compute1


127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.0.0.100 controller  ## 100->200 controller -> Ex-controller 
10.0.0.101 compute1    ## 200->201 compute -> Ex-compute1


8. Answerfile.txt를 이용하여 packstack 설치
root@controller ~

[root@controller ~]# packstack --answer-file=/root/answerfile.txt

Welcome to the Packstack setup utility

The installation log file is available at: /var/tmp/packstack/20200117-132258-fqljPF/openstack-setup.log

Installing:
Clean Up                                             [ DONE ]
Discovering ip protocol version                      [ DONE ]
root@10.0.0.201's password: (Ex-compute1 의 root 비밀번호 입력)
Setting up ssh keys                                  [ DONE ]
이하 중략
 **** Installation completed successfully ******


[root@ex-controller ~]# 
```

#### 2 - 2) 구축된 dashboard의 admin 계정 확인

[![2 - dashboard main page](https://user-images.githubusercontent.com/48763676/72590096-554cad00-3940-11ea-8fa0-d0a2a014e56f.PNG)](https://user-images.githubusercontent.com/48763676/72590096-554cad00-3940-11ea-8fa0-d0a2a014e56f.PNG)

[![2 - admin image 확인](https://user-images.githubusercontent.com/48763676/72590249-a65ca100-3940-11ea-903d-518427d38500.PNG)](https://user-images.githubusercontent.com/48763676/72590249-a65ca100-3940-11ea-903d-518427d38500.PNG)

#### 2 - 3) glance의 backend stores를 swift와 연결

> 교재 p.629 - 630

- glance-api.conf 설정파일 수정하기

```
1. 접속

[root@ex-controller ~]# . keystonerc_admin
[root@ex-controller ~(keystone_admin)]#

2. image 확인

[root@ex-controller ~(keystone_admin)]# openstack image list
+--------------------------------------+--------+--------+
| ID                                   | Name   | Status |
+--------------------------------------+--------+--------+
| d5f9ddba-81c6-4a9b-9da1-fa51045e566f | cirros | active |
+--------------------------------------+--------+--------+

[root@ex-controller ~(keystone_admin)]# ll /var/lib/glance/images
합계 12960
-rw-r----- 1 glance glance 13267968  1월 17 12:18 d5f9ddba-81c6-4a9b-9da1-fa51045e566f

3. glance-api.conf 수정

[root@ex-controller ~(keystone_admin)]# vim /etc/glance/glance-api.conf

2053 stores=file,http,swift ## swift가 추가되어 있는지 확인

2107 default_store=file
2107 default_store=swift  ## file -> swift

2441 filesystem_store_datadir=/var/lib/glance/images/ 
2441 #filesystem_store_datadir=/var/lib/glance/images/ ## 주석처리

3213 #swift_store_auth_version = 3 
3213 swift_store_auth_version = 3 ## 맨 앞에 주석처리 된 것 주석 삭제

3222 #swift_store_auth_address = <None>
**address 주소 확인**
[root@ex-controller ~(keystone_admin)]# cat keystonerc_admin 
	unset OS_SERVICE_TOKEN
    export OS_USERNAME=admin
    export OS_PASSWORD='abc123'
    export OS_REGION_NAME=RegionOne
    export OS_AUTH_URL=http://10.0.0.200:5000/v3 ## address 주소
    export PS1='[\u@\h \W(keystone_admin)]\$ '
3222 swift_store_auth_address = http://10.0.0.200:5000/v3 ##controller 주소 입력

3230 #swift_store_user = <None>
** user의 services name 확인**
	1. admin-dashboard 접속 : http://10.0.0.200/dashboard
	2. 인증 - 프로젝트 - 프로젝트 이름명
3230 swift_store_user = services:swift ## 주석 제거, user 추가

3239 #swift_store_key = <None>
**answerfile.txt 에서 key 확인**
[root@ex-controller ~(keystone_admin)]# grep SWIFT answerfile.txt 
CONFIG_SWIFT_INSTALL=y
CONFIG_SWIFT_KS_PW=546994f1a64c470e ## key 값
CONFIG_SWIFT_STORAGES=
CONFIG_SWIFT_STORAGE_ZONES=1
CONFIG_SWIFT_STORAGE_REPLICAS=1
CONFIG_SWIFT_STORAGE_FSTYPE=ext4
CONFIG_SWIFT_HASH=0dbe7e3754e64dfe
CONFIG_SWIFT_STORAGE_SIZE=2G
1129 CONFIG_SWIFT_KS_PW=546994f1a64c470e
**answerfile.txt 에서 key 확인
3239 swift_store_key = 546994f1a64c470e ## answerfile에서 key 확인해서 넣어주기

2991 #swift_store_create_container_on_put = false
2991 swift_store_create_container_on_put = True ## 주석제거, false 값 수정

2921 #swift_store_container = glance
2921 swift_store_container = glance ## 주석제거

3467 os_region_name=RegionOne ## 확인
```

#### 2 - 3) Dashboard에 연결하여 Cirros 이미지 등록

```
[root@ex-controller ~(keystone_admin)]# systemctl restart openstack-glance-api openstack-glance-registry
[root@ex-controller ~(keystone_admin)]# 

[root@ex-controller ~(keystone_admin)]# lsof -i tcp:9292
COMMAND     PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
httpd     39933 apache   14u  IPv4 468738      0t0  TCP Ex-controller:38494->Ex-controller:armtechdaemon (CLOSE_WAIT)
httpd     39933 apache   32u  IPv4 498193      0t0  TCP Ex-controller:39316->Ex-controller:armtechdaemon (CLOSE_WAIT)
httpd     39933 apache   34u  IPv4 493048      0t0  TCP Ex-controller:38974->Ex-00      0t0  TCP Ex-controller:39684->Ex-controller:armtechdaemon (CLOSE_WAIT)
glance-ap 62403 glance    4u  IPv4 641526      0t0  TCP *:armtechdaemon (LISTEN)
glance-ap 62457 glance    4u  IPv4 641526      0t0  TCP *:armtechdaemon (LISTEN)
glance-ap 62458 glance    4u  IPv4 641526      0t0  TCP *:armtechdaemon (LISTEN)
```

#### 2 - 4) swift 사용자로 로그인하여 저장된 container를 확인

- admin/swift : 변화 전

[![2 - 결과 - admin 변화 전](https://user-images.githubusercontent.com/48763676/72595942-5258b900-394e-11ea-9b0e-d521cbf32a43.PNG)](https://user-images.githubusercontent.com/48763676/72595942-5258b900-394e-11ea-9b0e-d521cbf32a43.PNG)

[![2 - 결과 - swift 변화 전](https://user-images.githubusercontent.com/48763676/72595965-5f75a800-394e-11ea-9c61-f63030f4d1b5.PNG)](https://user-images.githubusercontent.com/48763676/72595965-5f75a800-394e-11ea-9c61-f63030f4d1b5.PNG)

- admin image 추가

[![2 - 결과 - admin 변화 후](https://user-images.githubusercontent.com/48763676/72595943-5258b900-394e-11ea-9ddd-4827cab0f976.PNG)](https://user-images.githubusercontent.com/48763676/72595943-5258b900-394e-11ea-9ddd-4827cab0f976.PNG)

- swift image 변화 확인

[![2 - 결과 - swift 변화 후1](https://user-images.githubusercontent.com/48763676/72596010-787e5900-394e-11ea-99ed-4b3dd70dcd85.PNG)](https://user-images.githubusercontent.com/48763676/72596010-787e5900-394e-11ea-99ed-4b3dd70dcd85.PNG)

[![2 - 결과 - swift 변화 후2](https://user-images.githubusercontent.com/48763676/72596009-787e5900-394e-11ea-886a-7b47e6f38488.PNG)](https://user-images.githubusercontent.com/48763676/72596009-787e5900-394e-11ea-886a-7b47e6f38488.PNG)
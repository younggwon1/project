```
Openstack Private Cloud
1.오픈스택  소개
  -오픈스택 개요(private cloud/IaaS)
  -오픈스택 역사
  -오픈스택 구조(7가지 core service 이해)
2.오픈스택 구성
  -오픈스택 설치 방법
  -오픈스택 Architecture
  -컨트롤러 준비작업
   os update,/etc/hosts,ntp server 구축,centos 최적화(filrewalld/NetworkManager/SELinux),repository 추가
3.오픈스택 설치(packstack on centos)

vi openstack.txt
-----------------------------------------------------
326 CONFIG_KEYSTONE_ADMIN_PW=abc123
1185 CONFIG_PROVISION_DEMO=n
11 CONFIG_DEFAULT_PASSWORD=abc123
46 CONFIG_CEILOMETER_INSTALL=n
 50 CONFIG_AODH_INSTALL=n
873 CONFIG_NEUTRON_OVS_BRIDGE_IFACES=br-ex:ens33
----------------------------------------------------------------------------

Day2
4.오픈스택 서비스 사용하기

Horizon 접속
Horizon 메뉴
Openstack 용어 정의
프로젝트/사용자 /Flavor 생성 

--------------------------------------------------------------------------
네트워크/라우터
Floating IP용: ext1->subext1->10.0.0.0/24,gw: 10.0.0.2, dns:10.0.0.2,dhcp X, 사용 IP pool(10.0.0.210,10.0.0.220),외부네트워크
Fixed IP 용: int1->subint1->192.168.0.0/24,gw:192.168.0.254,dns:10.0.0.2,dhcp 활성화)
router1 생성
외부 네트워크과 router간 연결: 게이트웨이 설정
내부 네트워크와 router간 연결: 인터페이스 추가
--------------------------------------------------------------------------
yum install -y openstack-utils
openstack-status
cirros/cubswin:)

/보안그룹/Floating IP 생성
Keypair 생성
이미지
인스턴스 시작
볼륨


Day3
실습 하기
-----------------------------------------------------------------------------
프로젝트 생성: team1
사용자 생성: user1(_member_)
Flavor 생성: a.micro: cpu1,m 256,disk 1G (admin)
user1/
네트워크/라우터
   Floating IP용: ext1 그대로 사용
   Fixed IP 용: team1-int1->subteam1->192.168.1.0/24,gw:192.168.1.254,dns:10.0.0.2,dhcp 활성화)
   team1-r1 생성
  외부 네트워크과 router간 연결: 게이트웨이 설정
  내부 네트워크와 router간 연결: 인터페이스 추가
보안그룹: ssh,icmp (team1sg)
Floating IP 생성 :2개 할당
Keypair 생성: user1-key1
이미지 등록:cirros
인스턴스 시작: team1_instance
볼륨 생성 후 instance에 연결:1G v1 (lsblk)
-----------------------------------------------------------------------------

volumw/vm snapshot 생성
Swift 사용하기

manual 설치(https://docs.openstack.org/install-guide/)
------------------------------------------------------
Overview
Example architecture
Networking
Environment
  Security
  Host networking
  Network Time Protocol (NTP)
  OpenStack packages
  SQL database
  Message queue
  Memcached

5.OpenStack CLI로 관리하기 
Identity 서비스 (Keystone)
                 -서비스 특징 
                 -서비스 구조
                 -CLI로 관리

https://docs.openstack.org/keystone/rocky/install/index-rdo.html
  Identity service overview
  Install and configure
    Prerequisites
    Install and configure components
    Configure the Apache HTTP server
    Finalize the installation
    Create a domain, projects, users, and roles
    Verify operation
    Create OpenStack client environment scripts
    Creating the scripts
    Using the scripts


ss -nlp|grep 11211
netstat -an|grep 11211
hostnamectl set-hostname controller

 742 connection = mysql+pymysql://keystone:KEYSTONE_DBPASS@controller/keystone
 2829 provider = fernet

ss -nlp|grep http
tcp    LISTEN     0      128    [::]:5000               [::]:* 

export OS_USERNAME=admin
export OS_PASSWORD=ADMIN_PASS
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
-------------------------------------------------------------

Day4

9:00~10:00 까지 manual 설치 오류처리 및 정리
Image Service (Glance)
----------------------------------------------------
https://download.cirros-cloud.net/0.3.5/

yum install -y wget
wget https://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
ls -l
file cirros-0.3.5-x86_64-disk.img 
qemu-img info cirros-0.3.5-x86_64-disk.img 
qemu-img --help
qemu-img convert -O vmdk cirros-0.3.5-x86_64-disk.img cirros-0.3.5-x86_64-disk.vmdk
file cirros-0.3.5-x86_64-disk.vmdk 
qemu-img info cirros-0.3.5-x86_64-disk.vmdk 

  139  . keystonerc_stack1 
  140  glance image-list
  142  openstack image create "cirros-vmdk" --file /root/cirros-0.3.5-x86_64-disk.vmdk --disk-format vmdk --container-format bare 
  143  glance image-list
  145  glance image-show bd6a706b-18bc-4c71-9277-a3c0268d0c2c

https://docs.openstack.org/glance/rocky/install/


. admin-openrc
openstack user set --domain default --password GLANCE_PASS glance
vi /etc/glance/glance-api.conf
1900 connection


   3472 [keystone_authtoken]
   3473 
   3474 www_authenticate_uri  = http://controller:5000
   3475 auth_url = http://controller:5000
   3476 memcached_servers = controller:11211
   3477 auth_type = password
   3478 project_domain_name = Default
   3479 user_domain_name = Default
   3480 project_name = service 
   3481 username = glance
   3482 password = GLANCE_PASS

 4423 flavor = keystone
2043 stores = file,http
  2096 default_store = file
2429 filesystem_store_datadir = /var/lib/glance/images

 vi /etc/glance/glance-registry.conf
1147 connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance

www_authenticate_uri = http://controller:5000
auth_url = http://controller:5000
memcached_servers = controller:11211
auth_type = password
project_domain_name = Default
user_domain_name = Default
project_name = service
username = glance
password = GLANCE_PASS

 2177 flavor = keystone

   24  . admin-openrc 
   27  yum install -y wget
   28  wget https://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
   30  openstack image create "cirros" --file cirros-0.3.5-x86_64-disk.img --disk-format qcow2 --container-format bare --public
   31  openstack image list


Compute Service (Nova)
https://docs.openstack.org/nova/rocky/install/

PLACEMENT_PASS

vi /etc/nova/nova.conf

[DEFAULT]
enabled_apis = osapi_compute,metadata
transport_url = rabbit://openstack:RABBIT_PASS@controller
my_ip = 10.0.0.11
use_neutron = true
firewall_driver = nova.virt.firewall.NoopFirewallDriver

openstack compute service list
+----+------------------+------------+----------+---------+-------+----------------------------+
| ID | Binary           | Host       | Zone     | Status  | State | Updated At                 |
+----+------------------+------------+----------+---------+-------+----------------------------+
|  1 | nova-scheduler   | controller | internal | enabled | up    | 2020-01-03T07:08:03.000000 |
|  3 | nova-consoleauth | controller | internal | enabled | up    | 2020-01-03T07:08:05.000000 |
|  4 | nova-conductor   | controller | internal | enabled | up    | 2020-01-03T07:07:57.000000 |
+----+------------------+------------+----------+---------+-------+----------------------------+

Compute node 추가
----------------------------------------------
hostnamectl set-hostname compute1
exit
vi /etc/sysconfig/network-scripts/ifcfg-ens33
#UUID
IPADDR=10.0.0.101

systemctl restart network
[root@compute1 nova]# cp nova.conf nova.conf.old
[root@compute1 nova]# scp controller:/etc/nova/nova.conf /etc/nova/nova.conf

vi /etc/nova/nova.conf
1254 my_ip=10.0.0.101
11017 vncserver_proxyclient_address=10.0.0.101

# systemctl enable libvirtd.service openstack-nova-compute.service
# systemctl start libvirtd.service 
 systemctl start openstack-nova-compute.service

------------------------------------------------
NOVA add (iso로 최소 설치이후 작업)
------------------------------------------------
yum install chrony
yum install centos-release-openstack-rocky
yum upgrade
 yum install python-openstackclient
 yum install openstack-selinux
---------------------------------------------------

yum install openstack-nova-compute
cp /etc/nova/nova.conf /etc/nova/nova.conf.old
scp controller:/etc/nova/nova.conf /etc/nova/nova.conf
vi /etc/nova/nova.conf
my_ip=10.0.0.101
vncserver_proxyclient_address = 10.0.0.101

#systemctl enable libvirtd.service openstack-nova-compute.service
# systemctl start libvirtd.service 
 systemctl start openstack-nova-compute.service
------------------------------------------------------------------------

controller
------------------------------------------------------------------------------
vi /etc/sysconfig/iptables
13번 아래에 추가
-A INPUT -s 10.0.0.101/32 -p tcp -m multiport --dports 5671,5672 -m comment --comment "001 amqp incoming amqp_10.0.0.101" -j ACCEPT
-A INPUT -s 10.0.0.101/32 -p tcp -m multiport --dports 5671,5672 -j ACCEPT
-A INPUT -s 10.0.0.100/32 -p tcp -m multiport --dports 5671,5672 -j ACCEPT

systemctl reload iptables
-----------------------------------------------------------------------------------


compute node에서
#systemctl stop openstack-nova-compute
#systemctl start openstack-nova-compute


[root@controller ~]# 
[root@controller ~]# . keystonerc_admin 
[root@controller ~(keystone_admin)]# openstack compute service list --service nova-compute
+----+--------------+------------+------+---------+-------+----------------------------+
| ID | Binary       | Host       | Zone | Status  | State | Updated At                 |
+----+--------------+------------+------+---------+-------+----------------------------+
|  7 | nova-compute | controller | nova | enabled | up    | 2019-06-28T00:35:03.000000 |
|  8 | nova-compute | compute1   | nova | enabled | up    | 2019-06-28T00:35:05.000000 |
+----+--------------+------------+------+---------+-------+----------------------------+
[root@controller ~(keystone_admin)]# su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
Found 2 cell mappings.
Skipping cell0 since it does not contain hosts.
Getting computes from cell 'default': ae166982-86c0-42bc-8066-a6925ae41036
Checking host mapping for compute host 'compute1': f4b907ec-221e-43b1-8b12-4b34ca7ea6ce
Creating host mapping for compute host 'compute1': f4b907ec-221e-43b1-8b12-4b34ca7ea6ce
Found 1 unmapped computes in cell: ae166982-86c0-42bc-8066-a6925ae41036
[root@controller ~(keystone_admin)]# 
-----------------------------------------------------------------------------------------

Day5


Network Service (Neutron)
https://docs.openstack.org/neutron/rocky/install/

compute1에 neutron service 추가
----------------------------------------
1.yum install openstack-neutron-linuxbridge ebtables ipset -y
2.scp controller:/etc/neutron/neutron.conf /etc/neutron/neutron.conf
[root@compute1 ~]# ls -l /etc/neutron/neutron.conf
-rw-r----- 1 root root 72511  1월  6 13:51 /etc/neutron/neutron.conf
3.[root@compute1 ~]# chgrp neutron /etc/neutron/neutron.conf

vi /etc/neutron/plugins/ml2/linuxbridge_agent.ini
-------------------------------------------
158 physical_interface_mappings = provider:ens33
[vxlan]
214: enable_vxlan = true
241: local_ip = 10.0.0.101
265: l2_population = true

182 [securitygroup]
183 enable_security_group = true
184 firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver
----------------------------------------------------
[root@compute1 ~]# modprobe br_netfilter
[root@compute1 ~]# lsmod|grep br_netfilter
br_netfilter           22256  0 
bridge                151336  1 br_netfilter
[root@compute1 ~]# sysctl -a|grep bridge-nf-call
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1

#systemctl enable neutron-linuxbridge-agent.service
# systemctl start neutron-linuxbridge-agent.service
[root@controller ~(keystone_admin)]# openstack network agent list
+--------------------------------------+--------------------+------------+-------------------+-------+-------+---------------------------+
| ID                                   | Agent Type         | Host       | Availability Zone | Alive | State | Binary                    |
+--------------------------------------+--------------------+------------+-------------------+-------+-------+---------------------------+
| 1892bd72-a84a-4bc4-a037-1e2189cb4340 | Metadata agent     | controller | None              | :-)   | UP    | neutron-metadata-agent    |
| 32481bca-4d86-4b29-8c06-b158e6d0ac4e | L3 agent           | controller | nova              | :-)   | UP    | neutron-l3-agent          |
| 335a69a4-197e-4e27-bdfc-e8ff0df7f585 | Open vSwitch agent | controller | None              | :-)   | UP    | neutron-openvswitch-agent |
| 5b489ba0-1290-4e42-b69e-8355fc8716e7 | Metering agent     | controller | None              | :-)   | UP    | neutron-metering-agent    |
| 63333b1a-265b-4ab0-bc50-882fcf066f6c | Linux bridge agent | compute1   | None              | :-)   | UP    | neutron-linuxbridge-agent |
| fa6d6aa9-45bb-4741-9303-ea9e90efa099 | DHCP agent         | controller | nova              | :-)   | UP    | neutron-dhcp-agent        |
+--------------------------------------+--------------------+------------+-------------------+-------+-------+---------------------------+

CLI로 Instance 시작
------------------------------
https://docs.openstack.org/install-guide/launch-instance.html
  217  . keystonerc_demo 
  218  openstack network create selfservice
  219  openstack subnet create --network selfservice   --dns-nameserver 8.8.4.4 --gateway 172.16.1.1   --subnet-range 172.16.1.0/24 selfservice
  220  openstack router create router
  221  openstack router add subnet router selfservice
 
  223  openstack router set router --external-gateway ext1
  224  . keystonerc_admin 
  225  openstack port list --router router

  227  openstack flavor create --id 0 --vcpus 1 --ram 64 --disk 1 m1.nano
  228  openstack flavor list
  229  . keystonerc_demo 
  230  ls .ssh
  231  openstack keypair create --public-key ~/.ssh/id_rsa.pub mykey
  232  openstack keypair list
  233  openstack security group rule create --proto icmp default
  234  openstack security group rule create --proto tcp --dst-port 22 default
  235  openstack image list
  236  ls
  237  openstack image create "cirros-0.3.5" --container-format bare --disk-format qcow2 --file ./cirros-0.3.5-x86_64-disk.img 
  238  openstack image list
  239   openstack network list
openstack server create --flavor m1.nano --image cirros-0.3.5 \
  --nic net-id=7b6c4fd5-73b9-4f49-8828-bfc3efb20a28 --security-group default \
  --key-name mykey selfservice-instance
# openstack server list

인스턴스 console 접속
--------------------------------------------------------------
 1. openstack console url show selfservice-instance (web기반 novnc protocol로 접속 가능)
 2. virsh list --all
    virsh console 1 ( disconnect는 ^] )
 ------------------------------------------------------------- 
  248  openstack floating ip create ext1
  249  openstack server add floating ip selfservice-instance 10.0.0.216
  255  ip netns exec qrouter-b716d035-eaee-4143-8489-c93dfb7241c7 ssh cirros@10.0.0.216

Block Storage (Cinder)
  258  vgs
  259  pvs
  260  losetup -a
  261  ls -l /var/lib/cinder/cinder-volumes
  262  lvs
  263  lsblk
  264  cinder create --name demo-v1 1
  265  cinder list
  270  nova volume-attach selfservice-instance a4a545cc-1ecf-4bc9-9d40-ab5124bd87ef auto
  271  lsblk

Object Storage Service(swift)
--------------------------------------
  274  swift post demo-c1
  275  swift upload demo-c1 cirros-0.3.5-x86_64-disk.img
  276  swift list demo-c1 --lh
  277  cd /var/tmp
  278  swift download demo-c1 
  279  ls -l

Dashboard Service (Horizon)

6.Openstack High Availability Architecture
-----------------------------------------------------------------
7. AWS Service (VPC/EBS/EIP/CF)
```
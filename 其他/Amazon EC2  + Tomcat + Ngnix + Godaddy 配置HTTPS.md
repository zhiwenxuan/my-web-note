# Amazon EC2 + Tomcat + Ngnix + Godaddy 配置 HTTPS

## 第一步：购买 SSL 证书

[传送门](https://sg.godaddy.com/zh/web-security/ssl-certificate)

## 第二步：生成 CSR

买完证书之后，在账户里进行配置的时候发现 GoDaddy 要求输入 CSR。生成 CSR 这一部分需要在 EC2 Instance 里面完成。

### 1. 生成私钥（private key）

```
$ openssl genrsa -des3 -out host.key 2048
Generating RSA private key, 2048 bit long modulus
..................................................+++
...............................+++
e is 65537 (0x10001)
Enter pass phrase for host.key:
Verifying - Enter pass phrase for host.key:
```

注意:  
(1) EC2 里 openssl 是装好可以直接用的。  
(2) pass phrase 要记住，后面还要用

### 2. 用私钥生成 certificate signing request，也就是前面所提到的 CSR。

**单域名证书：**

直接输入：

```
$ openssl req -new -key host.key -out host.csr
```

**UCC 多域名证书：**

先创建配置文件 san.cfg，内容如下：

```
[ req ]
default_bits = 2048
default_keyfile = host.key
distinguished_name = req_distinguished_name
req_extensions = req_ext
[ req_distinguished_name ]
countryName = Country Name (2 letter code)
countryName_default = US
stateOrProvinceName = State or Province Name (full name)
stateOrProvinceName_default = Texas
localityName = Locality Name (eg, city)
localityName_default = Huston
organizationName = Organization Name (eg, company)
organizationName_default = Bees360, Inc.
commonName =  Common Name (e.g. server FQDN or YOUR name)
commonName_default = libertymutual.bees360.com
commonName_max = 64
organizationalUnitName = Organizational Unit Name (eg, section)
organizationalUnitName_default = Bees360, Inc.
emailAddress = Email Address
emailAddress_max = 64
emailAddress_default = client@bees360.com
[ req_ext ]
subjectAltName = @alt_names
[alt_names]
DNS.1 = pilotcat.bees360.com
DNS.2 = test.bees360.com
DNS.3 = frontlineinsurance.bees360.com
```

其中 DNS1，2，3 分别是其他域名

接着输入

```
openssl req -new   -key host.key -out host.csr  -config san.cfg
```

输入这个命令之后 openssl 会让你输入上一步里提到的 pass phrase，然后在输入若干跟你的网站和公司有关的信息如下。
其中 Organizational Unit Name 和 Common Name 是最重要的，要输入你的网站的域名，其他可以随便填。

```
Enter pass phrase for host.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:Missouri
Locality Name (eg, city) []:Saint Louis
Organization Name (eg, company) [Internet Widgits Pty Ltd]:My Company
Organizational Unit Name (eg, section) []:www.mycompany.com
Common Name (e.g. server FQDN or YOUR name) []:www.mycompany.com
Email Address []:contact@mycompany.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

### 第三步：提交 CSR

1. 上面的命令完成后会生成一个 host.csr，用 vi 打开这个 csr 文件，会看到：

```
-----BEGIN CERTIFICATE REQUEST-----
[encoded text here]
-----END CERTIFICATE REQUEST-----
```

把这个文件的内容（包括“BEGIN CERTIFICATE REQUEST”和“END CERTIFICATE REQUEST”这两行）复制黏贴到 GoDaddy 的 CSR request form 里，提交，等待 GoDaddy 验证审批完成。

2. 审批完成之后，GoDaddy 会生成一个压缩包，里面有两个 crt 文件（一个随机命名的 crt 文件和一个 gd_bundle.crt 文件）。

### 第四步： 下载两个.crt 文件

1. 登录您的账户管理器。
2. 单击“SSL 证书”。
3. 在您要使用的证书旁，单击“启动”。
4. 单击“下载”。
5. 选择“服务器类型”，这里选择的是 Apache，然后单击“下载 Zip 文件”。

### 第五步：上传.crt 文件并合并.crt 文件

把 crt 文件上传到 EC2。合并两个文件，如下：

```
cat 47b24b5e655c714f.crt gd_bundle.crt > mysite_combined.crt
```

### 第六步：生成一个解密的 key 文件

生成一个解密的 key 文件， 避免每次重启 Nginx 都要输密码

```
openssl rsa -in host.key -out host.key.unsecure
```

### 第七步： 修改 Nginx 配置文件

```
//增加部分
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name www.example.com;
        return 301 https://www.example.com$request_uri;
}
server {
        //删除部分
        #listen 80 default_server;
        #listen [::]:80 default_server;

        # SSL configuration
        #
        //增加部分
         listen 443 ssl default_server;
         listen [::]:443 ssl default_server;
         server_name www.example.com;

        ssl on;
        ssl_certificate /home/ubuntu/https/mysite_combined.crt; //证书位置
        ssl_certificate_key /home/ubuntu/https/host.key.unsecure; //证书位置
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers  HIGH:!RC4:!MD5:!aNULL:!eNULL:!NULL:!DH:!EDH:!EXP:+MEDIUM;
        ssl_prefer_server_ciphers   on;

        ....
}

```

### 第八步：修改 Tomcat 配置文件

在 Value 标签中增加属性： protocolHeader="X-Forwarded-Proto"

### 总结

几个核心点：

1. 单域名证书和多域名证书生成秘钥的方式不一样
2. 下载 crt 文件时，选择 Apache 服务器
3. 要合并两个 crt 文件
4. 要生成解密的 key 文件，避免重启 Nginx 输密码
5. Tomcat 的配置

### 参考

[Amazon EC2 + Tomcat + Ngnix + Godaddy 配置 HTTPS](https://blog.csdn.net/lizhenqii/article/details/84960521)  
[购买 ssl](https://sg.godaddy.com/zh/web-security/ssl-certificate)  
[生成解密 key](https://segmentfault.com/q/1010000000119345)  
[修改 Nginx 和 Tomcat 配置](https://www.jianshu.com/p/19f05fdd292b)  
[下载 crt 文件](https://sg.godaddy.com/zh/help/ssl-4754)
[SSL 证书生成与 Nginx 配置，UCC 证书生成（linux）](https://blog.jing.do/1817)

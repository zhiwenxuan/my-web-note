# 理解 JSON Web 令牌（JWT）的 5 个简单步骤

在本文中，将解释 JSON Web Tokens（JWT）的基本原理以及它们的使用原因。JWT 是确保应用程序信任和安全的重要部分。JWT 允许以安全的方式表示诸如用户数据之类的声明。

为了解释 JWT 如何工作，让我们从一个抽象的定义开始。  

<i>JSON Web 令牌（JWT）是一种 JSON 对象，在 RFC 7519 中定义为在两方之间表示一组信息的安全方式。令牌由标头，有效负载和签名组成。</i>

简单地说，JWT 只是一个具有以下格式的字符串：

```
header.payload.signature
```

应该注意，双引号字符串实际上被认为是有效的 JSON 对象。

为了说明实际使用 JWT 的方式和原因，我们将使用一个简单的 3 实体示例（参见下图）。此示例中的实体是用户，应用程序服务器和身份验证服务器。验证服务器将向用户提供 JWT。使用 JWT，用户可以安全地与应用程序通信。

![JWT通信流程图][1]

在该示例中，用户首先使用认证服务器的登录系统（例如，用户名和密码，Facebook 登录，Google 登录等）登录认证服务器。然后，身份验证服务器创建 JWT 并将其发送给用户。当用户对应用程序进行 API 调用时，用户将传递 JWT 以及 API 调用。在此设置中，应用程序服务器将配置为验证传入的 JWT 是否由身份验证服务器创建（验证过程将在稍后更详细地说明）。因此，当用户使用附加的 JWT 进行 API 调用时，应用程序可以使用 JWT 来验证 API 调用是否来自经过身份验证的用户。

现在，将更深入地研究 JWT 本身及其构建和验证的方式。

## 步骤 1.创建 HEADER

JWT 的头部分包含有关如何计算 JWT 签名的信息。标头是以下格式的 JSON 对象：

```js
{
    "typ": "JWT",
    "alg": "HS256"
}
```

在此 JSON 中，“typ”键的值指定对象是 JWT，“alg”键的值指定用于创建 JWT 签名组件的散列算法。在我们的示例中，我们使用 HMAC-SHA256 算法（一种使用密钥的散列算法）来计算签名（在步骤 3 中更详细地讨论）。

## 第 2 步。创建 PAYLOAD

JWT 的有效载荷组件是存储在 JWT 内的数据（该数据也称为 JWT 的“声明”）。在我们的示例中，身份验证服务器创建一个 JWT，其中存储有用户信息，特别是用户 ID。

```js
{
    "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```

在我们的示例中，我们只将一个声明放入有效载荷中。您可以根据需要添加任意数量的声明。JWT 有效载荷有几种不同的标准声明，例如“发布”发行者，“子”主题，“exp”到期时间。这些字段在创建 JWT 时很有用，但它们是可选的。有关 JWT 标准字段的更详细列表，请参阅 JWT 上的维基百科页面。

请记住，数据的大小将影响 JWT 的总体大小，这通常不是问题，但具有过大的 JWT 可能会对性能产生负面影响并导致延迟。

## 第 3 步。创建 SIGNATURE

签名使用以下伪代码计算：

```js
// signature algorithm
data = base64urlEncode( header ) + “.” + base64urlEncode( payload )
hashedData = hash( data, secret )
signature = base64urlEncode( hashedData )
```

该算法所做的是 base64url 对在步骤 1 和 2 中创建的头和有效负载进行编码。然后，算法将得到的编码字符串与它们之间的句点（。）连接在一起。在我们的伪代码中，此连接字符串被分配给数据。该数据串散列用在 JWT 头中指定的哈希算法的秘密密钥。生成的散列数据将分配给 hashedData。然后对该散列数据进行 base64url 编码以产生 JWT 签名。

在我们的示例中，标头和有效负载都是 base64url 编码为：

```
// header
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
//playload
eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYZOTA0NjYwYmQifQ
```

然后，在加入周期的编码头和编码有效载荷上应用带有密钥的指定签名算法，我们得到签名所需的散列数据。在我们的例子中，这意味着在数据字符串上应用 HS256 算法，并将密钥设置为字符串“secret”，以获取 hashedData 字符串。之后，通过 base64url 编码 hashedData 字符串，我们得到以下 JWT 签名：

```
//signature
-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

## 步骤 4.将所有三个 JWT 组件放在一起

现在我们已经创建了所有三个组件，我们可以创建 JWT。记住 JWT 的 header.payload.signature 结构，我们只需要组合组件，用句点（。）分隔它们。我们使用头部和有效载荷的 base64url 编码版本，以及我们在步骤 3 中得到的签名。

```js
// JWT Token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

您可以尝试通过[jwt.io](https://jwt.io/)上的浏览器创建自己的 JWT 。

回到我们的示例，身份验证服务器现在可以将此 JWT 发送给用户。

### JWT 如何保护我们的数据？

重要的是要理解使用 JWT 的目的不是以任何方式隐藏或模糊数据。使用 JWT 的原因是为了证明发送的数据实际上是由真实的源创建的。

如前面的步骤所示，JWT 内的数据是经过编码和签名的，而不是加密的。编码数据的目的是转换数据的结构。签名数据允许数据接收器验证数据源的真实性。因此，编码和签名数据不会保护数据。另一方面，加密的主要目的是保护数据并防止未经授权的访问。有关编码和加密之间差异的更详细说明，以及有关散列如何工作的更多信息，请参阅[此文章](https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/#encoding)。

<i>由于 JWT 仅被签名和编码，并且由于 JWT 未加密，因此 JWT 不保证敏感数据的任何安全性。</i>

## 步骤 5.验证 JWT

在我们简单的 3 实体示例中，我们使用的是由 HS256 算法签名的 JWT，其中只有身份验证服务器和应用服务器知道密钥。当应用程序设置其身份验证过程时，应用程序服务器从身份验证服务器接收密钥。由于应用程序知道密钥，当用户对应用程序进行 JWT 附加的 API 调用时，应用程序可以执行与 JWT 上的步骤 3 相同的签名算法。然后，应用程序可以验证从其自己的哈希操作获得的签名是否与 JWT 本身上的签名匹配（即，它与由身份验证服务器创建的 JWT 签名匹配）。如果签名匹配，则表示 JWT 有效，表示 API 调用来自可信源。除此以外，如果签名不匹配，则表示收到的 JWT 无效，这可能是对应用程序的潜在攻击的指示。因此，通过验证 JWT，应用程序在其自身和用户之间添加了一层信任。

## 结论是

我们了解了 JWT 是什么，如何创建和验证它们，以及如何使用它们来确保应用程序与其用户之间的信任。这是了解 JWT 基础知识及其有用之处的起点。JWT 只是确保应用程序中的信任和安全性的难题之一。

应该注意，本文中描述的 JWT 身份验证设置使用对称密钥算法（HS256）。您也可以以类似的方式设置 JWT 身份验证，除非使用非对称算法（例如 RS256），其中身份验证服务器具有密钥，并且应用程序服务器具有公钥。查看此 Stack Overflow 问题，了解使用对称和非对称算法之间差异的详细分类。

还应该注意，JWT 应该通过 HTTPS 连接（而不是 HTTP）发送。拥有 HTTPS 有助于防止未经授权的用户通过使用它来窃取所发送的 JWT，从而无法拦截服务器和用户之间的通信 。

此外，在您的 JWT 有效载荷中过期，特别是短的有效载荷很重要，这样如果旧的 JWT 受到损害，它们将被视为无效并且不能再使用。

以上内容译自[此文章](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)

我总结一下几个要点：

1. JWT 格式： header.payload.signature
2. JWT 不是用来加密的，只是用来验证用户的真实性以及请求来源的真实性
3. JWT 要在 HTTPS 下工作，防止服务器返回给用户的 JWT 被拦截

[1]: https://cdn-images-1.medium.com/max/1600/1*SSXUQJ1dWjiUrDoKaaiGLA.png

# Microservices-baseline-dotnet9
RabbitMQ, YARP Gateway, JWT with HttpOnly Cookies, DI, Swagger, and logging.



# .NET Microservices  Kit

A complete .NET 9 microservices template with:

* YARP API Gateway
* JWT authentication with HttpOnly cookies
* RabbitMQ (via MassTransit)
* Serilog Logging
* Swagger (combined at the gateway)
* Role-based Authorization
* DI everywhere
* Sample login & registration flows
* Production-ready best practices

---

## 🚀 Features

* **Microservices**: HRM and Accounts services, easily extensible.
* **API Gateway**: Powered by [YARP](https://microsoft.github.io/reverse-proxy/), handles routing, JWT validation, role-based authorization, and combines Swagger docs from all services.
* **JWT Authentication**: Secure tokens, stored in HttpOnly cookies for maximum security (no XSS risk).
* **Role-based Authorization**: Protect endpoints with `[Authorize(Roles = "Admin")]`, `[Authorize(Roles = "User")]`, etc.
* **RabbitMQ Integration**: [MassTransit](https://masstransit-project.com/) enables event-driven communication between services (e.g., user registration events).
* **Global Logging**: Using [Serilog](https://serilog.net/) for structured logs.
* **Swagger UI**: Single, combined documentation at the gateway.
* **Dependency Injection**: Everywhere—no static/singleton hacks.
* **EF Core**: Database access in each microservice.

---

## 🏗️ Architecture & Folder Structure

```text
/dotnet-microservices-starter
│
├── ApiGateway                  # YARP API gateway, JWT, Swagger
│   └── appsettings.json
│
├── Services
│   ├── Accounts                # Auth/login/register, JWT issuing, publishes events to RabbitMQ
│   ├── HRM                     # Listens for events, has protected endpoints
│   └── ...                     # Add more microservices here!
│
├── Common                      # Shared models, helpers, logging configs
│
└── README.md
```

---

## 🧰 Packages Used

### Core Packages (All Projects)

* `Microsoft.AspNetCore.Authentication.JwtBearer`
* `Swashbuckle.AspNetCore` (Swagger)
* `Serilog.AspNetCore`
* `Microsoft.Extensions.DependencyInjection`

### Gateway Only

* `Yarp.ReverseProxy`

### Services Only

* `Microsoft.EntityFrameworkCore`
* `Microsoft.EntityFrameworkCore.SqlServer`
* `Microsoft.EntityFrameworkCore.Tools`
* `MassTransit`
* `MassTransit.RabbitMQ`
* `BCrypt.Net-Next` (Password hashing, recommended)
* `Microsoft.AspNetCore.DataProtection`
* `Microsoft.AspNetCore.Mvc.NewtonsoftJson`

---

## 🐇 RabbitMQ Messaging (MassTransit)

* **Accounts** service publishes events (e.g., `UserRegistered`).
* **HRM** service (or others) can subscribe and react.
* Uses MassTransit for abstraction and reliability.

### Start RabbitMQ Locally 

```sh
docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
# Access the management UI at http://localhost:15672 (user: guest, pass: guest)
```

### Sample MassTransit Setup in a Microservice:

```csharp
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });
    });
});
```

---

## 🔐 JWT Auth & HttpOnly Cookies

* JWT tokens are issued by the Accounts service and set as HttpOnly, Secure cookies.
* **Never stored in localStorage/sessionStorage** (no XSS risk).
* The API gateway (YARP) reads and validates JWTs for every request.
* Angular/React/Vue clients must use `{ withCredentials: true }` on API calls.

---

## 🛡️ Role-Based Authorization

* Secure endpoints using attributes like:

  ```csharp
  [Authorize(Roles = "Admin")]
  [Authorize(Roles = "User,Manager")]
  ```
* Roles are encoded in JWT claims at login.

---

## 📝 Swagger UI (API Docs)

* Combined at the gateway for a single entry point to all service APIs.
* Each microservice can expose its own Swagger for local dev.

---

## 🪵 Logging

* **Serilog** logs to console, files, or remote sinks (easily configurable).
* Common logging patterns included for all services and the gateway.

---

## 🧪 Getting Started





If adding packages manually, see [Packages Used](#-packages-used).

### 2. Run RabbitMQ

(see [RabbitMQ Messaging](#-rabbitmq-messaging-masstransit))


### 3. Test in Swagger

Visit:

* `http://localhost:<gateway-port>/swaggerui/index`

Try login/register, get your JWT as a cookie, and access protected endpoints.

---

## ⚙️ Example `appsettings.json` Snippets

### Gateway

```json
"Jwt": {
  "Key": "your-long-secret-key",
  "Issuer": "yourdomain.com",
  "Audience": "yourdomain.com"
},
"Yarp": {
  "ReverseProxy": {
    "Routes": { /* ... */ },
    "Clusters": { /* ... */ }
  }
}


### Microservice (Accounts/HRM)

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=MyDb;User Id=sa;Password=your_password;"
},
"RabbitMq": {
  "Host": "localhost",
  "Username": "guest",
  "Password": "guest"
},
"Jwt": {
  "Key": "your-long-secret-key",
  "Issuer": "yourdomain.com",
  "Audience": "yourdomain.com"
}


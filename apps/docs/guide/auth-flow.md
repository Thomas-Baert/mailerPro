# Flux d'Authentification

Le système d'authentification repose sur des **JSON Web Tokens (JWT)**.

## Diagramme de Séquence Login

Voici comment se déroule une connexion sécurisée entre le client et le serveur :

```mermaid
sequenceDiagram
    autonumber
    participant U as Utilisateur
    participant F as Frontend (React)
    participant A as API (Fastify)
    participant D as Base de Données

    U->>F: Saisit email/password
    F->>A: POST /auth/login
    A->>D: Client.findUnique(...)
    D-->>A: Record Utilisateur
    A->>A: bcrypt.compare()
    Note over A: Si OK, génération du JWT
    A-->>F: { token: "eyJhbG..." }
    F->>F: localStorage.setItem('token')
    F->>U: Redirection vers /Dashboard
```

## Persistance et Interception
Toutes les requêtes suivantes vers l'API sont interceptées par **Axios** pour inclure le header `Authorization: Bearer <token>`.

```mermaid
sequenceDiagram
    participant F as Frontend
    participant A as API
    
    Note over F: Interceptor récupère le token
    F->>A: GET /auth/me (Header Auth)
    A->>A: fastify.authenticate (Vérification)
    A-->>F: { username: "Thomas", ... }
```

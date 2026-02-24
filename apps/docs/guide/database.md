# Modélisation de la Base de Données

Pour bien comprendre la structure des données de MailerPro, nous distinguons le modèle conceptuel (Entité-Association) de l'implémentation physique (Schéma Relationnel).

## 1. Diagramme Entité-Association (MCD)

Ce diagramme se concentre sur les concepts métier et les relations logiques, sans s'occuper des contraintes techniques de clé étrangère.

```mermaid
erDiagram
    CLIENT ||--o{ APPLICATION : "soumet"
    CONTRACT_TYPE ||--o{ APPLICATION : "est requis pour"
    SECTOR ||--o{ APPLICATION : "concerne"
    SPECIALTY ||--o{ APPLICATION : "cible"
    COMPANY ||--o{ COMPANY_EMAIL : "possède"
    COMPANY }o--o{ SECTOR : "exerce dans"

    CLIENT {
        string username
        string email
        string fullName
        date birthDate
    }

    APPLICATION {
        string cv_path
        text biography
    }

    COMPANY {
        string name
    }

    COMPANY_EMAIL {
        string email
        string category
    }

    CONTRACT_TYPE {
        string label
    }
```

## 2. Schéma Relationnel (MLD/MPD)

Ce schéma représente l'implémentation réelle dans **PostgreSQL** via Prisma. Il inclut les types de données, les clés primaires (PK) et les clés étrangères (FK).

```mermaid
erDiagram
    Client ||--o{ Application : "clientId"
    ContractType ||--o{ Application : "contractType"
    Sector ||--o{ Application : "sectorName"
    Specialty ||--o{ Application : "specialtyName"
    Company ||--o{ CompanyEmail : "companyId"
    Company }o--o{ Sector : "CompanyToSector"

    Client {
        uuid id PK
        varchar username UK
        varchar password
        varchar email UK
        varchar surname
        varchar firstName
        timestamp birthDate
        text address
        varchar phoneNumber
        enum role
    }

    Application {
        uuid id PK
        varchar cv
        text biography
        uuid clientId FK
        varchar contractType FK
        varchar sectorName FK
        varchar specialtyName FK
    }

    ContractType {
        varchar type PK
    }

    Sector {
        varchar name PK
    }

    Specialty {
        varchar name PK
    }

    Company {
        uuid id PK
        varchar name
    }

    CompanyEmail {
        varchar email PK
        varchar category
        uuid companyId FK
    }
```

## Description des Tables

### Client

Stocke les informations de profil et d'authentification des utilisateurs. Le champ `role` permet de distinguer les candidats des administrateurs.

### Application

C'est la table centrale du recrutement. Elle contient les documents (CV) et les préférences de poste de l'utilisateur.

### Annuaire Entreprises (Company & CompanyEmail)

Structure permettant de cibler les envois d'e-mails. Une entreprise peut avoir plusieurs adresses e-mail segmentées par catégories (RH, Technique, etc.).

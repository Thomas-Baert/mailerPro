# Schéma de la Base de Données

MailerPro utilise **PostgreSQL** avec l'ORM **Prisma**. Voici la structure relationnelle des données.

## Diagramme Entité-Association (EA)

```mermaid
erDiagram
    UNIVERSITY ||--o{ CLIENT : "rattache"
    UNIVERSITY ||--o{ UNIVERSITY_PROFILE : "possède"
    UNIVERSITY ||--o{ DOCUMENT_TEMPLATE : "héberge"
    CLIENT ||--o{ CAMPAIGN : "crée"
    CLIENT ||--o{ DOCUMENT_TEMPLATE : "rédige (Prof)"
    CONTRACT_TYPE ||--o{ CAMPAIGN : "définit"
    SECTOR ||--o{ CAMPAIGN : "concerne"
    SPECIALTY ||--o{ CAMPAIGN : "cible"
    CAMPAIGN ||--o{ APPLICATION : "génère"
    CAMPAIGN ||--o? PDF_FILE : "possède CV"
    APPLICATION ||--o{ PDF_FILE : "contient documents"
    DOCUMENT_TEMPLATE ||--o? PDF_FILE : "réfère fichier"
    COMPANY_EMAIL ||--o{ APPLICATION : "reçoit"
    COMPANY ||--o{ COMPANY_EMAIL : "possède"
    COMPANY ||--o{ SECTOR_TO_COMPANY : "appartient à"
    SECTOR ||--o{ SECTOR_TO_COMPANY : "contient"

    UNIVERSITY {
        uuid id PK
        string name
    }

    CAMPAIGN {
        uuid id PK
        string status
        uuid clientId FK
        string lmPattern
    }

    APPLICATION {
        uuid id PK
        uuid campaignId FK
        string companyEmailAddr FK
        string status
        datetime sentAt
        datetime openedAt
    }

    PDF_FILE {
        uuid id PK
        bytes fileData
        string fileName
        string fileType
        uuid templateId FK
        uuid campaignId FK
        uuid applicationId FK
    }

    DOCUMENT_TEMPLATE {
        uuid id PK
        string title
        string type
        uuid universityId FK
    }

    CLIENT {
        uuid id PK
        string username
        string role
        uuid universityId FK
    }

    COMPANY {
        uuid id PK
    }

    COMPANY_EMAIL {
        string email PK
        uuid companyId FK
    }
```

## Modèle Conceptuel : Gestion des Fichiers PDF

Pour éviter la redondance et permettre une flexibilité totale, nous avons centralisé le stockage des documents :

1.  **`PDF_FILE`** : L'entité unique de stockage binaire.
2.  **Campagne -> Fichier (1:1)** : Un étudiant a un CV de base pour sa campagne.
3.  **Application -> Fichiers (1:N)** : Une application peut contenir plusieurs documents générés par l'IA (Lettre personnalisée, CV adapté, etc.).
4.  **Template -> Fichier (1:1)** : Les professeurs associent leurs modèles PDF à cette entité.

### Support Multi-Tenant
Chaque étudiant et professeur est rattaché à une `University`. Le cloisonnement est assuré par les clés étrangères.

### Stockage Binaire
Les documents sont stockés en `BYTEA`. Pour les fichiers volumineux, une migration vers S3 ou un CDN reste possible sans changer la logique métier, simplement en remplaçant `fileData` par une `String` d'URL.

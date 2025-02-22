#------------------------------------------------------------
#        Script MySQL avec ENUMs.
#------------------------------------------------------------

#------------------------------------------------------------
# Table: message
#------------------------------------------------------------

CREATE TABLE message(
        id          Int  Auto_increment  NOT NULL ,
        content     Varchar (255) NOT NULL ,
        created_at  Datetime NOT NULL ,
        read_at     Datetime ,
        status      ENUM('sent', 'delivered', 'read', 'failed') NOT NULL ,
        external_id Varchar (255),
    CONSTRAINT messages_AK UNIQUE (external_id),
    CONSTRAINT messages_PK PRIMARY KEY (id)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: model
#------------------------------------------------------------

CREATE TABLE model(
        id             Int  Auto_increment  NOT NULL ,
        pseudo         Varchar (255) ,
        platform       ENUM('Instagram', 'Twitter', 'Facebook', 'TikTok', 'Other') NOT NULL ,
        profile_link   Varchar (255) NOT NULL ,
        cup            Varchar (255) NOT NULL ,
        public_state   ENUM('public', 'private', 'restricted') ,
        nationality    Char (2) ,
        ethnicity      ENUM('Asian', 'Black', 'Hispanic', 'White', 'Other') ,
        languages      Varchar (255) ,
        contact_method ENUM('email', 'phone', 'social_media', 'other') NOT NULL ,
        base_city      Varchar (255) ,
        contact_info   Varchar (255) NOT NULL ,
        work_location  Varchar (255),
    CONSTRAINT model_PK PRIMARY KEY (id)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: pricing
#------------------------------------------------------------

CREATE TABLE pricing(
        id       Int  Auto_increment  NOT NULL ,
        duration Int NOT NULL ,
        rate     DECIMAL (15,3)  NOT NULL,
    CONSTRAINT pricing_PK PRIMARY KEY (id)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: services_catalog
#------------------------------------------------------------

CREATE TABLE services_catalog(
        id                        Int  Auto_increment  NOT NULL ,
        name                      Varchar (255) NOT NULL ,
        service_rate              DECIMAL (15,3)  NOT NULL ,
        id_pricing                Int ,
        id_pricing_services_extra Int,
    CONSTRAINT services_catalog_PK PRIMARY KEY (id)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: applies_pricing
#------------------------------------------------------------

CREATE TABLE applies_pricing(
        id       Int NOT NULL ,
        id_model Int NOT NULL,
    CONSTRAINT applies_pricing_PK PRIMARY KEY (id,id_model)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id           Int  Auto_increment  NOT NULL ,
        pseudo       Varchar (255) ,
        contact_info Varchar (255) NOT NULL ,
        base_city    Varchar (255) NOT NULL ,
        token        Varchar (255) NOT NULL ,
    CONSTRAINT users_PK PRIMARY KEY (id)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: conversation
#------------------------------------------------------------

CREATE TABLE conversation(
        id          Int NOT NULL ,
        id_messages Int NOT NULL ,
        id_model    Int NOT NULL ,
        `from`      Int NOT NULL ,
        `to`        Int NOT NULL,
    CONSTRAINT conversations_PK PRIMARY KEY (id,id_messages,id_model)
)ENGINE=InnoDB;

ALTER TABLE services_catalog
    ADD CONSTRAINT services_catalog_pricing0_FK
    FOREIGN KEY (id_pricing)
    REFERENCES pricing(id);

ALTER TABLE services_catalog
    ADD CONSTRAINT services_catalog_pricing1_FK
    FOREIGN KEY (id_pricing_services_extra)
    REFERENCES pricing(id);

ALTER TABLE applies_pricing
    ADD CONSTRAINT applies_pricing_pricing0_FK
    FOREIGN KEY (id)
    REFERENCES pricing(id);

ALTER TABLE applies_pricing
    ADD CONSTRAINT applies_pricing_model1_FK
    FOREIGN KEY (id_model)
    REFERENCES model(id);

ALTER TABLE conversation
    ADD CONSTRAINT conversations_users0_FK
    FOREIGN KEY (id)
    REFERENCES users(id);

ALTER TABLE conversation
    ADD CONSTRAINT conversations_messages1_FK
    FOREIGN KEY (id_messages)
    REFERENCES messages(id);

ALTER TABLE conversation
    ADD CONSTRAINT conversations_model2_FK
    FOREIGN KEY (id_model)
    REFERENCES model(id);

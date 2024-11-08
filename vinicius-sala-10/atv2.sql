CREATE DATABASE GerenciamentoTarefas;
USE GerenciamentoTarefas;


CREATE TABLE Usuarios (
    UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Locais (
    LocalID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL
);

CREATE TABLE StatusTarefa (
    StatusID INT AUTO_INCREMENT PRIMARY KEY,
    NomeStatus VARCHAR(50) NOT NULL
);

CREATE TABLE Tarefas (
    TarefaID INT AUTO_INCREMENT PRIMARY KEY,
    Descricao TEXT NOT NULL,
    Setor VARCHAR(100) NOT NULL,
    Prioridade ENUM('Baixa', 'Média', 'Alta') NOT NULL,
    StatusID INT,
    UsuarioID INT,
    LocalID INT,
    FOREIGN KEY (StatusID) REFERENCES StatusTarefa(StatusID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (LocalID) REFERENCES Locais(LocalID)
);


INSERT INTO StatusTarefa (NomeStatus) 
VALUES ('A Fazer'), ('Fazendo'), ('Pronto');

INSERT INTO Usuarios (Nome, Email) 
VALUES ('João Silva', 'joao@exemplo.com'), 
       ('Maria Oliveira', 'maria@exemplo.com');

INSERT INTO Locais (Nome) 
VALUES ('Escritório Central'), 
       ('Filial Norte');

INSERT INTO Tarefas (Descricao, Setor, Prioridade, StatusID, UsuarioID, LocalID)
VALUES ('Desenvolver o sistema de login', 'TI', 'Alta', 1, 1, 1),
       ('Revisar documento de proposta', 'Jurídico', 'Média', 2, 2, 2);


SELECT t.TarefaID, t.Descricao, t.Setor, t.Prioridade, st.NomeStatus, u.Nome AS AtribuidoA, l.Nome AS Local
FROM Tarefas t
JOIN StatusTarefa st ON t.StatusID = st.StatusID
JOIN Usuarios u ON t.UsuarioID = u.UsuarioID
JOIN Locais l ON t.LocalID = l.LocalID;

CREATE VIEW TarefasPorStatus AS
SELECT t.TarefaID, t.Descricao, st.NomeStatus, u.Nome AS AtribuidoA
FROM Tarefas t
JOIN StatusTarefa st ON t.StatusID = st.StatusID
JOIN Usuarios u ON t.UsuarioID = u.UsuarioID;

SELECT * FROM TarefasPorStatus WHERE NomeStatus = 'A Fazer';


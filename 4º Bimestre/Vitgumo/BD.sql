-- ===============================
-- BANCO DE DADOS - Vitgumo
-- ===============================

CREATE DATABASE IF NOT EXISTS Vitgumo;
USE Vitgumo;

-- -------------------------------
-- Tabela de Produtos
-- -------------------------------
CREATE TABLE IF NOT EXISTS tbProdutos (
	idProduto INT PRIMARY KEY AUTO_INCREMENT,
	categoria VARCHAR(100),
	nome VARCHAR(100),
	preco DECIMAL(10,2),
	descricao TEXT,
	imagem VARCHAR(100),
	quantidade INT,
	avaliacao INT
);

-- -------------------------------
-- Tabela de Usuários
-- -------------------------------
CREATE TABLE IF NOT EXISTS tbUsuarios (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	cpf VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(255) NOT NULL
);

-- -------------------------------
-- Tabela de Pedidos
-- -------------------------------
CREATE TABLE IF NOT EXISTS tbPedidos (
	idPedido INT PRIMARY KEY AUTO_INCREMENT,
	idUsuario INT NOT NULL,
	total DECIMAL(10,2) NOT NULL,
	endereco_entrega VARCHAR(255),
	forma_pagamento VARCHAR(50),
	status VARCHAR(50) DEFAULT 'Pendente',
	data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (idUsuario) REFERENCES tbUsuarios(idUsuario)
);

-- -------------------------------
-- Tabela de Itens do Pedido
-- -------------------------------
CREATE TABLE IF NOT EXISTS tbPedidoItens (
	idItem INT PRIMARY KEY AUTO_INCREMENT,
	idPedido INT,
	idProduto INT,
	quantidade INT,
	preco_unitario DECIMAL(10,2),
	FOREIGN KEY (idPedido) REFERENCES tbPedidos(idPedido),
	FOREIGN KEY (idProduto) REFERENCES tbProdutos(idProduto)
);

CREATE TABLE tbCarrinho (
	idCarrinho INT PRIMARY KEY AUTO_INCREMENT,
	idUsuario INT,
	idProduto INT,
	quantidade INT DEFAULT 1,
	FOREIGN KEY (idUsuario) REFERENCES tbUsuarios(idUsuario),
	FOREIGN KEY (idProduto) REFERENCES tbProdutos(idProduto)
);

-- -------------------------------
-- INSERT'S
-- -------------------------------
INSERT INTO tbProdutos (categoria, nome, preco, descricao, imagem, quantidade, avaliacao) VALUES
-- Hortifruti
('Hortifruti', 'Abacaxi Pérola', 11.99, 'Fruta tropical doce, de polpa suculenta e levemente ácida.', '/img/produtos/abacaxi.webp', 10, 0),
('Hortifruti', 'Uva Niagara 500g', 6.99, 'Fruta fresca, sabor adocicado, ideal para consumo in natura.', '/img/produtos/uva.webp', 1, 0),
('Hortifruti', 'Polpa de Morango 100g', 2.49, 'Ideal para sucos, sobremesas e vitaminas.', '/img/produtos/morango.webp', 1, 0),
('Hortifruti', 'Néctar de Manga Classic 200ml', 1.79, 'Prático e saboroso, perfeito para o dia a dia.', '/img/produtos/manga.webp', 1, 0),
('Hortifruti', 'Maçã Fuji 600g', 17.99, 'Crocante, adocicada e nutritiva.', '/img/produtos/maca.webp', 1, 0),
('Hortifruti', 'Sumo de Limão Castelo 500ml', 12.93, 'Prático para temperos e drinks.', '/img/produtos/limao.webp', 1, 0),
('Hortifruti', 'Banana Nanica 1kg', 6.70, 'Fonte de energia, ideal para lanches.', '/img/produtos/banana.webp', 1, 0),
('Hortifruti', 'Cenoura 1kg', 5.40, 'Crocante e versátil para saladas e sucos.', '/img/produtos/cenoura.webp', 1, 0),
('Hortifruti', 'Batata Inglesa 1kg', 6.80, 'Essencial para purês, fritas e assados.', '/img/produtos/batata.webp', 1, 0),
('Hortifruti', 'Alface Crespa Unidade', 3.90, 'Fresca, crocante, perfeita para saladas.', '/img/produtos/alface.webp', 1, 0),
('Hortifruti', 'Cebola 1kg', 5.60, 'Base de temperos e refogados.', '/img/produtos/cebola.webp', 1, 0),

-- Frios, Laticínios & Congelados
('Frios, Laticínios & Congelados', 'Margarina Qualy Sem Sal 500g', 7.99, 'Cremosa, saborosa, ideal para pães e receitas.', '/img/produtos/margarina.webp', 1, 0),
('Frios, Laticínios & Congelados', 'Ovos Brancos 30 unidades', 18.90, 'Fonte de proteína e versatilidade.', '/img/produtos/ovos.webp', 1, 0),
('Frios, Laticínios & Congelados', 'Lasanha à Bolonhesa Sadia 600g', 21.90, 'Massa pronta, recheada com carne e queijo.', '/img/produtos/lasanha.webp', 1, 0),
('Frios, Laticínios & Congelados', 'Hambúrguer Bovino Sadia 672g', 19.59, 'Carne moída sabor churrasco.', '/img/produtos/hamburguer.webp', 1, 0),
('Frios, Laticínios & Congelados', 'Linguiça Toscana Sadia 600g', 14.99, 'Sabor marcante, ideal para churrasco.', '/img/produtos/ling-toscana.webp', 1, 0),
('Frios, Laticínios & Congelados', 'Batata Pré-Frita Smiles McCain 400g', 16.99, 'Crocante e prática.', '/img/produtos/batata-pre-frita-smiles.webp', 1, 0),
('Frios, Laticínios & Congelados', 'Sorvete Napolitano Flocos Nestlé 1,5L', 28.99, 'Tradicional, cremoso e saboroso.', '/img/produtos/sorvete.webp', 1, 0),

-- Enlatados & Conservas
('Enlatados & Conservas', 'Atum em Lata Gomes da Costa 170g', 9.50, 'Rico em proteína e ômega-3.', '/img/produtos/atum.webp', 1, 0),
('Enlatados & Conservas', 'Sardinha em Lata Coqueiro 125g', 7.40, 'Peixe saboroso e nutritivo.', '/img/produtos/sardinha.webp', 1, 0),
('Enlatados & Conservas', 'Azeitona Verde Sem Caroço 200g', 10.20, 'Perfeitas para saladas e pizzas.', '/img/produtos/azeitona.webp', 1, 0),
('Enlatados & Conservas', 'Milho Verde em Conserva 200g', 6.30, 'Grãos macios, práticos.', '/img/produtos/milho-verde.webp', 1, 0),
('Enlatados & Conservas', 'Ervilha em Conserva 200g', 5.90, 'Leves e saborosas.', '/img/produtos/ervilha.webp', 1, 0),
('Enlatados & Conservas', 'Molho de Tomate Predilecta Sachê 300g', 1.69, 'Sem adição de açúcar, sabor tradicional.', '/img/produtos/molho-de-tomate.webp', 1, 0),
('Enlatados & Conservas', 'Creme de Leite Nestlé 300g', 8.49, 'Cremoso e versátil.', '/img/produtos/creme-de-leite.jpeg', 1, 0),
('Enlatados & Conservas', 'Moça Lata 395g', 7.99, 'Tradicional desde 1921.', '/img/produtos/leite-condensado-moca.webp', 1, 0),

-- Padaria & Secos
('Padaria & Secos', 'Pão de Forma Pullman 480g', 7.98, 'Macio, versátil, ideal para lanches.', '/img/produtos/pao-de-forma.webp', 1, 0),
('Padaria & Secos', 'Dona Benta 1kg', 5.39, 'Enriquecida com ferro, ótima para pães e bolos.', '/img/produtos/farinha-de-trigo.webp', 1, 0),
('Padaria & Secos', 'Arroz Branco Camil 5kg', 24.90, 'Grãos soltinhos.', '/img/produtos/arroz.webp', 1, 0),
('Padaria & Secos', 'Feijão Carioca Camil 1kg', 9.80, 'Rico em fibras e ferro.', '/img/produtos/feijao.webp', 1, 0),
('Padaria & Secos', 'Espaguete Renata 500g', 6.90, 'Massa leve e saborosa.', '/img/produtos/macarrao.webp', 1, 0),
('Padaria & Secos', 'Farofa Yoki 400g', 7.90, 'Crocante e temperada.', '/img/produtos/farofa.webp', 1, 0),
('Padaria & Secos', 'Biscoito Maisena Marilan 350g', 5.29, 'Crocante e leve.', '/img/produtos/biscoito.webp', 1, 0),
('Padaria & Secos', 'Sucrilhos Kellogg’s 800g', 32.90, 'Croque e nutritivo para café da manhã.', '/img/produtos/cereal-matinal.webp', 1, 0);



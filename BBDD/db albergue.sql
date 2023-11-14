CREATE DATABASE albergue;

USE albergue;

CREATE TABLE animals (
    idAnimal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    raza VARCHAR(45),
    edad VARCHAR(3) NOT NULL,
    tipo VARCHAR(45) NOT NULL
);


INSERT INTO `albergue`.`animals` (`idAnimal`, `nombre`, `raza`, `edad`, `tipo`) VALUES ('1', 'Jenaro', 'Agapornis', '5', 'Ave');
INSERT INTO `albergue`.`animals` (`idAnimal`, `nombre`, `raza`, `edad`, `tipo`) VALUES ('2', 'Olivia', 'Bulldog Francés', '11', 'Perro');
INSERT INTO `albergue`.`animals` (`idAnimal`, `nombre`, `raza`, `edad`, `tipo`) VALUES ('3', 'Nuth', 'Bengalí', '2', 'Gato');






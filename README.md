# Descripción

Frontend para gestionar las transacciones de una cuenta de Tenpista. Permite a los usuarios ver la lista de transacciones, registrar nuevas, editar y eliminar las existentes. La interfaz se comunica con el backend para mostrar los detalles de la transacción, como el monto, el comercio, el nombre de Tenpista y la fecha.

# Clonar el Repositorio
git clone https://github.com/ivegas7/frontend-transactions.git

# Ejecutar los Contenedores con Docker Composer
Este comando construirá los contenedores de Docker y los pondrá en marcha.
docker-compose up --build

Si prefieres hacerlo manual
docker build -t frontend . 
luego levanar contenedores
docker-compose up 

 El frontend estará disponible en http://localhost:3000/


Ejecutar la aplicación y empieza a disfrutar!!


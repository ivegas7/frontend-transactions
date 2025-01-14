# Usar una imagen base con Node.js preinstalado
FROM node:16

# Configurar la zona horaria de Chile
ENV TZ=America/Santiago

# Instalar el paquete para manejar la zona horaria
RUN apt-get update && apt-get install -y tzdata

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Puerto en el que React corre
EXPOSE 3000

# Iniciar la aplicación React
CMD ["npm", "start"]

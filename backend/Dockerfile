# Use uma imagem oficial do OpenJDK como base
FROM openjdk:17-jdk-alpine

# Diretório dentro do container onde a aplicação ficará
WORKDIR /app

# Copia o jar gerado para dentro do container
COPY target/*.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

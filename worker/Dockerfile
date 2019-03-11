FROM maven:3

WORKDIR /code

ADD pom.xml /code/pom.xml
ADD settings.xml /code/settings.xml
RUN ["mvn", "dependency:resolve","-s settings.xml"]
RUN ["mvn", "verify","-s settings.xml"]

# Adding source, compile and package into a fat jar
ADD src/main /code/src/main
RUN ["mvn", "package","-s settings.xml"]

CMD ["java", "-jar", "target/worker-jar-with-dependencies.jar"]

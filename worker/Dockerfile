FROM java:openjdk-8-jdk-alpine

RUN MAVEN_VERSION=3.3.3 \
 && cd /usr/share \
 && wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz -O - | tar xzf - \
 && mv /usr/share/apache-maven-$MAVEN_VERSION /usr/share/maven \
 && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

WORKDIR /code

ADD pom.xml /code/pom.xml
ADD settings.xml /code/settings.xml

RUN ["mvn", "dependency:resolve","-s settings.xml Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ssl.ignore.validity.dates=true"]
RUN ["mvn", "verify","-s settings.xml -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ssl.ignore.validity.dates=true"]

# Adding source, compile and package into a fat jar
ADD src/main /code/src/main
RUN ["mvn", "package","-s settings.xml -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ssl.ignore.validity.dates=true"]

CMD ["java", "-jar", "target/worker-jar-with-dependencies.jar"]

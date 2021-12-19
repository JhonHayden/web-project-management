# FROM representa la plantilla o imagen base donde luego pondre las demas capas de mi aplicacion sobre esta
# copia y descarga al contendor la imagen desde docker hub (libreria de imagenes) de node:14 como base para mi aplicacion
FROM node:14

# WORKDIR me permite y le ordena al contenedor crear dentro del contenedor una carpeta, para nosotros, dentro de esta 
# guardar toda nuestra aplicacion  (Ruta donde voy a guardar mi aplicacion dentro del contenedor)
WORKDIR /usr/src

# Vamos a copiar todos los archivos de la aplicacion en el contendor en orden de importancia

# COPY me copia los archivos que le indique el en source de mi computador o  mi apliccaion 
# en la ruta raiz del WORKDIR..   ./ le indica la ruta a donde copiarlo y es en la carpeta raiz del 
# WORKDIR en decir /usr/src en este caso 
# se copia primero el package.json para orden de que lo primero es instalar las dependecias y en el 
# package.json estan entonces por eso 
COPY package.json ./

# COPY source dest  .. source = es que archivo voy a copiar en el contenedor y dest  = ruta en el contendor donde
# se guardara esta copia 

# luego copio el yarn lock 
COPY yarn.lock ./

COPY ./ ./
# y despues copio todos los demas archivos de la aplicacion con la expresion ./ ./ le indicamos que son todos los demas
# archivos .. es decir con ./ ./ le indicamos copie todos los demas archivos de la aplicacion en el contenedor dentro 
# de la ruta o carpeta /usr/src indicada en el WORKDIR

# lo siguente es ejecutar el comando para que instale todas la dependecias del package.json y 
# se le indica con el comando RUN seguido del comando yarn install 
RUN yarn install 


# comando por defecto le configuramos que comando queremos que siempre ejecute por defecto cuando se monte 
# cada ves esta imagen en un contenedor 
# me ejecuta el comando de scripts de arranque de la aplicacion que esta en el package.json
CMD [ "yarn","start" ]

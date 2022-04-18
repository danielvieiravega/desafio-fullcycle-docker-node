# Desafio FullCycle Nginx com Node.js

Nesse desafio é necessários disponibilizar um docker-compose contendo:
- 1 nginx
- 1 mysql
- 1 Node.js

O container de nginx fica a frente do container de node.js servindo como proxy e encaminhando todas as requisições que recebe na porta 8080 para a porta 3000 do container de node.js. 

Quando o container de node.js recebe uma requisição no "/", ele adiciona um novo nome na tabela de pessoas do mysql e então retorna uma lista contendo todos os nomes gravados.

Para limpar a tabela, efetuar um get em '/clean-db'.

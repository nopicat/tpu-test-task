# Тестовое бэкенд

## Стэк технологии:
* TypeScript 
* Nest.js
* MongoDB
* Mongoose 
* Docker
* passport-local
* @nestjs/passport 
* passport

// Разумеется, стоит использовать монорепозиторий для такого проекта,
чтобы пробрасывать и иметь под рукой все нужные типы 
для запросов к микросервисам. 

// Токены работают на JWT, потому что это быстрее в разработке.

// Микросервисы занимаются всей логикой, а gateway только распределяет ответы.

// Запускается на http://localhost:3050. Порт 27017 MongoDB открыты для разработки.

## Задачи
Реализовать 2 микросервиса: авторизация(auth), тудулист(todo).

Сервис авторизации должен иметь свою коллекцию в монге и хранить _id(ObjectID), пароль.

И следующие методы:

### /signup [POST]
Request:

```
# Запрос на этот метод
{
"password": "blablabla"
}
```
Response:
```
{
"id": "созданный ObjectID",
"token": "Сгенерированный bearer token"
}
```

### /signin [POST]

Request:

```
# Запрос на этот метод
{
    "id": "objectid",
    "password": "blablabla"
}
```

Response:

```
# успех 200 
{
    "token": "Сгенерированный bearer token"
}
```

```
# неверно 401
{
    "error_message": "Bad id or password"
}
```

### /user [GET]
Request:

В хедере авторизация по bearer 

Response:

```
# успех 200 
{
    "id": "Object id"
}
```

```
# неверно 403 
{
    "error_message": "Bad token"
}
```

Сервис тудулист. Хранит в своей коллекции задачи следующего вида:

```
{
    "_id": "objectid",
    "owner": "objectid of owner user",
    "title": "some title",
    "description": "some description"
}
```

### /create [POST]

В хедере авторизация по bearer 

Request:

```
# Запрос на этот метод
{
    "title": "Название",
    "description": "bla bla bla"
}
```

Response:

```
# успех 200 
{
    "id": "object id"
}
```

```
# неверно 403
{
    "error_message": "Bad token"
}
```

### /get [GET]
В хедере авторизация по bearer 

Response:

```
# Возвращаются все документы, овнером которых юзер является
[
    {
        "id": "objectid",
        "title": "Название",
        "description": "bla bla bla"
    }, 
    {
        "id": "objectid",
        "title": "Название",
        "description": "bla bla bla"
    }
]
```

```
# неверно 403
{
    "error_message": "Bad token"
}
```

### /delete [DELETE]

В хедере авторизация по bearer Request:

```
# Проверять если овнером этого документа является отправляющий запрос юзер
{
    "id": "objectid"
}
```
Response:
```
[
    "id": "objectid"
]
```

```
# неверно 403
{
    "error_message": "Is not an owner"
}
```

Создать докерфайл и докер компоус с mongodb и сервисом.
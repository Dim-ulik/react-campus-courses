# Описание

В системе реализована авторизация и работа с API по JWT токену. Помимо этого, присутствует примитивная ролевая система для изоляции некоторого функционала. В системе присутствуют 2 базовых роли:
1) Рядовой пользователь
2) Администратор

Помимо этого, любой пользователь, независимо от базовой роли может быть также либо студентом кампусного курса, либо преподавателем. Данная “ответственность” реализуется при помощи связи между сущностями и может быть динамичной.




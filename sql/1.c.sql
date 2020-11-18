---Получить среднюю заработную плату начисленную в январе 2015 года.
SELECT
    AVG("money") as avg
from
    salary
where
    (
        month = 1
        and year = 2015
    )
--Найти среднюю заработную плату за 2015 год в разрезе работников. Включать в результат только тех работников, начисления которым проводились не менее двух раз.
select
    sl.employee_kod,
    AVG(sl.money) as average
from
    salary as sl
where
    sl.year = 2015
    and 2 <= (
        select
            count(sl1.*)
        from
            salary as sl1
        where
            sl.employee_kod = sl1.employee_kod
        group by
            sl.employee_kod
    )
group by
    sl.employee_kod
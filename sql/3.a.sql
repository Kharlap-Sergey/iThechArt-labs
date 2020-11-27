--Найти среднюю начисленную заработную плату за 2015 год в разрезе работников;
select
    salary.employee_kod,
    AVG(salary.money) as average
from
    salary
where
    salary.year = 2015
group by
    salary.employee_kod